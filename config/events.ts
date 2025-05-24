export type EventCategory = "csd" | "fetish" | "private" | "other";

export const categoryStyles: Record<
  EventCategory,
  { bg: string; text: string; border: string }
> = {
  csd: {
    bg: "bg-rainbow-100 dark:bg-rainbow-900/30",
    text: "text-rainbow-800 dark:text-rainbow-200",
    border: "border-rainbow-200 dark:border-rainbow-800",
  },
  fetish: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-200 dark:border-purple-800",
  },
  private: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800",
  },
  other: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-gray-200 dark:border-gray-800",
  },
};

export interface EventDate {
  year: number;
  month?: number;
  day?: number;
  time?: string;
}

export interface EventRegistration {
  required: boolean;
  open: boolean;
  opensAt?: {
    day: number;
    month: number;
    year: number;
  };
  link?: string;
}

export interface EventPrice {
  regular?: number;
  reduced?: number;
  currency?: string;
}

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: EventDate;
  location: string;
  description: string;
  isExternal?: boolean;
  registration: EventRegistration;
  price?: EventPrice;
}

export const upcomingEvents: Event[] = [
  {
    id: "csd-hro",
    title: "CSD Rostock",
    category: "csd",
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
      link: "",
    },
  },
  {
    id: "csd-hro-workshop",
    title: "Einsteiger-Workshop Fetisch",
    category: "other",
    date: {
      month: 7,
      year: 2025,
    },
    location: "Planbar, Rostock",
    description: "Beschreibung",
    isExternal: false,
    registration: {
      required: true,
      open: false,
    },
  },
];

export function getTodayEvent(): Event | null {
  const today = new Date();
  const todayString = today.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    upcomingEvents.find((event) => {
      if (!event.date.day || !event.date.month) return false;
      const eventDate = new Date(
        event.date.year,
        event.date.month - 1,
        event.date.day,
      );
      const eventDateString = eventDate.toLocaleDateString("de-DE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      return eventDateString === todayString;
    }) || null
  );
}

export function formatEventDate(date: EventDate): string {
  const parts: string[] = [];

  if (date.day) {
    parts.push(date.day.toString().padStart(2, "0"));
  }
  if (date.month) {
    parts.push(date.month.toString().padStart(2, "0"));
  }
  parts.push(date.year.toString());

  let formattedDate = parts.join(".");

  // Wenn nur das Jahr bekannt ist
  if (!date.month) {
    formattedDate = `${date.year} (Termin wird noch bekannt gegeben)`;
  }
  // Wenn nur Jahr und Monat bekannt sind
  else if (!date.day) {
    const monthName = getMonthName(date.month);
    formattedDate = `${monthName} ${date.year} (Tag wird noch bekannt gegeben)`;
  }

  if (date.time) {
    formattedDate += ` (${date.time} Uhr)`;
  }

  return formattedDate;
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
      event.registration.opensAt.day,
    );
    return `Anmeldung ab ${opensAt.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;
  }

  return "Anmeldung wird noch bekannt gegeben";
}

export function getUpcomingEvents(includeTBA: boolean = false): Event[] {
  const today = new Date();
  return upcomingEvents
    .filter((event) => {
      // Wenn nur das Jahr bekannt ist
      if (!event.date.month) return includeTBA;

      // Wenn Monat und Jahr bekannt sind
      if (!event.date.day) {
        const eventDate = new Date(event.date.year, event.date.month - 1, 1);
        return includeTBA && eventDate >= today;
      }

      // Wenn vollständiges Datum bekannt ist
      const eventDate = new Date(
        event.date.year,
        event.date.month - 1,
        event.date.day,
      );
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
