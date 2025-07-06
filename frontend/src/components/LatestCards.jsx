import React from 'react';
import { Link } from 'react-router-dom';

const LatestCards = ({ collectionName, nfts, handleBuy }) => {
  return (
    <div className="collection">
      <h3 className="collection-title">{collectionName}</h3>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <div key={nft.id} className="nft-card">
            <Link to={`/nft/${nft.id}`} className="nft-click-area">
              <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
              <div className="nft-info">
                <h4 className="nft-name">{nft.name}</h4>
                <p className="nft-desc">{nft.description}</p>
                <p className="nft-meta">Creator: {nft.creator}</p>
                {nft.price && <p className="nft-price">{nft.price} MON</p>}
              </div>
            </Link>
            <button className="nft-buy-btn" onClick={() => handleBuy(nft)}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCards;
