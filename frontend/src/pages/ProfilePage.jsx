import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import NFTCollection from '../components/NFTCollection';
import './ProfilePage.css';

// Dummy JSON for testing
const dummyData = {
  "0xCreatorWallet1": {
    "Cool Collection": {
      "nft_001": {
        name: "Neon Pharaoh",
        description: "A luminous pharaoh glowing under city lights.",
        image: "ipfs://QmExampleImageHash1",
        metadata_uri: "ipfs://QmExampleMetadataHash1",
        collection: "Cool Collection",
        creator: "0xCreatorWallet1",
        timestamp: 1720000010000,
        minted: false
      },
      "nft_002": {
        name: "Quantum Cat",
        description: "A multidimensional feline who purrs in binary.",
        image: "ipfs://QmExampleImageHash2",
        metadata_uri: "ipfs://QmExampleMetadataHash2",
        collection: "Cool Collection",
        creator: "0xCreatorWallet1",
        timestamp: 1720000110000,
        minted: true,
        tokenId: 17,
        owner: "0xBuyerAddressABC123"
      }
    },
    "Dark Pixels": {
      "nft_001": {
        name: "Pixel Doom",
        description: "The last 16-bit boss you’ll ever fight.",
        image: "ipfs://QmExampleImageHash3",
        metadata_uri: "ipfs://QmExampleMetadataHash3",
        collection: "Dark Pixels",
        creator: "0xCreatorWallet1",
        timestamp: 1720000210000,
        minted: false
      }
    }
  },
  "0xCreatorWallet2": {
    "Sky Legends": {
      "nft_001": {
        name: "Cloud Serpent",
        description: "Guardian of the sky kingdom.",
        image: "ipfs://QmExampleImageHash4",
        metadata_uri: "ipfs://QmExampleMetadataHash4",
        collection: "Sky Legends",
        creator: "0xCreatorWallet2",
        timestamp: 1720000310000,
        minted: true,
        tokenId: 31,
        owner: "0xBuyerAddressXYZ789"
      },
      "nft_002": {
        name: "Storm Titan",
        description: "Harnesses the fury of the heavens.",
        image: "ipfs://QmExampleImageHash5",
        metadata_uri: "ipfs://QmExampleMetadataHash5",
        collection: "Sky Legends",
        creator: "0xCreatorWallet2",
        timestamp: 1720000410000,
        minted: false
      }
    }
  }
};

const ProfilePage = ({ account, balance, balanceLoading }) => {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const normalizeIpfsUrl = (url) =>
    url.startsWith('ipfs://') ? url.replace('ipfs://', 'https://ipfs.io/ipfs/') : url;

  // Get only NFTs owned by the user
  const userCollections = [];

  for (const creator in dummyData) {
    for (const collection in dummyData[creator]) {
      const nftObj = dummyData[creator][collection];
      const nfts = Object.entries(nftObj).map(([key, value]) => ({
        ...value,
        id: key,
        image: normalizeIpfsUrl(value.image),
      }));
      const ownedNfts = nfts.filter(
        (nft) =>
          nft.owner && nft.owner.toLowerCase() === account?.toLowerCase()
      );
      if (ownedNfts.length > 0) {
        userCollections.push({ title: collection, nfts: ownedNfts });
      }
    }
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const ensName = await provider.lookupAddress(account);
          if (ensName) {
            const resolver = await provider.getResolver(ensName);
            const ensAvatar = await resolver.getAvatar();
            if (ensAvatar?.url) {
              setAvatar(ensAvatar.url);
            }
          }
        } catch (error) {
          console.error("Error fetching ENS avatar:", error);
        }
      }
    };

    fetchAvatar();
  }, [account]);

  return (
    <div className="profile-page">
      <div className="balance-display">
        {balanceLoading ? 'Loading...' : `${balance || '...'} MONs`}
      </div>

      <div className="address-container">
        <div className="tag lilbenja">X link</div>
        <div className="tag address">{account?.slice(0, 24)}...</div>
      </div>

      <div className="avatar-box">
        {avatar ? <img src={avatar} alt="Avatar" className="avatar" /> : null}
      </div>

      {userCollections.length === 0 ? (
        <p className="no-nfts">You don't own any NFTs</p>
      ) : (
        userCollections.map((col, i) => (
          <NFTCollection key={i} title={col.title} nfts={col.nfts} />
        ))
      )}

      <div className="bottom-buttons">
        <button className="nav-btn btn-primary" onClick={() => navigate('/')}>Explore</button>
        <button className="nav-btn btn-primary" onClick={() => navigate('/create')}>Create NFT</button>
      </div>
    </div>
  );
};

export default ProfilePage;
