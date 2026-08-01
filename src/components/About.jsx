import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Code, Terminal, Cpu, Database, Award, UserCheck } from 'lucide-react';

export const About = () => {
  const { profile } = useProfile();

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <h2 className="section-title reveal-on-scroll">Tentang Saya</h2>
        <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          Mengenal lebih dekat latar belakang, keahlian teknis, dan dedikasi saya dalam pengembangan teknologi modern.
        </p>

        {/* Bio + Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          
          {/* Bio Card */}
          <div className="glass-panel reveal-on-scroll" style={{ padding: '2rem', transitionDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <UserCheck size={22} color="var(--accent-cyan)" /> Ringkasan Profil
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
              {profile.bio}
            </p>
          </div>

          {/* Stats Grid Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem'
          }}>
            {profile.stats?.map((stat, idx) => (
              <div key={idx} className="glass-panel reveal-on-scroll" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', transitionDelay: `${0.2 + (idx * 0.1)}s` }}>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', className: 'gradient-text', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.3rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Technical Skills Section */}
        <div className="glass-panel reveal-on-scroll" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Cpu size={22} color="var(--accent-purple)" /> Keahlian & Keterampilan Teknis
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {profile.skills?.map((skill, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {skill.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-cyan)', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                    {skill.category}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: 'var(--gradient-brand)',
                    borderRadius: '9999px',
                    transition: 'width 1s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
