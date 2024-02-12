import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitialPage from './components/InitialPage';
import OperationsPage from './components/OperationsPage';
import BreakdownPage from './components/BreakdownPage';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css'


const App = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = () => {
    axios.get('http://localhost:5555/transactions')
      .then(response => {
        const totalBalance = response.data.reduce((acc, curr) => acc + curr.amount, 0);
        setBalance(totalBalance);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
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
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
