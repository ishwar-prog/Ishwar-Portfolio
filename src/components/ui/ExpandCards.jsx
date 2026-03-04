import { useState } from "react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

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
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-xl lowercase whitespace-nowrap">
                      {project.title}
                    </h3>
                    <p className="text-white/65 text-sm lowercase font-semibold mt-0.5">
                      {project.category}
                    </p>
                  </div>
                  {(project.github || project.liveUrl) && (
                    <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors text-white"
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors text-white"
                        >
                          <GlobeIcon />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stacked cards */}
      <div className="md:hidden flex flex-col gap-4">
        {projects.map((project) => (
          <div key={project.title} className="relative overflow-hidden rounded-[16px] border border-white/60">
            <a href={project.route} className="block">
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
            {/* GitHub & Live icons pinned to bottom-right */}
            {(project.github || project.liveUrl) && (
              <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-black/70 transition-colors text-white"
                  >
                    <GithubIcon />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-black/70 transition-colors text-white"
                  >
                    <GlobeIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpandCards;
