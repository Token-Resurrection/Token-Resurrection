// pages/index.js
"use client";

import { useState } from 'react';
import AnotherComponent from '../../Components/Check/checkAddress';
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";

function MainPage() {
  const [showWalletConnect, setShowWalletConnect] = useState(true);

  const handleConnectWallet = () => {
    // Implement Metamask or wallet connection logic here
    console.log('Connecting wallet...');
  };

  const handleCheckAddress = () => {
    // Switch to another component or state to show different content
    setShowWalletConnect(false);
  };

  const handleGoBack = () => {
    // Switch back to the main component
    setShowWalletConnect(true);
  };

  return (
    <div className={formstyle.checkpage} >
      <div className="w-full lg:w-3/4 xl:w-2/3 bg-white px-8 py-4 md:p-8 rounded-3xl shadow-2xl text-center h-auto mt-12"> 
        <div className="text-gray-900 text-4xl font-bold p-4 m-2">
          <h1>Token Resurrection</h1>
        </div>   
        {showWalletConnect ? (
          <>
            <button
              className={formstyle.buttonin1step}
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
            <span className="mx-2 font-semibold text-2xl text-gray-900">or</span>
            <button
             className={formstyle.btncheck}
              onClick={handleCheckAddress}
            >
              Check Address
            </button>
          </>
        ) : (
          <AnotherComponent onGoBack={handleGoBack} />
        )}
      </div>
    </div>
  );
}

export default MainPage;
