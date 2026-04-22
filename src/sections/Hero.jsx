import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import memories from '../data/memories.json';

const Hero = () => {
  const navigate = useNavigate();
  const containerVariants = {
// ... existing variants
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } },
  };

  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '180px', paddingBottom: '100px' }}>
      {/* Personalized Background & Smooth Blend */}
      <div className="hero-bg-personalized" />
      <video 
        className="hero-video-mobile"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/photos/hero_section/Mobile_View.mp4" type="video/mp4" />
      </video>
      <div className="hero-blend-overlay" />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 2rem' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '900px' }}
        >
          <motion.p variants={itemVariants} className="hero-subtitle">
            DDU {memories.hero.subtitle}
          </motion.p>

          {/* Overlapping Text Design */}
          <div style={{ position: 'relative' }}>
            <motion.h1 variants={itemVariants} className="hero-title font-funky">
              Batch of <br />
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Legends</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="overlap-text font-modern"
              style={{
                fontSize: '1rem',
                color: 'var(--text-dim)',
                opacity: 0.6,
                letterSpacing: '0.8em',
                textTransform: 'uppercase'
              }}
            >
              
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            style={{
              width: '80px',
              height: '3px',
              background: 'var(--gold)',
              margin: '2rem 0',
              borderRadius: '2px',
              opacity: 0.8
            }}
          />

          <motion.p
            variants={itemVariants}
            style={{
              maxWidth: '500px',
              fontSize: '1.2rem',
              color: '#fff',
              lineHeight: '1.6',
              fontWeight: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {memories.hero.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{ marginTop: '3rem' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, gap: '1.5rem' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--gold)',
                color: '#000',
                border: 'none',
                padding: '1.1rem 2.2rem',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
              }}
              className="font-modern uppercase"
              onClick={() => navigate('/journey')}
            >
              Start Journey
              <ArrowRight size={20} /> {/* Lucide Icon fixed the arrow issue */}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Styled Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '3rem', right: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transform: 'rotate(90deg)', transformOrigin: 'right bottom' }}
      >
        <span className="font-modern uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#fff' }}>
          
        </span>
        
      </motion.div>
    </section>
  );
};

export default Hero;
