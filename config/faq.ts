import appSettings from "@/public/appsettings.json";
import {
  LucideIcon,
  Users,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Heart,
  Shield,
  Lock,
} from "lucide-react";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: LucideIcon;
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Users,
  Shield,
  Lock,
  Calendar,
  MapPin,
  Clock,
  Ticket,
};

export const faqs: FAQ[] = appSettings.faq.map((item) => ({
  ...item,
  icon: iconMap[item.icon] || Heart,
})) as FAQ[];
