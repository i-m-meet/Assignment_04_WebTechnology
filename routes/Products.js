const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// POST a new product
router.post('/', async (req, res) => {
  const product = new Product({
    description: req.body.description,
    image: req.body.image,
    pricing: req.body.pricing,
    shippingCost: req.body.shippingCost
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update  a specific product using its id
router.put('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
  
      if (req.body.description != null) {
        product.description = req.body.description;
      }
      if (req.body.image != null) {
        product.image = req.body.image;
      }
      if (req.body.pricing != null) {
        product.pricing = req.body.pricing;
      }
      if (req.body.shippingCost != null) {
        product.shippingCost = req.body.shippingCost;
      }
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE a product
router.delete('/:id', async (req, res) => {
    try {
      const result = await Product.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
      res.json({ message: 'Deleted Product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
