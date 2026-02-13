export default function ProjectCard({ title, category, image, className }) {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div className="relative w-full flex-1 overflow-hidden rounded-2xl ">
                <img 
                    src={image} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="flex flex-col px-1">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">{title}</h3>
                <p className="text-white/50 text-base md:text-lg">{category}</p>
            </div>
        </div>
    )
}