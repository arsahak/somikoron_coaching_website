import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export type InquiryPayload = {
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  desiredClass: string;
  message?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    if (!body.studentName || !body.parentName || !body.phone || !body.desiredClass) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const entry = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await mkdir(DATA_DIR, { recursive: true });

    let existing: typeof entry[] = [];
    try {
      const raw = await readFile(DATA_FILE, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      existing = [];
    }

    existing.push(entry);
    await writeFile(DATA_FILE, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ success: true, id: entry.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
