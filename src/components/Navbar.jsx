import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Hyperlink } from "./ui/Hyperlink";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const navItems = [
    { label: "ishwar suthar", href: "/" },
    { label: "work", href: "/work" },
    { label: "about me", href: "/about" },
    { label: "start a project", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md ">
      <div className="mx-auto max-w-[92rem] px-2 py-2 flex items-center justify-between text-white text-xl font-bold">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
              <Hyperlink
            key={index}
            href={item.href}
            className={`transition-colors duration-300 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "text-white/40"
                : "text-white"
            }`}
            underlineClassName="bg-[#D3FD50]"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item.label}
        </Hyperlink>
        )})}
      </div>
    </nav>
  );
}

