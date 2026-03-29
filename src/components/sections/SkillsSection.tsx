'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { skillCategories, getBadgeUrl } from '@/data/skills';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);

  const currentCategory = skillCategories.find(
    (cat) => cat.name === activeCategory
  );

  return (
    <SectionHeading
      title="Skills"
      subtitle="技術スタックと習熟度"
      id="skills"
      className="bg-slate-50 dark:bg-dark-950 relative"
    >
      {/* Mascot - questioning */}
      <div className="absolute -top-4 right-4 md:right-12 lg:right-20 hidden md:block pointer-events-none z-10">
        <div className="mascot-float">
          <img
            src="/images/mascot/mascot-question.png"
            alt=""
            className="w-20 lg:w-24 h-auto drop-shadow-md opacity-80"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg shadow-accent-cyan/20'
                  : 'bg-white dark:bg-dark-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-600 border border-slate-200 dark:border-transparent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Skills Grid */}
      {currentCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {currentCategory.skills.map((skill, index) => {
            const badgeUrl = getBadgeUrl(skill.name);
            return (
              <ScrollReveal key={skill.name} delay={index * 0.05}>
                <div className="glass-card p-4 hover-card border border-slate-200/60 dark:border-transparent">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {badgeUrl ? (
                        <img
                          src={badgeUrl}
                          alt={skill.name}
                          className="h-5 flex-shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm font-medium text-slate-800 dark:text-white">
                          {skill.name}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-cyan-700 dark:text-accent-cyan font-mono font-semibold ml-2 flex-shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: index * 0.05,
                        ease: 'easeOut',
                      }}
                      className="skill-bar-fill"
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </SectionHeading>
  );
}
