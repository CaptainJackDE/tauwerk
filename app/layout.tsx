// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navigation } from "@/components/composites/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tauwerk - Fetisch-Verein Rostock",
  description: "Tauwerk ist ein Fetisch-Verein aus Mecklenburg-Vorpommern mit Sitz in Rostock. Wir fördern Vielfalt, veranstalten Events und stärken die Fetisch-Community.",
};

export const viewport: Viewport = { /* … */ };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="de">
      <head />
      <body
        className={`min-h-screen bg-transparent font-sans antialiased ${fontSans.variable} ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow">
                {children}
                <Analytics />
              </main>
              <footer className="w-full border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Tauwerk e.V. Rostock. Alle Rechte vorbehalten.
                </div>
              </footer>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
