import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { gradients } from "@/config/gradients";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        primary: `${gradients.button.primary.base} text-white ${gradients.button.primary.hover} shadow-lg hover:shadow-primary/25`,
        secondary: `${gradients.button.secondary.base} text-white ${gradients.button.secondary.hover} shadow-lg hover:shadow-white/10`,
        outline:
          "border-2 border-white/20 bg-transparent/40 backdrop-blur-sm text-white hover:bg-transparent/60",
        ghost: "hover:bg-white/10 text-white",
      },
      size: {
        default: "h-11 px-8 py-4",
        sm: "h-9 px-4 py-2",
        lg: "h-12 px-10 py-5 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  },
);

interface ButtonBaseProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: "button";
  href?: never;
}

interface ButtonAsAnchorProps
  extends ButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  as: "a";
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      as = "button",
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = as === "a" ? "a" : "button";
    const buttonProps = as === "button" ? props : {};
    const anchorProps = as === "a" ? { href, ...props } : {};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref as any}
        {...(as === "a" ? anchorProps : buttonProps)}
      >
        <span className="relative z-10 font-medium">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
