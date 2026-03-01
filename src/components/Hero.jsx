import { VideoText } from "./ui/VideoText";
import galaxyVideo from "../assets/galaxy.mp4";
import { Highlighter } from "./ui/Highlighter";

export default function Hero() {
  return (
    <section className="pt-20 pb-0 text-center px-2">
      <div className="w-full">
        <div 
          className="select-none pointer-events-none"
          aria-label="ishwar suthar"
          role="heading"
          aria-level={1}
        >
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
        
        <div className="flex justify-end mt-3 md:mt-5">
          <p className="max-w-[630px] md:text-xl text-[2rem] text-white/65 font-bold leading-snug text-start">
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
    </section>
  );
}
