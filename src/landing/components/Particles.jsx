import { useEffect, useRef } from 'react';

export default function Particles() {
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    const PARTICLE_COUNT = 100;
    let particles = [];
    function createParticle() {
      const p = {
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.baseSize = 1.5 + Math.random() * 2.5;
          this.size = this.baseSize;
          this.speedX = (Math.random() - 0.5) * 0.4;
          this.speedY = (Math.random() - 0.5) * 0.4;
          this.opacity = 0.3 + Math.random() * 0.4;
          this.hue = Math.random() > 0.6 ? 170 + Math.random() * 20 : 38 + Math.random() * 20;
          this.pulseSpeed = 0.02 + Math.random() * 0.03;
          this.pulseOffset = Math.random() * Math.PI * 2;
          this.life = 0;
          this.maxLife = 300 + Math.random() * 200;
        },
        update() {
          this.life++;
          if (this.life > this.maxLife) this.reset();
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150 * 2;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < -20) this.x = canvas.width + 20;
          if (this.x > canvas.width + 20) this.x = -20;
          if (this.y < -20) this.y = canvas.height + 20;
          if (this.y > canvas.height + 20) this.y = -20;
          this.size = this.baseSize + Math.sin(this.life * this.pulseSpeed + this.pulseOffset) * 0.8;
        },
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
          ctx.fill();
          if (this.size > 2) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity * 0.1})`;
            ctx.fill();
          }
        }
      };
      p.reset();
      return p;
    }
    let mouse = mouseRef.current;

    function resize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

    let animId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.12;
            const hue = (particles[i].hue + particles[j].hue) / 2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${hue}, 60%, 60%, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connection to nearby particles
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `hsla(170, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse glow
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        grad.addColorStop(0, 'hsla(170, 70%, 60%, 0.08)');
        grad.addColorStop(0.5, 'hsla(170, 70%, 60%, 0.03)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      id="particles-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}







