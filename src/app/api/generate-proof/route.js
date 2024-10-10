import { MerkleTree } from "merkletreejs";
import { keccak256 } from "viem";
import fs from "fs";
import path from "path";
import { encodePacked } from "viem";

// Helper function to read the airdrop data from a local JSON file
const getAirdropData = () => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "airdropData.json"
  );

  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
};

// Function to recreate Merkle tree
async function createMerkleTree(airdropData) {
  const leafNodes = Object.entries(airdropData).map(([address, cap]) => {
    const packed = keccak256(
      encodePacked(["address", "uint256"], [address, cap])
    );
    return packed;
  });

  return new MerkleTree(leafNodes, keccak256, {
    sortLeaves: true,
    sortPairs: true,
  });
}

export async function POST(req) {
  const { leaf } = await req.json();

  if (!leaf) {
    return new Response(JSON.stringify({ error: "Leaf is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const airdropData = getAirdropData();
    const merkleTree = await createMerkleTree(airdropData);

    const proof = merkleTree.getHexProof(leaf);

    return new Response(JSON.stringify({ proof }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error generating proof" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
