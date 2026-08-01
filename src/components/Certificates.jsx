import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

export const Certificates = () => {
  const { profile } = useProfile();

  if (!profile.certificates || profile.certificates.length === 0) return null;

  return (
    <section id="certificates" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <h2 className="section-title reveal-on-scroll">Sertifikat & Kompetensi</h2>
        <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          Daftar sertifikasi profesional, lisensi kelulusan, dan penghargaan kompetensi yang telah saya raih.
        </p>

        {/* Certificates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {profile.certificates.map((cert, idx) => (
            <div key={cert.id || idx} className="glass-panel reveal-on-scroll" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transitionDelay: `${0.1 * (idx % 3)}s` }}>
              
              {/* Certificate Image Banner */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Verified Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(16, 185, 129, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFF',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <CheckCircle2 size={13} /> Terverifikasi
                </div>
              </div>

              {/* Certificate Card Content */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Award size={20} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {cert.title}
                  </h3>

                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '600', marginBottom: '0.8rem', paddingLeft: '1.75rem' }}>
                    {cert.issuer}
                  </div>

                  {cert.date && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.75rem', marginBottom: '1.25rem' }}>
                      <Calendar size={13} color="var(--accent-cyan)" />
                      <span>Diterbitkan: {cert.date}</span>
                    </div>
                  )}
                </div>

                {/* Credential URL Button */}
                {cert.credentialUrl && (
                  <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.8rem' }}
                    >
                      Lihat Lisensi <ExternalLink size={14} />
                    </a>
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
