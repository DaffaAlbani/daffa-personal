import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Camera, ArrowRight, Download, Sparkles,
  ChevronDown, MessageSquare, Terminal, Cpu, Database, Server, Code2,
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
      }, 65);
    } else if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2600);
    } else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 35);
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
      paddingTop: '6.5rem',
      paddingBottom: '3.5rem',
      overflow: 'hidden',
    }}>

      {/* Ambient Radial Mesh Glows */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        
        {/* ── Main Bento Grid Layout ── */}
        <div className="bento-grid" style={{ alignItems: 'stretch' }}>

          {/* ── Bento Tile 1: Main Introduction (Span 7) ── */}
          <div className="bento-col-7 bento-card reveal-on-scroll" style={{
            padding: '2.5rem 2.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transitionDelay: '0.05s',
          }}>
            <div>
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
                fontWeight: '750',
                color: 'var(--accent-emerald)',
                marginBottom: '1.5rem',
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

              {/* Display Headline */}
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)',
                fontWeight: '900',
                lineHeight: 1.08,
                marginBottom: '1rem',
                letterSpacing: '-0.04em',
              }}>
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: '40%',
                  fontWeight: '700',
                  display: 'block',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-code)',
                }}>
                  // Software Engineer & Hardware Hacker
                </span>
                <span className="gradient-text">{profile.name}</span>
              </h1>

              {/* Dynamic Typewriter Role */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.25rem',
                minHeight: '2rem',
              }}>
                <div style={{
                  width: '24px', height: '3px',
                  background: 'var(--accent-cyan)',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 0 10px var(--accent-cyan)',
                }} />
                <h2 style={{
                  fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                  fontWeight: '750',
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
                    animation: 'pulse-dot 0.85s infinite',
                  }} />
                </h2>
              </div>

              {/* Tagline / Bio summary */}
              <p style={{
                color: 'var(--text-muted)',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                lineHeight: '1.8',
                marginBottom: '2rem',
                maxWidth: '600px',
              }}>
                {profile.tagline || profile.bio}
              </p>
            </div>

            {/* Bottom Actions & Socials */}
            <div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '1.5rem',
              }}>
                <a href="#contact" className="btn btn-primary">
                  <MessageSquare size={16} /> Hubungi Saya <ArrowRight size={16} />
                </a>
                <button onClick={handleDownloadCV} className="btn btn-secondary">
                  <Download size={16} /> Unduh CV
                </button>
                {isAdminLoggedIn && (
                  <button
                    onClick={() => setIsAdminPanelOpen(true)}
                    className="btn btn-secondary"
                    style={{ borderColor: 'rgba(16,185,129,0.3)', color: 'var(--accent-emerald)' }}
                  >
                    <Sparkles size={15} /> Panel Admin
                  </button>
                )}
              </div>

              {/* Social Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-heading)', marginRight: '0.25rem' }}>
                  Connect:
                </span>
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
            </div>
          </div>

          {/* ── Bento Tile 2: Avatar & Identity Visual (Span 5) ── */}
          <div className="bento-col-5 bento-card reveal-on-scroll" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transitionDelay: '0.12s',
          }}>
            {/* Pulsing Glow Ring */}
            <div style={{ position: 'relative', margin: '1rem 0 1.5rem 0' }}>
              <div style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(6,182,212,0.5), rgba(99,102,241,0.45), rgba(168,85,247,0.5), rgba(6,182,212,0.5))',
                filter: 'blur(24px)',
                opacity: 0.8,
                animation: 'spinConic 12s linear infinite',
              }} />

              {/* Floating Tech Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                right: '-8px',
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
                boxShadow: '0 10px 25px rgba(6, 182, 212, 0.35)',
                backdropFilter: 'blur(16px)',
              }}>
                <Cpu size={13} color="var(--accent-cyan)" />
                <span>ESP32 & Laravel</span>
              </div>

              {/* Avatar Frame */}
              <div className="avatar-pro-frame" style={{ position: 'relative', zIndex: 1 }}>
                <div
                  className="avatar-pro-inner"
                  style={{ width: 'min(240px, 58vw)', aspectRatio: '1 / 1' }}
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
                        background: 'rgba(0,0,0,0.65)',
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
                      <Camera size={26} color="var(--accent-cyan)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '0.35rem' }}>
                        Ganti Foto
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Micro Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              justifyContent: 'center',
              width: '100%',
              marginTop: '0.5rem',
            }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: '700', fontFamily: 'var(--font-code)',
                padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
                color: 'var(--accent-cyan)',
              }}>
                <Server size={11} style={{ display: 'inline', marginRight: '4px' }} /> REST API
              </span>
              <span style={{
                fontSize: '0.72rem', fontWeight: '700', fontFamily: 'var(--font-code)',
                padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                color: 'var(--accent-indigo)',
              }}>
                <Database size={11} style={{ display: 'inline', marginRight: '4px' }} /> MySQL
              </span>
              <span style={{
                fontSize: '0.72rem', fontWeight: '700', fontFamily: 'var(--font-code)',
                padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)',
                color: 'var(--accent-purple)',
              }}>
                <Cpu size={11} style={{ display: 'inline', marginRight: '4px' }} /> IoT Sensors
              </span>
            </div>
          </div>

          {/* ── Bento Tile 3: Live Engineering Terminal Card (Span 5) ── */}
          <div className="bento-col-5 bento-card reveal-on-scroll" style={{
            padding: '1.5rem',
            background: 'rgba(6, 12, 28, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            transitionDelay: '0.18s',
          }}>
            <div className="bento-terminal-header">
              <span className="terminal-dot" style={{ background: '#EF4444' }} />
              <span className="terminal-dot" style={{ background: '#F59E0B' }} />
              <span className="terminal-dot" style={{ background: '#10B981' }} />
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-code)',
                marginLeft: 'auto',
                fontWeight: '600',
              }}>
                engineer_spec.json
              </span>
            </div>
            <pre style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.8rem',
              lineHeight: '1.65',
              color: 'var(--text-muted)',
              overflowX: 'auto',
              margin: 0,
            }}>
              <code>
                {`{\n`}
                {`  `}<span style={{ color: 'var(--accent-cyan)' }}>"engineer"</span>: <span style={{ color: '#F8FAFC' }}>"{profile.name}"</span>,{`\n`}
                {`  `}<span style={{ color: 'var(--accent-cyan)' }}>"institution"</span>: <span style={{ color: '#F8FAFC' }}>"Universitas Brawijaya"</span>,{`\n`}
                {`  `}<span style={{ color: 'var(--accent-cyan)' }}>"core_specialty"</span>: [<span style={{ color: 'var(--accent-emerald)' }}>"Backend"</span>, <span style={{ color: 'var(--accent-indigo)' }}>"Database"</span>, <span style={{ color: 'var(--accent-purple)' }}>"IoT"</span>],{`\n`}
                {`  `}<span style={{ color: 'var(--accent-cyan)' }}>"stack"</span>: [<span style={{ color: '#38BDF8' }}>"Laravel"</span>, <span style={{ color: '#818CF8' }}>"MySQL"</span>, <span style={{ color: '#C084FC' }}>"ESP32"</span>, <span style={{ color: '#34D399' }}>"C++"</span>],{`\n`}
                {`  `}<span style={{ color: 'var(--accent-cyan)' }}>"status"</span>: <span style={{ color: 'var(--accent-emerald)' }}>"Active & Open for Contract"</span>{`\n`}
                {`}`}
              </code>
            </pre>
          </div>

          {/* ── Bento Tile 4: Metrics & Stats (Span 7) ── */}
          <div className="bento-col-7 reveal-on-scroll" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            transitionDelay: '0.22s',
          }}>
            {(profile.stats && profile.stats.length > 0 ? profile.stats : [
              { label: 'Proyek Selesai', value: '12+' },
              { label: 'Sertifikasi', value: '8+' },
              { label: 'Fokus Riset', value: 'IoT & Web' },
              { label: 'Pengalaman', value: '2+ Tahun' },
            ]).map((st, i) => (
              <div
                key={i}
                className="bento-card"
                style={{
                  padding: '1.25rem 1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: '800',
                }}>
                  {st.label}
                </div>
                <div style={{
                  fontSize: '1.35rem',
                  fontWeight: '900',
                  color: 'var(--text-main)',
                  marginTop: '0.35rem',
                  letterSpacing: '-0.02em',
                }}>
                  {st.value}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        aria-label="Scroll ke bagian tentang saya"
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--text-dim)',
          textDecoration: 'none',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          animation: 'scrollBounce 2.5s ease-in-out infinite',
          zIndex: 2,
          opacity: 0.7,
        }}
      >
        <ChevronDown size={17} />
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
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.04)',
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
      e.currentTarget.style.borderColor = hoverColor + '60';
      e.currentTarget.style.background = hoverColor + '15';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = `0 8px 18px ${hoverColor}30`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = 'var(--text-dim)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </a>
);
