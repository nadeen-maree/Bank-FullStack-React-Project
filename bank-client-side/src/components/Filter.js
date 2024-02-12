import React, { useState } from 'react';
import axios from 'axios';
import {Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const Filter = ({setTransactions, initialPage, setBreakdown}) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleTransactionsFilter = () => {
        axios.get(`http://localhost:5555/transactions?month=${selectedMonth}&year=${selectedYear}`)
        .then(response => {
        setTransactions(response.data);
        setSelectedMonth('')
        setSelectedYear('')

        })
        .catch(error => {
        console.error('Error fetching transactions:', error);
        });
    };

    const handleBreakdownFilter = () => {
        axios.get(`http://localhost:5555/transactions/breakdown?month=${selectedMonth}&year=${selectedYear}`)
        .then(response => {
            setBreakdown(response.data);
            setSelectedMonth('')
            setSelectedYear('')
        })
        .catch(error => {
            console.error('Error fetching breakdown:', error);
        });
    }

  return (
    <div>
         <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select label="Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <MenuItem value={1}>January</MenuItem>
          <MenuItem value={2}>February</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>August</MenuItem>
          <MenuItem value={9}>September</MenuItem>
          <MenuItem value={10}>October</MenuItem>
          <MenuItem value={11}>November</MenuItem>
          <MenuItem value={12}>December</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select label='Year' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>

      <div style={{ display: 'inline-block', marginTop: '13px' }}>
        <Button variant="outlined" onClick= {initialPage ? handleTransactionsFilter : handleBreakdownFilter} color='success' size='small'>Filter</Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
        <Button variant="contained" onClick={initialPage ? handleTransactionsFilter : handleBreakdownFilter} color='success' size='small'>{initialPage ? "All Transactions" : "All Breakdown"}</Button>
      </div>
    </div>
  )
}
