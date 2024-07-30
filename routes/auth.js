const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// User login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {

    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
        console.log('No user found with username:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (!user || password != user.password ) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
