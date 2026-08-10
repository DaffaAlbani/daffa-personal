import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ExternalLink, Search, FolderGit2, X, FolderOpen } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects = () => {
  const { profile } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = ['Semua', ...new Set(profile.projects?.map(p => p.category) || [])];

  const filteredProjects = profile.projects?.filter(project => {
    const matchesCategory = selectedCategory === 'Semua' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="section-badge">
              <FolderOpen size={11} style={{ marginRight: '0.25rem' }} />
              Portofolio
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Karya &{' '}
            <span className="gradient-text">Proyek</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Kumpulan proyek akademik, aplikasi web, dan karya teknologi yang telah saya bangun.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="reveal-on-scroll" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          transitionDelay: '0.15s',
        }}>
          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.42rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    background: active
                      ? 'var(--gradient-brand)'
                      : 'rgba(255,255,255,0.05)',
                    color: active ? '#FFF' : 'var(--text-muted)',
                    boxShadow: active ? 'var(--shadow-btn)' : 'none',
                    borderWidth: active ? 0 : '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--border-color)',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search
              size={15}
              color="var(--text-dim)"
              style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Cari proyek atau skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem', borderRadius: '9999px', fontSize: '0.85rem', height: '38px', padding: '0 1rem 0 2.5rem' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || project.title}
              className="glass-panel reveal-on-scroll"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transitionDelay: `${0.07 * (index % 3)}s`,
              }}
            >
              {/* Thumbnail */}
              <div
                style={{ position: 'relative', height: '195px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setActiveProjectModal(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {/* Dark overlay gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(6,10,18,0.6) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }} />
                {/* Project Number */}
                <div style={{
                  position: 'absolute', top: '0.9rem', left: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800',
                  fontSize: '0.68rem',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.08em',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                }}>
                  #{String(index + 1).padStart(2, '0')}
                </div>
                {/* Category Badge */}
                {project.category && (
                  <span style={{
                    position: 'absolute', top: '0.9rem', right: '0.9rem',
                    background: 'rgba(6,10,18,0.8)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-heading)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(56,189,248,0.25)',
                    letterSpacing: '0.04em',
                  }}>
                    {project.category}
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.35rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    onClick={() => setActiveProjectModal(project)}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      marginBottom: '0.45rem',
                      cursor: 'pointer',
                      color: 'var(--text-main)',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-indigo)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                  >
                    {project.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.87rem',
                    marginBottom: '1rem',
                    lineHeight: '1.65',
                  }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                      {project.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: '600',
                          padding: '0.18rem 0.6rem',
                          borderRadius: '6px',
                          background: 'rgba(129,140,248,0.08)',
                          border: '1px solid rgba(129,140,248,0.18)',
                          color: 'var(--accent-indigo)',
                          letterSpacing: '0.02em',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Links */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-color)',
                }}>
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{ fontSize: '0.78rem' }}>
                      Live Demo <ExternalLink size={13} />
                    </a>
                  ) : <div />}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary" style={{ fontSize: '0.78rem' }}>
                      <GithubIcon size={13} /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
            <FolderGit2 size={52} style={{ opacity: 0.3, marginBottom: '1rem', display: 'block', margin: '0 auto 1rem auto' }} />
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
              Tidak ada proyek untuk "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* ── Project Detail Modal ── */}
      {activeProjectModal && (
        <div className="modal-overlay" onClick={() => setActiveProjectModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700' }}>
                  {activeProjectModal.title}
                </h3>
                {activeProjectModal.category && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                    {activeProjectModal.category}
                  </span>
                )}
              </div>
              <button className="modal-close" onClick={() => setActiveProjectModal(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                style={{
                  width: '100%', height: '260px', objectFit: 'cover',
                  borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'block',
                }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <p style={{
                color: 'var(--text-muted)', fontSize: '0.98rem',
                lineHeight: '1.75', marginBottom: '1.5rem',
              }}>
                {activeProjectModal.description}
              </p>
              {activeProjectModal.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {activeProjectModal.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.8rem', fontWeight: '600', fontFamily: 'var(--font-heading)',
                      padding: '0.3rem 0.8rem', borderRadius: '9999px',
                      background: 'rgba(129,140,248,0.12)',
                      color: 'var(--accent-indigo)',
                      border: '1px solid rgba(129,140,248,0.25)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'flex-end' }}>
                {activeProjectModal.githubUrl && (
                  <a href={activeProjectModal.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <GithubIcon size={16} /> Repository
                  </a>
                )}
                {activeProjectModal.demoUrl && (
                  <a href={activeProjectModal.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Lihat Demo <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
