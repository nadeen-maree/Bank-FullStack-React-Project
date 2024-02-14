import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitialPage from './components/InitialPage';
import OperationsPage from './components/OperationsPage';
import BreakdownPage from './components/BreakdownPage';
import Navbar from './components/Navbar';
import ExchangeRates from './components/ExchangeRates';
import axios from 'axios';
import './App.css'



const App = () => {
  const [balance, setBalance] = useState(0);
  const transactionsPerPage = 6;

  const fetchBalance = async () => {
    try {
      let currentPage = 1;
      let totalPages = 1;
      let totalBalance = 0;
  
      while (currentPage <= totalPages) {
        const response = await axios.get(`http://localhost:5555/transactions?page=${currentPage}&limit=${transactionsPerPage}`);
        const { transactions, totalPages: pages } = response.data;
        totalPages = pages;
  
        const pageBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
        totalBalance += pageBalance;
  
        currentPage++;
      }
  
      setBalance(totalBalance);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  

  useEffect(() => {
    fetchBalance();

    const interval = setInterval(fetchBalance, 0);

    return () => clearInterval(interval);
  }, []);

  

  return (
    <Router>
      <div>
      <div>
          <Navbar balance={balance}/>
      </div>
        
        
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/operations" element={<OperationsPage  balance={balance}/> } />
          <Route path="/breakdown" element={<BreakdownPage />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
