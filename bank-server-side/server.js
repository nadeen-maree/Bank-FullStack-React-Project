const express = require('express');
const mongoose = require('mongoose');
const transactionsRouter = require('./routs/api');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bankApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use('/transactions', transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
