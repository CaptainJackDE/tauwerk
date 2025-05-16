"use client";

import React, { Suspense } from "react";
import { upcomingEvents } from "@/config/events";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import type { Event } from "@/config/events";
import { EventList } from "./EventList";

export function EventListWrapper() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventsWithPhotos = upcomingEvents
      .filter(event => {
        const eventDate = new Date(event.date.year, (event.date.month || 1) - 1, event.date.day || 1);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate <= today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date.year, (a.date.month || 1) - 1, a.date.day || 1);
        const dateB = new Date(b.date.year, (b.date.month || 1) - 1, b.date.day || 1);
        return dateB.getTime() - dateA.getTime();
      });

    setFilteredEvents(eventsWithPhotos);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="my-12" />}>
      <EventList events={filteredEvents} />
    </Suspense>
  );
} 