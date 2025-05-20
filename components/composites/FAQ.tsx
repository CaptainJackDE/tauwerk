import { useState } from 'react';
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";
import type { FAQ } from '@/config/faq';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQ({ faqs, className }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="group relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2">
                  <faq.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className={cn(
                "text-lg font-semibold",
                gradients.title.primary
              )}>
                {faq.question}
              </h3>
            </div>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-foreground/50 transition-transform duration-300",
                openId === faq.id && "transform rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openId === faq.id ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="p-6 pt-0 text-foreground/70">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 