"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import { Background } from "@/components/composites/Background";
import { PasswordDialog } from "../composites/PasswordDialog";

export function MaintenancePage() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight",
            gradients.title.primary
          )}>
            Wartungsmodus
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
            Wir arbeiten gerade an Verbesserungen und sind bald wieder da.
          </p>
        </div>
      </div>

      {/* Admin Access */}
      <button
        onClick={() => setShowPasswordDialog(true)}
        className="fixed bottom-8 right-8 w-4 h-4 bg-white/20 hover:bg-white/40 transition-colors rounded-full"
        aria-label="Admin Access"
      />

      <PasswordDialog 
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      />
    </div>
  );
}