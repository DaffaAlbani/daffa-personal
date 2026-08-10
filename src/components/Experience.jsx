import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, Calendar, CheckCircle, Building2 } from 'lucide-react';

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
            <span className="gradient-text">Profesional</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Karir dan kontribusi teknis di berbagai perusahaan dan proyek nyata.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>

          {/* Gradient Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '22px',
            top: '10px',
            bottom: '10px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-indigo), var(--accent-purple), transparent)',
            borderRadius: '9999px',
          }} />

          {profile.experiences?.map((exp, index) => (
            <div
              key={index}
              className="reveal-on-scroll"
              style={{
                position: 'relative',
                paddingLeft: '4rem',
                marginBottom: index < profile.experiences.length - 1 ? '2.25rem' : 0,
                transitionDelay: `${0.08 + index * 0.08}s`,
              }}
            >
              {/* Timeline Node */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '2px solid var(--accent-indigo)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 4px rgba(129,140,248,0.12), 0 0 20px rgba(129,140,248,0.3)',
                zIndex: 2,
              }}>
                <Briefcase size={18} color="var(--accent-indigo)" />
              </div>

              {/* Card */}
              <div className="glass-panel" style={{ padding: '1.5rem 1.75rem' }}>

                {/* Card Header */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '0.85rem',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      color: 'var(--text-main)',
                      marginBottom: '0.25rem',
                    }}>
                      {exp.role}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Building2 size={14} color="var(--accent-indigo)" />
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--accent-indigo)',
                      }}>
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                    {/* Period Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid var(--border-color)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '500',
                    }}>
                      <Calendar size={13} color="var(--accent-cyan)" />
                      <span>{exp.period}</span>
                    </div>

                    {/* Employment Type Badge */}
                    {exp.type && (
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--accent-emerald)',
                        background: 'rgba(52,211,153,0.1)',
                        border: '1px solid rgba(52,211,153,0.2)',
                        padding: '0.18rem 0.6rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}>
                        {exp.type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.93rem',
                  marginBottom: exp.achievements?.length ? '1rem' : 0,
                  lineHeight: '1.7',
                }}>
                  {exp.description}
                </p>

                {/* Achievements */}
                {exp.achievements?.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '0.45rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)',
                  }}>
                    {exp.achievements.map((achieve, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.83rem',
                        color: 'var(--text-muted)',
                        lineHeight: '1.5',
                      }}>
                        <CheckCircle size={13} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{achieve}</span>
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
