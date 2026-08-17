import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { ArrowUp, Lock, Sparkles } from 'lucide-react';
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
      { label: 'RESTful API' },
    ],
  },
];

const SOCIAL_MAP = {
  github:    { icon: GithubIcon,    name: 'GitHub' },
  linkedin:  { icon: LinkedinIcon,  name: 'LinkedIn' },
  instagram: { icon: InstagramIcon, name: 'Instagram' },
  twitter:   { icon: TwitterIcon,   name: 'Twitter' },
};

export const Footer = () => {
  const { profile, setIsLoginModalOpen, isAdminLoggedIn, setIsAdminPanelOpen } = useProfile();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSecretClick = (e) => {
    if (e.detail === 2) setIsLoginModalOpen(true);
  };

  return (
    <footer style={{
      background: 'var(--bg-main)',
      borderTop: '1px solid var(--border-color)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container" style={{ padding: '3.5rem 1.5rem 2rem' }}>
        <div className="footer-grid">

          {/* ── Brand Column ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '32px', height: '32px',
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
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '750',
                fontSize: '1rem',
                color: 'var(--text-main)',
              }}>
                {profile.name}
              </div>
            </div>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              lineHeight: '1.65',
              maxWidth: '360px',
              marginBottom: '1.5rem',
            }}>
              Mahasiswa Information Technology di Universitas Brawijaya yang berfokus pada rekayasa backend, perancangan database, dan sistem embedded IoT.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {profile.socials && Object.entries(SOCIAL_MAP).map(([key, { icon: Icon, name }]) => {
                if (!profile.socials[key]) return null;
                return (
                  <a
                    key={key}
                    href={profile.socials[key]}
                    target="_blank"
                    rel="noreferrer"
                    title={name}
                    aria-label={name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-dim)',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--text-main)';
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-dim)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Navigation Columns ── */}
          {NAV_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: '750',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
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
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Admin Trigger */}
            {isAdminLoggedIn ? (
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                title="Buka Panel Admin"
                aria-label="Buka Panel Admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: '650',
                  color: 'var(--accent-emerald)',
                  background: 'var(--bg-surface)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
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
                  fontWeight: '550',
                  color: 'var(--text-dim)',
                  background: 'transparent',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-dim)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
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
                gap: '0.35rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
              title="Kembali ke atas"
            >
              <ArrowUp size={13} /> Atas
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
