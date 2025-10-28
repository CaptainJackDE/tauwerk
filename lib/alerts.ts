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
 * Load all active alerts from appsettings.json
 */
export async function getAlerts(): Promise<Alert[]> {
  try {
    const appSettings = (await import("@/public/appsettings.json")).default;
    const alerts = appSettings.alerts as Alert[];
    return alerts.filter((alert) => alert.active);
  } catch (error) {
    console.warn("Error loading alerts:", error);
    return [];
  }
}

/**
 * Filter alerts by display location
 */
export function getAlertsForLocation(
  alerts: Alert[],
  location: AlertLocation,
): Alert[] {
  return alerts.filter((alert) => alert.showOn.includes(location));
}
