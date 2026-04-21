import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { batchDetails } from '../data/batch';
import HeicImage from './HeicImage';

const ClassmateModal = ({ student, isOpen, onClose, onNext, onPrev }) => {
  if (!student) return null;

  const details = batchDetails[student.rollNo] || batchDetails.default;
  const imagePath = `/photos/Batch-26/R-${student.rollNo}.jpeg`;

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
                   <div className="modal-stats">
                      <span>{details.branch || 'BCA B'}</span>
                      <span className="divider">|</span>
                      <span>{student.id}</span>
                   </div>
                </div>
              </div>

              {/* Right Side: Message Area */}
              <div className="modal-message-side">
                <div className="message-header">
                  <div className="flex-between">
                    <span className="font-serif">Messages from the Batch</span>
                  </div>
                </div>

                <div className="message-container scroll-custom">
                  {/* Main Personal Note ONLY */}
                  <div className="main-note-section">
                    <p className="note-text">"{details.note}"</p>
                    {details.caption && (
                      <div className="caption-tag">
                          # {details.caption}
                      </div>
                    )}
                  </div>
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
