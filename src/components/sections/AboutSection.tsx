'use client';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';

export default function AboutSection() {
  return (
    <SectionHeading
      title="About"
      subtitle="AWS Engineer &amp; Tech Writer"
      id="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Profile Image / Avatar */}
        <ScrollReveal direction="left">
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden neon-border">
                <div className="w-full h-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center">
                  <img
                    src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3637204/profile-images/1774445070"
                    alt="miruky"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-cyan/20 rounded-lg rotate-12 animate-float" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-accent-purple/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                普段はAWSを使用したクラウドインフラの設計・構築〜運用・保守の業務を行っています。
                また、QiitaにてAWS・AIを中心とした技術記事を投稿しています。
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                25卒の新卒エンジニアとして入社後、約6ヶ月で<span className="text-accent-cyan font-semibold">AWS認定全12資格（全冠）</span>を取得。
                その後もIPA資格やLPIC-3を取得し、技術の幅を広げています。
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Qiitaでは<span className="text-accent-cyan font-semibold">49本以上</span>の技術記事を投稿し、
                最高<span className="text-accent-cyan font-semibold">363いいね</span>を獲得。
                クラウドインフラ・AI・セキュリティを中心に発信しています。
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '所在地', value: 'Japan' },
                { label: '業務', value: 'Cloud Infra' },
                { label: '主要技術', value: 'AWS / Python' },
                { label: '趣味', value: '技術記事執筆' },
              ].map((info) => (
                <div
                  key={info.label}
                  className="glass-card p-3 text-center hover-card"
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {info.label}
                  </div>
                  <div className="text-sm font-semibold dark:text-white text-slate-900">
                    {info.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionHeading>
  );
}
