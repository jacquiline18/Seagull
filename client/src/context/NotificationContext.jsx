import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 4000) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const newToast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toastSuccess = (msg) => addToast(msg, 'success');
  const toastError = (msg) => addToast(msg, 'error');
  const toastInfo = (msg) => addToast(msg, 'info');

  return (
    <NotificationContext.Provider
      value={{
        addToast,
        removeToast,
        toastSuccess,
        toastError,
        toastInfo
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="toast-fixed-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast-item toast-${t.type}`}>
            {t.type === 'success' && <CheckCircle2 size={20} color="#10B981" />}
            {t.type === 'error' && <AlertCircle size={20} color="#EF4444" />}
            {t.type === 'info' && <Info size={20} color="#00D2FF" />}
            <span style={{ fontSize: '0.9rem', flex: 1 }}>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              style={{ background: 'transparent', color: '#94A3B8', display: 'flex' }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
