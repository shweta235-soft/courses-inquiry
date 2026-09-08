// src/app/api/test-db/route.ts
import { NextResponse } from "next/server";
import pool from  

export async function GET() {
  try {
    // Database se ek basic query execute karke check karte hain
    const [rows] = await pool.query("SELECT 1 + 1 AS result");

    return NextResponse.json(
      {
        message: "Database Connection Successful! 🎉",
        data: rows,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Connection Failed! ❌",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
