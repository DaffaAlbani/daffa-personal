import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Lock, Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { 
    profile, 
    isAdminLoggedIn, 
    hideLoginButton, 
    setIsLoginModalOpen, 
    setIsAdminPanelOpen, 
    logoutAdmin 
  } = useProfile();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      transition: 'all 0.3s ease',
      background: scrolled ? 'var(--bg-card)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      padding: scrolled ? '0.8rem 0' : '1.2rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontWeight: '800',
            fontSize: '1.2rem'
          }}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <span style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {profile.name}
            </span>
            {isAdminLoggedIn && (
              <span style={{
                display: 'block',
                fontSize: '0.65rem',
                color: 'var(--accent-emerald)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                ● Admin Mode
              </span>
            )}
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <a href="#about" style={navLinkStyle}>Tentang</a>
          <a href="#projects" style={navLinkStyle}>Portofolio</a>
          <a href="#certificates" style={navLinkStyle}>Sertifikat</a>
          <a href="#experience" style={navLinkStyle}>Pengalaman</a>
          <a href="#contact" style={navLinkStyle}>Kontak</a>
        </nav>

        {/* Actions & Theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={toggleTheme} 
            title="Ganti Tema Dark/Light"
            aria-label="Toggle theme"
            className="btn-secondary"
            style={{ padding: '0.55rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6366F1" />}
          </button>

          {/* Admin Controls */}
          {isAdminLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => setIsAdminPanelOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Settings size={15} /> Panel Admin
              </button>
              <button 
                onClick={logoutAdmin}
                className="btn btn-danger btn-sm"
                title="Keluar Admin"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            !hideLoginButton && (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="btn btn-secondary btn-sm"
              >
                <Lock size={14} /> Admin Login
              </button>
            )
          )}

          {/* Mobile menu trigger */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'var(--bg-main)',
        borderBottom: mobileMenuOpen ? '1px solid var(--border-color)' : 'none',
        padding: mobileMenuOpen ? '1.5rem' : '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxHeight: mobileMenuOpen ? '400px' : '0',
        opacity: mobileMenuOpen ? 1 : 0,
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: mobileMenuOpen ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : 'none',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
        <a href="#about" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Tentang Saya</a>
        <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Portofolio</a>
        <a href="#certificates" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Sertifikat & Kompetensi</a>
        <a href="#experience" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Pengalaman</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Hubungi Saya</a>
      </div>
    </header>
  );
};

const navLinkStyle = {
  color: 'var(--text-muted)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: '500',
  transition: 'color 0.2s ease',
};

const mobileNavLinkStyle = {
  color: 'var(--text-main)',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: '600',
  padding: '0.5rem 0'
};
