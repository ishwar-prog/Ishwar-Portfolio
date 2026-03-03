"use client";
import React from "react";
import { cn } from "../../lib/utils";

const Hyperlink = ({
  href,
  children,
  className,
  underlineClassName,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={href}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        if (onMouseLeave) onMouseLeave(e);
      }}
      className={cn(
        "relative inline-block",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      <span className="absolute left-0 w-full h-[1.5px] bg-current opacity-30 -bottom-[2px]" />

      <span
        className={cn(
          "absolute left-0 w-full h-[1.5px] transform transition-transform duration-500 ease-out -bottom-[2px]",
          isHovered || isActive ? "scale-x-100 origin-left" : "scale-x-0 origin-right",
          underlineClassName || "bg-current"
        )}
      />
    </a>
  );
};

export { Hyperlink };