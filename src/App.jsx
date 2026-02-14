import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects/Projects'
import AboutPreview from './components/AboutPreview'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

export default function App() {
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
