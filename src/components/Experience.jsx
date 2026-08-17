import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, Calendar, CheckCircle2, Building2 } from 'lucide-react';

export const Experience = () => {
  const { profile } = useProfile();
  const experiencesList = profile.experiences || [];

  return (
    <section id="experience" className="section-padding">
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <span className="section-badge">
              <Briefcase size={11} style={{ marginRight: '0.25rem' }} />
              Pengalaman
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Rekam Jejak & Kepemimpinan
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>
            Kontribusi teknis, organisasi kemahasiswaan, dan pendampingan akademik.
          </p>
        </div>

        {experiencesList.length === 0 ? (
          <div className="craft-card reveal-on-scroll" style={{
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <Briefcase size={28} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '750', marginBottom: '0.25rem' }}>
              Belum Ada Pengalaman Ditampilkan
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Pengalaman kerja dan organisasi dapat ditambahkan melalui Panel Admin.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>

            {/* Subtle Timeline Spine */}
            <div style={{
              position: 'absolute',
              left: '19px',
              top: '12px',
              bottom: '12px',
              width: '1px',
              background: 'var(--border-color)',
            }} />

            {experiencesList.map((exp, index) => (
              <div
                key={index}
                className="reveal-on-scroll"
                style={{
                  position: 'relative',
                  paddingLeft: '3.75rem',
                  marginBottom: index < profile.experiences.length - 1 ? '2rem' : 0,
                  transitionDelay: `${0.06 * index}s`,
                }}
              >
                {/* Timeline Node */}
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  zIndex: 2,
                }}>
                  <Briefcase size={16} />
                </div>

                {/* Experience Card */}
                <div className="craft-card" style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    marginBottom: '0.85rem',
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.15rem',
                        fontWeight: '750',
                        color: 'var(--text-main)',
                        marginBottom: '0.25rem',
                      }}>
                        {exp.role}
                      </h3>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                        fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)',
                      }}>
                        <Building2 size={14} /> {exp.company}
                      </div>
                    </div>

                    {exp.period && (
                      <span style={{
                        fontSize: '0.76rem',
                        fontWeight: '600',
                        fontFamily: 'var(--font-heading)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-dim)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}>
                        <Calendar size={12} /> {exp.period}
                      </span>
                    )}
                  </div>

                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                    lineHeight: '1.7',
                    marginBottom: '1rem',
                  }}>
                    {exp.description}
                  </p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: 'var(--text-dim)', marginTop: '2px' }}>•</span>
                          <span style={{ lineHeight: '1.55' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
