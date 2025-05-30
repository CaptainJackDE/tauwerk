import { upcomingEvents, formatEventDate } from "@/config/events";
import { gradients } from "@/config/gradients";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  id: string;
  isExternal?: boolean;
  className?: string;
}

const HomeEventCard = ({
  title,
  date,
  location,
  className,
  id,
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
  // Sortiere Events nach Datum
  const sortedEvents = [...upcomingEvents].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return a.date.year - b.date.year;
    }

    // Wenn Jahr gleich ist, sortiere nach Monat
    if (a.date.month && b.date.month) {
      if (a.date.month !== b.date.month) {
        return a.date.month - b.date.month;
      }
      // Wenn Monat gleich ist, sortiere nach Tag
      if (a.date.day && b.date.day) {
        return a.date.day - b.date.day;
      }
      // Wenn ein Event keinen Tag hat, kommt es später
      if (!a.date.day) return 1;
      if (!b.date.day) return -1;
    }
    // Wenn ein Event keinen Monat hat, kommt es später
    if (!a.date.month) return 1;
    if (!b.date.month) return -1;

    return 0;
  });

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
          {sortedEvents.slice(0, 3).map((event) => (
            <Link
              key={event.id}
              href={`/events#event-${event.id}`}
              className="block hover:no-underline"
            >
              <HomeEventCard
                title={event.title}
                date={formatEventDate(event.date)}
                location={event.location}
                id={event.id}
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
