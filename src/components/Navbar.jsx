export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md ">
      <div className="mx-auto max-w-[92rem] px-2 py-2 flex items-center justify-between text-white text-xl font-bold">
        <a href="/" className=" hover:opacity-80 transition-opacity">
          ishwar suthar
        </a>
        <a href="#work" className="hover:opacity-80 transition-opacity">
          work
        </a>
        <a href="#about" className="hover:opacity-80 transition-opacity">
          about me
        </a>
        <a href="#contact" className="hover:opacity-80 transition-opacity">
          start a project
        </a>
      </div>
    </nav>
  );
}
