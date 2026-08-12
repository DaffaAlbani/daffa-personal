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

            {/* Availability Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.15rem',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--accent-emerald)',
              marginBottom: '1.75rem',
              letterSpacing: '0.03em',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 10px var(--accent-emerald)',
                animation: 'pulse-dot 1.8s infinite',
                display: 'inline-block',
              }} />
              <span>{profile.availability || "⚡ Systems Online • Open for Opportunities"}</span>
            </div>

            {/* Main Display Headline */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5.8vw, 4.1rem)',
              fontWeight: '900',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
              letterSpacing: '-0.04em',
            }}>
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '42%',
                fontWeight: '600',
                display: 'block',
                marginBottom: '0.6rem',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}>
                Backend & IoT Software Engineer
              </span>
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Typewriter Dynamic Role */}
            <div className="hero-typewriter">
              <div style={{
                width: '28px', height: '2.5px',
                background: 'var(--accent-cyan)',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0,
                boxShadow: '0 0 10px var(--accent-cyan)',
              }} />
              <h2 style={{
                fontSize: 'clamp(1rem, 2.3vw, 1.25rem)',
                fontWeight: '700',
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent-cyan)',
                letterSpacing: '-0.01em',
              }}>
                {displayText}
                <span style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.1em',
                  background: 'var(--accent-cyan)',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'pulse-dot 0.9s infinite',
                }} />
              </h2>
            </div>

            {/* Tagline / Bio */}
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              marginBottom: '2.25rem',
              maxWidth: '540px',
              lineHeight: '1.8',
            }}>
              {profile.tagline || profile.bio}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">
                <MessageSquare size={15} /> Hubungi Saya <ArrowRight size={15} />
              </a>
              <button onClick={handleDownloadCV} className="btn btn-secondary">
                <Download size={15} /> Unduh CV
              </button>
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="btn btn-secondary"
                  style={{ borderColor: 'rgba(16,185,129,0.3)', color: 'var(--accent-emerald)' }}
                >
                  <Sparkles size={14} /> Panel Admin
                </button>
              )}
            </div>

            {/* Social Row */}
            <div className="hero-social-row">
              {profile.socials?.github && (
                <SocialBtn href={profile.socials.github} title="GitHub" hoverColor="#06B6D4">
                  <GithubIcon size={17} />
                </SocialBtn>
              )}
              {profile.socials?.linkedin && (
                <SocialBtn href={profile.socials.linkedin} title="LinkedIn" hoverColor="#0A66C2">
                  <LinkedinIcon size={17} />
                </SocialBtn>
              )}
              {profile.socials?.instagram && (
                <SocialBtn href={profile.socials.instagram} title="Instagram" hoverColor="#E1306C">
                  <InstagramIcon size={17} />
                </SocialBtn>
              )}
              {profile.socials?.twitter && (
                <SocialBtn href={profile.socials.twitter} title="Twitter / X" hoverColor="#1D9BF0">
                  <TwitterIcon size={17} />
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
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 1rem',
                      backdropFilter: 'blur(16px)',
                      boxShadow: 'var(--shadow-card)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 25px rgba(6, 182, 212, 0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
                      {st.label}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column: Avatar Frame ── */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transitionDelay: '0.15s',
          }}>
            <div style={{ position: 'relative' }}>

              {/* Pulsing Conic Glow Ring */}
              <div style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(6,182,212,0.5), rgba(99,102,241,0.4), rgba(168,85,247,0.5), rgba(6,182,212,0.5))',
                filter: 'blur(22px)',
                opacity: 0.75,
                animation: 'spinConic 14s linear infinite',
              }} />

              {/* Floating Tech Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                zIndex: 10,
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                color: 'var(--accent-cyan)',
                boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)',
                backdropFilter: 'blur(16px)',
              }}>
                <Sparkles size={13} color="var(--accent-cyan)" />
                <span>ESP32 & Laravel</span>
              </div>

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
