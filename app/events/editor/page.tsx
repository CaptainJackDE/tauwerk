"use client";

import React from "react";
import { PageLayout } from "@/components/composites/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatEventDate } from "@/config/appsettings";
import type { Event } from "@/config/appsettings";
import { fetchEvents } from "@/lib/events-loader";

type EditableRegistration = {
  required: boolean;
  open: boolean;
  opensAt?: { day?: number; month?: number; year?: number };
  link?: string;
};

type EditablePrice = { regular?: number; reduced?: number; currency?: string };

type EditableEvent = Omit<Event, "registration" | "price"> & {
  registration: EditableRegistration;
  price?: EditablePrice;
};

export default function EventsEditorPage() {
  const [events, setEvents] = React.useState<EditableEvent[]>([]);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    // Prefill by loading current events
    fetchEvents().then((data) => setEvents(data as EditableEvent[]));
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
  const text = await file.text();
  const parsed = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed : parsed.events;
      if (!Array.isArray(list)) throw new Error("Ungültiges JSON-Format");
      setEvents(list as EditableEvent[]);
      setError("");
    } catch (err: any) {
      setError(`Fehler beim Laden: ${err.message || String(err)}`);
    }
  };

  const addEvent = () => {
    setEvents((prev) => [
      ...prev,
      {
        id: "",
        title: "",
        category: "other",
        date: { year: new Date().getFullYear() },
        location: "",
        description: "",
        isExternal: false,
        registration: { required: false, open: false },
        price: { currency: "EUR" },
      },
    ]);
  };

  const removeEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  // Dialog state
  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<EditableEvent | null>(null);

  const openEditor = (index: number | null) => {
    if (index === null) {
      // New event
      setDraft({
        id: "",
        title: "",
        category: "other",
        date: { year: new Date().getFullYear() },
        location: "",
        description: "",
        isExternal: false,
        registration: { required: false, open: false },
        price: { currency: "EUR" },
      });
      setEditingIndex(null);
    } else {
      setDraft(JSON.parse(JSON.stringify(events[index])));
      setEditingIndex(index);
    }
    setOpen(true);
  };

  const saveDraft = () => {
    if (!draft) return;
    const clean: EditableEvent = JSON.parse(JSON.stringify(draft));
    if (clean.price && !clean.price.regular && !clean.price.reduced) delete clean.price;
    if (clean.registration && !clean.registration.link) delete clean.registration.link;
    if (
      clean.registration &&
      (!clean.registration.opensAt ||
        !clean.registration.opensAt.day ||
        !clean.registration.opensAt.month ||
        !clean.registration.opensAt.year)
    ) {
      delete clean.registration.opensAt;
    }
    if (!clean.date.day) delete clean.date.day;
    if (!clean.date.month) delete clean.date.month;
    if (!clean.date.time) delete clean.date.time;

    if (editingIndex === null) {
      setEvents((prev) => [...prev, clean]);
    } else {
      setEvents((prev) => prev.map((e, i) => (i === editingIndex ? clean : e)));
    }
    setOpen(false);
  };

  const exportJson = () => {
    const content = JSON.stringify({ events }, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `events.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    const content = JSON.stringify({ events }, null, 2);
    try {
      await navigator.clipboard.writeText(content);
    } catch {}
  };

  const label = (text: string) => (
    <label className="text-sm text-foreground/70 block mb-1">{text}</label>
  );

  // Compact event card
  const EventCard = ({ ev, idx }: { ev: EditableEvent; idx: number }) => (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className={cn("text-lg font-semibold", gradients.title.primary)}>{ev.title || "(Ohne Titel)"}</h3>
            {ev.featured && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/40">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/70">
            {ev.category} • {ev.location || "Ort folgt"}
          </p>
          <p className="text-xs text-foreground/60">
            {formatEventDate(ev.date)} {ev.isExternal ? "• extern" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => openEditor(idx)}>Bearbeiten</Button>
          <Button variant="outline" onClick={() => removeEvent(idx)}>Entfernen</Button>
        </div>
      </div>
    </div>
  );

  // Dialog form fields
  

  return (
    <PageLayout
      title="Events-Editor"
      subtitle="Lade eine bestehende Konfiguration und bearbeite die Events"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 items-center">
          <Input type="file" accept="application/json" onChange={onFileChange} />
          <Button variant="secondary" onClick={() => fetchEvents().then((d) => setEvents(d as any))}>
            Von /api/events laden
          </Button>
          <Button onClick={copyJson}>JSON kopieren</Button>
          <Button variant="outline" onClick={exportJson}>
            JSON herunterladen
          </Button>
          <Button variant="ghost" onClick={addEvent}>
            + Event hinzufügen
          </Button>
        </div>

        <div className="space-y-4">
          {events.map((ev, idx) => (
            <EventCard key={idx} ev={ev} idx={idx} />
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => openEditor(null)}>+ Event hinzufügen</Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl">
            <DialogHeader>
              <DialogTitle className={cn(gradients.title.primary)}>
                {editingIndex === null ? "Neues Event" : "Event bearbeiten"}
              </DialogTitle>
            </DialogHeader>

            {draft && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {label("ID")}
                    <Input value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value })} />
                  </div>
                  <div>
                    {label("Titel")}
                    <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                  </div>
                  <div>
                    {label("Kategorie (csd | fetish | private | other)")}
                    <Input
                      value={draft.category}
                      onChange={(e) => setDraft({ ...draft, category: e.target.value as any })}
                    />
                  </div>
                  <div>
                    {label("Ort")}
                    <Input
                      value={draft.location}
                      onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    {label("Beschreibung")}
                    <Input
                      value={draft.description}
                      onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {label("Jahr")}
                    <Input
                      type="number"
                      value={draft.date.year}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          date: {
                            ...draft.date,
                            year: Number(e.target.value) || new Date().getFullYear(),
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    {label("Monat (optional)")}
                    <Input
                      type="number"
                      value={draft.date.month || ""}
                      onChange={(e) => setDraft({ ...draft, date: { ...draft.date, month: Number(e.target.value) || undefined } })}
                    />
                  </div>
                  <div>
                    {label("Tag (optional)")}
                    <Input
                      type="number"
                      value={draft.date.day || ""}
                      onChange={(e) => setDraft({ ...draft, date: { ...draft.date, day: Number(e.target.value) || undefined } })}
                    />
                  </div>
                  <div>
                    {label("Uhrzeit (optional)")}
                    <Input
                      value={draft.date.time || ""}
                      onChange={(e) => setDraft({ ...draft, date: { ...draft.date, time: e.target.value || undefined } })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {label("Anmeldung erforderlich?")}
                    <Button
                      variant={draft.registration.required ? "primary" : "outline"}
                      onClick={() => setDraft({ ...draft, registration: { ...draft.registration, required: !draft.registration.required } })}
                    >
                      {draft.registration.required ? "Ja" : "Nein"}
                    </Button>
                  </div>
                  <div>
                    {label("Anmeldung offen?")}
                    <Button
                      variant={draft.registration.open ? "primary" : "outline"}
                      onClick={() => setDraft({ ...draft, registration: { ...draft.registration, open: !draft.registration.open } })}
                    >
                      {draft.registration.open ? "Ja" : "Nein"}
                    </Button>
                  </div>
                  <div>
                    {label("Externes Event?")}
                    <Button
                      variant={draft.isExternal ? "primary" : "outline"}
                      onClick={() => setDraft({ ...draft, isExternal: !draft.isExternal })}
                    >
                      {draft.isExternal ? "Ja" : "Nein"}
                    </Button>
                  </div>
                  <div>
                    {label("Featured (Countdown auf Startseite)?")}
                    <Button
                      variant={draft.featured ? "primary" : "outline"}
                      onClick={() => setDraft({ ...draft, featured: !draft.featured })}
                    >
                      {draft.featured ? "Ja" : "Nein"}
                    </Button>
                  </div>
                  <div>
                    {label("Anmeldelink (optional)")}
                    <Input
                      value={draft.registration.link || ""}
                      onChange={(e) => setDraft({ ...draft, registration: { ...draft.registration, link: e.target.value } })}
                    />
                  </div>
                  <div>
                    {label("Öffnet am (optional)")}
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        placeholder="Tag"
                        value={draft.registration.opensAt?.day || ""}
                        onChange={(e) => setDraft({ ...draft, registration: { ...draft.registration, opensAt: { ...(draft.registration.opensAt || {}), day: Number(e.target.value) || undefined } } })}
                      />
                      <Input
                        type="number"
                        placeholder="Monat"
                        value={draft.registration.opensAt?.month || ""}
                        onChange={(e) => setDraft({ ...draft, registration: { ...draft.registration, opensAt: { ...(draft.registration.opensAt || {}), month: Number(e.target.value) || undefined } } })}
                      />
                      <Input
                        type="number"
                        placeholder="Jahr"
                        value={draft.registration.opensAt?.year || ""}
                        onChange={(e) => setDraft({ ...draft, registration: { ...draft.registration, opensAt: { ...(draft.registration.opensAt || {}), year: Number(e.target.value) || undefined } } })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {label("Preis (Regulär)")}
                    <Input
                      type="number"
                      step="0.5"
                      value={draft.price?.regular ?? ""}
                      onChange={(e) => setDraft({ ...draft, price: { ...(draft.price || {}), regular: Number(e.target.value) || undefined } })}
                    />
                  </div>
                  <div>
                    {label("Preis (Ermäßigt)")}
                    <Input
                      type="number"
                      step="0.5"
                      value={draft.price?.reduced ?? ""}
                      onChange={(e) => setDraft({ ...draft, price: { ...(draft.price || {}), reduced: Number(e.target.value) || undefined } })}
                    />
                  </div>
                  <div>
                    {label("Währung")}
                    <Input
                      value={draft.price?.currency ?? ""}
                      onChange={(e) => setDraft({ ...draft, price: { ...(draft.price || {}), currency: e.target.value } })}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-2">
                  <Button onClick={saveDraft}>Speichern</Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}
