import React, { useState } from 'react';
import NFTs from '../components/NFTs';
import Transactions from '../components/Transactions';
import './HomePage.css';

const HomePage = ({ nfts, handleBuy }) => {
 const [sheetState, setSheetState] = useState('collapsed');

const toggleSheet = () => {
  setSheetState(prev => (prev === 'collapsed' ? 'full' : 'collapsed'));
};

  return (
    <div className="home-page">
      <div className="home-page-nfts">
        <NFTs nfts={nfts} handleBuy={handleBuy} />
      </div>
      <div className="home-page-transactions">
        <Transactions onToggle={toggleSheet} sheetState={sheetState} />
      </div>
    </div>
  );
};

export default HomePage;
