import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_MONGO_URI;
const client = new MongoClient(uri);

export async function GET(NextRequest) {
  const searchParams = NextRequest.nextUrl.searchParams;
  const contractAddress = searchParams.get("contractAddress");

  if (!contractAddress) {
    return NextResponse.json(
      { error: "contractAddress query parameter is required" },
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const db = client.db("users");
    const collection = db.collection("userBalances");

    const users = await collection
      .find({ "contracts.contractAddress": contractAddress.toLowerCase() })
      .toArray();

    if (users.length === 0) {
      return NextResponse.json(
        { error: "No users found for the given contract address" },
        { status: 404 }
      );
    }

    const response = users.flatMap((user) =>
      user.contracts
        .filter(
          (contract) =>
            contract.contractAddress === contractAddress.toLowerCase()
        )
        .map((contract) => ({
          userAddress: user.userAddress,
          balance: contract.balance,
        }))
    );

    return NextResponse.json({
      contractAddress: contractAddress,
      users: response,
      count: response.length,
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
