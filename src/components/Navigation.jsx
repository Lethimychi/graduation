import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const sections = [
  { id: 'cover', icon: '🏠', label: 'Trang bìa' },
  { id: 'profile', icon: '👤', label: 'Profile' },
  { id: 'story', icon: '📖', label: 'Hành trình' },
  { id: 'gallery', icon: '📸', label: 'Gallery' },
  { id: 'event', icon: '📍', label: 'Sự kiện' },
  { id: 'wishes', icon: '💌', label: 'Lời chúc' },
  { id: 'rsvp', icon: '✅', label: 'RSVP' },
];

export default function Navigation() {
  const [active, setActive] = useState('cover');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);

      // Determine active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActive(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="side-nav"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              className={`nav-dot ${active === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
              title={s.label}
              aria-label={s.label}
            >
              <span className="nav-icon">{s.icon}</span>
              <span className="nav-label">{s.label}</span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
