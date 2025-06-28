'use client';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { careerTimeline } from '@/data/career';

export default function CareerSection() {
  return (
    <SectionHeading
      title="Career"
      subtitle="エンジニアとしての歩み"
      id="career"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-cyan/0 transform md:-translate-x-1/2" />

          {careerTimeline.map((item, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent-cyan rounded-full border-2 border-dark-900 transform -translate-x-1/2 z-10 mt-6 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 ${
                    index % 2 === 0
                      ? 'md:pr-12 md:w-1/2 md:text-right'
                      : 'md:pl-12 md:w-1/2 md:ml-auto'
                  } w-full`}
                >
                  <div className="glass-card p-5 hover-card neon-border">
                    <div className="flex items-center gap-2 mb-2 justify-start">
                      <span className="text-xs font-mono text-accent-cyan">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-base font-bold dark:text-white text-slate-900 mb-2 text-left">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionHeading>
  );
}
