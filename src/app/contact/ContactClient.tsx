'use client';

import { siteConfig } from '@/data/config';
import { FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiQiita, SiZenn } from 'react-icons/si';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    href: `https://github.com/${siteConfig.githubUsername}`,
    color: 'hover:text-white',
    description: 'ソースコード・OSS',
  },
  {
    name: 'Qiita',
    icon: SiQiita,
    href: `https://qiita.com/${siteConfig.qiitaUserId}`,
    color: 'hover:text-[#55C500]',
    description: '技術記事・アウトプット',
  },
  {
    name: 'X (Twitter)',
    icon: FaXTwitter,
    href: siteConfig.twitterUrl || '#',
    color: 'hover:text-white',
    description: '日常・技術のつぶやき',
  },
  {
    name: 'Zenn',
    icon: SiZenn,
    href: 'https://zenn.dev/miruky',
    color: 'hover:text-[#3EA8FF]',
    description: '技術記事・知見の共有',
  },
];

export default function ContactClient() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-4">
              Contact
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              お気軽にご連絡ください
            </p>
          </motion.div>

          {/* Social Links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 hover-card neon-border group flex items-center gap-4 ${
                  link.href === '#' ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-dark-700 flex items-center justify-center text-slate-400 ${link.color} transition-colors group-hover:scale-110 transform duration-300`}
                >
                  <link.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold dark:text-white text-slate-900 text-sm group-hover:text-cyan-700 dark:group-hover:text-accent-cyan transition-colors">
                    {link.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {link.description}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8"
          >
            <FaPaperPlane className="w-8 h-8 text-accent-cyan mx-auto mb-4" />
            <h2 className="text-lg font-bold dark:text-white text-slate-900 mb-2">
              Get In Touch
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              技術的なディスカッションやコラボレーションに興味があります。
              <br />
              GitHub や X を通じてお気軽にお声がけください。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
