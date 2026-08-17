import React, { useState, useRef, useCallback } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

export const InteractivePhotoCard = () => {
  const { profile, isAdminLoggedIn, setIsAdminPanelOpen } = useProfile();
  const cardRef = useRef(null);

  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false,
  });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg for smooth Apple-grade tilt)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.25,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false,
    });
  }, []);

  return (
    <div
      style={{
        perspective: '1000px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: 'min(315px, 72vw)',
          height: '400px',
          borderRadius: '28px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: transformStyle.isHovered
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)'
            : '0 20px 40px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
          transform: `rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg) ${
            transformStyle.isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
          }`,
          transformStyle: 'preserve-3d',
          transition: transformStyle.isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.2s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── Layer 1: Holographic Specular Sheen Glare ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '26px',
            background: `radial-gradient(circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255, 255, 255, ${transformStyle.glareOpacity}) 0%, transparent 65%)`,
            pointerEvents: 'none',
            zIndex: 20,
            transition: 'background 0.05s ease',
          }}
        />

        {/* ── Layer 2: Card Header Bar (3D elevated) ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.4rem 0.65rem 0.65rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '8px',
            transform: 'translateZ(25px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.68rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                letterSpacing: '0.04em',
              }}
            >
              DAFFA // ID-01
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-code)',
              color: 'var(--text-dim)',
            }}
          >
            <ShieldCheck size={12} color="var(--accent-emerald)" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* ── Layer 3: Main Portrait Image Frame (3D Depth) ── */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            transform: 'translateZ(15px)',
          }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              transition: 'transform 0.4s ease',
              transform: transformStyle.isHovered ? 'scale(1.04)' : 'scale(1)',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/avatar-default.png';
            }}
          />

          {/* Admin Edit Overlay */}
          {isAdminLoggedIn && (
            <div
              onClick={() => setIsAdminPanelOpen(true)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                cursor: 'pointer',
                opacity: 0,
                transition: 'opacity 0.15s ease',
                zIndex: 30,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
            >
              <Camera size={26} />
              <span style={{ fontSize: '0.78rem', fontWeight: '650', marginTop: '0.35rem' }}>
                Ganti Foto
              </span>
            </div>
          )}
        </div>

        {/* ── Layer 4: Floating 3D Spec Pill Bar ── */}
        <div
          style={{
            marginTop: '8px',
            padding: '0.45rem 0.85rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: 'translateZ(30px)',
            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-emerald)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.74rem',
                fontWeight: '650',
                color: 'var(--text-main)',
              }}
            >
              ESP32 & Laravel
            </span>
          </div>

          <span
            style={{
              fontSize: '0.66rem',
              fontFamily: 'var(--font-code)',
              color: 'var(--text-dim)',
              letterSpacing: '0.04em',
            }}
          >
            UB IT // 2026
          </span>
        </div>
      </div>
    </div>
  );
};
