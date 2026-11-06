import { NextRequest, NextResponse } from "next/server";
import { getTodayDispatch } from "@/lib/radar-storage";

export async function GET() {
  try {
    const dispatch = await getTodayDispatch(false);
    return NextResponse.json({ success: true, data: dispatch });
  } catch (error: any) {
    console.error("[API /api/radar GET] Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load daily dispatch" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let customApiKey: string | undefined;

    // Check header for user-provided BYOK key
    const authHeaderKey = req.headers.get("x-openai-key");
    if (authHeaderKey) {
      customApiKey = authHeaderKey.trim();
    } else {
      // Check body
      try {
        const body = await req.json();
        if (body?.apiKey) {
          customApiKey = body.apiKey.trim();
        }
      } catch {}
    }

    // Force live synchronization
    const dispatch = await getTodayDispatch(true, customApiKey);
    return NextResponse.json({
      success: true,
      message: "Radar intelligence synchronized successfully",
      data: dispatch,
    });
  } catch (error: any) {
    console.error("[API /api/radar POST] Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to sync daily dispatch" },
      { status: 500 }
    );
  }
}
