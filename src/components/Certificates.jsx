import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Award, ExternalLink, Calendar, CheckCircle2, BadgeCheck } from 'lucide-react';

export const Certificates = () => {
  const { profile } = useProfile();
  if (!profile.certificates || profile.certificates.length === 0) return null;

  return (
    <section id="certificates" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <BadgeCheck size={11} style={{ marginRight: '0.25rem' }} />
              Sertifikasi
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Sertifikat &{' '}
            <span className="gradient-text">Kompetensi</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Sertifikasi profesional dan pengakuan kompetensi yang telah saya raih.
          </p>
        </div>

        {/* Certificates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '1.75rem',
        }}>
          {profile.certificates.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="glass-panel reveal-on-scroll"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transitionDelay: `${0.07 * (idx % 3)}s`,
              }}
            >
              {/* Banner Image */}
              <div style={{
                position: 'relative',
                height: '170px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(129,140,248,0.15), rgba(192,132,252,0.15))',
              }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(6,10,18,0.55) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }} />
                {/* Verified Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.85rem',
                  left: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(52,211,153,0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFF',
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  fontFamily: 'var(--font-heading)',
                  padding: '0.28rem 0.7rem',
                  borderRadius: '9999px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}>
                  <CheckCircle2 size={11} /> Terverifikasi
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.35rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--text-main)',
                    marginBottom: '0.45rem',
                    lineHeight: '1.4',
                    letterSpacing: '-0.01em',
                  }}>
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '0.6rem',
                  }}>
                    <Award size={14} color="var(--accent-indigo)" />
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--accent-indigo)',
                    }}>
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Date */}
                  {cert.date && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                      color: 'var(--text-dim)',
                      marginBottom: '1rem',
                    }}>
                      <Calendar size={12} color="var(--text-dim)" />
                      <span>{cert.date}</span>
                    </div>
                  )}
                </div>

                {/* Credential Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-secondary"
                    style={{
                      fontSize: '0.78rem',
                      alignSelf: 'flex-start',
                      gap: '0.4rem',
                    }}
                  >
                    Lihat Lisensi <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
