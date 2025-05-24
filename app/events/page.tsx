import { upcomingEvents, formatEventDate } from "@/config/events";
import { gradients } from "@/config/gradients";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, UserCheck, UserX, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/composites/PageLayout";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  isExternal?: boolean;
  registration: {
    required: boolean;
    open: boolean;
    opensAt?: {
      day: number;
      month: number;
      year: number;
    };
    link?: string;
  };
  price?: {
    regular?: number;
    reduced?: number;
    currency?: string;
  };
  className?: string;
}

const EventCard = ({
  title,
  date,
  location,
  description,
  isExternal,
  registration,
  price,
  className,
}: EventCardProps) => {
  const getRegistrationStatus = () => {
    if (!registration.required) {
      return "Keine Anmeldung erforderlich";
    }

    if (registration.open) {
      return "Jetzt anmelden";
    }

    if (registration.opensAt) {
      const opensAt = new Date(
        registration.opensAt.year,
        registration.opensAt.month - 1,
        registration.opensAt.day,
      );
      return `Anmeldung ab ${opensAt.toLocaleDateString("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    }

    return "Anmeldung wird noch bekannt gegeben";
  };

  const registrationStatus = getRegistrationStatus();

  return (
    <div
      className={cn(
        "group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10",
        "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5",
        "hover:-translate-y-1 transition-all duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-foreground/70">
              {date.split("(")[0].trim()}
            </span>
            {date.includes("(") && (
              <span className="text-sm text-foreground/50">
                {date.split("(")[1].replace(")", "")}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className={cn("text-2xl font-semibold", gradients.title.primary)}>
            {title}
          </h3>
          {isExternal && (
            <p className="text-sm text-foreground/60 italic">
              Externes Event - nicht von Tauwerk organisiert
            </p>
          )}
        </div>

        <p className="text-foreground/70 text-base">{description}</p>

        <div className="flex items-center gap-3 text-foreground/70">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center gap-3 text-foreground/70">
          {registration.required ? (
            <UserCheck className="w-4 h-4" />
          ) : (
            <UserX className="w-4 h-4" />
          )}
          <span className="text-sm">{registrationStatus}</span>
        </div>

        {price && (
          <div className="flex items-center gap-3 text-foreground/70">
            <Euro className="w-4 h-4" />
            <div className="text-sm">
              {price.regular && (
                <span className="mr-2">
                  {price.regular} {price.currency}
                </span>
              )}
              {price.reduced && (
                <span className="text-foreground/50">
                  (ermäßigt: {price.reduced} {price.currency})
                </span>
              )}
            </div>
          </div>
        )}

        {registration.required && registration.open && registration.link && (
          <Link href={registration.link} className="block w-full">
            <Button className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground border border-white/10 hover:border-white/20 transition-all duration-300">
              Jetzt anmelden
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default function EventsPage() {
  const sortedEvents = [...upcomingEvents].sort((a, b) => {
    // Sortiere nach Jahr
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

  // Gruppiere Events nach Jahr und Monat
  const eventsByYearAndMonth = sortedEvents.reduce(
    (acc, event) => {
      const year = event.date.year;
      const month = event.date.month || 13; // 13 für Events ohne Monat

      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = [];
      }
      acc[year][month].push(event);
      return acc;
    },
    {} as Record<number, Record<number, typeof sortedEvents>>,
  );

  function getMonthName(month: number): string {
    if (month === 13) return "Termin wird noch bekannt gegeben";
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    return months[month - 1];
  }

  return (
    <PageLayout
      title="Unsere Events"
      subtitle="Entdecke unsere kommenden Veranstaltungen und sei dabei!"
    >
      <div className="space-y-16">
        {Object.entries(eventsByYearAndMonth).map(([year, months]) => (
          <div key={year} className="space-y-12">
            <h2
              className={cn("text-3xl font-semibold", gradients.title.primary)}
            >
              {year}
            </h2>
            {Object.entries(months).map(([month, events]) => (
              <div key={`${year}-${month}`} className="space-y-6">
                <h3
                  className={cn(
                    "text-2xl font-medium",
                    gradients.title.primary,
                  )}
                >
                  {getMonthName(Number(month))}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event) => (
                    <div key={event.id} id={`event-${event.id}`}>
                      <EventCard
                        title={event.title}
                        date={formatEventDate(event.date)}
                        location={event.location}
                        description={event.description}
                        isExternal={event.isExternal}
                        registration={event.registration}
                        price={event.price}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
