import { useState } from "react";
import { Link } from "react-router-dom";

const ExpandCards = ({ projects }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-stretch justify-start md:justify-center gap-2.5 min-w-max md:min-w-0 ">
        {projects.map((project, idx) => (
          <Link
            key={project.title}
            to={project.route}
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
            {/* Title + category overlay on expanded */}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExpandCards;
