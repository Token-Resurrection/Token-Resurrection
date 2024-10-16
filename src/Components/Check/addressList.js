import React, { useEffect, useState } from "react";
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import { Tooltip } from "antd";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { encodePacked, formatEther, keccak256 } from "viem";
import Modal from "react-modal";
import { signMessage } from "@wagmi/core";
import { config } from "../../app/config";
import { useAccount } from "wagmi";
import Link from "next/link";

function AddressList({ tokens }) {
  const [popupMessage, setPopupMessage] = useState("");
  const { address, isConnected } = useAccount();

  const handleAttestPopup = () => {
    setPopupMessage(
      <>
        <p>
          I agree to receive ${formatEther(tokens.totalClaimable)} tokens back,
          which is 70% of my locked ${formatEther(tokens.totalBalance)} tokens.
          With 20% given to the issuer and 10% retained by Token Resurrection
          for facilitating the recovery process.
        </p>
        <button
          className={`${formstyle.buttonin1steplist} mb-2 md:mb-0 md:mr-2`}
          onClick={() => handleSign()}
        >
          Agree
        </button>
      </>
    );
  };

  const handleSign = async () => {
    const leaf = keccak256(
      encodePacked(["address", "uint256"], [address, tokens.totalClaimable])
    );
    console.log(leaf);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/generate-proof`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leaf: leaf,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate proof");
      }
      const proof = await response.json();
      console.log("proof", proof.proof);
    } catch (error) {}
    const signature = await signMessage(config, {
      message: `I agree to receive ${formatEther(
        tokens.totalClaimable
      )} tokens back, which is 70% of my locked ${formatEther(
        tokens.totalBalance
      )} tokens. With 20% given to the issuer and 10% retained by Token Resurrection for facilitating the recovery process.`,
    });
    console.log(signature);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/store-sign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signature: signature,
            address: address.toLowerCase(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store signature");
      }

      const result = await response.json();
      console.log("Signature stored successfully:", result);

      const leaf = keccak256(
        encodePacked(["address", "uint256"], [address, tokens.totalClaimable])
      );
      console.log(leaf);
      console.log("claim start");
    } catch (error) {
      console.error("Error storing signature:", error);
    }
  };

  const closePopup = () => {
    setPopupMessage("");
  };

  const totalTokens = tokens.length;
  const contracts = tokens;
  console.log("inc data", contracts);

  return !tokens.count ? (
    <h1> No locked tokens found</h1>
  ) : (
    <div className="flex flex-col justify-center items-center h-full px-4 w-full">
      <div className="text-gray-900 text-2xl font-bold p-4 m-2 w-full text-center">
        <h2>You are eligible for the following tokens:</h2>
      </div>
      <div className="overflow-x-auto max-h-64 w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2 md:px-4 md:py-2">Amount</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">
                Contract Address
              </th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens &&
              tokens.contracts?.map((token, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">
                    {token.balance}
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold break-words">
                    {token.contractAddress}
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    <button
                      className={`${formstyle.btnchecklist}`}
                      onClick={() => handleAttestPopup()}
                    >
                      sign
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
          <button onClick={closePopup} className="close-popup">
            X
          </button>
        </div>
      )}

      <div className="pt-4 totaltoken m-4 pb-2 font-semibold text-lg w-full text-center">
        Total tokens in list:{" "}
        <span className="text-green-600">{totalTokens}</span>
      </div>
      <Link href="/" className={formstyle.buttonin1steplist2}>
        Back to the previous page
      </Link>
    </div>
  );
}

export default AddressList;
