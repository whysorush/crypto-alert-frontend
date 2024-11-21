import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoPriceGraph = () => {
  const [crypto, setCrypto] = useState('bitcoin'); // Default cryptocurrency
  const [prices, setPrices] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  // Fetch historical price data
  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart`,
          { params: { vs_currency: 'usd', days: '7' } } // Last 7 days
        );

        const priceData = data.prices.map(([timestamp, price]) => ({
          timestamp: new Date(timestamp).toLocaleDateString(),
          price,
        }));

        setPrices(priceData.map((item) => item.price));
        setTimestamps(priceData.map((item) => item.timestamp));
      } catch (error) {
        console.error('Error fetching price history:', error);
      }
    };

    fetchPriceHistory();
  }, [crypto]);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: `${crypto.toUpperCase()} Price (USD)`,
        data: prices,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `7-Day Price History of ${crypto.toUpperCase()}`,
      },
    },
  };

  return (
    <div className="crypto-price-graph">
      <h2>Cryptocurrency Price Graph</h2>
      <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="solana">Solana</option>
        <option value="cardano">Cardano</option>
      </select>
      <div style={{ width: '80%', margin: '20px auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CryptoPriceGraph;
