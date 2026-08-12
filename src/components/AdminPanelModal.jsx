import React, { useState, useRef, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { 
  Camera, User, Settings, X, Upload, Link, Check, RefreshCw, 
  EyeOff, Eye, Key, Save, ShieldAlert, Briefcase, Plus, Trash2, Edit3,
  FolderGit2, Award, ZoomIn, RotateCw, Move
} from 'lucide-react';

export const AdminPanelModal = () => {
  const { 
    profile, 
    isAdminPanelOpen, 
    setIsAdminPanelOpen, 
    hideLoginButton, 
    toggleHideLoginButton, 
    updateProfile, 
    updateAvatar, 
    changeAdminPassword, 
    resetToDefault,
    updateExperience,
    addExperience,
    deleteExperience,
    updateProject,
    addProject,
    deleteProject,
    updateCertificate,
    addCertificate,
    deleteCertificate,
    showToast
  } = useProfile();

  const [activeTab, setActiveTab] = useState('photo');

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: profile.name || '',
    title: profile.title || '',
    tagline: profile.tagline || '',
    bio: profile.bio || '',
    email: profile.email || '',
    location: profile.location || '',
    availability: profile.availability || '',
    github: profile.socials?.github || '',
    linkedin: profile.socials?.linkedin || '',
    instagram: profile.socials?.instagram || '',
    twitter: profile.socials?.twitter || ''
  });

  // Instagram-style Drag & Zoom Cropper States
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const [rawImageSrc, setRawImageSrc] = useState(profile.avatar);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropPanX, setCropPanX] = useState(0);
  const [cropPanY, setCropPanY] = useState(0);
  const [cropRotation, setCropRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  // Security States
  const [newPassword, setNewPassword] = useState('');

  // Experience Form States
  const [editingExpIndex, setEditingExpIndex] = useState(null);
  const [expForm, setExpForm] = useState({ role: '', company: '', period: '', description: '', achievementsStr: '' });

  // Project / Portfolio Form States
  const [editingProjIndex, setEditingProjIndex] = useState(null);
  const [projForm, setProjForm] = useState({ title: '', category: '', description: '', tagsStr: '', image: '', demoUrl: '', githubUrl: '' });

  // Certificate Form States
  const [editingCertIndex, setEditingCertIndex] = useState(null);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', credentialUrl: '', image: '' });

  useEffect(() => {
    if (profile.avatar) {
      setRawImageSrc(profile.avatar);
    }
  }, [profile.avatar]);

  if (!isAdminPanelOpen) return null;

  // Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropPanX, y: e.clientY - cropPanY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCropPanX(e.clientX - dragStart.x);
    setCropPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheelZoom = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
    setCropZoom(prev => Math.min(Math.max(0.5, prev + zoomDelta), 3.5));
  };

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        showToast('Ukuran file maksimal 8MB!', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImageSrc(reader.result);
        setCropZoom(1);
        setCropPanX(0);
        setCropPanY(0);
        setCropRotation(0);
        showToast('Foto dimuat sempurna! Geser foto dengan mouse untuk menyesuaikan posisi.', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrlAvatar = (e) => {
    e.preventDefault();
    if (!avatarUrlInput || !avatarUrlInput.startsWith('http')) {
      showToast('Masukkan URL gambar yang valid!', 'error');
      return;
    }
    setRawImageSrc(avatarUrlInput);
    setCropZoom(1);
    setCropPanX(0);
    setCropPanY(0);
    setCropRotation(0);
    setAvatarUrlInput('');
    showToast('Foto dimuat! Geser dengan mouse untuk menyesuaikan posisi.', 'info');
  };

  // Export cropped avatar canvas with Aspect Ratio Cover
  const handleCropAndSave = () => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = rawImageSrc;
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      const size = 500; // Output high-res 500x500
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, size, size);

      // Create circular clipping path
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Calculate Aspect Ratio Cover so image fills circle 100% without black bars or distortion
      const nw = img.naturalWidth || img.width;
      const nh = img.naturalHeight || img.height;
      const scaleCover = Math.max(size / nw, size / nh);
      const drawW = nw * scaleCover;
      const drawH = nh * scaleCover;

      // Transform & draw
      const scaleFactor = size / 260; // Scale pan offsets from 260px preview to 500px canvas
      ctx.translate(size / 2 + cropPanX * scaleFactor, size / 2 + cropPanY * scaleFactor);
      ctx.rotate((cropRotation * Math.PI) / 180);
      ctx.scale(cropZoom, cropZoom);

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      try {
        const croppedBase64 = canvas.toDataURL('image/png');
        updateAvatar(croppedBase64);
      } catch (err) {
        console.error('Failed to export cropped canvas:', err);
        updateAvatar(rawImageSrc);
      }
    };
    img.onerror = () => {
      updateAvatar(rawImageSrc);
    };
  };

  const handleRotateRight = () => {
    setCropRotation(prev => (prev + 90) % 360);
  };

  const handleResetCropControls = () => {
    setCropZoom(1);
    setCropPanX(0);
    setCropPanY(0);
    setCropRotation(0);
  };

  const handleSaveProfileInfo = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      title: profileForm.title,
      tagline: profileForm.tagline,
      bio: profileForm.bio,
      email: profileForm.email,
      location: profileForm.location,
      availability: profileForm.availability,
      socials: {
        github: profileForm.github,
        linkedin: profileForm.linkedin,
        instagram: profileForm.instagram,
        twitter: profileForm.twitter
      }
    });
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (changeAdminPassword(newPassword)) {
      setNewPassword('');
    }
  };

  // --- Experience Handlers ---
  const handleStartEditExp = (index, exp) => {
    setEditingExpIndex(index);
    setExpForm({
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      description: exp.description || '',
      achievementsStr: exp.achievements ? exp.achievements.join('\n') : ''
    });
  };

  const handleSaveExpSubmit = (e) => {
    e.preventDefault();
    if (!expForm.role || !expForm.company) {
      showToast('Role dan Perusahaan wajib diisi!', 'error');
      return;
    }
    const achievementsArray = expForm.achievementsStr.split('\n').map(a => a.trim()).filter(a => a.length > 0);
    const expData = { role: expForm.role, company: expForm.company, period: expForm.period, description: expForm.description, achievements: achievementsArray };

    if (editingExpIndex === 'new') {
      addExperience(expData);
    } else {
      updateExperience(editingExpIndex, expData);
    }
    setEditingExpIndex(null);
  };

  // --- Project / Portfolio Handlers ---
  const handleStartEditProj = (index, proj) => {
    setEditingProjIndex(index);
    setProjForm({
      title: proj.title || '',
      category: proj.category || '',
      description: proj.description || '',
      tagsStr: proj.tags ? proj.tags.join(', ') : '',
      image: proj.image || '',
      demoUrl: proj.demoUrl || '',
      githubUrl: proj.githubUrl || ''
    });
  };

  const handleSaveProjSubmit = (e) => {
    e.preventDefault();
    if (!projForm.title) {
      showToast('Judul Portofolio wajib diisi!', 'error');
      return;
    }
    const tagsArray = projForm.tagsStr.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const projData = {
      id: editingProjIndex === 'new' ? Date.now() : (profile.projects[editingProjIndex]?.id || Date.now()),
      title: projForm.title,
      category: projForm.category || 'Portofolio',
      description: projForm.description,
      tags: tagsArray,
      image: projForm.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      demoUrl: projForm.demoUrl,
      githubUrl: projForm.githubUrl
    };

    if (editingProjIndex === 'new') {
      addProject(projData);
    } else {
      updateProject(editingProjIndex, projData);
    }
    setEditingProjIndex(null);
  };

  // --- Certificate Handlers ---
  const handleStartEditCert = (index, cert) => {
    setEditingCertIndex(index);
    setCertForm({
      title: cert.title || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      credentialUrl: cert.credentialUrl || '',
      image: cert.image || ''
    });
  };

  const handleSaveCertSubmit = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) {
      showToast('Judul Sertifikat dan Penerbit wajib diisi!', 'error');
      return;
    }
    const certData = {
      id: editingCertIndex === 'new' ? Date.now() : (profile.certificates[editingCertIndex]?.id || Date.now()),
      title: certForm.title,
      issuer: certForm.issuer,
      date: certForm.date,
      credentialUrl: certForm.credentialUrl,
      image: certForm.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    };

    if (editingCertIndex === 'new') {
      addCertificate(certData);
    } else {
      updateCertificate(editingCertIndex, certData);
    }
    setEditingCertIndex(null);
  };

  useEffect(() => {
    if (isAdminPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isAdminPanelOpen]);

  if (!isAdminPanelOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsAdminPanelOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px' }}>
        
        {/* Hidden Canvas for Exporting Cropped Image */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}>
              <Settings size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Panel Kontrol Admin</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Atur Foto Profil, Bio, Portofolio, Sertifikat & Pengaturan</span>
            </div>
          </div>
          <button className="modal-close" onClick={() => setIsAdminPanelOpen(false)} aria-label="Tutup panel kontrol admin">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0.5rem 1.5rem 0 1.5rem',
          gap: '0.5rem',
          overflowX: 'auto'
        }}>
          <button onClick={() => setActiveTab('photo')} style={tabButtonStyle(activeTab === 'photo')}>
            <Camera size={16} /> Foto Profil
          </button>
          <button onClick={() => setActiveTab('profile')} style={tabButtonStyle(activeTab === 'profile')}>
            <User size={16} /> Detail Profil
          </button>
          <button onClick={() => setActiveTab('portfolio')} style={tabButtonStyle(activeTab === 'portfolio')}>
            <FolderGit2 size={16} /> Portofolio
          </button>
          <button onClick={() => setActiveTab('certificate')} style={tabButtonStyle(activeTab === 'certificate')}>
            <Award size={16} /> Sertifikat
          </button>
          <button onClick={() => setActiveTab('experience')} style={tabButtonStyle(activeTab === 'experience')}>
            <Briefcase size={16} /> Pengalaman
          </button>
          <button onClick={() => setActiveTab('settings')} style={tabButtonStyle(activeTab === 'settings')}>
            <Settings size={16} /> Keamanan & Tampilan
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          {/* TAB 1: Instgram-Style Interactive Profile Picture Drag & Zoom */}
          {activeTab === 'photo' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Pasang & Atur Foto Profil</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Klik & <strong>geser foto dengan mouse</strong> atau gunakan slider zoom di bawah untuk mengatur posisi presisi tanpa terpotong!
                </p>
              </div>

              {/* Instagram Interactive Circular Crop Viewport */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                
                <div 
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheelZoom}
                  style={{
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    border: '4px solid var(--accent-cyan)',
                    boxShadow: '0 0 35px rgba(56, 189, 248, 0.45)',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    background: '#0F172A',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={rawImageSrc}
                    alt="Instagram PP Viewport"
                    draggable={false}
                    style={{
                      minWidth: '100%',
                      minHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'cover',
                      transform: `translate(${cropPanX}px, ${cropPanY}px) scale(${cropZoom}) rotate(${cropRotation}deg)`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                      pointerEvents: 'none'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/avatar-default.png';
                    }}
                  />

                  {/* Drag Indicator Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    color: '#FFF',
                    fontWeight: '600',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <Move size={12} color="var(--accent-cyan)" /> Geser Foto
                  </div>
                </div>

                {/* Control Tool Bar */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  width: '100%',
                  maxWidth: '520px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}>
                  {/* Zoom Control Slider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '180px' }}>
                    <ZoomIn size={16} color="var(--accent-cyan)" />
                    <input
                      type="range"
                      min="0.5"
                      max="3.5"
                      step="0.05"
                      value={cropZoom}
                      onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                      style={{ flex: 1, accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '700', width: '32px' }}>
                      {cropZoom.toFixed(1)}x
                    </span>
                  </div>

                  <button type="button" onClick={handleRotateRight} className="btn btn-secondary btn-sm">
                    <RotateCw size={14} /> Rotasi
                  </button>

                  <button type="button" onClick={handleResetCropControls} className="btn btn-secondary btn-sm">
                    <RefreshCw size={14} /> Reset
                  </button>
                </div>

                {/* Action Buttons: Ganti Foto & Simpan Foto Profil */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> Pilih Foto Baru
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>

                  <button onClick={handleCropAndSave} className="btn btn-primary btn-sm">
                    <Check size={16} /> Simpan Foto Profil
                  </button>
                </div>

                {/* URL Photo Option */}
                <form onSubmit={handleApplyUrlAvatar} style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', width: '100%' }}>
                  <input
                    type="url"
                    placeholder="Atau tempel Link Image URL di sini..."
                    value={avatarUrlInput}
                    onChange={(e) => setAvatarUrlInput(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                    Muat URL
                  </button>
                </form>

              </div>
            </div>
          )}

          {/* TAB 2: Detail Profil */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfileInfo}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                Edit Informasi Diri & Bio
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Profesi / Title</label>
                  <input
                    type="text"
                    required
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tagline Hero Section</label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio Lengkap (About Me)</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Utama</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Lokasi</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status Ketersediaan</label>
                  <input
                    type="text"
                    value={profileForm.availability}
                    onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} /> Simpan Perubahan Profil
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Edit Portofolio */}
          {activeTab === 'portfolio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Kelola Item Portofolio</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tambah, edit, atau hapus karya & proyek portofolio Anda.</p>
                </div>
                {editingProjIndex === null && (
                  <button onClick={() => { setEditingProjIndex('new'); setProjForm({ title: '', category: '', description: '', tagsStr: '', image: '', demoUrl: '', githubUrl: '' }); }} className="btn btn-primary btn-sm">
                    <Plus size={16} /> Tambah Portofolio
                  </button>
                )}
              </div>

              {/* Form Add / Edit Project */}
              {editingProjIndex !== null && (
                <form onSubmit={handleSaveProjSubmit} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                    {editingProjIndex === 'new' ? 'Tambah Item Portofolio Baru' : 'Edit Item Portofolio'}
                  </h5>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Judul Portofolio / Karya *</label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: Smart Academic Portal"
                        value={projForm.title}
                        onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Kategori</label>
                      <input
                        type="text"
                        placeholder="Misal: Aplikasi Web, AI, Mobile"
                        value={projForm.category}
                        onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deskripsi Karya</label>
                    <textarea
                      placeholder="Penjelasan singkat mengenai proyek/karya ini..."
                      value={projForm.description}
                      onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                      className="form-textarea"
                      style={{ minHeight: '80px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tags / Teknologi (Pisahkan dengan Koma)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, TailwindCSS"
                      value={projForm.tagsStr}
                      onChange={(e) => setProjForm({ ...projForm, tagsStr: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">URL Gambar Thumbnail</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={projForm.image}
                        onChange={(e) => setProjForm({ ...projForm, image: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">URL Live Demo</label>
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={projForm.demoUrl}
                        onChange={(e) => setProjForm({ ...projForm, demoUrl: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">URL Repository (GitHub)</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username/repo"
                        value={projForm.githubUrl}
                        onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingProjIndex(null)} className="btn btn-secondary btn-sm">
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Save size={14} /> Simpan Portofolio
                    </button>
                  </div>
                </form>
              )}

              {/* List of Projects */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {profile.projects?.map((proj, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'; }}
                      />
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                          {proj.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                          {proj.category}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleStartEditProj(index, proj)} className="btn btn-secondary btn-sm" title="Edit">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => deleteProject(index)} className="btn btn-danger btn-sm" title="Hapus">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Edit Sertifikat */}
          {activeTab === 'certificate' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Kelola Sertifikat Kompetensi</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tambah, edit, atau hapus sertifikat & lisensi kompetensi Anda.</p>
                </div>
                {editingCertIndex === null && (
                  <button onClick={() => { setEditingCertIndex('new'); setCertForm({ title: '', issuer: '', date: '', credentialUrl: '', image: '' }); }} className="btn btn-primary btn-sm">
                    <Plus size={16} /> Tambah Sertifikat
                  </button>
                )}
              </div>

              {/* Form Add / Edit Certificate */}
              {editingCertIndex !== null && (
                <form onSubmit={handleSaveCertSubmit} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                    {editingCertIndex === 'new' ? 'Tambah Sertifikat Baru' : 'Edit Sertifikat'}
                  </h5>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Nama Sertifikat *</label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: AWS Certified Cloud Practitioner"
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Penerbit / Institusi *</label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: Dicoding / Google / AWS"
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tahun / Tanggal Terbit</label>
                      <input
                        type="text"
                        placeholder="Misal: 2025"
                        value={certForm.date}
                        onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">URL Gambar Banner / Badge</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={certForm.image}
                        onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">URL Link Verification / Lisensi</label>
                      <input
                        type="url"
                        placeholder="https://coursera.org/verify/..."
                        value={certForm.credentialUrl}
                        onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingCertIndex(null)} className="btn btn-secondary btn-sm">
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Save size={14} /> Simpan Sertifikat
                    </button>
                  </div>
                </form>
              )}

              {/* List of Certificates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {profile.certificates?.map((cert, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                      <Award size={32} color="var(--accent-cyan)" />
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                          {cert.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', fontWeight: '600' }}>
                          {cert.issuer} ({cert.date})
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleStartEditCert(index, cert)} className="btn btn-secondary btn-sm" title="Edit">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => deleteCertificate(index)} className="btn btn-danger btn-sm" title="Hapus">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Edit Pengalaman Kerja */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Kelola Pengalaman Kerja</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tambah, sunting, atau hapus riwayat pengalaman karir Anda.</p>
                </div>
                {editingExpIndex === null && (
                  <button onClick={() => { setEditingExpIndex('new'); setExpForm({ role: '', company: '', period: '', description: '', achievementsStr: '' }); }} className="btn btn-primary btn-sm">
                    <Plus size={16} /> Tambah Pengalaman
                  </button>
                )}
              </div>

              {/* Form Add / Edit Experience */}
              {editingExpIndex !== null && (
                <form onSubmit={handleSaveExpSubmit} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                    {editingExpIndex === 'new' ? 'Tambah Pengalaman Baru' : 'Sunting Pengalaman Kerja'}
                  </h5>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Posisi / Role *</label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: Senior Frontend Engineer"
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nama Perusahaan *</label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: PT Teknologi Nusantara"
                        value={expForm.company}
                        onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Periode Kerja</label>
                      <input
                        type="text"
                        placeholder="Misal: 2022 - Sekarang"
                        value={expForm.period}
                        onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deskripsi Pekerjaan</label>
                    <textarea
                      placeholder="Jelaskan tanggung jawab utama..."
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      className="form-textarea"
                      style={{ minHeight: '80px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setEditingExpIndex(null)} className="btn btn-secondary btn-sm">
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Save size={14} /> Simpan Pengalaman
                    </button>
                  </div>
                </form>
              )}

              {/* List of Experiences */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {profile.experiences?.map((exp, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>
                        {exp.role}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '600' }}>
                        {exp.company} <span style={{ color: 'var(--text-dim)', fontWeight: 'normal' }}>({exp.period})</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleStartEditExp(index, exp)} className="btn btn-secondary btn-sm" title="Edit">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => deleteExperience(index)} className="btn btn-danger btn-sm" title="Hapus">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Tampilan & Keamanan */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {hideLoginButton ? <EyeOff size={18} color="var(--accent-amber)" /> : <Eye size={18} color="var(--accent-cyan)" />}
                    Sembunyikan Tombol Login dari Navbar
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Jika diaktifkan, tombol "Admin Login" disembunyikan. Gunakan shortcut <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>Ctrl + Shift + A</kbd> atau double-click footer untuk login rahasia.
                  </div>
                </div>

                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px', flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    checked={hideLoginButton}
                    onChange={(e) => toggleHideLoginButton(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: hideLoginButton ? 'var(--accent-indigo)' : 'rgba(255, 255, 255, 0.2)',
                    transition: '0.3s',
                    borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: hideLoginButton ? '26px' : '4px',
                      bottom: '4px',
                      background: 'white',
                      transition: '0.3s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}>
                <h5 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Key size={18} color="var(--accent-cyan)" /> Ubah Kata Sandi Admin
                </h5>

                <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan password admin baru..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                    Ubah Password
                  </button>
                </form>
              </div>

              <div style={{
                background: 'rgba(244, 63, 94, 0.05)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--accent-rose)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldAlert size={16} /> Reset ke Data Bawaan Default
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Kembalikan foto profil, data bio, portofolio, sertifikat, password, dan status tombol login ke kondisi awal.
                  </div>
                </div>

                <button onClick={resetToDefault} className="btn btn-danger btn-sm" style={{ flexShrink: 0 }}>
                  <RefreshCw size={14} /> Reset Data
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const tabButtonStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.65rem 1.1rem',
  background: 'none',
  border: 'none',
  borderBottom: active ? '2px solid var(--accent-cyan)' : '2px solid transparent',
  color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
  fontWeight: active ? '700' : '500',
  fontSize: '0.9rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease'
});
