import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaRegUserCircle, FaRegCopy } from 'react-icons/fa';
import './TopNavbar.css';

const TopNavbar = ({ connectWallet, disconnectWallet, account, balance, balanceLoading, isConnecting }) => {
  const [copied, setCopied] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
        <div className="logo-area">
          <Link to="/about" className="logo-text">🪐</Link>
        </div>

        <div className="nav-links">
          <Link to="/" className="navbar-link">Collect</Link>
          <Link to="/create" className="navbar-link">Create</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
        </div>

        <div className="wallet-area">
          {!account ? (
            <button className="navbar-button" onClick={connectWallet} disabled={isConnecting}>
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <button className={`navbar-button ${account ? 'icon-button' : ''}`} onClick={handleProfileClick}>
              {location.pathname === '/profile' ? <FiLogOut /> : <FaRegUserCircle />}
            </button>
          )}
        </div>
      </nav>

      {showWalletPopup && (
        <div className="wallet-popup-overlay" onClick={() => setShowWalletPopup(false)}>
          <div className="wallet-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Wallet Info</h3>
            <p>
              <strong>Address:</strong> {formatAddress(account)}
              <FaRegCopy className="copy-icon" onClick={copyAddress} />
              {copied && <span className="copied-message">Copied!</span>}
            </p>
            <p>
              <strong>Balance:</strong> {balanceLoading ? 'Loading...' : `${balance} MON`}
            </p>
            <button onClick={handleDisconnect} className="btn-primary">Disconnect</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
