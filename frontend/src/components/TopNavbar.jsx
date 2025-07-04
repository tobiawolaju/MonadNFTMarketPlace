import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';


const TopNavbar = ({ connectWallet, disconnectWallet, account, balance, balanceLoading, isConnecting }) => {
  const [copied, setCopied] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);

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

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/about" className="navbar-link">Cognize</Link>
        <Link to="/create" className="navbar-link">Create</Link>
        <Link to="/" className="navbar-link">Collect</Link>
      </div>
      
      <div className="navbar-links">
        {!account ? (
          <button className="navbar-button" onClick={connectWallet} disabled={isConnecting}>
            {isConnecting ? 'Loading...' : 'Connect'}
          </button>
        ) : (
          <button className="navbar-button connected-wallet-button" onClick={() => setShowWalletPopup(true)}>
            <span>{formatAddress(account)}</span>
            <FiLogOut className="logout-icon" />
          </button>
        )}
      </div>

      {showWalletPopup && account && (
        <div className="wallet-popup-overlay" onClick={() => setShowWalletPopup(false)}>
          <div className="wallet-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Wallet Details</h3>
            <p>
              <strong>Address:</strong> {formatAddress(account)}
              <FaRegCopy className="copy-icon" onClick={copyAddress} />
              {copied && <span className="copied-message">Copied!</span>}
            </p>
            <p>
              <strong>Balance:</strong> {balanceLoading ? "Loading..." : `${balance} MON`}
            </p>
            <button className="navbar-button" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
