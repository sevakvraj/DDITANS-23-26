import React, { useState, useEffect } from 'react';
import heic2any from 'heic2any';
import { motion } from 'framer-motion';

const HeicImage = ({ src, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(false);
  const isHeic = src.toLowerCase().endsWith('.heic');

  useEffect(() => {
    if (isHeic) {
      setLoading(true);
      // Encode URI to handle special characters like single quotes or spaces
      const encodedSrc = encodeURI(src);
      fetch(encodedSrc)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          return heic2any({
            blob,
            toType: 'image/jpeg',
            quality: 0.8
          });
        })
        .then((conversionResult) => {
          const result = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
          const url = URL.createObjectURL(result);
          setImgSrc(url);
          setLoading(false);
        })
        .catch((err) => {
          console.error('HEIC Conversion failed:', src, err);
          setLoading(false);
        });
    } else {
      setImgSrc(src);
    }

    return () => {
      if (imgSrc && imgSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [src, isHeic]);

  if (loading) {
    return (
      <div 
        className={`${className} shimmer-skeleton`} 
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'var(--glass-bg)',
          color: 'var(--gold)',
          fontSize: '0.6rem',
          fontWeight: 800,
          letterSpacing: '0.2em',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          minHeight: '200px' // Ensure skeleton is visible and fills the column
        }}
      >
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.05), transparent)',
            zIndex: 1
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>PROCESSING HEIC...</div>
      </div>
    );
  }

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      style={style} 
    />
  );
};

export default HeicImage;
