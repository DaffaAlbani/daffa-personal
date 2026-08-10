import React from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Camera, ArrowRight, Download, Mail, Sparkles,
  MapPin, Code2, Server, Cpu, GraduationCap, ChevronDown,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

export const Hero = () => {
  const { profile, isAdminLoggedIn, setIsAdminPanelOpen } = useProfile();

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
      paddingBottom: '4rem',
      overflow: 'hidden',
    }}>

      {/* Ambient Orbs */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.75fr',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* ── Left Column ── */}
          <div className="reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>

            {/* Institution Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.15rem',
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.22)',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--accent-cyan)',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(10px)',
              letterSpacing: '0.02em',
            }}>
              <GraduationCap size={15} color="var(--accent-cyan)" />
              <span>Universitas Brawijaya — IT Student</span>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)',
                animation: 'pulse-dot 2s infinite',
                display: 'inline-block',
                marginLeft: '0.2rem',
              }} />
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '1.1rem',
              letterSpacing: '-0.035em',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '55%', fontWeight: '600', display: 'block', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Halo, saya
              </span>
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Subtitle */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                width: '28px', height: '3px',
                background: 'var(--gradient-brand-h)',
                borderRadius: '9999px',
                flexShrink: 0,
              }} />
              <h2 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '600',
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent-indigo)',
                letterSpacing: '-0.01em',
              }}>
                {profile.title}
              </h2>
            </div>

            {/* Bio */}
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              marginBottom: '1.75rem',
              maxWidth: '560px',
              lineHeight: '1.8',
            }}>
              {profile.tagline || profile.bio}
            </p>

            {/* Tech Badges Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '2rem' }}>
              {[
                { icon: <Server size={13} color="var(--accent-cyan)" />, label: 'Backend · PHP & Laravel' },
                { icon: <Cpu size={13} color="var(--accent-purple)" />, label: 'IoT · ESP32' },
                { icon: <Code2 size={13} color="var(--accent-emerald)" />, label: 'MySQL & ERD' },
              ].map(({ icon, label }) => (
                <span key={label} style={techBadgeStyle}>
                  {icon} {label}
                </span>
              ))}
            </div>

            {/* Meta Info */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2.25rem',
              fontSize: '0.87rem',
              color: 'var(--text-muted)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={15} color="var(--accent-indigo)" />
                <span>{profile.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={15} color="var(--accent-cyan)" />
                <span>{profile.email}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <a href="#contact" className="btn btn-primary">
                Hubungi Saya <ArrowRight size={15} />
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

            {/* Social Icons */}
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

          {/* ── Right Column: Avatar ── */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transitionDelay: '0.2s',
          }}>
            <div style={{ position: 'relative' }}>

              {/* ── Professional Photo Frame ── */}
              <div className="avatar-pro-frame">
                <div
                  className="avatar-pro-inner"
                  style={{ width: 'min(290px, 70vw)', aspectRatio: '1 / 1' }}
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
                  {/* Admin overlay */}
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

              {/* Floating Badge — Framework */}
              <div style={{
                ...floatBadgeStyle,
                top: '16px', left: '-30px',
                animation: 'floatBadge 4s ease-in-out infinite',
              }}>
                <Server size={16} color="var(--accent-cyan)" />
                <div>
                  <div style={badgeLabelStyle}>FRAMEWORK</div>
                  <div style={badgeValueStyle}>PHP Laravel</div>
                </div>
              </div>

              {/* Floating Badge — Hardware */}
              <div style={{
                ...floatBadgeStyle,
                bottom: '16px', right: '-30px',
                animation: 'floatBadge 4.5s ease-in-out infinite 0.8s',
              }}>
                <Cpu size={16} color="var(--accent-purple)" />
                <div>
                  <div style={badgeLabelStyle}>HARDWARE</div>
                  <div style={badgeValueStyle}>IoT & ESP32</div>
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
          bottom: '2.5rem',
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

/* ── Social Button ── */
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

/* ── Styles ── */
const techBadgeStyle = {
  fontSize: '0.78rem',
  fontWeight: '600',
  fontFamily: 'var(--font-heading)',
  padding: '0.32rem 0.85rem',
  borderRadius: '9999px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-muted)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
};

const floatBadgeStyle = {
  position: 'absolute',
  background: 'var(--bg-card)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)',
  padding: '0.7rem 1.15rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',
  boxShadow: 'var(--shadow-card)',
  zIndex: 2,
  minWidth: '150px',
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
