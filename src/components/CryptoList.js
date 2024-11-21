import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/CryptoList.css';

const CryptoList = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/crypto/prices');
        setPrices(data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };
    fetchPrices();
  }, []);

  return (
    <div className="crypto-list">
      <h2>Crypto Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices).map(([crypto, { usd }]) => (
            <tr key={crypto}>
              <td>{crypto.toUpperCase()}</td>
              <td>${usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
