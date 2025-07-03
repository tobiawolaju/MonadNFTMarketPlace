import React, { useState } from 'react';
import NFTs from '../components/NFTs';
import Transactions from '../components/Transactions';
import './HomePage.css';

const HomePage = ({ nfts, handleBuy }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <div className="home-page">
      <div className="home-page-nfts">
        <NFTs nfts={nfts} handleBuy={handleBuy} />
      </div>
      <div className={`home-page-transactions ${isSheetOpen ? 'sheet-open' : ''}`}>
        <Transactions onToggle={toggleSheet} isSheetOpen={isSheetOpen} />
      </div>
    </div>
  );
};

export default HomePage;
