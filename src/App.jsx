import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects/Projects'

export default function App() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Projects />
    </main>
  );
}
