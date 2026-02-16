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
      </Routes>
    </Router>
  );
}
