import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addWish, subscribeToWishes } from '../firebase';
import './WishesSection.css';

const emojis = ['🎓', '🎉', '💐', '❤️', '🌟', '🎊', '💪', '🥳', '🙌', '✨', '🥦'];

export default function WishesSection() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('🎓');
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmoji, setSubmittedEmoji] = useState('🎓');

  useEffect(() => {
    const unsubscribe = subscribeToWishes(setWishes);
    return () => unsubscribe?.();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);
    await addWish({ name: name.trim(), message: message.trim(), emoji });
    setSubmittedEmoji(emoji);
    setName('');
    setMessage('');
    setEmoji('🎓');
    setSending(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5500);
  };

  return (
    <section className="section wishes-section" id="wishes" style={{ position: 'relative' }}>
      {showSuccess && (
        <div className="emoji-confetti-container">
          {[...Array(40)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 1;
            const duration = 3.5 + Math.random() * 2;
            return (
              <motion.div
                key={i}
                className="floating-emoji"
                initial={{ top: -100, x: `${randomX}vw`, opacity: 0, scale: 0.5 }}
                animate={{ 
                  top: '120%', 
                  x: `${randomX + (Math.random() * 30 - 15)}vw`,
                  opacity: [0, 1, 1, 0],
                  rotate: Math.random() * 500 - 250
                }}
                transition={{ duration, delay: randomDelay, ease: "easeOut" }}
                style={{ left: 0 }}
              >
                {submittedEmoji}
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="section-header-row" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
        <div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            💌 Gửi Lời Chúc
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Hãy gửi lời chúc đến mình nhé! Mỗi dòng chữ đều là động lực ❤️
          </motion.p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <motion.img
          src="/images/chibi/7.PNG"
          alt="Chibi bắn tim"
          className="section-chibi-side"
          style={{ width: '250px' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring' }}
        />

        <div className="wishes-container" style={{ flex: 1 }}>
        {/* Form */}
        <motion.form
          className="wish-form glass-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="wish-form-title">✍️ Viết lời chúc</h3>
          
          <div className="form-group">
            <label htmlFor="wish-name">Tên của bạn</label>
            <input
              id="wish-name"
              type="text"
              placeholder="Nhập tên của bạn..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="wish-message">Lời chúc</label>
            <textarea
              id="wish-message"
              placeholder="Viết lời chúc tốt đẹp nhất..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              maxLength={300}
            />
            <span className="char-count">{message.length}/300</span>
          </div>

          <div className="form-group">
            <label>Chọn emoji</label>
            <div className="emoji-picker">
              {emojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  className={`emoji-btn ${emoji === e ? 'active' : ''}`}
                  onClick={() => setEmoji(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-accent submit-wish-btn" disabled={sending} id="submit-wish">
            {sending ? '⏳ Đang gửi...' : '💌 Gửi lời chúc'}
          </button>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✅ Gửi lời chúc thành công! Cảm ơn bạn ❤️
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Wishes Wall */}
        <motion.div
          className="wishes-wall"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* <h3 className="wishes-wall-title">
            💬 Lời chúc ({wishes.length})
          </h3> */}
          <div className="wishes-list">
            {wishes.length === 0 ? (
              <div className="wishes-empty">
                <span>💭</span>
                <p>Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
              </div>
            ) : (
              <AnimatePresence>
                {wishes.map((wish, i) => (
                  <motion.div
                    key={wish.id || i}
                    className="wish-card"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="wish-header">
                      <span className="wish-emoji">{wish.emoji}</span>
                      <span className="wish-name">{wish.name}</span>
                      <span className="wish-time">
                        {wish.createdAt ? new Date(wish.createdAt).toLocaleDateString('vi-VN') : ''}
                      </span>
                    </div>
                    <p className="wish-message">{wish.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
