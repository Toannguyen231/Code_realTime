import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let rafId;

    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - innerHeight;
        const progress = Math.min(Math.max(scrollY / max, 0), 1);
        bar.style.transform = `scaleX(${progress})`;
        bar.style.opacity = progress > 0.02 ? '1' : '0';
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="scroll-progress" id="scrollProgress" ref={barRef} />;
}
