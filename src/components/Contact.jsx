import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2, Phone } from 'lucide-react';

export const Contact = () => {
  const { profile, showToast } = useProfile();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Mohon lengkapi semua kolom!', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Pesan berhasil dikirim! Terima kasih.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const contactItems = [
    {
      icon: <Mail size={20} />,
      label: 'EMAIL UTAMA',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: '#38BDF8',
    },
    ...(profile.phone ? [{
      icon: <Phone size={20} />,
      label: 'TELEPON / WHATSAPP',
      value: profile.phone,
      href: `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`,
      color: '#34D399',
      external: true,
    }] : []),
    {
      icon: <MapPin size={20} />,
      label: 'LOKASI',
      value: profile.location,
      href: null,
      color: '#818CF8',
    },
  ];

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <MessageSquare size={11} style={{ marginRight: '0.25rem' }} />
              Kontak
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Mari{' '}
            <span className="gradient-text">Berkolaborasi</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Terbuka untuk peluang magang, proyek freelance, maupun kolaborasi teknis lainnya.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* ── Info Card ── */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2rem', transitionDelay: '0.15s' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <MessageSquare size={18} color="var(--accent-cyan)" />
              Informasi Kontak
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.75', fontSize: '0.93rem' }}>
              Saya terbuka untuk peluang <strong style={{ color: 'var(--text-main)' }}>Magang</strong>,{' '}
              <strong style={{ color: 'var(--text-main)' }}>Freelance</strong>, maupun posisi{' '}
              <strong style={{ color: 'var(--text-main)' }}>AI Tutor / Data Trainer</strong>.
            </p>

            {/* Contact Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              {contactItems.map(({ icon, label, value, href, color, external }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    borderRadius: '12px',
                    background: color + '15',
                    border: `1px solid ${color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color,
                    flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.68rem',
                      color: 'var(--text-dim)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.18rem',
                    }}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        style={{
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.92rem',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = color}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.92rem' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability Card */}
            <div style={{
              background: 'rgba(56,189,248,0.06)',
              border: '1px solid rgba(56,189,248,0.18)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 10px var(--accent-emerald)',
                flexShrink: 0,
                animation: 'pulse-dot 2s infinite',
              }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Status: <strong style={{ color: 'var(--text-main)' }}>Aktif Kuliah @ Universitas Brawijaya</strong>
              </span>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2rem', transitionDelay: '0.22s' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{
                  width: '68px', height: '68px',
                  borderRadius: '50%',
                  background: 'rgba(52,211,153,0.12)',
                  border: '2px solid rgba(52,211,153,0.3)',
                  color: 'var(--accent-emerald)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                }}>
                  <CheckCircle2 size={34} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}>
                  Pesan Terkirim!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: '1.7' }}>
                  Terima kasih telah menghubungi saya. Saya akan segera merespons ke email Anda.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subjek / Penawaran</label>
                  <input
                    type="text"
                    placeholder="Misal: Penawaran Magang / Freelance"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan Anda *</label>
                  <textarea
                    required
                    placeholder="Tuliskan detail pesan Anda..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting
                    ? 'Mengirim...'
                    : <><Send size={15} /> Kirim Pesan</>
                  }
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
