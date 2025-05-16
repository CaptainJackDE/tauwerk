"use client";

import React, { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/composites/Hero";
import { Features } from '@/components/composites/Features';
import { UpcomingEvents } from '@/components/composites/UpcomingEvents';
import { AboutPreview } from '@/components/composites/AboutPreview';
import { ContactCTA } from '@/components/composites/ContactCTA';
import { Background } from '@/components/composites/Background';

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Background />
      <main>
        <Hero />
        <Features />
        <UpcomingEvents />
        <AboutPreview />
        <ContactCTA />
      </main>
    </>
  );
}
