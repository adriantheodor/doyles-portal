// server/models/QuoteRequest.js
const mongoose = require('mongoose');

const QuoteRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email:       { type: String, required: true, index: true },
  phone:       String,
  address:     String,
  headcount:   String,
  services:    { type: [String], default: [] },
  notes:       String,
  status:      { type: String, enum: ['new','contacted','scheduled','closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('QuoteRequest', QuoteRequestSchema);
