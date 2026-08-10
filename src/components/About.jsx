import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Cpu, UserCheck, BarChart3 } from 'lucide-react';

/* Map skill level % to readable label */
const getLevelLabel = (level) => {
  if (level >= 85) return { label: 'Expert', color: 'var(--accent-emerald)' };
  if (level >= 65) return { label: 'Advanced', color: 'var(--accent-cyan)' };
  if (level >= 40) return { label: 'Intermediate', color: 'var(--accent-indigo)' };
  return { label: 'Beginner', color: 'var(--accent-amber)' };
};

/* Skill progress bar component */
const SkillBar = ({ skill }) => {
  const { label, color } = getLevelLabel(skill.level);
  return (
    <div style={{
      padding: '0.85rem 1rem',
      borderRadius: 'var(--radius-sm)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border-color)',
      transition: 'border-color 0.2s ease, background 0.2s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: '600',
          fontSize: '0.9rem',
          color: 'var(--text-main)',
        }}>
          {skill.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color,
            background: color + '15',
            padding: '0.15rem 0.55rem',
            borderRadius: '9999px',
            letterSpacing: '0.05em',
          }}>
            {label}
          </span>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-heading)',
          }}>
            {skill.level}%
          </span>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: '6px',
        background: 'var(--bg-surface)',
        borderRadius: '9999px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{
          width: `${skill.level}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: '9999px',
          position: 'relative',
          transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 8px ${color}55`,
        }}>
          {/* Glimmer highlight */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '50%',
            background: 'rgba(255,255,255,0.35)',
            borderRadius: '9999px',
          }} />
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { profile } = useProfile();

  /* Group skills by category */
  const skillGroups = (profile.skills || []).reduce((acc, skill) => {
    const cat = skill.category || 'Lainnya';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <UserCheck size={11} style={{ marginRight: '0.25rem' }} />
              Tentang Saya
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Kenali Lebih{' '}
            <span className="gradient-text">Dekat</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Latar belakang, keahlian teknis, dan dedikasi saya dalam membangun solusi teknologi yang berdampak.
          </p>
        </div>

        {/* Bio + Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>

          {/* Bio Card */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2rem', transitionDelay: '0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(56,189,248,0.12)',
                border: '1px solid rgba(56,189,248,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <UserCheck size={18} color="var(--accent-cyan)" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: '700',
              }}>
                Ringkasan Profil
              </h3>
            </div>
            <p style={{
              color: 'var(--text-muted)',
              lineHeight: '1.85',
              fontSize: '0.98rem',
              whiteSpace: 'pre-line',
            }}>
              {profile.bio}
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}>
            {profile.stats?.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel reveal-on-scroll"
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transitionDelay: `${0.15 + idx * 0.07}s`,
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.03em',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.02em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="glass-panel reveal-on-scroll" style={{ padding: '2.25rem', transitionDelay: '0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(192,132,252,0.12)',
              border: '1px solid rgba(192,132,252,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Cpu size={18} color="var(--accent-purple)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700' }}>
              Keahlian Teknis
            </h3>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Expert', color: 'var(--accent-emerald)' },
                { label: 'Advanced', color: 'var(--accent-cyan)' },
                { label: 'Intermediate', color: 'var(--accent-indigo)' },
                { label: 'Beginner', color: 'var(--accent-amber)' },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'block' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Groups */}
          {Object.entries(skillGroups).map(([category, skills], groupIdx) => (
            <div key={category} style={{ marginBottom: groupIdx < Object.keys(skillGroups).length - 1 ? '2rem' : 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.85rem',
              }}>
                <BarChart3 size={14} color="var(--text-dim)" />
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {category}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '0.75rem',
              }}>
                {skills.map((skill, i) => (
                  <SkillBar key={i} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
