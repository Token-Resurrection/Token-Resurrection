import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_MONGO_URI;
const client = new MongoClient(uri);

export async function GET(NextRequest) {
  const searchParams = NextRequest.nextUrl.searchParams;
  const userAddress = searchParams.get("userAddress");

  if (!userAddress) {
    return NextResponse.json(
      { error: "userAddress query parameter is required" },
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const db = client.db("users");
    const collection = db.collection("userBalances2");

    const userData = await collection.findOne({
      userAddress: userAddress.toLowerCase(),
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const contractInfo = [];
    let totalBalance = 0;
    let totalClaimable = 0;

    // const apiKey = "FBMND61RM2KYWDHWD42PRMTAX5UE2H153G";
    const apiKey = process.env.ETHERSCAN_API_KEY;

    const apiUrl =
      "https://api-optimistic.etherscan.io/api?module=contract&action=getsourcecode&apikey=" +
      apiKey;

    for (const contract of userData.contracts || []) {
      let contractName = "Unknown";
      try {
        const response = await fetch(
          `${apiUrl}&address=${contract.contractAddress}`
        );
        const data = await response.json();

        if (data.status === "1" && data.result && data.result[0]) {
          contractName = data.result[0].ContractName;
        }
      } catch (error) {
        console.log("Error fetching contract name:", error);
      }

      contractInfo.push({
        contractAddress: contract.contractAddress,
        balance: contract.balance,
        contractName: contractName,
      });

      totalBalance += parseInt(contract.balance);
      totalClaimable += parseInt(contract.balance) * 0.7;
    }

    return NextResponse.json({
      userAddress: userAddress,
      contracts: contractInfo,
      totalBalance: BigInt(totalBalance).toString(),
      totalClaimable: BigInt(Math.floor(totalClaimable)).toString(),
      count: contractInfo.length,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
