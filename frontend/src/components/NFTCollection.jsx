import React from 'react';
import NFTCard from './NFTCard';
import './NFTCollection.css';

const NFTCollection = ({ title, nfts }) => {
  return (
    <div className="nft-collection">
      <h2 className="collection-title">{title}</h2>
      <div className="nft-grid">
        {nfts.map((nft, i) => (
          <NFTCard key={i} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTCollection;
