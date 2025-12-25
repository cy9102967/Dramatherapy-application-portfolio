import React, { useState, useEffect } from 'react';
import { projects } from './data';
import { Project, Position } from './types';
import FlashlightOverlay from './components/FlashlightOverlay';
import ProjectModal from './components/ProjectModal';
import VideoSection from './components/VideoSection';
import { MousePointer2, Info } from 'lucide-react';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState<Position>({ x: -500, y: -500 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate initial load for fade-in effect
    setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Define irregular positions for the 7 items to orbit the center on desktop
  // Using percentages to be responsive within the container
  // Define irregular positions for the 7 items to orbit the center on desktop
  // Using percentages to be responsive within the container
  const desktopPositions = [
    "top-[2%] left-[5%]",        // 1. Top Left
    "top-[2%] right-[5%]",       // 2. Top Right
    "top-[38%] right-[-5%]",     // 3. Right Middle - Pushed further out
    "bottom-[2%] right-[5%]",    // 4. Bottom Right
    "bottom-[0%] left-[50%] -translate-x-1/2", // 5. Bottom Center
    "bottom-[2%] left-[5%]",     // 6. Bottom Left
    "top-[38%] left-[-5%]"       // 7. Left Middle - Pushed further out
  ];

  return (
    <div className="relative min-h-screen bg-theater-black text-white font-sans selection:bg-theater-gold selection:text-black overflow-x-hidden">

      {/* The Flashlight Effect Layer (z-30) */}
      <FlashlightOverlay x={mousePos.x} y={mousePos.y} isHovering={isHovering} />

      {/* Main Content Layer */}
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center py-10 md:py-0 overflow-x-hidden">

        {/* Mobile Instruction Hint */}
        <div className="absolute top-6 left-0 right-0 flex justify-center md:hidden z-50 animate-pulse text-gray-500">
          <span className="flex items-center text-xs uppercase tracking-widest gap-2">
            <MousePointer2 size={12} /> Tap to explore
          </span>
        </div>

        {/* --- DESKTOP VIEW: ORBIT LAYOUT --- */}
        <div className="hidden md:block relative w-full max-w-7xl h-[850px]">

          {/* Center Stage: The Name */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center w-full max-w-lg">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 blur-[90px] rounded-full pointer-events-none" />

            <div className={`transition-all duration-1000 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <h1 className="text-7xl font-serif text-white font-bold tracking-tighter mb-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                Yujun Shiao
              </h1>
              <p className="text-theater-gold text-lg uppercase tracking-[0.2em] font-light">
                Dramatherapy application portfolio
              </p>
            </div>
          </div>

          {/* Orbiting Projects */}
          {projects.map((project, idx) => (
            <div
              key={project.id}
              // CRITICAL FIX: hover:z-25 ensures it stays ABOVE other projects (z-20) but BELOW the flashlight overlay (z-30).
              className={`absolute z-20 group cursor-pointer transition-all duration-700 hover:z-25 ${desktopPositions[idx] || "top-0 left-0"}`}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Smooth transitions for scale and filters */}
              {/* 1.5x size: w-64 -> w-96, h-44 -> h-[16.5rem] */}
              <div className="relative w-96 h-[16.5rem] overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 shadow-2xl grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  // Smooth opacity transition synced with the parent
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                  <p className="text-theater-gold text-[10px] font-bold tracking-widest uppercase mb-1">{project.category}</p>
                  <p className="text-white text-sm font-serif leading-tight">{project.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MOBILE VIEW: STACK LAYOUT --- */}
        <div className="md:hidden flex flex-col items-center gap-12 w-full px-4 pt-20 pb-32 relative z-20">
          {/* Name Block for Mobile */}
          <div className="text-center mb-8 z-40 relative">
            <h1 className="text-5xl font-serif text-white font-bold tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Yujun Shiao
            </h1>
            <p className="text-theater-gold text-sm uppercase tracking-[0.2em] font-light">
              Dramatherapy application portfolio
            </p>
          </div>

          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative cursor-pointer w-full max-w-sm"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative w-full h-56 overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 shadow-lg">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-theater-gold text-xs font-bold tracking-widest uppercase">{project.category}</p>
                  <p className="text-white text-lg font-serif">{project.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <VideoSection />

        <footer className="w-full text-center text-gray-700 text-[10px] tracking-widest uppercase py-8 z-50">
          &copy; 2024 Yujun Shiao
        </footer>

      </main>

      {/* Modal Layer */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default App;