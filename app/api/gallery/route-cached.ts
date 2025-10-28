import { NextResponse } from "next/server";
import { generateGalleryData } from "@/lib/gallery-generator";

// This version generates images at build time and caches them
let cachedImages: any[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export const runtime = 'nodejs';

export async function GET() {
  try {
    const now = Date.now();
    
    // Check cache (only in development, in production once at build time)
    if (!cachedImages || (process.env.NODE_ENV === 'development' && now - lastCacheTime > CACHE_DURATION)) {
      cachedImages = generateGalleryData();
      lastCacheTime = now;
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Gallery cache refreshed: ${cachedImages.length} images found`);
      }
    }

    return NextResponse.json(cachedImages);
  } catch (error) {
    console.error("Error loading images:", error);
    return NextResponse.json(
      { error: "Error loading images" },
      { status: 500 },
    );
  }
}

// Optional: Revalidation for ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour