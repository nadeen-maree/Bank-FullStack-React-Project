import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Typography } from '@mui/material';
import { Filter } from './Filter';

const BreakdownPage = () => {
    const [breakdown, setBreakdown] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoryTransactions, setCategoryTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div>
            <Filter setBreakdown={setBreakdown}/>
            <div>
                <br/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {breakdown.map(transaction => (
                                <TableRow
                                    key={transaction._id}
                                    onMouseEnter={() => handleCategoryHover(transaction._id)}
                                    onMouseLeave={handleModalClose}
                                >
                                    <TableCell>{transaction._id}</TableCell>
                                    <TableCell>{transaction.total}</TableCell>
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
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', opacity: '0.9', padding: '20px', borderRadius: '8px' }}>
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
