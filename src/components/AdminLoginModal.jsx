import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Lock, Key, X, Eye, EyeOff, ShieldCheck, HelpCircle } from 'lucide-react';

export const AdminLoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin } = useProfile();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setPassword('');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-indigo)'
            }}>
              <ShieldCheck size={18} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>Autentikasi Admin</h3>
          </div>
          <button className="modal-close" onClick={() => setIsLoginModalOpen(false)} aria-label="Tutup modal login admin">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Masukkan kata sandi admin untuk mengelola foto profil, edit data diri, dan pengaturan website.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Key size={14} color="var(--accent-cyan)" /> Kata Sandi Admin
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Masukkan password admin..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Password Hint Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <HelpCircle size={15} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span>Password default: <strong>admin123</strong></span>
                <br />
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  Gunakan tombol shortcut <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>Ctrl + Shift + A</kbd> untuk membuka modal ini kapan saja.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => setIsLoginModalOpen(false)} 
                className="btn btn-secondary btn-sm"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                <Lock size={14} /> Masuk Admin
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
