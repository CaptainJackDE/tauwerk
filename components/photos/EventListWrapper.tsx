"use client";

import React, { Suspense } from "react";
import { events } from "@/config/events";
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

    const eventsWithPhotos = events
      .filter(event => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return event.withPhotos && eventDate <= today;
      })
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

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