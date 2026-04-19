import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Decorative wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="footer-content">
        <motion.div
          className="footer-main"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="footer-graduation-icon">🎓</span>
          <h3 className="footer-name script-text">Lê Thị Mỹ Chi</h3>
          <p className="footer-school">Trường Đại học Công Thương TP.HCM (HUIT)</p>
          <p className="footer-major">Cử nhân Công nghệ Thông tin • Khóa 2022 - 2026</p>
        </motion.div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-quote script-text">
            "Kết thúc của hành trình này là khởi đầu của hành trình mới ✨"
          </p>
          <p className="footer-made">
            Made by Lê Thị Mỹ Chi ❤️ • © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
