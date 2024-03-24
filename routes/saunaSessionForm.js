const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const SaunaSession = require('../models/saunaSession');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('saunaSessionForm', { authenticated: req.isAuthenticated() });
});

router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { name, email, phone, address, preferredCommunication, additionalComments, date } = req.body;
    
    const newSaunaSession = new SaunaSession({
      user: req.user._id,
      name,
      email,
      phone,
      address,
      preferredCommunication,
      additionalComments,
      status: 'pending',
      scheduledDate: date, // Adjust the field name based on your requirements
    });

    await newSaunaSession.save();

    res.redirect('/membershipdetails'); // Redirect to the sauna session details page or wherever you want
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error submitting sauna session form');
    res.redirect('/saunaSessionForm'); // Redirect to an error page or handle it based on your needs
  }
});

module.exports = router;
