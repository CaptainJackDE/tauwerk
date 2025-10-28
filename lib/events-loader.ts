import type { Event } from "@/config/appsettings";

// Resolve base URL for server and client
function getBaseUrl(): string | null {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Prefer NEXT_PUBLIC_BASE_URL if set for server-side
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return null;
}

// Main fetcher with fallback chain: local /api/events -> remote URL -> empty array
export async function fetchEvents(options?: { revalidate?: number }): Promise<Event[]> {
  // Try internal API first (works both locally and on Vercel)
  try {
    const res = await fetch("/api/events", {
      // Ensure we don't get stale data when real-time edits are needed
      cache: options?.revalidate ? "force-cache" : "no-store",
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    } as any);

    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? (data as Event[]) : [];
    }
  } catch {
    // swallow and try fallback
  }

  // Fallback: fetch from configured public URL
  const remote = process.env.NEXT_PUBLIC_EVENTS_URL;
  if (remote) {
    try {
      const res = await fetch(remote, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const events = Array.isArray(data) ? data : data.events;
        if (Array.isArray(events)) return events as Event[];
      }
    } catch {
      // ignore
    }
  }

  // Fallback: public/events.json when running on client and baseUrl known
  const base = getBaseUrl();
  if (base) {
    try {
      const res = await fetch(`${base}/events.json`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const events = Array.isArray(data) ? data : data.events;
        if (Array.isArray(events)) return events as Event[];
      }
    } catch {
      // ignore
    }
  }

  return [];
}

export function sortEventsByDate(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    if (a.date.year !== b.date.year) return a.date.year - b.date.year;
    if (a.date.month && b.date.month) {
      if (a.date.month !== b.date.month) return a.date.month - b.date.month;
      if (a.date.day && b.date.day) return a.date.day - b.date.day;
      if (!a.date.day) return 1;
      if (!b.date.day) return -1;
    }
    if (!a.date.month) return 1;
    if (!b.date.month) return -1;
    return 0;
  });
}

export function getNextUpcomingEvent(events: Event[]): Event | null {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to midnight for day comparison

  // Filter only featured events
  const featuredEvents = events.filter(event => event.featured === true);
  const sorted = sortEventsByDate(featuredEvents);

  for (const event of sorted) {
    const { year, month, day } = event.date;
    
    if (!month || !day) {
      // Events ohne genaues Datum überspringen
      continue;
    }

    const eventDate = new Date(year, month - 1, day);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate >= now) {
      return event;
    }
  }

  return null;
}
