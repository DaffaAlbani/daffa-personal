import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Camera, ArrowRight, Download, Mail, Sparkles, MapPin, Code2, Server, Cpu, GraduationCap } from 'lucide-react';
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
      paddingTop: '5rem',
      paddingBottom: '3rem',
      overflow: 'hidden' 
    }}>
      
      {/* Background Ambient Orbs */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Text Info */}
          <div className="reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {/* Institution Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.1rem',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              color: 'var(--accent-cyan)',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(8px)'
            }}>
              <GraduationCap size={16} color="var(--accent-cyan)" />
              <span>Universitas Brawijaya (IT Student)</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', fontWeight: '800', lineHeight: 1.12, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              Halo, Saya <br />
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Title & Tagline */}
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '1rem', lineHeight: '1.5' }}>
              {profile.title}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', marginBottom: '1.75rem', maxWidth: '600px', lineHeight: '1.7' }}>
              {profile.tagline || profile.bio}
            </p>

            {/* Tech Badges Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.75rem' }}>
              <span style={techBadgeStyle}>
                <Server size={14} color="var(--accent-cyan)" /> Backend (PHP & Laravel)
              </span>
              <span style={techBadgeStyle}>
                <Cpu size={14} color="var(--accent-purple)" /> IoT (ESP32)
              </span>
              <span style={techBadgeStyle}>
                <Code2 size={14} color="var(--accent-emerald)" /> MySQL & ERD Schema
              </span>
            </div>

            {/* Location & Email Info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <MapPin size={16} color="var(--accent-indigo)" />
                <span>{profile.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Mail size={16} color="var(--accent-cyan)" />
                <span>{profile.email}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.25rem' }}>
              <a href="#contact" className="btn btn-primary">
                Hubungi Saya <ArrowRight size={16} />
              </a>
              <button onClick={handleDownloadCV} className="btn btn-secondary">
                <Download size={16} /> Unduh Resume / CV
              </button>
              {isAdminLoggedIn && (
                <button onClick={() => setIsAdminPanelOpen(true)} className="btn btn-secondary" style={{ borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}>
                  <Sparkles size={16} /> Panel Admin
                </button>
              )}
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: '700', letterSpacing: '0.05em' }}>SOSIAL MEDIA:</span>
              {profile.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noreferrer" style={socialIconStyle} title="GitHub Profile">
                  <GithubIcon size={18} />
                </a>
              )}
              {profile.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" style={socialIconStyle} title="LinkedIn Profile">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {profile.socials?.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" style={socialIconStyle} title="Instagram">
                  <InstagramIcon size={18} />
                </a>
              )}
              {profile.socials?.twitter && (
                <a href={profile.socials.twitter} target="_blank" rel="noreferrer" style={socialIconStyle} title="Twitter/X">
                  <TwitterIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Profile Photo Avatar */}
          <div className="reveal-on-scroll" style={{ display: 'flex', justifyContent: 'center', position: 'relative', transitionDelay: '0.3s' }}>
            <div style={{ position: 'relative' }}>
              
              {/* Outer Glowing Ring Frame */}
              <div 
                className="glow-avatar-frame"
                style={{
                  width: 'min(350px, 80vw)',
                  height: 'min(350px, 80vw)',
                  borderRadius: '50%',
                  padding: '6px',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Profile Photo Image */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                  position: 'relative'
                }}>
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/avatar-default.png';
                    }}
                  />

                  {/* Admin Hover Overlay if Logged In */}
                  {isAdminLoggedIn && (
                    <div 
                      onClick={() => setIsAdminPanelOpen(true)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF',
                        cursor: 'pointer',
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <Camera size={34} color="var(--accent-cyan)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem' }}>Ganti Foto Profil</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '-25px',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'var(--shadow-card)',
                zIndex: 2
              }}>
                <Server size={18} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700' }}>FRAMEWORK</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>PHP Laravel</div>
                </div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '-20px',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'var(--shadow-card)',
                zIndex: 2
              }}>
                <Cpu size={18} color="var(--accent-purple)" />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700' }}>HARDWARE</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>IoT & ESP32</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const techBadgeStyle = {
  fontSize: '0.8rem',
  fontWeight: '600',
  padding: '0.35rem 0.85rem',
  borderRadius: '9999px',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-muted)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem'
};

const socialIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-muted)',
  textDecoration: 'none',
  transition: 'all 0.25s ease'
};
