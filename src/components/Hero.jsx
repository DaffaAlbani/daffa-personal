import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ArrowRight, Download, Camera, MessageSquare, ChevronDown } from 'lucide-react';
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

  // Typewriter Effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (!isDeleting && displayText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 60);
    } else if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 30);
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
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '6.5rem',
      paddingBottom: '4rem',
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-layout">

          {/* ── Left Column: Identity & Bio ── */}
          <div className="hero-layout-left reveal-on-scroll">

            {/* Availability Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.76rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '650',
              color: 'var(--accent-emerald)',
              marginBottom: '1.25rem',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--accent-emerald)',
                display: 'inline-block',
              }} />
              <span>{profile.availability || "Open for Opportunities"}</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.2vw, 3.8rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '0.85rem',
              letterSpacing: '-0.035em',
            }}>
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '38%',
                fontWeight: '650',
                display: 'block',
                marginBottom: '0.35rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
              }}>
                Software Engineer & IoT Developer
              </span>
              {profile.name}
            </h1>

            {/* Typewriter Dynamic Specialization */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              minHeight: '1.8rem',
            }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', fontFamily: 'var(--font-code)' }}>$</span>
              <h2 style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: '600',
                fontFamily: 'var(--font-code)',
                color: 'var(--text-main)',
                letterSpacing: '-0.01em',
              }}>
                {displayText}
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: 'var(--text-main)',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                }} />
              </h2>
            </div>

            {/* Bio / Tagline */}
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              lineHeight: '1.75',
              marginBottom: '2rem',
              maxWidth: '560px',
            }}>
              {profile.tagline || profile.bio}
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}>
              <a href="#contact" className="btn btn-primary">
                <MessageSquare size={15} /> Hubungi Saya <ArrowRight size={15} />
              </a>
              <button onClick={handleDownloadCV} className="btn btn-secondary">
                <Download size={15} /> Unduh CV
              </button>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {profile.socials?.github && (
                <SocialLink href={profile.socials.github} title="GitHub">
                  <GithubIcon size={16} />
                </SocialLink>
              )}
              {profile.socials?.linkedin && (
                <SocialLink href={profile.socials.linkedin} title="LinkedIn">
                  <LinkedinIcon size={16} />
                </SocialLink>
              )}
              {profile.socials?.instagram && (
                <SocialLink href={profile.socials.instagram} title="Instagram">
                  <InstagramIcon size={16} />
                </SocialLink>
              )}
              {profile.socials?.twitter && (
                <SocialLink href={profile.socials.twitter} title="Twitter / X">
                  <TwitterIcon size={16} />
                </SocialLink>
              )}
            </div>

          </div>

          {/* ── Right Column: Portrait & Stats ── */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            transitionDelay: '0.1s',
          }}>
            {/* ── Architectural Arch / Geometric Capsule Card ── */}
            <div className="arch-card-wrapper">
              <div className="arch-card-outer">
                <div
                  className="arch-card-inner"
                  style={{ width: 'min(230px, 58vw)', height: '280px' }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    onError={e => { e.target.onerror = null; e.target.src = '/avatar-default.png'; }}
                  />

                  {/* Admin Edit Overlay */}
                  {isAdminLoggedIn && (
                    <div
                      onClick={() => setIsAdminPanelOpen(true)}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.7)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        color: '#FFF', cursor: 'pointer',
                        opacity: 0, transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <Camera size={22} />
                      <span style={{ fontSize: '0.72rem', fontWeight: '600', marginTop: '0.3rem' }}>
                        Ganti Foto
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Technical Badge */}
              <div className="arch-floating-pill">
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  display: 'inline-block',
                }} />
                <span>ESP32 & Laravel</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              width: '100%',
              maxWidth: '280px',
            }}>
              {(profile.stats && profile.stats.length > 0 ? profile.stats : [
                { label: 'Proyek Selesai', value: '12+' },
                { label: 'Sertifikasi', value: '8+' },
                { label: 'Tech Stack', value: 'Laravel & IoT' },
                { label: 'Institusi', value: 'Univ. Brawijaya' },
              ]).slice(0, 4).map((st, i) => (
                <div
                  key={i}
                  className="craft-card"
                  style={{
                    padding: '0.85rem 1rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontWeight: '700',
                  }}>
                    {st.label}
                  </div>
                  <div style={{
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    marginTop: '0.2rem',
                  }}>
                    {st.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll ke bagian tentang saya"
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-dim)',
          textDecoration: 'none',
          opacity: 0.6,
          transition: 'opacity 0.2s ease',
        }}
      >
        <ChevronDown size={18} />
      </a>
    </section>
  );
};

const SocialLink = ({ href, title, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    aria-label={title}
    style={{
      width: '36px',
      height: '36px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      textDecoration: 'none',
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
  >
    {children}
  </a>
);
