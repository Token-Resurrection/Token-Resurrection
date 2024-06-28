import { WebSocketProvider, ethers, formatUnits } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const getTokenBalance = async (tokenAddress, walletAddress) => {
  if (!window.ethereum) {
    console.error("MetaMask (or another Web3 provider) not detected");
    return "No provider";
  }

  try {
    const provider = new WebSocketProvider(
      "https://eth-mainnet.g.alchemy.com/v2/zfBCiqBcZwblbUR4xvQUO5FVEYvkVdQ-"
    );
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://mainnet.infura.io/v3/"
    // );
    const erc20Contract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider
    );
    const balance = await erc20Contract.balanceOf(walletAddress);
    const decimal = await erc20Contract.decimals();
    console.log("Token balance:", balance.toString());

    let formattedBalance = formatUnits(balance, decimal);
    console.log("Formatted balance before rounding:", formattedBalance);

    // Round off the formatted balance to two decimal places using toFixed()
    formattedBalance = parseFloat(formattedBalance).toFixed(2);
    console.log("Formatted balance after rounding:", formattedBalance);
    return formattedBalance;
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return "Error";
  }
};
