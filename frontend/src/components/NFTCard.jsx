import React from 'react';
import './NFTCard.css';

const NFTCard = ({ nft }) => {
  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} className="nft-img" />
      <div className="nft-info">
        <h3 className="nft-name">{nft.name}</h3>
        <p className="nft-desc">{nft.description}</p>
      </div>
    </div>
  );
};

export default NFTCard;
