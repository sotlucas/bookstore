var Book = require('../models/book');
var Cart = require('../models/cart');

exports.add_to_cart_get = function (req, res, next) {
  var bookId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Book.findById(bookId, function (err, book) {
    if (err) { return res.redirect('/'); }
    cart.add(book, book.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
};

exports.cart_get = function (req, res, next) {
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
  res.render('checkout', { total: cart.totalPrice });
};
