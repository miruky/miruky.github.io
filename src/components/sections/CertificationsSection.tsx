'use client';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { certifications } from '@/data/certifications';

export default function CertificationsSection() {
  const awsCerts = certifications.filter((c) => c.issuer.includes('Amazon'));
  const otherCerts = certifications.filter((c) => !c.issuer.includes('Amazon'));

  return (
    <SectionHeading
      title="Certifications"
      subtitle="取得資格一覧"
      id="certifications"
      className="bg-slate-50 dark:bg-dark-950"
    >
      {/* AWS Certifications */}
      <ScrollReveal>
        <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-6 text-center">
          AWS認定（全冠 / 12冠）
        </h3>
      </ScrollReveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
        {awsCerts.map((cert, index) => (
          <ScrollReveal key={cert.name} delay={index * 0.03}>
            <div className="glass-card p-4 hover-card text-center group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center border border-accent-cyan/20 group-hover:border-accent-cyan/40 transition-colors">
                <span className="text-xs font-bold font-mono text-accent-cyan">
                  {cert.badge}
                </span>
              </div>
              <div className="text-xs font-medium dark:text-white text-slate-900 leading-tight">
                {cert.name.replace('AWS Certified ', '').replace(' - ', '\n')}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{cert.date}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Other Certifications */}
      <ScrollReveal>
        <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-6 text-center">
          その他の資格
        </h3>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
        {otherCerts.map((cert, index) => (
          <ScrollReveal key={cert.name} delay={index * 0.05}>
            <div className="glass-card p-4 hover-card text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center border border-accent-purple/20">
                <span className="text-xs font-bold font-mono text-accent-purple">
                  {cert.badge}
                </span>
              </div>
              <div className="text-xs font-medium dark:text-white text-slate-900 leading-tight">
                {cert.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{cert.date}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionHeading>
  );
}
