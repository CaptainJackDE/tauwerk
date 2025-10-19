// scripts/generate-gallery.js
// Build-Script um automatisch eine Gallery-Liste zu generieren

const fs = require('fs');
const path = require('path');

function generateGalleryIndex() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  const outputFile = path.join(process.cwd(), 'lib', 'gallery-images.ts');

  if (!fs.existsSync(galleryDir)) {
    console.log('Gallery directory does not exist. Creating empty gallery list.');
    const emptyContent = `// Auto-generated gallery index
export interface GalleryImage {
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [];
`;
    fs.writeFileSync(outputFile, emptyContent);
    return;
  }

  const files = fs.readdirSync(galleryDir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  const images = imageFiles.map((file) => ({
    src: `/gallery/${file}`,
    alt: path.parse(file).name.replace(/[-_]/g, ' '),
  }));

  const content = `// Auto-generated gallery index
// Generated at: ${new Date().toISOString()}

export interface GalleryImage {
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = ${JSON.stringify(images, null, 2)};
`;

  // Ensure lib directory exists
  const libDir = path.dirname(outputFile);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, content);
  console.log(`Generated gallery index with ${images.length} images`);
}

if (require.main === module) {
  generateGalleryIndex();
}

module.exports = generateGalleryIndex;