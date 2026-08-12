import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { ArrowUp, Lock, Heart, Code2, Zap, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

const NAV_COLUMNS = [
  {
    title: 'Navigasi',
    links: [
      { label: 'Tentang Saya', href: '#about' },
      { label: 'Portofolio', href: '#projects' },
      { label: 'Sertifikat', href: '#certificates' },
      { label: 'Pengalaman', href: '#experience' },
      { label: 'Kontak', href: '#contact' },
    ],
  },
  {
    title: 'Spesialisasi',
    links: [
      { label: 'Backend & Laravel' },
      { label: 'MySQL & Database' },
      { label: 'IoT & ESP32' },
      { label: 'Cybersecurity' },
    ],
  },
];

const SOCIAL_MAP = {
  github:    { icon: GithubIcon,    color: '#e6edf3' },
  linkedin:  { icon: LinkedinIcon,  color: '#0A66C2' },
  instagram: { icon: InstagramIcon, color: '#E1306C' },
  twitter:   { icon: TwitterIcon,   color: '#1D9BF0' },
};

export const Footer = () => {
  const { profile, hideLoginButton, setIsLoginModalOpen, isAdminLoggedIn } = useProfile();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSecretClick = (e) => {
    if (e.detail === 2) setIsLoginModalOpen(true);
  };

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      position: 'relative',
      zIndex: 10,
      transition: 'background var(--transition-normal)',
    }}>
      {/* Top gradient accent line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-indigo), var(--accent-purple), transparent)',
      }} />

      {/* Main Footer Grid */}
      <div className="container" style={{ padding: '3.5rem 1.75rem 2rem' }}>
        <div className="footer-grid">

          {/* ── Brand & Identity Column ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
              <div style={{
                width: '42px', height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 0 0 2px rgba(56,189,248,0.4), 0 4px 14px rgba(56,189,248,0.25)',
                border: '2px solid var(--accent-cyan)',
                background: 'var(--bg-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  onError={e => { e.target.onerror = null; e.target.src = '/avatar-default.png'; }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800',
                  fontSize: '1.15rem',
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                }}>
                  {profile.name}
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                }}>
                  BACKEND & IOT DEVELOPER
                </div>
              </div>
            </div>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: '1.75',
              maxWidth: '360px',
              marginBottom: '1.75rem',
            }}>
              Mahasiswa IT di Universitas Brawijaya yang berfokus pada arsitektur backend, basis data terstruktur, dan rekayasa sistem IoT embedded.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {profile.socials && Object.entries(SOCIAL_MAP).map(([key, { icon: Icon, color }]) => {
                if (!profile.socials[key]) return null;
                return (
                  <a
                    key={key}
                    href={profile.socials[key]}
                    target="_blank"
                    rel="noreferrer"
                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '9px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-dim)',
                      textDecoration: 'none',
                      transition: 'all 0.22s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = color + '50';
                      e.currentTarget.style.background = color + '12';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-dim)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Nav & Specialization Columns ── */}
          {NAV_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                fontWeight: '800',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.15rem',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {links.map(({ label, href }) => (
                  href ? (
                    <a
                      key={label}
                      href={href}
                      style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '500',
                        transition: 'color 0.18s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {label}
                    </a>
                  ) : (
                    <span
                      key={label}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '500',
                      }}
                    >
                      {label}
                    </span>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '1.75rem',
          borderTop: '1px solid var(--border-color)',
        }}>
          {/* Copyright */}
          <div onClick={handleSecretClick} style={{ userSelect: 'none', cursor: 'default' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {/* Built with tech stack badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '500',
            }}>
              Built with <Heart size={12} color="var(--accent-rose)" fill="var(--accent-rose)" />
              <span style={{
                background: 'rgba(56,189,248,0.12)',
                border: '1px solid rgba(56,189,248,0.2)',
                color: 'var(--accent-cyan)',
                padding: '0.12rem 0.5rem',
                borderRadius: '5px',
                fontSize: '0.72rem',
                fontWeight: '700',
              }}>React</span>
              <span style={{
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.2)',
                color: 'var(--accent-amber)',
                padding: '0.12rem 0.5rem',
                borderRadius: '5px',
                fontSize: '0.72rem',
                fontWeight: '700',
              }}>Vite</span>
            </div>

            {/* Footer Admin Trigger */}
            {isAdminLoggedIn ? (
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                title="Buka Panel Admin"
                aria-label="Buka Panel Admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'var(--accent-emerald)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '0.32rem 0.8rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Sparkles size={12} /> Panel Admin
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                title="Portal Login Admin (Atau tekan Ctrl+Shift+A)"
                aria-label="Portal Login Admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: 'var(--text-dim)',
                  background: 'var(--bg-card)',
                  padding: '0.28rem 0.72rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-dim)';
                }}
              >
                <Lock size={11} /> Admin
              </button>
            )}

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas halaman"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.25)',
                borderRadius: '9999px',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                padding: '0.42rem 0.95rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-cyan)';
                e.currentTarget.style.color = '#FFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(56,189,248,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(56,189,248,0.08)';
                e.currentTarget.style.color = 'var(--accent-cyan)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
              title="Kembali ke atas"
            >
              <ArrowUp size={14} /> Kembali ke Atas
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
