import { NextResponse } from "next/server";
import appSettings from "@/public/appsettings.json";

export const runtime = 'edge';

export async function GET() {
  try {
    // Load from appsettings.json
    return NextResponse.json(appSettings.events || []);
  } catch (err) {
    console.error("Failed to load events from appsettings:", err);
    return NextResponse.json([], { status: 200 });
  }
}