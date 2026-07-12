import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLenis } from "./lib/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects/Projects";
import AboutPreview from "./components/AboutPreview";
import TechStack from "./components/TechStack";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import TransitionWrapper from "./components/ui/TransitionWrapper";
import LoadingScreen from "./components/ui/LoadingScreen";
import CustomCursor from "./components/ui/CustomCursor";
import SnowParticles from "./components/ui/SnowParticles";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Lazy-loaded page routes — only downloaded when the user navigates there
const AboutMe = lazy(() => import("./pages/About-Me/About-Me"));
const SelectedWork = lazy(() => import("./pages/work/selected-work"));
const WorkStreamora = lazy(() => import("./pages/work/work-streamora"));
const WorkGsap = lazy(() => import("./pages/work/work-gsap"));
const WorkGullyculture = lazy(() => import("./pages/work/work-gullyculture"));
const WorkReboxed = lazy(() => import("./pages/work/work-reboxed"));
const WorkChronotask = lazy(() => import("./pages/work/work-chronotask"));
const WorkDocsync = lazy(() => import("./pages/work/work-docsync"));

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <Hero />
      
      <section className="w-full flex justify-center items-center py-12 px-4 md:px-8 overflow-hidden">
        <a 
          href="https://github.com/ishwar-prog" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block transition-transform hover:scale-[1.01] duration-300 max-w-full"
          title="Visit my GitHub profile"
        >
          <div style={{ color: "#f8f9fa", overflowX: "auto", maxWidth: "100%", WebkitOverflowScrolling: "touch" }} className="scrollbar-hide py-4">
            <div style={{ minWidth: "max-content", paddingBottom: "4px" }}>
              <GitHubCalendar
                username="ishwar-prog"
                hideTotalCount={isMobile}
                theme={{
                  dark: ["#2d2b45", "#3d368d", "#4d45c0", "#5c54f9", "#8d88fa"],
                }}
                colorScheme="dark"
                renderBlock={(block, activity) =>
                  React.cloneElement(block, {
                    "data-tooltip-id": "react-tooltip",
                    "data-tooltip-html": `${activity.count} contributions on ${activity.date}`,
                  })
                }
              />
              <ReactTooltip id="react-tooltip" variant="dark" />
            </div>
          </div>
        </a>
      </section>

      <Projects />
      <AboutPreview />
      <TechStack />
      <CallToAction />
      <Footer />
    </main>
  );
}

function AppRoutes({ location }) {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0a0a0a]" />}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/work" element={<SelectedWork />} />

        {/* Project routes */}
        <Route path="/projects/streamora" element={<WorkStreamora />} />
        <Route path="/projects/vibelab" element={<WorkGsap />} />
        <Route path="/projects/gullyculture" element={<WorkGullyculture />} />
        <Route path="/projects/reboxed" element={<WorkReboxed />} />
        <Route path="/projects/chronotask" element={<WorkChronotask />} />
        <Route path="/projects/docsync" element={<WorkDocsync />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <div id="ishwar-app-content" className="app-bg relative">
        <SnowParticles
          shape="Star"
          particleCount={400}
          minSize={3}
          maxSize={5}
          speed={0.5}
          wind={0.2}
          minOpacity={0.2}
          maxOpacity={0.8}
          color="#e0e0e0"
        />
        <Router>
          <TransitionWrapper>
            {(location) => <AppRoutes location={location} />}
          </TransitionWrapper>
        </Router>
      </div>
    </>
  );
}
