"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { useMaintenanceMode } from "@/components/providers/MaintenanceProvider";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PasswordDialog({ open, onOpenChange }: PasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { authenticate } = useMaintenanceMode();

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setPassword("");
      setShowPassword(false);
      setError("");
      setIsLoading(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError("Bitte geben Sie ein Passwort ein");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await authenticate(password);
      
      if (success) {
        // Authentication successful - the maintenance provider will handle the state
        onOpenChange(false);
        // Page will automatically reload/redirect due to context change
        window.location.reload();
      } else {
        setError("Ungültiges Passwort");
      }
    } catch (error) {
      setError("Authentifizierungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-2xl bg-black/20 border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Lock className="w-5 h-5" />
            Administrator-Zugang
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white/90">
              Wartungsmodus-Passwort
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben..."
                className={cn(
                  "pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50",
                  error && "border-red-400"
                )}
                disabled={isLoading}
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-white/70" />
                ) : (
                  <Eye className="h-4 w-4 text-white/70" />
                )}
              </Button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-white/20 text-white hover:bg-white/30 border-white/20"
            >
              {isLoading ? "Überprüfe..." : "Anmelden"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}