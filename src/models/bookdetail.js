const mongoose = require('mongoose');

var BookDetailSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    dlink: String,
    category: String,
    edition: Number,
    year: Number,
    pages: Number,
    size: Number,
    price: Number
});

const BookDetail = mongoose.model("bookdetail", BookDetailSchema);

module.exports = BookDetail;