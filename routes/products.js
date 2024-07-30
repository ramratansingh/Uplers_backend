const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Get all products
router.get('/products', authenticate, (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

// Get product by ID
router.get('/products/:id', authenticate, (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  });
});

module.exports = router;
