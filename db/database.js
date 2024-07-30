const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');

// Open a database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
  
// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_category TEXT,
    record_count INTEGER,
    fields TEXT
  )`);
});

module.exports = db;
