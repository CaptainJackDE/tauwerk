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
      <NavbarContent className="sm:hidden flex items-center justify-end px-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex flex-1 justify-end items-center" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};