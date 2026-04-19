import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addRSVP, subscribeToRSVPs } from '../firebase';
import './RSVPSection.css';

export default function RSVPSection({ guestName }) {
  const [rsvps, setRsvps] = useState([]);
  const [name, setName] = useState(guestName || '');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState('');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToRSVPs(setRsvps);
    return () => unsubscribe?.();
  }, []);

  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const maybeCount = rsvps.filter(r => r.attending === 'maybe').length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !attending) return;

    setSending(true);
    await addRSVP({
      name: name.trim(),
      phone: phone.trim(),
      attending,
      note: note.trim(),
    });
    setName('');
    setPhone('');
    setAttending('');
    setNote('');
    setSending(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section className="section rsvp-section" id="rsvp">
      <div className="section-header-row">
        <div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✅ Xác Nhận Tham Dự
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Cho mình biết bạn có thể đến không nhé!
          </motion.p>
        </div>
      </div>

      <div className="rsvp-container">
        {/* Form */}
        <motion.form
          className="rsvp-form glass-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="rsvp-form-title">📝 Xác nhận</h3>

          <div className="form-group">
            <label htmlFor="rsvp-name">Tên của bạn *</label>
            <input
              id="rsvp-name"
              type="text"
              placeholder="Nhập tên..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-phone">Số điện thoại</label>
            <input
              id="rsvp-phone"
              type="tel"
              placeholder="Số điện thoại (tùy chọn)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={15}
            />
          </div>

          <div className="form-group">
            <label>Bạn sẽ tham dự? *</label>
            <div className="attending-options">
              <button
                type="button"
                className={`attend-btn attend-yes ${attending === 'yes' ? 'active' : ''}`}
                onClick={() => setAttending('yes')}
              >
                ✅ Có, mình sẽ đến!
              </button>
              <button
                type="button"
                className={`attend-btn attend-maybe ${attending === 'maybe' ? 'active' : ''}`}
                onClick={() => setAttending('maybe')}
              >
                🤔 Chưa chắc
              </button>
              <button
                type="button"
                className={`attend-btn attend-no ${attending === 'no' ? 'active' : ''}`}
                onClick={() => setAttending('no')}
              >
                😢 Không thể đến
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-note">Ghi chú</label>
            <input
              id="rsvp-note"
              type="text"
              placeholder="Ghi chú thêm (tùy chọn)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={100}
            />
          </div>

          <button type="submit" className="btn-primary submit-rsvp-btn" disabled={sending || !attending} id="submit-rsvp">
            {sending ? '⏳ Đang gửi...' : '📨 Gửi xác nhận'}
          </button>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✅ Xác nhận thành công! Cảm ơn bạn 💙
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Guest List */}
        <motion.div
          className="guest-list"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="guest-list-title">👥 Danh sách khách mời</h3>
          <div className="guest-list-items">
            {rsvps.length === 0 ? (
              <div className="guests-empty">
                <span>📋</span>
                <p>Chưa có ai xác nhận. Hãy là người đầu tiên!</p>
              </div>
            ) : (
              rsvps.map((rsvp, i) => (
                <motion.div
                  key={rsvp.id || i}
                  className={`guest-item guest-${rsvp.attending}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="guest-status">
                    {rsvp.attending === 'yes' ? '✅' : rsvp.attending === 'maybe' ? '🤔' : '😢'}
                  </span>
                  <div className="guest-info">
                    <span className="guest-name">{rsvp.name}</span>
                    {rsvp.note && <span className="guest-note">{rsvp.note}</span>}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
