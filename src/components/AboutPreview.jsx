import TextReveal from "./ui/TextReveal";
import ishwar from "../assets/ishwar.png";

export default function AboutPreview() {
  const revealText = `Ishwar Suthar — Full-stack developer and an UI/UX enthusiast from Mumbai, Sophomore in Computer Engineering at KCCEMSR. I build fast, expressive web apps, diving into agentic AI and automation, and fuse clean UI with visual storytelling. Learning by building and breaking. For more Contact Me.`;

  return (
    <section className="py-20 px-4 md:px-8 bg-[#1f1f1f]" id="about">
      <div className="max-w-[92rem] mx-auto">
        {/* Text Reveal Section */}
        <TextReveal text={revealText} className="mb-20" />

        {/* Three Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-28 items-start">
          {/* Column 1: Image */}
          <div className="w-fit aspect-square bg-[#f6f4f0] rounded-4xl overflow-hidden">
            <img
              src={ishwar}
              alt="Ishwar"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Column 2: Why Work With Me */}
          <div className="flex flex-col gap-1">
            <p className="text-1xl text-white/40 font-bold">why work with me</p>
            <p className="text-2xl text-[#f6f4f0] leading-tight font-bold tracking-tight">
              I build under pressure and ship on time. hackathons taught me
              speed, focus, and ruthless prioritization—projects taught me how
              real systems break and how to fix them. I'm full-stack by default,
              ui-obsessed by habit, and deep into agentic ai by curiosity. I
              move fast, learn faster, and communicate clearly—through code,
              clean interfaces, and visuals. if you want someone who treats
              every idea like a live product and every deadline like it's real,
              I'm a strong bet.
            </p>
          </div>

          {/* Column 3: When I'm Not Building */}
          <div className="flex flex-col gap-1">
            <p className="text-balance text-white/40 font-bold">
              when I'm not building
            </p>
            <p className="text-2xl text-[#f6f4f0] leading-tight font-bold tracking-tight">
              you'll find me exploring music - more into rap, making short
              videos, managing events, watching anime, playing sports physically
              and virtually. hanging out with friends and building something
              other than projects, more to come
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
