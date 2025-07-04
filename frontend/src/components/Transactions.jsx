import React, { useState } from 'react';

const Transactions = () => {
  const [sheetState, setSheetState] = useState('collapsed'); // 'collapsed' or 'expanded'

  const toggleSheet = () => {
    setSheetState((prev) => (prev === 'collapsed' ? 'expanded' : 'collapsed'));
  };

  const transactions = [
    {
      id: 1,
      type: 'Minted',
      nft: 'Astronaut Ape #001',
      user: '0x1a2b...3c4d',
      value: '0.08 ETH',
      timestamp: '2025-07-04 14:22',
    },
    {
      id: 2,
      type: 'Listed',
      nft: 'CyberCat #127',
      user: '0x4d5e...6f7a',
      value: '1.2 ETH',
      timestamp: '2025-07-04 13:05',
    },
    {
      id: 3,
      type: 'Purchased',
      nft: 'Pixel Bot #088',
      user: '0x9a8b...7c6d',
      value: '0.95 ETH',
      timestamp: '2025-07-04 12:47',
    },
    {
      id: 4,
      type: 'Transferred',
      nft: 'Dragon Egg #305',
      user: '0x3f2e...1a0b',
      value: '—',
      timestamp: '2025-07-04 11:33',
    },
    {
      id: 5,
      type: 'Minted',
      nft: 'Neon Skull #999',
      user: '0xa1b2...c3d4',
      value: '0.05 ETH',
      timestamp: '2025-07-04 10:18',
    },
  ];

  return (
    <div className={`sheet ${sheetState}`}>
    <div className="transactions-header" onClick={toggleSheet}>
  <div className="sheet-grabber" />
  <h3>Transactions</h3>
  <button className="toggle-button">Toggle</button>
</div>

      <ul className="transactions-list">
        {transactions.map((tx) => (
          <li key={tx.id} className="transaction-item">
            <div><strong>{tx.type}</strong> - <span>{tx.nft}</span></div>
            <div>By: <span>{tx.user}</span></div>
            <div>Value: <span>{tx.value}</span></div>
            <div><small>{tx.timestamp}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
