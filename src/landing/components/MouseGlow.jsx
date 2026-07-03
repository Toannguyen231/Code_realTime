import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const glow = document.getElementById('mouseGlow');
    function onMove(e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div className="mouse-glow" id="mouseGlow" />;
}
