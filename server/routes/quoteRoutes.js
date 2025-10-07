// server/routes/quoteRoutes.js
const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/QuoteRequest');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const qr = await QuoteRequest.create(req.body);
    // send email
    await transporter.sendMail({
      from: '"Doyle’s Portal" <no-reply@doyles.com>',
      to: "admin@doyles.com",
      subject: "New Quote Request",
      text: `New lead from ${qr.contactName} at ${qr.companyName} (${qr.email})`
    });
    res.status(201).json({ id: qr._id });
  } catch (e) {
    res.status(400).json({ error: 'Invalid quote payload' });
  }
});

router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const qr = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(qr);
  } catch (e) {
    res.status(400).json({ error: 'Could not update quote request' });
  }
});

router.post('/', async (req, res) => {
  try {
    const qr = await QuoteRequest.create(req.body);
    // (Optional) notify admin via email/webhook here.
    res.status(201).json({ id: qr._id });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Invalid quote payload' });
  }
});

// Admin-only: list/manage leads
const { authenticateToken, requireRole } = require('../middleware/auth'); // you already use these patterns
router.get('/', authenticateToken, requireRole('admin'), async (_req, res) => {
  const items = await QuoteRequest.find().sort({ createdAt: -1 });
  res.json(items);
});

module.exports = router;
