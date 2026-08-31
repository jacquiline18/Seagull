import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Microscope, 
  Building2, 
  Users, 
  Target, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  FlaskConical,
  Activity,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/sampleProducts';

export const AboutPage = () => {
  return (
    <div className="about-page-root">
      {/* Top Banner - Bright High Contrast Design */}
      <section 
        className="section science-grid-bg" 
        style={{ 
          padding: '4rem 0 3.5rem 0',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #E0F2FE 100%)',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span 
            className="section-tag"
            style={{ 
              backgroundColor: '#E0F2FE', 
              color: '#0369A1', 
              borderColor: '#BAE6FD',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={14} />
            <span>Corporate Profile</span>
          </span>
          <h1 
            style={{ 
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', 
              fontWeight: 800, 
              color: '#0A192F', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            About Seagull General Supply Limited
          </h1>
          <p 
            style={{ 
              fontSize: '1.15rem', 
              color: '#334155', 
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            <strong style={{ color: '#0F172A' }}>"Services Beyond Measure!"</strong> — Equipping scientific minds, researchers, medical laboratories, and educational institutions with world-class laboratory apparatus across Tanzania.
          </p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="section science-grid-bg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div>
              <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Who We Are</span>
              <h2 className="section-title" style={{ color: '#0A192F' }}>
                Reliable Scientific & Laboratory Partner in Tanzania
              </h2>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#0F172A' }}>Seagull General Supply Limited</strong> is a premier distributor and specialist supplier of laboratory equipment, analytical instruments, chemistry glassware, consumables, and safety products.
              </p>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                With deep expertise in laboratory technologies and scientific standards, we partner with leading global scientific manufacturers to provide dependable equipment tailored to universities, hospital diagnostic centers, mining assay laboratories, water treatment authorities, and secondary school science faculties.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid #CBD5E1', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-heading)' }}>
                    500+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                    Certified Instruments & Supplies
                  </div>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid #CBD5E1', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-heading)' }}>
                    350+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                    Laboratories Fully Outfitted
                  </div>
                </div>
              </div>

              <Link to="/products" className="btn btn-primary" style={{ gap: '0.5rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                <span>Explore Our Full Catalogue</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Visual Column */}
            <div>
              <div 
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '2px solid #BAE6FD',
                  boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.12)',
                  position: 'relative'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Laboratory Research" 
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={28} color="#0284C7" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0A192F' }}>Services Beyond Measure!</div>
                      <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 500 }}>Commitment to Precision and Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '2rem' }}>
            {/* Mission Card */}
            <div 
              className="card" 
              style={{
                padding: '2.25rem',
                borderLeft: '4px solid #1B4268',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderLeftWidth: '4px'
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-lg)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.75rem' }}>
                Our Mission
              </h3>
              <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: 1.7 }}>
                To empower scientific discovery, medical diagnosis, industrial quality control, and education by providing premium, precise, and durable laboratory equipment accompanied by exceptional technical advisory and dependable after-sales service.
              </p>
            </div>

            {/* Vision Card */}
            <div 
              className="card" 
              style={{
                padding: '2.25rem',
                borderLeft: '4px solid #0284C7',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderLeftWidth: '4px'
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-lg)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Eye size={26} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.75rem' }}>
                Our Vision
              </h3>
              <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: 1.7 }}>
                To be the most trusted, innovative, and comprehensive laboratory and scientific supply partner across all regions of Tanzania, recognized for uncompromised accuracy, speed, and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section section-subtle" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Guiding Principles</span>
            <h2 className="section-title" style={{ color: '#0A192F' }}>Core Pillars of Excellence</h2>
            <p className="section-subtitle" style={{ color: '#475569' }}>
              Every customer relationship and product dispatch is governed by our foundational principles.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Uncompromising Quality</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
                We supply instruments and chemical glassware manufactured under rigorous ISO standards to guarantee analytical accuracy.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <Activity size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Scientific Accuracy</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
                Precision is at the center of everything we do. We verify calibrations and specifications before delivery.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <Users size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Customer-Centric Support</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
                From initial technical consultations to formal quotations and after-sales support, our clients receive personalized care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
