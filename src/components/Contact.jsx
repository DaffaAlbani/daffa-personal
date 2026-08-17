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
      showToast('Mohon lengkapi kolom nama, email, dan pesan!', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Pesan Anda berhasil terkirim! Terima kasih.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const contactItems = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    ...(profile.phone ? [{
      icon: <Phone size={18} />,
      label: 'WhatsApp',
      value: profile.phone,
      href: `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`,
      external: true,
    }] : []),
    {
      icon: <MapPin size={18} />,
      label: 'Lokasi',
      value: profile.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <span className="section-badge">
              <MessageSquare size={11} style={{ marginRight: '0.25rem' }} />
              Kontak
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Hubungi Saya
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>
            Terbuka untuk kolaborasi proyek backend, implementasi IoT, atau diskusi teknis.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }}>

          {/* ── Left Column: Contact Gateway ── */}
          <div className="craft-card reveal-on-scroll" style={{ padding: '1.75rem', transitionDelay: '0.08s' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '750', marginBottom: '0.5rem' }}>
              Saluran Komunikasi
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.65' }}>
              Anda dapat menghubungi saya langsung melalui email atau WhatsApp.
            </p>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {contactItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ color: 'var(--text-dim)' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : '_self'}
                        rel={item.external ? 'noreferrer' : ''}
                        style={{
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          fontSize: '0.92rem',
                          fontWeight: '600',
                          wordBreak: 'break-all',
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ color: 'var(--text-main)', fontSize: '0.92rem', fontWeight: '600' }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {profile.phone && (
              <a
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone size={15} /> Chat via WhatsApp
              </a>
            )}
          </div>

          {/* ── Right Column: Form ── */}
          <div className="craft-card reveal-on-scroll" style={{ padding: '1.75rem', transitionDelay: '0.12s' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '750', marginBottom: '0.4rem' }}>
              Kirim Pesan
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              Isi formulir di bawah ini untuk mengirimkan pesan langsung.
            </p>

            {submitted ? (
              <div style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)',
              }}>
                <CheckCircle2 size={36} color="var(--accent-emerald)" style={{ marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: '750', marginBottom: '0.35rem' }}>
                  Pesan Terkirim
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Terima kasih, pesan Anda telah terkirim dan akan segera saya balas.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Kirim Pesan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nama</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Topik</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Diskusi Proyek Backend"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Tuliskan pesan Anda di sini..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isSubmitting ? 'Mengirim...' : <>Kirim Pesan <Send size={14} /></>}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
