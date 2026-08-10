import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Camera, ArrowRight, Download, Mail, Sparkles,
  MapPin, Code2, Server, Cpu, GraduationCap, ChevronDown,
  Database, ShieldCheck, CheckCircle2, MessageSquare,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

const ROLES = [
  "Backend & Laravel Developer",
  "IoT & ESP32 Embedded Engineer",
  "Database & ERD Architect",
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
      timer = setTimeout(() => setIsDeleting(true), 2400);
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
      paddingTop: '6rem',
      paddingBottom: '4.5rem',
      overflow: 'hidden',
    }}>

      {/* Ambient Radial Mesh Glows */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.75fr',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* ── Left Column: Identity & Craft Highlights ── */}
          <div className="reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>

            {/* Availability Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.42rem 1.15rem',
              background: 'rgba(52, 211, 153, 0.09)',
              border: '1px solid rgba(52, 211, 153, 0.28)',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--accent-emerald)',
              marginBottom: '1.4rem',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(52, 211, 153, 0.15)',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 12px var(--accent-emerald)',
                animation: 'pulse-dot 1.8s infinite',
                display: 'inline-block',
              }} />
              <span>{profile.availability || "Terbuka untuk Magang, Freelance & AI Tutor"}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.7rem, 6vw, 4.25rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.035em',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '50%', fontWeight: '600', display: 'block', marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>
                Halo, saya
              </span>
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Dynamic Typewriter Specialization Rotator */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '1.35rem',
              minHeight: '2.2rem',
            }}>
              <div style={{
                width: '28px', height: '3px',
                background: 'var(--gradient-brand-h)',
                borderRadius: '9999px',
                flexShrink: 0,
              }} />
              <h2 style={{
                fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
                fontWeight: '700',
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent-cyan)',
                letterSpacing: '-0.01em',
              }}>
                {displayText}
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.2em',
                  background: 'var(--accent-cyan)',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'pulse-dot 0.9s infinite',
                }} />
              </h2>
            </div>

            {/* Bio / Tagline */}
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.96rem, 2vw, 1.05rem)',
              marginBottom: '1.75rem',
              maxWidth: '570px',
              lineHeight: '1.8',
            }}>
              {profile.tagline || profile.bio}
            </p>

            {/* Tech Matrix Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '2rem' }}>
              {[
                { icon: <Server size={13} color="var(--accent-cyan)" />, label: 'Backend · PHP & Laravel' },
                { icon: <Cpu size={13} color="var(--accent-purple)" />, label: 'IoT · ESP32 Hardware' },
                { icon: <Database size={13} color="var(--accent-indigo)" />, label: 'MySQL & ERD Schema' },
                { icon: <ShieldCheck size={13} color="var(--accent-rose)" />, label: 'Cybersecurity & picoCTF' },
              ].map(({ icon, label }) => (
                <span key={label} style={techBadgeStyle}>
                  {icon} {label}
                </span>
              ))}
            </div>

            {/* Quick Profile Metrics Strip */}
            {profile.stats && profile.stats.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
                marginBottom: '2.25rem',
                padding: '0.85rem 1.15rem',
                background: 'rgba(13, 20, 38, 0.55)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backdropFilter: 'blur(16px)',
              }}>
                {profile.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-heading)' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Location & Contact Meta */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.35rem',
              marginBottom: '2.25rem',
              fontSize: '0.87rem',
              color: 'var(--text-muted)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <MapPin size={15} color="var(--accent-indigo)" />
                <span>{profile.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Mail size={15} color="var(--accent-cyan)" />
                <span>{profile.email}</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
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
                  style={{ borderColor: 'rgba(52,211,153,0.35)', color: 'var(--accent-emerald)' }}
                >
                  <Sparkles size={14} /> Panel Admin
                </button>
              )}
            </div>

            {/* Social Connection Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Sosial
              </span>
              <div style={{ width: '24px', height: '1px', background: 'var(--border-color)' }} />
              {profile.socials?.github && (
                <SocialBtn href={profile.socials.github} title="GitHub" hoverColor="#e6edf3">
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
          </div>

          {/* ── Right Column: High-Craft Avatar Frame & Tri-Badges ── */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transitionDelay: '0.2s',
          }}>
            <div style={{ position: 'relative' }}>

              {/* Conic Rotating Energy Glow Halo Ring */}
              <div style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #38BDF8, #818CF8, #C084FC, #34D399, #38BDF8)',
                filter: 'blur(18px)',
                opacity: 0.65,
                animation: 'spinConic 12s linear infinite',
              }} />

              {/* ── Professional Photo Frame ── */}
              <div className="avatar-pro-frame" style={{ position: 'relative', zIndex: 1 }}>
                <div
                  className="avatar-pro-inner"
                  style={{ width: 'min(300px, 72vw)', aspectRatio: '1 / 1' }}
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
                        background: 'rgba(0,0,0,0.68)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        color: '#FFF', cursor: 'pointer',
                        opacity: 0, transition: 'opacity 0.22s ease',
                        borderRadius: '50%',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <Camera size={32} color="var(--accent-cyan)" />
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', marginTop: '0.5rem' }}>
                        Ganti Foto
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Badge 1 — Framework */}
              <div style={{
                ...floatBadgeStyle,
                top: '12px', left: '-36px',
                animation: 'floatBadge 4s ease-in-out infinite',
              }}>
                <Server size={16} color="var(--accent-cyan)" />
                <div>
                  <div style={badgeLabelStyle}>FRAMEWORK</div>
                  <div style={badgeValueStyle}>PHP Laravel</div>
                </div>
              </div>

              {/* Floating Badge 2 — Hardware */}
              <div style={{
                ...floatBadgeStyle,
                bottom: '12px', right: '-36px',
                animation: 'floatBadge 4.5s ease-in-out infinite 0.8s',
              }}>
                <Cpu size={16} color="var(--accent-purple)" />
                <div>
                  <div style={badgeLabelStyle}>HARDWARE</div>
                  <div style={badgeValueStyle}>IoT & ESP32</div>
                </div>
              </div>

              {/* Floating Badge 3 — Database */}
              <div style={{
                ...floatBadgeStyle,
                bottom: '-25px', left: '20px',
                animation: 'floatBadge 5s ease-in-out infinite 1.5s',
              }}>
                <Database size={16} color="var(--accent-indigo)" />
                <div>
                  <div style={badgeLabelStyle}>DATABASE</div>
                  <div style={badgeValueStyle}>MySQL & ERD</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <a
        href="#about"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          color: 'var(--text-dim)',
          textDecoration: 'none',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          animation: 'scrollBounce 2.2s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={18} />
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
    style={{
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      textDecoration: 'none',
      transition: 'all 0.22s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = hoverColor;
      e.currentTarget.style.borderColor = hoverColor + '55';
      e.currentTarget.style.background = hoverColor + '15';
      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
      e.currentTarget.style.boxShadow = `0 8px 20px ${hoverColor}30`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = 'var(--text-muted)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </a>
);

/* ── Style Constants ── */
const techBadgeStyle = {
  fontSize: '0.78rem',
  fontWeight: '600',
  fontFamily: 'var(--font-heading)',
  padding: '0.34rem 0.85rem',
  borderRadius: '9999px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-muted)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.2s ease, color 0.2s ease',
};

const floatBadgeStyle = {
  position: 'absolute',
  background: 'rgba(11, 17, 32, 0.85)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)',
  padding: '0.7rem 1.15rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',
  boxShadow: 'var(--shadow-card)',
  zIndex: 3,
  minWidth: '155px',
  transition: 'border-color 0.3s ease, transform 0.3s ease',
};

const badgeLabelStyle = {
  fontSize: '0.62rem',
  color: 'var(--text-dim)',
  fontFamily: 'var(--font-heading)',
  fontWeight: '700',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const badgeValueStyle = {
  fontSize: '0.88rem',
  fontWeight: '700',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-main)',
  marginTop: '1px',
};
