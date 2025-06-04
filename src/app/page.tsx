import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CareerSection from '@/components/sections/CareerSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import QiitaSection from '@/components/sections/QiitaSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CareerSection />
      <CertificationsSection />
      <ProjectsSection />
      <QiitaSection />
      <ContactSection />
    </>
  );
}
