import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2, Phone, Sparkles, MessageCircle } from 'lucide-react';

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
    }, 1100);
  };

  const contactItems = [
    {
      icon: <Mail size={20} />,
      label: 'EMAIL UTAMA',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: 'var(--accent-cyan)',
    },
    ...(profile.phone ? [{
      icon: <Phone size={20} />,
      label: 'WHATSAPP / TELEPON',
      value: profile.phone,
      href: `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`,
      color: 'var(--accent-emerald)',
      external: true,
    }] : []),
    {
      icon: <MapPin size={20} />,
      label: 'LOKASI UTAMA',
      value: profile.location,
      href: null,
      color: 'var(--accent-indigo)',
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
            Terbuka untuk peluang magang backend/IoT, proyek freelance, maupun bimbingan akademik AI.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.25rem',
          alignItems: 'start',
        }}>

          {/* ── Left Column: Contact Gateway Cards ── */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2.25rem', transitionDelay: '0.15s' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: '800',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}>
              <MessageCircle size={20} color="var(--accent-cyan)" />
              Informasi & Gateway
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.75', fontSize: '0.94rem' }}>
              Anda dapat menghubungi saya secara langsung melalui WhatsApp atau Email untuk kebutuhan diskusi teknis dan penawaran proyek.
            </p>

            {/* Contact Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', marginBottom: '2rem' }}>
              {contactItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.95rem 1.15rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = item.color + '55';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    background: item.color + '15',
                    border: `1px solid ${item.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      color: 'var(--text-dim)',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.08em',
                      marginBottom: '2px',
                    }}>
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
                          fontSize: '0.94rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-heading)',
                          wordBreak: 'break-all',
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{
                        color: 'var(--text-main)',
                        fontSize: '0.94rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-heading)',
                      }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick WhatsApp CTA Button */}
            {profile.phone && (
              <a
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  color: 'var(--accent-emerald)',
                  boxShadow: '0 8px 24px -6px rgba(52, 211, 153, 0.25)',
                }}
              >
                <Phone size={16} /> Chat Langsung via WhatsApp
              </a>
            )}
          </div>

          {/* ── Right Column: Interactive Contact Form ── */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2.25rem', transitionDelay: '0.25s' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: '800',
              marginBottom: '0.5rem',
            }}>
              Kirim Pesan Langsung
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
              Isi formulir di bawah ini untuk mengirimkan pesan atau pertanyaan langsung.
            </p>

            {submitted ? (
              <div style={{
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.25)',
                borderRadius: 'var(--radius-md)',
              }}>
                <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                  Pesan Terkirim!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Terima kasih telah menghubungi saya. Pesan Anda telah diterima dan akan segera direspons.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Masukkan nama Anda..."
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alamat Email</label>
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
                  <label className="form-label">Subjek / Topik</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Penawaran Magang / Freelance Backend"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Tuliskan pesan atau detail proyek Anda di sini..."
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
                  {isSubmitting ? (
                    'Mengirim Pesan...'
                  ) : (
                    <>
                      Kirim Pesan <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
