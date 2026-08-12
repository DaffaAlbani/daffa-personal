import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Camera, ArrowRight, Download, Sparkles,
  ChevronDown, MessageSquare,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

const ROLES = [
  "Backend & Laravel Developer",
  "IoT & ESP32 Engineer",
  "Database Architect",
  "AI & Programming Tutor"
];

export const Hero = () => {
  const { profile, isAdminLoggedIn, setIsAdminPanelOpen } = useProfile();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Rotator Effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (!isDeleting && displayText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2800);
    } else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 40);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownloadCV = () => {
    const cvContent = `=== CURRICULUM VITAE ===\nNama: ${profile.name}\nTitle: ${profile.title}\nEmail: ${profile.email}\nLokasi: ${profile.location}\n\nBio:\n${profile.bio}\n\nSkillsets:\n${profile.skills?.map(s => `- ${s.name} (${s.level}%)`).join('\n')}`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${profile.name.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '5.5rem',
      paddingBottom: '3rem',
      overflow: 'hidden',
    }}>

      {/* Ambient Radial Mesh Glows */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid">

          {/* ── Left Column: Identity ── */}
          <div className="reveal-on-scroll hero-identity-col" style={{ transitionDelay: '0.05s' }}>

            {/* Availability Status */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              background: 'rgba(52, 211, 153, 0.06)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              color: 'var(--accent-emerald)',
              marginBottom: '1.75rem',
              letterSpacing: '0.02em',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)',
                animation: 'pulse-dot 2s infinite',
                display: 'inline-block',
              }} />
              <span>{profile.availability || "Terbuka untuk Magang & Freelance"}</span>
            </div>

            {/* Main Name */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)',
              fontWeight: '800',
              lineHeight: 1.08,
              marginBottom: '1.25rem',
              letterSpacing: '-0.04em',
            }}>
              <span style={{
                color: 'var(--text-dim)',
                fontSize: '45%',
                fontWeight: '500',
                display: 'block',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}>
                Halo, saya
              </span>
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Typewriter Role */}
            <div className="hero-typewriter">
              <div style={{
                width: '24px', height: '2px',
                background: 'var(--accent-indigo)',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0,
                opacity: 0.7,
              }} />
              <h2 style={{
                fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                fontWeight: '600',
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent-indigo)',
                letterSpacing: '-0.01em',
              }}>
                {displayText}
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.1em',
                  background: 'var(--accent-indigo)',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  animation: 'pulse-dot 1s infinite',
                  opacity: 0.8,
                }} />
              </h2>
            </div>

            {/* Tagline */}
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
              marginBottom: '2.25rem',
              maxWidth: '520px',
              lineHeight: '1.8',
            }}>
              {profile.tagline || profile.bio}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">
                <MessageSquare size={14} /> Hubungi Saya <ArrowRight size={14} />
              </a>
              <button onClick={handleDownloadCV} className="btn btn-secondary">
                <Download size={14} /> Unduh CV
              </button>
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="btn btn-secondary"
                  style={{ borderColor: 'rgba(52,211,153,0.25)', color: 'var(--accent-emerald)' }}
                >
                  <Sparkles size={13} /> Panel Admin
                </button>
              )}
            </div>

            {/* Social Row & Quick Stats Badges */}
            <div className="hero-social-row">
              {profile.socials?.github && (
                <SocialBtn href={profile.socials.github} title="GitHub" hoverColor="#e6edf3">
                  <GithubIcon size={16} />
                </SocialBtn>
              )}
              {profile.socials?.linkedin && (
                <SocialBtn href={profile.socials.linkedin} title="LinkedIn" hoverColor="#0A66C2">
                  <LinkedinIcon size={16} />
                </SocialBtn>
              )}
              {profile.socials?.instagram && (
                <SocialBtn href={profile.socials.instagram} title="Instagram" hoverColor="#E1306C">
                  <InstagramIcon size={16} />
                </SocialBtn>
              )}
              {profile.socials?.twitter && (
                <SocialBtn href={profile.socials.twitter} title="Twitter / X" hoverColor="#1D9BF0">
                  <TwitterIcon size={16} />
                </SocialBtn>
              )}
            </div>

            {/* Editorial Quick Stats Badges */}
            {profile.stats && profile.stats.length > 0 && (
              <div className="hero-stats-grid">
                {profile.stats.map((st, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.85rem',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.025)';
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {st.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.15rem' }}>
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column: Avatar ── */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transitionDelay: '0.15s',
          }}>
            <div style={{ position: 'relative' }}>

              {/* Subtle rotating glow ring */}
              <div style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(129,140,248,0.3), rgba(168,139,250,0.2), rgba(192,132,252,0.3), rgba(129,140,248,0.2), rgba(129,140,248,0.3))',
                filter: 'blur(20px)',
                opacity: 0.5,
                animation: 'spinConic 16s linear infinite',
              }} />

              {/* Photo Frame */}
              <div className="avatar-pro-frame" style={{ position: 'relative', zIndex: 1 }}>
                <div
                  className="avatar-pro-inner"
                  style={{ width: 'min(280px, 68vw)', aspectRatio: '1 / 1' }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = '/avatar-default.png'; }}
                  />
                  {/* Admin Edit Overlay */}
                  {isAdminLoggedIn && (
                    <div
                      onClick={() => setIsAdminPanelOpen(true)}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        color: '#FFF', cursor: 'pointer',
                        opacity: 0, transition: 'opacity 0.2s ease',
                        borderRadius: '50%',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <Camera size={28} color="var(--accent-indigo)" />
                      <span style={{ fontSize: '0.78rem', fontWeight: '600', marginTop: '0.4rem' }}>
                        Ganti Foto
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll ke bagian tentang saya"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--text-dim)',
          textDecoration: 'none',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: '600',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          animation: 'scrollBounce 2.5s ease-in-out infinite',
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        <ChevronDown size={16} />
      </a>
    </section>
  );
};

/* ── Social Button Component ── */
const SocialBtn = ({ href, title, hoverColor, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    aria-label={title}
    style={{
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-dim)',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = hoverColor;
      e.currentTarget.style.borderColor = hoverColor + '40';
      e.currentTarget.style.background = hoverColor + '10';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = 'var(--text-dim)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </a>
);
