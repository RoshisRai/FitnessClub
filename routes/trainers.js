const express = require('express');
const router = express.Router();

// About route
router.get('/', (req, res) => {
  // Access user details from req.user if needed
  const user = req.user;

  // Render the about page with user data
  res.render('trainers', { user, authenticated: req.isAuthenticated() });
});

module.exports = router;