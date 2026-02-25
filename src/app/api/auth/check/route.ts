import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey) {
      return NextResponse.json({ authenticated: false }, { status: 500 });
    }

    // Check if session cookie exists and matches the admin key
    const isAuthenticated = session?.value === adminKey;

    return NextResponse.json({ authenticated: isAuthenticated });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
