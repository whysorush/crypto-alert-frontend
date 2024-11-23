import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlertList';
// https://crypto-alert-backend.onrender.com

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data } = await axios.get('https://crypto-alert-backend.onrender.com/api/alerts');
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };
    fetchAlerts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crypto-alert-backend.onrender.com/api/alerts/${id}`);
      setAlerts(alerts.filter((alert) => alert._id !== id));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  return (
    <div className="alert-list">
      <h2>Active Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Crypto</th>
              <th>Condition</th>
              <th>Threshold</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert._id}>
                <td>{alert.crypto.toUpperCase()}</td>
                <td>{alert.condition === 'above' ? 'Above' : 'Below'}</td>
                <td>${alert.threshold}</td>
                <td>{alert.userEmail}</td>
                <td>
                  <button onClick={() => handleDelete(alert._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AlertList;
