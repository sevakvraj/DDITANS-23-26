import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import NavBar from './components/NavBar';
import MobileNavBar from './sections/Mobile_Responsive/MobileNavBar';
import Hero from './sections/Hero';
import Timeline from './sections/Timeline';
import Gallery from './sections/Gallery';
import Yearbook from './sections/Yearbook';
import ReflectionWall from './sections/ReflectionWall';
import InteractiveBackground from './components/InteractiveBackground';
import { Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
  return (
    <SmoothScroll>
      <div className="relative overflow-hidden" style={{ background: '#000' }}>
        <CustomCursor />
        <div className="nav-vignette" />
        <NavBar />
        <MobileNavBar />
        
        <main className="main-content-wrapper" style={{ minHeight: '80vh', position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/journey" element={<Timeline />} />
            <Route path="/vault" element={<Gallery />} />
            <Route path="/yearbook" element={<Yearbook />} />
            <Route path="/wall" element={<ReflectionWall />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <div className="global-blend-bottom" />
          

        </main>

        <footer className="footer-cinematic">
          <div className="footer-divider-container">
            <div className="footer-line" />
            <div className="footer-icon-wrapper">
              <Globe size={18} strokeWidth={1} className="globe-icon-svg" />
            </div>
            <div className="footer-line" />
          </div>
          
          <div className="footer-content">
            <p className="footer-archive-text font-modern uppercase">
              Digitally Archived for the Batch of 2026 • DDU University
            </p>
            <p className="footer-memory-text">
              © 2026 Batch. All memories preserved forever.
            </p>
            <p className="footer-credit-text">
              Crafted by <span className="gold-shimmer-text">Sevak Vraj</span>
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}



export default App;
