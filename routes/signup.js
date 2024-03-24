const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path based on your project structure
const {ensureNotAuthenticated} = require('../middlewares/authMiddleware');

router.get('/', ensureNotAuthenticated, (req, res) => {
  res.render('signup', { authenticated: req.isAuthenticated() });
});

router.post('/', ensureNotAuthenticated, async (req, res) => {
  const { username, firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.redirect('/'); // Handle password mismatch
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.redirect('/'); // Handle existing user
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    
    // Automatically log in the user after registration
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/');
      }
      res.redirect('/membershipDetails'); // Redirect to the user's profile page after successful registration
    });
  } catch (error) {
    console.error(error);
    res.redirect('/signup');
  }
});

module.exports = router;
