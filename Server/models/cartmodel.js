const mongoose = require('mongoose');

const CartData = mongoose.model('Cart', {
  quantity: Number,
  id: Number,
  images: String,
  name: String,
  price: Number,
  description: String,
  cate: String,
  user_id: String,
});

module.exports = { CartData };
