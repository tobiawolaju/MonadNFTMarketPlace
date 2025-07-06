import React from 'react';
import LatestCards from './LatestCards';

const Latest = ({ nfts, handleBuy }) => {
  return (
    <div className="nfts-container">
      <h2 className="section-header">Available Collections</h2>

      {nfts.length === 0 ? (
        <p className="empty-message">No NFTs available right now.</p>
      ) : (
        nfts.map(({ collectionName, nfts }) => (
          <LatestCards
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

export default Latest;
