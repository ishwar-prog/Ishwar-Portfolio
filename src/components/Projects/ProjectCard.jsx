import { Link } from "react-router-dom";

export default function ProjectCard({ title, category, image, className, route }) {
  return (
    <Link to={route} className={`flex flex-col gap-3 ${className}`}>
      <div className="relative w-full flex-1 overflow-hidden rounded-2xl ">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col px-1">
        <h3 className="text-xl md:text-xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-white/50 text-sm font-semibold md:text-medium">{category}</p>
      </div>
    </Link>
  );
}
