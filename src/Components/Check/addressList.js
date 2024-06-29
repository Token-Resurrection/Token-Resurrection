import React, { useState } from 'react';
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import "../../app/globals.css";

function AddressList({ onGoBack, tokens }) {
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = (index) => {
    // Implement submission logic if needed
  };

  const handleClaim = (index) => {
    // Implement claim logic if needed
  };

  const closePopup = () => {
    setPopupMessage('');
  };

  // Calculate total number of tokens in the list
  const totalTokens = tokens.length;

  return (
    <div className="flex flex-col justify-center items-center h-full px-4 w-full">
      <div className="text-gray-900 text-2xl font-bold p-4 m-2 w-full text-center">
        <h2>You are eligible to claim the following tokens</h2>
      </div>
      <div className="overflow-x-auto max-h-64 w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2 md:px-4 md:py-2">Symbol</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Amount</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Contract Address</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">{token.symbol}</td>
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">{token.amount}</td>
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold break-words">{token.contractAddress}</td>
                <td className="border px-2 py-2 md:px-4 md:py-2">
                  <button
                    className={`${formstyle.buttonin1steplist} mb-2 md:mb-0 md:mr-2`}
                    onClick={() => handleSubmit(index)}
                  >
                    Attest
                  </button>
                  <button
                    className={`${formstyle.btnchecklist}`}
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

      <div className="pt-4 bg-gray-200 m-4 pb-2 font-semibold text-lg w-full text-center">
        Total tokens in list: <span className="text-green-600">{totalTokens}</span>
      </div>
      <button className={formstyle.buttonin1steplist2} onClick={onGoBack}>
        Back to the previous page
      </button>
    </div>
  );
}

export default AddressList;
