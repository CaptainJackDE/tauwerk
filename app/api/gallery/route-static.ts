import { NextResponse } from "next/server";

interface GalleryImage {
  src: string;
  alt: string;
}

// Alternative mit Environment Variable Support
const GALLERY_IMAGES: GalleryImage[] = [
  // Beispiel-Einträge für die Galerie
  // Füge hier deine Bilder hinzu:
  
  // { src: "/gallery/event-2024-01.jpg", alt: "Event Januar 2024" },
  // { src: "/gallery/workshop-fetisch.jpg", alt: "Fetisch Workshop" },
  // { src: "/gallery/csd-rostock-2024.jpg", alt: "CSD Rostock 2024" },
  // { src: "/gallery/private-party.jpg", alt: "Private Party" },
];

export async function GET() {
  try {
    return NextResponse.json(GALLERY_IMAGES);
  } catch (error) {
    console.error("Fehler beim Laden der Bilder:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Bilder" },
      { status: 500 },
    );
  }
}

// Runtime für Development vs Production
export const runtime = "nodejs"; // oder "edge" für bessere Performance