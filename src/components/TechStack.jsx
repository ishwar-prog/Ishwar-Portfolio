import { Tooltip } from "./ui/Tooltip";

const skills = [
  {
    name: "TypeScript",
    icon: "https://skillicons.dev/icons?i=ts",
  },
  {
    name: "JavaScript",
    icon: "https://skillicons.dev/icons?i=js",
  },
  {
    name: "Node.js",
    icon: "https://skillicons.dev/icons?i=nodejs",
  },
  {
    name: "React",
    icon: "https://skillicons.dev/icons?i=react",
  },
  {
    name: "Tailwind CSS",
    icon: "https://skillicons.dev/icons?i=tailwind",
  },
  {
    name: "Express.js",
    icon: "https://skillicons.dev/icons?i=express&theme=dark",
  },
  {
    name: "GitHub",
    icon: "https://skillicons.dev/icons?i=github",
  },
  {
    name: "Mongoose",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://skillicons.dev/icons?i=mongodb",
  },
  {
    name: "Postman",
    icon: "https://skillicons.dev/icons?i=postman",
  },
  {
    name: "Requestly",
    icon: "https://requestly.com/favicon.ico",
    fallback: "RQ",
  },
  {
    name: "Redux Toolkit",
    icon: "https://skillicons.dev/icons?i=redux",
  },
  {
    name: "React Router",
    icon: "https://reactrouter.com/favicon-light.png",
    fallback: "RR",
  },
  {
    name: "Antigravity",
    icon: null,
    fallback: "AG",
  },
  {
    name: "VS Code",
    icon: "https://skillicons.dev/icons?i=vscode",
  },
  {
    name: "Socket.io",
    icon: "https://skillicons.dev/icons?i=socketio",
  },
  {
    name: "GSAP",
    icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
  },
  {
    name: "Framer Motion",
    icon: "https://skillicons.dev/icons?i=framer",
  },
  {
    name: "Neon Database",
    icon: "https://neon.tech/favicon/favicon-32x32.png",
    fallback: "NE",
  },
  {
    name: "Vercel",
    icon: "https://skillicons.dev/icons?i=vercel",
  },
  {
    name: "Render",
    icon: "https://render.com/favicon.ico",
    fallback: "RE",
  },
  {
    name: "Cloudinary",
    icon: "https://res.cloudinary.com/cloudinary/image/upload/f_auto,q_auto/v1/website/blog_new/cloudinary-logo-blue",
    fallback: "CL",
  },
];

function SkillIcon({ skill }) {
  return (
    <Tooltip text={skill.name} position="top">
      <div className="group w-17 h-17 rounded-2xl border border-white/10 bg-white/3 flex items-center justify-center cursor-default transition-all duration-200 hover:border-white/25 hover:bg-white/[0.07] hover:scale-110 hover:shadow-[0_0_18px_rgba(255,255,255,0.06)]">
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            width={38}
            height={38}
            className="w-9.5 h-9.5 object-contain select-none"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallbackEl = e.currentTarget.nextElementSibling;
              if (fallbackEl) fallbackEl.style.display = "flex";
            }}
          />
        ) : null}
        <span
          className="text-[#f6f4f0] font-bold text-sm tracking-wide"
          style={{ display: skill.icon ? "none" : "flex" }}
        >
          {skill.fallback ?? skill.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </Tooltip>
  );
}

export default function TechStack() {
  return (
    <section className="py-20 bg-[#1f1f1f]" id="techstack">
        <div className="max-w-368 mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Skills
          </p>
          <h2 className="text-[#f6f4f0] text-5xl md:text-6xl font-extrabold leading-none tracking-tight">
            tech stack
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-12" />

        {/* Icons grid */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <SkillIcon key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
