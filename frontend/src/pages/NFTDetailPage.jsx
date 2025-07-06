import React from 'react';
import { useParams } from 'react-router-dom';
import './NFTDetailPage.css';

const NFTDetailPage = ({ nfts }) => {
  const { id } = useParams();
  const nft = nfts.flatMap((c) => c.nfts).find((n) => n.id === id);

  if (!nft) {
    return <div className="nft-detail-page">NFT not found</div>;
  }

  const handleBuy = () => {
    alert(`Buying ${nft.name}...`);
    // Add your buy logic here
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('NFT link copied to clipboard!');
  };

  return (
    <>
      <div className="nft-detail-page">
        <div className="nft-detail-card card">
          <img src={nft.imageUrl} alt={nft.name} className="nft-detail-image" />
          <div className="nft-detail-info">
            <h2 className="nft-detail-name">{nft.name}</h2>
            <p className="nft-detail-desc">{nft.description}</p>
            <p className="nft-detail-meta">Creator: {nft.creator}</p>
            {nft.price && <p className="nft-detail-price">Price: {nft.price} MON</p>}
          </div>
        </div>
      </div>

      <div className="bottom-buttons">
        <button className="nav-btn" onClick={handleBuy}>Buy</button>
        <button className="nav-btn" onClick={handleShare}>Share</button>
      </div>
    </>
  );
};

export default NFTDetailPage;
