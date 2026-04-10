const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, default: '' },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
