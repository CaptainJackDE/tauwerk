// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navigation } from "@/components/composites/Navigation";
import { Send, Instagram } from 'lucide-react';

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
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Tauwerk e.V. Rostock. Alle Rechte vorbehalten.
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                      <a href="/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        Impressum
                      </a>
                      <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        Datenschutz
                      </a>
                      <a 
                        href="https://t.me/tauwerk" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Telegram"
                      >
                        <Send className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://instagram.com/tauwerk" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
