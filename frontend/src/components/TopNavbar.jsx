import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaRegUserCircle, FaRegCopy } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

import './TopNavbar.css';

const TopNavbar = ({ connectWallet, disconnectWallet, account, balance, balanceLoading, isConnecting }) => {
  const [copied, setCopied] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowWalletPopup(false);
  };

  const handleProfileClick = () => {
    if (location.pathname === '/profile') {
      setShowWalletPopup(true);
    } else {
      navigate('/profile');
    }
  };

  return (
    <>
      <nav className="navbar">
<div className="navbar-left">
  {location.pathname !== '/' && (
    <button className="icon-button" onClick={() => navigate(-1)}>
      <FiArrowLeft size={20} />
    </button>
  )}
</div>




        <div className="navbar-center">
       <p>Nad Garden</p>
       </div>

        <div className="navbar-right">
          {!account ? (
            <button className="wallet-button" onClick={connectWallet} disabled={isConnecting}>
              {isConnecting ? '...' : 'Connect'}
            </button>
          ) : (
            <button className="icon-button" onClick={handleProfileClick}>
              {location.pathname === '/profile' ? <FiLogOut /> : <FaRegUserCircle />}
            </button>
          )}
        </div>
      </nav>





      {showWalletPopup && (
        <div className="wallet-popup-overlay" onClick={() => setShowWalletPopup(false)}>
          <div className="wallet-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Wallet Info</h3>
            <p>
              <strong>Address:</strong> {formatAddress(account)}
              <FaRegCopy className="copy-icon" onClick={copyAddress} />
              {copied && <span className="copied-text">Copied!</span>}
            </p>
            <p><strong>Balance:</strong> {balanceLoading ? 'Loading...' : `${balance} MON`}</p>
            <button onClick={handleDisconnect} className="btn-disconnect">Disconnect</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
