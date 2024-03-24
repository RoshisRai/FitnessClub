const express = require('express');
const router = express.Router();
const Membership = require('../models/memberships');

router.get('/', async (req, res) => {
  try {
    // Access user details from req.user if authenticated
    const user = req.isAuthenticated() ? req.user : null;

    // Initialize variables
    let hasMembership = false;
    let redirectPath = '/login'; // Default to login page

    // Check membership status if authenticated
    if (req.isAuthenticated()) {
      const membershipDetails = await Membership.findOne({ user: user._id });
      hasMembership = !!membershipDetails;

      if (hasMembership) {
        // User is authenticated and has a membership, redirect to membership change
        redirectPath = '/membershipchange';
      } else {
        // User is authenticated but doesn't have a membership, redirect to membership form
        redirectPath = '/membershipform';
      }
    }

    res.render('pricing', { user, authenticated: req.isAuthenticated(), redirectPath, hasMembership });
  } catch (error) {
    console.error(error);
    res.render('pricing', {
      user: null,
      authenticated: req.isAuthenticated(),
      redirectPath: '/login', // Default to login page in case of an error
      hasMembership: false,
      error: 'Error determining membership status',
    });
  }
});

module.exports = router;
