"use client";

import React from "react";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { getAlertsForLocation, type Alert, type AlertLocation } from "@/lib/alerts";

interface AlertsContainerProps {
  alerts: Alert[];
  location: AlertLocation;
}

export function AlertsContainer({ alerts, location }: AlertsContainerProps) {
  const [dismissedAlerts, setDismissedAlerts] = React.useState<Set<string>>(
    new Set(),
  );

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("dismissed-alerts");
      if (stored) {
        setDismissedAlerts(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.warn("Fehler beim Laden dismissed alerts:", error);
    }
  }, []);

  const handleDismiss = (alertId: string) => {
    const newDismissed = new Set(dismissedAlerts);
    newDismissed.add(alertId);
    setDismissedAlerts(newDismissed);

    try {
      localStorage.setItem(
        "dismissed-alerts",
        JSON.stringify(Array.from(newDismissed)),
      );
    } catch (error) {
      console.warn("Fehler beim Speichern dismissed alerts:", error);
    }
  };

  const locationAlerts = getAlertsForLocation(alerts, location).filter(
    (alert) => !dismissedAlerts.has(alert.id),
  );

  if (locationAlerts.length === 0) return null;

  return (
    <div className="space-y-4 mb-8">
      {locationAlerts.map((alert) => (
        <AlertBanner
          key={alert.id}
          alert={alert}
          onDismiss={handleDismiss}
          dismissible={true}
        />
      ))}
    </div>
  );
}
