import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Server, Database, Cpu, UserCheck, Target, GraduationCap, MapPin
} from 'lucide-react';

/* Minimalist Skill Card */
const SkillCard = ({ skill }) => {
  return (
    <div className="craft-card" style={{
      padding: '1rem 1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          fontSize: '0.92rem',
          color: 'var(--text-main)',
        }}>
          {skill.name}
        </span>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: '700',
          fontFamily: 'var(--font-code)',
          color: 'var(--text-muted)',
        }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress Track */}
      <div style={{
        width: '100%',
        height: '6px',
        background: 'var(--bg-surface)',
        borderRadius: '9999px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{
          width: `${skill.level}%`,
          height: '100%',
          background: 'var(--text-main)',
          borderRadius: '9999px',
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
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
    <section id="about" className="section-padding">
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <span className="section-badge">
              <UserCheck size={11} style={{ marginRight: '0.25rem' }} />
              Tentang Saya
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Latar Belakang & Spesialisasi
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>
            Rekayasa perangkat lunak backend, pemodelan basis data, dan integrasi perangkat keras IoT.
          </p>
        </div>

        {/* ── Top Row: Bio & Focus Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>

          {/* Bio Tabbed Card */}
          <div className="craft-card reveal-on-scroll" style={{ padding: '1.75rem', transitionDelay: '0.08s' }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.4rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.85rem',
              marginBottom: '1.25rem',
            }}>
              {[
                { id: 'bio', label: 'Ringkasan Profil' },
                { id: 'academic', label: 'Latar Akademik' },
                { id: 'focus', label: 'Fokus Rekayasa' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.82rem',
                    fontWeight: activeTab === tab.id ? '700' : '500',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    background: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--text-main)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ minHeight: '140px', fontSize: '0.94rem', lineHeight: '1.75' }}>
              {activeTab === 'bio' && (
                <div>
                  <p style={{ marginBottom: '0.85rem', color: 'var(--text-main)' }}>
                    Saya adalah mahasiswa <strong>Information Technology</strong> di Fakultas Vokasi Universitas Brawijaya (2024–Present) dengan fokus pada rekayasa backend, pemodelan skema relasional MySQL, dan integrasi mikrokontroler IoT (ESP32).
                  </p>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Terbiasa membangun RESTful API yang aman dan modular, penulisan clean code, dokumentasi teknis, serta aktif berkontribusi dalam organisasi kemahasiswaan dan bimbingan belajar AI/pemrograman.
                  </p>
                </div>
              )}

              {activeTab === 'academic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: '600' }}>
                    <GraduationCap size={16} color="var(--text-muted)" />
                    <span>Universitas Brawijaya — D3 Information Technology</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <MapPin size={15} color="var(--text-muted)" />
                    <span>{profile.location}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Fokus studi: Rekayasa Perangkat Lunak, Basis Data Relasional, Sistem Tertanam IoT, Jaringan Komputer.
                  </p>
                </div>
              )}

              {activeTab === 'focus' && (
                <p style={{ color: 'var(--text-muted)' }}>
                  Pendekatan saya mengutamakan keandalan arsitektur (system reliability), skalabilitas database, dan integrasi hardware yang efisien untuk menyelesaikan kebutuhan industri nyata.
                </p>
              )}
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="craft-card reveal-on-scroll" style={{ padding: '1.25rem', transitionDelay: '0.12s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <Server size={18} color="var(--text-main)" />
                <h4 style={{ fontSize: '0.98rem', fontWeight: '750' }}>Backend Architecture</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Perancangan RESTful API performa tinggi, modular, dan terstruktur menggunakan PHP & Laravel.
              </p>
            </div>

            <div className="craft-card reveal-on-scroll" style={{ padding: '1.25rem', transitionDelay: '0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <Database size={18} color="var(--text-main)" />
                <h4 style={{ fontSize: '0.98rem', fontWeight: '750' }}>Database Modeling</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Pemodelan ERD, normalisasi relasional MySQL, indexing, dan optimasi query data.
              </p>
            </div>

            <div className="craft-card reveal-on-scroll" style={{ padding: '1.25rem', transitionDelay: '0.18s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <Cpu size={18} color="var(--text-main)" />
                <h4 style={{ fontSize: '0.98rem', fontWeight: '750' }}>IoT & Embedded Systems</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Pemrograman mikrokontroler ESP32 dengan C++, integrasi sensor cerdas, dan telemetri data.
              </p>
            </div>
          </div>

        </div>

        {/* ── Technical Skills Matrix ── */}
        <div className="reveal-on-scroll" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          transitionDelay: '0.2s',
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800' }}>
              Matriks Keahlian
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.78rem',
                    fontWeight: active ? '700' : '500',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    background: active ? 'var(--text-main)' : 'var(--bg-card)',
                    color: active ? 'var(--bg-main)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease',
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {filteredSkills.map((skill, idx) => (
            <SkillCard key={skill.name || idx} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  );
};
