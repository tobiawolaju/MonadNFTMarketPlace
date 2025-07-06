import React from 'react';
import './Marketplace.css';
import TrendingCards from './TrendingCards';

const Trending = ({ nfts, handleBuy }) => {
  return (
    <div className="nfts-container">
      {nfts.length === 0 ? (
        <p className="empty-message">No NFTs available right now.</p>
      ) : (
        nfts.map(({ collectionName, nfts }) => (
          <TrendingCards
            key={collectionName}
            collectionName={collectionName}
            nfts={nfts}
            handleBuy={handleBuy}
          />
        ))
      )}
    </div>
  );
};

export default Trending;
