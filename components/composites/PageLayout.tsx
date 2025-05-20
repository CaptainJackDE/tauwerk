import React from 'react';
import { Background } from '@/components/composites/Background';
import { PageTitle } from '@/components/ui/PageTitle';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ title, subtitle, children, className }: PageLayoutProps) {
  return (
    <>
      <Background />
      <div className="relative flex flex-col min-h-[calc(100vh-6rem)]">
        <div className="container mx-auto px-4 pt-32 pb-12 flex-grow">
          <div className="max-w-6xl mx-auto">
            <PageTitle 
              title={title}
              subtitle={subtitle}
            />
            <div className={cn("", className)}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
} 