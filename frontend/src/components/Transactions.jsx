import React from 'react';
import './Transactions.css';

const Transactions = ({ onToggle, sheetState }) => {
  const transactions = [
    { id: 1, type: 'Minted', nft: 'NFT 1', user: 'User A' },
    { id: 2, type: 'Listed', nft: 'NFT 2', user: 'User B' },
    { id: 3, type: 'Traded', nft: 'NFT 3', user: 'User C' },
  ];

  const getToggleIcon = () =>
    sheetState === 'full' ? 'expand_more' : 'expand_less'; // Down = collapse, Up = expand

  return (
    <div className={`sheet ${sheetState === 'full' ? 'expanded' : 'collapsed'}`}>
      <div className="sheet-handle" onClick={onToggle}>
        <span className="material-symbols-outlined sheet-icon">
          {getToggleIcon()}
        </span>
      </div>
      <ul className="transactions-list">
        {transactions.map((tx) => (
          <li key={tx.id} className="transaction-item">
            <span>{tx.type}: {tx.nft} by {tx.user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
