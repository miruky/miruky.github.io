'use client';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { certifications } from '@/data/certifications';

const levelStyle = (level?: string) => {
  switch (level) {
    case 'professional':
      return {
        gradient: 'from-amber-400/20 to-yellow-500/20',
        border: 'border-amber-400/20 group-hover:border-amber-400/40',
        text: 'text-amber-400',
        label: 'Professional',
      };
    case 'associate':
      return {
        gradient: 'from-cyan-400/20 to-blue-500/20',
        border: 'border-cyan-400/20 group-hover:border-cyan-400/40',
        text: 'text-cyan-400',
        label: 'Associate',
      };
    case 'specialty':
      return {
        gradient: 'from-violet-400/20 to-purple-500/20',
        border: 'border-violet-400/20 group-hover:border-violet-400/40',
        text: 'text-violet-400',
        label: 'Specialty',
      };
    case 'foundational':
      return {
        gradient: 'from-emerald-400/20 to-green-500/20',
        border: 'border-emerald-400/20 group-hover:border-emerald-400/40',
        text: 'text-emerald-400',
        label: 'Foundational',
      };
    default:
      return {
        gradient: 'from-accent-purple/20 to-accent-pink/20',
        border: 'border-accent-purple/20 group-hover:border-accent-purple/40',
        text: 'text-accent-purple',
        label: '',
      };
  }
};

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
        {awsCerts.map((cert, index) => {
          const style = levelStyle(cert.level);
          return (
            <ScrollReveal key={cert.name} delay={index * 0.03}>
              <div className="glass-card p-4 hover-card text-center group">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-20 h-20 mx-auto mb-3 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center border ${style.border} transition-colors`}
                  >
                    <span className={`text-xs font-bold font-mono ${style.text}`}>
                      {cert.badge}
                    </span>
                  </div>
                )}
                <div className="text-xs font-medium dark:text-white text-slate-900 leading-tight">
                  {cert.name.replace('AWS Certified ', '').replace(' - ', '\n')}
                </div>
                {style.label && (
                  <div className={`text-[10px] mt-1 ${style.text} opacity-70`}>
                    {style.label}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Other Certifications */}
      <ScrollReveal>
        <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-6 text-center">
          その他の資格
        </h3>
      </ScrollReveal>
      <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
        {otherCerts.map((cert, index) => (
          <ScrollReveal key={cert.name} delay={index * 0.05}>
            <div className="glass-card p-4 hover-card text-center h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center border border-accent-purple/20">
                <span className="text-xs font-bold font-mono text-accent-purple">
                  {cert.badge}
                </span>
              </div>
              <div className="text-xs font-medium dark:text-white text-slate-900 leading-tight text-center">
                {cert.name}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionHeading>
  );
}
