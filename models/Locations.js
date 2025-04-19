const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  googleMapsLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);