import appSettings from "@/public/appsettings.json";
import { Users, Heart, Shield, Users2 } from "lucide-react";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Users2,
  Heart,
  Users,
};

export const values = appSettings.about.values.map((item) => ({
  ...item,
  icon: iconMap[item.icon] || Heart,
}));

export const teamMembers = appSettings.about.teamMembers;
