const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  role: String,
});

// Route to create a test user
router.get('/test-create', async (req, res) => {
  try {
    const newUser = new User({ name: 'Test User', role: 'admin' });
    await newUser.save();
    res.send('Test user created.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // ...Validation, hashing password, saving to DB, etc.
});

module.exports = router;
