import React from 'react';
import './Transactions.css';

const Transactions = ({ onToggle, isSheetOpen }) => {
  const transactions = [
    { id: 1, type: 'Minted', nft: 'NFT 1', user: 'User A' },
    { id: 2, type: 'Listed', nft: 'NFT 2', user: 'User B' },
    { id: 3, type: 'Traded', nft: 'NFT 3', user: 'User C' },
  ];

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h2>Recent Transactions</h2>
        <button className="toggle-button" onClick={onToggle}>
          {isSheetOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <ul className="transactions-list">
        {transactions.map(tx => (
          <li key={tx.id} className="transaction-item">
            <span>{tx.type}: {tx.nft} by {tx.user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
