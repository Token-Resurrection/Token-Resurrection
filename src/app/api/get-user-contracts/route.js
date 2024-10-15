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
    const collection = db.collection("userBalancesInWei2");

    const userData = await collection.findOne({
      userAddress: userAddress.toLowerCase(),
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const contractInfo = [];
    let totalBalance = 0;
    let totalClaimable = 0;

    for (const contract of userData.contracts || []) {
      contractInfo.push({
        contractAddress: contract.contractAddress,
        balance: contract.balance,
      });

      console.log(typeof contract.balance);
      totalBalance += parseInt(contract.balance);
      totalClaimable += parseInt(contract.balance) * 0.7;
    }

    return NextResponse.json({
      userAddress: userAddress,
      contracts: contractInfo,
      totalBalance: totalBalance.toString(),
      totalClaimable: Math.floor(totalClaimable).toString(),
      count: contractInfo.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
