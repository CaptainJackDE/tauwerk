import { Star } from "lucide-react";

export type EventCategory = 'leather' | 'pride' | 'fetish' | 'other' | 'private';

export interface Event {
  id: string;
  title: string;
  date: {
    day?: number;
    month?: number;
    year: number;
    time?: string;
  };
  location: string;
  description: string;
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
}

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Tauwerk Sommerfest",
    date: {
      day: 15,
      month: 7,
      year: 2024,
      time: "14:00",
    },
    location: "Tauwerk, Hamburg",
    description: "Unser jährliches Sommerfest mit Live-Musik, Workshops und vielen Überraschungen.",
    registration: {
      required: true,
      open: true,
      link: "https://example.com/anmeldung/sommerfest"
    },
  },
  {
    id: "2",
    title: "Open Stage Night",
    date: {
      day: 22,
      month: 7,
      year: 2024,
      time: "19:00",
    },
    location: "Tauwerk, Hamburg",
    description: "Eine offene Bühne für alle Künstler. Bring deine Instrumente mit und teile deine Musik!",
    registration: {
      required: false,
      open: false
    },
  },
  {
    id: "3",
    title: "Tauwerk Winterfest",
    date: {
      day: 15,
      month: 12,
      year: 2024,
      time: "16:00",
    },
    location: "Tauwerk, Hamburg",
    description: "Unser gemütliches Winterfest mit Glühwein, Live-Musik und weihnachtlicher Stimmung.",
    registration: {
      required: true,
      open: false,
      opensAt: {
        day: 1,
        month: 10,
        year: 2024
      },
      link: "https://example.com/anmeldung/winterfest"
    },
  },
  {
    id: "4",
    title: "Tauwerk Jahreskonzert",
    date: {
      month: 9,
      year: 2024,
    },
    location: "Tauwerk, Hamburg",
    description: "Unser großes Jahreskonzert mit allen Ensembles und besonderen Gästen.",
    registration: {
      required: true,
      open: false,
      link: "https://example.com/anmeldung/jahreskonzert"
    },
  },
  {
    id: "5",
    title: "Tauwerk Workshop",
    date: {
      day: 10,
      month: 8,
      year: 2024,
    },
    location: "Tauwerk, Hamburg",
    description: "Ein spannender Workshop mit vielen praktischen Übungen.",
    registration: {
      required: true,
      open: false,
      opensAt: {
        day: 1,
        month: 7,
        year: 2024
      },
      link: "https://example.com/anmeldung/workshop"
    },
  },
  {
    id: "6",
    title: "Tauwerk Special Event",
    date: {
      year: 2024,
    },
    location: "Tauwerk, Hamburg",
    description: "Ein besonderes Event mit vielen Überraschungen.",
    registration: {
      required: true,
      open: false
    },
  },
];

export function getTodayEvent(): Event | null {
  const today = new Date();
  const todayString = today.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return upcomingEvents.find(event => {
    if (!event.date.day || !event.date.month) return false;
    const eventDate = new Date(event.date.year, event.date.month - 1, event.date.day);
    const eventDateString = eventDate.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return eventDateString === todayString;
  }) || null;
}

export function formatEventDate(date: Event['date']): string {
  // Wenn nur das Jahr bekannt ist
  if (!date.month) {
    return `${date.year} (Termin wird noch bekannt gegeben)`;
  }

  // Wenn Monat und Jahr bekannt sind
  if (!date.day) {
    return `${getMonthName(date.month)} ${date.year} (Termin wird noch bekannt gegeben)`;
  }

  // Wenn Tag, Monat und Jahr bekannt sind
  const eventDate = new Date(date.year, date.month - 1, date.day);
  const formattedDate = eventDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Wenn die Uhrzeit fehlt
  if (!date.time) {
    return `${formattedDate} (Uhrzeit wird noch bekannt gegeben)`;
  }

  // Vollständiges Datum mit Uhrzeit
  return `${formattedDate}, ${date.time} Uhr`;
}

export function formatRegistrationStatus(event: Event): string {
  if (!event.registration.required) {
    return "Keine Anmeldung erforderlich";
  }

  if (event.registration.open) {
    return "Jetzt anmelden";
  }

  if (event.registration.opensAt) {
    const opensAt = new Date(
      event.registration.opensAt.year,
      event.registration.opensAt.month - 1,
      event.registration.opensAt.day
    );
    return `Anmeldung ab ${opensAt.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}`;
  }

  return "Anmeldung wird noch bekannt gegeben";
}

export function getUpcomingEvents(includeTBA: boolean = false): Event[] {
  const today = new Date();
  return upcomingEvents
    .filter(event => {
      // Wenn nur das Jahr bekannt ist
      if (!event.date.month) return includeTBA;
      
      // Wenn Monat und Jahr bekannt sind
      if (!event.date.day) {
        const eventDate = new Date(event.date.year, event.date.month - 1, 1);
        return includeTBA && eventDate >= today;
      }

      // Wenn vollständiges Datum bekannt ist
      const eventDate = new Date(event.date.year, event.date.month - 1, event.date.day);
      return eventDate >= today;
    })
    .sort((a, b) => {
      // Sortiere nach Bekanntheitsgrad des Datums
      if (!a.date.month) return 1;
      if (!b.date.month) return -1;
      if (!a.date.day) return 1;
      if (!b.date.day) return -1;

      const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
      const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
      return dateA.getTime() - dateB.getTime();
    });
}

function getMonthName(month: number): string {
  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  return months[month - 1];
} 