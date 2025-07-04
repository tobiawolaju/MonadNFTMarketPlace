import React from 'react';
import './Transactions.css';

const Transactions = ({ onToggle, sheetState }) => {
  const transactions = [
    { id: 1, type: 'Minted', nft: 'Astronaut Ape', user: '0xA12...F34' },
    { id: 2, type: 'Listed', nft: 'Space Cat', user: '0xB45...C22' },
    { id: 3, type: 'Traded', nft: 'Quantum Key', user: '0xD78...A90' },
    { id: 4, type: 'Minted', nft: 'Cyber Fox', user: '0xC12...D56' },
    { id: 5, type: 'Burned', nft: 'Defunct NFT', user: '0xE33...F99' },
    { id: 6, type: 'Listed', nft: 'Dark Matter Pass', user: '0xABC...123' },
    { id: 7, type: 'Minted', nft: 'Monad Origin', user: '0x999...888' },
    { id: 8, type: 'Transferred', nft: 'Rare Chip', user: '0x111...222' },
    { id: 9, type: 'Traded', nft: 'Neo Skin #42', user: '0xFED...CBA' },
    { id: 10, type: 'Minted', nft: 'Glitch Punk', user: '0xAAA...BBB' },
    { id: 11, type: 'Listed', nft: 'Shard of X', user: '0x345...678' },
    { id: 12, type: 'Traded', nft: 'Ghost Hacker', user: '0x444...FFF' },
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
