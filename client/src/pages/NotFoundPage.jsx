import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div 
      className="section science-grid-bg" 
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
    >
      <div className="container" style={{ maxWidth: '560px' }}>
        <div 
          style={{
            width: '88px',
            height: '88px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-50)',
            color: 'var(--color-primary-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <FlaskConical size={48} />
        </div>

        <span className="section-tag" style={{ color: 'var(--color-danger)', backgroundColor: 'var(--color-danger-bg)', borderColor: '#FECACA' }}>
          404 - Page Not Found
        </span>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-primary-950)', margin: '0.75rem 0 1rem 0' }}>
          Laboratory Specimen Not Located
        </h1>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page or equipment catalogue reference you are searching for does not exist or may have been relocated.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary" style={{ gap: '0.5rem' }}>
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/products" className="btn btn-secondary" style={{ gap: '0.5rem' }}>
            <Search size={18} />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
