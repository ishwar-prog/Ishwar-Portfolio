import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects/Projects";
import AboutPreview from "./components/AboutPreview";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import AboutMe from "./pages/About-Me/About-Me";
import SelectedWork from "./pages/work/selected-work";

// Project pages
import WorkStreamora from "./pages/work/work-streamora";
import WorkGsap from "./pages/work/work-gsap";
import WorkReboxed from "./pages/work/work-reboxed";
import WorkDisasterIQ from "./pages/work/work-disasteriq";
import WorkJellmo from "./pages/work/work-jellmo";
import WorkRedux from "./pages/work/work-redux";

function Home() {
  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <AboutPreview />
      <CallToAction />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/work" element={<SelectedWork />} />
        
        {/* Project routes */}
        <Route path="/projects/streamora" element={<WorkStreamora />} />
        <Route path="/projects/vibelab" element={<WorkGsap />} />
        <Route path="/projects/reboxed" element={<WorkReboxed />} />
        <Route path="/projects/disasteriq" element={<WorkDisasterIQ />} />
        <Route path="/projects/jellmo" element={<WorkJellmo />} />
        <Route path="/projects/redux" element={<WorkRedux />} />
      </Routes>
    </Router>
  );
}
