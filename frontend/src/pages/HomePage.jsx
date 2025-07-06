import React, { useState } from 'react';
import Trending from '../components/Trending';
import Latest from '../components/Latest';


const HomePage = ({ nfts, handleBuy }) => {
 const [sheetState, setSheetState] = useState('collapsed');

const toggleSheet = () => {
  setSheetState(prev => (prev === 'collapsed' ? 'full' : 'collapsed'));
};

  return (
    <div className="home-page">
      <div className="home-page-nfts">
        <Trending nfts={nfts} handleBuy={handleBuy} />
      </div>
      <div className="home-page-transactions">
         <Latest nfts={nfts} handleBuy={handleBuy} />
       </div>
    </div>
  );
};

export default HomePage;
