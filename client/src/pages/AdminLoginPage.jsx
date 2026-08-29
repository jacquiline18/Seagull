import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@seagull.co.tz');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, loading } = useAuth();
  const { toastSuccess, toastError } = useNotification();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(email, password);
    if (res.success) {
      toastSuccess('Authenticated successfully as Seagull Admin');
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res.error || 'Authentication failed');
      toastError(res.error || 'Invalid credentials');
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@seagull.co.tz');
    setPassword('admin123');
  };

  return (
    <div 
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: '#061528',
        backgroundImage: 'radial-gradient(circle at 50% 30%, #0A2540 0%, #061528 75%)'
      }}
    >
      <div 
        className="card card-glass-dark" 
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.5rem',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2) 0%, rgba(0, 102, 204, 0.4) 100%)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00D2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}
          >
            <ShieldCheck size={32} />
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>
            Seagull Admin Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
            Operations & Laboratory Supply Management
          </p>
        </div>

        {errorMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#FCA5A5', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ color: '#E2E8F0' }}>
              Staff Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="form-input" 
                style={{ paddingLeft: '2.75rem', backgroundColor: 'rgba(255, 255, 255, 0.07)', borderColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF' }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" style={{ color: '#E2E8F0' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-input" 
                style={{ paddingLeft: '2.75rem', backgroundColor: 'rgba(255, 255, 255, 0.07)', borderColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF' }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-cyan btn-block btn-lg"
            style={{ marginBottom: '1.25rem', gap: '0.5rem' }}
          >
            {loading ? <span>Verifying...</span> : <span>Sign In to Dashboard</span>}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Quick Fill Helper */}
        <div style={{ padding: '0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(255, 255, 255, 0.15)', textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
          <div style={{ marginBottom: '0.35rem' }}>
            Demo Account: <strong>admin@seagull.co.tz</strong> / <strong>admin123</strong>
          </div>
          <button 
            type="button"
            onClick={handleDemoFill}
            style={{ background: 'none', color: '#00D2FF', textDecoration: 'underline', fontSize: '0.78rem' }}
          >
            Auto-Fill Demo Credentials
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};
