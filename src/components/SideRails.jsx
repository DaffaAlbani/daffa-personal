import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

export const SideRails = () => {
  const { profile } = useProfile();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, Math.round(currentProgress))));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Left Side Rail: Social Media Gateway ── */}
      <aside
        className="side-rail side-rail-left"
        aria-label="Social Media Links"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'clamp(1rem, 2.5vw, 2.5rem)',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {profile.socials?.github && (
            <SideSocialLink href={profile.socials.github} title="GitHub">
              <GithubIcon size={16} />
            </SideSocialLink>
          )}
          {profile.socials?.linkedin && (
            <SideSocialLink href={profile.socials.linkedin} title="LinkedIn">
              <LinkedinIcon size={16} />
            </SideSocialLink>
          )}
          {profile.socials?.instagram && (
            <SideSocialLink href={profile.socials.instagram} title="Instagram">
              <InstagramIcon size={16} />
            </SideSocialLink>
          )}
          {profile.socials?.twitter && (
            <SideSocialLink href={profile.socials.twitter} title="Twitter / X">
              <TwitterIcon size={16} />
            </SideSocialLink>
          )}
        </div>

        {/* Vertical Hairline Anchor */}
        <div style={{
          width: '1px',
          height: '90px',
          background: 'var(--border-color)',
          transition: 'background var(--transition-normal)',
        }} />
      </aside>

      {/* ── Right Side Rail: Scroll Meter & Vertical Email ── */}
      <aside
        className="side-rail side-rail-right"
        aria-label="Scroll Progress and Email Gateway"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 'clamp(1rem, 2.5vw, 2.5rem)',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {/* Scroll Progress Meter */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
        }}>
          <span style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-code)',
            fontWeight: '700',
            color: 'var(--text-dim)',
            letterSpacing: '0.05em',
          }}>
            {scrollProgress}%
          </span>
          <div style={{
            width: '2px',
            height: '32px',
            background: 'var(--border-color)',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '100%',
              height: `${scrollProgress}%`,
              background: 'var(--text-main)',
              borderRadius: '2px',
              transition: 'height 0.1s ease-out',
            }} />
          </div>
        </div>

        {/* Vertical Email Link */}
        <a
          href={`mailto:${profile.email}`}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: 'var(--font-code)',
            fontSize: '0.74rem',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'all var(--transition-fast)',
            padding: '0.5rem 0',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--text-main)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {profile.email}
        </a>

        {/* Vertical Hairline Anchor */}
        <div style={{
          width: '1px',
          height: '75px',
          background: 'var(--border-color)',
          transition: 'background var(--transition-normal)',
        }} />
      </aside>
    </>
  );
};

const SideSocialLink = ({ href, title, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    aria-label={title}
    style={{
      width: '32px',
      height: '32px',
      borderRadius: 'var(--radius-xs)',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-dim)',
      textDecoration: 'none',
      transition: 'all 0.15s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = 'var(--text-main)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = 'var(--text-dim)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </a>
);
