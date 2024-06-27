import { ConnectAccount } from '@coinbase/onchainkit/wallet'; 
import { useAccount, useDisconnect } from 'wagmi';
import style from './navabr.module.css'; // Ensure you have this CSS file
import { Tooltip, message } from 'antd';

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

  return (
    <div className="flex flex-grow">
      {(() => {
        if (status === 'disconnected') {
          return  <ConnectAccount />
          
        }
        return (
          <div className={`flex h-8 items-center justify-center ${style.dynamicWidth}`}>
            {address && (
                <Tooltip title="Click to Disconnect">
              <button 
                type="button" 
                onClick={handleDisconnect}
                style={{ minWidth: `${formatAddress(address).length * 10}px` }} // Adjust min-width based on address length
                >
                {formatAddress(address)}
              </button>
                  </Tooltip>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
