const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  vendor: String,
  category: String,
  date: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
