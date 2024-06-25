import React, { useState } from 'react';
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import "../../app/globals.css";

function AddressList({ onGoBack }) {
  const initialTokens = [
    { name: 'USDC', lockedIn: true, address: '0x1234...', submitted: false, claimed: false },
    { name: 'USDT', lockedIn: true, address: '0sdjcnmmmksdkfkslnsanasns', submitted: false, claimed: false },
    { name: 'Chainlink Token', lockedIn: true, address: '0x9abc...', submitted: false, claimed: false },
    // Add more tokens as needed
  ];

  const [tokens, setTokens] = useState(initialTokens);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = (index) => {
    const updatedTokens = [...tokens];
    updatedTokens[index].submitted = true;
    setTokens(updatedTokens);
  };

  const handleClaim = (index) => {
    const token = tokens[index];
    if (!token.submitted) {
      setPopupMessage('Please submit before claiming');
    } else if (token.claimed) {
      setPopupMessage('Token already claimed');
    } else {
      const updatedTokens = [...tokens];
      updatedTokens[index].claimed = true;
      setTokens(updatedTokens);
    }
  };

  const closePopup = () => {
    setPopupMessage('');
  };

  // Calculate total number of tokens in the list
  const totalTokens = initialTokens.length;

  return (
    <div className="text-center flex flex-col justify-center h-full">
      <div className="text-gray-900 text-2xl font-bold p-4 m-2">
        <h2>You are eligible to claim the following tokens</h2>
      </div>
      <div className="overflow-y-auto max-h-64 mx-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 rounded-xl">
              <th className="border px-4 py-2">Token</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Contract Address</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border px-4 py-2 font-semibold">{token.name}</td>
                <td className="border px-4 py-2 font-semibold">
                  {token.lockedIn ? (
                    <span>
                      <i className="fas fa-lock"></i> Locked In
                    </span>
                  ) : (
                    'Unlocked'
                  )}
                </td>
                <td className="border  font-semibold px-4 py-2">{token.address}</td>
                <td className="border px-4 py-2">
                  <button
                    className={formstyle.buttonin1steplist}
                    onClick={() => handleSubmit(index)}
                  >
                    Submit
                  </button>
                  <button
                    className={`${formstyle.btnchecklist} ${token.claimed ? 'dull-button' : ''}`}
                    onClick={() => handleClaim(index)}
                    disabled={token.claimed}
                  >
                    {token.claimed ? 'Claimed' : 'Claim Token'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupMessage && (
        <div className="popup-message">
          <span>{popupMessage}</span>
          <button onClick={closePopup} className="close-popup">X</button>
        </div>
      )}
      <div className="pt-4 bg-gray-200 m-4 pb-2 font-semibold text-lg">
        Total tokens in list: <span className="text-green-600">{totalTokens}</span>
      </div>
    </div>
  );
}

export default AddressList;
