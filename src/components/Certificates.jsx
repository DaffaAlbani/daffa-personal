import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Award, ExternalLink, Calendar, CheckCircle2, BadgeCheck, X, ZoomIn, Hash } from 'lucide-react';

export const Certificates = () => {
  const { profile } = useProfile();
  const [previewCert, setPreviewCert] = useState(null);

  // Scroll lock when preview certificate modal is active
  useEffect(() => {
    if (previewCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [previewCert]);

  const certificatesList = profile.certificates || [];

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
            <span className="gradient-text">Kredensial Terverifikasi</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Pengakuan kompetensi profesional dari lembaga dan platform terpercaya.
          </p>
        </div>

        {/* Empty State Banner */}
        {certificatesList.length === 0 ? (
          <div className="glass-panel reveal-on-scroll" style={{
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
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-cyan)',
            }}>
              <BadgeCheck size={26} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                Belum Ada Sertifikat Ditampilkan
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Sertifikat dan lisensi kompetensi dapat ditambahkan kapan saja melalui Panel Admin.
              </p>
            </div>
          </div>
        ) : (
          /* Certificates Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '1.85rem',
          }}>
            {certificatesList.map((cert, idx) => (
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
              {/* Banner Image with Zoom Preview */}
              <div
                style={{
                  position: 'relative',
                  height: '185px',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, rgba(56,189,248,0.1), rgba(129,140,248,0.12), rgba(192,132,252,0.1))',
                  cursor: 'pointer',
                }}
                onClick={() => setPreviewCert(cert)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {/* Dark Gradient Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(6,10,18,0.65) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }} />

                {/* Verified Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.85rem',
                  left: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(52,211,153,0.92)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(52,211,153,0.3)',
                }}>
                  <CheckCircle2 size={11} /> Terverifikasi
                </div>

                {/* Zoom Preview Icon */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.85rem',
                  right: '0.85rem',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                  <ZoomIn size={14} />
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.45rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    marginBottom: '0.55rem',
                    lineHeight: '1.4',
                    letterSpacing: '-0.01em',
                  }}>
                    {cert.title}
                  </h3>

                  {/* Issuer Organization */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    marginBottom: '0.55rem',
                  }}>
                    <Award size={15} color="var(--accent-indigo)" />
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--accent-indigo)',
                    }}>
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Date & Credential ID Row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1.15rem' }}>
                    {cert.date && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        color: 'var(--text-dim)',
                        fontWeight: '600',
                        fontFamily: 'var(--font-heading)',
                      }}>
                        <Calendar size={12} /> {cert.date}
                      </div>
                    )}
                    {cert.credentialId && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        color: 'var(--text-dim)',
                        fontWeight: '600',
                        fontFamily: 'var(--font-heading)',
                        background: 'rgba(255,255,255,0.03)',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                      }}>
                        <Hash size={10} /> {cert.credentialId}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Credential Link */}
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
                    Verifikasi Lisensi <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

      </div>

      {/* ── Certificate Image Lightbox Preview Modal ── */}
      {previewCert && (
        <div
          className="modal-overlay"
          onClick={() => setPreviewCert(null)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '680px',
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Lightbox Image */}
            <img
              src={previewCert.image}
              alt={previewCert.title}
              style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', display: 'block', background: '#000' }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => setPreviewCert(null)}
              aria-label="Tutup preview sertifikat"
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>

            {/* Lightbox Caption Footer */}
            <div style={{ padding: '1.35rem 1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                {previewCert.title}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--accent-indigo)', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>
                  <Award size={14} /> {previewCert.issuer}
                </span>
                {previewCert.date && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    • {previewCert.date}
                  </span>
                )}
              </div>
              {previewCert.credentialUrl && (
                <a
                  href={previewCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ marginTop: '1rem', gap: '0.4rem' }}
                >
                  Buka Kredensial Asli <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
