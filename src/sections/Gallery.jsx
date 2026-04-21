import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import memories from '../data/memories.json';
import HeicImage from '../components/HeicImage';
const MediaVault = () => {
  const [index, setIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const rawCategories = (memories.vault || []).map(p => p.category);
    return ['All', ...new Set(rawCategories)];
  }, []);

  const row1 = categories.slice(0, 6);
  const row2 = categories.slice(6);

  const photos = useMemo(() => {
    const vault = memories.vault || [];
    if (activeCategory === 'All') return vault;
    return vault.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const columns = useMemo(() => {
    const cols = [[], [], []];
    photos.forEach((photo, i) => {
      cols[i % 3].push(photo);
    });
    return cols;
  }, [photos]);

  return (
    <section id="vault" className="vault-section container">
      <div className="vault-bg-glow" />

      <div style={{ marginBottom: '6rem', position: 'relative', zIndex: 10 }}>
        <div className="flex-start" style={{ gap: '2rem', alignItems: 'baseline' }}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif vault-main-title"
          >
            The <span className="vault-title-accent">Archive</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="vault-batch-tag font-modern"
          >

          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="vault-description font-modern"
        >
          A cinematic collection of fleeting moments, frozen in time. Exploring 6 chapters of our history.
        </motion.p>
      </div>

      <div className="vault-filters-minimal">
        <div className="filter-row">
          {row1.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`vault-filter-btn-minimal ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
              {activeCategory === cat && <motion.div layoutId="active-dot" className="active-dot" />}
            </button>
          ))}
        </div>
        <div className="filter-row">
          {row2.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`vault-filter-btn-minimal ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
              {activeCategory === cat && <motion.div layoutId="active-dot" className="active-dot" />}
            </button>
          ))}
        </div>
      </div>

      <div className="vault-masonry-wrapper">
        <div className="vault-ordered-masonry">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="vault-column">
              <AnimatePresence mode="popLayout">
                {column.map((photo, i) => (
                  <motion.div
                    key={photo.id || photo.src}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                    className="vault-card"
                    onClick={() => setIndex(memories.vault.indexOf(photo))}
                  >
                    <div className="vault-image-wrapper">
                      <HeicImage
                        src={photo.src}
                        alt={photo.title}
                        className="vault-img"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                      <div className="vault-overlay">
                        <div className="overlay-content">
                          <div className="vault-click-hint font-modern">TAP TO VIEW</div>
                          <h4 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{photo.title}</h4>
                          <p className="font-modern" style={{ fontSize: '0.8rem', opacity: 0.8 }}>{photo.description}</p>
                          <div className="vault-category-tag">{photo.category}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        index={index}
        slides={memories.vault.map(p => ({ src: p.src, title: p.title, description: p.description }))}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </section>
  );
};

export default MediaVault;
