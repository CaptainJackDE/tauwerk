"use client";

import React from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/composites/Hero";
import { Features } from "@/components/composites/Features";
import { UpcomingEvents } from "@/components/composites/UpcomingEvents";
import { AboutPreview } from "@/components/composites/AboutPreview";
import { ContactCTA } from "@/components/composites/ContactCTA";
import { Background } from "@/components/composites/Background";
import { FAQ } from "@/components/composites/FAQ";
import dynamic from "next/dynamic";
const EventCountdown = dynamic(() => import("@/components/composites/EventCountdown").then(m => m.EventCountdown), { ssr: false });
import { faqs } from "@/config/faq";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import { fetchEvents, getNextUpcomingEvent } from "@/lib/events-loader";
import type { Event } from "@/config/events";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [nextEvent, setNextEvent] = React.useState<Event | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    fetchEvents().then((events) => {
      const upcoming = getNextUpcomingEvent(events);
      setNextEvent(upcoming);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Background />
      <main>
        <Hero />
        
        {/* Event Countdown - nur für featured Events */}
        {nextEvent && <EventCountdown event={nextEvent} />}
        
        <Features />
        <UpcomingEvents />
        <AboutPreview />
        <ContactCTA />

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className={cn(
                  "text-4xl font-bold mb-4",
                  gradients.title.primary,
                )}
              >
                Häufig gestellte Fragen
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Hier findest du Antworten auf die wichtigsten Fragen zu Tauwerk
                und unseren Events.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <FAQ faqs={faqs} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
