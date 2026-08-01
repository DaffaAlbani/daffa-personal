import React, { useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toast, closeToast } = useProfile();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, closeToast]);

  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10B981" />;
      case 'error':
        return <AlertCircle size={20} color="#F43F5E" />;
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      default:
        return <Info size={20} color="#38BDF8" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type}`}>
        {renderIcon()}
        <span>{toast.message}</span>
        <button onClick={closeToast} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '0.5rem' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
