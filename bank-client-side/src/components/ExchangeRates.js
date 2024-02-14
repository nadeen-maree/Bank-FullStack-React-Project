import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography } from '@mui/material';

const ExchangeRates = () => {
  const [usdToEurRate, setUsdToEurRate] = useState(null);
  const [usdToIlsRate, setUsdToIlsRate] = useState(null);
  const [rateDate, setRateDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5555/transactions/exchange-rates')
      .then(response => {
        setUsdToEurRate(response.data.rates.EUR);
        setUsdToIlsRate(response.data.rates.ILS);
        setRateDate(response.data.date) })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  }, []);

  return (
   <div>
        <Typography variant="h6" style={{textAlign: 'end', marginTop: '10px', marginRight: '30px', color: 'peru', fontWeight: 'bolder', fontFamily: 'initial'}} >
            Date: {rateDate}
        </Typography>
        <Typography variant="h4" style={{textAlign: 'center', marginTop: '50px', color: 'peru', fontWeight: 'bold', fontFamily: 'initial'}} >
             Latest Exchange Rates
        </Typography>
        <Container maxWidth="sm" style={{marginTop: '100px'}}>
            <Card variant="outlined" style={{ marginBottom: '50px', backgroundColor: 'peru' }}>
                <CardContent style={{color: 'bisque'}}>
                    <Typography variant="h6" gutterBottom>
                        USD to EUR
                    </Typography>
                    {usdToEurRate && (
                    <Typography variant="body1">
                        1 USD = {usdToEurRate.toFixed(2)} EUR
                    </Typography>
                    )}
                </CardContent>
            </Card>
            <br></br>
            <Card variant="outlined" style={{backgroundColor: 'peru'}}>
                <CardContent style={{color: 'bisque'}}>
                    <Typography variant="h6" gutterBottom>
                        USD to ILS
                    </Typography>
                    {usdToIlsRate && (
                    <Typography variant="body1">
                        1 USD = {usdToIlsRate.toFixed(2)} ILS
                    </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
   </div>
  );
};

export default ExchangeRates;
