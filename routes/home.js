const express = require('express');
const router = express.Router();
const Membership = require('../models/memberships');

router.get('/', async (req, res) => {
  try {
    const user = req.isAuthenticated() ? req.user : null;

    let hasMembership = false;
    let redirectPath = '/login';

    if (req.isAuthenticated()) {
      const membershipDetails = await Membership.findOne({ user: user._id });
      hasMembership = !!membershipDetails;

      if (hasMembership) {
        redirectPath = '/membershipchange';
      } else {
        redirectPath = '/membershipform';
      }
    }

    res.render('home', {
      user,
      authenticated: req.isAuthenticated(),
      redirectPath,
      hasMembership,
    });
  } catch (error) {
    console.error(error);
    res.render('home', {
      user: null,
      authenticated: req.isAuthenticated(),
      redirectPath: '/login',
      hasMembership: false,
      error: 'Error determining membership status',
    });
  }
});

module.exports = router;
