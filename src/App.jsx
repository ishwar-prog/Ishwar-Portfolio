import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects/Projects'
import AboutPreview from './components/AboutPreview'

export default function App() {
  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <AboutPreview />
    </main>
  );
}
