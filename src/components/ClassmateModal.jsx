import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { batchDetails } from '../data/batch';
import HeicImage from './HeicImage';

const ClassmateModal = ({ student, isOpen, onClose, onNext, onPrev }) => {
  const [messages, setMessages] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Roll specific details from batch.js
  const details = student ? (batchDetails[student.rollNo] || batchDetails.default) : batchDetails.default;
  const imagePath = student ? `/photos/Batch-26/R-${student.rollNo}.jpeg` : '';

  // Fetch messages from MongoDB
  const fetchMessages = async () => {
    if (!student) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/yearbook?rollNo=${student.rollNo}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch yearbook messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && student) {
      fetchMessages();
    }
  }, [isOpen, student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/yearbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNo: student.rollNo,
          author: newAuthor,
          text: newText,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        setMessages([saved, ...messages]);
        setNewText('');
        // We keep the author name for convenience
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!student) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button className="nav-arrow prev" onClick={onPrev}>
              <ChevronLeft size={32} />
            </button>
            <button className="nav-arrow next" onClick={onNext}>
              <ChevronRight size={32} />
            </button>

            <div className="modal-content">
              {/* Left Side: Photo */}
              <div className="modal-photo-side">
                <HeicImage 
                  src={imagePath} 
                  alt={student.name} 
                  className="modal-main-img"
                />
                
                <div className="photo-info-overlay">
                   <h2 className="modal-name">{student.name}</h2>
                   <div className="modal-stats font-modern uppercase">
                      <span>{details.branch || 'BCA B'}</span>
                      <span className="divider">|</span>
                      <span>{student.id}</span>
                   </div>
                </div>
              </div>

              {/* Right Side: Message Area */}
              <div className="modal-message-side">
                <div className="message-header">
                  <div className="flex-between w-full">
                    <span className="font-serif italic" style={{ fontSize: '1.4rem' }}>Messages from the Batch</span>
                    {messages.length > 0 && (
                      <span className="reply-count-tag font-modern">{messages.length} {messages.length === 1 ? 'MESSAGE' : 'MESSAGES'}</span>
                    )}
                  </div>
                </div>

                <div className="message-container scroll-custom">
                  {/* Dynamic messages list with fixed container behavior */}
                  <div className="dynamic-messages-list">
                    <AnimatePresence mode="popLayout">
                      {messages.map((msg) => (
                        <motion.div 
                          key={msg.id || msg._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="yearbook-msg-card"
                        >
                          <p className="yearbook-msg-text font-handwriting">{msg.text}</p>
                          <div className="yearbook-msg-meta">
                            <span className="msg-author">— {msg.author}</span>
                            <span className="msg-date">{new Date(msg.created_at).toLocaleDateString()}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isLoading && messages.length === 0 && (
                      <div className="loading-tiny font-modern opacity-40 text-center py-10">Fetching memories...</div>
                    )}
                    
                    {!isLoading && messages.length === 0 && (
                      <div className="empty-messages font-modern opacity-20 text-center py-10 italic">No memories here yet. Be the first to write one!</div>
                    )}
                  </div>
                </div>

                {/* Refined Dedicated Input Form */}
                <div className="yearbook-input-section">
                   <div className="input-prompt font-modern text-dim uppercase" style={{ fontSize: '0.65rem', marginBottom: '1rem', letterSpacing: '0.15em' }}>
                     Leave a legacy or a funny memory
                   </div>
                   <form onSubmit={handleSubmit} className="flex-column gap-3">
                      <div className="yearbook-input-group">
                        <input 
                          type="text" 
                          placeholder="Your Name or Nickname" 
                          className="yearbook-author-input"
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          required
                        />
                      </div>
                      <div className="relative">
                        <textarea 
                          placeholder="What's your best memory with them?..."
                          className="yearbook-textarea"
                          rows="3"
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          required
                      />
                      <button 
                        type="submit" 
                        className="yearbook-send-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                            <Send size={18} />
                          </motion.div>
                        ) : (
                          <Send size={18} />
                        )}
                      </button>
                      </div>
                   </form>
                </div>

                <div className="message-footer">
                   <div className="footer-tag">BATCH // 2026</div>
                   <div className="footer-tag">ROLL NO: {student.rollNo}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClassmateModal;
