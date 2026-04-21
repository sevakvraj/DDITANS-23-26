import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import classmates from '../data/classmates.json';
import ClassmateModal from '../components/ClassmateModal';

const Yearbook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClassmates = classmates.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.rollNo.toString().includes(searchTerm);
    return matchesSearch;
  });

  const handleOpenModal = (index) => {
    setSelectedIdx(index);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % filteredClassmates.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + filteredClassmates.length) % filteredClassmates.length);
  };

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <section id="yearbook" className="section container" style={{ paddingTop: '180px' }}>
      <div className="yearbook-header">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="hero-subtitle"
        >
          // The Vault
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-funky"
          style={{ fontSize: '3.5rem', fontWeight: 800 }}
        >
          Batch of <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>'26</span>
        </motion.h2>
      </div>

      {/* Simplified Search - No Filters */}
      <div className="search-container" style={{ marginBottom: '5rem' }}>
        <Search
          size={20}
          style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}
        />
        <input
          type="text"
          placeholder="Find a classmate..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <motion.div layout className="yearbook-grid">
        <AnimatePresence mode='popLayout'>
          {filteredClassmates.map((person, idx) => (
            <ClassmateCard
              key={person.rollNo}
              person={person}
              initials={getInitials(person.name)}
              index={idx}
              onClick={() => handleOpenModal(idx)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ClassmateModal
        student={selectedIdx !== null ? filteredClassmates[selectedIdx] : null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};

const ClassmateCard = ({ person, initials, onClick }) => {
  const colorClass = person.rollNo % 3 === 0 ? '' : (person.rollNo % 3 === 1 ? 'alt-1' : 'alt-2');

  // FIXED CASING: /photos/ instead of /Photos/
  const imagePath = `/photos/Batch-26/R-${person.rollNo}.jpeg`;
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="classmate-card"
      onClick={onClick}
    >
      <div className="glass-card" style={{ padding: '0.8rem', position: 'relative' }}>
        <div className={`initials-avatar ${colorClass}`}>
          {!imgError ? (
            <img
              src={imagePath}
              alt={person.name}
              className="classmate-img"
              onError={() => setImgError(true)}
            />
          ) : (
            initials
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 'inherit'
            }}
          >
            <div style={{ border: '1px solid var(--gold)', padding: '0.4rem 0.8rem', color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Open View
            </div>
          </motion.div>
        </div>

        <div className="classmate-info">
          <h4 className="classmate-name">{person.name}</h4>
          <div className="flex-between">
            <span className="classmate-sub">Class // 6-B</span>
            <span className="id-tag">{person.id}</span>
          </div>
          <p className="classmate-sub" style={{ opacity: 0.5, fontSize: '0.6rem', marginTop: '0.5rem' }}>Roll No: {person.rollNo}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Yearbook;
