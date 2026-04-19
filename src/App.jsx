import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CoverPage from './components/CoverPage';
import ProfileSection from './components/ProfileSection';
import StoryTimeline from './components/StoryTimeline';
import Gallery from './components/Gallery';
import EventInfo from './components/EventInfo';
import WishesSection from './components/WishesSection';
import RSVPSection from './components/RSVPSection';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  // Extract guest name from URL parameter: ?to=TenNguoiMoi
  const guestName = (() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('to');
    return name ? decodeURIComponent(name) : null;
  })();

  return (
    <div className="app">
      <CoverPage onOpen={() => setIsOpened(true)} guestName={guestName} />

      {/* All sections appear immediately after clicking "Khám phá" */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ProfileSection />
          <StoryTimeline />
          <Gallery />
          <EventInfo guestName={guestName} />
          <WishesSection />
          <RSVPSection guestName={guestName} />
          <Footer />
          <Navigation />
        </motion.div>
      )}
    </div>
  );
}
