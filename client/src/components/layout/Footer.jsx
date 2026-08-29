import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  FlaskConical
} from 'lucide-react';
import { COMPANY_INFO, CATEGORIES } from '../../data/sampleProducts';
import { useNotification } from '../../context/NotificationContext';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toastSuccess } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      toastSuccess('Thank you for subscribing to Seagull Laboratory updates!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="footer-main">
      <div className="container">
        {/* Top Feature Accreditation Row */}
        <div 
          style={{
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(0, 210, 255, 0.1)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700 }}>Certified Quality</h5>
              <p style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>ISO & DIN standard compliant supplies</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(0, 210, 255, 0.1)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={26} />
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700 }}>Services Beyond Measure</h5>
              <p style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>Technical consultation & calibration</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(0, 210, 255, 0.1)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FlaskConical size={26} />
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700 }}>Complete Lab Supply</h5>
              <p style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>Glassware, instruments & chemicals</p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
          {/* Column 1: Company Profile */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/seagull-logo.svg" alt="Seagull Logo" style={{ width: '38px', height: '38px' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFFFFF', fontSize: '1.1rem', display: 'block', lineHeight: 1.1 }}>
                  SEAGULL
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.04em' }}>
                  GENERAL SUPPLY LIMITED
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Specialized supplier of precision laboratory instruments, chemistry apparatus, glassware, scientific measuring tools, and consumables.
            </p>

            <div style={{ display: 'inline-block', padding: '0.4rem 0.8rem', backgroundColor: 'rgba(0, 210, 255, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
              <span style={{ fontSize: '0.78rem', color: '#00D2FF', fontWeight: 700, fontStyle: 'italic' }}>
                "{COMPANY_INFO.tagline}"
              </span>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h4>Product Categories</h4>
            <ul className="footer-link-list">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.id}`} className="footer-link">
                    <ArrowRight size={13} color="#00D2FF" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/" className="footer-link">
                  <ArrowRight size={13} color="#00D2FF" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  <ArrowRight size={13} color="#00D2FF" />
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  <ArrowRight size={13} color="#00D2FF" />
                  <span>About Seagull</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <ArrowRight size={13} color="#00D2FF" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  <ArrowRight size={13} color="#00D2FF" />
                  <span>View Cart</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="footer-link">
                  <ArrowRight size={13} color="#00D2FF" />
                  <span>Staff & Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4>Contact Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <a href={`tel:${COMPANY_INFO.phoneClean}`} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#E2E8F0' }}>
                <Phone size={16} color="#00D2FF" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#E2E8F0' }}>
                <Mail size={16} color="#00D2FF" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <a href="https://www.seagull.co.tz" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#E2E8F0' }}>
                <Globe size={16} color="#00D2FF" />
                <span>{COMPANY_INFO.website}</span>
              </a>
              <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#E2E8F0' }}>
                <Instagram size={16} color="#E1306C" />
                <span>Instagram: @{COMPANY_INFO.instagram}</span>
              </a>
            </div>

            <h5 style={{ color: '#FFFFFF', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              Stay Updated with Catalog Releases
            </h5>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
              <input 
                type="email" 
                placeholder="Your email address..." 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  flex: 1
                }}
              />
              <button type="submit" className="btn btn-cyan btn-sm">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} <strong>Seagull General Supply Limited</strong>. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#64748B' }}>Dar es Salaam, Tanzania</span>
            <span style={{ color: '#00D2FF' }}>Services Beyond Measure!</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
