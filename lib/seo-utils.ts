import type { Event } from "@/config/events";

/**
 * Generate JSON-LD structured data for a single event (Schema.org Event)
 */
export function generateEventJsonLd(event: Event) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tauwerk.de";
  
  // Build start and end dates
  let startDate = "";
  let endDate = "";
  
  if (event.date.day && event.date.month) {
    const start = new Date(event.date.year, event.date.month - 1, event.date.day);
    
    if (event.date.time) {
      const [hours, minutes] = event.date.time.split(":").map(Number);
      start.setHours(hours || 0, minutes || 0, 0);
      const end = new Date(start);
      end.setHours(start.getHours() + 2); // Default 2h duration
      startDate = start.toISOString();
      endDate = end.toISOString();
    } else {
      startDate = start.toISOString().split("T")[0];
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      endDate = end.toISOString().split("T")[0];
    }
  } else {
    // Fallback for incomplete dates
    const fallback = new Date(event.date.year, (event.date.month || 1) - 1, 1);
    startDate = fallback.toISOString().split("T")[0];
    endDate = startDate;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description || `${event.title} in ${event.location}`,
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.includes(",") 
          ? event.location.split(",")[1].trim() 
          : event.location,
        addressCountry: "DE",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.isExternal ? "Externer Veranstalter" : "Tauwerk",
      url: baseUrl,
    },
    ...(event.price?.regular && {
      offers: {
        "@type": "Offer",
        price: event.price.regular,
        priceCurrency: event.price.currency || "EUR",
        availability: "https://schema.org/InStock",
        url: event.registration.link || `${baseUrl}/events#event-${event.id}`,
        ...(event.price.reduced && {
          priceSpecification: {
            "@type": "PriceSpecification",
            price: event.price.reduced,
            priceCurrency: event.price.currency || "EUR",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              name: "Ermäßigt",
            },
          },
        }),
      },
    }),
    ...(event.registration.link && {
      url: event.registration.link,
    }),
  };

  return jsonLd;
}

/**
 * Generate JSON-LD for a list of events (ItemList)
 */
export function generateEventsListJsonLd(events: Event[]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tauwerk.de";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title,
        url: `${baseUrl}/events#event-${event.id}`,
      },
    })),
  };
}

/**
 * Generate Open Graph meta tags for an event
 */
export function getEventOgTags(event: Event) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tauwerk.de";
  
  return {
    title: `${event.title} | Tauwerk Events`,
    description: event.description || `${event.title} in ${event.location}`,
    url: `${baseUrl}/events#event-${event.id}`,
    type: "website",
    siteName: "Tauwerk",
    locale: "de_DE",
  };
}

/**
 * Generate Twitter Card meta tags for an event
 */
export function getEventTwitterTags(event: Event) {
  return {
    card: "summary",
    title: event.title,
    description: event.description || `${event.title} in ${event.location}`,
  };
}
