const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user seeded: admin@example.com / admin123');
    }
  } catch (error) {
    console.error('Failed to seed admin user:', error.message);
  }
};

module.exports = seedAdmin;
