import { PageLayout } from "@/components/composites/PageLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import { Instagram, Mail, Send, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/config/constants";

export default function ContactPage() {
  return (
    <PageLayout title="Kontakt" subtitle="Wir freuen uns auf deine Nachricht!">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <div className="relative space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
                  <Instagram className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <h3
                  className={cn(
                    "text-2xl font-semibold",
                    gradients.title.primary,
                  )}
                >
                  Folge uns auf Instagram
                </h3>
                <p className="text-foreground/70 mt-1">
                  Bleibe auf dem Laufenden über unsere Events und Community
                </p>
              </div>
            </div>
            <Link
              href={SITE.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground border border-white/10 hover:border-white/20 transition-all duration-300">
                @{SITE.social.instagram.username} auf Instagram
              </Button>
            </Link>
          </div>
        </div>

        <Link
          href={SITE.social.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 p-2">
              <Send className="w-5 h-5 text-primary/80" />
            </div>
          </div>
          <span className="text-foreground/70 group-hover:text-foreground transition-colors">
            Tritt unserem Telegram-Kanal bei
          </span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h4
                className={cn("text-xl font-semibold", gradients.title.primary)}
              >
                E-Mail
              </h4>
            </div>
            <p className="text-foreground/70 mb-4">
              Für allgemeine Anfragen und Kooperationen
            </p>
            <Link
              href={`mailto:${SITE.email}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {SITE.email}
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h4
                className={cn("text-xl font-semibold", gradients.title.primary)}
              >
                Standort
              </h4>
            </div>
            <p className="text-foreground/70 mb-4">
              Unsere Events finden in verschiedenen Locations in Rostock statt
            </p>
            <p className="text-foreground/70">{SITE.location}</p>
          </div>
        </div>

        <div className="text-center text-foreground/60 text-sm">
          <p>
            Für die schnellste Antwort und aktuelle Updates folge uns am besten
            auf Instagram.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
