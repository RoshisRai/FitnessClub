// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

// Contact route
router.get('/', (req, res) => {
  // Access user details from req.user if needed
  const user = req.user;

  // Render the contact page with user data
  res.render('contact', { user, authenticated: req.isAuthenticated() });
});

// Handle contact form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, preferredCommunication, message } = req.body;

    // Create a new contact form entry
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      preferredCommunication,
      message,
    });

    // Save the contact form entry to the database
    await newContact.save();

    // Redirect to the contact page or wherever you want
    res.redirect('/');
  } catch (error) {
    console.error(error);
    // Handle errors and redirect to an error page or display an error message
    res.redirect('/contact?error=true');
  }
});

module.exports = router;
