import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, GraduationCap, Map, MessageSquare, BookOpen, Home } from 'lucide-react';

const MobileNavBar = () => {
  const navItems = [
    { 
      name: 'Home', 
      icon: <Home size={22} />, 
      path: '/',
      color: '#FF3B30' // Vibrant Red
    },
    { 
      name: 'Journey', 
      icon: <Map size={22} />, 
      path: '/journey',
      color: '#007AFF' // Vibrant Blue
    },
    { 
      name: 'Vault', 
      icon: <Camera size={22} />, 
      path: '/vault',
      color: '#FF9500' // Vibrant Orange
    },
    { 
      name: 'Yearbook', 
      icon: <BookOpen size={22} />, 
      path: '/yearbook',
      color: '#34C759' // Vibrant Green
    },
    { 
      name: 'Wall', 
      icon: <MessageSquare size={22} />, 
      path: '/wall',
      color: '#AF52DE' // Vibrant Purple
    },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="mobile-nav-container"
    >
      <div className="mobile-nav-content">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <div className="nav-item-wrapper" style={{ color: isActive ? item.color : 'var(--text-dim)' }}>
                <motion.div 
                  className="nav-icon-wrapper"
                  whileTap={{ scale: 0.8 }}
                  animate={{ 
                    scale: isActive ? 1.2 : 1,
                    y: isActive ? -5 : 0 
                  }}
                >
                  {item.icon}
                </motion.div>
                <span className="nav-label">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="active-indicator"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      <style>{`
        .mobile-nav-container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background: rgba(10, 10, 15, 0.45);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding-bottom: env(safe-area-inset-bottom);
        }

        @media (max-width: 768px) {
          .mobile-nav-container {
            display: flex;
          }
        }

        .mobile-nav-content {
          width: 100%;
          max-width: 500px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 1rem;
        }

        .mobile-nav-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-item-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: color 0.3s ease;
        }

        .nav-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-label {
          font-size: 0.65rem;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.8;
        }

        .active-indicator {
          position: absolute;
          bottom: -12px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }

        .mobile-nav-link.active .nav-label {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
};

export default MobileNavBar;
