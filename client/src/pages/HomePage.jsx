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
  Activity
} from 'lucide-react';
import { CATEGORIES, SAMPLE_PRODUCTS, COMPANY_INFO } from '../data/sampleProducts';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';

export const HomePage = () => {
  const navigate = useNavigate();
  const { openQuoteModal } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProductsCount, setAllProductsCount] = useState(SAMPLE_PRODUCTS.length);
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await productService.getAllProducts();
        if (res && res.products && Array.isArray(res.products) && res.products.length > 0) {
          const featured = res.products.filter(p => p.featured).slice(0, 8);
          setFeaturedProducts(featured.length > 0 ? featured : res.products.slice(0, 8));
          setAllProductsCount(res.products.length);
        } else {
          const featured = SAMPLE_PRODUCTS.filter(p => p.featured).slice(0, 8);
          setFeaturedProducts(featured.length > 0 ? featured : SAMPLE_PRODUCTS.slice(0, 8));
          setAllProductsCount(SAMPLE_PRODUCTS.length);
        }
      } catch {
        const featured = SAMPLE_PRODUCTS.filter(p => p.featured).slice(0, 8);
        setFeaturedProducts(featured.length > 0 ? featured : SAMPLE_PRODUCTS.slice(0, 8));
        setAllProductsCount(SAMPLE_PRODUCTS.length);
      }
    };
    loadData();
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
      {/* 1. HERO SECTION - HIGH CONTRAST & CRYSTAL CLEAR TYPOGRAPHY */}
      <section 
        className="section science-grid-bg" 
        style={{
          position: 'relative',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #E0F2FE 100%)',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            {/* Left Content Column */}
            <div>
              {/* Premier Tanzania Supplier Tag */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  marginBottom: '1.25rem',
                  background: '#E0F2FE',
                  color: '#0369A1',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #BAE6FD',
                  fontWeight: 700,
                  fontSize: '0.82rem'
                }}
              >
                <Sparkles size={16} color="#0284C7" />
                <span>Premier Tanzania Laboratory Suppliers</span>
              </div>

              {/* High Contrast Dark/Black Headline */}
              <h1 
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#0A192F',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem'
                }}
              >
                Precision Equipment for Modern Laboratories
              </h1>

              {/* Crisp Subtitle */}
              <p 
                style={{
                  fontSize: '1.1rem',
                  color: '#334155',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem',
                  maxWidth: '560px',
                  fontWeight: 400
                }}
              >
                Explore reliable chemistry, laboratory and scientific equipment supplied by <strong style={{ color: '#0F172A' }}>Seagull General Supply Limited</strong>. Engineered for accuracy, durability, and institutional compliance.
              </p>

              {/* Quick Hero Search Input */}
              <form 
                onSubmit={handleHeroSearch}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  backgroundColor: '#FFFFFF',
                  padding: '0.4rem 0.4rem 0.4rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid #CBD5E1',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                  marginBottom: '1.75rem',
                  maxWidth: '520px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '0.5rem', minWidth: '180px' }}>
                  <Search size={18} color="#0284C7" />
                  <input 
                    type="text" 
                    placeholder="Find balances, microscopes, stirrers, glassware..."
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0F172A',
                      width: '100%',
                      fontSize: '0.92rem',
                      outline: 'none',
                      fontWeight: 500
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                  Search
                </button>
              </form>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/order-request" className="btn btn-primary btn-lg" style={{ backgroundColor: '#1B4268', color: '#FFFFFF', borderColor: '#1B4268' }}>
                  <span>Request Order / Quotation</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg" style={{ borderColor: '#1B4268', color: '#1B4268', backgroundColor: '#FFFFFF' }}>
                  <span>Explore Equipment</span>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-heading)' }}>500+</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>Scientific Supplies</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-heading)' }}>350+</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>Labs Equipped</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-heading)' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>Original Products</div>
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
                  border: '2px solid #BAE6FD',
                  boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.15)',
                  background: '#FFFFFF'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80" 
                  alt="Precision Laboratory Equipment" 
                  style={{ width: '100%', height: 'clamp(280px, 35vw, 440px)', objectFit: 'cover' }}
                />

                {/* Floating Glassmorphic Laboratory Floating Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Activity size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800 }}>SEAGULL GUARANTEE</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0A192F' }}>Services Beyond Measure!</div>
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
            <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Explore By Classification</span>
            <h2 className="section-title" style={{ color: '#0A192F' }}>Laboratory Equipment Categories</h2>
            <p className="section-subtitle" style={{ color: '#475569' }}>
              From precision analytical balances to specialized chemistry glassware and personal protective gear, browse our comprehensive inventory.
            </p>
          </div>

          <div className="grid-3">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => navigate(`/products?category=${cat.id}`)}
                style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}
              >
                <div className="category-icon-wrapper" style={{ background: '#EFF6FF', color: '#1B4268' }}>
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="category-title" style={{ color: '#0A192F' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {cat.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #E2E8F0' }}>
                  <span className="category-count" style={{ color: '#64748B', fontWeight: 600 }}>{cat.count}+ Products Available</span>
                  <span style={{ color: '#1B4268', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>Browse</span>
                    <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag" style={{ backgroundColor: '#EFF6FF', color: '#1B4268' }}>Inventory & Supplies</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem', color: '#0A192F' }}>
                Featured Laboratory Inventory
              </h2>
              <p className="section-subtitle" style={{ margin: 0, color: '#475569' }}>
                High-demand instruments and certified supplies ready for institutional dispatch across Tanzania.
              </p>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ gap: '0.5rem', borderColor: '#1B4268', color: '#1B4268', backgroundColor: '#FFFFFF' }}>
              <span>View Full Catalogue ({allProductsCount} Items)</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id || product.id || product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="section section-subtle" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Our Value Proposition</span>
            <h2 className="section-title" style={{ color: '#0A192F' }}>Why Choose Seagull General Supply?</h2>
            <p className="section-subtitle" style={{ color: '#475569' }}>
              We stand out through our commitment to technical precision, reliable nationwide logistics across Tanzania, and authentic customer care.
            </p>
          </div>

          <div className="grid-4">
            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Quality Laboratory Equipment</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
                Every instrument and glassware item conforms strictly to international DIN and ISO scientific standards.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <Clock size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Reliable & Timely Supply</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
                Swift delivery across Tanzania and neighboring regions with specialized shock-proof packaging for glassware.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <PhoneCall size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Professional Technical Support</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
                Experienced laboratory scientists and engineers ready to advise on instrument specifications and setup.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div className="feature-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <Layers size={26} />
              </div>
              <h3 className="feature-title" style={{ color: '#0A192F' }}>Wide Product Range</h3>
              <p className="feature-desc" style={{ color: '#475569' }}>
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
            <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Industries & Sectors</span>
            <h2 className="section-title" style={{ color: '#0A192F' }}>Empowering Diverse Scientific Fields</h2>
            <p className="section-subtitle" style={{ color: '#475569' }}>
              Serving public and private institutions across Tanzania with specialized apparatus.
            </p>
          </div>

          <div className="grid-3">
            {COMPANY_INFO.sectors.map((sec, idx) => (
              <div 
                key={idx} 
                style={{
                  padding: '1.75rem',
                  border: '1px solid #CBD5E1',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ color: '#1B4268', background: '#E0F2FE', padding: '10px', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                  <Building2 size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0A192F' }}>
                    {sec.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
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
          background: 'linear-gradient(135deg, #0A192F 0%, #1B4268 100%)',
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

          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.8rem)', color: '#FFFFFF', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Need Laboratory Equipment?
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#E2E8F0', marginBottom: '2rem', lineHeight: 1.6 }}>
            Talk to our experienced team today. We provide itemized quotations, technical datasheets, and fast procurement assistance.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-cyan btn-lg" style={{ backgroundColor: '#0284C7', color: '#FFFFFF', borderColor: '#0284C7' }}>
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
