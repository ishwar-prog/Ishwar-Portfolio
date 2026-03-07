import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hyperlink } from "./ui/Hyperlink";
import { MenuContainer } from "./ui/MobileMenu";
import { Menu as MenuIcon, BriefcaseIcon, UserIcon, AtSignIcon } from "lucide-react";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const navItems = [
    { label: "ishwar suthar", href: "/" },
    { label: "work", href: "/work" },
    { label: "about me", href: "/about" },
    { label: "start a project", href: "/#contact" },
  ];

  const isWorkActive =
    location.pathname === "/work" ||
    location.pathname.startsWith("/projects/");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      {/* Desktop nav */}
      <div className="mx-auto max-w-[92rem] px-4 py-2 hidden md:flex items-center justify-between text-white text-xl font-bold">
        {navItems.map((item, index) => {
          const isActive =
            item.href === "/work"
              ? isWorkActive
              : location.pathname === item.href;
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
      <div className="flex md:hidden items-start justify-between px-4 py-3 text-white">
        <Hyperlink href="/" isActive={location.pathname === "/"} className="text-lg font-bold" underlineClassName="bg-[#D3FD50]">
          ishwar suthar
        </Hyperlink>
        <div className="fixed top-2 right-4 z-[60]">
          <MenuContainer>
            <MenuIcon className="h-5 w-5" />
            
            <a href="/work" aria-label="Work">
              <BriefcaseIcon className="h-5 w-5" />
            </a>
            
            <a href="/about" aria-label="About Us">
              <UserIcon className="h-5 w-5" />
            </a>
            
            <a href="/#contact" aria-label="Socials">
              <AtSignIcon className="h-5 w-5" />
            </a>
          </MenuContainer>
        </div>
      </div>
    </nav>
  );
}

