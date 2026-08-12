import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Lock, Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-react';

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
    hideLoginButton,
    setIsLoginModalOpen,
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
    const handleScroll = () => setScrolled(window.scrollY > 30);
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
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
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
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      background: scrolled
        ? 'var(--nav-scrolled-bg)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled
        ? '1px solid var(--nav-scrolled-border)'
        : '1px solid transparent',
      padding: scrolled ? '0.75rem 0' : '1.15rem 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* ── Brand ── */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 0 0 2px rgba(56,189,248,0.4), 0 4px 14px rgba(56,189,248,0.25)',
            border: '2px solid var(--accent-cyan)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
              fontWeight: '800',
              fontSize: '1.1rem',
              color: 'var(--text-main)',
              letterSpacing: '-0.025em',
              display: 'block',
            }}>
              {profile.name}
            </span>
            {isAdminLoggedIn ? (
              <span style={{
                display: 'block',
                fontSize: '0.6rem',
                color: 'var(--accent-emerald)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                ● Admin Mode
              </span>
            ) : (
              <span style={{
                display: 'block',
                fontSize: '0.6rem',
                color: 'var(--text-dim)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {profile.title?.split(' ').slice(0, 3).join(' ')}
              </span>
            )}
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <a
                key={href}
                href={href}
                style={{
                  position: 'relative',
                  color: active ? 'var(--text-main)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: active ? '600' : '500',
                  fontFamily: 'var(--font-heading)',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.color = 'var(--text-main)';
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {label}
                {/* Animated underline */}
                <span style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '50%',
                  transform: active ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                  transformOrigin: 'center',
                  width: '60%',
                  height: '2px',
                  background: 'var(--gradient-brand-h)',
                  borderRadius: '9999px',
                  transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                  display: 'block',
                }} />
              </a>
            );
          })}
        </nav>

        {/* ── Actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
            aria-label={theme === 'dark' ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {theme === 'dark'
              ? <Sun size={16} color="var(--accent-amber)" style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: 'rotate(0deg) scale(1)' }} />
              : <Moon size={16} color="var(--accent-indigo)" style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: 'rotate(180deg) scale(1)' }} />
            }
          </button>

          {/* Admin Controls */}
          {isAdminLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <button onClick={() => setIsAdminPanelOpen(true)} className="btn btn-primary btn-sm">
                <Settings size={14} /> Panel
              </button>
              <button onClick={logoutAdmin} className="btn btn-danger btn-sm" title="Keluar Admin" aria-label="Keluar dari mode admin">
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            !hideLoginButton && (
              <button onClick={() => setIsLoginModalOpen(true)} className="btn btn-secondary btn-sm" aria-label="Buka modal login admin">
                <Lock size={13} /> Admin
              </button>
            )
          )}

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu navigasi"
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '0.4rem',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'rgba(6, 10, 18, 0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: mobileMenuOpen ? '1px solid var(--border-color)' : 'none',
        padding: mobileMenuOpen ? '1.25rem 1.75rem' : '0 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        maxHeight: mobileMenuOpen ? '420px' : '0',
        opacity: mobileMenuOpen ? 1 : 0,
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: mobileMenuOpen ? '0 24px 40px -8px rgba(0,0,0,0.6)' : 'none',
      }}>
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive(href) ? 'var(--accent-indigo)' : 'var(--text-main)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              padding: '0.75rem 0',
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
                background: 'var(--accent-indigo)',
              }} />
            )}
          </a>
        ))}
      </div>
    </header>
  );
};
