import React from 'react';
import { useParams } from 'react-router-dom';


const NFTDetailPage = ({ nfts }) => {
  const { id } = useParams();
  const nft = nfts.flatMap(c => c.nfts).find(n => n.id === id);

  if (!nft) {
    return <div className="nft-detail-page">NFT not found</div>;
  }

  return (
    <div className="nft-detail-page">
      <img src={nft.imageUrl} alt={nft.name} className="nft-detail-image" />
      <div className="nft-detail-info">
        <h2>{nft.name}</h2>
        <p>{nft.description}</p>
        <p>Creator: {nft.creatorWallet}</p>
        {nft.price && <p>Price: {nft.price} MON</p>}
      </div>
    </div>
  );
};

export default NFTDetailPage;
