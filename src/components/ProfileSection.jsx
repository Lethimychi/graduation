import { motion } from 'framer-motion';
import './ProfileSection.css';

export default function ProfileSection() {
  return (
    <section className="section profile-section" id="profile">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Instagram-style card */}
        <div className="insta-card">
          <div className="insta-header">
            <div className="insta-avatar-wrapper">
              <img src="/images/graduation-portrait.png" alt="Avatar" className="insta-avatar" />
            </div>
            <div className="insta-user-info">
              <span className="insta-username">_bescheese_</span>
              <span className="insta-badge">✓</span>
            </div>
            <button className="insta-follow-btn">Follow</button>
          </div>

          <div className="insta-image-wrapper">
            <img src="/images/graduation-portrait.png" alt="Graduation" className="insta-image" />
          </div>

          <div className="insta-actions">
            <div className="insta-actions-left">
              <button className="insta-action-btn">❤️</button>
              <button className="insta-action-btn">💬</button>
              <button className="insta-action-btn">📤</button>
            </div>
            <button className="insta-action-btn">🔖</button>
          </div>

          <div className="insta-likes">
            <span>2,026</span> lượt thích
          </div>

          <div className="insta-caption">
            <span className="insta-username-sm">_bescheese_</span>{' '}
            Hôm nay là ngày mình chính thức tốt nghiệp! 🎓✨ 4 năm thanh xuân, cuối cùng cũng đã đến đích. Cảm ơn mọi người đã luôn bên mình! 💙
            <span className="insta-hashtags">
              {' '}#graduation #HUIT #CNTT #classof2026 #proudgraduate
            </span>
          </div>
        </div>

        {/* Right Column: Profile Info + 4 Story Images */}
        <div className="profile-right-column">
          <motion.div
            className="profile-info-card glass-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="profile-info-header">
              <h2 className="script-text">Lê Thị Mỹ Chi</h2>
              <p className="profile-tagline">Future IT Professional 💻</p>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">4</span>
                <span className="stat-label">Năm</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Kỷ niệm</span>
              </div>
              <div className="stat">
                <span className="stat-number">1</span>
                <span className="stat-label">Ước mơ</span>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-icon">🏫</span>
                <div>
                  <p className="detail-label">Trường</p>
                  <p className="detail-value">ĐH Công Thương TP.HCM (HUIT)</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💻</span>
                <div>
                  <p className="detail-label">Ngành</p>
                  <p className="detail-value">Công nghệ Thông tin</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <div>
                  <p className="detail-label">Khóa</p>
                  <p className="detail-value">2022 - 2026</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <p className="detail-label">Thành phố</p>
                  <p className="detail-value">Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="profile-gallery-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {[
              { src: '/images/story1/2.PNG' },
              { src: '/images/story1/3.PNG' },
              { src: '/images/story1/4.PNG' },
              { src: '/images/story1/Gemini_Generated_Image_ay3y02ay3y02ay3y.PNG' }
            ].map((item, index) => (
              <div key={index} className="profile-gallery-item">
                <img src={item.src} alt={`Story ${index + 1}`} />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
