import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const glow = document.getElementById('mouseGlow');
    const glow2 = document.getElementById('mouseGlow2');
    let rafId;

    function onMove(e) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        if (glow2) {
          glow2.style.left = e.clientX + 'px';
          glow2.style.top = e.clientY + 'px';
        }
      });
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="mouse-glow" id="mouseGlow" />
      <div className="mouse-glow-2" id="mouseGlow2" />
    </>
  );
}
