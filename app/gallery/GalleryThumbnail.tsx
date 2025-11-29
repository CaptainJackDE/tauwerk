"use client";
import Image from "next/image";
import React from "react";

interface ImageData {
  src: string;
  alt: string;
}

interface GalleryThumbnailProps {
  image: ImageData;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const GalleryThumbnail = React.memo(function GalleryThumbnail({ image, onClick, onKeyDown }: GalleryThumbnailProps) {
  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-2xl shadow-xl backdrop-blur-lg bg-white/10 border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10"
      role="button"
      tabIndex={0}
      aria-label={`Bild öffnen: ${image.alt}`}
      onKeyDown={onKeyDown}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onClick={onClick}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-white">
              {image.alt}
            </h3>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200"
          onClick={onClick}
          aria-label={`Bild vergrößern: ${image.alt}`}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

export { GalleryThumbnail };