"use client"
import React, { useState } from 'react';
import { ConnectAccount } from '@coinbase/onchainkit/wallet'; // Adjust if different
import '@coinbase/onchainkit/styles.css';

const ConnectAccountWrapper = () => {
  const [account, setAccount] = useState('');

  const handleAccountChange = (newAccount) => {
    console.log('Full Address:', newAccount); // Log the full address
    const slicedAddress = `${newAccount.slice(0, 6)}...${newAccount.slice(-4)}`;
    console.log('Sliced Address:', slicedAddress); // Log the sliced address
    setAccount(slicedAddress);
  };

  return (
    <div className="walletbtn bg-yellow-500">
      {account ? account : <ConnectAccount onAccountChange={handleAccountChange} />}
    </div>
  );
};

export default ConnectAccountWrapper;
