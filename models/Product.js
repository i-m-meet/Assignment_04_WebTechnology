const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: String,
  pricing: { type: Number, required: true },
  shippingCost: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
