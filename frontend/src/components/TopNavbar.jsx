import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';
import './TopNavbar.css';

const TopNavbar = ({ connectWallet, disconnectWallet, account, balance, balanceLoading, isConnecting }) => {
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="navbar">
        <Link to="/" className="navbar-link">Monad Garden</Link>
      <div className="navbar-links">
        <Link to="/create" className="navbar-link">Mint</Link>
        {!account ? (
          <button className="navbar-button" onClick={connectWallet} disabled={isConnecting}>
            {isConnecting ? 'Loading...' : 'Connect'}
          </button>
        ) : (
          <button className="navbar-button connected-wallet-button" onClick={disconnectWallet}>
            <span className="wallet-address-container">
              <span>{formatAddress(account)}</span>
              <FaRegCopy className="copy-icon" onClick={(e) => { e.stopPropagation(); copyAddress(); }} />
              {copied && <span className="copied-message">Copied!</span>}
            </span>
            <span className="wallet-balance-display">
              {balanceLoading ? "Loading..." : `${balance} MON`}
            </span>
            <FiLogOut className="logout-icon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
