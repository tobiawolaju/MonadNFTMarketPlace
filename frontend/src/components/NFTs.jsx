import React from 'react';
import { Link } from 'react-router-dom';
import './NFTs.css';

const NFTs = ({ nfts, handleBuy }) => {
  return (
    <div className="nfts-container">
      <h2 className="section-header">Available Collections</h2>
      {nfts.map((collectionData) => (
        <div key={collectionData.collectionName} className="nft-collection-section">
          <h3 className="nft-collection-title">Collection: {collectionData.collectionName}</h3>
          <div className="nfts-grid">
            {collectionData.nfts.map((nft) => (
              <div key={nft.id} className="nft-card">
                <Link to={`/nft/${nft.id}`}>
                  <img src={nft.imageUrl} alt={nft.name} className="nft-card-image" />
                  <div className="nft-card-content">
                    <h4 className="nft-card-title">{nft.name}</h4>
                    <p className="nft-card-description">{nft.description}</p>
                    <p className="nft-card-creator">Creator: {nft.creatorWallet}</p>
                    {nft.price && <p className="nft-card-price">Price: {nft.price} MON</p>}
                  </div>
                </Link>
                <button className="nft-card-button" onClick={() => handleBuy(nft)}>Buy NFT</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTs;
