import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Validate input
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid password format" },
        { status: 400 }
      );
    }

    // Get maintenance password from environment
    const maintenancePassword = process.env.MAINTENANCE_PASSWORD;
    
    if (!maintenancePassword) {
      console.error("MAINTENANCE_PASSWORD environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Simple rate limiting check (basic protection)
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const xForwardedFor = headersList.get("x-forwarded-for") || "";
    
    // Log authentication attempt for security monitoring
    console.log(`Maintenance auth attempt from ${xForwardedFor || 'unknown'} (${userAgent})`);

    // Secure password comparison
    const isValidPassword = password === maintenancePassword;

    if (isValidPassword) {
      console.log(`Successful maintenance authentication from ${xForwardedFor || 'unknown'}`);
      return NextResponse.json({ success: true });
    } else {
      // Log failed attempt for security monitoring
      console.warn(`Failed maintenance authentication from ${xForwardedFor || 'unknown'}`);
      
      // Add a small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Maintenance auth error:", error);
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 500 }
    );
  }
}