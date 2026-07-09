import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ title, category, image, className, route }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 19,
        mass: 0.5
      }}
      className={`w-full ${className}`}
    >
      <Link to={route} className="flex flex-col gap-4 cursor-pointer group project-hover">
        <div className="relative w-full overflow-hidden rounded-[2rem] bg-zinc-900 aspect-[16/11]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col px-3 mt-1">
          <p className="text-white/40 text-xs md:text-sm font-medium tracking-wider uppercase mb-1">
            {category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-white/80">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

