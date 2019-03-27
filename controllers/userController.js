var passport = require('passport');

var Order = require('../models/order');
var Cart = require('../models/cart');


// GET signup
exports.signup_get = function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages });
};

// POST signup
exports.signup_post = passport.authenticate('local.signup', {
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
  failureRedirect: '/user/signin',
  failureFlash: true
});

exports.logout_get = function (req, res, next) {
  req.logout();
  res.redirect('/');
};

// GET user profile
exports.profile_get = function (req, res, next) {
  Order.find({ user: req.user }, function (err, orders) {
    if (err) { return res.write('Error!'); }
    var cart;
    orders.forEach(function (order) {
      console.log(order.cart.item);
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('user/profile', { orders: orders });
  });
};
