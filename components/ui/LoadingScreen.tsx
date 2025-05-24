import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative">
        <div className="absolute -top-20 left-1/4 w-60 h-60 bg-primary/20 rounded-full filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-secondary/20 rounded-full filter blur-2xl opacity-35 animate-pulse [animation-delay:0.2s]" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full filter blur-2xl opacity-30 animate-pulse [animation-delay:0.4s]" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-secondary/20 rounded-full filter blur-3xl opacity-25 animate-pulse [animation-delay:0.6s]" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 animate-pulse" />
            <LoadingSpinner size="lg" className="text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h2
              className={cn(
                "text-2xl font-semibold",
                "bg-gradient-to-r from-[#E0F2FE] via-[#93C5FD] to-[#3B82F6] bg-clip-text text-transparent",
              )}
            >
              Tauwerk
            </h2>
            <p className="text-foreground/70 animate-pulse">Lade...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
