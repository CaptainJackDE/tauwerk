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

    // Überprüfe, ob das Verzeichnis existiert
    if (!fs.existsSync(galleryDir)) {
  return NextResponse.json([], { status: 200 });
    }

    // Lese alle Dateien aus dem Verzeichnis
    const files = fs.readdirSync(galleryDir);

    // Filtere nur Bilddateien
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
    });

    // Erstelle ein Array von Bildobjekten
    const images: GalleryImage[] = imageFiles.map((file) => ({
      src: `/gallery/${file}`,
      alt: path.parse(file).name.replace(/[-_]/g, ' '), // Bessere Alt-Text Formatierung
    }));

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Fehler beim Lesen der Bilder:", error);
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
