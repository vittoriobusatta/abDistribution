import db from "../../../database/db.json";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(req: Request) {
  const providedApiKey = req.headers.get("x-api-key");

  if (providedApiKey !== API_KEY) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  return new NextResponse(JSON.stringify(db), {
    headers: {
      "content-type": "application/json",
    },
  });
}
