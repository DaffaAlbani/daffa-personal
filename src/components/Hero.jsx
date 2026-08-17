import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  ArrowRight, Download, Camera, MessageSquare, ChevronDown,
  Building2, Server, Database, Cpu, Layers, CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

const ROLES = [
  "Backend & Laravel Developer",
  "IoT & ESP32 Engineer",
  "Database Architect",
  "AI & Programming Tutor"
];

const CORE_STACK = [
  "PHP & Laravel",
  "MySQL & Database",
  "ESP32 & C++",
  "RESTful APIs",
  "Git & GitHub"
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
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '6.5rem',
      paddingBottom: '4.5rem',
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-layout">

          {/* ── Left Column: Identity & Story ── */}
          <div className="hero-layout-left reveal-on-scroll">

            {/* Availability Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.35rem 0.95rem',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
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
              <span>{profile.availability || "Open for Opportunities • Surabaya / Malang"}</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
              fontWeight: '850',
              lineHeight: 1.08,
              marginBottom: '0.85rem',
              letterSpacing: '-0.035em',
            }}>
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '38%',
                fontWeight: '700',
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

            {/* Typewriter Specialization */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              minHeight: '1.8rem',
            }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', fontFamily: 'var(--font-code)' }}>$</span>
              <h2 style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                fontWeight: '650',
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
              fontSize: '1.02rem',
              lineHeight: '1.75',
              marginBottom: '1.75rem',
              maxWidth: '580px',
            }}>
              {profile.tagline || profile.bio}
            </p>

            {/* Tech Stack Chips Bar */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-heading)',
                marginBottom: '0.65rem',
              }}>
                Tech Stack Utama
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {CORE_STACK.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: '600',
                      fontFamily: 'var(--font-code)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs & Socials */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn btn-primary">
                  <MessageSquare size={15} /> Hubungi Saya <ArrowRight size={15} />
                </a>
                <button onClick={handleDownloadCV} className="btn btn-secondary">
                  <Download size={15} /> Unduh CV
                </button>
              </div>

              {/* Social Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

          </div>

          {/* ── Right Column: Grand Arch Photo Card & Highlights ── */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.75rem',
            transitionDelay: '0.1s',
          }}>
            {/* ── Grand Architectural Arch Card ── */}
            <div className="arch-card-wrapper">
              <div className="arch-card-backing" />

              <div className="arch-card-outer">
                <div
                  className="arch-card-inner"
                  style={{ width: 'min(300px, 68vw)', height: '375px' }}
                >
                  <div className="arch-top-badge">
                    ID // 01
                  </div>

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
                      <Camera size={26} />
                      <span style={{ fontSize: '0.78rem', fontWeight: '650', marginTop: '0.35rem' }}>
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
                <span>ESP32 & Laravel Engineer</span>
              </div>
            </div>

            {/* Quick Highlights Bento Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              width: '100%',
              maxWidth: '320px',
              marginTop: '0.35rem',
            }}>
              <div className="craft-card" style={{ padding: '0.9rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-heading)' }}>
                  <Building2 size={13} /> Institusi
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '750', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  Univ. Brawijaya
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  D3 IT (2024–Pres)
                </div>
              </div>

              <div className="craft-card" style={{ padding: '0.9rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-heading)' }}>
                  <Server size={13} /> Spesialisasi
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '750', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  Backend & IoT
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  API & Microcontrollers
                </div>
              </div>

              <div className="craft-card" style={{ padding: '0.9rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-heading)' }}>
                  <Database size={13} /> Database
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '750', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  MySQL & ERD
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Relational Modeling
                </div>
              </div>

              <div className="craft-card" style={{ padding: '0.9rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-heading)' }}>
                  <CheckCircle2 size={13} color="var(--accent-emerald)" /> Kesiapan
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '750', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  Open for Work
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Magang & Freelance
                </div>
              </div>
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
