import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  // Check for cookie-based authentication
  const sessionCookie = request.cookies.get("admin_session");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.warn("ADMIN_API_KEY not set in environment variables");
    return false;
  }

  // Check session cookie first
  if (sessionCookie?.value === adminKey) {
    return true;
  }

  // Fallback to API key header for backward compatibility
  const apiKey = request.headers.get("x-api-key");
  return apiKey === adminKey;
}

export function requireAuth(request: NextRequest): {
  authorized: boolean;
  error?: string;
} {
  if (!isAuthenticated(request)) {
    return {
      authorized: false,
      error: "Unauthorized: Invalid or missing API key",
    };
  }

  return { authorized: true };
}
