import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({balance}) => {
  return (
    <div className='header'>
      <nav className="navbar">
        <Link to="/"><div className="navbar-link">Transactions</div></Link>
        <Link to="/operations"> <div className="navbar-link">Operations</div></Link>
        <Link to="/breakdown"> <div className="navbar-link">Breakdown</div></Link>
        <Link to="/exchange-rates"> <div className="navbar-link">Exchange Rates</div></Link>
        <div style={{marginLeft: 'auto', marginRight: 20}}>
           <h1 style={{ color: balance >= 500 ? 'green' : 'red' }}>Balance: ${balance}</h1>
        </div>
      </nav>
    </div>
    
  );
}


export default Navbar;
