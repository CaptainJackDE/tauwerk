import { cn } from "@/lib/utils";

interface BackgroundProps {
  className?: string;
  children: React.ReactNode;
}

export function Background({ className, children }: BackgroundProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background" />

      <div className="relative">{children}</div>
    </div>
  );
}
