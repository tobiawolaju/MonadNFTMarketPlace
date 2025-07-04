import React from 'react';
import './CreateNFTPage.css'

const CreateNFTPage = ({ handleMint, setName, setDescription, setImage, name, description, mintedTokenId, listingPrice, setListingPrice, handleApproveAndList }) => {
  return (
    <div className="create-nft-page">
      <h2>Create and Mint NFT</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleMint}>Mint NFT</button>

      {mintedTokenId && (
        <div className="minted-nft-section">
          <h3>NFT Minted! Token ID: {mintedTokenId}</h3>
          <input
            type="number"
            step="0.01"
            placeholder="Listing Price (ETH)"
            value={listingPrice}
            onChange={(e) => setListingPrice(e.target.value)}
          />
          <button onClick={handleApproveAndList}>Approve & List NFT</button>
        </div>
      )}
    </div>
  );
};

export default CreateNFTPage;
