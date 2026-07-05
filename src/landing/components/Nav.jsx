import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { href: '#problem', label: 'Vấn đề' },
  { href: '#features', label: 'Tính năng' },
  { href: '#rank', label: 'Rank' },
  { href: '#compare', label: 'So sánh' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);

      // Detect active section
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="logo">
        &lt;Codexa/&gt;
        <span className="logo-dot" />
      </div>
      <div className="links">
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            className={'navlink' + (activeSection === l.href.slice(1) ? ' active' : '')}
            href={l.href}
          >
            {l.label}
          </a>
        ))}
        <a
          className="btn btn-ghost"
          href="https://github.com/Toannguyen231/Codexa"
          target="_blank"
          rel="noopener"
        >
          <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          GitHub
        </a>
        <Link className="btn btn-primary" to="/login">
          Dùng thử miễn phí
        </Link>
      </div>
    </nav>
  );
}
