import { useEffect, useRef } from 'react';

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
  const contentRef = useRef(null);

  useEffect(() => {
    // 🚨 FIX: Override overflow hidden từ index.css, #root, và .app-shell
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    const root = document.getElementById('root');
    if (root) {
      root.style.overflow = 'visible';
      root.style.height = 'auto';
    }
    // Fix parent app-shell (ứ dụng có inline overflow:hidden)
    const appShell = document.querySelector('.app-shell');
    if (appShell) {
      appShell.style.overflow = 'visible';
      appShell.style.height = 'auto';
    }

    // ---- Reveal on scroll (improved) ----
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = parseInt(e.target.dataset.revealDelay) || 0;
            setTimeout(() => {
              e.target.classList.add('in');
            }, delay);
            io.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );
    revealEls.forEach((el) => {
      if (!el.dataset.revealDelay) {
        const parent = el.parentElement;
        if (parent) {
          const idx = Array.from(parent.children).indexOf(el);
          el.dataset.revealDelay = String(Math.min(idx * 80, 400));
        }
      }
      io.observe(el);
    });

    // ---- Parallax on mouse move for glow elements ----
    const glowCyan = document.querySelector('.glow-cyan');
    const glowAmber = document.querySelector('.glow-amber');
    function onMouseMove(e) {
      const xFactor = (e.clientX / window.innerWidth - 0.5) * 2;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 2;
      if (glowCyan) {
        glowCyan.style.transform = `translate(${xFactor * 15}px, ${yFactor * 15}px)`;
      }
      if (glowAmber) {
        glowAmber.style.transform = `translate(${xFactor * -10}px, ${yFactor * -10}px)`;
      }
    }
    window.addEventListener('mousemove', onMouseMove);

    // ---- Parallax scroll on background elements ----
    const gridBg = document.querySelector('.grid-bg');
    function onScroll() {
      const scrollY = window.scrollY;
      if (gridBg) {
        gridBg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- Smooth anchor scroll ----
    function handleAnchorClick(e) {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    document.addEventListener('click', handleAnchorClick);

    // ---- Code window parallax ----
    const windowWrap = document.getElementById('codeWindowWrap');
    const codeWin = document.getElementById('codeWindow');
    let onMove, onLeave;
    if (windowWrap && codeWin) {
      onMove = (e) => {
        const rect = windowWrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        codeWin.style.transform = `rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      onLeave = () => {
        codeWin.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
      windowWrap.addEventListener('mousemove', onMove);
      windowWrap.addEventListener('mouseleave', onLeave);
    }

    return () => {
      io.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', handleAnchorClick);
      if (windowWrap && codeWin) {
        windowWrap.removeEventListener('mousemove', onMove);
        windowWrap.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <div className="landing-page" style={{ height: 'auto', minHeight: '100vh', overflow: 'visible' }}>
      <div className="grid-bg" />
      <div className="glow-cyan" />
      <div className="glow-amber" />
      <div className="glow-radial" />

      <ScrollProgress />
      <MouseGlow />
      <Particles />

      <Nav />

      <div className="content" ref={contentRef}>
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

