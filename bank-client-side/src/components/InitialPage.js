import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Filter } from './Filter';

const InitialPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const initialPage = true;

  useEffect(() => {
    axios.get(`http://localhost:5555/transactions?page=${currentPage}&limit=${transactionsPerPage}`)
      .then(response => {
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, [currentPage, transactionsPerPage]);

  useEffect(() => {
    if (transactions.length > 0) {
      const filteredTransactions = transactions.filter(transaction =>
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredByCategory(filteredTransactions);
    }
  }, [searchQuery, transactions]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5555/transactions/${id}`)
      .then(response => {
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Filter setTransactions={setTransactions} initialPage={initialPage} />
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <TextField
          label="Search by category"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ margin: '20px' }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', margin: 30, justifyContent: 'center'}}>
        {filteredByCategory.map(transaction => (
          <Card key={transaction._id} style={{ minWidth: 325, textAlign: 'center', background: 'antiquewhite' }}>
            <CardContent>
              <Typography gutterBottom>
                {new Date(transaction.date).toLocaleDateString('en-US')}
              </Typography>
              <Typography gutterBottom>
                {transaction.vendor}
              </Typography>
              <Typography variant="body2" component="p">
                {transaction.category}
              </Typography>
              <Typography color={transaction.amount < 0 ? 'error.main' : 'success.main'} variant="body2" component="p">
                {transaction.amount}$
              </Typography>
              <IconButton onClick={() => handleDelete(transaction._id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
        {[...Array(totalPages).keys()].map(page => (
          <Button style={{color: 'peru', fontWeight: 'bolder'}} key={page + 1} onClick={() => handlePageChange(page + 1)}>{page + 1}</Button>
        ))}
      </div>
    </div>
  );
};

export default InitialPage;
