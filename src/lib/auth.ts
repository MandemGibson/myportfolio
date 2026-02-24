import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.warn("ADMIN_API_KEY not set in environment variables");
    return false;
  }

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
