const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
  try {
    const { customerName, customerEmail, customerAddress, items } = req.body;
    if (!customerName || !customerEmail || !customerAddress || !items || !items.length) {
      return res.status(400).json({ message: 'Please provide all order details.' });
    }

    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem) {
          throw new Error(`Menu item not found: ${item.menuItemId}`);
        }
        return {
          menuItemId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: item.quantity,
        };
      })
    );

    const total = populatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user._id,
      customerName,
      customerEmail,
      customerAddress,
      items: populatedItems,
      total,
    });

    await order.save();
    const io = req.app.get('io');
    if (io) io.emit('newOrder', { orderId: order._id, customerName, total });
    res.status(201).json(order);
  } catch (error) {
    console.error('Failed to create order:', error.message);
    res.status(500).json({ message: 'Server error creating order' });
  }
});

router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch user orders:', error.message);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error.message);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status || order.status;
    await order.save();
    // Emit real-time update to all connected clients
    const io = req.app.get('io');
    if (io) io.emit('orderStatusUpdated', { orderId: order._id, status: order.status });
    res.json(order);
  } catch (error) {
    console.error('Failed to update order status:', error.message);
    res.status(500).json({ message: 'Server error updating order' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (req.user.role !== 'admin' && !order.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(order);
  } catch (error) {
    console.error('Failed to fetch order:', error.message);
    res.status(500).json({ message: 'Server error fetching order' });
  }
});

module.exports = router;
