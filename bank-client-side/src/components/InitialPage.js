import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Filter } from './Filter';

const InitialPage = () => {
  const [transactions, setTransactions] = useState([]);
  const initialPage = true

  useEffect(() => {
    axios.get('http://localhost:5555/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5555/transactions/${id}`)
      .then(response => {
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
      });
  };

  return (
    <div>
      <Filter setTransactions={setTransactions} initialPage={initialPage}/>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: 70 }}>
      {transactions.map(transaction => (
        <Card key={transaction._id} style={{ minWidth: 325, textAlign: 'center', background: 'antiquewhite'}}>
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
            <Typography  color={transaction.amount < 0 ? 'error.main' : 'success.main'} variant="body2" component="p">
              {transaction.amount}$
            </Typography>
            <IconButton onClick={() => handleDelete(transaction._id)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default InitialPage;
