const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  role: String,
});
const User = mongoose.model('User', UserSchema);

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

module.exports = router;
