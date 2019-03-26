module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    var storedItem = this.items[id];
    if (!storedItem) { // Item not added to cart yet
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = this.roundBy2(storedItem.item.price * storedItem.qty);
    this.totalQty++;
    this.totalPrice =  this.roundBy2(this.totalPrice + storedItem.item.price);
  };

  this.reduceByOne = function (id) {
    this.items[id].qty--;
    this.items[id].price = this.roundBy2(this.items[id].price - this.items[id].item.price);
    this.totalQty--;
    this.totalPrice = this.roundBy2(this.totalPrice - this.items[id].item.price);

    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  };

  this.removeItem = function (id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice = this.roundBy2(this.totalPrice - this.items[id].price);
    delete this.items[id];
  }

  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };

  this.roundBy2 = function (num) {
    return Math.round((num + 0.00001) * 100) / 100;
  };
};
