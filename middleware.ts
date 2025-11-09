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

  // Always allow these paths regardless of authentication
  const allowedPaths = [
    "/api/maintenance",
    "/_next",
    "/maintenance",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml"
  ];

  const allowedExtensions = [".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".woff", ".woff2", ".ttf"];

  // Check if path or extension is allowed
  const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path));
  const isAllowedExtension = allowedExtensions.some(ext => pathname.includes(ext));

  if (isAllowedPath || isAllowedExtension) {
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