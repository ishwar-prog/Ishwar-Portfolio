"use client";
import React from "react";
import { cn } from "../../lib/utils";

const Hyperlink = ({
  href,
  children,
  className,
  underlineClassName,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative inline-block",
        className
      )}
    >
      <span className="relative z-10">{children}</span>

      <span className="absolute left-0 w-full h-[1.5px] bg-current opacity-30 -bottom-[2px]" />

      <span
        className={cn(
          "absolute left-0 w-full h-[1.5px] transform scale-x-0 transition-transform duration-500 ease-out -bottom-[2px]",
          isHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right",
          underlineClassName || "bg-current"
        )}
      />
    </a>
  );
};

export { Hyperlink };