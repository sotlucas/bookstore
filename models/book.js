var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    img: {type: String, required: true, default: 'https://unmpress.com/sites/default/files/default_images/no_image_book.jpg'},
    price: {type: Number, required: true, default: '0'}
  }
);

// Virtual for book's url
BookSchema
.virtual('url')
.get(function() {
  return '/catalog/book/' + this._id;
});

// Export model
module.exports = mongoose.model('Book', BookSchema);
