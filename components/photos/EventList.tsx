"use client";

import React from "react";
import { Camera, CalendarDays, MapPin } from "lucide-react";
import { categoryStyles, EventCategory } from "@/config/events";

interface Event {
  id: string;
  title: string;
  category: EventCategory;
  startDate: Date;
  endDate?: Date;
  location?: string;
  driveLink?: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

const EventCard = React.memo(({ event }: { event: Event }) => {
  const styles = categoryStyles[event.category];
  const hasEndDate = event.endDate && event.endDate.getTime() !== event.startDate.getTime();
  const isAvailable = event.driveLink && event.driveLink !== "#";

  return (
    <div className={`group relative overflow-hidden rounded-2xl ${styles.bg} backdrop-blur-sm ${styles.border} p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${styles.bg} backdrop-blur-sm ${styles.border}`}>
            <Camera className={`w-8 h-8 ${styles.text}`} />
          </div>
          <div>
            <h3 className={`text-xl font-semibold ${styles.text}`}>{event.title}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(event.startDate)}</span>
              {hasEndDate && event.endDate && (
                <>
                  <span>-</span>
                  <span>{formatDate(event.endDate)}</span>
                </>
              )}
            </div>
            {event.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>

        {event.driveLink && (
          isAvailable ? (
            <a
              href={event.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff1493]/20 to-[#1e91fe]/20 text-white hover:from-[#ff1493]/30 hover:to-[#1e91fe]/30 transition-colors"
            >
              <Camera className="w-4 h-4" />
              View Photos
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/20 text-gray-400">
              <Camera className="w-4 h-4" />
              Coming Soon
            </div>
          )
        )}
      </div>
    </div>
  );
});

EventCard.displayName = "EventCard";

export function EventList({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
} 