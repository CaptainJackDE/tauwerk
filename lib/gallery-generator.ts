// lib/gallery-generator.ts
import fs from 'fs';
import path from 'path';

export interface GalleryImage {
  src: string;
  alt: string;
  filename: string;
  size?: number;
  lastModified?: string;
}

export function generateGalleryData(): GalleryImage[] {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    
    if (!fs.existsSync(galleryDir)) {
      console.log('Gallery directory does not exist:', galleryDir);
      return [];
    }

    const files = fs.readdirSync(galleryDir);
    
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
    });

    const images: GalleryImage[] = imageFiles.map((file) => {
      const filePath = path.join(galleryDir, file);
      const stats = fs.statSync(filePath);
      
      return {
        src: `/gallery/${file}`,
        alt: path.parse(file).name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        filename: file,
        size: stats.size,
        lastModified: stats.mtime.toISOString(),
      };
    });

    // Sortiere nach Datum (neueste zuerst)
    images.sort((a, b) => {
      if (!a.lastModified || !b.lastModified) return 0;
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    });

    return images;
  } catch (error) {
    console.error('Error generating gallery data:', error);
    return [];
  }
}