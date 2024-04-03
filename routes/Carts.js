const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('products.productId');
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single cart by User ID
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    if (cart == null) {
      return res.status(404).json({ message: 'Cannot find cart for this user' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new cart or add products to existing cart
router.post('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      // Add new product to the existing cart
      cart.products.push({ productId: req.body.productId, quantity: req.body.quantity });
    } else {
      // Create a new cart if one doesn't exist for the user
      cart = new Cart({
        userId: req.params.userId,
        products: [{ productId: req.body.productId, quantity: req.body.quantity }]
      });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a cart (e.g., change quantity of a product)
router.put('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === req.body.productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity = req.body.quantity;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a cart or a product from the cart
router.delete('/:userId/:productId?', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }

    if (req.params.productId) {
      // Remove a specific product from the cart
      cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
    } else {
      // Remove all products if no productId is specified (delete the cart)
      cart.products = [];
    }

    await cart.save();
    res.json({ message: 'Cart updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
