import React, { lazy, Suspense } from "react";
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

// Lazy-loaded page routes — only downloaded when the user navigates there
const AboutMe = lazy(() => import("./pages/About-Me/About-Me"));
const SelectedWork = lazy(() => import("./pages/work/selected-work"));
const WorkStreamora = lazy(() => import("./pages/work/work-streamora"));
const WorkGsap = lazy(() => import("./pages/work/work-gsap"));
const WorkMediaSearch = lazy(() => import("./pages/work/work-mediasearch"));
const WorkReboxed = lazy(() => import("./pages/work/work-reboxed"));
const WorkDisasterIQ = lazy(() => import("./pages/work/work-disasteriq"));
const WorkJellmo = lazy(() => import("./pages/work/work-jellmo"));

function Home() {
  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full">
      <Navbar />
      <Hero />
      <Projects />
      <AboutPreview />
      <TechStack />
      <CallToAction />
      <Footer />
    </main>
  );
}

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <div id="ishwar-app-content">
        <Router>
          <TransitionWrapper>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/work" element={<SelectedWork />} />

                {/* Project routes */}
                <Route path="/projects/streamora" element={<WorkStreamora />} />
                <Route path="/projects/vibelab" element={<WorkGsap />} />
                <Route path="/projects/mediasearch" element={<WorkMediaSearch />} />
                <Route path="/projects/reboxed" element={<WorkReboxed />} />
                <Route path="/projects/disasteriq" element={<WorkDisasterIQ />} />
                <Route path="/projects/jellmo" element={<WorkJellmo />} />
              </Routes>
            </Suspense>
          </TransitionWrapper>
        </Router>
        </div>
    </>
  );
}
