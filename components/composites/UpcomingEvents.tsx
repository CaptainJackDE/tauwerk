import React from "react";
import { formatEventDate, type Event } from "@/config/events";
import { fetchEvents, sortEventsByDate } from "@/lib/events-loader";
import { gradients } from "@/config/gradients";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  isExternal?: boolean;
  className?: string;
}

const HomeEventCard = ({
  title,
  date,
  location,
  className,
  isExternal,
}: EventCardProps) => {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10",
        "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5",
        "hover:-translate-y-1 transition-all duration-300",
        "h-[280px] flex flex-col",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex-1 flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base text-foreground/70">
              {date.split("(")[0].trim()}
            </span>
            {date.includes("(") && (
              <span className="text-xs text-foreground/50">
                {date.split("(")[1].replace(")", "")}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <h3 className={cn("text-xl font-semibold", gradients.title.primary)}>
            {title}
          </h3>
          {isExternal && (
            <p className="text-xs text-foreground/60 italic">Externes Event</p>
          )}
        </div>

        <div className="flex items-center gap-3 text-foreground/70 mt-auto">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
    </div>
  );
};

export function UpcomingEvents() {
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    let mounted = true;
    fetchEvents().then((data) => {
      if (mounted) setEvents(sortEventsByDate(data));
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={cn("text-4xl font-bold mb-6", gradients.title.primary)}
          >
            Nächste Events
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Entdecke unsere kommenden Veranstaltungen und sei dabei!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event) => (
            <Link
              key={event.id}
              href={`/events#event-${event.id}`}
              className="block hover:no-underline"
            >
              <HomeEventCard
                title={event.title}
                date={formatEventDate(event.date)}
                location={event.location}
                isExternal={event.isExternal}
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events">
            <Button variant="outline" size="lg">
              Alle Events anzeigen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
