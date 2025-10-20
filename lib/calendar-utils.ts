import type { Event } from "@/config/events";

/**
 * Generates an iCal (.ics) file content for a single event
 */
export function generateICS(event: Event): string {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  // Build event date
  let dtstart = "";
  let dtend = "";
  
  if (event.date.day && event.date.month) {
    const startDate = new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day
    );
    
    if (event.date.time) {
      // Parse time (e.g., "19:30")
      const [hours, minutes] = event.date.time.split(":").map(Number);
      startDate.setHours(hours || 0, minutes || 0, 0);
      
      // End time: +2 hours by default
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2);
      
      dtstart = formatICalDateTime(startDate);
      dtend = formatICalDateTime(endDate);
    } else {
      // All-day event
      dtstart = formatICalDate(startDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      dtend = formatICalDate(endDate);
    }
  } else {
    // Fallback for incomplete dates
    const fallbackDate = new Date(event.date.year, (event.date.month || 1) - 1, 1);
    dtstart = formatICalDate(fallbackDate);
    const endDate = new Date(fallbackDate);
    endDate.setDate(endDate.getDate() + 1);
    dtend = formatICalDate(endDate);
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tauwerk//Events//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@tauwerk.de`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeICalText(event.title)}`,
    `DESCRIPTION:${escapeICalText(event.description || "")}`,
    `LOCATION:${escapeICalText(event.location)}`,
    event.registration.link ? `URL:${event.registration.link}` : "",
    `STATUS:CONFIRMED`,
    `CATEGORIES:${event.category.toUpperCase()}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return icsContent;
}

/**
 * Format date as YYYYMMDD for all-day events
 */
function formatICalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Format date as YYYYMMDDTHHmmss for timed events
 */
function formatICalDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Escape special characters in iCal text fields
 */
function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Download an .ics file for an event
 */
export function downloadICS(event: Event): void {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate "Add to Google Calendar" URL
 */
export function getGoogleCalendarUrl(event: Event): string {
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.description || "");
  const location = encodeURIComponent(event.location);
  
  let dates = "";
  if (event.date.day && event.date.month) {
    const startDate = new Date(event.date.year, event.date.month - 1, event.date.day);
    
    if (event.date.time) {
      const [hours, minutes] = event.date.time.split(":").map(Number);
      startDate.setHours(hours || 0, minutes || 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2);
      dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;
    } else {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      dates = `${formatGoogleDate(startDate).slice(0, 8)}/${formatGoogleDate(endDate).slice(0, 8)}`;
    }
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&location=${location}&dates=${dates}`;
}

function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
