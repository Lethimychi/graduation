import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CoverPage.css';

export default function CoverPage({ onOpen, guestName }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    onOpen?.();
  };

  return (
    <section className="cover-section" id="cover">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            fontSize: `${8 + Math.random() * 16}px`,
            opacity: 0.3 + Math.random() * 0.4,
          }}>
            {['🎓', '✨', '⭐', '🎉', '💐', '🌸'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ===== TEASER - Fullscreen gate ===== */}
        {!opened && (
          <motion.div
            key="teaser"
            className="teaser-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <div className="teaser-right" style={{ alignItems: 'center' }}>
              <motion.div
                className="teaser-speech-bubble"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="teaser-welcome-title script-text">
                  {guestName ? `Chào mừng ${guestName}!` : 'Chào mừng bạn!'}
                </h1>
              </motion.div>

              <motion.div
                className="teaser-content-box"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="teaser-date-badge">
                           <b>14:30 ~ 15:30</b>
                  <span className="teaser-date-day">23</span>
                  <span className="teaser-date-month">Tháng 4</span>
                  <span className="teaser-date-year">2026</span>
         
                </div>

                <h1 className="teaser-title">
                  Có một sự kiện đặc biệt<br />sắp diễn ra...
                </h1>

                <p className="teaser-subtitle" style={{fontSize: '20px' }}>
                  {guestName 
                    ? `${guestName} ơi, bạn được mời tham dự!` 
                    : 'Bạn được mời tham dự!'}
                </p>

                <div className="teaser-hints">
                  <span className="hint-item">🏫 Một nơi quen thuộc</span>
                  <span className="hint-item">🎉 Một cột mốc quan trọng</span>
                  <span className="hint-item">💙 Một khoảnh khắc đáng nhớ</span>
                </div>

                <button
                  className="teaser-btn"
                  onClick={handleOpen}
                >
                  🔓 Khám phá ngay
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ===== REVEALED - Split Layout (stays as hero section) ===== */}
        {opened && (
          <motion.div
            key="reveal"
            className="reveal-split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Confetti burst on reveal */}
            <div className="confetti-burst">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  '--x': `${(Math.random() - 0.5) * 500}px`,
                  '--y': `${-Math.random() * 400 - 100}px`,
                  '--r': `${Math.random() * 720 - 360}deg`,
                  backgroundColor: ['#6BAAED', '#E74C3C', '#F0C040', '#A8D4FF', '#FF6B6B'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 0.3}s`,
                }} />
              ))}
            </div>

            {/* Left - Invitation Card */}
            <motion.div
              className="reveal-card"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="reveal-card-inner">
                <div className="reveal-card-top-deco">
                  <div className="deco-line" />
                  <span className="deco-star">✦</span>
                  <div className="deco-line" />
                </div>

                <div className="reveal-card-logo">🎓</div>
                <h1 className="reveal-card-title">Graduation Invitation</h1>
                <div className="reveal-card-divider"></div>
                <h2 className="reveal-card-name script-text">Lê Thị Mỹ Chi</h2>
                <p className="reveal-card-school">Trường Đại học Công Thương TP.HCM</p>
                <p className="reveal-card-major">Ngành Công nghệ Thông tin</p>
                
                <div className="reveal-card-bottom-deco">
                  <div className="deco-line" />
                  <span className="deco-star">✦</span>
                  <div className="deco-line" />
                </div>
              </div>
            </motion.div>

            {/* Right - Personal Message */}
            <motion.div
              className="reveal-info"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {guestName && (
                <motion.div
                  className="reveal-guest-tag"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  💌 Gửi đến <strong>{guestName}</strong>
                </motion.div>
              )}

              <h2 className="reveal-heading script-text">
                Mình sắp tốt nghiệp rồi! 🎉
              </h2>

              <p className="reveal-message">
                {guestName 
                  ? `Hey ${guestName}! Mình vui lắm vì cuối cùng cũng đến ngày này. 4 năm đại học trôi nhanh thật — và mình muốn chia sẻ khoảnh khắc đặc biệt này cùng bạn.`
                  : 'Sau 4 năm nỗ lực, cuối cùng mình cũng đến đích rồi! Mình rất muốn chia sẻ khoảnh khắc đặc biệt này cùng bạn.'}
              </p>

              <p className="reveal-hope">
                {guestName
                  ? `${guestName} đến được thì vui lắm nè! Mong gặp bạn 💙`
                  : 'Đến chung vui với mình nha! 💙'}
              </p>

              <motion.div
                className="scroll-hint"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span>Cuộn xuống để xem thêm ↓</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
