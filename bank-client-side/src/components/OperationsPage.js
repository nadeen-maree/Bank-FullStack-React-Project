import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import SnackbarMessage from './SnackbarMessage';

const OperationsPage = ({ balance }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [date, setDate] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTransaction = (type) => {
    const transactionAmount = parseFloat(amount);

    if (!amount || !category || !vendor || !date) {
      setSnackbarMessage('Please fill in all fields');
      setSnackbarOpen(true);
      return;
    }

    const adjustedAmount = type === 'Deposit' ? transactionAmount : -transactionAmount;
    const newTransaction = {
      amount: adjustedAmount,
      category,
      vendor,
      date
    };

    if (type === 'Withdraw' && (balance + adjustedAmount) < 500) {
      setSnackbarMessage('Insufficient Funds');
      setSnackbarOpen(true);
      return;
    }

    axios.post('http://localhost:5555/transactions', newTransaction)
      .then(response => {
        console.log('Transaction added successfully:', response.data);
        setAmount('');
        setCategory('');
        setVendor('');
        setDate('');
        setSnackbarMessage('Expense added successfully');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error adding transaction:', error);
        setSnackbarMessage('An error occurred while adding the transaction');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='add-transaction'>
      <h1 className='add-transaction-header'>Add Transaction</h1>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <TextField
        label="Vendor"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />
       <br />

      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DateField']} >
            <DateField
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            />
        </DemoContainer>
      </LocalizationProvider>
       
     <br/>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button onClick={() => handleTransaction('Deposit')} variant="contained" color="success">
          Deposit 
        </Button>
        <Button onClick={() => handleTransaction('Withdraw')} variant="contained" color="error" >
          Withdraw
        </Button>
      </div>
      <SnackbarMessage
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default OperationsPage;
