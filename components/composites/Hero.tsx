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
    <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
      {/* HeroSlider with images */}
      <div className="absolute inset-0">
        <HeroSlider />
      </div>
      {/* Modern Glassmorphic Card */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
        <div className="backdrop-blur-3xl bg-gradient-to-br from-black/40 via-black/20 to-black/40 rounded-[2rem] p-12 md:p-20 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden">
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-xl animate-gradient-x" />
          <div className="relative space-y-8">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient-x">
                {SITE.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light drop-shadow-lg">
                {SITE.description}
              </p>
              <p className="text-lg md:text-xl text-white/80 font-light">
                {SITE.tagline}
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
                <a
                  href="/events"
                  className="inline-block text-lg font-semibold px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Events entdecken
                </a>
                <a
                  href="/about"
                  className="inline-block text-lg font-semibold px-8 py-4 rounded-xl bg-white/10 text-white border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-8 h-14 border-2 border-white/30 rounded-full p-1 flex items-center justify-center bg-white/10 backdrop-blur-md">
          <div className="w-2 h-2 bg-white/60 rounded-full mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
}
