'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { skillCategories } from '@/data/skills';
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
      className="bg-slate-50 dark:bg-dark-950"
    >
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
                  : 'bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-600'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Skills Grid */}
      {currentCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {currentCategory.skills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 0.05}>
              <div className="glass-card p-4 hover-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium dark:text-white text-slate-900">
                    {skill.name}
                  </span>
                  <span className="text-xs text-accent-cyan font-mono">
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
          ))}
        </div>
      )}
    </SectionHeading>
  );
}
