// app/layout.tsx
import "./globals.css";
import { Viewport, Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MaintenanceProvider } from "@/components/providers/MaintenanceProvider";
import { Navigation } from "@/components/composites/Navigation";
import { Send, Instagram } from "lucide-react";
import { SITE } from "@/config/appsettings";
import { Tooltip } from "@heroui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  /* … */
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tauwerk.de";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Fetisch Community",
    "BDSM Events",
    "Mecklenburg-Vorpommern",
    "Fetisch Club",
    "CSD",
    "Queer Events",
    "Fetisch Party",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: baseUrl,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

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
          <MaintenanceProvider maintenanceMode={maintenanceMode}>
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
                      © {new Date().getFullYear()} {SITE.name}. Alle Rechte
                      vorbehalten.
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                      <a
                        href="/legal"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Impressum
                      </a>
                      <a
                        href="/privacy"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Datenschutz
                      </a>
                      <Tooltip
                        content={`Folge uns auf Instagram: @${SITE.social.instagram.username}`}
                        showArrow={true}
                      >
                        <a
                          href={SITE.social.instagram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      </Tooltip>

                      <Tooltip
                        content={`Folge uns auf Telegram: @${SITE.social.telegram.username}`}
                        showArrow={true}
                      >
                        <a
                          href={SITE.social.telegram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Telegram"
                        >
                          <Send className="w-5 h-5" />
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </footer>
              </div>
            </Providers>
          </MaintenanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}