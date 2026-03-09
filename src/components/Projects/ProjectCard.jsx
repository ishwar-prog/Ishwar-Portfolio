import { Link } from "react-router-dom";
import { PixelImage } from "../ui/PixelImage";

export default function ProjectCard({ title, category, image, className, route }) {
  const isMobile = window.innerWidth < 768;

  return (
    <a href={route} className={`flex flex-col gap-3 ${className} cursor-pointer project-hover`}>
      <div className="relative w-full flex-1 overflow-hidden rounded-2xl group">
        <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500">
          <PixelImage
            src={image}
            className="w-full h-full"
            grid={isMobile ? "4x3" : "8x4"}
            grayscaleAnimation={!isMobile}
            pixelFadeInDuration={isMobile ? 400 : 1000}
            colorRevealDelay={isMobile ? 150 : 500}
            maxAnimationDelay={isMobile ? 300 : 800}
          />
        </div>
      </div>
      <div className="flex flex-col px-1">
        <h3 className="text-xl md:text-xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-white/50 text-sm font-semibold md:text-medium">{category}</p>
      </div>
    </a>
  );
}
