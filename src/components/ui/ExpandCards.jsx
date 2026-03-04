import { useState } from "react";
import { Link } from "react-router-dom";

const ExpandCards = ({ projects }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <>
      {/* Desktop: horizontal expand cards */}
      <div className="hidden md:block w-full overflow-x-auto">
        <div className="flex items-stretch justify-center gap-2.5 min-w-0">
          {projects.map((project, idx) => (
            <a
              key={project.title}
              href={project.route}
              className="relative cursor-pointer overflow-hidden rounded-[20px] shrink-0 block border border-white/60"
              style={{
                width: expandedIndex === idx ? "56rem" : "8rem",
                height: "27rem",
                transition: "width 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
              onMouseEnter={() => setExpandedIndex(idx)}
            >
              <img
                className="w-full h-full object-cover"
                src={project.image}
                alt={project.title}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/75 to-transparent"
                style={{
                  opacity: expandedIndex === idx ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <h3 className="text-white font-bold text-xl lowercase whitespace-nowrap">
                  {project.title}
                </h3>
                <p className="text-white/65 text-sm lowercase font-semibold mt-0.5">
                  {project.category}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stacked cards */}
      <div className="md:hidden flex flex-col gap-4">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.route}
            className="relative block overflow-hidden rounded-[16px] border border-white/60"
          >
            <img
              className="w-full h-[200px] sm:h-[260px] object-cover"
              src={project.image}
              alt={project.title}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <h3 className="text-white font-bold text-lg lowercase">
                {project.title}
              </h3>
              <p className="text-white/65 text-sm lowercase font-semibold mt-0.5">
                {project.category}
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default ExpandCards;
