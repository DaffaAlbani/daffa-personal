import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ExternalLink, Search, FolderGit2, X, FolderOpen, Eye } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects = () => {
  const { profile } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

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
    <section id="projects" className="section-padding">
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <span className="section-badge">
              <FolderOpen size={11} style={{ marginRight: '0.25rem' }} />
              Portofolio
            </span>
          </div>
          <h2 className="section-title reveal-on-scroll">
            Karya & Proyek Terpilih
          </h2>
          <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>
            Implementasi sistem backend, perancangan database, dan rekayasa embedded hardware.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="reveal-on-scroll" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          transitionDelay: '0.1s',
        }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8rem',
                    fontWeight: active ? '700' : '500',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.15s ease',
                    background: active ? 'var(--text-main)' : 'var(--bg-card)',
                    color: active ? 'var(--bg-main)' : 'var(--text-muted)',
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
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Cari proyek..."
              aria-label="Cari proyek"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.4rem',
                paddingRight: searchQuery ? '2rem' : '0.85rem',
                fontSize: '0.85rem',
                paddingTop: '0.55rem',
                paddingBottom: '0.55rem',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Bersihkan pencarian"
                style={{
                  position: 'absolute', right: '0.65rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '1.5rem',
          }}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id || index}
                className="craft-card reveal-on-scroll"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transitionDelay: `${0.05 * (index % 3)}s`,
                }}
              >
                {/* Thumbnail Header */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {project.category && (
                    <span style={{
                      position: 'absolute', top: '0.75rem', right: '0.75rem',
                      background: 'rgba(9, 9, 11, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--text-main)',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      fontFamily: 'var(--font-heading)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-color)',
                    }}>
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      onClick={() => setActiveProjectModal(project)}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        fontWeight: '750',
                        marginBottom: '0.45rem',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.88rem',
                      marginBottom: '1.15rem',
                      lineHeight: '1.6',
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
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.15rem' }}>
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              fontFamily: 'var(--font-code)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-muted)',
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
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-color)',
                    }}>
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        style={{
                          background: 'none', border: 'none', color: 'var(--text-main)',
                          fontSize: '0.82rem', fontWeight: '650', fontFamily: 'var(--font-heading)',
                          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        }}
                      >
                        <Eye size={14} /> Detail
                      </button>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Repository GitHub"
                            style={{
                              width: '32px', height: '32px', borderRadius: 'var(--radius-xs)',
                              background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'var(--text-muted)', transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-main)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                          >
                            <GithubIcon size={14} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Live Demo"
                            style={{
                              width: '32px', height: '32px', borderRadius: 'var(--radius-xs)',
                              background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'var(--text-main)', transition: 'all 0.15s ease',
                            }}
                          >
                            <ExternalLink size={14} />
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
          <div className="craft-card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '440px', margin: '0 auto' }}>
            <FolderGit2 size={36} color="var(--text-dim)" style={{ marginBottom: '0.85rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '750', marginBottom: '0.35rem' }}>Proyek Tidak Ditemukan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Tidak ada proyek dengan filter saat ini.
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

      {/* ── Project Detail Modal ── */}
      {activeProjectModal && (
        <div
          className="modal-overlay"
          onClick={() => setActiveProjectModal(null)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ padding: 0, overflow: 'hidden' }}
          >
            <div style={{ position: 'relative', height: '240px', background: 'var(--bg-surface)' }}>
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
                aria-label="Tutup modal"
                style={{
                  position: 'absolute', top: '0.85rem', right: '0.85rem',
                  width: '32px', height: '32px', borderRadius: 'var(--radius-xs)',
                  background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFF', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                {activeProjectModal.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                {activeProjectModal.description}
              </p>

              {activeProjectModal.tags && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                    Teknologi yang Digunakan
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {activeProjectModal.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.75rem', fontWeight: '600', fontFamily: 'var(--font-code)',
                        padding: '0.2rem 0.6rem', borderRadius: '4px',
                        background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {activeProjectModal.githubUrl && (
                  <a href={activeProjectModal.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <GithubIcon size={15} /> GitHub
                  </a>
                )}
                {activeProjectModal.liveUrl && (
                  <a href={activeProjectModal.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <ExternalLink size={15} /> Live Demo
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
