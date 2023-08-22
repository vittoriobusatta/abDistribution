import db from "../../../../database/db.json";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(req: Request) {
  const providedApiKey = req.headers.get("x-api-key");

  if (providedApiKey !== API_KEY) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  const url = new URL(req.url); // Convert string URL to URL object
  const pathParts = url.pathname.split("/"); // Split the path into parts
  const collectionId = pathParts[pathParts.length - 1]; // Get the last part which is your collectionId

  if (!collectionId) {
    return new NextResponse("Invalid parameters", {
      status: 400,
    });
  }
  const collection = Object.values(db.collections).find(
    (collection) => collection.id === collectionId
  );

  if (!collection) {
    return new NextResponse("Collection not found", {
      status: 404,
    });
  }
  return new NextResponse(JSON.stringify(collection), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
