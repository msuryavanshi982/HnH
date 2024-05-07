const express = require('express');
const router = express.Router();
const axios = require('axios');
const Contact = require('./models/contact'); // Create the Contact model

const API_KEY = 'YOUR_HUBSPOT_API_KEY';

router.get('/contacts', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${API_KEY}`
    );
    res.json(response.data.contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Define other routes for associations

module.exports = router;
