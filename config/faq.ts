import { LucideIcon, HelpCircle, Users, Calendar, MapPin, Clock, Ticket, Heart, Shield, Lock } from 'lucide-react';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: LucideIcon;
}

export const faqs: FAQ[] = [
  {
    id: 'what-is-tauwerk',
    question: 'Was ist Tauwerk?',
    answer: 'Tauwerk ist ein Fetisch-Verein, der einen sicheren und respektvollen Raum für Menschen schafft, die ihre Leidenschaft für BDSM und Fetisch teilen. Wir fördern Bildung, Austausch und Community-Building in einer vertrauensvollen Umgebung.',
    icon: Heart
  },
  {
    id: 'who-can-join',
    question: 'Wer kann bei Tauwerk mitmachen?',
    answer: 'Jeder volljährige Mensch, der sich für BDSM und Fetisch interessiert, ist bei uns willkommen. Wir legen Wert auf Respekt, Einvernehmlichkeit und einen verantwortungsvollen Umgang mit der Community.',
    icon: Users
  },
  {
    id: 'safety-first',
    question: 'Wie wird Sicherheit gewährleistet?',
    answer: 'Sicherheit hat bei uns höchste Priorität. Alle Events werden von erfahrenen Mitgliedern betreut, es gibt klare Verhaltensregeln und einen Code of Conduct. Wir fördern aktiv die Kommunikation über Grenzen und Einvernehmlichkeit.',
    icon: Shield
  },
  {
    id: 'privacy',
    question: 'Wie wird meine Privatsphäre geschützt?',
    answer: 'Diskretion ist uns sehr wichtig. Wir haben strikte Regeln zum Umgang mit persönlichen Informationen. Fotos sind nur mit ausdrücklicher Erlaubnis erlaubt, und wir respektieren das Recht jedes Mitglieds auf Anonymität.',
    icon: Lock
  },
  // Event-bezogene FAQs
  {
    id: 'event-types',
    question: 'Welche Arten von Events gibt es?',
    answer: 'Wir bieten verschiedene Event-Formate: Einführungsabende für Neulinge, Workshops zu spezifischen Themen, Social Events zum Networking und praktische Sessions. Alle Events sind klar kategorisiert und beschrieben.',
    icon: Calendar
  },
  {
    id: 'event-location',
    question: 'Wo finden die Events statt?',
    answer: 'Unsere Events finden in speziell dafür ausgestatteten, privaten Locations statt. Die genauen Adressen werden nur nach bestätigter Anmeldung bekannt gegeben, um die Privatsphäre aller Teilnehmer zu schützen.',
    icon: MapPin
  },
  {
    id: 'event-duration',
    question: 'Wie lange dauern die Events?',
    answer: 'Die Dauer variiert je nach Event-Typ. Einführungsabende dauern typischerweise 3-4 Stunden, Workshops können auch einen ganzen Tag umfassen. Die genaue Dauer wird immer im Event-Detail angegeben.',
    icon: Clock
  },
  {
    id: 'event-costs',
    question: 'Kosten die Events etwas?',
    answer: 'Für die meisten Events erheben wir einen moderaten Unkostenbeitrag, der die Location, Materialien und Verpflegung abdeckt. Mitglieder erhalten Ermäßigungen. Die genauen Kosten werden transparent im Event-Detail kommuniziert.',
    icon: Ticket
  }
] as const; 