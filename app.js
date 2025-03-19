const express = require('express');
const sqlite3 = require('sqlite3');
const jokesRouter = require('./routes/jokes');

const app = express();
const db = new sqlite3.Database('jokes.db');

// Database setup
db.run('CREATE TABLE IF NOT EXISTS jokes (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, content TEXT, likes INTEGER DEFAULT 0, dislikes INTEGER DEFAULT 0)');

// Express middleware for JSON parsing
app.use(express.json());

// Use jokesRouter for all routes related to jokes
app.use('/jokes', jokesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
