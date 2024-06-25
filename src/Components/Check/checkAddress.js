import { useState } from 'react';
import AddressList from './addressList';
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";

function AnotherComponent({ onGoBack }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);
  const registeredAddresses = [
    "01",
    "0x0135845b20e0d9ECf",
    "0x9abc...",
    // Add more addresses as needed
  ];

  const handleInputChange = (e) => {
    setWalletAddress(e.target.value);
    setIsValid(null);  // Reset validity state on input change
  };

  const checkAddress = () => {
    // Validate the wallet address against the registered addresses
    if (registeredAddresses.includes(walletAddress)) {
      setIsValid(true);
      setShowAddressList(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    showAddressList ? (
      <AddressList onGoBack={onGoBack} />
    ) : (
      <div className="text-center flex flex-col justify-center h-full">
        <div className="text-gray-900 text-2xl font-bold p-4 m-4">
          <h2>Check Wallet Address</h2>
        </div>
        <input
          type="text"
          value={walletAddress}
          onChange={handleInputChange}
          placeholder={isValid === false ? 'Address is not valid!' : 'Enter wallet address'}
          className={`w-full px-3 py-2 border rounded mt-4 ${isValid === false ? 'border-red-700 border-2' : 'border-[#ffb320]'}`}
          style={{ borderColor: isValid === false ? 'red' : '#ffb320' }}
        />
        <div className="flex justify-between md:p-8 text-center">
          <button
            className={formstyle.buttonin11step}
            onClick={onGoBack}
          >
            Back to Home
          </button>
          <button
            className={formstyle.btncheck}
            onClick={checkAddress}
          >
            Check Address
          </button>
        </div>
  
      </div>
    )
  );
}

export default AnotherComponent;
