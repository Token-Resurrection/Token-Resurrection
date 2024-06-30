import React, { useEffect, useState } from "react";
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import "../../app/globals.css";
import { Tooltip } from "antd";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { BrowserProvider } from "ethers";
import { Purple_Purse } from "next/font/google";
import Modal from "react-modal";

function AddressList({ onGoBack, tokens }) {
  const [popupMessage, setPopupMessage] = useState("");

  let provider;
  const setProvider = async () => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new BrowserProvider(window.ethereum);

      return provider;
    }
    console.log(provider);
  };

  useEffect(() => {
    setProvider();
  }, []);

  const handleAttestPopup = async (details) => {
    setPopupMessage(
      <>
        <p>
          I agree to receive 70% of my locked {details.amount} tokens back, with
          20% given to the issuer and 10% retained by Token Resurrection for
          facilitating the recovery process.
        </p>
        <button
          className={`${formstyle.buttonin1steplist} mb-2 md:mb-0 md:mr-2`}
          onClick={() => handleAttest(details)}
        >
          Agree
        </button>
      </>
    );
  };
  const handleAttest = async (details) => {
    console.log(details);
    const eas = new EAS("0x4200000000000000000000000000000000000021");
    const provider = await setProvider();
    const signer = await provider.getSigner();
    eas.connect(signer);

    const schemaEncoder = new SchemaEncoder(
      "address lockedContractAddress, string aggrement, address recovertokenAddress ,string tokenSymbol,bytes proof"
    );

    const encodedData = schemaEncoder.encodeData([
      {
        name: "lockedContractAddress",
        value: details.contractAddress,
        type: "address",
      },
      {
        name: "aggrement",
        value: `I agree to receive 70% of my locked ${details.amount} tokens back, with 20% given to the issuer and 10% retained by Token Resurrection for facilitating the recovery process.`,
        type: "string",
      },
      {
        name: "recovertokenAddress",
        value: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        type: "address",
      },
      { name: "tokenSymbol", value: "DAI", type: "string" },
      {
        name: "proof",
        value:
          "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000139a01635c6a38f8beb0adde454f205fffbb2157797bf1980f8f93a5f70c9f8e6",
        type: "bytes",
      },
    ]);

    const schemaUID =
      "0x725c0d06d06106490197358ae05609cf8fa7989e6bcf68b36b3b3b69396a9806";

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x324e839ECCe8226DFf17d0056874F53355e43095",
        expirationTime: 0,
        revocable: false, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);
    setPopupMessage(
      <>
        View your attestation{" "}
        <a
          href={`https://base-sepolia.easscan.org/attestation/view/${newAttestationUID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </>
    );
  };

  const handleClaim = (index) => {
    // Implement claim logic if needed
  };

  const closePopup = () => {
    setPopupMessage("");
  };

  // Calculate total number of tokens in the list
  const totalTokens = tokens.length;

  return (
    <div className="flex flex-col justify-center items-center h-full px-4 w-full">
      <div className="text-gray-900 text-2xl font-bold p-4 m-2 w-full text-center">
        <h2>You are eligible for the following tokens</h2>
      </div>
      <div className="overflow-x-auto max-h-64 w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2 md:px-4 md:py-2">Symbol</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Amount</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">
                Contract Address
              </th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">
                  {token.symbol}
                </td>
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">
                  {token.amount}
                </td>
                <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold break-words">
                  {token.contractAddress}
                </td>
                <td className="border px-2 py-2 md:px-4 md:py-2">
                  <button
                    className={`${formstyle.buttonin1steplist} mb-2 md:mb-0 md:mr-2`}
                    onClick={() => handleAttestPopup(token)}
                  >
                    Attest
                  </button>
                  <Tooltip title="Waiting for Proposal Approval and Disbursement">
                    <button
                      className={`${formstyle.btnchecklist}`}
                      onClick={() => handleClaim(index)}
                      disabled={true}
                    >
                      {token.claimed ? "Claimed" : "Claim Token"}
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupMessage && (
        <div className="popup-message">
          <span>{popupMessage}</span>
          <button onClick={closePopup} className="close-popup">
            X
          </button>
        </div>
      )}

      <div className="pt-4 totaltoken m-4 pb-2 font-semibold text-lg w-full text-center">
        Total tokens in list:{" "}
        <span className="text-green-600">{totalTokens}</span>
      </div>
      <button className={formstyle.buttonin1steplist2} onClick={onGoBack}>
        Back to the previous page
      </button>
    </div>
  );
}

export default AddressList;
