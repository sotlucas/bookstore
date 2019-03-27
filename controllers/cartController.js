var Book = require('../models/book');
var Cart = require('../models/cart');
var Order = require('../models/order');

exports.add_to_cart_get = function (req, res, next) {
  var bookId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Book.findById(bookId, function (err, book) {
    if (err) { return res.redirect('/'); }
    cart.add(book, book.id);
    req.session.cart = cart;
    res.redirect('/');
  });
};

exports.reduce_by_one_get = function (req, res, next) {
  var bookId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(bookId);
  req.session.cart = cart;
  res.redirect('/cart');
};

exports.removed_get = function (req, res, next) {
  var bookId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(bookId);
  req.session.cart = cart;
  res.redirect('/cart');
};

exports.cart_get = function (req, res, next) {
  // BUG: When req.session.cart gets reduced till it gets 0 its {}
  if (!req.session.cart) {
    return res.render('cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
};

exports.checkout_get = function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('checkout', { total: cart.totalPrice, errMsg: errMsg });
};

exports.checkout_post = function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_IXmU1YzoWHWsxxgsDbcAzVjX00tpxuHmPg");
  console.log("LOG TOKEN: " + 'tok_mastercard');
  console.log(req.body);
  stripe.charges.create({
    amount: cart.totalPrice * 100, // Smallest currency (i.e. cents)
    currency: "usd",
    source: 'tok_mastercard', // obtained with Stripe.js
    description: "Test book charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    // Creating order and saving it to the database
    var order = new Order({
      user: req.user, // passport stores the user in 'req'
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function (err, result) {
      // if (err) {...}
      req.flash('success', 'Successfully bought products!');
      req.session.cart = null;
      res.redirect('/');
    });
  });
}
