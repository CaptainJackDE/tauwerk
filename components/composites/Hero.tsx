import React from "react";
import { HeroSlider } from "./HeroSlider";
import { Button } from "../ui/button";
import { gradients } from "@/config/gradients";
import { formatEventDate, type Event } from "@/config/appsettings";
import { fetchEvents } from "@/lib/events-loader";
import { Calendar } from "lucide-react";
import { SITE } from "@/config/appsettings";

export function Hero() {
  const [todayEvent, setTodayEvent] = React.useState<Event | null>(null);

  React.useEffect(() => {
    fetchEvents().then((events) => {
      const today = new Date();
      const todayString = today.toLocaleDateString("de-DE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const match = events.find((event) => {
        if (!event.date.day || !event.date.month) return false;
        const eventDate = new Date(
          event.date.year,
          (event.date.month as number) - 1,
          event.date.day as number,
        );
        const eventDateString = eventDate.toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        return eventDateString === todayString;
      });
      setTodayEvent(match || null);
    });
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        <HeroSlider />
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
        <div className="backdrop-blur-2xl bg-black/10 rounded-3xl p-12 md:p-16 border border-white/10 shadow-2xl">
          <div className="space-y-8">
            <h1
              className={`text-6xl md:text-8xl font-bold ${gradients.title.primary} ${gradients.title.hover} ${gradients.title.animation}`}
            >
              {SITE.name}
            </h1>
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-foreground/90 font-light">
                {SITE.description}
              </p>
              <p className="text-lg md:text-xl text-foreground/80 font-light">
                {SITE.tagline}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Button as="a" href="/events" variant="primary">
                  Events entdecken
                </Button>
                <Button as="a" href="/about" variant="secondary">
                  Mehr erfahren
                </Button>
              </div>

              {todayEvent && (
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Heute:</span>
                  <span>{todayEvent.title}</span>
                  <span>•</span>
                  <span>{formatEventDate(todayEvent.date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
}
