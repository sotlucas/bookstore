var passport = require('passport');

// GET signup
exports.signup_get = function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages });
};

// POST signup
exports.signup_post = passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
});

// GET signin
exports.signin_get = function (req, res, next) {
var messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages });
}

// POST signin
exports.signin_post = passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
});

exports.logout_get = function (req, res, next) {
  req.logout();
  res.redirect('/');
}

// GET user profile
exports.profile_get = function (req, res, next) {
  res.render('user/profile');
}
