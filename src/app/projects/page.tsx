'use client';

import { projects } from '@/data/projects';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-4">
            Projects
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            個人開発プロジェクト &amp; OSS
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover-card neon-border group"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold dark:text-white text-slate-900 group-hover:text-accent-cyan transition-colors">
                  {project.name}
                </h2>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-accent-cyan transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-accent-cyan transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mb-4 space-y-2">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-2 text-xs"
                  >
                    <FaStar className="w-3 h-3 text-accent-cyan shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-dark-600">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag-pill text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/miruky"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <FaGithub className="w-4 h-4" />
            View All Repositories
          </a>
        </div>
      </div>
    </div>
  );
}
