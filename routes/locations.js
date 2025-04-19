const express = require('express');
const router = express.Router();
const Location = require('../models/Locations');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  const location = new Location({
    googleMapsLink: req.body.googleMapsLink
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;