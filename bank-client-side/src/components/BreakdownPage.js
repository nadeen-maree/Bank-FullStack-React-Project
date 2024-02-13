import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Typography, TextField } from '@mui/material';
import { Filter } from './Filter';

const BreakdownPage = () => {
    const [breakdown, setBreakdown] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoryTransactions, setCategoryTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5555/transactions/breakdown')
            .then(response => {
                setBreakdown(response.data);
            })
            .catch(error => {
                console.error('Error fetching breakdown:', error);
            });
    }, []);

    const handleCategoryHover = (category) => {
        setHoveredCategory(category);
        axios.get(`http://localhost:5555/transactions?category=${category}`)
            .then(response => {
                setCategoryTransactions(response.data.filter(transaction => transaction.category === category));
                setIsModalOpen(true);
            })
            .catch(error => {
                console.error('Error fetching category transactions:', error);
            });
    };

    const handleModalClose = () => {
        setHoveredCategory(null);
        setCategoryTransactions([]);
        setIsModalOpen(false);
    };

    const filteredBreakdown = breakdown.filter(transaction => transaction._id.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <Filter setBreakdown={setBreakdown}/>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <TextField
                    label="Search by category"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ margin: '20px' }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                <br/>
                <TableContainer component={Paper} style={{backgroundColor: 'peru', width: '700px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{color: 'bisque', fontWeight: 'bolder', fontSize: '18px'}}>Category</TableCell>
                                <TableCell style={{color: 'bisque', fontWeight: 'bolder', fontSize: '18px'}}>Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredBreakdown.map(transaction => (
                                <TableRow
                                    key={transaction._id}
                                    onMouseEnter={() => handleCategoryHover(transaction._id)}
                                    onMouseLeave={handleModalClose}
                                >
                                    <TableCell style={{color: '#492806', fontSize: '14px'}}>{transaction._id}</TableCell>
                                    <TableCell style={{color: '#492806', fontSize: '14px'}}>{transaction.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="category-transactions-modal"
                >
                    <div style={{ position: 'absolute', top: '60%', left: '15%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', opacity: '0.9', padding: '20px', borderRadius: '8px' }}>
                        <Typography variant="h6">Category: {hoveredCategory}</Typography>
                        <Typography variant="body1">Transactions:</Typography>
                        <ul>
                            {categoryTransactions.map((transaction, index) => (
                                <li key={index}>{transaction.vendor}: {transaction.amount}$</li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default BreakdownPage;
