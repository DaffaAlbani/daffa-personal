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
      top: scrolled ? '0.75rem' : '1.1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(1140px, calc(100% - 2rem))',
      zIndex: 900,
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      background: scrolled
        ? 'var(--nav-scrolled-bg)'
        : 'var(--nav-bg)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-full)',
      boxShadow: scrolled
        ? '0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 0 25px rgba(6, 182, 212, 0.15)'
        : '0 10px 30px -10px rgba(0, 0, 0, 0.4)',
      padding: '0.5rem 1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

        {/* ── Brand Unit ── */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 0 0 2px rgba(6, 182, 212, 0.4), 0 0 14px rgba(6, 182, 212, 0.25)',
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
              fontSize: '1.02rem',
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              display: 'block',
            }}>
              {profile.name}
            </span>
            {isAdminLoggedIn ? (
              <span style={{
                display: 'block',
                fontSize: '0.62rem',
                color: 'var(--accent-emerald)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                ● Admin Mode
              </span>
            ) : (
              <span style={{
                display: 'block',
                fontSize: '0.64rem',
                color: 'var(--accent-cyan)',
                fontWeight: '600',
                letterSpacing: '0.04em',
              }}>
                Backend & IoT Engineer
              </span>
            )}
          </div>
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <a
                key={href}
                href={href}
                style={{
                  color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: active ? '700' : '600',
                  fontFamily: 'var(--font-heading)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '9999px',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: active ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                  border: active ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid transparent',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-main)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* ── Actions Unit ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
            aria-label={theme === 'dark' ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.12)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.color = 'var(--accent-cyan)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            {theme === 'dark'
              ? <Sun size={15} color="var(--accent-amber)" />
              : <Moon size={15} color="var(--accent-cyan)" />
            }
          </button>

          {/* Admin Controls (Only when logged in) */}
          {isAdminLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <button onClick={() => setIsAdminPanelOpen(true)} className="btn btn-primary btn-sm">
                <Settings size={13} /> Panel
              </button>
              <button onClick={logoutAdmin} className="btn btn-danger btn-sm" title="Keluar Admin" aria-label="Keluar dari mode admin">
                <LogOut size={13} />
              </button>
            </div>
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
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'var(--nav-scrolled-bg)',
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
