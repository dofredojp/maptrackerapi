const express = require('express');
const router = express.Router();
const Location = require('../models/Locations');
const bodyParser = require('body-parser');

// Request size limiting
const limit = '10kb';
router.use(bodyParser.json({ limit }));
router.use(bodyParser.urlencoded({ limit, extended: true }));

// Input validation middleware
const validateGoogleMapsLink = (req, res, next) => {
  const { googleMapsLink } = req.body;
  
  if (!googleMapsLink) {
    return res.status(400).json({ message: 'googleMapsLink is required' });
  }
  
  // Basic validation for Google Maps URL format
  const googleMapsPattern = /^https:\/\/(www\.)?google\.com\/maps/;
  if (!googleMapsPattern.test(googleMapsLink)) {
    return res.status(400).json({ message: 'Invalid Google Maps URL format' });
  }
  
  next();
};

// Get all locations with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50); // Max 50 items per page
    const skip = (page - 1) * limit;

    const locations = await Location.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Location.countDocuments();

    res.json({
      data: locations,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving locations' });
  }
});

// Create a new location
router.post('/', validateGoogleMapsLink, async (req, res) => {
  try {
    const location = new Location({
      googleMapsLink: req.body.googleMapsLink
    });

    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error creating location' });
  }
});

module.exports = router;