import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn("text-center mb-8 md:mb-12", className)}>
      <h1 className={cn(
        "text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-[1.2] py-2",
        gradients.title.primary
      )}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-foreground/90 leading-[1.5] py-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
} 