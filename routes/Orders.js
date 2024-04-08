const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username').populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username').populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  try {
    // Check if the userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Check if all productIds exist
    for (const product of products) {
      const existingProduct = await Product.findById(product.productId);
      if (!existingProduct) {
        return res.status(400).json({ message: `Invalid product ID: ${product.productId}` });
      }
    }

    const order = new Order({
      userId,
      products,
      totalAmount,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an order (typically to update the status of the order)
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Cannot find order' });
    }

    // Example of updating the totalAmount and products; adjust based on your requirements
    order.totalAmount = req.body.totalAmount ?? order.totalAmount;
    order.products = req.body.products ?? order.products; // Update the products array if provided

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
    try {
      const result = await Order.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cannot find order' });
      }
      res.json({ message: 'Deleted Order' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;

