import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import memories from '../data/memories.json';
import InteractiveBackground from '../components/InteractiveBackground';

const PostItCard = ({ note, index }) => {
  const colors = ['yellow', 'blue', 'pink', 'cream', 'green'];
  const color = colors[index % colors.length];

  // Anti-gravity animation with random tilt
  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [index % 2 === 0 ? -1.5 : 1.5, index % 2 === 0 ? 1.5 : -1.5, index % 2 === 0 ? -1.5 : 1.5],
      transition: {
        duration: 4 + (index % 3),
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={floatVariants}
      animate="animate"
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      className={`post-it ${color} font-handwriting`}
    >
      <div className="washi-tape" />
      
      <p className="post-it-message">
        "{note.message}"
      </p>
      
      <div className="post-it-author">
        — {note.author}
      </div>
    </motion.div>
  );
};

const ReflectionWall = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Load notes from memories and localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('batch26_highlights') || '[]');
    const initialNotes = [...memories.wall, ...savedNotes];
    setNotes(initialNotes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newNote = {
      id: Date.now(),
      author: newName,
      message: newMessage,
      date: new Date().toISOString()
    };

    const updatedLocalStorage = [...JSON.parse(localStorage.getItem('batch26_highlights') || '[]'), newNote];
    localStorage.setItem('batch26_highlights', JSON.stringify(updatedLocalStorage));

    setNotes([...notes, newNote]);
    setNewName('');
    setNewMessage('');
  };

  return (
    <section id="wall" className="wall-section section-padding" style={{ paddingTop: '180px' }}>
      <div className="noise-overlay" />
      <InteractiveBackground />
      
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: '1rem' }}
          >
            <span className="vault-category-tag">💛 Final Goodbyes</span>
          </motion.div>
          
          <h2 className="h2-section font-modern bold text-white">
            Wall of Reflection
          </h2>
          <p className="vault-description font-modern mx-auto" style={{ maxWidth: '600px', opacity: 0.7 }}>
            A space for the Batch of '26 to leave their legacies, final wishes, and fleeting thoughts.
          </p>
        </div>

        <div className="post-it-container">
          <AnimatePresence>
            {notes.map((note, index) => (
              <PostItCard key={note.id || index} note={note} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Improved Post Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="reflection-form-container"
        >
          <div className="text-center mb-10">
            <h3 className="font-serif italic" style={{ fontSize: '2.2rem', color: 'var(--gold)' }}>Leave a Legacy</h3>
            <p className="font-modern text-dim" style={{ fontSize: '0.9rem', letterSpacing: '0.1em' }}>SHARE YOUR FINAL WORDS WITH THE CLASS</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-column gap-6">
            <div className="flex-column" style={{ gap: '0.5rem' }}>
              <label className="font-modern uppercase bold" style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.2em', marginLeft: '0.5rem' }}>Your Identity</label>
              <input 
                type="text"
                placeholder="Name or Anonymous"
                className="reflection-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>

            <div className="flex-column" style={{ gap: '0.5rem' }}>
              <label className="font-modern uppercase bold" style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.2em', marginLeft: '0.5rem' }}>Your Message</label>
              <textarea 
                placeholder="What's on your mind?..."
                className="reflection-input"
                rows="4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
                style={{ resize: 'none' }}
              />
            </div>

            <button type="submit" className="reflection-submit">
              Pin to Wall
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReflectionWall;
