const mongoose = require('mongoose');

const MenuData = mongoose.model('Menu', {
  quantity: Number,
  images: String,
  name: String,
  price: Number,
  description: String,
  cate: String,
});

module.exports = { MenuData };
