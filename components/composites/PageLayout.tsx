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
      <div className={cn("min-h-screen mt-8", className)}>
        <section className="relative py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <PageTitle 
                title={title}
                subtitle={subtitle}
              />
              {children}
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 