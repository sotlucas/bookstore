var express = require('express');
var router = express.Router();
var csrf = require('csurf');

// Require controller modules
var user_controller = require('../controllers/userController');

var csrfProtection = csrf();
router.use(csrfProtection);

// GET user profile
router.get('/profile', isLoggedIn, user_controller.profile_get);

// GET logout
router.get('/logout', isLoggedIn, user_controller.logout_get);

router.use('/', notLoggedIn, function (req, res, next) {
  next();
});

// GET signup
router.get('/signup', user_controller.signup_get);

// POST signup
router.post('/signup', user_controller.signup_post,redirectLogin);

// GET signin
router.get('/signin', user_controller.signin_get);

// POST signin
router.post('/signin', user_controller.signin_post, redirectLogin);


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function redirectLogin(req, res, next) {
  // Successful login attempt
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
}
