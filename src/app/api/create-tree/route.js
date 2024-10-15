import { MerkleTree } from "merkletreejs";
import { keccak256 } from "viem";
import { encodePacked } from "viem";
import fs from "fs";
import path from "path";

// Helper function to read the airdrop data from a local JSON file
const getAirdropData = () => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "merkleData.json"
  );

  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
};

// Function to create Merkle tree from address-cap pairs
async function createMerkleTree(airdropData) {
  const leafNodes = Object.entries(airdropData).map(([address, cap]) => {
    const packed = encodePacked(["address", "uint256"], [address, cap]);
    return keccak256(packed);
  });

  const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortLeaves: true,
    sortPairs: true,
  });

  const merkleRoot = merkleTree.getRoot().toString("hex");
  return {
    merkleTree,
    merkleRoot,
  };
}

// Export the POST method
export async function POST(req) {
  try {
    const airdropData = getAirdropData();

    const { merkleTree, merkleRoot } = await createMerkleTree(airdropData);

    return new Response(
      JSON.stringify({
        message: "Merkle tree created successfully",
        merkleRoot,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error creating Merkle tree" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
