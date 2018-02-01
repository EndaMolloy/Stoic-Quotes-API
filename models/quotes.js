const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  quote: String,
  author: String
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
