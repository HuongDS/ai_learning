import { NextResponse } from "next/server";
import { getDispatchHistory } from "@/lib/radar-storage";

export async function GET() {
  try {
    const history = getDispatchHistory();
    return NextResponse.json({ success: true, count: history.length, data: history });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load history" },
      { status: 500 }
    );
  }
}
