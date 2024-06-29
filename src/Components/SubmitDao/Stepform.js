"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, message, Skeleton, Steps, theme, Tooltip } from "antd";
import {
  SolutionOutlined,
  UserOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import formstyle from "./stepfrom.module.css";
import { useReadContract } from "wagmi";
import { getTokenBalance } from "@/Helpers/UseTokenBalance";
import propstyle from "../DAO/proposals.module.css";
import { SmileOutlined } from "@ant-design/icons";
import SuccessResult from "./SuccessResult";
import FailureResult from "./FailureResult";
import { formatUnits } from "viem";
// import axios from "axios";

const StepForm = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [contractAddress, setContractAddress] = useState("");
  const [storedAddress, setStoredAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [Totalamount, setTotalamount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [getHolderscount, setHolderscount] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const ETHERSCAN_API_KEY = "JGWS1C3GSNW3GQYVU5AHMB5Y2I9KUI6YHW";
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const postTransaction = async (Transactionobj) => {
    try {
      const response = await fetch("http://localhost:3001/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Transactionobj),
      });
      const data = await response.json();
      setTotalamount(data.totalAmount);
      setTransactions(data.transactions);
      console.log(data.transactions);
      const gettnx = data.transactions;
      setHolderscount(gettnx.length);
      if (response.ok) {
        console.log("Transaction posted successfully!");
        if (data.totalAmount) {
          // setTotalamount(data.totalAmount)
        }
      } else {
        console.error("Transaction post failed:", data);
      }
    } catch (error) {
      console.error("Error posting transaction:", error.message);
    }
  };

  const TransactionsModalContent = () => {
    // Function to truncate address
    const truncateAddress = (from, length) =>
      `${from.substring(0, length)}...${from.substring(
        from.length - length,
        from.length
      )}`;

    return (
      <div className="p-4 max-h-80 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          Addresses of Token Holder and Amount locked{" "}
        </h2>
        <div className="space-y-2 font-bold">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={`flex justify-between py-2 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="text-gray-800">
                {truncateAddress(transaction.from, 8)}{" "}
                {/* Adjust length as needed */}
              </div>

              {/* <div className="text-gray-600">{transaction.amount}</div> */}
              <div className="text-gray-600">
                {" "}
                {(+formatUnits(transaction.amount, 18)).toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const handleSubmit = async () => {
    if (!selectedToken) {
      console.error("No token selected to submit.");
      return;
    }

    try {
      console.log("trying to post");
      setSubmitting(true);
      const response = await fetch("http://localhost:3001/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedToken),
      });
      if (response.ok) {
        console.log("Token submission successful!");
        setSubmissionStatus("success");
        message.info("Proposal  submission successful");
      } else {
        console.error("Token submission failed:", response.statusText);
        setSubmissionStatus("error");
        setErrorMessage(response.statusText);
        message.info("Proposal  submission failed");
      }
    } catch (error) {
      console.error("Error submitting token:", error.message);
      setSubmissionStatus("error");
      setErrorMessage(error.message);
      message.info("Error submitting proposal");
    } finally {
      setSubmitting(false);
    }
  };
  const handleReset = () => {
    setSubmissionStatus(null);
    setErrorMessage("");
  };

  if (submissionStatus === "success") {
    return <SuccessResult onReset={handleReset} />;
  }

  if (submissionStatus === "error") {
    return <FailureResult onReset={handleReset} message={errorMessage} />;
  }

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setContractAddress(value);
  };

  const handleCheck = async () => {
    setStoredAddress(contractAddress);
    console.log("Stored Address:", contractAddress);

    try {
      const abi = await getContractABI(contractAddress);
      console.log(abi);
      if (abi === "unverified") {
        message.info("Contract not verified");
        return;
      }

      // const contract = new ethers.Contract(contractAddress, abi, provider);
      const isUpgradable = isUpgradableContract(abi);

      setCurrent(current + 1);

      message.info("Fetching Token Details");
    } catch (error) {
      console.error("Error analyzing contract:", error);
      message.info("Contract not verified");
    }
  };

  const getContractABI = async (address) => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`
      );
      const data = await response.json();
      console.log(data);

      if (data.status === "1") {
        return JSON.parse(data.result);
      } else if (data.result === "Contract source code not verified") {
        return "unverified";
      } else {
        throw new Error("Failed to fetch ABI");
      }
    } catch (error) {
      console.error("Error fetching ABI:", error);
      return null;
    }
  };

  const isUpgradableContract = (abi) => {
    const upgradableFunctions = [
      "upgradeTo",
      "upgradeToAndCall",
      "setImplementation",
      "_setPendingImplementation",
      "_acceptImplementation",
      "_setPendingAdmin",
      "_acceptAdmin",
    ];
    return abi.some(
      (item) =>
        item.type === "function" && upgradableFunctions.includes(item.name)
    );
  };

  const FirstStep = () => {
    return (
      <div className={formstyle.maindivcontent1}>
        <div className={formstyle.titledivfor1}>
          <h3>Enter Contract Address to Discover Locked Tokens!</h3>
        </div>
        <div className={formstyle.divbtninput}>
          <div className={formstyle.inputbuttondiv}>
            <Tooltip title="Enter Contract Address">
              <input
                placeholder="0x178fDD70ba80D9CbDe941890519D3227c0051fdd"
                value={contractAddress}
                onChange={handleInputChange}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Click here to check Locked tokens">
              <button
                className={formstyle.buttonin1step}
                onClick={contractAddress ? handleCheck : null}
                disabled={!contractAddress}
              >
                Check
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  };

  const TOKENS = [
    {
      tokenName: "UNI",
      tokenAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    },
    {
      tokenName: "WETH",
      tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
      tokenName: "USDC",
      tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      tokenName: "DAI",
      tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
  ];

  const SecondStep = ({ storedAddress, onTokenSelect }) => {
    return (
      <div className={formstyle.maindivcontent2}>
        <div className={formstyle.titlediv2}>
          <h1>Discover Locked Tokens</h1>
        </div>
        <div className={formstyle.tablediv}>
          <table>
            <thead>
              <tr>
                <th>Token Name</th>
                <th>Token Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((token, index) => (
                <TokenRow
                  key={index}
                  token={token}
                  storedAddress={storedAddress}
                  onSelect={onTokenSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleTokenSelect = (tokenData) => {
    const Proposalobject = {
      tokenName: tokenData.tokenName,
      tokenAddress: tokenData.tokenAddress,
      contractAddress: storedAddress,
    };
    setSelectedToken(Proposalobject);
    console.log("Selected Token:", Proposalobject);
    message.info("Generating your Proposal!");
    setCurrent(current + 1);
  };

  const TokenRow = ({ token, storedAddress, onSelect }) => {
    const [balance, setBalance] = useState("Loading...");

    useEffect(() => {
      if (storedAddress) {
        getTokenBalance(token.tokenAddress, storedAddress).then(setBalance);
      }
    }, [storedAddress, token.tokenAddress]);

    const handleRowClick = async () => {
      const tokenData = {
        tokenName: token.tokenName,
        tokenAddress: token.tokenAddress,
        balance: balance,
      };
      onSelect(tokenData);
      const Transactionobj = {
        token: token.tokenName,
        to: storedAddress,
      };
      await postTransaction(Transactionobj); // Call the new function here
    };

    return (
      <tr className={formstyle.trtagbody} onClick={handleRowClick}>
        <Skeleton
          loading={balance === "Loading..."}
          active
          paragraph={{ rows: 1, width: "100%" }}
        >
          <td>{token.tokenName}</td>
          <td>{token.tokenAddress}</td>
          <td>{balance}</td>
        </Skeleton>
      </tr>
    );
  };

  const ThirdStep = () => {
    return (
      <div>
        <div className={formstyle.maindivof4}>
          <div className={formstyle.headingdiv}>
            <div className={formstyle.headingdiv1}>
              <span>Review & Submit.</span>
            </div>
            <div className={formstyle.headingdiv11}>
              Verify the details thoroughly to Create EAS Schema and deploy
              Resolver Address with the Merkel Root
            </div>
          </div>
          <div className={formstyle.tkdetailsdiv}>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Contract Address</div>
              <div className={propstyle.titlecontent}>{storedAddress}</div>
            </div>

            <div className="flex">
              <div className={propstyle.divdetail}>
                <div className={propstyle.titledetail}>Token Name</div>
                <div className={propstyle.titlecontent}>
                  {selectedToken.tokenName}
                </div>
              </div>
              <div className={propstyle.divdetail}>
                <div className={propstyle.titledetail}>Token Amount</div>
                <div className={propstyle.titlecontent}>
                  {(+formatUnits(Totalamount, 18)).toFixed(4)}
                </div>
              </div>
              <div className={propstyle.divdetail}>
                <div className={propstyle.titledetail}>
                  <Tooltip title="Click here to view addresses with locked tokens and their amounts.">
                    <button text-blue-900 onClick={handleOpenModal}>
                      {/* <strong> */}
                      Token Holders ↗{/* </strong> */}
                    </button>
                  </Tooltip>
                </div>
                <div className={propstyle.titlecontent}>{getHolderscount}</div>
              </div>
            </div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Token Address</div>
              <div className={propstyle.titlecontent}>
                {selectedToken.tokenAddress}
              </div>
            </div>
          </div>

          <div className={formstyle.buttondiv}>
            <button
              className={formstyle.buttonin1step}
              onClick={handleSubmit}
              loading={submitting}
              disabled={!selectedToken || submitting}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    {
      title: <div className={formstyle.steptitles}>Verify Address</div>,
      content: <FirstStep />,
      icon: <UserOutlined className={formstyle.customIcon} />,
    },
    {
      title: <div className={formstyle.steptitles}>Check Lock Token</div>,
      content: (
        <SecondStep
          storedAddress={storedAddress}
          onTokenSelect={handleTokenSelect}
        />
      ),
      icon: <UnorderedListOutlined className={formstyle.customIcon} />,
    },
    {
      title: <div className={formstyle.steptitles}>Submit for review</div>,
      content: <ThirdStep />,
      icon: <CheckCircleOutlined className={formstyle.customIcon} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item, index) => ({
    key: item.title,
    title: <span className={formstyle.titleinsteps}>{item.title}</span>,
    icon: (
      <span className={index === current ? formstyle.currentIcon : ""}>
        {item.icon}
      </span>
    ),
    status: index === current ? "process" : index < current ? "finish" : "wait",
  }));

  const contentStyle = {
    minHeight: "400px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: "white",
    borderRadius: "46px",
    border: "none",
    marginTop: 36,
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  };

  return (
    <div className={formstyle.mainndiv}>
      <Steps current={current} items={items} />
      <div className=" text-black" style={contentStyle}>
        {steps[current].content}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <button className={formstyle.buttonin11step} onClick={() => prev()}>
            ← Previous
          </button>
        )}
      </div>
      <Modal
        title="Explore Holders List"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className="modal"
        bodyStyle={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <TransactionsModalContent />
      </Modal>
    </div>
  );
};

export default StepForm;
