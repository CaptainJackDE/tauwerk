import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff1493] border-r-[#1e91fe] animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-[#1e91fe] border-l-[#fefeff] animate-spin [animation-delay:-0.3s]" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-[#ff1493]/50 border-r-[#1e91fe]/50 animate-spin [animation-delay:-0.6s]" />
      </div>
    </div>
  );
}
