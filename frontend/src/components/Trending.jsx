import React from 'react';
import TrendingCards from './TrendingCards';

const Trending = ({ nfts, handleBuy }) => {
  return (
    <div className="nfts-container">
      <h2 className="section-header">Available Collections</h2>

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
