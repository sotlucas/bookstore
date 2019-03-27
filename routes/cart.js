var express = require('express');
var router = express.Router();

// Require controller modules
var cart_controller = require('../controllers/cartController');

// GET add-to-cart
router.get('/add-to-cart/:id', cart_controller.add_to_cart_get);

// GET reduce-by-one item
router.get('/reduce/:id', cart_controller.reduce_by_one_get);

// GET reduce-all item
router.get('/remove/:id', cart_controller.removed_get);

// GET cart
router.get('/cart', cart_controller.cart_get);

// GET checkout
router.get('/checkout', isLoggedIn, cart_controller.checkout_get);

// POST checkout
router.post('/checkout', isLoggedIn, cart_controller.checkout_post);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url; // Save url to return after signing in
  res.redirect('/user/signin');
}
