export default function Footer() {
  return (
    <footer className="font-normal text-[#f6f4f0] px-6 md:px-12 pt-12 pb-6">
      <div className="max-w-[92rem] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-2 text-sm md:text-xl ">
            <p className="hover:text-white/40">
              email:{" "}
              <a
                href="mailto:ishwar16suthar@gmail.com"
                className="hover:text-white/40 transition-colors"
              >
                ishwar16suthar@gmail.com
              </a>
            </p>

            <p>based in: mumbai, india</p>
            <p>available:freelance projects & internships</p>

            <p className="hover:text-white/40">
              github:
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                ishwar-prog
              </a>
            </p>
          </div>

          {/* Right Column - Pages & Socials */}
          <div className="flex gap-16 text-sm md:text-xl">
            {/* Pages */}
            <div className="flex flex-col gap-1">
              <p className="text-white/65 mb-1 text-lg">pages</p>
              <a href="#" className="hover:text-white/40 transition-colors font-semibold">
                home
              </a>
              <a
                href="#about"
                className="hover:text-white/40 transition-colors font-semibold"
              >
                about
              </a>
              <a href="#work" className="hover:text-white/40 transition-colors font-semibold  ">
                work
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-1">
              <p className="text-white/65 mb-1 text-lg">socials</p>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors font-semibold"
              >
                instagram
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors font-semibold"
              >
                x(twitter)
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors font-semibold"
              >
                linkedin
              </a>
            </div>
          </div>
        </div>

        {/* Large Name */}
        <div className="mt-12 md:mt-11">
          <h2 className="text-[20vw] md:text-[16rem] font-extrabold leading-none tracking-tighter text-center md:text-left">
            ishwar suthar
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center font-medium mt-6 pt-6 border-t border-white/10  text-white/70">
          <p>© 2026 ishwarsuthar. all rights reserved</p>
          <p className="mt-2 md:mt-0">never give up</p>
        </div>
      </div>
    </footer>
  );
}
