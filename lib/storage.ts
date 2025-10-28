/**
 * Central LocalStorage management for Tauwerk
 * Provides type-safe storage and retrieval of values
 */

// Storage Keys - centrally defined
export const STORAGE_KEYS = {
  EVENTS_VIEW_MODE: "tauwerk-events-view-mode",
  THEME: "tauwerk-theme",
  // Additional keys can be added here
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Save a value to LocalStorage
 * @param key - Storage Key from STORAGE_KEYS
 * @param value - Value to save (automatically serialized to JSON)
 */
export function setStorageItem<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;
  
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

/**
 * Load a value from LocalStorage
 * @param key - Storage Key from STORAGE_KEYS
 * @param defaultValue - Fallback value if nothing is stored
 * @returns The stored value or defaultValue
 */
export function getStorageItem<T>(key: StorageKey, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultValue;
  }
}

/**
 * Remove a value from LocalStorage
 * @param key - Storage Key from STORAGE_KEYS
 */
export function removeStorageItem(key: StorageKey): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
}

/**
 * Check if a key exists in LocalStorage
 * @param key - Storage Key from STORAGE_KEYS
 * @returns true if the key exists
 */
export function hasStorageItem(key: StorageKey): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking ${key}:`, error);
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
