"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import type { Alert, AlertSeverity } from "@/lib/alerts";

interface AlertBannerProps {
  alert: Alert;
  onDismiss?: (alertId: string) => void;
  dismissible?: boolean;
}

const severityConfig: Record<
  AlertSeverity,
  {
    icon: React.ComponentType<{ className?: string }>;
    bgGradient: string;
    borderColor: string;
    iconColor: string;
    textColor: string;
  }
> = {
  info: {
    icon: Info,
    bgGradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    borderColor: "border-blue-400/30",
    iconColor: "text-blue-400",
    textColor: "text-blue-100",
  },
  warning: {
    icon: AlertTriangle,
    bgGradient: "from-yellow-500/10 via-yellow-400/5 to-transparent",
    borderColor: "border-yellow-400/30",
    iconColor: "text-yellow-400",
    textColor: "text-yellow-100",
  },
  critical: {
    icon: AlertCircle,
    bgGradient: "from-red-500/10 via-red-400/5 to-transparent",
    borderColor: "border-red-400/30",
    iconColor: "text-red-400",
    textColor: "text-red-100",
  },
};

export function AlertBanner({
  alert,
  onDismiss,
  dismissible,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  const isDismissible = alert.dismissible !== undefined ? alert.dismissible : dismissible !== undefined ? dismissible : true;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss(alert.id);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative rounded-xl border backdrop-blur-md",
        "bg-gradient-to-r shadow-lg",
        config.bgGradient,
        config.borderColor,
      )}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={cn(
              "shrink-0 rounded-lg p-2",
              "bg-white/5 backdrop-blur-sm",
            )}
          >
            <Icon className={cn("h-5 w-5", config.iconColor)} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-base font-semibold mb-1",
                config.textColor,
              )}
            >
              {alert.title}
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {alert.message}
            </p>

            {/* Optional Link */}
            {alert.link && (
              <a
                href={alert.link.href}
                className={cn(
                  "inline-flex items-center gap-1.5 mt-3 text-sm font-medium",
                  "hover:underline transition-colors",
                  config.textColor,
                )}
              >
                {alert.link.text}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>

          {/* Dismiss Button */}
          {isDismissible && (
            <button
              onClick={handleDismiss}
              className={cn(
                "shrink-0 p-1.5 rounded-lg",
                "hover:bg-white/10 transition-colors",
                "text-foreground/60 hover:text-foreground/80",
              )}
              aria-label="Schließen"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
