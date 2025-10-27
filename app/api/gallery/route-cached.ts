import { NextResponse } from "next/server";
import { generateGalleryData } from "@/lib/gallery-generator";

// Diese Version generiert die Bilder zur Build-Zeit und cached sie
let cachedImages: any[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 Minute Cache

export const runtime = 'nodejs';

export async function GET() {
  try {
    const now = Date.now();
    
    // Cache prüfen (nur in Development, in Production einmal zur Build-Zeit)
    if (!cachedImages || (process.env.NODE_ENV === 'development' && now - lastCacheTime > CACHE_DURATION)) {
      cachedImages = generateGalleryData();
      lastCacheTime = now;
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Gallery cache refreshed: ${cachedImages.length} images found`);
      }
    }

    return NextResponse.json(cachedImages);
  } catch (error) {
    console.error("Fehler beim Laden der Bilder:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Bilder" },
      { status: 500 },
    );
  }
}

// Optional: Revalidation für ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour