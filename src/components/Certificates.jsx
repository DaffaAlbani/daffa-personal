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
              <BadgeCheck size={12} style={{ marginRight: '0.25rem' }} />
              Sertifikasi & Lisensi
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Kredensial & <span className="gradient-text">Sertifikasi Resmi</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Validasi kompetensi teknis, sertifikat pelatihan, dan pencapaian kompetisi.
          </p>
        </div>

        {/* Empty State Banner */}
        {certificatesList.length === 0 ? (
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
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-cyan)',
            }}>
              <BadgeCheck size={28} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                Belum Ada Sertifikat Ditampilkan
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Sertifikat dan lisensi kompetensi dapat ditambahkan kapan saja melalui Panel Admin.
              </p>
            </div>
          </div>
        ) : (
          /* Certificates Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.85rem',
          }}>
            {certificatesList.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="bento-card reveal-on-scroll"
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
                  height: '190px',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, rgba(6,182,212,0.1), rgba(99,102,241,0.12), rgba(168,85,247,0.1))',
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
                  background: 'linear-gradient(to top, rgba(3,7,18,0.75) 0%, transparent 55%)',
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
                  background: 'rgba(16,185,129,0.95)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  padding: '0.28rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
                }}>
                  <CheckCircle2 size={11} /> Terverifikasi
                </div>

                {/* Zoom Preview Icon */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.85rem',
                  right: '0.85rem',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}>
                  <ZoomIn size={15} />
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
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
                    marginBottom: '0.65rem',
                  }}>
                    <Award size={16} color="var(--accent-indigo)" />
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '750',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--accent-indigo)',
                    }}>
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Date & Credential ID Row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1.25rem' }}>
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
                        <Calendar size={13} /> {cert.date}
                      </div>
                    )}
                    {cert.credentialId && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        color: 'var(--text-dim)',
                        fontWeight: '700',
                        fontFamily: 'var(--font-code)',
                        background: 'var(--bg-surface)',
                        padding: '0.18rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                      }}>
                        <Hash size={11} /> {cert.credentialId}
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
                      fontSize: '0.8rem',
                      alignSelf: 'flex-start',
                      gap: '0.4rem',
                    }}
                  >
                    Verifikasi Lisensi <ExternalLink size={13} />
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
            className="bento-card"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '700px',
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 40px 90px -20px rgba(0,0,0,0.85)',
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
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#FFF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>

            {/* Lightbox Caption Footer */}
            <div style={{ padding: '1.5rem 1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '850', fontSize: '1.15rem', marginBottom: '0.4rem' }}>
                {previewCert.title}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem', color: 'var(--accent-indigo)', fontWeight: '750', fontFamily: 'var(--font-heading)' }}>
                  <Award size={15} /> {previewCert.issuer}
                </span>
                {previewCert.date && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
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
                  style={{ marginTop: '1.15rem', gap: '0.45rem' }}
                >
                  Buka Kredensial Asli <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
