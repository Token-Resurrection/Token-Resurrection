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
    <div className="flex flex-col justify-center items-center h-full px-4 w-full">
      <div className="text-gray-900 text-2xl font-bold p-4 m-2 w-full text-center">
        <h2>You are eligible to claim the following tokens</h2>
      </div>
      <div className="overflow-x-auto max-h-64 w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="totaltoken">
              <th className="border px-2 py-2 md:px-4 md:py-2">Token</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Status</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Contract Address</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index} className="bg-white hover:bg-purple-50">
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">{token.name}</td>
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">
                  {token.lockedIn ? (
                    <span className="flex items-center justify-center">
                      <img src="https://cdn-user-icons.flaticon.com/153977/153977980/1719383805668.svg?token=exp=1719384706~hmac=4a4f8c58db4e835ef816b6fca0df62ab" alt="Locked Icon" className="w-6 h-6 mr-2 p-1" />
                      <span>
                        <i className="fas fa-lock"></i> Locked In
                      </span>
                    </span>
                  ) : (
                    'Unlocked'
                  )}
                </td>
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold break-words">{token.address}</td>
                <td className="border px-2 py-2 md:px-4 md:py-2">
                  <button
                    className={`${formstyle.buttonin1steplist} mb-2 md:mb-0 md:mr-2`}
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

      <div className="pt-4 totaltoken m-4 pb-2 font-semibold text-lg w-full text-center">
        Total tokens in list: <span className="text-green-600">{totalTokens}</span>
      </div>
      <button className={formstyle.buttonin1steplist2} onClick={onGoBack}>
        Back to the previous page
      </button>
    </div>
  );
}

export default AddressList;
