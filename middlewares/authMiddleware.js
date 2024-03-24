function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return next(); // Continue if authenticated
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

function ensureNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
    return next(); // Continue if not authenticated
    }
    res.redirect('/profile'); // Redirect to profile if already authenticated
}

module.exports = { ensureAuthenticated, ensureNotAuthenticated };
  