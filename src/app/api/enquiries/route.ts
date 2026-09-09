import { NextResponse } from "next/server";
import pool from "../../../../lib/db";
import { z } from "zod";

// 1. POST API ke liye validation schema (Student Enquiry)
const enquiryPostSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address format"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number cannot exceed 15 digits"),
  course: z.string().min(1, "Please select a course"),
  query: z
    .string()
    .min(5, "Query must be at least 5 characters long")
    .max(1000, "Query cannot exceed 1000 characters"),
});

// 2. PUT API ke liye validation schema (Admin Reply)
const enquiryPutSchema = z.object({
  id: z.number({ required_error: "Inquiry ID is required" }),
  replyText: z
    .string()
    .min(1, "Reply message cannot be empty")
    .max(2000, "Reply cannot exceed 2000 characters"),
});

// 1. GET API: Admin dashboard ke liye MySQL se enquiries fetch karna
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

// 2. POST API: Validation ke sath data MySQL me insert karna
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 🔥 FIXED: Yahan validation check lagaya hai
    const validation = enquiryPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Sirf validated safe data ka use karein
    const { name, email, phone, course, query } = validation.data;

    const sql =
      "INSERT INTO enquiries (name, email, phone, course, query) VALUES (?, ?, ?, ?, ?)";
    const values = [name, email, phone, course, query];

    await pool.query(sql, values);

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

// 3. PUT API: Admin reply text aur status validation ke sath update karna
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // ID ko parse karke validation ke liye data prepare karein
    const parsedBody = {
      id: body.id ? parseInt(body.id, 10) : undefined,
      replyText: body.replyText,
    };

    // 🔥 FIXED: Yahan bhi validation check lagaya hai
    const validation = enquiryPutSchema.safeParse(parsedBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { id, replyText } = validation.data;

    const sql =
      "UPDATE enquiries SET status = 'Replied', adminReply = ? WHERE id = ?";
    const [result]: any = await pool.query(sql, [replyText, id]);

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
