// passwordChange.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); // Import the middleware
const bcrypt = require('bcrypt'); // Import bcrypt

router.get('/', ensureAuthenticated, (req, res) => {
  const user = req.user;
  
  res.render('passwordChange', { user, authenticated: req.isAuthenticated() });
});

router.post('/', ensureAuthenticated, async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = req.user;

  // Check if the current password is correct
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    req.flash('error', 'Incorrect current password');
    return res.redirect('/passwordChange');
  }

  // Check if the new password and confirmation match
  if (newPassword !== confirmNewPassword) {
    req.flash('error', 'New password and confirmation do not match');
    return res.redirect('/passwordChange');
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  user.password = hashedPassword;
  await user.save();

  req.flash('success', 'Password changed successfully');
  res.redirect('/profile');
});

module.exports = router;
