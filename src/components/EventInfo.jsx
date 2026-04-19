import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './EventInfo.css';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      {[
        { value: timeLeft.days, label: 'Ngày' },
        { value: timeLeft.hours, label: 'Giờ' },
        { value: timeLeft.minutes, label: 'Phút' },
        { value: timeLeft.seconds, label: 'Giây' },
      ].map((item, i) => (
        <div key={i} className="countdown-item">
          <motion.span
            className="countdown-number"
            key={item.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(item.value).padStart(2, '0')}
          </motion.span>
          <span className="countdown-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function EventInfo({ guestName }) {
  const eventDate = '2026-04-23T14:30:00+07:00';
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Lễ Tốt Nghiệp - Lê Thị Mỹ Chi')}&dates=20260423T073000Z/20260423T083000Z&details=${encodeURIComponent('Lễ tốt nghiệp Đại học Công Thương TP.HCM')}&location=${encodeURIComponent('140 Lê Trọng Tấn, Tây Thạnh, TP.HCM')}`;
  const mapUrl = 'https://maps.google.com/maps?q=140+Le+Trong+Tan,+Tay+Thanh,+Ho+Chi+Minh+City&output=embed';

  return (
    <section className="section event-section" id="event">
      <div className="section-header-row" style={{ alignItems: 'flex-start' }}>
        <motion.img
          src="/images/chibi/13.PNG"
          alt="Chibi giới thiệu"
          className="section-chibi-side section-chibi-event"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, type: 'spring' }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '0.5rem' }}
          >
            📍 Thông Tin Sự Kiện
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: guestName ? '1rem' : '2rem' }}
          >
            {guestName 
              ? `${guestName} ơi, đừng quên ngày này nhé!`
              : 'Đếm ngược đến ngày trọng đại'}
          </motion.p>

          {guestName && (
            <motion.div
              className="event-personal-invite"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              style={{ width: '100%', marginBottom: '2rem' }}
            >
              <p className="invite-quote script-text">
                "{guestName} ơi, sự hiện diện của bạn sẽ là món quà ý nghĩa nhất với mình. Mong được gặp bạn tại buổi lễ!" 💙
              </p>
              <p className="invite-from">— Mỹ Chi</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >
            <CountdownTimer targetDate={eventDate} />
          </motion.div>
        </div>
      </div>

      <div className="event-cards">
        <motion.div
          className="event-card glass-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="event-card-icon">📅</div>
          <h3>Thời gian</h3>
          <p className="event-detail-main">Thứ Năm, 23/04/2026</p>
          <p className="event-detail-sub">14:30 - 15:30</p>
        </motion.div>

        <motion.div
          className="event-card glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="event-card-icon">📍</div>
          <h3>Địa điểm</h3>
          <p className="event-detail-main">ĐH Công Thương TP.HCM</p>
          <p className="event-detail-sub">140 Lê Trọng Tấn, Tây Thạnh, TP.HCM</p>
        </motion.div>

        <motion.div
          className="event-card glass-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="event-card-icon">📞</div>
          <h3>Liên hệ</h3>
          <p className="event-detail-main">0347 790 574</p>
          <p className="event-detail-sub">Ms. Mỹ Chi</p>
        </motion.div>
      </div>

      <motion.div
        className="event-actions"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" id="add-to-calendar">
          📅 Thêm vào Google Calendar
        </a>
      </motion.div>

      <motion.div
        className="event-map"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '16px' }}
          allowFullScreen
          loading="lazy"
          title="Google Maps"
        />
      </motion.div>
    </section>
  );
}
