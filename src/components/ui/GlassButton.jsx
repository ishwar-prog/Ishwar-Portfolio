import React from "react";
import { cva } from "class-variance-authority";

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "inline-flex items-center justify-center relative backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-full transition-all duration-300 ease-in-out shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] cursor-pointer tracking-tight font-medium",
  {
    variants: {
      size: {
        default: "px-6 py-2.5 text-base",
        sm: "px-5 py-2 text-sm",
        lg: "px-8 py-3.5 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const GlassButton = React.forwardRef(
  ({ className, children, size, href, download, ...props }, ref) => {
    
    // If href is provided, render as anchor tag
    if (href) {
      return (
        <a
          href={href}
          download={download}
          className={cn(glassButtonVariants({ size }), className)}
          ref={ref}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        className={cn(glassButtonVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
