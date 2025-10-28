export type AlertSeverity = "info" | "warning" | "critical";
export type AlertLocation = "home" | "events";

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  showOn: AlertLocation[];
  active: boolean;
  dismissible?: boolean;
  link?: {
    text: string;
    href: string;
  };
}

/**
 * Lädt alle aktiven Alerts aus der alerts.json
 */
export async function getAlerts(): Promise<Alert[]> {
  try {
    const alerts = (await import("@/config/alerts.json")).default as Alert[];
    return alerts.filter((alert) => alert.active);
  } catch (error) {
    console.warn("Fehler beim Laden der Alerts:", error);
    return [];
  }
}

/**
 * Filtert Alerts nach Anzeige-Ort
 */
export function getAlertsForLocation(
  alerts: Alert[],
  location: AlertLocation,
): Alert[] {
  return alerts.filter((alert) => alert.showOn.includes(location));
}
