/**
 * Zentrale LocalStorage-Verwaltung für Tauwerk
 * Bietet typensichere Speicherung und Abruf von Werten
 */

// Storage Keys - zentral definiert
export const STORAGE_KEYS = {
  EVENTS_VIEW_MODE: "tauwerk-events-view-mode",
  THEME: "tauwerk-theme",
  // Weitere Keys können hier hinzugefügt werden
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Speichert einen Wert im LocalStorage
 * @param key - Storage Key aus STORAGE_KEYS
 * @param value - Zu speichernder Wert (wird automatisch zu JSON serialisiert)
 */
export function setStorageItem<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;
  
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Fehler beim Speichern von ${key}:`, error);
  }
}

/**
 * Lädt einen Wert aus dem LocalStorage
 * @param key - Storage Key aus STORAGE_KEYS
 * @param defaultValue - Fallback-Wert, falls nichts gespeichert ist
 * @returns Der gespeicherte Wert oder defaultValue
 */
export function getStorageItem<T>(key: StorageKey, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Fehler beim Laden von ${key}:`, error);
    return defaultValue;
  }
}

/**
 * Entfernt einen Wert aus dem LocalStorage
 * @param key - Storage Key aus STORAGE_KEYS
 */
export function removeStorageItem(key: StorageKey): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Fehler beim Entfernen von ${key}:`, error);
  }
}

/**
 * Prüft, ob ein Key im LocalStorage existiert
 * @param key - Storage Key aus STORAGE_KEYS
 * @returns true wenn der Key existiert
 */
export function hasStorageItem(key: StorageKey): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Fehler beim Prüfen von ${key}:`, error);
    return false;
  }
}

/**
 * Löscht alle Tauwerk-spezifischen Werte aus dem LocalStorage
 */
export function clearStorage(): void {
  if (typeof window === "undefined") return;
  
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Fehler beim Löschen des Storage:", error);
  }
}
