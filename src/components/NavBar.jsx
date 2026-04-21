import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, GraduationCap, Map, MessageSquare, BookOpen } from 'lucide-react';

const NavBar = () => {
  const navItems = [
    { name: 'Journey', icon: <Map size={16} />, path: '/journey' },
    { name: 'Media Vault', icon: <Camera size={16} />, path: '/vault' },
    { name: 'Yearbook', icon: <BookOpen size={16} />, path: '/yearbook' },
    { name: 'Wall', icon: <MessageSquare size={16} />, path: '/wall' },
  ];

  return (
    <div style={{ position: 'fixed', top: '1.5rem', left: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '0 2rem' }}>
      <div style={{ width: '100%', maxWidth: '1300px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand/Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-center font-funky"
            style={{ gap: '0.8rem', cursor: 'pointer' }}
          >
            <GraduationCap size={24} color="var(--gold)" className="glow-icon" />
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#fff' }}>
              Batch <span style={{ color: 'var(--gold)' }}>'26</span>
            </span>
          </motion.div>
        </Link>

        {/* Global Nav Pill */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="nav-pill"
          style={{ gap: '1.5rem', padding: '0.5rem 1.8rem' }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `nav-link-restore font-modern ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon-mobile">{item.icon}</span>
              <span className="nav-text-desktop">{item.name}</span>
            </NavLink>
          ))}
        </motion.div>

        {/* Empty space for balance on desktop */}
        <div style={{ width: '100px' }} className="hidden lg:block" />
      </div>

      <style>{`
        .nav-link-restore {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-dim);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
        }
        .nav-link-restore:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }
        .nav-link-restore.active {
          color: var(--gold);
          background: rgba(255, 215, 0, 0.1);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.05);
        }
        @media (max-width: 640px) {
          .nav-text-desktop { display: none; }
          .nav-pill { gap: 1rem; padding: 0.5rem 1rem; }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
