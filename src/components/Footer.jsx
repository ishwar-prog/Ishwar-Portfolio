import { useLocation } from "react-router-dom";
import { Hyperlink } from "./ui/Hyperlink";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="font-normal text-[#f6f4f0] px-3 md:px-0 pt-10 md:pt-12 pb-6">
      <div className="max-w-[92rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0">
          <div className="flex flex-col gap-2 text-sm md:text-xl">
            <p className="flex items-center gap-1">
              email:{" "}
              <Hyperlink
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ishwar16suthar@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                underlineClassName="bg-[#D3FD50]"
              >
                ishwar16suthar@gmail.com
              </Hyperlink>
            </p>

            <p>based in: mumbai, india</p>
            <p>available:freelance projects & internships</p>

            <p className="flex items-center gap-1">
              github:
              <Hyperlink
                href="https://github.com/ishwar-prog"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                underlineClassName="bg-[#D3FD50]"
              >
                ishwar-prog
              </Hyperlink>
            </p>
          </div>

          {/* Right Column - Pages & Socials */}
          <div className="flex gap-12 sm:gap-16 text-sm md:text-xl">
            {/* Pages */}
            <div className="flex flex-col gap-1">
              <p className="text-white/65 mb-1 text-base md:text-lg">pages</p>
              <Hyperlink
                href="/"
                isActive={location.pathname === "/"}
                className="transition-colors font-semibold"
                underlineClassName="bg-[#D3FD50]"
              >
                home
              </Hyperlink>
              <Hyperlink
                href="/about"
                isActive={location.pathname === "/about"}
                className="transition-colors font-semibold"
                underlineClassName="bg-[#D3FD50]"
              >
                about
              </Hyperlink>
              <Hyperlink
                href="/work"
                isActive={location.pathname === "/work"}
                className="transition-colors font-semibold"
                underlineClassName="bg-[#D3FD50]"
              >
                work
              </Hyperlink>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-1">
              <p className="text-white/65 mb-1 text-base md:text-lg">socials</p>
              <Hyperlink
                href="https://www.instagram.com/ishwarrreal/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors font-semibold"
                underlineClassName="bg-[#D3FD50]"
              >
                instagram
              </Hyperlink>
              <Hyperlink
                href="https://x.com/ishwarrreal"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors font-semibold"
                underlineClassName="bg-[#D3FD50]"
              >
                x(twitter)
              </Hyperlink>
              <Hyperlink
                href="https://www.linkedin.com/in/ishwar-suthar-8906b7328/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors font-semibold"
                underlineClassName="bg-[#D3FD50]"
              >
                linkedin
              </Hyperlink>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <h2 className="text-[15vw] sm:text-[18vw] md:text-[16rem] font-extrabold leading-none tracking-tighter text-left md:text-center">
            ishwar suthar
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center font-medium mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10 text-white/70 text-xs md:text-base">
          <p>© 2026 ishwarsuthar. all rights reserved</p>
          <p className="mt-2 md:mt-0 text-xl md:text-3xl text-[#D3FD50] font-bold">TB$M</p>
        </div>
      </div>
    </footer>
  );
}
