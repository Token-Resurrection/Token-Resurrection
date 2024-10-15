"use client";
import React, { useEffect, useState } from "react";
import AddressList from "../../Components/Check/addressList";
import formstyle from "../../Components/SubmitDao/stepfrom.module.css";
import { useAccount, useConnect } from "wagmi";
import { message } from "antd";
import Navbar from "@/Components/Navbar/Navbar";

function MainPage() {
  const { address, isConnected } = useAccount();
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

  useEffect(() => {
    if (address) {
      fetchDataFromApi(address);
    } else {
      message.warning("Please connect your wallet first");
    }
  }, [address]);

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

          {isLoading ? <p>Loading...</p> : <AddressList tokens={tokens} />}
        </div>
      </div>
    </>
  );
}

export default MainPage;
