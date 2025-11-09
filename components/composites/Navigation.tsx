"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gradients } from "@/config/gradients";
import { NAVIGATION, SITE } from "@/config/appsettings";
import { Menu, X } from "lucide-react";
import { useMaintenanceMode } from "@/components/providers/MaintenanceProvider";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isMaintenanceMode, isAuthenticated } = useMaintenanceMode();

  // Handle navigation clicks during maintenance mode
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (isMaintenanceMode && !isAuthenticated && href !== "/maintenance") {
      e.preventDefault();
      console.warn("🚫 Navigation blocked: Redirecting to maintenance");
      router.push("/maintenance");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl border-b border-white/10" />
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`text-2xl font-bold ${gradients.title.primary} ${gradients.title.hover} hover:opacity-80 transition-opacity`}
            onClick={(e) => handleNavClick("/", e)}
          >
            {SITE.name}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-white/80 hover:text-white transition-colors group"
                onClick={(e) => handleNavClick(item.href, e)}
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md border-b border-white/10">
            {NAVIGATION.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleNavClick(item.href, e);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}