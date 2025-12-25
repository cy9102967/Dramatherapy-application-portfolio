import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Calendar, Tag } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-black relative">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:hidden" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-theater-gold border border-theater-gold/30 rounded-full mb-3 uppercase">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{project.title}</h2>
            <div className="flex items-center text-gray-400 text-sm space-x-2">
              <Calendar size={14} />
              <span>{project.year}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed text-lg">
              {project.details}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProjectModal;