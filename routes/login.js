const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureNotAuthenticated } = require('../middlewares/authMiddleware'); // Import the middleware

// Handle GET request for the login page
router.get('/', ensureNotAuthenticated, (req, res) => {
  res.render('login', { 
    authenticated: req.isAuthenticated(), 
    messages: {
      success: req.flash('success'),
      error: req.flash('error')
    },
  });
});

// Handle POST request for user login
router.post('/', ensureNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/membershipDetails',
  failureRedirect: '/',  
  failureFlash: true
}));

module.exports = router;
