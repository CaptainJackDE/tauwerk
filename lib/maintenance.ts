/**
 * Maintenance Mode Configuration
 * 
 * This file centralizes maintenance mode configuration to ensure
 * consistent behavior across different runtime environments.
 */

// Force read environment variables at runtime
const getMaintenanceMode = () => {
  const envValue = process.env.MAINTENANCE_MODE;
  console.log("🔍 Reading MAINTENANCE_MODE:", envValue);
  return envValue === "true";
};

export const MAINTENANCE_CONFIG = {
  // Read environment variables with fallbacks
  get isEnabled() {
    return getMaintenanceMode();
  },
  password: process.env.MAINTENANCE_PASSWORD || "",
  
  // Allowed paths during maintenance
  allowedPaths: [
    "/api/maintenance",
    "/_next",
    "/maintenance",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml"
  ],
  
  // Allowed file extensions
  allowedExtensions: [
    ".css", ".js", ".png", ".jpg", ".jpeg", 
    ".gif", ".svg", ".webp", ".ico", 
    ".woff", ".woff2", ".ttf"
  ]
} as const;

/**
 * Check if a path should be allowed during maintenance mode
 */
export function isPathAllowed(pathname: string): boolean {
  const { allowedPaths, allowedExtensions } = MAINTENANCE_CONFIG;
  
  // Check if path starts with allowed path
  const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path));
  
  // Check if path has allowed extension
  const isAllowedExtension = allowedExtensions.some(ext => pathname.includes(ext));
  
  return isAllowedPath || isAllowedExtension;
}

/**
 * Get maintenance mode status with debug info
 */
export function getMaintenanceStatus() {
  return {
    isEnabled: MAINTENANCE_CONFIG.isEnabled,
    envVar: process.env.MAINTENANCE_MODE,
    hasPassword: !!MAINTENANCE_CONFIG.password
  };
}