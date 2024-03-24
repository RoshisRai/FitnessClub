const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const User = require('../models/user'); // Adjust the path based on your project structure

// Profile route with authentication check
router.get('/', ensureAuthenticated, (req, res) => {
  // Access user details from req.user
  const user = req.user;
  // Render the profile page with user data
  res.render('profile', { user, authenticated: req.isAuthenticated() });
});

// Handle profile update for firstName and lastName
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    // Get updated data from the form (only firstName and lastName)
    const { firstName, lastName } = req.body;

    // Find the user by ID and update the fields
    await User.findByIdAndUpdate(req.user._id, { firstName, lastName });

    req.flash('success', 'Profile updated successfully');
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating profile');
    res.redirect('/profile');
  }
});

module.exports = router;
