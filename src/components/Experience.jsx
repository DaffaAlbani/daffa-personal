import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, Calendar, CheckCircle2, Building2 } from 'lucide-react';

export const Experience = () => {
  const { profile } = useProfile();
  const experiencesList = profile.experiences || [];

  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <Briefcase size={12} style={{ marginRight: '0.25rem' }} />
              Rekam Jejak Karir
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Pengalaman & <span className="gradient-text">Kepemimpinan</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Riwayat kontribusi rekayasa perangkat lunak, organisasi kemahasiswaan, dan peran mentoring.
          </p>
        </div>

        {experiencesList.length === 0 ? (
          <div className="bento-card reveal-on-scroll" style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-indigo)',
            }}>
              <Briefcase size={28} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                Belum Ada Pengalaman Ditampilkan
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Pengalaman kerja, proyek, dan peran organisasi dapat ditambahkan kapan saja melalui Panel Admin.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>

            {/* Cybernetic Gradient Timeline Spine */}
            <div style={{
              position: 'absolute',
              left: '23px',
              top: '14px',
              bottom: '14px',
              width: '3px',
              background: 'linear-gradient(to bottom, #06B6D4 0%, #6366F1 50%, #A855F7 100%)',
              borderRadius: '9999px',
              boxShadow: '0 0 14px rgba(6,182,212,0.4)',
            }} />

            {experiencesList.map((exp, index) => (
            <div
              key={index}
              className="reveal-on-scroll"
              style={{
                position: 'relative',
                paddingLeft: '4.5rem',
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
                boxShadow: '0 0 0 4px rgba(6,182,212,0.15), 0 0 25px rgba(6,182,212,0.4)',
                zIndex: 2,
              }}>
                <Briefcase size={20} color="var(--accent-cyan)" />
              </div>

              {/* Timeline Experience Bento Card */}
              <div className="bento-card" style={{ padding: '1.75rem 2rem' }}>

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
                      fontSize: '1.25rem',
                      fontWeight: '850',
                      color: 'var(--text-main)',
                      marginBottom: '0.35rem',
                    }}>
                      {exp.role}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        fontSize: '0.92rem', fontWeight: '750', fontFamily: 'var(--font-heading)',
                        color: 'var(--accent-indigo)',
                      }}>
                        <Building2 size={15} /> {exp.company}
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
                      fontWeight: '750',
                      fontFamily: 'var(--font-heading)',
                      padding: '0.32rem 0.85rem',
                      borderRadius: '9999px',
                      background: 'rgba(99,102,241,0.12)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      color: 'var(--accent-indigo)',
                    }}>
                      <Calendar size={13} /> {exp.period}
                    </span>
                  )}
                </div>

                {/* Role Description */}
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.94rem',
                  lineHeight: '1.8',
                  marginBottom: '1.25rem',
                }}>
                  {exp.description}
                </p>

                {/* Key Achievements Bullet Items */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                        <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ lineHeight: '1.6' }}>{item}</span>
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
