import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultProfileData } from '../data/defaultProfile';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  // Load profile from localStorage or default
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('personal_web_profile');
      return saved ? JSON.parse(saved) : defaultProfileData;
    } catch (e) {
      console.error('Failed to parse saved profile data:', e);
      return defaultProfileData;
    }
  });

  // Admin login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('personal_web_admin_active') === 'true';
  });

  // Admin password (default: admin123)
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('personal_web_admin_password') || 'admin123';
  });

  // Hide login button state
  const [hideLoginButton, setHideLoginButton] = useState(() => {
    const saved = localStorage.getItem('personal_web_hide_login');
    return saved !== null ? saved === 'true' : true;
  });

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Persist profile
  useEffect(() => {
    localStorage.setItem('personal_web_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('personal_web_hide_login', hideLoginButton);
  }, [hideLoginButton]);

  useEffect(() => {
    localStorage.setItem('personal_web_admin_password', adminPassword);
  }, [adminPassword]);

  // Persist session admin login state
  useEffect(() => {
    sessionStorage.setItem('personal_web_admin_active', isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  // Lock body scroll when any modal is open to prevent background scrolling
  useEffect(() => {
    if (isLoginModalOpen || isAdminPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoginModalOpen, isAdminPanelOpen]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Auth functions
  const loginAdmin = (password) => {
    if (password === adminPassword) {
      setIsAdminLoggedIn(true);
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      showToast('Login Admin Berhasil! Selamat datang kembali.', 'success');
      return true;
    } else {
      showToast('Kata sandi admin salah! Coba lagi (Default: admin123)', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminPanelOpen(false);
    showToast('Anda telah keluar dari mode Admin.', 'info');
  };

  // Profile update functions
  const updateProfile = (updatedData) => {
    setProfile(prev => ({
      ...prev,
      ...updatedData
    }));
    showToast('Profil berhasil diperbarui!', 'success');
  };

  const updateAvatar = (avatarUrlOrBase64) => {
    setProfile(prev => ({
      ...prev,
      avatar: avatarUrlOrBase64
    }));
    showToast('Foto profil berhasil diperbarui secara live!', 'success');
  };

  const toggleHideLoginButton = (shouldHide) => {
    const newValue = typeof shouldHide === 'boolean' ? shouldHide : !hideLoginButton;
    setHideLoginButton(newValue);
    if (newValue) {
      showToast('Tombol Login disembunyikan. Gunakan Ctrl+Shift+A untuk login rahasia!', 'warning');
    } else {
      showToast('Tombol Login kini ditampilkan di Navbar.', 'info');
    }
  };

  const changeAdminPassword = (newPassword) => {
    if (!newPassword || newPassword.trim().length < 4) {
      showToast('Password minimal 4 karakter!', 'error');
      return false;
    }
    setAdminPassword(newPassword.trim());
    showToast('Kata sandi Admin berhasil diubah!', 'success');
    return true;
  };

  const resetToDefault = () => {
    setProfile(defaultProfileData);
    setHideLoginButton(false);
    setAdminPassword('admin123');
    localStorage.removeItem('personal_web_profile');
    localStorage.removeItem('personal_web_hide_login');
    localStorage.removeItem('personal_web_admin_password');
    showToast('Seluruh data berhasil di-reset ke versi default!', 'info');
  };

  // --- EXPERIENCE CRUD ---
  const updateExperience = (index, updatedExp) => {
    setProfile(prev => {
      const newExperiences = [...(prev.experiences || [])];
      newExperiences[index] = updatedExp;
      return { ...prev, experiences: newExperiences };
    });
    showToast('Pengalaman kerja berhasil diperbarui!', 'success');
  };

  const addExperience = (newExp) => {
    setProfile(prev => ({
      ...prev,
      experiences: [newExp, ...(prev.experiences || [])]
    }));
    showToast('Pengalaman kerja baru berhasil ditambahkan!', 'success');
  };

  const deleteExperience = (index) => {
    setProfile(prev => {
      const newExperiences = (prev.experiences || []).filter((_, i) => i !== index);
      return { ...prev, experiences: newExperiences };
    });
    showToast('Pengalaman kerja berhasil dihapus.', 'info');
  };

  // --- PORTFOLIO / PROJECT CRUD ---
  const updateProject = (index, updatedProj) => {
    setProfile(prev => {
      const newProjects = [...(prev.projects || [])];
      newProjects[index] = updatedProj;
      return { ...prev, projects: newProjects };
    });
    showToast('Item Portofolio berhasil diperbarui!', 'success');
  };

  const addProject = (newProj) => {
    setProfile(prev => ({
      ...prev,
      projects: [newProj, ...(prev.projects || [])]
    }));
    showToast('Item Portofolio baru berhasil ditambahkan!', 'success');
  };

  const deleteProject = (index) => {
    setProfile(prev => {
      const newProjects = (prev.projects || []).filter((_, i) => i !== index);
      return { ...prev, projects: newProjects };
    });
    showToast('Item Portofolio berhasil dihapus.', 'info');
  };

  // --- CERTIFICATE CRUD ---
  const updateCertificate = (index, updatedCert) => {
    setProfile(prev => {
      const newCerts = [...(prev.certificates || [])];
      newCerts[index] = updatedCert;
      return { ...prev, certificates: newCerts };
    });
    showToast('Sertifikat kompetensi berhasil diperbarui!', 'success');
  };

  const addCertificate = (newCert) => {
    setProfile(prev => ({
      ...prev,
      certificates: [newCert, ...(prev.certificates || [])]
    }));
    showToast('Sertifikat kompetensi baru berhasil ditambahkan!', 'success');
  };

  const deleteCertificate = (index) => {
    setProfile(prev => {
      const newCerts = (prev.certificates || []).filter((_, i) => i !== index);
      return { ...prev, certificates: newCerts };
    });
    showToast('Sertifikat kompetensi berhasil dihapus.', 'info');
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      isAdminLoggedIn,
      hideLoginButton,
      adminPassword,
      isLoginModalOpen,
      isAdminPanelOpen,
      toast,
      setIsLoginModalOpen,
      setIsAdminPanelOpen,
      loginAdmin,
      logoutAdmin,
      updateProfile,
      updateAvatar,
      toggleHideLoginButton,
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
      showToast,
      closeToast
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
