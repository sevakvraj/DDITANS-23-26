import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import memories from '../data/memories.json';
import HeicImage from '../components/HeicImage';

const TypewriterText = ({ text, isHovered }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        staggerChildren: 0.03,
        duration: 0.5
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}
      variants={container}
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Extended 15-milestone path
  const pathD = "M200 0 C200 200 350 400 350 600 C350 800 50 1000 50 1200 C50 1400 350 1600 350 1800 C350 2000 50 2200 50 2400 C50 2600 350 2800 350 3000 C350 3200 50 3400 50 3600 C50 3800 350 4000 350 4200 C350 4400 50 4600 50 4800 C50 5000 350 5200 350 5400 C350 5600 200 5800 200 6200";

  return (
    <section id="journey" ref={containerRef} className="journey-section container" style={{ paddingTop: '180px', paddingBottom: '20rem' }}>
      <div style={{ marginBottom: '12rem', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="hero-subtitle"
        >
          // The Chronicles
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-serif"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 700 }}
        >
          The Journey: <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>2022-2026</span>
        </motion.h2>
      </div>

      <div className="wandering-path-svg">
        <svg viewBox="0 0 400 6200" fill="none" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
          <path
            d={pathD}
            stroke="rgba(255, 215, 0, 0.05)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.path
            d={pathD}
            stroke="url(#path-gradient-final)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="path-gradient-final" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--gold)" />
              <stop offset="50%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--gold)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="journey-steps">
        {memories.journey.map((item, index) => (
          <JourneyItem
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

const JourneyItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="journey-step"
      style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="path-node"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1.2, opacity: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ top: '0%' }}
      >
        <span style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: '1rem',
          color: 'var(--gold)',
          fontWeight: 900,
          fontFamily: 'Bricolage Grotesque',
          textShadow: '0 0 10px rgba(0,0,0,0.8)'
        }}>
          {item.date}
        </span>
      </motion.div>

      <div className="journey-content">
        <motion.div
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <span className="font-modern" style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.9rem', opacity: 0.6 }}>{item.year}</span>
          </div>
          <h3 className="font-serif" style={{ fontSize: '2.4rem', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 700 }}>{item.title}</h3>

          <div className="font-modern" style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '90%' }}>
            <TypewriterText text={item.description} isHovered={isHovered} />
          </div>

          <AnimatePresence>
            {!isHovered && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: '0.7rem', marginTop: '1rem', fontStyle: 'italic' }}
              >
                Hover to reveal memory...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: isEven ? 3 : -3 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="journey-image-wrapper"
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <HeicImage
            src={item.image}
            alt={item.title}
            className="feathered-mask"
          />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '40px',
            height: '40px',
            borderRight: '2px solid var(--gold)',
            borderBottom: '2px solid var(--gold)',
            opacity: 0.3
          }} />
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;
