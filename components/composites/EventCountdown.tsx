"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import { Calendar, Clock, MapPin } from "lucide-react";
import { type Event, formatEventDate } from "@/config/events";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CountdownUnit {
  value: number;
  label: string;
}

interface EventCountdownProps {
  event: Event;
}

export const EventCountdown: React.FC<EventCountdownProps> = ({ event }) => {
  const [countdown, setCountdown] = React.useState<CountdownUnit[]>([
    { value: 0, label: "Tage" },
    { value: 0, label: "Stunden" },
    { value: 0, label: "Minuten" },
    { value: 0, label: "Sekunden" },
  ]);

  React.useEffect(() => {
    const calculateCountdown = () => {
      const { year, month, day } = event.date;
      
      if (!month || !day) {
        // Wenn kein genaues Datum, zeige nur Jahr
        return;
      }

      // Erstelle Event-Datum (Monat ist 0-basiert in JS)
      const eventDate = new Date(year, month - 1, day, 20, 0, 0); // 20:00 Uhr Standard
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown([
          { value: days, label: "Tage" },
          { value: hours, label: "Stunden" },
          { value: minutes, label: "Minuten" },
          { value: seconds, label: "Sekunden" },
        ]);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [event]);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/20 backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Nächstes Event</span>
            </div>
            
            <h2 className={cn("text-5xl md:text-6xl font-bold mb-4", gradients.title.primary)}>
              {event.title}
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{formatEventDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {countdown.map((unit, index) => (
              <div
                key={unit.label}
                className={cn(
                  "relative group",
                  "rounded-2xl backdrop-blur-xl border border-white/20",
                  "bg-gradient-to-br from-white/10 to-white/5",
                  "hover:from-white/15 hover:to-white/10",
                  "hover:border-white/30 hover:shadow-2xl hover:shadow-primary/10",
                  "transition-all duration-300 hover:-translate-y-2",
                  "p-6 md:p-8"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300" />
                
                <div className="relative text-center">
                  <div className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tabular-nums",
                    gradients.title.primary
                  )}>
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base font-medium text-foreground/60 uppercase tracking-wider">
                    {unit.label}
                  </div>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            ))}
          </div>

          {/* Event Description */}
          {event.description && (
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <p className="text-lg text-foreground/70 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/events">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary/30 to-secondary/30 hover:from-primary/40 hover:to-secondary/40 border border-white/20 hover:border-white/30 backdrop-blur-sm text-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Alle Events ansehen
              </Button>
            </Link>
            
            {event.registration.required && event.registration.open && event.registration.link && (
              <Link href={event.registration.link}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/30 hover:border-white/40 hover:bg-white/10 font-semibold"
                >
                  Jetzt anmelden
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
