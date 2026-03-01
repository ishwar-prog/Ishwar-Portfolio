import { Tooltip } from "./ui/Tooltip";

const FramerSVG = () => (
  <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 5.5h5v-5h-10zm0 0h-5v4l5 5v-4h5z" stroke="#f6f4f0" strokeLinejoin="round" strokeWidth="1" />
  </svg>
);

const CloudinarySVG = () => (
  <svg width="36" height="36" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="120" rx="18" fill="#3448C5" />
    <path d="M89 53.5C88.2 40.6 77.5 30 64.4 30c-9.5 0-17.8 5.2-22.1 12.9C37.4 43.6 31 50.4 31 58.5 31 67.6 38.4 75 47.5 75H89c5.5 0 10-4.5 10-10 0-5.3-4.2-9.7-9.4-10h-.6z" fill="white"/>
    <line x1="50" y1="90" x2="50" y2="75" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
    <line x1="60" y1="93" x2="60" y2="75" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
    <line x1="70" y1="90" x2="70" y2="75" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
    <polyline points="43,83 50,75 57,83" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="53,86 60,75 67,86" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="63,83 70,75 77,83" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RenderSVG = () => (
  <svg width="34" height="34" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" rx="80" fill="#46E3B7" />
    <path
      d="M110 290V140c0-16.6 13.4-30 30-30h80c44.2 0 80 35.8 80 80s-35.8 80-80 80H110z"
      fill="none"
      stroke="#0d0d0d"
      strokeWidth="38"
      strokeLinejoin="round"
    />
    <path d="M220 270l60 50" stroke="#0d0d0d" strokeWidth="38" strokeLinecap="round"/>
  </svg>
);

const NeonSVG = () => (
  <svg width="34" height="34" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <rect width="256" height="256" rx="50" fill="#00E599" />
    <path
      d="M58 196V60h140l-70 68H58m70-68v68l70 68"
      stroke="#0D0D0D"
      strokeWidth="26"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const AntigravitySVG = () => (
  <svg width="34" height="34" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ag-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#ag-grad)" />
    <path
      d="M50 72 L50 30 M50 30 L32 48 M50 30 L68 48"
      stroke="white"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="50" cy="80" r="5" fill="white" />
  </svg>
);

const SocketIOSVG = () => (
  <svg width="34" height="34" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <circle cx="128" cy="128" r="128" fill="#010101" />
    <path
      d="M70 178 C56 150 58 116 78 92 L148 78 C162 106 160 140 140 164 L70 178z"
      fill="white"
    />
    <path
      d="M186 78 C200 106 198 140 178 164 L108 178 C94 150 96 116 116 92 L186 78z"
      fill="#010101"
    />
  </svg>
);

const skills = [
  { name: "TypeScript",    icon: "/icons/tech/typescript.svg" },
  { name: "JavaScript",    icon: "/icons/tech/js.svg" },
  { name: "Node.js",       icon: "/icons/tech/nodejs.svg" },
  { name: "React",         icon: "/icons/tech/react.svg" },
  { name: "Tailwind CSS",  icon: "/icons/tech/tailwindcss.svg" },
  { name: "Express.js",    icon: "/icons/tech/express.svg" },
  { name: "GitHub",        icon: "/icons/social/github.svg" },
  { name: "Mongoose",      icon: "/icons/tech/mongoose.svg" },
  { name: "MongoDB",       icon: "/icons/tech/mongodb.svg" },
  { name: "Postman",       icon: "/icons/tools/postman.svg" },
  { name: "Requestly",     icon: "/icons/tools/requestly.svg" },

  { name: "Redux Toolkit", icon: "/icons/tech/redux.svg" },
  { name: "React Router",  icon: "/icons/tech/react-router-dark.svg" },
  { name: "Antigravity",   icon: "/icons/tech/antigravity.svg" },
  { name: "VS Code",       icon: "/icons/tools/vscode.svg" },
  { name: "Socket.io",     icon: "/icons/brands/socket_io.svg" },
  { name: "GSAP",          icon: "/icons/tech/gsap.svg" },
  { name: "Framer Motion", icon: "/icons/tech/framer.svg" },
  { name: "Neon Database", icon: "/icons/brands/neon.svg" },
  { name: "Vercel",        icon: "/icons/tech/vercel.svg" },
  { name: "Render",        icon: "/icons/tools/render.svg" },
  { name: "Cloudinary",    icon: "/icons/tech/cloudinary.svg" },
];

const row1 = skills.slice(0, 11);
const row2 = skills.slice(11, 22);

function SkillIcon({ skill }) {
  const SvgComp = skill.svgComponent ?? null;

  return (
    <Tooltip text={skill.name} position="top">
      <div className="group w-17 h-17 flex items-center justify-center cursor-default transition-transform duration-200 hover:scale-110 shrink-0">
        {SvgComp ? (
          <SvgComp />
        ) : skill.icon ? (
          <>
            <img
              src={skill.icon}
              alt={skill.name}
              width={38}
              height={38}
              className="w-50 h-50 object-contain select-none"
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fb = e.currentTarget.nextElementSibling;
                if (fb) fb.style.display = "flex";
              }}
            />
            <span
              className="text-[#f6f4f0] font-bold text-sm tracking-wide"
              style={{ display: "none" }}
            >
              {skill.fallback ?? skill.name.slice(0, 2).toUpperCase()}
            </span>
          </>
        ) : (
          <span className="text-[#f6f4f0] font-bold text-sm tracking-wide">
            {skill.fallback ?? skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    </Tooltip>
  );
}

export default function TechStack() {
  return (
    <section className="py-30 bg-[#1f1f1f]" id="techstack">
        <div className="max-w-368 mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-7">
          <p className="text-white/40 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Skills
          </p>
          <h2 className="text-[#f6f4f0] text-5xl md:text-6xl font-black leading-none tracking-tight">
            tech stack
          </h2>
        </div>

        <div className="w-full h-px bg-white/10 mb-12" />

        <div
          className="grid gap-3 mb-15"
          style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
        >
          {row1.map((skill) => (
            <SkillIcon key={skill.name} skill={skill} />
          ))}
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
        >
          {row2.map((skill) => (
            <SkillIcon key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
