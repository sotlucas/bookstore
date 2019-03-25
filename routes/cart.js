var express = require('express');
var router = express.Router();

// Require controller modules
var cart_controller = require('../controllers/cartController');

// GET add-to-cart
router.get('/add-to-cart/:id', cart_controller.add_to_cart_get);

// GET cart
router.get('/cart', cart_controller.cart_get);

// GET checkout
router.get('/checkout', cart_controller.checkout_get);

module.exports = router;
