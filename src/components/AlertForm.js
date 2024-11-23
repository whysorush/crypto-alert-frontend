import React, { useState } from 'react';
import axios from 'axios';
import './AlertForm';

const AlertForm = () => {
  const [form, setForm] = useState({
    crypto: '',
    condition: '',
    threshold: '',
    userEmail: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://crypto-alert-backend.onrender.com/api/alerts', form);
      alert('Alert created!');
      setForm({ crypto: '', condition: '', threshold: '', userEmail: '' });
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  return (
    <div className="alert-form">
      <h2>Create Alert</h2>
      <form onSubmit={handleSubmit}>
        
        <select
          value={form.crypto}
          onChange={(e) => setForm({ ...form, crypto: e.target.value })}
        >
          <option value="">Crypto</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="dogecoin">Dogecoin</option>
          <option value="solana">Solana</option>
          <option value="cardano">Cardano</option>
        </select>
        <select
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
        >
          <option value="">Condition</option>
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input
          type="number"
          placeholder="Threshold"
          value={form.threshold}
          onChange={(e) => setForm({ ...form, threshold: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.userEmail}
          onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
        />
        <button type="submit">Set Alert</button>
      </form>
    </div>
  );
};

export default AlertForm;
