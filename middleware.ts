import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";
  
  // Skip middleware if maintenance mode is disabled
  if (!maintenanceMode) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow access to maintenance-related routes
  if (
    pathname.startsWith("/api/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/maintenance") ||
    pathname.includes("favicon") ||
    pathname.includes(".css") ||
    pathname.includes(".js") ||
    pathname.includes(".png") ||
    pathname.includes(".jpg") ||
    pathname.includes(".jpeg") ||
    pathname.includes(".gif") ||
    pathname.includes(".svg") ||
    pathname.includes(".webp")
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated for maintenance bypass
  const authCookie = request.cookies.get("maintenance-auth");
  
  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value);
      const isExpired = Date.now() > authData.expires;
      
      if (!isExpired && authData.authenticated) {
        // User is authenticated, allow access
        return NextResponse.next();
      }
    } catch (error) {
      // Invalid cookie, continue to maintenance page
      console.warn("Invalid maintenance auth cookie:", error);
    }
  }

  // Redirect to maintenance page
  if (pathname !== "/maintenance") {
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