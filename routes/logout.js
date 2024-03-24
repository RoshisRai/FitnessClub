// logout.js
const express = require('express');
const router = express.Router();

// Logout route
router.get('/', (req, res) => {
  // Clear the session variable
  req.session.successMessageDisplayed = false;
  
  req.logout(() => {
    res.redirect('/'); // Redirect to the home page after logout
  });
});

module.exports = router;

