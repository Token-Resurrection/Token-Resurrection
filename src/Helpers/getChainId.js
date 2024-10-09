// utils/getChainId.js
import { WebSocketProvider, ethers } from "ethers";

export const getChainId = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new WebSocketProvider(
"https://base-mainnet.g.alchemy.com/v2/zfBCiqBcZwblbUR4xvQUO5FVEYvkVdQ-" );
    const { chainId } = await provider.getNetwork();
    console.log("Chain ID:", chainId);
    return chainId;
  } else {
    console.log("Ethereum object not found");
    return null;
  }
};
