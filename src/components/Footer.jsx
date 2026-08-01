import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { ArrowUp, Lock, ShieldAlert } from 'lucide-react';

export const Footer = () => {
  const { profile, hideLoginButton, setIsLoginModalOpen, isAdminLoggedIn } = useProfile();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretClick = (e) => {
    // Secret double click trigger to open admin login
    if (e.detail === 2) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <footer style={{
      background: 'rgba(11, 15, 25, 0.95)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0 2rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
              {profile.name}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {profile.title}
            </p>
          </div>

          {/* Secret hint notification if login button is hidden */}
          {hideLoginButton && !isAdminLoggedIn && (
            <div 
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                border: '1px dashed var(--border-color)',
                cursor: 'pointer'
              }}
              title="Klik di sini atau tekan Ctrl+Shift+A untuk Login Admin"
            >
              <Lock size={12} />
              <span>Akses Admin Rahasia (Ctrl+Shift+A / Klik 2x Logo)</span>
            </div>
          )}

          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="btn btn-secondary btn-sm"
            title="Kembali ke atas"
          >
            <ArrowUp size={16} /> Ke Atas
          </button>
        </div>

        {/* Copyright notice with secret double click */}
        <div 
          onClick={handleSecretClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-dim)',
            userSelect: 'none'
          }}
        >
          <span>
            © {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.
          </span>
          <span style={{ fontSize: '0.75rem' }}>
            Built with React & Vite
          </span>
        </div>
      </div>
    </footer>
  );
};
