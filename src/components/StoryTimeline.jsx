import { motion } from 'framer-motion';
import './StoryTimeline.css';

const milestones = [
  { year: '2022', icon: '🎒', title: 'Bắt đầu hành trình', desc: 'Nhập học ĐH Công Thương TP.HCM, ngành Công nghệ Thông tin. Mọi thứ đều mới mẻ và đầy hứng khởi!', color: '#6BAAED' },
  { year: '2023', icon: '📚', title: 'Kiến thức & Đam mê', desc: 'Đắm mình trong thế giới code, database, và networking. Những đêm thức trắng cùng assignment!', color: '#4A93DB' },
  { year: '2024', icon: '💡', title: 'Khám phá & Trưởng thành', desc: 'Tham gia dự án thực tế, cuộc thi sinh viên, và tìm ra đam mê thực sự trong lĩnh vực IT.', color: '#3B82C4' },
  { year: '2025', icon: '🚀', title: 'Bứt phá & Thực tập', desc: 'Thực tập tại doanh nghiệp, áp dụng kiến thức vào thực tế. Từ lý thuyết đến sản phẩm thực!', color: '#E74C3C' },
  { year: '2026', icon: '🎓', title: 'Tốt nghiệp!', desc: 'Hoàn thành xuất sắc 4 năm đại học! Sẵn sàng cho chặng đường mới phía trước.', color: '#F0C040' },
];

export default function StoryTimeline() {
  return (
    <section className="section story-section" id="story">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        📖 Hành Trình Của Mình
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        4 năm thanh xuân đáng nhớ tại HUIT
      </motion.p>

      <div className="timeline">
        <div className="timeline-line" />
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="timeline-dot" style={{ backgroundColor: m.color }}>
              <span>{m.icon}</span>
            </div>
            <div className="timeline-card">
              <span className="timeline-year" style={{ color: m.color }}>{m.year}</span>
              <h3 className="timeline-card-title">{m.title}</h3>
              <p className="timeline-card-desc">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
