"use client";

import React from "react";
import { formatEventDate, type Event } from "@/config/events";
import { fetchEvents, sortEventsByDate } from "@/lib/events-loader";
import { gradients } from "@/config/gradients";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, UserCheck, UserX, Euro, Download, Plus, LayoutGrid, List, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/composites/PageLayout";
import { AlertsContainer } from "@/components/composites/AlertsContainer";
import Link from "next/link";
import { downloadICS, getGoogleCalendarUrl } from "@/lib/calendar-utils";
import { generateEventsListJsonLd } from "@/lib/seo-utils";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { getAlerts } from "@/lib/alerts";
import type { Alert } from "@/lib/alerts";

type ViewMode = "grid" | "compact" | "timeline";

interface EventCardProps {
  event: Event;
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
  isNextEvent?: boolean;
  isPast?: boolean;
}

const EventCard = ({
  event,
  title,
  date,
  location,
  description,
  isExternal,
  registration,
  price,
  className,
  isNextEvent,
  isPast,
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
        "group relative h-full flex flex-col p-6 rounded-2xl backdrop-blur-md border transition-all duration-300",
        isPast && "opacity-40 saturate-50 pointer-events-none",
        isNextEvent
          ? "bg-gradient-to-br from-primary/15 to-secondary/15 border-primary/30 shadow-xl shadow-primary/10 ring-2 ring-primary/20"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
        className,
      )}
    >
      {/* Past Event Badge */}
      {isPast && (
        <div className="absolute top-4 right-4 bg-foreground/10 text-foreground/60 text-xs font-medium px-3 py-1 rounded-full border border-foreground/10">
          Vergangen
        </div>
      )}
      
      {/* Next Event Badge */}
      {isNextEvent && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-md px-3 py-1 text-[11px] text-white/90 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-primary/60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-semibold tracking-wide">Nächstes Event</span>
        </div>
      )}
      
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        isNextEvent ? "bg-gradient-to-br from-primary/10 to-secondary/10" : "bg-gradient-to-br from-primary/5 to-transparent"
      )} />
      
      <div className="relative flex flex-col h-full space-y-4">
        {/* Header mit Datum */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-medium text-foreground/80 truncate">
              {date.split("(")[0].trim()}
            </span>
            {date.includes("(") && (
              <span className="text-xs text-foreground/50 truncate">
                {date.split("(")[1].replace(")", "")}
              </span>
            )}
          </div>
        </div>

        {/* Titel und External Badge */}
        <div className="space-y-1.5">
          <h3 className={cn("text-xl font-semibold leading-tight line-clamp-2", gradients.title.primary)}>
            {title}
          </h3>
          {isExternal && (
            <span className="inline-block text-xs text-foreground/60 italic bg-white/5 px-2 py-0.5 rounded">
              Externes Event
            </span>
          )}
        </div>

        {/* Beschreibung mit fester Höhe */}
        <p className="text-sm text-foreground/70 line-clamp-3 flex-shrink-0">{description}</p>

        {/* Info-Section - wächst mit flex-grow */}
        <div className="space-y-2.5 flex-grow">
          <div className="flex items-center gap-2.5 text-foreground/70">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>

          <div className="flex items-center gap-2.5 text-foreground/70">
            {registration.required ? (
              <UserCheck className="w-4 h-4 shrink-0" />
            ) : (
              <UserX className="w-4 h-4 shrink-0" />
            )}
            <span className="text-sm truncate">{registrationStatus}</span>
          </div>

          {price && (
            <div className="flex items-center gap-2.5 text-foreground/70">
              <Euro className="w-4 h-4 shrink-0" />
              <div className="text-sm min-w-0">
                {price.regular && (
                  <span className="mr-2 whitespace-nowrap">
                    {price.regular} {price.currency}
                  </span>
                )}
                {price.reduced && (
                  <span className="text-foreground/50 text-xs whitespace-nowrap">
                    (erm. {price.reduced} {price.currency})
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Button - immer am Ende */}
        {registration.required && registration.open && registration.link && (
          <Link href={registration.link} className="block w-full mt-auto">
            <Button fullWidth variant="primary">
              Jetzt anmelden
            </Button>
          </Link>
        )}

        {/* Calendar export - sehr dezent, nur beim Hover sichtbar */}
        <div className="flex items-center justify-center gap-1 pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => downloadICS(event)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground/40 hover:text-muted-foreground/80 rounded px-1.5 py-0.5 transition-all duration-200 cursor-pointer"
            title="Als iCal-Datei herunterladen"
          >
            <Download className="w-2.5 h-2.5" />
            <span>.ics</span>
          </button>
          <span className="text-muted-foreground/20 text-[8px]">•</span>
          <button
            onClick={() => window.open(getGoogleCalendarUrl(event), "_blank")}
            className="flex items-center gap-1 text-[10px] text-muted-foreground/40 hover:text-muted-foreground/80 rounded px-1.5 py-0.5 transition-all duration-200 cursor-pointer"
            title="Zu Google Calendar hinzufügen"
          >
            <Plus className="w-2.5 h-2.5" />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Kompakte Event-Liste Komponente
const CompactEventItem = ({
  event,
  onClick,
  isNextEvent,
  isPast,
}: {
  event: Event;
  onClick: () => void;
  isNextEvent?: boolean;
  isPast?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isPast}
      className={cn(
        "w-full text-left p-4 rounded-lg backdrop-blur-sm border transition-all duration-200 cursor-pointer group relative",
        isPast && "opacity-40 saturate-50 cursor-not-allowed",
        isNextEvent
          ? "bg-gradient-to-r from-primary/15 to-secondary/15 border-primary/30 shadow-lg shadow-primary/10 ring-2 ring-primary/20"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      )}
    >
      {/* Past Event Badge for Compact View */}
      {isPast && (
        <div className="absolute -top-1 -right-1 bg-foreground/10 text-foreground/60 text-[9px] font-medium px-2 py-0.5 rounded-full border border-foreground/10">
          Vergangen
        </div>
      )}
      
      {/* Next Event Badge for Compact View */}
      {isNextEvent && (
        <div className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/25 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-white/90 shadow-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-primary/60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-semibold tracking-wide">Nächstes</span>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="shrink-0 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-2 mt-0.5">
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn("font-semibold text-base mb-1 truncate group-hover:text-primary transition-colors", gradients.title.primary)}>
              {event.title}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatEventDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{event.location}</span>
              </span>
              {event.isExternal && (
                <span className="text-xs bg-white/5 px-2 py-0.5 rounded">Extern</span>
              )}
            </div>
          </div>
        </div>
        <div className="shrink-0 text-foreground/40 group-hover:text-foreground/60 transition-colors">
          <Plus className="w-5 h-5 rotate-0 group-hover:rotate-90 transition-transform duration-200" />
        </div>
      </div>
    </button>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  event: Event;
  isNextEvent: boolean;
  isPast: boolean;
  onClick: () => void;
  position: "left" | "right";
}

const TimelineItem = ({ event, isNextEvent, isPast, onClick, position }: TimelineItemProps) => {
  return (
    <div className={cn(
      "relative flex items-center gap-8 mb-8",
      position === "left" ? "flex-row" : "flex-row-reverse"
    )}>
      {/* Event Card */}
      <div className={cn(
        "w-[calc(50%-2rem)] group cursor-pointer",
        position === "left" ? "text-right" : "text-left"
      )}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          onClick={onClick}
          className={cn(
            "relative rounded-2xl border transition-all duration-300",
            "backdrop-blur-xl bg-gradient-to-br shadow-lg",
            isPast
              ? "from-white/[0.02] to-white/[0.01] border-white/5 opacity-50 saturate-50 hover:opacity-60"
              : "from-white/[0.08] to-white/[0.04] border-white/20 hover:border-white/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
            isNextEvent && "ring-2 ring-primary/60 border-primary/40 shadow-primary/20"
          )}
        >
          <div className="p-6 space-y-4">
            {/* Badges */}
            <div className={cn(
              "flex gap-2 flex-wrap items-center",
              position === "left" ? "justify-end" : "justify-start"
            )}>
              {isNextEvent && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border border-white/15 bg-black/30 backdrop-blur-md text-white/90 shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 rounded-full bg-primary/60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Nächstes Event
                </span>
              )}
              {isPast && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/50">
                  Vergangen
                </span>
              )}
              {event.isExternal && (
                <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-white/5 border border-white/10 text-white/40">
                  Extern
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className={cn(
              "text-xl font-bold line-clamp-2 transition-colors",
              isPast ? "text-white/50" : gradients.title.primary
            )}>
              {event.title}
            </h3>

            {/* Date */}
            <div className={cn(
              "flex items-center gap-2.5 text-sm",
              position === "left" ? "justify-end" : "justify-start",
              isPast ? "text-foreground/40" : "text-foreground/80"
            )}>
              <div className={cn(
                "p-1.5 rounded-lg",
                isPast ? "bg-white/5" : "bg-gradient-to-br from-primary/20 to-secondary/20"
              )}>
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-medium">{formatEventDate(event.date)}</span>
            </div>

            {/* Location */}
            <div className={cn(
              "flex items-center gap-2.5 text-sm",
              position === "left" ? "justify-end" : "justify-start",
              isPast ? "text-foreground/30" : "text-foreground/70"
            )}>
              <div className={cn(
                "p-1.5 rounded-lg",
                isPast ? "bg-white/5" : "bg-gradient-to-br from-primary/15 to-secondary/15"
              )}>
                <MapPin className="w-4 h-4" />
              </div>
              <span className="line-clamp-1 font-medium">{event.location}</span>
            </div>

            {/* Description Preview */}
            {event.description && (
              <p className={cn(
                "text-sm line-clamp-2 leading-relaxed",
                position === "left" ? "text-right" : "text-left",
                isPast ? "text-foreground/30" : "text-foreground/60"
              )}>
                {event.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Node */}
      <div className="relative flex items-center justify-center w-16 h-16 shrink-0 z-10">
        {/* Outer Glow Ring */}
        <div className={cn(
          "absolute w-8 h-8 rounded-full transition-all duration-300",
          isPast
            ? "bg-white/5"
            : isNextEvent
            ? "bg-primary/20 animate-pulse"
            : "bg-primary/10"
        )} />
        
        {/* Node Circle */}
        <div className={cn(
          "relative z-10 w-5 h-5 rounded-full border-[3px] transition-all duration-300 shadow-lg",
          isPast
            ? "bg-background border-white/20 shadow-white/5"
            : isNextEvent
            ? "bg-gradient-to-br from-primary to-secondary border-primary shadow-primary/50 animate-pulse scale-110"
            : "bg-gradient-to-br from-primary/60 to-secondary/60 border-white/40 shadow-primary/30 hover:scale-125"
        )} />
      </div>

      {/* Spacer for alignment */}
      <div className="w-[calc(50%-2rem)]" />
    </div>
  );
};

// Event-Detail Dialog
const EventDialog = ({
  event,
  onClose,
}: {
  event: Event | null;
  onClose: () => void;
}) => {
  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-white/10 shadow-2xl"
        role="document"
        tabIndex={-1}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="pr-12">
            <h2 className={cn("text-3xl font-bold mb-2", gradients.title.primary)}>
              {event.title}
            </h2>
            {event.isExternal && (
              <span className="inline-block text-sm text-foreground/60 italic bg-white/5 px-3 py-1 rounded">
                Externes Event - nicht von Tauwerk organisiert
              </span>
            )}
          </div>

          {/* Event Details Grid */}
          <div className="grid gap-4">
            <div className="flex items-center gap-3 text-foreground/70">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-foreground/50">Datum & Uhrzeit</div>
                <div className="font-medium">{formatEventDate(event.date)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground/70">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-foreground/50">Location</div>
                <div className="font-medium">{event.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground/70">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                {event.registration.required ? (
                  <UserCheck className="w-5 h-5 text-primary" />
                ) : (
                  <UserX className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <div className="text-sm text-foreground/50">Anmeldung</div>
                <div className="font-medium">
                  {event.registration.required
                    ? event.registration.open
                      ? "Anmeldung erforderlich - Jetzt offen"
                      : "Anmeldung erforderlich - Noch nicht offen"
                    : "Keine Anmeldung erforderlich"}
                </div>
              </div>
            </div>

            {event.price && (
              <div className="flex items-center gap-3 text-foreground/70">
                <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                  <Euro className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-foreground/50">Eintritt</div>
                  <div className="font-medium">
                    {event.price.regular} {event.price.currency}
                    {event.price.reduced && (
                      <span className="text-sm text-foreground/60 ml-2">
                        (erm. {event.price.reduced} {event.price.currency})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
              <p className="text-foreground/70 leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Actions */}
          {(() => {
            const hasRegistration = !!(event.registration.required && event.registration.open && event.registration.link);
            return (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-white/10">
                {/* Calendar Export Buttons (left) */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => downloadICS(event)}>
                    <Download className="w-4 h-4 mr-2" />
                    .ics
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(getGoogleCalendarUrl(event), "_blank")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                </div>
                {/* Primary CTA (right) */}
                {hasRegistration && (
                  <Link href={event.registration.link as string} className="sm:ml-auto sm:flex-1">
                    <Button fullWidth variant="primary">
                      Jetzt anmelden
                    </Button>
                  </Link>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  // Lade gespeicherte View-Mode-Präferenz nach dem ersten Render (Client-only)
  React.useEffect(() => {
    setIsMounted(true);
    const savedMode = getStorageItem<ViewMode>(STORAGE_KEYS.EVENTS_VIEW_MODE, "grid");
    setViewMode(savedMode);
  }, []);

  // Speichere View-Mode-Änderungen im LocalStorage
  React.useEffect(() => {
    if (isMounted) {
      setStorageItem(STORAGE_KEYS.EVENTS_VIEW_MODE, viewMode);
    }
  }, [viewMode, isMounted]);

  React.useEffect(() => {
    let mounted = true;
    fetchEvents().then((data) => {
      if (mounted) setEvents(sortEventsByDate(data));
    });
    
    getAlerts().then((loadedAlerts) => {
      if (mounted) setAlerts(loadedAlerts);
    });
    
    return () => {
      mounted = false;
    };
  }, []);

  const sortedEvents = [...events].sort((a, b) => {
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

  // (entfernt) getNextUpcomingEvent - Bestimmung erfolgt direkt über upcomingEvents

  // Prüfe ob ein Event in der Vergangenheit liegt
  const isEventPast = (event: Event): boolean => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Events ohne vollständiges Datum sind nicht "vergangen"
    if (!event.date.month) return false;
    
    const eventDate = new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day || 1
    );
    
    return eventDate < now;
  };

  // Trenne Events in kommende und vergangene
  const upcomingEvents = sortedEvents.filter(event => !isEventPast(event));
  const pastEvents = sortedEvents.filter(event => isEventPast(event));

  // Das nächste Event ist das erste in den kommenden Events
  const nextEventId = upcomingEvents.length > 0 ? upcomingEvents[0].id : null;

  // Gruppiere kommende Events nach Jahr und Monat
  const upcomingEventsByYearAndMonth = upcomingEvents.reduce(
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
    {} as Record<number, Record<number, typeof upcomingEvents>>,
  );

  // Gruppiere vergangene Events nach Jahr und Monat (umgekehrte Sortierung)
  const pastEventsByYearAndMonth = pastEvents.reverse().reduce(
    (acc, event) => {
      const year = event.date.year;
      const month = event.date.month || 13;

      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = [];
      }
      acc[year][month].push(event);
      return acc;
    },
    {} as Record<number, Record<number, typeof pastEvents>>,
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
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEventsListJsonLd(sortedEvents)),
        }}
      />
      
      {/* Event Detail Dialog */}
      <EventDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      
      <PageLayout
        title="Unsere Events"
        subtitle="Entdecke unsere kommenden Veranstaltungen und sei dabei!"
      >
        {/* Alerts oberhalb der Events */}
        <AlertsContainer alerts={alerts} location="events" />
        
        {/* View Mode Toggle (only show after mount to avoid wrong active state flash) */}
        {isMounted && (
          <div className="flex justify-center md:justify-end mb-8" role="tablist" aria-label="Event-Ansicht">
            <div className="inline-flex rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-1">
              <button
                onClick={() => setViewMode("grid")}
                role="tab"
                aria-selected={viewMode === "grid"}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground ring-1 ring-primary/30"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium">Kacheln</span>
              </button>
              <button
                onClick={() => setViewMode("compact")}
                role="tab"
                aria-selected={viewMode === "compact"}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  viewMode === "compact"
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground ring-1 ring-primary/30"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                )}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">Liste</span>
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                role="tab"
                aria-selected={viewMode === "timeline"}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  viewMode === "timeline"
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground ring-1 ring-primary/30"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                )}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Zeitstrahl</span>
              </button>
            </div>
          </div>
        )}

        {/* Timeline View */}
        {viewMode === "timeline" ? (
          <div className="relative max-w-6xl mx-auto py-16">
            {/* Continuous center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-white/10 to-white/5 pointer-events-none" />
            {/* Kommende Events */}
            <div className="space-y-0">
              {upcomingEvents.map((event, index) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  isNextEvent={event.id === nextEventId}
                  isPast={false}
                  onClick={() => setSelectedEvent(event)}
                  position={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>

            {/* Vergangene Events Separator */}
            {pastEvents.length > 0 && (
              <div className="relative my-20 py-12">
                {/* Separator Badge */}
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-br from-background via-background/95 to-background px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <span className="text-base font-semibold text-white/70 tracking-wide">Vergangene Events</span>
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vergangene Events */}
            {pastEvents.length > 0 && (
              <div className="space-y-0">
                {pastEvents.map((event, index) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    isNextEvent={false}
                    isPast={true}
                    onClick={() => setSelectedEvent(event)}
                    position={index % 2 === 0 ? "left" : "right"}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Grid and Compact Views */
          <div className="space-y-16">
          {/* Kommende Events */}
          {Object.entries(upcomingEventsByYearAndMonth).map(([year, months]) => (
            <div key={year} className="space-y-12">
              <h2
                className={cn("text-3xl font-semibold", gradients.title.primary)}
              >
                {year}
              </h2>
              {Object.entries(months).map(([month, eventsList]) => (
                <div key={`${year}-${month}`} className="space-y-6">
                  <h3
                    className={cn(
                      "text-2xl font-medium",
                      gradients.title.primary,
                    )}
                  >
                    {getMonthName(Number(month))}
                  </h3>
                  
                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {eventsList.map((event) => (
                        <div key={event.id} id={`event-${event.id}`}>
                          <EventCard
                            event={event}
                            title={event.title}
                            date={formatEventDate(event.date)}
                            location={event.location}
                            description={event.description}
                            isExternal={event.isExternal}
                            registration={event.registration}
                            price={event.price}
                            isNextEvent={event.id === nextEventId}
                            isPast={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Compact List View */}
                  {viewMode === "compact" && (
                    <div className="space-y-3">
                      {eventsList.map((event) => (
                        <CompactEventItem
                          key={event.id}
                          event={event}
                          onClick={() => setSelectedEvent(event)}
                          isNextEvent={event.id === nextEventId}
                          isPast={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Vergangene Events */}
          {pastEvents.length > 0 && (
            <div className="mt-24 border-t border-white/10 pt-16 space-y-12">
              <h2 className="text-3xl font-semibold text-white/60">
                Vergangene Events
              </h2>
              
              {Object.entries(pastEventsByYearAndMonth).map(([year, months]) => (
                <div key={year} className="space-y-10">
                  <h3 className="text-2xl font-medium text-white/50">
                    {year}
                  </h3>
                  {Object.entries(months).map(([month, eventsList]) => (
                    <div key={`${year}-${month}`} className="space-y-6">
                      <h4 className="text-xl font-medium text-white/40">
                        {getMonthName(Number(month))}
                      </h4>
                      
                      {/* Grid View */}
                      {viewMode === "grid" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {eventsList.map((event) => (
                            <div key={event.id} id={`event-${event.id}`}>
                              <EventCard
                                event={event}
                                title={event.title}
                                date={formatEventDate(event.date)}
                                location={event.location}
                                description={event.description}
                                isExternal={event.isExternal}
                                registration={event.registration}
                                price={event.price}
                                isNextEvent={false}
                                isPast={true}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Compact List View */}
                      {viewMode === "compact" && (
                        <div className="space-y-3">
                          {eventsList.map((event) => (
                            <CompactEventItem
                              key={event.id}
                              event={event}
                              onClick={() => setSelectedEvent(event)}
                              isNextEvent={false}
                              isPast={true}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          </div>
        )}
      </PageLayout>
    </>
  );
}
