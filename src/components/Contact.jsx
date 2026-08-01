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
      showToast('Mohon lengkapi semua kolom formulir!', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Pesan Anda berhasil dikirim! Terima kasih.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <h2 className="section-title reveal-on-scroll">Hubungi Saya</h2>
        <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          Punya ide proyek, penawaran magang/freelance, atau tertarik berkolaborasi? Silakan hubungi saya di bawah ini.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Info Card */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2rem', transitionDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MessageSquare size={22} color="var(--accent-cyan)" /> Informasi Kontak
            </h3>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
              Saya terbuka untuk peluang Magang (*Internship*), Proyek Freelance, maupun posisi AI Tutor/Data Trainer.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={iconBoxStyle}>
                  <Mail size={20} color="var(--accent-cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '600' }}>EMAIL KAMPUS / UTAMA</div>
                  <a href={`mailto:${profile.email}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600' }}>
                    {profile.email}
                  </a>
                </div>
              </div>

              {profile.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={iconBoxStyle}>
                    <Phone size={20} color="var(--accent-emerald)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '600' }}>TELEPON / WHATSAPP</div>
                    <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600' }}>
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={iconBoxStyle}>
                  <MapPin size={20} color="var(--accent-indigo)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '600' }}>LOKASI</div>
                  <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Badge */}
            <div style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <CheckCircle2 size={20} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Status: <strong>Aktif Kuliah @ Universitas Brawijaya</strong>
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2rem', transitionDelay: '0.3s' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>Pesan Terkirim!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Terima kasih telah menghubungi. Saya akan segera merespons ke email Anda.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subjek / Penawaran</label>
                  <input
                    type="text"
                    placeholder="Misal: Penawaran Magang / Project Freelance"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan Anda *</label>
                  <textarea
                    required
                    placeholder="Tuliskan detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {isSubmitting ? 'Mengirim Pesan...' : <>Kirim Pesan Sekarang <Send size={16} /></>}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

const iconBoxStyle = {
  width: '42px',
  height: '42px',
  borderRadius: 'var(--radius-sm)',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
