const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const Membership = require('../models/memberships');

router.get('/:membershipType', ensureAuthenticated, async (req, res) => {
  try {
    // Check if the user already has a membership
    const existingMembership = await Membership.findOne({ user: req.user._id });

    if (existingMembership) {
      // Redirect to another page, e.g., membershipdetails
      return res.redirect('/membershipdetails');
    }

    // Continue rendering the membership form if no existing membership
    const membershipType = req.params.membershipType;
    res.render('membershipForm', { membershipType, authenticated: req.isAuthenticated() });
  } catch (error) {
    console.error(error);
    // Handle the error, e.g., redirect to an error page
    res.redirect('/error');
  }
});

router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    // Check if the user already has a membership
    const existingMembership = await Membership.findOne({ user: req.user._id });

    if (existingMembership) {
      // Redirect to another page, e.g., membershipdetails
      return res.redirect('/membershipdetails');
    }

    // Continue processing the form submission if no existing membership
    const { name, email, phone, address, preferredCommunication, additionalComments, membershipType, startDate } = req.body;
    
    const newMembership = new Membership({
      user: req.user._id,
      name,
      email,
      phone,
      address,
      preferredCommunication,
      additionalComments,
      membershipType,
      startDate,
      endDate: -1,
    });

    await newMembership.save();
    res.redirect('/membershipdetails'); // Redirect to the user's profile page or wherever you want
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error submitting membership form');
    res.redirect(`/membershipform/${req.params.membershipType}`); // Redirect to an error page or handle it based on your needs
  }
});

module.exports = router;
