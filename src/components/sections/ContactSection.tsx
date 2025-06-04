'use client';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { FaEnvelope, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { SiQiita } from 'react-icons/si';

export default function ContactSection() {
  return (
    <SectionHeading
      title="Contact"
      subtitle="お気軽にご連絡ください"
      id="contact"
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="glass-card p-8 neon-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/miruky"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-dark-600 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                  <FaGithub className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-accent-cyan transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-semibold dark:text-white text-slate-900">
                    GitHub
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    @miruky
                  </div>
                </div>
              </a>

              <a
                href="https://qiita.com/miruky"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-dark-600 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                  <SiQiita className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-accent-cyan transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-semibold dark:text-white text-slate-900">
                    Qiita
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    @miruky
                  </div>
                </div>
              </a>

              <a
                href="https://x.com/miruky_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-dark-600 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                  <FaXTwitter className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-accent-cyan transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-semibold dark:text-white text-slate-900">
                    X (Twitter)
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    @miruky_tech
                  </div>
                </div>
              </a>

              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-dark-600 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                  <FaEnvelope className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-accent-cyan transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-semibold dark:text-white text-slate-900">
                    Zenn
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Coming Soon
                  </div>
                </div>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionHeading>
  );
}
