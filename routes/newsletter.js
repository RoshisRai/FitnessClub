const express = require('express');
const router = express.Router();
const Newsletter = require('../models/newsletter');

// Handle newsletter subscription form submissions
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Create a new newsletter subscription entry
    const newSubscription = new Newsletter({
      email,
    });

    // Save the newsletter subscription entry to the database
    await newSubscription.save();

    // Redirect to the current page or wherever you want
    res.redirect(req.get('referer'));
  } catch (error) {
    console.error(error);
    // Handle errors and redirect to an error page or display an error message
    res.redirect(req.get('referer') + '?error=true');
  }
});

module.exports = router;
