import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';

const Pin = () => (
  <motion.div 
    className="note-pin"
    initial={{ y: -20, opacity: 0 }}
    animate={{ 
      y: [0, -4, 0],
      rotate: [0, 3, -3, 0],
      opacity: 1
    }}
    transition={{ 
      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 0.5 }
    }}
    whileHover={{ scale: 1.2, rotate: 10 }}
  >
    <svg viewBox="0 0 100 100" className="pin-svg">
      {/* Modern Minimalist Pin */}
      <circle cx="50" cy="30" r="20" fill="#000" />
      <rect x="47" y="30" width="6" height="40" fill="#000" />
      <path d="M50 70 L50 95" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      {/* Subtle shine */}
      <circle cx="42" cy="22" r="6" fill="rgba(255,255,255,0.2)" />
    </svg>
  </motion.div>
);

const PostItCard = ({ note, index }) => {
  const colors = ['yellow', 'blue', 'pink', 'cream', 'green'];
  const color = colors[index % colors.length];

  // Random rotation for organic feel
  const [rotation] = useState(Math.random() * 6 - 3);

  return (
    <motion.div
      layout
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
      whileDrag={{ scale: 1.1, zIndex: 60 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`post-it ${color} font-handwriting`}
    >
      <Pin />
      
      <p className="post-it-message">
        "{note.message}"
      </p>
      
      <div className="post_it_footer">
        <div className="post-it-author">
          — {note.author}
        </div>
        <div className="post-it-date">
          {note.created_at ? new Date(note.created_at).toLocaleDateString() : ''}
        </div>
      </div>
    </motion.div>
  );
};

const ReflectionWall = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPinning, setIsPinning] = useState(false);

  // Load notes from MongoDB API
  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotes(data);
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim() || isPinning) return;

    setIsPinning(true);

    const newNote = {
      author: newName,
      message: newMessage,
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });

      if (res.ok) {
        const savedNote = await res.json();
        // Optimistic update
        setNotes([savedNote, ...notes]);
        setNewName('');
        setNewMessage('');
      } else {
        alert('Failed to pin your message. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Connection error. Is MongoDB Atlas set up?');
    } finally {
      setIsPinning(false);
    }
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
            A shared space for the Batch of '26 to leave their legacies, final wishes, and fleeting thoughts.
          </p>
        </div>

        {/* Global Wall Status */}
        {isLoading && (
          <div className="text-center py-20 font-modern opacity-50">
            Unrolling the wall...
          </div>
        )}

        <div className="post-it-container">
          <AnimatePresence>
            {notes.map((note, index) => (
              <PostItCard key={note.id || note._id || index} note={note} index={index} />
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
            <p className="font-modern text-dim" style={{ fontSize: '0.9rem', letterSpacing: '0.1em' }}>SHARED LIVE WITH THE ENTIRE CLASS</p>
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
                disabled={isPinning}
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
                disabled={isPinning}
                style={{ resize: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              className={`reflection-submit ${isPinning ? 'loading' : ''}`}
              disabled={isPinning}
            >
              {isPinning ? 'Pinning...' : 'Pin to Wall'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReflectionWall;
