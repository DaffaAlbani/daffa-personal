import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ExternalLink, Search, FolderGit2, X, Tag } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects = () => {
  const { profile } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = ['Semua', ...new Set(profile.projects?.map(p => p.category) || [])];

  const filteredProjects = profile.projects?.filter(project => {
    const matchesCategory = selectedCategory === 'Semua' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <h2 className="section-title reveal-on-scroll">Portofolio</h2>
        <p className="section-subtitle reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          Kumpulan hasil karya, proyek akademik, dan aplikasi web yang telah saya rancang dan kembangkan.
        </p>

        {/* Filter & Search Bar */}
        <div className="reveal-on-scroll" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          transitionDelay: '0.2s'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '9999px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari karya atau skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem', borderRadius: '9999px', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProjects.map((project, index) => (
            <div key={project.id || project.title} className="glass-panel reveal-on-scroll" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transitionDelay: `${0.1 * (index % 3)}s` }}>
              
              {/* Project Thumbnail Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setActiveProjectModal(project)}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {project.category && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(11, 15, 25, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-color)'
                  }}>
                    {project.category}
                  </span>
                )}
              </div>

              {/* Project Card Content */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 
                    onClick={() => setActiveProjectModal(project)}
                    style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                      {project.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-muted)'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* External Links */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{ fontSize: '0.8rem' }}>
                      Lihat Demo <ExternalLink size={14} />
                    </a>
                  ) : <div />}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary" style={{ fontSize: '0.8rem' }}>
                      <GithubIcon size={14} /> Source
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <FolderGit2 size={48} style={{ opacity: 0.4, marginBottom: '1rem' }} />
            <p>Tidak ada item portofolio yang sesuai dengan pencarian "{searchQuery}".</p>
          </div>
        )}

      </div>

      {/* Modal Preview Project Detail */}
      {activeProjectModal && (
        <div className="modal-overlay" onClick={() => setActiveProjectModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{activeProjectModal.title}</h3>
              <button className="modal-close" onClick={() => setActiveProjectModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {activeProjectModal.category && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Tag size={16} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                    Kategori: {activeProjectModal.category}
                  </span>
                </div>
              )}

              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {activeProjectModal.description}
              </p>

              {activeProjectModal.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {activeProjectModal.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: 'var(--accent-indigo)',
                      border: '1px solid rgba(99, 102, 241, 0.3)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                {activeProjectModal.githubUrl && (
                  <a href={activeProjectModal.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <GithubIcon size={16} /> Repository
                  </a>
                )}
                {activeProjectModal.demoUrl && (
                  <a href={activeProjectModal.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Lihat Demo Web <ExternalLink size={16} />
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
