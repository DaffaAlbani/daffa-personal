import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ExternalLink, Search, FolderGit2, X, FolderOpen, Eye, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects = () => {
  const { profile } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  // Scroll lock when project modal is active
  useEffect(() => {
    if (activeProjectModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProjectModal]);

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
              <FolderOpen size={12} style={{ marginRight: '0.25rem' }} />
              Portofolio Karya
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Karya & <span className="gradient-text">Proyek Unggulan</span>
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.08s' }}>
            Kompilasi sistem backend terdistribusi, database terstruktur, dan rekayasa cerdas IoT.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="reveal-on-scroll" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          transitionDelay: '0.15s',
        }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  style={{
                    padding: '0.42rem 1.05rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: '750',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: active ? 'none' : '1px solid var(--border-color)',
                    transition: 'all 0.22s ease',
                    background: active ? 'var(--gradient-brand)' : 'var(--bg-card)',
                    color: active ? '#FFF' : 'var(--text-muted)',
                    boxShadow: active ? '0 4px 15px rgba(6, 182, 212, 0.35)' : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'var(--bg-card-hover)';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'var(--bg-card)';
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
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Cari proyek atau teknologi..."
              aria-label="Cari proyek berdasarkan judul, deskripsi, atau teknologi"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.65rem',
                paddingRight: searchQuery ? '2.2rem' : '1rem',
                fontSize: '0.88rem',
                borderRadius: '9999px',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Bersihkan pencarian"
                style={{
                  position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id || index}
                className="bento-card reveal-on-scroll"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  transitionDelay: `${0.07 * (index % 3)}s`,
                }}
              >
                {/* Thumbnail Header */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      display: 'block',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Overlay Gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 65%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Project Index Badge */}
                  <div style={{
                    position: 'absolute', top: '0.85rem', left: '0.85rem',
                    fontFamily: 'var(--font-code)',
                    fontWeight: '800',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '0.06em',
                    background: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    #{String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Category Pill Badge */}
                  {project.category && (
                    <span style={{
                      position: 'absolute', top: '0.85rem', right: '0.85rem',
                      background: 'rgba(3,7,18,0.88)',
                      backdropFilter: 'blur(10px)',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      fontFamily: 'var(--font-heading)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(6,182,212,0.35)',
                    }}>
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      onClick={() => setActiveProjectModal(project)}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        marginBottom: '0.55rem',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                    >
                      {project.title}
                    </h3>
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      marginBottom: '1.25rem',
                      lineHeight: '1.65',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: '700',
                              fontFamily: 'var(--font-code)',
                              padding: '0.22rem 0.6rem',
                              borderRadius: '6px',
                              background: 'rgba(56,189,248,0.08)',
                              border: '1px solid rgba(56,189,248,0.2)',
                              color: 'var(--accent-cyan)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.95rem',
                      borderTop: '1px solid var(--border-color)',
                    }}>
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        style={{
                          background: 'none', border: 'none', color: 'var(--accent-cyan)',
                          fontSize: '0.84rem', fontWeight: '750', fontFamily: 'var(--font-heading)',
                          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        }}
                      >
                        <Eye size={15} /> Detail Proyek
                      </button>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Repository GitHub"
                            style={{
                              width: '34px', height: '34px', borderRadius: '50%',
                              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'var(--text-muted)', transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color = '#FFF';
                              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                              e.currentTarget.style.background = 'rgba(6,182,212,0.15)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.color = 'var(--text-muted)';
                              e.currentTarget.style.borderColor = 'var(--border-color)';
                              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                          >
                            <GithubIcon size={15} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Live Demo"
                            style={{
                              width: '34px', height: '34px', borderRadius: '50%',
                              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'var(--accent-cyan)', transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'var(--accent-cyan)';
                              e.currentTarget.style.color = '#FFF';
                              e.currentTarget.style.boxShadow = '0 0 15px rgba(6,182,212,0.5)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'rgba(6,182,212,0.12)';
                              e.currentTarget.style.color = 'var(--accent-cyan)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bento-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <FolderGit2 size={44} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '0.5rem' }}>Proyek Tidak Ditemukan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Tidak ada proyek yang cocok dengan kata kunci "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* ── Project Detail Modal View ── */}
      {activeProjectModal && (
        <div
          className="modal-overlay"
          onClick={() => setActiveProjectModal(null)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}
        >
          <div
            className="modal-content bento-card"
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '680px', padding: '0', overflow: 'hidden' }}
          >
            {/* Modal Image Header */}
            <div style={{ position: 'relative', height: '260px', background: 'var(--bg-surface)' }}>
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <button
                onClick={() => setActiveProjectModal(null)}
                aria-label="Tutup modal proyek"
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span className="section-badge" style={{ margin: 0 }}>
                  {activeProjectModal.category || 'Portfolio'}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: '850', marginBottom: '0.85rem' }}>
                {activeProjectModal.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '1.65rem' }}>
                {activeProjectModal.description}
              </p>

              {/* Tech tags */}
              {activeProjectModal.tags && (
                <div style={{ marginBottom: '1.85rem' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: '800', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem', fontFamily: 'var(--font-heading)' }}>
                    Teknologi & Instrumen
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {activeProjectModal.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.78rem', fontWeight: '700', fontFamily: 'var(--font-code)',
                        padding: '0.3rem 0.8rem', borderRadius: '6px',
                        background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
                        color: 'var(--accent-cyan)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                {activeProjectModal.githubUrl && (
                  <a href={activeProjectModal.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <GithubIcon size={16} /> Repository GitHub
                  </a>
                )}
                {activeProjectModal.liveUrl && (
                  <a href={activeProjectModal.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <ExternalLink size={16} /> Buka Live Demo
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
