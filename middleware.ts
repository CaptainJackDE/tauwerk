import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MAINTENANCE_CONFIG, isPathAllowed, getMaintenanceStatus } from "./lib/maintenance";

export function middleware(request: NextRequest) {
  const status = getMaintenanceStatus();
  
  // Debug logging
  console.log("🔧 Middleware Debug:");
  console.log("Status:", status);
  console.log("Request pathname:", request.nextUrl.pathname);
  
  // Skip middleware if maintenance mode is disabled
  if (!status.isEnabled) {
    console.log("❌ Maintenance mode is DISABLED, allowing all requests");
    return NextResponse.next();
  }

  console.log("✅ Maintenance mode is ENABLED, checking request...");
  const { pathname } = request.nextUrl;

  // Check if path is allowed
  if (isPathAllowed(pathname)) {
    console.log("🟢 Allowed path:", pathname);
    return NextResponse.next();
  }

  // Check if user is authenticated for maintenance bypass
  const authCookie = request.cookies.get("maintenance-auth");
  
  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value);
      const isExpired = Date.now() > authData.expires;
      
      if (!isExpired && authData.authenticated) {
        // User is authenticated, allow access to any page
        console.log(`Authenticated user accessing: ${pathname}`);
        return NextResponse.next();
      } else if (isExpired) {
        // Clear expired cookie
        const response = NextResponse.redirect(new URL("/maintenance", request.url));
        response.cookies.delete("maintenance-auth");
        return response;
      }
    } catch (error) {
      // Invalid cookie, clear it and redirect
      console.warn("Invalid maintenance auth cookie:", error);
      const response = NextResponse.redirect(new URL("/maintenance", request.url));
      response.cookies.delete("maintenance-auth");
      return response;
    }
  }

  // Redirect all other requests to maintenance page
  if (pathname !== "/maintenance") {
    console.log(`Blocking access to: ${pathname} - redirecting to maintenance`);
    const maintenanceUrl = new URL("/maintenance", request.url);
    return NextResponse.redirect(maintenanceUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - but allow /api/maintenance)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};