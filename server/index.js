const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const seedMenu = require('./seed/menuSeed');
const seedAdmin = require('./seed/userSeed');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Make io accessible in routes
app.set('io', io);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// ── ANALYTICS ENDPOINT ──
const Order = require('./models/Order');
const MenuItem = require('./models/MenuItem');

app.get('/api/analytics', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

    // Top selling items
    const itemMap = {};
    orders.forEach(order => {
      (order.items || []).forEach(item => {
        if (!itemMap[item.name]) itemMap[item.name] = { name: item.name, qty: 0, revenue: 0 };
        itemMap[item.name].qty += item.quantity;
        itemMap[item.name].revenue += item.price * item.quantity;
      });
    });
    const topItems = Object.values(itemMap).sort((a, b) => b.qty - a.qty).slice(0, 5);

    // Orders by status
    const byStatus = { Pending: 0, Preparing: 0, Delivered: 0, Cancelled: 0 };
    orders.forEach(o => { if (byStatus[o.status] !== undefined) byStatus[o.status]++; });

    res.json({ totalOrders, totalRevenue, pendingOrders, deliveredOrders, topItems, byStatus });
  } catch (err) {
    res.status(500).json({ message: 'Analytics error' });
  }
});

// ── SOCKET.IO ──
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await seedMenu();
    await seedAdmin();
  })
  .catch((err) => console.error('Startup error:', err.message));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
