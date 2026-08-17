import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { ArrowUp, Lock, Heart, Sparkles, Terminal } from 'lucide-react';
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
  github:    { icon: GithubIcon,    color: '#06B6D4' },
  linkedin:  { icon: LinkedinIcon,  color: '#0A66C2' },
  instagram: { icon: InstagramIcon, color: '#E1306C' },
  twitter:   { icon: TwitterIcon,   color: '#1D9BF0' },
};

export const Footer = () => {
  const { profile, setIsLoginModalOpen, isAdminLoggedIn, setIsAdminPanelOpen } = useProfile();

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
      <div className="container" style={{ padding: '3.5rem 1.5rem 2rem' }}>
        <div className="footer-grid">

          {/* ── Brand & Identity Column ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}>
              <div style={{
                width: '42px', height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 0 0 2px rgba(6,182,212,0.4), 0 4px 14px rgba(6,182,212,0.25)',
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
                  fontWeight: '850',
                  fontSize: '1.15rem',
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                }}>
                  {profile.name}
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-code)',
                  fontWeight: '700',
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
              maxWidth: '380px',
              marginBottom: '1.75rem',
            }}>
              Mahasiswa IT di Universitas Brawijaya yang berfokus pada arsitektur backend, basis data terstruktur, dan rekayasa sistem IoT embedded.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
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
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
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
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.background = color + '15';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 8px 18px ${color}30`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-dim)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
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
                fontSize: '0.74rem',
                fontWeight: '850',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.25rem',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map(({ label, href }) => (
                  href ? (
                    <a
                      key={label}
                      href={href}
                      style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '600',
                        transition: 'all 0.18s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--accent-cyan)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span
                      key={label}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '600',
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
          paddingTop: '1.85rem',
          borderTop: '1px solid var(--border-color)',
        }}>
          {/* Copyright */}
          <div onClick={handleSecretClick} style={{ userSelect: 'none', cursor: 'default' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
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
              fontWeight: '600',
            }}>
              Built with <Heart size={12} color="var(--accent-rose)" fill="var(--accent-rose)" />
              <span style={{
                background: 'rgba(6,182,212,0.12)',
                border: '1px solid rgba(6,182,212,0.25)',
                color: 'var(--accent-cyan)',
                padding: '0.15rem 0.55rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: '800',
                fontFamily: 'var(--font-code)',
              }}>React</span>
              <span style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.25)',
                color: 'var(--accent-amber)',
                padding: '0.15rem 0.55rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: '800',
                fontFamily: 'var(--font-code)',
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
                  fontWeight: '750',
                  color: 'var(--accent-emerald)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.3)';
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
                  fontWeight: '700',
                  color: 'var(--text-dim)',
                  background: 'var(--bg-card)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
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
                background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.25)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                padding: '0.42rem 0.95rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '750',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-cyan)';
                e.currentTarget.style.color = '#FFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(6,182,212,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
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
