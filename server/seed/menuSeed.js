const MenuItem = require('../models/MenuItem');

const defaultMenu = [
  // ── ETHIOPIAN DISHES ──
  {
    name: 'Injera',
    description: 'Soft, spongy flatbread made from teff flour, used as the base for Ethiopian meals.',
    price: 30,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkLJG3_6nw5pQkBQIbej8ZU3Qb3dbjdTztg&s',
  },
  {
    name: 'Doro Wat',
    description: 'Spicy chicken stew cooked with berbere, onions, and boiled eggs.',
    price: 350,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://eggs.ca/wp-content/uploads/2024/06/EFC-doro-wat-hero-1280x720-1.jpg',
  },
  {
    name: 'Shiro',
    description: 'Rich and smooth chickpea stew seasoned with garlic and Ethiopian spices.',
    price: 180,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://holycowvegan.net/wp-content/uploads/2023/02/ethiopian-shiro-wot-1.jpg',
  },
  {
    name: 'Tibs',
    description: 'Sautéed beef cubes cooked with onions, peppers, and spices.',
    price: 320,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/51c325ece4b01f1752ee3259/1592490019473-P9BWFNZNQAYUYGK4QCM3/DSC00054-2.jpg',
  },
  {
    name: 'Kitfo',
    description: 'Finely minced raw beef mixed with spiced butter and mitmita.',
    price: 400,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://preview.redd.it/ethiopian-kitfo-spice-marinated-raw-beef-with-extra-spice-v0-h697pzzvt8041.jpg?width=1080&crop=smart&auto=webp&s=fb56ce697793654e0c8162d7331a30fcd4e16691',
  },
  {
    name: 'Misir Wat',
    description: 'Spicy red lentil stew cooked with berbere and onions.',
    price: 160,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://www.makebetterfood.com/recipes/misir-wot/misir-wot_large.webp',
  },
  {
    name: 'Gomen',
    description: 'Collard greens sautéed with garlic, ginger, and mild spices.',
    price: 140,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://cdn.tasteatlas.com//Images/Dishes/1da821e8c98a42f38ede3fd8556652d2.jpg?width=320&height=205',
  },
  {
    name: 'Firfir',
    description: 'Shredded injera mixed with spicy berbere sauce and butter.',
    price: 150,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://static.spotapps.co/spots/25/28aaed23b44d9e9786156db8f1fde7/full',
  },
  {
    name: 'Genfo',
    description: 'Thick barley porridge served with spiced butter and berbere.',
    price: 120,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaUQutwUQLwM84nK7sKgmRgFXdhi1VGYRQHA&s',
  },
  {
    name: 'Dulet',
    description: 'Minced tripe, liver, and beef sautéed with spices and peppers.',
    price: 280,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDshfQWqCnsuMymWuw6nih0v8MHUMdxNcrA&s=',
  },
  {
    name: 'Kocho',
    description: 'Traditional flatbread made from the false banana plant, served with kitfo or tibs.',
    price: 90,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/b2/83/f7/tiru-kitfo.jpg',
  },
  {
    name: 'Beyaynetu',
    description: 'Made of a variety of vegetarian foods served together on injera (a sour flatbread).',
    price: 80,
    category: 'Ethiopian Dishes',
    imageUrl: 'https://www.awazetours.com/uploads/1/0/4/0/104067226/vegetarian-combination-with-injera_orig.jpeg',
  },
  // ── TRADITIONAL DRINKS ──
  {
    name: 'Ethiopian Coffee (Buna)',
    description: 'Freshly roasted, ground, and brewed coffee served in a traditional Ethiopian ceremony.',
    price: 50,
    category: 'Traditional Drinks',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTerDH2f-GBFJyO6k_u54h5EGQOAyf4JDGA&s',
  },
  {
    name: 'Fresh Mango Juice',
    description: 'Made from ripe local mangoes. Sweet, refreshing, and very common in roadside juice spots.',
    price: 40,
    category: 'Traditional Drinks',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEzDjxih-niFZsl-roRRFDcm7OT5ufa3_mIA&s',
  },
  {
    name: 'Papaya Juice',
    description: 'Light, smooth, and slightly sweet. Often mixed with lime for extra freshness.',
    price: 45,
    category: 'Traditional Drinks',
    imageUrl: 'https://cdn.healthyrecipes101.com/recipes/images/juices/homemade-papaya-juice-recipe-clahz8nms00077b1b36to20rb.webp?w=1080&q=80',
  },
  {
    name: 'Herbal Tea (Ye\'qetel Shai)',
    description: 'Natural herbal tea made from local herbs like Tenadam (rue), ginger, and Koseret. Caffeine-free.',
    price: 35,
    category: 'Traditional Drinks',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxrI93vctX7TPBwfFHLwKr-cS7mlafDcS5wQ&s',
  },
  {
    name: 'Avocado Juice',
    description: 'Fresh Ethiopian avocado juice blended with milk and sugar, a popular local favorite.',
    price: 40,
    category: 'Traditional Drinks',
    imageUrl: 'https://instapilau.com/media/products/2024/10/15/original_668fb3c45f334644ab43505a4966a581.jpg',
  },
  {
    name: 'Honey Water',
    description: 'Simple, refreshing mix of pure honey and water. A natural non-fermented halal drink.',
    price: 30,
    category: 'Traditional Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=85',
  },
  {
    name: 'Ergo (Drinkable Yogurt)',
    description: 'Traditional Ethiopian yogurt diluted into a smooth, refreshing drink.',
    price: 45,
    category: 'Traditional Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&q=85',
  },
  {
    name: 'Lemon Juice',
    description: 'Fresh Ethiopian-style lemon juice, served cold with a hint of sugar.',
    price: 35,
    category: 'Traditional Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=85',
  },
];

const seedMenu = async () => {
  try {
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(defaultMenu);
    console.log('Ethiopian menu seeded successfully');
  } catch (error) {
    console.error('Menu seeding failed:', error.message);
  }
};

module.exports = seedMenu;












