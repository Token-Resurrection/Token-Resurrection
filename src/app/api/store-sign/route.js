import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_MONGO_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    // Parse the request body using req.json()
    const { address, signature } = await req.json();

    if (!signature || !address) {
      return NextResponse.json(
        { error: "Address and signature are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await client.connect();
    const db = client.db("users");
    const collection = db.collection("userBalances2");

    // Update the document matching the address
    const result = await collection.updateOne(
      { userAddress: address },
      { $set: { signature, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Document not found for the provided user address." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Signature added successfully!", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An internal server error occurred", details: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
