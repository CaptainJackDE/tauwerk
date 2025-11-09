"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import { Button } from "@/components/ui/button";
import { Settings, Clock, Wrench } from "lucide-react";
import { Background } from "@/components/composites/Background";
import { PasswordDialog } from "../composites/PasswordDialog";

export function MaintenancePage() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Background />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-black/10 backdrop-blur-md border border-white/10">
            <Wrench className="w-12 h-12 text-white" />
          </div>

          {/* Main Message */}
          <h1 className={cn(
            "text-4xl md:text-6xl font-bold mb-6 leading-tight",
            gradients.title.primary
          )}>
            Wartungsmodus
          </h1>

          <div className="backdrop-blur-2xl bg-black/10 border border-white/10 rounded-2xl p-8 mb-8">
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Wir arbeiten gerade an Verbesserungen
            </p>
            <p className="text-white/70 leading-relaxed">
              Unsere Website wird momentan gewartet, um Ihnen bald ein noch besseres Erlebnis zu bieten. 
              Wir sind in Kürze wieder für Sie da.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Geschätzte Dauer</span>
              </div>
              <p className="text-white/70">
                Die Wartung sollte in wenigen Stunden abgeschlossen sein
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-white">Was wird verbessert?</span>
              </div>
              <p className="text-white/70">
                Performance-Optimierungen und neue Features
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-white/90 mb-2">
              Bei dringenden Fragen erreichen Sie uns weiterhin über:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:info@tauwerk.de" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                info@tauwerk.de
              </a>
              <span className="hidden sm:block text-white/30">•</span>
              <a 
                href="https://t.me/tauwerk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Telegram: @tauwerk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Discrete Admin Access Button */}
      <button
        onClick={() => setShowPasswordDialog(true)}
        className="fixed bottom-4 right-4 w-3 h-3 bg-white/20 hover:bg-white/30 transition-colors rounded-full border border-white/20 hover:border-white/40"
        aria-label="Admin Access"
      />

      {/* Password Dialog */}
      <PasswordDialog 
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      />
    </div>
  );
}