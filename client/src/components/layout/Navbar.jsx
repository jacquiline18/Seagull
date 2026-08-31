import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Instagram, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  User, 
  FlaskConical,
  ClipboardList
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { COMPANY_INFO } from '../../data/sampleProducts';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  
  const { totalItemsCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchBarOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchBarOpen(false);
    }
  };

  return (
    <header className="navbar-wrapper-root" style={{ width: '100%' }}>
      {/* Top Brand Utility Bar (Navy Blue & White) */}
      <div 
        style={{
          backgroundColor: '#1B4268',
          color: '#E2E8F0',
          fontSize: '0.8125rem',
          padding: '0.45rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={`tel:${COMPANY_INFO.phoneClean}`} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#FFFFFF', fontWeight: 600 }}
            >
              <Phone size={13} color="#38BDF8" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#FFFFFF', fontWeight: 600 }}
            >
              <Mail size={13} color="#38BDF8" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#BAE6FD' }} className="d-none-sm">
              <FlaskConical size={13} />
              <span>Tanzania Scientific & Laboratory Supplies</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href={COMPANY_INFO.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#FFFFFF', fontWeight: 600 }}
              title="Follow Seagull5816 on Instagram"
            >
              <Instagram size={13} color="#E1306C" />
              <span>@{COMPANY_INFO.instagram}</span>
            </a>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link 
                  to="/admin/dashboard" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#BAE6FD', fontWeight: 700 }}
                >
                  <ShieldCheck size={14} />
                  <span>Admin</span>
                </Link>
                <button 
                  onClick={logout}
                  style={{ background: 'none', color: '#CBD5E1', fontSize: '0.75rem', textDecoration: 'underline' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#E2E8F0' }}
              >
                <User size={13} />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main White Navbar */}
      <nav className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-container">
            {/* Brand Logo with exact brand shape */}
            <Link to="/" className="brand-logo-link">
              <img src="/seagull-logo.svg" alt="Seagull General Supply" className="brand-logo-img" style={{ width: '46px', height: '46px' }} />
              <div className="brand-text-block">
                <span className="brand-company-title" style={{ color: '#0A192F', fontSize: '1.1rem' }}>SEAGULL</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1B4268', letterSpacing: '0.04em' }}>
                  GENERAL SUPPLY LIMITED
                </span>
                <span className="brand-tagline-text" style={{ color: '#0284C7', fontStyle: 'italic', textTransform: 'none', fontWeight: 700, fontSize: '0.74rem' }}>
                  Services Beyond Measure!
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="nav-links-desktop">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/order-request" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Request Order
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Products
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </div>

            {/* Actions & Utilities */}
            <div className="nav-actions">
              {/* Search Toggle */}
              <button 
                className="btn-icon"
                onClick={() => setSearchBarOpen(!searchBarOpen)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: searchBarOpen ? '#E0F2FE' : '#F1F5F9',
                  color: '#0A192F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #CBD5E1'
                }}
                title="Search Laboratory Equipment"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {/* Cart Button */}
              <Link to="/cart" className="cart-btn-indicator" title="Shopping Cart" aria-label="Shopping Cart" style={{ width: '38px', height: '38px' }}>
                <ShoppingCart size={18} color="#0A192F" />
                {totalItemsCount > 0 && (
                  <span className="cart-badge-count">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              {/* Direct Request Order CTA Button */}
              <Link 
                to="/order-request" 
                className="btn btn-primary btn-sm d-none-mobile"
                style={{ gap: '0.4rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}
              >
                <ClipboardList size={15} />
                <span>Request Order</span>
              </Link>

              {/* Mobile Hamburger Menu */}
              <button 
                className="btn-icon d-lg-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: '#F0F9FF',
                  color: '#0A192F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #BAE6FD'
                }}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Quick Search Drawer */}
          {searchBarOpen && (
            <div 
              style={{
                padding: '0.75rem 0 1rem 0',
                borderTop: '1px solid #E2E8F0',
                animation: 'fadeIn 0.2s ease-in'
              }}
            >
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search 
                    size={17} 
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} 
                  />
                  <input 
                    type="text"
                    placeholder="Search chemical equipment, balances, microscopes, glassware..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '110px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 110px)',
            backgroundColor: '#FFFFFF',
            zIndex: 899,
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflowY: 'auto',
            borderTop: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.05rem',
                backgroundColor: isActive ? '#F0F9FF' : 'transparent',
                color: isActive ? '#0284C7' : '#0A192F'
              })}
            >
              Home
            </NavLink>
            <NavLink 
              to="/order-request" 
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.05rem',
                backgroundColor: isActive ? '#F0F9FF' : 'transparent',
                color: isActive ? '#0284C7' : '#0A192F'
              })}
            >
              Request Order / Quotation
            </NavLink>
            <NavLink 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.05rem',
                backgroundColor: isActive ? '#F0F9FF' : 'transparent',
                color: isActive ? '#0284C7' : '#0A192F'
              })}
            >
              Products Catalogue
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.05rem',
                backgroundColor: isActive ? '#F0F9FF' : 'transparent',
                color: isActive ? '#0284C7' : '#0A192F'
              })}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.05rem',
                backgroundColor: isActive ? '#F0F9FF' : 'transparent',
                color: isActive ? '#0284C7' : '#0A192F'
              })}
            >
              Contact Us
            </NavLink>
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link 
              to="/order-request" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-block"
              style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}
            >
              <ClipboardList size={18} />
              <span>Submit Order Request</span>
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary btn-block"
              style={{ backgroundColor: '#F0F9FF', color: '#0A192F', borderColor: '#BAE6FD' }}
            >
              <ShoppingCart size={18} />
              <span>View Cart ({totalItemsCount} items)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
