"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  isAuthenticated: boolean;
  authenticate: (password: string) => Promise<boolean>;
  clearAuthentication: () => void;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function useMaintenanceMode() {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error("useMaintenanceMode must be used within a MaintenanceProvider");
  }
  return context;
}

interface MaintenanceProviderProps {
  children: React.ReactNode;
  maintenanceMode: boolean;
}

export function MaintenanceProvider({ children, maintenanceMode }: MaintenanceProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user was previously authenticated (session storage for security)
    const authToken = sessionStorage.getItem("maintenance-auth");
    if (authToken) {
      // Verify token is still valid (basic check)
      const tokenData = JSON.parse(authToken);
      const isExpired = Date.now() > tokenData.expires;
      
      if (!isExpired) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem("maintenance-auth");
      }
    }
  }, []);

  const authenticate = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/maintenance/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Store authentication for current session (expires in 4 hours)
        const tokenData = {
          authenticated: true,
          expires: Date.now() + 4 * 60 * 60 * 1000, // 4 hours
        };
        sessionStorage.setItem("maintenance-auth", JSON.stringify(tokenData));
        
        // Also set a cookie for middleware
        document.cookie = `maintenance-auth=${JSON.stringify(tokenData)}; path=/; max-age=${4 * 60 * 60}; secure; samesite=strict`;
        
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    }
  };

  const clearAuthentication = () => {
    sessionStorage.removeItem("maintenance-auth");
    // Remove cookie
    document.cookie = "maintenance-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
  };

  const value: MaintenanceContextType = {
    isMaintenanceMode: maintenanceMode,
    isAuthenticated,
    authenticate,
    clearAuthentication,
  };

  return (
    <MaintenanceContext.Provider value={value}>
      {children}
    </MaintenanceContext.Provider>
  );
}