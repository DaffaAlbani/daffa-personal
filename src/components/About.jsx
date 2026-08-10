import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Cpu, UserCheck, BarChart3, Target, Sparkles, Terminal, Code2, Server, Database, Shield } from 'lucide-react';

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
    <div className="glass-panel" style={{
      padding: '1rem 1.25rem',
      borderRadius: 'var(--radius-sm)',
      background: 'rgba(13, 20, 38, 0.65)',
      border: '1px solid var(--border-color)',
      transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '66';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 10px 25px -5px ${color}25`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Skill Title & Level Label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}`,
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            fontSize: '0.92rem',
            color: 'var(--text-main)',
          }}>
            {skill.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color,
            background: color + '15',
            padding: '0.18rem 0.6rem',
            borderRadius: '9999px',
            letterSpacing: '0.04em',
            border: `1px solid ${color}30`,
          }}>
            {label}
          </span>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: '800',
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
        height: '7px',
        background: 'rgba(6, 10, 18, 0.8)',
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
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
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
              <UserCheck size={11} style={{ marginRight: '0.25rem' }} />
              Tentang Saya
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Kenali Lebih{' '}
            <span className="gradient-text">Dekat</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Latar belakang akademik, arsitektur sistem backend, dan keahlian rekayasa teknologi saya.
          </p>
        </div>

        {/* ── Tabbed Bio Card Showcase ── */}
        <div className="glass-panel reveal-on-scroll" style={{
          padding: '2rem',
          marginBottom: '3rem',
          transitionDelay: '0.12s',
        }}>
          {/* Bio Tab Header */}
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
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.22s ease',
                    background: active ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.04)',
                    color: active ? '#FFF' : 'var(--text-muted)',
                    boxShadow: active ? 'var(--shadow-btn)' : 'none',
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
          <div style={{ minHeight: '130px' }}>
            {activeTab === 'bio' && (
              <div style={{ lineHeight: '1.85', color: 'var(--text-main)', fontSize: '1rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  Saya adalah mahasiswa <strong>Information Technology</strong> di Fakultas Vokasi Universitas Brawijaya (2024–Present) dengan minat tinggi pada rekayasa perangkat lunak backend, pemodelan skema basis data terstruktur (Laravel & MySQL), serta sistem Internet of Things (IoT).
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  Berpengalaman dalam merancang arsitektur RESTful API, pemodelan ERD, penulisan kode bersih (clean code), dokumentasi teknis yang jelas, serta aktif berkontribusi dalam organisasi kemahasiswaan dan bimbingan belajar AI/pemrograman.
                </p>
              </div>
            )}

            {activeTab === 'focus' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <Server size={20} color="var(--accent-cyan)" style={{ marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem' }}>Backend Architecture</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Pembangunan REST API berkinerja tinggi menggunakan PHP & Framework Laravel.</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <Database size={20} color="var(--accent-indigo)" style={{ marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem' }}>Database Modeling</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Pemodelan ERD, normalisasi relasional MySQL, dan optimasi query.</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <Cpu size={20} color="var(--accent-purple)" style={{ marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem' }}>IoT & Embedded Systems</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Integrasi mikrokontroler ESP32, sensor cerdas, dan pengiriman data terenkripsi.</p>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div style={{ padding: '1.25rem', background: 'rgba(56,189,248,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(56,189,248,0.2)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'var(--accent-cyan)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} /> Pragmatic Cybernetic Engineering
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: '1.75' }}>
                  "Setiap baris kode yang ditulis harus modular, mudah dipelihara, dan menyelesaikan masalah nyata. Menggabungkan arsitektur backend yang solid dengan integrasi hardware IoT dan estetika visual tingkat tinggi."
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Technical Skills Filter Bar & Matrix ── */}
        <div className="section-title-wrapper" style={{ textLeft: 'left', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
              Matriks Keahlian & <span className="gradient-text">Kompetensi</span>
            </h3>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {categories.map(cat => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.38rem 0.95rem',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-heading)',
                      cursor: 'pointer',
                      border: active ? 'none' : '1px solid var(--border-color)',
                      transition: 'all 0.2s ease',
                      background: active ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.04)',
                      color: active ? '#FFF' : 'var(--text-muted)',
                      boxShadow: active ? 'var(--shadow-btn)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.15rem',
        }}>
          {filteredSkills.map((skill, idx) => (
            <SkillCard key={skill.name || idx} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  );
};
