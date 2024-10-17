import React, { useEffect, useState } from "react";
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import { Tooltip } from "antd";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { encodePacked, formatEther, keccak256 } from "viem";
// import Modal from "react-modal";
import { signMessage } from "@wagmi/core";
import { config } from "../../app/config";
import { useAccount } from "wagmi";
import Link from "next/link";
import { AlertCircle, X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

function AddressList({ tokens }) {
  const [popupMessage, setPopupMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleAttestPopup = () => {
    setIsModalOpen(true);
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
    setIsModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const totalTokens = tokens.length;
  const contracts = tokens;
  console.log("inc data", contracts);

  return !tokens.count ? (
    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No OP tokens are locked for your address.
      </h3>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-full px-4 w-full">
      <div className="text-gray-900 text-2xl font-bold p-4 m-2 w-full text-center">
        <h2>You are eligible for the following tokens:</h2>
      </div>
      <div className="overflow-x-auto max-h-64 w-full flex flex-col items-center">
        <table className="w-[60%] table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2 md:px-4 md:py-2">Amount</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">
                Contract Address
              </th>
              <th className="border px-2 py-2 md:px-4 md:py-2">
                Contract Name
              </th>
              {/* <th className="border px-2 py-2 md:px-4 md:py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {tokens &&
              tokens.contracts?.map((token, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold">
                    {formatEther(token.balance)} OP
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold break-words">
                    {token.contractAddress}
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2 font-semibold break-words">
                    {token.contractName}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          className={`${formstyle.btnchecklist}`}
          onClick={handleAttestPopup}
        >
          sign
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-2xl font-bold mb-4 text-center">
          Confirm Token Recovery
        </h3>
        <p className="mb-6 text-gray-700">
          I agree to receive {formatEther(tokens.totalClaimable)}OP tokens back,
          which is 70% of my locked {formatEther(tokens.totalBalance)}OP tokens.
          20% will be given to the issuer and 10% retained by Token Resurrection
          for facilitating the recovery process.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-300"
            onClick={handleSign}
          >
            AGREE
          </button>
        </div>
      </Modal>

      <Modal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal}>
        <h3 className="text-2xl font-bold mb-4 text-center">
          Token Claim Update
        </h3>
        <p className="mb-6 text-gray-700">
          You will be able to claim your locked OP tokens soon. A proposal has
          been submitted on Optimism, and once it is approved, the tokens will
          be available for claiming on our site. Please stay tuned for updates.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300"
            onClick={closeConfirmationModal}
          >
            Claim
          </button>
        </div>
      </Modal>

      {/* <div className="pt-4 totaltoken m-4 pb-2 font-semibold text-lg text-center w-[60%]">
        Total tokens in list:{" "}
        <span className="text-green-600">{tokens.count}</span>
      </div> */}
      <Link href="/" className={formstyle.buttonin1steplist2}>
        Back to the previous page
      </Link>
    </div>
  );
}

export default AddressList;
