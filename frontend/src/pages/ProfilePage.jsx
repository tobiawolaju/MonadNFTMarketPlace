import React, { useState, useEffect } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { ethers } from 'ethers';
import Identicon from '../components/Identicon';
import './ProfilePage.css';

const ProfilePage = ({ nfts, account, balance, balanceLoading }) => {
  const [avatar, setAvatar] = useState(null);
  const userNfts = nfts
    .flatMap(collection => collection.nfts)
    .filter(nft => nft.owner && nft.owner.toLowerCase() === account.toLowerCase());

  useEffect(() => {
    const fetchAvatar = async () => {
      if (account) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const ensName = await provider.lookupAddress(account);
          if (ensName) {
            const resolver = await provider.getResolver(ensName);
            const ensAvatar = await resolver.getAvatar();
            if (ensAvatar) {
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
      <div className="profile-header">
        {avatar ? (
          <img src={avatar} alt="Profile" className="profile-image" />
        ) : (
          <Identicon address={account} size={150} />
        )}
        <h2 className="wallet-address">{account}</h2>
        <div className="net-worth">
          <h3>Net Worth</h3>
          <p>{balanceLoading ? 'Loading...' : `${balance} MON`}</p>
        </div>
        <button className="connect-twitter-btn btn-primary">
          <FaTwitter /> Connect Twitter
        </button>
      </div>

      <div className="nft-grid">
        {userNfts.length > 0 ? (
          userNfts.map(nft => (
            <div key={nft.id} className="nft-card">
              <img src={nft.imageUrl} alt={nft.name} />
              <h3>{nft.name}</h3>
            </div>
          ))
        ) : (
          <p>You don't own any NFTs yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
