import React, { useEffect } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Toast } from './components/Toast';
import { SideRails } from './components/SideRails';

const MainContent = () => {
  const { setIsLoginModalOpen, isAdminLoggedIn, setIsAdminPanelOpen, showToast } = useProfile();

  // Keyboard shortcut listener for Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen(true);
        } else {
          setIsLoginModalOpen(true);
          showToast('Shortcut Rahasia Dideteksi! Membuka Modal Login Admin.', 'info');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn, setIsLoginModalOpen, setIsAdminPanelOpen, showToast]);

  // Scroll Animation Fallback using Intersection Observer
  useEffect(() => {
    const supportsScrollTimeline = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
    
    if (!supportsScrollTimeline) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Navbar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Certificates />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />

      {/* Desktop Side Margin Anchors */}
      <SideRails />

      {/* Admin Modals & Notifications */}
      <AdminLoginModal />
      <AdminPanelModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ProfileProvider>
      <MainContent />
    </ProfileProvider>
  );
}
