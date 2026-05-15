import { NextResponse } from "next/server";

export type InquiryPayload = {
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  desiredClass: string;
  message?: string;
};

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const INQUIRY_SECRET = process.env.INQUIRY_API_SECRET || "";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    if (!body.studentName || !body.parentName || !body.phone || !body.desiredClass) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (INQUIRY_SECRET) {
      headers["X-Inquiry-Secret"] = INQUIRY_SECRET;
    }

    const res = await fetch(`${BACKEND_URL}/api/inquiry/public`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Failed to submit inquiry",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.data?.id,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
