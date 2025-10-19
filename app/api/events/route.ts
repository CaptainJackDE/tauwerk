import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Load from local JSON file in public using request origin
    const reqUrl = new URL(request.url);
    const base = `${reqUrl.protocol}//${reqUrl.host}`;
    const res = await fetch(`${base}/events.json`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch local events.json: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data.events || []);
  } catch (localErr) {
    console.error("Local events.json fetch failed:", localErr);

    // Fallback: remote URL via env var
    const remote = process.env.NEXT_PUBLIC_EVENTS_URL;
    if (remote) {
      try {
        const res = await fetch(remote, { cache: "no-store" });
        if (!res.ok) throw new Error(`Remote fetch failed: ${res.status}`);
        const data = await res.json();
        return NextResponse.json(Array.isArray(data) ? data : data.events || []);
      } catch (remoteErr) {
        console.error("Remote events fetch failed:", remoteErr);
      }
    }

    return NextResponse.json([], { status: 200 });
  }
}