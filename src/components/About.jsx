import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Cpu, UserCheck, Target, Sparkles, Terminal,
  Server, Database, GraduationCap, MapPin, Layers, Award,
} from 'lucide-react';

/* Map skill level % to readable label & theme color */
const getLevelLabel = (level) => {
  if (level >= 88) return { label: 'Mastery / Expert', color: 'var(--accent-cyan)' };
  if (level >= 75) return { label: 'Advanced', color: 'var(--accent-indigo)' };
  if (level >= 50) return { label: 'Intermediate', color: 'var(--accent-purple)' };
  return { label: 'Foundational', color: 'var(--accent-amber)' };
};

/* High-craft Skill Card Component */
const SkillCard = ({ skill }) => {
  const { label, color } = getLevelLabel(skill.level);

  return (
    <div className="bento-card" style={{
      padding: '1.15rem 1.35rem',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 12px 25px -6px ${color}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Skill Title & Level Label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: '750',
            fontSize: '0.95rem',
            color: 'var(--text-main)',
          }}>
            {skill.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            color,
            background: color + '15',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            letterSpacing: '0.04em',
            border: `1px solid ${color}35`,
          }}>
            {label}
          </span>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '850',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-heading)',
          }}>
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div style={{
        width: '100%',
        height: '8px',
        background: 'var(--bg-surface)',
        borderRadius: '9999px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        padding: '1px',
      }}>
        <div style={{
          width: `${skill.level}%`,
          height: '100%',
          background: `linear-gradient(90deg, #38BDF8 0%, ${color} 100%)`,
          borderRadius: '9999px',
          position: 'relative',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: `0 0 10px ${color}66`,
        }}>
          {/* Shimmer Highlight */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
            borderRadius: '9999px',
          }} />
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('bio');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  /* Get unique categories */
  const categories = ['Semua', ...new Set((profile.skills || []).map(s => s.category || 'Lainnya'))];

  /* Filter skills */
  const filteredSkills = (profile.skills || []).filter(s => {
    if (selectedCategory === 'Semua') return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <UserCheck size={12} style={{ marginRight: '0.25rem' }} />
              Tentang Saya
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Profil & <span className="gradient-text">Arsitektur Keahlian</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Latar belakang akademik, rekayasa perangkat lunak backend, dan integrasi hardware IoT.
          </p>
        </div>

        {/* ── Bento Grid: Identity & Foundations ── */}
        <div className="bento-grid" style={{ marginBottom: '2.5rem' }}>

          {/* ── Bento Tile 1: Tabbed Biography & Vision (Span 8) ── */}
          <div className="bento-col-8 bento-card reveal-on-scroll" style={{
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transitionDelay: '0.1s',
          }}>
            {/* Bio Tab Header */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
                marginBottom: '1.5rem',
                overflowX: 'auto',
              }}>
                {[
                  { id: 'bio', label: 'Latar Belakang & Bio', icon: <UserCheck size={15} /> },
                  { id: 'focus', label: 'Fokus & Spesialisasi', icon: <Target size={15} /> },
                  { id: 'philosophy', label: 'Visi Engineering', icon: <Terminal size={15} /> },
                ].map(tab => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.15rem',
                        borderRadius: '9999px',
                        fontSize: '0.84rem',
                        fontWeight: '750',
                        fontFamily: 'var(--font-heading)',
                        cursor: 'pointer',
                        border: active ? 'none' : '1px solid var(--border-color)',
                        transition: 'all 0.22s ease',
                        background: active ? 'var(--gradient-brand)' : 'var(--bg-card)',
                        color: active ? '#FFF' : 'var(--text-muted)',
                        boxShadow: active ? '0 4px 15px rgba(6, 182, 212, 0.35)' : 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div style={{ minHeight: '140px' }}>
                {activeTab === 'bio' && (
                  <div style={{ lineHeight: '1.85', color: 'var(--text-main)', fontSize: '0.98rem' }}>
                    <p style={{ marginBottom: '1rem' }}>
                      Saya adalah mahasiswa <strong>Information Technology</strong> di Fakultas Vokasi Universitas Brawijaya (2024–Present) dengan antusiasme mendalam pada rekayasa backend, pemodelan skema relasional MySQL, serta integrasi mikrokontroler IoT (ESP32).
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Berfokus pada pembuatan RESTful API yang andal, penulisan clean code yang modular, pemodelan ERD terstruktur, serta aktif berkontribusi dalam kegiatan organisasi dan pembinaan teknologi.
                    </p>
                  </div>
                )}

                {activeTab === 'focus' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <Server size={18} color="var(--accent-cyan)" style={{ marginBottom: '0.4rem' }} />
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '750', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>Backend Architecture</h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Pembangunan REST API aman dan modular menggunakan PHP & Framework Laravel.</p>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <Database size={18} color="var(--accent-indigo)" style={{ marginBottom: '0.4rem' }} />
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '750', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>Database Modeling</h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Pemodelan relasional ERD, normalisasi basis data, dan optimasi query.</p>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <Cpu size={18} color="var(--accent-purple)" style={{ marginBottom: '0.4rem' }} />
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '750', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>IoT & Embedded Systems</h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Integrasi ESP32, sensor cerdas, aktuator, dan protokol komunikasi IoT.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'philosophy' && (
                  <div style={{ padding: '1.35rem', background: 'rgba(6, 182, 212, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'var(--accent-cyan)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={18} /> Pragmatic Engineering & System Reliability
                    </h4>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: '1.75' }}>
                      "Kode yang baik adalah kode yang menyelesaikan masalah nyata dengan efisiensi tinggi, mudah dirawat (maintainable), dan memiliki struktur arsitektur yang solid antara backend dan perangkat fisik."
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Bento Tile 2: Academic & Fast Facts (Span 4) ── */}
          <div className="bento-col-4 bento-card reveal-on-scroll" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transitionDelay: '0.15s',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    Akademik
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Universitas Brawijaya</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '0.85rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '750', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-heading)' }}>
                    Program Studi
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '750', color: 'var(--text-main)', marginTop: '2px' }}>
                    Information Technology
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    Fakultas Vokasi (2024 – Present)
                  </div>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '750', color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-heading)' }}>
                    Domisili & Lokasi
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '750', color: 'var(--text-main)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="var(--accent-indigo)" /> {profile.location}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}>
              <Award size={18} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-emerald)', fontFamily: 'var(--font-heading)' }}>
                Active Contributor & Researcher
              </span>
            </div>
          </div>

        </div>

        {/* ── Technical Skills Matrix & Filter Bar ── */}
        <div className="reveal-on-scroll" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem',
          transitionDelay: '0.2s',
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '850', color: 'var(--text-main)' }}>
              Matriks Keahlian & <span className="gradient-text">Kompetensi Teknis</span>
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Tingkat kemahiran terukur pada setiap tech stack dan instrumen rekayasa.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '750',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: active ? 'none' : '1px solid var(--border-color)',
                    transition: 'all 0.2s ease',
                    background: active ? 'var(--gradient-brand)' : 'var(--bg-card)',
                    color: active ? '#FFF' : 'var(--text-muted)',
                    boxShadow: active ? '0 4px 15px rgba(6, 182, 212, 0.35)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {filteredSkills.map((skill, idx) => (
            <SkillCard key={skill.name || idx} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  );
};
