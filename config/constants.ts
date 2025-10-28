import appSettings from "@/public/appsettings.json";

export const SITE = appSettings.site as typeof appSettings.site;
export const NAVIGATION = appSettings.navigation as typeof appSettings.navigation;
export const LEGAL = appSettings.legal as typeof appSettings.legal;
