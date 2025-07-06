import React, { useState, useEffect, useRef } from 'react';
import './CreateNFTPage.css';

const CreateNFTPage = ({
  handleMint,
  setName,
  setDescription,
  setImage,
  name,
  description,
  listingPrice,
  setListingPrice,
}) => {
  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  return (
    <div className="create-nft-page">
      <div
        className="upload-box"
        onClick={handleImageClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) {
            setImage(file);
            setPreviewURL(URL.createObjectURL(file));
          }
        }}
      >
        {previewURL ? (
          <img src={previewURL} alt="NFT Preview" className="upload-preview" />
        ) : (
          <span className="upload-text">Click or drag to add image</span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>

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

      <input
        type="number"
        step="0.01"
        placeholder="Listing Price (ETH)"
        value={listingPrice}
        onChange={(e) => setListingPrice(e.target.value)}
      />

      <button onClick={() => handleMint(listingPrice)}>Mint NFT</button>
    </div>
  );
};

export default CreateNFTPage;
