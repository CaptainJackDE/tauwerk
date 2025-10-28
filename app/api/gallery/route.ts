import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface GalleryImage {
  src: string;
  alt: string;
}

// Force Node.js runtime for fs support on Vercel/Edge
export const runtime = 'nodejs';

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    // Check if directory exists
    if (!fs.existsSync(galleryDir)) {
  return NextResponse.json([], { status: 200 });
    }

    // Read all files from directory
    const files = fs.readdirSync(galleryDir);

    // Filter only image files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
    });

    // Create array of image objects
    const images: GalleryImage[] = imageFiles.map((file) => ({
      src: `/gallery/${file}`,
      alt: path.parse(file).name.replace(/[-_]/g, ' '), // Better alt text formatting
    }));

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Error reading images:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Bilder" },
      { status: 500 },
    );
  }
}

// Backup: Für lokale Entwicklung mit fs (nicht für Vercel)
// Uncomment diese Version für lokale Entwicklung mit echten Dateien:
/*
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryDir);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
    });

    const images = imageFiles.map((file) => ({
      src: `/gallery/${file}`,
      alt: path.parse(file).name,
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error("Fehler beim Lesen der Bilder:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Bilder" },
      { status: 500 },
    );
  }
}
*/
