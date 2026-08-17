import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about',        label: 'Tentang' },
  { href: '#projects',     label: 'Portofolio' },
  { href: '#certificates', label: 'Sertifikat' },
  { href: '#experience',   label: 'Pengalaman' },
  { href: '#contact',      label: 'Kontak' },
];

export const Navbar = () => {
  const {
    profile,
    isAdminLoggedIn,
    setIsAdminPanelOpen,
    logoutAdmin,
  } = useProfile();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Active section detection ── */
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'certificates', 'experience', 'contact'];
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(prev => prev === 'dark' ? 'light' : 'dark'),
    []
  );

  const isActive = (href) => activeSection === href.replace('#', '');

  return (
    <header style={{
      position: 'fixed',
      top: scrolled ? '0.75rem' : '1.25rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(1120px, calc(100% - 2rem))',
      zIndex: 900,
      transition: 'all 0.25s ease',
      background: scrolled
        ? 'var(--nav-scrolled-bg)'
        : 'var(--nav-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-full)',
      boxShadow: scrolled
        ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
        : '0 4px 15px -5px rgba(0, 0, 0, 0.2)',
      padding: '0.45rem 1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

        {/* ── Brand Unit ── */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
          }}>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              onError={e => { e.target.onerror = null; e.target.src = '/avatar-default.png'; }}
            />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '750',
              fontSize: '0.95rem',
              color: 'var(--text-main)',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
              display: 'block',
            }}>
              {profile.name}
            </span>
          </div>
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <a
                key={href}
                href={href}
                style={{
                  color: active ? 'var(--text-main)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: active ? '650' : '500',
                  fontFamily: 'var(--font-heading)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all 0.15s ease',
                  background: active ? 'var(--bg-surface)' : 'transparent',
                  border: active ? '1px solid var(--border-color)' : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-main)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* ── Actions Unit ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
            aria-label={theme === 'dark' ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-main)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {theme === 'dark'
              ? <Sun size={15} />
              : <Moon size={15} />
            }
          </button>

          {/* Admin Controls */}
          {isAdminLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button onClick={() => setIsAdminPanelOpen(true)} className="btn btn-primary btn-sm">
                <Settings size={13} /> Panel
              </button>
              <button onClick={logoutAdmin} className="btn btn-danger btn-sm" title="Keluar Admin" aria-label="Keluar dari mode admin">
                <LogOut size={13} />
              </button>
            </div>
          )}

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu navigasi"
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '0.45rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div style={{
        position: 'absolute',
        top: 'calc(100% + 0.6rem)',
        left: 0,
        right: 0,
        background: 'var(--nav-scrolled-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        padding: mobileMenuOpen ? '1rem 1.25rem' : '0 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        maxHeight: mobileMenuOpen ? '380px' : '0',
        opacity: mobileMenuOpen ? 1 : 0,
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        boxShadow: mobileMenuOpen ? '0 18px 40px -10px rgba(0,0,0,0.6)' : 'none',
      }}>
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive(href) ? 'var(--text-main)' : 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.94rem',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              padding: '0.65rem 0',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {label}
            {isActive(href) && (
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--text-main)',
              }} />
            )}
          </a>
        ))}
      </div>
    </header>
  );
};
