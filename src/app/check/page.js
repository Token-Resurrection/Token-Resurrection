"use client";

import { useState } from 'react';
import AddressList from '../../Components/Check/checkAddress'; // Ensure the correct path to your component
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
    <div className="maindiv flex justify-center items-center min-h-screen py-4">
      <div className={`${formstyle.checkpage} w-full lg:w-3/4 xl:w-2/3 bg-white px-4 py-4 md:px-8 md:py-8 rounded-3xl shadow-2xl text-center h-auto mt-12`}>
        <div className="text-gray-900 text-4xl font-bold p-4 m-2 w-full text-center">
          <h1>Token Resurrection</h1>
        </div>
        {showWalletConnect ? (
          <div className="flex flex-col md:flex-row justify-center items-center w-full">
            <button
              className={`${formstyle.buttonin1step} m-2 w-full md:w-auto`}
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
            <span className="mx-2 font-semibold text-2xl text-gray-900">or</span>
            <button
              className={`${formstyle.btncheck} m-2 w-full md:w-auto`}
              onClick={handleCheckAddress}
            >
              Check Address
            </button>
          </div>
        ) : (
          <AddressList onGoBack={handleGoBack} />
        )}
      </div>
    </div>
  );
}

export default MainPage;
