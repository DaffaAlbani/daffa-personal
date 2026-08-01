import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

export const Experience = () => {
  const { profile } = useProfile();

  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <h2 className="section-title reveal-on-scroll">Pengalaman Kerja</h2>
        <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          Perjalanan karir profesional dan kontribusi teknis di berbagai perusahaan dan proyek skala besar.
        </p>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '10px',
            bottom: '10px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-indigo), var(--accent-purple))',
            borderRadius: '9999px'
          }} />

          {/* Experience Items */}
          {profile.experiences?.map((exp, index) => (
            <div key={index} className="reveal-on-scroll" style={{ position: 'relative', paddingLeft: '3.5rem', marginBottom: '2.5rem', transitionDelay: `${0.1 + (index * 0.1)}s` }}>
              
              {/* Timeline Bullet Node */}
              <div style={{
                position: 'absolute',
                left: '4px',
                top: '0',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--bg-main)',
                border: '2px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
              }}>
                <Briefcase size={16} color="var(--accent-cyan)" />
              </div>

              {/* Experience Content Card */}
              <div className="glass-panel" style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--accent-indigo)' }}>
                      {exp.company}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <Calendar size={14} color="var(--accent-cyan)" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {exp.description}
                </p>

                {/* Key Achievements Bullet points */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
                    {exp.achievements.map((achieve, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={14} color="var(--accent-emerald)" />
                        <span>{achieve}</span>
                      </div>
                    ))}
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
