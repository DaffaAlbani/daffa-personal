import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, Calendar, CheckCircle2, Building2, ChevronRight, Award } from 'lucide-react';

export const Experience = () => {
  const { profile } = useProfile();

  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <Briefcase size={11} style={{ marginRight: '0.25rem' }} />
              Pengalaman
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Perjalanan{' '}
            <span className="gradient-text">Profesional & Leadership</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Rekam jejak kontribusi teknis, organisasi kemahasiswaan, dan peran bimbingan akademik.
          </p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>

          {/* Cybernetic Gradient Timeline Spine */}
          <div style={{
            position: 'absolute',
            left: '23px',
            top: '12px',
            bottom: '12px',
            width: '3px',
            background: 'linear-gradient(to bottom, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
            borderRadius: '9999px',
            boxShadow: '0 0 12px rgba(56,189,248,0.3)',
          }} />

          {profile.experiences?.map((exp, index) => (
            <div
              key={index}
              className="reveal-on-scroll"
              style={{
                position: 'relative',
                paddingLeft: '4.25rem',
                marginBottom: index < profile.experiences.length - 1 ? '2.5rem' : 0,
                transitionDelay: `${0.08 + index * 0.08}s`,
              }}
            >
              {/* Glowing Timeline Node Icon */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '2px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 4px rgba(56,189,248,0.15), 0 0 25px rgba(56,189,248,0.35)',
                zIndex: 2,
              }}>
                <Briefcase size={20} color="var(--accent-cyan)" />
              </div>

              {/* Timeline Experience Card */}
              <div className="glass-panel" style={{ padding: '1.65rem 1.85rem' }}>

                {/* Header Meta */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: 'var(--text-main)',
                      marginBottom: '0.3rem',
                    }}>
                      {exp.role}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        fontSize: '0.9rem', fontWeight: '700', fontFamily: 'var(--font-heading)',
                        color: 'var(--accent-indigo)',
                      }}>
                        <Building2 size={14} /> {exp.company}
                      </span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  {exp.period && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-heading)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '9999px',
                      background: 'rgba(129,140,248,0.12)',
                      border: '1px solid rgba(129,140,248,0.25)',
                      color: 'var(--accent-indigo)',
                    }}>
                      <Calendar size={13} /> {exp.period}
                    </span>
                  )}
                </div>

                {/* Role Description */}
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.93rem',
                  lineHeight: '1.75',
                  marginBottom: '1.15rem',
                }}>
                  {exp.description}
                </p>

                {/* Key Achievements Bullet Items */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                        <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ lineHeight: '1.6' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
