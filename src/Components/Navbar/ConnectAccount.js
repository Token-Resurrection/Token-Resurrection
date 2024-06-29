import React, { useState } from 'react';
import { ConnectAccount } from '@coinbase/onchainkit/wallet'; 
import { useAccount, useDisconnect } from 'wagmi';
import style from './navabr.module.css'; // Ensure you have this CSS file
import { Tooltip, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function AccountConnect() {
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 5)}...${addr.slice(-5)}`;
  };

  const handleDisconnect = () => {
    disconnect();
    message.success('Wallet Disconnected!');
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      message.success('Address copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-grow">
      {(() => {
        if (status === 'disconnected') {
          return <ConnectAccount />;
        }
        return (
          <div 
            className={`flex h-8 items-center justify-center ${style.dynamicWidth}`}
          >
            {address && (
              <div className="relative">
                <Tooltip title="Click to Copy">
                  <button
                    type="button"
                    style={{ minWidth: `${formatAddress(address).length * 10}px` }} // Adjust min-width based on address length
                    onClick={handleCopyAddress}
                  >
                    {formatAddress(address)}
                  </button>
                </Tooltip>
                <Tooltip title="Click to Disconnect">
                  <button onClick={handleDisconnect}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </button>
                </Tooltip>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
