const express = require('express');
const Transaction = require('../model/Transaction');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      let query = {};
      if (req.query.month && req.query.year) {
        query = {
          date: {
            $gte: new Date(req.query.year, req.query.month - 1, 1),
            $lte: new Date(req.query.year, req.query.month, 0),
          },
        };
      }
      const transactions = await Transaction.find(query);
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});
  

router.post('/', async (req, res) => {
    const { amount, category, vendor, date } = req.body;
    try {
      const newTransaction = new Transaction({ amount, category, vendor, date });
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/breakdown', async (req, res) => {
    try {
        let query = {};
        if (req.query.month && req.query.year) {
            query = {
                date: {
                    $gte: new Date(req.query.year, req.query.month - 1, 1),
                    $lte: new Date(req.query.year, req.query.month, 0),
                },
            };
        }
        const breakdown = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$category', total: { $sum: '$amount' } } }
        ]);
        res.json(breakdown);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
