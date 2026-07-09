import { useState } from "react";
import { VideoText } from "./ui/VideoText";

const galaxyVideo = "/galaxy.mp4";
import { Highlighter } from "./ui/Highlighter";
import { GlassButton } from "./ui/GlassButton";
import { Liquid } from "./ui/liquid-gradient";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

const COLORS = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0',
};

const XIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" className={className} {...props}>
    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIALS = [
  {
    key: "x",
    href: "https://x.com/ishwarrreal",
    icon: XIcon,
    name: "X",
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/ishwar-suthar-8906b7328/",
    icon: Linkedin,
    name: "LinkedIn",
  },
  {
    key: "email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ishwar16suthar@gmail.com",
    icon: Mail,
    name: "Email",
  },
  {
    key: "github",
    href: "https://github.com/ishwar-prog",
    icon: Github,
    name: "GitHub",
  },
];

export default function Hero() {
  const [hoveredKey, setHoveredKey] = useState(null);


  return (
    <section className="pt-16 md:pt-20 pb-0 text-center px-3 md:px-4 lg:px-2">
      <div className="w-full">
        <div
          aria-label="ishwar suthar"
          role="heading"
          aria-level={1}
        >
          {/* Desktop: single line */}
          <div className="hidden md:block select-none pointer-events-none overflow-hidden">
            <VideoText
              src={galaxyVideo}
              fontSize={18}
              fontWeight="900"
              fontFamily="'Funnel Sans', sans-serif"
              textAnchor="start"
            >
              ishwar suthar
            </VideoText>
          </div>

          {/* Mobile: "ishwar" above, "suthar" below, bigger */}
          <div className="flex md:hidden flex-col select-none pointer-events-none">
            <div className="overflow-hidden">
              <VideoText
                src={galaxyVideo}
                fontSize={38}
                fontWeight="900"
                fontFamily="'Funnel Sans', sans-serif"
                textAnchor="start"
              >
                ishwar
              </VideoText>
            </div>
            <div className="overflow-hidden -mt-2">
              <VideoText
                src={galaxyVideo}
                fontSize={38}
                fontWeight="900"
                fontFamily="'Funnel Sans', sans-serif"
                textAnchor="start"
              >
                suthar
              </VideoText>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-3 md:mt-5 px-2 w-full">
          <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-6 md:gap-12 w-full justify-end">
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-end shrink-0 w-full md:w-auto md:mr-16">
              <a
                href="/Ishwar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block w-40 h-[2.8em] group bg-black border-neutral-800 border-2 rounded-lg overflow-visible shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredKey('resume')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70">
                  <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Liquid isHovered={hoveredKey === 'resume'} colors={COLORS} />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
                  <span className="absolute inset-0 rounded-lg bg-black"></span>
                  <Liquid isHovered={hoveredKey === 'resume'} colors={COLORS} />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={`spark-${i}`}
                      className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-xs'}`}
                    ></span>
                  ))}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-transparent cursor-pointer">
                  <span className="flex items-center justify-center px-2 gap-2 rounded-lg group-hover:text-yellow-400 text-white text-xl font-semibold tracking-wide whitespace-nowrap transition-colors duration-300">
                    <FileText className="inline-block group-hover:fill-yellow-400/20 group-hover:stroke-yellow-400 fill-white/10 stroke-white w-5 h-5 shrink-0 transition-all duration-300" />
                    resume
                  </span>
                </div>
              </a>

              <div className="flex flex-row items-center gap-3 justify-center">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  const isHovered = hoveredKey === social.key;
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block w-[2.8em] h-[2.8em] group bg-black border-neutral-800 border-2 rounded-lg overflow-visible shrink-0 transition-transform duration-300 hover:scale-[1.05]"
                      onMouseEnter={() => setHoveredKey(social.key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      title={`Visit my ${social.name}`}
                    >
                      <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70">
                        <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
                        <div className="relative w-full h-full overflow-hidden rounded-lg">
                          <Liquid isHovered={isHovered} colors={COLORS} />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
                      <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
                        <span className="absolute inset-0 rounded-lg bg-black"></span>
                        <Liquid isHovered={isHovered} colors={COLORS} />
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span
                            key={`spark-${i}`}
                            className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-xs'}`}
                          ></span>
                        ))}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-transparent cursor-pointer">
                        <Icon className="w-5 h-5 text-white group-hover:text-yellow-400 group-hover:fill-yellow-400/20 fill-white/10 transition-colors duration-300 shrink-0" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <p className="max-w-[630px] text-base sm:text-lg md:text-xl lg:text-[2rem] text-white/65 font-bold leading-snug text-start">
              i build{" "}
              <Highlighter color="#3b82f6" padding={4} isView={true}>
                dynamic web apps
              </Highlighter>
              , automating them through{" "}
              <Highlighter color="#10b981" padding={4} isView={true}>
                agents
              </Highlighter>
              {" "}and giving life through{" "}
              <Highlighter color="#f59e0b" padding={4} isView={true}>
                visuals
              </Highlighter>
              . enthusiastic about creating seamless user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
