import React, { useState } from 'react';
import NFTs from '../components/NFTs';
import Transactions from '../components/Transactions';


const HomePage = ({ nfts, handleBuy }) => {
  const [sheetState, setSheetState] = useState('hidden'); // 'hidden', 'partial', 'full'

  const toggleSheet = () => {
    setSheetState((prevState) => {
      if (prevState === 'hidden') return 'partial';
      if (prevState === 'partial') return 'full';
      return 'hidden';
    });
  };

  return (
    <div className="home-page">
      <div className="home-page-nfts">
        <NFTs nfts={nfts} handleBuy={handleBuy} />
      </div>
      <div className={`home-page-transactions sheet-${sheetState}`}>
        <Transactions onToggle={toggleSheet} sheetState={sheetState} />
      </div>
    </div>
  );
};

export default HomePage;
