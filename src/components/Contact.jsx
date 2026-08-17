import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

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
    }, 1000);
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
              <MessageSquare size={12} style={{ marginRight: '0.25rem' }} />
              Kontak & Kolaborasi
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Mari <span className="gradient-text">Terhubung & Berkolaborasi</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Terbuka untuk peluang rekayasa backend, pengembangan hardware IoT, proyek freelance, atau diskusi teknologi.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* ── Left Column: Contact Gateway Cards ── */}
          <div className="bento-card reveal-on-scroll" style={{ padding: '2.25rem', transitionDelay: '0.15s' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: '850',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}>
              <MessageCircle size={22} color="var(--accent-cyan)" />
              Informasi & Gateway
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8', fontSize: '0.94rem' }}>
              Silakan hubungi saya melalui jalur resmi di bawah ini atau kirimkan pesan langsung melalui formulir kontak.
            </p>

            {/* Contact Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {contactItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 10px 24px -5px ${item.color}25`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
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
                      fontSize: '0.7rem',
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
                          fontSize: '0.95rem',
                          fontWeight: '750',
                          fontFamily: 'var(--font-heading)',
                          wordBreak: 'break-all',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = item.color}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        fontWeight: '750',
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
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: 'var(--accent-emerald)',
                  boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.3)',
                }}
              >
                <Phone size={16} /> Chat Langsung via WhatsApp
              </a>
            )}
          </div>

          {/* ── Right Column: Interactive Contact Form ── */}
          <div className="bento-card reveal-on-scroll" style={{ padding: '2.25rem', transitionDelay: '0.22s' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: '850',
              marginBottom: '0.5rem',
            }}>
              Kirim Pesan Langsung
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.92rem' }}>
              Isi formulir di bawah untuk mengirimkan pesan atau penawaran proyek secara instan.
            </p>

            {submitted ? (
              <div style={{
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: 'var(--radius-md)',
              }}>
                <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '850', marginBottom: '0.5rem' }}>
                  Pesan Berhasil Terkirim!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Terima kasih telah menghubungi saya. Pesan Anda telah diterima dan akan segera direspons.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nama Anda..."
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
                    placeholder="Contoh: Diskusi Proyek IoT / Peluang Magang"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Tuliskan pesan atau kebutuhan proyek Anda di sini..."
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
