import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  FlaskConical, 
  Microscope, 
  ShieldCheck, 
  Award, 
  Clock, 
  PhoneCall, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Gauge, 
  TestTubes, 
  FileText,
  Search,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { CATEGORIES, SAMPLE_PRODUCTS, COMPANY_INFO } from '../data/sampleProducts';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const { openQuoteModal } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  useEffect(() => {
    // Pick 8 featured products
    const featured = SAMPLE_PRODUCTS.filter(p => p.featured).slice(0, 8);
    setFeaturedProducts(featured.length > 0 ? featured : SAMPLE_PRODUCTS.slice(0, 8));
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(heroSearchQuery.trim())}`);
    }
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Microscope': return <Microscope size={30} />;
      case 'FlaskConical': return <FlaskConical size={30} />;
      case 'Gauge': return <Gauge size={30} />;
      case 'TestTubes': return <TestTubes size={30} />;
      case 'ShieldCheck': return <ShieldCheck size={30} />;
      case 'Layers': return <Layers size={30} />;
      default: return <FlaskConical size={30} />;
    }
  };

  return (
    <div className="home-page-root">
      {/* 1. HERO SECTION */}
      <section 
        className="section section-dark science-grid-dark" 
        style={{
          position: 'relative',
          paddingTop: '4.5rem',
          paddingBottom: '5.5rem',
          overflow: 'hidden'
        }}
      >
        {/* Glow Halos */}
        <div className="glass-glow-halo" style={{ top: '-100px', right: '10%' }} />
        <div className="glass-glow-halo" style={{ bottom: '-50px', left: '-50px' }} />

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            {/* Left Content Column */}
            <div>
              <div 
                className="section-tag dark-tag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 1rem',
                  marginBottom: '1.25rem'
                }}
              >
                <Sparkles size={14} />
                <span>Premier Tanzania Laboratory Suppliers</span>
              </div>

              <h1 
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem'
                }}
              >
                Precision Equipment for Modern Laboratories
              </h1>

              <p 
                style={{
                  fontSize: '1.15rem',
                  color: '#CBD5E1',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                  maxWidth: '540px'
                }}
              >
                Explore reliable chemistry, laboratory and scientific equipment supplied by <strong>Seagull General Supply Limited</strong>. Designed for accuracy, durability, and institutional compliance.
              </p>

              {/* Quick Hero Search Input */}
              <form 
                onSubmit={handleHeroSearch}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.4rem 0.4rem 0.4rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginBottom: '2rem',
                  maxWidth: '520px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
                  <Search size={18} color="#00D2FF" />
                  <input 
                    type="text" 
                    placeholder="Find balances, microscopes, stirrers, glassware..."
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      width: '100%',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-cyan btn-sm">
                  Search
                </button>
              </form>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/order-request" className="btn btn-cyan btn-lg" style={{ backgroundColor: '#2E8BC9', color: '#FFFFFF', borderColor: '#2E8BC9' }}>
                  <span>Request Order / Quotation</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/products" className="btn btn-outline-white btn-lg">
                  <span>Explore Equipment</span>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00D2FF', fontFamily: 'var(--font-heading)' }}>500+</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Scientific Supplies</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00D2FF', fontFamily: 'var(--font-heading)' }}>350+</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Labs Equipped</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00D2FF', fontFamily: 'var(--font-heading)' }}>100%</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Original Products</div>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '2px solid rgba(0, 210, 255, 0.3)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
                  background: '#0B2545'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80" 
                  alt="Precision Laboratory Equipment" 
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />

                {/* Floating Glassmorphic Laboratory Floating Badge 1 */}
                <div 
                  className="card-glass-dark"
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    padding: '0.85rem 1.2rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-full)', background: 'rgba(0, 210, 255, 0.2)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700 }}>VERIFIED STANDARD</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>ISO & DIN Certified</div>
                  </div>
                </div>

                {/* Floating Glassmorphic Laboratory Floating Badge 2 */}
                <div 
                  className="card-glass-dark"
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    padding: '0.85rem 1.2rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6EE7B7', fontWeight: 700 }}>SEAGULL GUARANTEE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Services Beyond Measure!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES SECTION */}
      <section className="section science-grid-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore By Classification</span>
            <h2 className="section-title">Laboratory Equipment Categories</h2>
            <p className="section-subtitle">
              From precision analytical balances to specialized chemistry glassware and personal protective gear, browse our comprehensive inventory.
            </p>
          </div>

          <div className="grid-3">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => navigate(`/products?category=${cat.id}`)}
              >
                <div className="category-icon-wrapper">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="category-title">{cat.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {cat.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                  <span className="category-count">{cat.count}+ Products Available</span>
                  <span style={{ color: 'var(--color-primary-600)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>Browse</span>
                    <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION (Dynamically populated when Admin adds inventory) */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag" style={{ backgroundColor: '#EFF6FF', color: '#1B4268' }}>Inventory & Supplies</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem', color: '#163A59' }}>
                Featured Laboratory Inventory
              </h2>
              <p className="section-subtitle" style={{ margin: 0 }}>
                {featuredProducts.length > 0 
                  ? 'High-demand instruments and essential supplies ready for institutional dispatch.' 
                  : 'Official catalog inventory is managed live by our technical team. You can request any custom chemical or equipment below.'}
              </p>
            </div>
            {featuredProducts.length > 0 && (
              <Link to="/products" className="btn btn-outline" style={{ gap: '0.5rem', borderColor: '#1B4268', color: '#1B4268' }}>
                <span>View Full Catalogue ({products.length} Items)</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div 
              className="card" 
              style={{ 
                padding: '3rem 2rem', 
                textAlign: 'center', 
                backgroundColor: '#F8FAFC', 
                border: '2px dashed #CBD5E1',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#1B4268', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <FlaskConical size={30} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#163A59', marginBottom: '0.5rem' }}>
                Custom Laboratory Equipment & Direct Orders
              </h3>
              <p style={{ color: '#64748B', maxWidth: '560px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                We supply all chemistry apparatus, analytical instruments, measuring devices, and glassware on demand across Tanzania. Submit your equipment list for an immediate official Proforma Invoice.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/order-request" className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268', gap: '0.4rem' }}>
                  <span>Submit Equipment Order Request</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Contact Sales Team</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Value Proposition</span>
            <h2 className="section-title">Why Choose Seagull General Supply?</h2>
            <p className="section-subtitle">
              We stand out through our commitment to technical precision, reliable nationwide logistics across Tanzania, and authentic customer care.
            </p>
          </div>

          <div className="grid-4">
            <div className="feature-card">
              <div className="feature-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h3 className="feature-title">Quality Laboratory Equipment</h3>
              <p className="feature-desc">
                Every instrument and glassware item conforms strictly to international DIN and ISO scientific standards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Clock size={26} />
              </div>
              <h3 className="feature-title">Reliable & Timely Supply</h3>
              <p className="feature-desc">
                Swift delivery across Tanzania and neighboring regions with specialized shock-proof packaging for glassware.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <PhoneCall size={26} />
              </div>
              <h3 className="feature-title">Professional Technical Support</h3>
              <p className="feature-desc">
                Experienced laboratory scientists and engineers ready to advise on instrument specifications and setup.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Layers size={26} />
              </div>
              <h3 className="feature-title">Wide Product Range</h3>
              <p className="feature-desc">
                Comprehensive one-stop laboratory solutions from basic test tubes to automated spectrophotometers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTORS SERVED */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Industries & Sectors</span>
            <h2 className="section-title">Empowering Diverse Scientific Fields</h2>
            <p className="section-subtitle">
              Serving public and private institutions across Tanzania with specialized apparatus.
            </p>
          </div>

          <div className="grid-3">
            {COMPANY_INFO.sectors.map((sec, idx) => (
              <div 
                key={idx} 
                style={{
                  padding: '1.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-bg-main)',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ color: 'var(--color-primary-600)', background: 'var(--color-primary-50)', padding: '10px', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                  <Building2 size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-primary-900)' }}>
                    {sec.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {sec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section 
        className="section section-dark"
        style={{
          background: 'linear-gradient(135deg, #0A2540 0%, #0066CC 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-full)', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            <FileText size={15} />
            <span>Need Custom Lab Setup or Bulk Institutional Pricing?</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Need Laboratory Equipment?
          </h2>

          <p style={{ fontSize: '1.2rem', color: '#E0F2FE', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Talk to our experienced team today. We provide itemized quotations, technical datasheets, and fast procurement assistance.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-cyan btn-lg">
              <span>Contact Us</span>
              <ArrowRight size={18} />
            </Link>
            <button onClick={() => openQuoteModal()} className="btn btn-outline-white btn-lg">
              <span>Request Instant Quotation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
