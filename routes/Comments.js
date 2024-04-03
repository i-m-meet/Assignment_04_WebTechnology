const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate('productId userId', 'description username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('productId userId', 'description username');
    if (!comment) {
      return res.status(404).json({ message: 'Cannot find comment' });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    productId: req.body.productId,
    userId: req.body.userId,
    rating: req.body.rating,
    image: req.body.image,
    commentText: req.body.commentText,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a comment
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Cannot find comment' });
    }

    comment.rating = req.body.rating ?? comment.rating;
    comment.image = req.body.image ?? comment.image;
    comment.commentText = req.body.commentText ?? comment.commentText;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try {
      const result = await Comment.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cannot find comment' });
      }
      res.json({ message: 'Deleted Comment' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
