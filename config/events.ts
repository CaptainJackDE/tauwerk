import { Star } from "lucide-react";

export type EventCategory = 'csd' | 'fetish' | 'private' | 'other';

export const categoryStyles: Record<EventCategory, { bg: string; text: string; border: string }> = {
  csd: {
    bg: 'bg-rainbow-100 dark:bg-rainbow-900/30',
    text: 'text-rainbow-800 dark:text-rainbow-200',
    border: 'border-rainbow-200 dark:border-rainbow-800'
  },
  fetish: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-800 dark:text-purple-200',
    border: 'border-purple-200 dark:border-purple-800'
  },
  private: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800'
  },
  other: {
    bg: 'bg-gray-100 dark:bg-gray-900/30',
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border-gray-200 dark:border-gray-800'
  }
};

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: {
    day?: number;
    month?: number;
    year: number;
    time?: string;
  };
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
}

export const upcomingEvents: Event[] = [
  {
    id: "puppy-social-may",
    title: "Puppy-Social",
    category: 'fetish',
    date: {
      day: 16,
      month: 5,
      year: 2025,
      time: "19:30",
    },
    location: "Planbar, Rostock",
    description: "",
    isExternal: false,
    registration: {
      required: false,
      open: true,
      link: ""
    },
  },
  {
    id: "csd-hro",
    title: "CSD Rostock",
    category: 'csd',
    date: {
      day: 19,
      month: 7,
      year: 2025,
      time: "12:00",
    },
    location: "Neuer Markt, Rostock",
    description: "",
    isExternal: true,
    registration: {
      required: false,
      open: true,
      link: ""
    },
  },
  {
    id: "csd-hro-workshop",
    title: "Einsteiger-Workshop Fetisch",
    category: 'other',
    date: {
      month: 7,
      year: 2025,
    },
    location: "Planbar, Rostock",
    description: "Beschreibung",
    isExternal: false,
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