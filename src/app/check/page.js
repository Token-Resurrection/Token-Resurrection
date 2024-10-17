"use client";
import React, { useEffect, useState } from "react";
import AddressList from "../../Components/Check/addressList";
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import { useAccount, useConnect } from "wagmi";
import { message } from "antd";
import Navbar from "@/Components/Navbar/Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PropagateLoader from "react-spinners/PropagateLoader"; 
import {AlertCircle} from "lucide-react"

function MainPage() {
  const { address, isConnected, status } = useAccount();
  const { connect } = useConnect();
  const [tokens, setTokens] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      message.error("Failed to connect wallet. Please try again.");
    }
  };

  const fetchDataFromApi = async (addressToCheck) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/get-user-contracts?userAddress=${addressToCheck}`
      );

      if (response.status === 404) {
        message.info("No locked tokens found at this address");
        return;
      }
      if (response.status === 500) {
        message.info("Network issue please try again");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return;
      }

      const data = await response.json();
      console.log("data coming here", data);

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      if (data.contracts && data.contracts.length > 0) {
        setTokens(data);
        setShowAddressList(true);
      } else {
        message.info("No locked tokens found at this address");
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isConnected && address && !walletChecked) {
  //     fetchDataFromApi(address);
  //     setWalletChecked(true); // Prevents refetching when walletChecked is true
  //   } else if (!isConnected && !walletChecked) {
  //     message.warning("Please connect your wallet first");
  //     setWalletChecked(true); // Set this to prevent repeated warnings
  //   }
  // }, [isConnected, address, walletChecked]);

  useEffect(() => {
    // Only fetch data if the wallet is connected and we have the address
    if (status === "connected" && address) {
      fetchDataFromApi(address);
    }
    // else{
    //   message.warning("Please connect your wallet first");
    // }
  }, [status, address]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen py-4">
        <div
          className={`${formstyle.checkpage} w-full lg:w-3/4 xl:w-2/3 bg-white px-4 py-4 md:px-8 md:py-8 rounded-3xl shadow-2xl text-center h-auto mt-0`}
        >
          <h1 className="text-gray-900 text-4xl font-bold p-4 m-2 w-full text-center">
            Token Resurrection
          </h1>

          {!isConnected ? (
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Please connect your wallet to proceed.</h3>
            
            </div>
          ) : isLoading ? (
            <div className="flex justify-center">
              <PropagateLoader color={"#123abc"} loading={isLoading} size={15} />
            </div>
          ) : (
            <AddressList tokens={tokens} />
          )}
        </div>
      </div>
    </>
  );
}

export default MainPage;
