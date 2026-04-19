import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

const photos = [
  { id: 1, src: '/images/graduation-portrait.png', alt: 'Ảnh tốt nghiệp', caption: 'Ngày tốt nghiệp 🎓' },
  { id: 2, src: '/images/campus-memories.png', alt: 'Kỷ niệm campus', caption: 'Những ngày tháng đáng nhớ 📸' },
  { id: 3, src: '/images/invitation-cover.png', alt: 'Thiệp mời', caption: 'Thiệp mời tốt nghiệp 💌' },
  
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section gallery-section" id="gallery">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        📸 Khoảnh Khắc Đáng Nhớ
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Những kỷ niệm đẹp nhất 4 năm đại học
      </motion.p>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(photo)}
          >
            <img src={photo.src} alt={photo.alt} />
            <div className="gallery-overlay">
              <span className="gallery-caption">{photo.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
              <img src={selected.src} alt={selected.alt} />
              <p className="lightbox-caption">{selected.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
