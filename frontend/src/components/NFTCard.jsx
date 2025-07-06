import React, { useState } from 'react';
import './NFTCard.css';

const NFTCard = ({ nft }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="nft-card card">
      <div className="image-preload-container">
        {!imageLoaded && (
          <div className="skeleton-loader skeleton-image"></div>
        )}
        <img
          src={nft.image}
          alt={nft.name}
          className={`nft-image ${imageLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className="nft-info">
        <h3 className="nft-name">
          {!imageLoaded ? <div className="skeleton-loader skeleton-text short"></div> : nft.name}
        </h3>
        <p className="nft-desc">
          {!imageLoaded ? <div className="skeleton-loader skeleton-text"></div> : nft.description}
        </p>
        {/* Add more skeleton placeholders for price, etc. if needed */}
      </div>
    </div>
  );
};

export default NFTCard;
