import { VideoText } from "./ui/VideoText";
import galaxyVideo from "../assets/galaxy.mp4";
import { Highlighter } from "./ui/Highlighter";
import { GlassButton } from "./ui/GlassButton";

export default function Hero() {
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
            <GlassButton
              href="/Ishwar-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="text-lg md:text-xl px-10 py-3.5 shrink-0"
            >
              resume
            </GlassButton>

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
