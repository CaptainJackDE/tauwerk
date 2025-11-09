"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMaintenanceMode } from "./MaintenanceProvider";

/**
 * Client-side maintenance mode guard
 * Prevents navigation to protected routes when maintenance mode is active
 */
export function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMaintenanceMode, isAuthenticated } = useMaintenanceMode();

  useEffect(() => {
    // Don't redirect if already on maintenance page
    if (pathname === "/maintenance") {
      return;
    }

    // If maintenance mode is active and user is not authenticated
    if (isMaintenanceMode && !isAuthenticated) {
      // Allow certain paths
      const allowedPaths = [
        "/api/maintenance",
        "/maintenance"
      ];

      const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path));
      
      if (!isAllowedPath) {
        console.log("🚫 Client-side: Redirecting to maintenance from:", pathname);
        router.replace("/maintenance");
        return;
      }
    }
  }, [isMaintenanceMode, isAuthenticated, pathname, router]);

  return <>{children}</>;
}