"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-transparent backdrop-blur-md z-50"
    >
    </HeroUINavbar>
  );
};