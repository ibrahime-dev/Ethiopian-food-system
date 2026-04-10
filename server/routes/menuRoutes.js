const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const { search = '', category, minPrice, maxPrice, available } = req.query;
    const query = {
      name: { $regex: search, $options: 'i' },
    };

    if (category) {
      query.category = category;
    }
    if (available !== undefined) {
      query.available = available === 'true';
    }
    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    const menu = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.json(menu);
  } catch (error) {
    console.error('Failed to fetch menu:', error.message);
    res.status(500).json({ message: 'Server error fetching menu' });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, available } = req.body;
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      imageUrl,
      available: available !== false,
    });
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Failed to create menu item:', error.message);
    res.status(500).json({ message: 'Server error creating menu item' });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error('Failed to update menu item:', error.message);
    res.status(500).json({ message: 'Server error updating menu item' });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error('Failed to delete menu item:', error.message);
    res.status(500).json({ message: 'Server error deleting menu item' });
  }
});

module.exports = router;
