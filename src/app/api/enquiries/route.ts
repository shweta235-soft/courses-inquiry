// src/app/api/enquiries/route.ts
import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

// 1. GET API: Admin dashboard ke liye MySQL se enquiries fetch karna (With Admin Reply)
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM enquiries ORDER BY createdAt DESC",
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("❌ SQL Get Error Inside API:", error.message);
    return NextResponse.json(
      { message: "DB Fetch Fail", error: error.message },
      { status: 500 },
    );
  }
}

// 2. POST API: Student view se naye enquiry form ka data MySQL me insert karna
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, course, query } = body;

    const sql =
      "INSERT INTO enquiries (name, email, phone, course, query) VALUES (?, ?, ?, ?, ?)";
    const values = [name, email, phone, course, query];

    const [result] = await pool.query(sql, values);

    return NextResponse.json(
      { success: true, message: "Inquiry saved directly into MySQL!" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("❌ SQL Insert Error Inside API:", error.message);
    return NextResponse.json(
      { message: "DB Save Fail", error: error.message },
      { status: 500 },
    );
  }
}

// 3. PUT API: Admin reply text aur status dono database me save karna
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, replyText } = body;

    if (!id || !replyText) {
      return NextResponse.json(
        { success: false, message: "ID and Reply text are required" },
        { status: 400 },
      );
    }

    const cleanId = parseInt(id, 10);

    // MySQL Query: Status badlein aur adminReply column me text store karein
    const sql =
      "UPDATE enquiries SET status = 'Replied', adminReply = ? WHERE id = ?";
    const [result]: any = await pool.query(sql, [replyText, cleanId]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "No record found with this ID" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Reply saved in database successfully!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("❌ SQL Update Error Inside API:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
