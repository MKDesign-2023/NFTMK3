import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MintPage from './pages/MintPage';
import NFTPage from './pages/NFTPage';
import './styles/styles.css';
import { Web3ModalProvider } from './Web3ModalProvider';

const App = () => {
  return (
    <Web3ModalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mint" element={<MintPage />} />
          <Route path="/nft" element={<NFTPage />} />
        </Routes>
      </Router>
    </Web3ModalProvider>
  );
};

export default App;
