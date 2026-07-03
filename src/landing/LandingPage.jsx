import { useEffect } from 'react';

import ScrollProgress from './components/ScrollProgress';
import MouseGlow from './components/MouseGlow';
import Particles from './components/Particles';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Divider from './components/Divider';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import RankSystem from './components/RankSystem';
import Comparison from './components/Comparison';
import UseCases from './components/UseCases';
import TechStack from './components/TechStack';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';

export default function LandingPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const windowWrap = document.getElementById('codeWindowWrap');
    const codeWin = document.getElementById('codeWindow');
    if (windowWrap && codeWin) {
      function onMove(e) {
        const rect = windowWrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        codeWin.style.transform = `rotateX(${(y - 0.5) * -6}deg) rotateY(${(x - 0.5) * 6}deg)`;
      }
      function onLeave() {
        codeWin.style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
      windowWrap.addEventListener('mousemove', onMove);
      windowWrap.addEventListener('mouseleave', onLeave);
      return () => {
        windowWrap.removeEventListener('mousemove', onMove);
        windowWrap.removeEventListener('mouseleave', onLeave);
        io.disconnect();
      };
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <div className="grid-bg" />
      <div className="glow-cyan" />
      <div className="glow-amber" />

      <ScrollProgress />
      <MouseGlow />
      <Particles />

      <Nav />

      <div className="content">
        <Hero />
        <ProblemSolution />
        <Divider />
        <Features />
        <Divider />
        <HowItWorks />
        <Divider />
        <RankSystem />
        <Divider />
        <Comparison />
        <Divider />
        <UseCases />
        <Divider />
        <TechStack />
        <FinalCta />
      </div>

      <Footer />
    </div>
  );
}
