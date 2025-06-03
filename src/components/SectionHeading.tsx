'use client';

import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  children,
  id,
  className = '',
}: Props) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full" />
        </div>
        {children}
      </div>
    </section>
  );
}
