const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Uplers Backend');
});
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/products'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
