import React from "react";
import TokenRow from "./TokenRow";
import formstyle from "./stepform.module.css";

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
        <h1>Discover Your Holdings</h1>
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

export default SecondStep;
