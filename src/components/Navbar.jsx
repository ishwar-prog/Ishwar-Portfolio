import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Hyperlink } from "./ui/Hyperlink";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "ishwar suthar", href: "/" },
    { label: "work", href: "/work" },
    { label: "about me", href: "/about" },
    { label: "start a project", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      {/* Desktop nav */}
      <div className="mx-auto max-w-[92rem] px-4 py-2 hidden md:flex items-center justify-between text-white text-xl font-bold">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Hyperlink
              key={index}
              href={item.href}
              isActive={isActive}
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
          );
        })}
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 text-white">
        <Hyperlink href="/" className="text-lg font-bold" underlineClassName="bg-[#D3FD50]">
          ishwar suthar
        </Hyperlink>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-[6px] z-[60] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 bg-[#1f1f1f] z-[55] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Hyperlink
              key={index}
              href={item.href}
              isActive={isActive}
              className="text-white text-3xl font-bold transition-colors duration-300"
              underlineClassName="bg-[#D3FD50]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Hyperlink>
          );
        })}
      </div>
    </nav>
  );
}

