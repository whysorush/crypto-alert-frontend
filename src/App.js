import React from 'react';
import Header from './components/Header';
import CryptoList from './components/CryptoList';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import CryptoPriceGraph from './components/CryptoPriceGraph';
import './Styles/App.css';

const App = () => (
  <div className="app">
    <Header />
    <main>
      <CryptoList />
      <CryptoPriceGraph /> {/* Add the graph here */}
      <AlertForm />
      <AlertList />
    </main>
  </div>
);

export default App;
