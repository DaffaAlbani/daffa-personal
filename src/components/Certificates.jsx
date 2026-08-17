import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Award, ExternalLink, Calendar, CheckCircle2, BadgeCheck, X, ZoomIn, Hash } from 'lucide-react';

export const Certificates = () => {
  const { profile } = useProfile();
  const [previewCert, setPreviewCert] = useState(null);

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
    <section id="certificates" className="section-padding">
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <span className="section-badge">
              <BadgeCheck size={11} style={{ marginRight: '0.25rem' }} />
              Sertifikasi
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Kredensial Terverifikasi
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>
            Sertifikat pelatihan profesional, lisensi keahlian, dan pengakuan kompetisi.
          </p>
        </div>

        {certificatesList.length === 0 ? (
          <div className="craft-card reveal-on-scroll" style={{
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <BadgeCheck size={28} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '750', marginBottom: '0.25rem' }}>
              Belum Ada Sertifikat Ditampilkan
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Sertifikat dapat ditambahkan melalui Panel Admin.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '1.5rem',
          }}>
            {certificatesList.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="craft-card reveal-on-scroll"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transitionDelay: `${0.05 * (idx % 3)}s`,
                }}
              >
                {/* Thumbnail Preview */}
                <div
                  style={{
                    position: 'relative',
                    height: '180px',
                    overflow: 'hidden',
                    background: 'var(--bg-surface)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setPreviewCert(cert)}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Verified Badge */}
                  <div style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(6px)',
                    color: 'var(--accent-emerald)',
                    fontSize: '0.68rem', fontWeight: '700', fontFamily: 'var(--font-heading)',
                    padding: '0.22rem 0.6rem', borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-color)',
                  }}>
                    <CheckCircle2 size={11} /> Terverifikasi
                  </div>

                  <div style={{
                    position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                    width: '28px', height: '28px', borderRadius: 'var(--radius-xs)',
                    background: 'rgba(9,9,11,0.7)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FFF', border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <ZoomIn size={13} />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.02rem',
                      fontWeight: '750',
                      color: 'var(--text-main)',
                      marginBottom: '0.45rem',
                      lineHeight: '1.4',
                    }}>
                      {cert.title}
                    </h3>

                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-muted)',
                      marginBottom: '0.65rem',
                    }}>
                      <Award size={14} color="var(--text-dim)" />
                      <span>{cert.issuer}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                      {cert.date && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                          <Calendar size={12} /> {cert.date}
                        </div>
                      )}
                      {cert.credentialId && (
                        <div style={{
                          fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-code)',
                          background: 'var(--bg-surface)', padding: '0.12rem 0.5rem', borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                        }}>
                          #{cert.credentialId}
                        </div>
                      )}
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-secondary"
                      style={{ alignSelf: 'flex-start', gap: '0.35rem' }}
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

      {/* Lightbox Preview */}
      {previewCert && (
        <div
          className="modal-overlay"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: 0, overflow: 'hidden' }}
          >
            <img
              src={previewCert.image}
              alt={previewCert.title}
              style={{ width: '100%', maxHeight: '440px', objectFit: 'contain', display: 'block', background: '#000' }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
              }}
            />

            <button
              onClick={() => setPreviewCert(null)}
              aria-label="Tutup preview"
              style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                width: '32px', height: '32px', borderRadius: 'var(--radius-xs)',
                background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ padding: '1.25rem 1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '750', marginBottom: '0.3rem' }}>
                {previewCert.title}
              </h4>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {previewCert.issuer} {previewCert.date && `• ${previewCert.date}`}
              </div>
              {previewCert.credentialUrl && (
                <a
                  href={previewCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
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
