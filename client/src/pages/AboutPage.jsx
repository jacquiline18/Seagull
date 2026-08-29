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
  Compass, 
  CheckCircle2, 
  ArrowRight,
  FlaskConical,
  Activity,
  Truck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/sampleProducts';

export const AboutPage = () => {
  return (
    <div className="about-page-root">
      {/* Top Banner */}
      <section className="section section-dark science-grid-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag dark-tag">Corporate Profile</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem' }}>
            About Seagull General Supply Limited
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#E0F2FE', lineHeight: 1.6 }}>
            "Services Beyond Measure!" — Equipping scientific minds, researchers, medical laboratories, and educational institutions with world-class laboratory apparatus.
          </p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="section science-grid-bg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title">
                Reliable Scientific & Laboratory Partner in Tanzania
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                <strong>Seagull General Supply Limited</strong> is a premier distributor and specialist supplier of laboratory equipment, analytical instruments, chemistry glassware, consumables, and safety products.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                With deep expertise in laboratory technologies and scientific standards, we partner with leading global scientific manufacturers to provide dependable equipment tailored to universities, hospital diagnostic centers, mining assay laboratories, water treatment authorities, and secondary school science faculties.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary-600)', fontFamily: 'var(--font-heading)' }}>
                    500+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Certified Instruments & Supplies
                  </div>
                </div>

                <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary-600)', fontFamily: 'var(--font-heading)' }}>
                    350+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Laboratories Fully Outfitted
                  </div>
                </div>
              </div>

              <Link to="/products" className="btn btn-primary" style={{ gap: '0.5rem' }}>
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
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xl)',
                  position: 'relative'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Laboratory Research" 
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }} 
                />
                <div 
                  className="card-glass-dark"
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={28} color="#00D2FF" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem' }}>Services Beyond Measure!</div>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Commitment to Precision and Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '2rem' }}>
            {/* Mission Card */}
            <div 
              className="card" 
              style={{
                padding: '2.5rem',
                borderLeft: '4px solid var(--color-primary-600)',
                backgroundColor: 'var(--color-primary-50)'
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-600)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-950)', marginBottom: '0.75rem' }}>
                Our Mission
              </h3>
              <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.7 }}>
                To empower scientific discovery, medical diagnosis, industrial quality control, and education by providing premium, precise, and durable laboratory equipment accompanied by exceptional technical advisory and dependable after-sales service.
              </p>
            </div>

            {/* Vision Card */}
            <div 
              className="card" 
              style={{
                padding: '2.5rem',
                borderLeft: '4px solid #00D2FF',
                backgroundColor: '#F0F9FF'
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-lg)', background: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Eye size={26} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-950)', marginBottom: '0.75rem' }}>
                Our Vision
              </h3>
              <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.7 }}>
                To be the most trusted, innovative, and comprehensive laboratory and scientific supply partner across all regions of Tanzania, recognized for uncompromised accuracy, speed, and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Guiding Principles</span>
            <h2 className="section-title">Core Pillars of Excellence</h2>
            <p className="section-subtitle">
              Every customer relationship and product dispatch is governed by our foundational principles.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h3 className="feature-title">Uncompromising Quality</h3>
              <p className="feature-desc">
                We supply instruments and chemical glassware manufactured under rigorous ISO standards to guarantee analytical accuracy.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Activity size={26} />
              </div>
              <h3 className="feature-title">Scientific Accuracy</h3>
              <p className="feature-desc">
                Precision is at the center of everything we do. We verify calibrations and specifications before delivery.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Users size={26} />
              </div>
              <h3 className="feature-title">Customer-Centric Support</h3>
              <p className="feature-desc">
                From initial technical consultations to formal quotations and after-sales support, our clients receive personalized care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
