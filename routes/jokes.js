const express = require('express');
const sqlite3 = require('sqlite3');

const router = express.Router();
const db = new sqlite3.Database('jokes.db');

// Retrieve a random joke from all jokes in the database
router.get('/random', (req, res) => {
  db.get('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'No jokes found' });
    }
  });
});

// Retrieve a random joke from a category of jokes
router.get('/random/:category', (req, res) => {
  const category = req.params.category;
  db.get('SELECT * FROM jokes WHERE category = ? ORDER BY RANDOM() LIMIT 1', [category], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: `No jokes found in the specified category '${category}'` });
    }
  });
});

// Retrieve a list of categories
router.get('/categories', (req, res) => {
    db.all('SELECT DISTINCT category FROM jokes', (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const categories = rows.map(row => row.category);
        res.json(categories);
      }
    });
  });

// Retrieve all jokes for a category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  db.all('SELECT * FROM jokes WHERE category = ?', [category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: `No jokes found in the specified category '${category}'` });
    }
  });
});

// Retrieve a joke by ID
router.get('/id/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM jokes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Joke not found' });
    }
  });
});

// Add a new category of jokes
router.post('/categories', (req, res) => {
  const { category } = req.body;
  if (category) {
    db.run('INSERT INTO jokes (category) VALUES (?)', [category], function (err) {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ id: this.lastID, category });
      }
    });
  } else {
    res.status(400).json({ error: 'Category name is required' });
  }
});

// Add a new joke to a category
router.post('/', (req, res) => {
  const { category, content } = req.body;
  if (category && content) {
    db.run('INSERT INTO jokes (category, content) VALUES (?, ?)', [category, content], function (err) {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ id: this.lastID, category, content });
      }
    });
  } else {
    res.status(400).json({ error: 'Category and content are required' });
  }
});

// Add an existing joke to a category by joke id
router.put('/:id/category', (req, res) => {
    const { category } = req.body;
    const {id} = req.params;
  
    if (category) {
      db.run('UPDATE jokes SET category = ? WHERE id = ?', [category, id], function (err) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (this.changes >= 0) {
          res.json({ id, category });
        } else {
          res.status(404).json({ error: 'Joke not found' });
        }
      });
    } else {
      res.status(400).json({ error: 'Category name is required' });
    }
  }); 

// Give a joke (by ID) a vote of like or dislike
router.post('/:id/vote', (req, res) => {
  const { vote } = req.body;
  const id = req.params.id;

  if (vote && (vote === 'like' || vote === 'dislike')) {
    const column = vote === 'like' ? 'likes' : 'dislikes';
    db.run(`UPDATE jokes SET ${column} = ${column} + 1 WHERE id = ?`, [id], function (err) {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (this.changes > 0) {
        res.json({ id, vote });
      } else {
        res.status(404).json({ error: 'Joke not found' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid vote parameter' });
  }
});

// Delete a specific joke by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM jokes WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (this.changes > 0) {
      res.json({ message: 'Joke deleted successfully' });
    } else {
      res.status(404).json({ error: 'Joke not found' });
    }
  });
});

module.exports = router;
