import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scrollProgress');
    function onScroll() {
      const max = document.body.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${scrollY / max})`;
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" id="scrollProgress" />;
}
