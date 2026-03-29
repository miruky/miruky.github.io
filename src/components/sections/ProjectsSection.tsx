'use client';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { projects } from '@/data/projects';
import { FaGithub, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';

export default function ProjectsSection() {
  return (
    <SectionHeading
      title="Projects"
      subtitle="GitHub ポートフォリオ"
      id="projects"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ScrollReveal key={project.name} delay={index * 0.1}>
            <div className="glass-card p-6 hover-card neon-border h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-cyan-600 dark:text-accent-cyan"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-accent-cyan transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1 mb-4">
                {project.highlights.slice(0, 3).map((highlight) => (
                  <li
                    key={highlight}
                    className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-cyan-600 dark:text-accent-cyan mt-0.5">&#9654;</span>
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag-pill text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* View All Link */}
      <ScrollReveal delay={0.3}>
        <div className="text-center mt-12">
          <Link
            href="/projects/"
            className="btn-outline inline-flex items-center gap-2"
          >
            View All Projects
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </ScrollReveal>
    </SectionHeading>
  );
}
