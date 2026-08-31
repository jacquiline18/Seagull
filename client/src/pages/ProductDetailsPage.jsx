import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Check, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { productService } from '../services/api';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openQuoteModal, formatCurrency } = useCart();
  const { toastSuccess } = useNotification();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductById(id);
        if (res && res.product) {
          setProduct(res.product);
        } else {
          const fallback = SAMPLE_PRODUCTS.find(p => p._id === id || p.id === id) || SAMPLE_PRODUCTS[0];
          setProduct(fallback);
        }
      } catch {
        const fallback = SAMPLE_PRODUCTS.find(p => p._id === id || p.id === id) || SAMPLE_PRODUCTS[0];
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const related = SAMPLE_PRODUCTS
        .filter(p => (p._id !== product._id && p.id !== product.id) && (p.categoryId === product.categoryId || p.category === product.category))
        .slice(0, 4);
      setRelatedProducts(related.length > 0 ? related : SAMPLE_PRODUCTS.slice(0, 4));
    }
  }, [product]);

  if (loading || !product) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #CBD5E1', borderTopColor: '#0284C7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#475569', fontWeight: 600 }}>Loading Laboratory Specifications...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    toastSuccess(`Added ${quantity} × ${product.name} to inquiry cart.`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-details-root section-sm" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#0369A1', fontWeight: 600 }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: '#0369A1', fontWeight: 600 }}>Catalogue</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${product.categoryId || 'all'}`} style={{ color: '#0369A1', fontWeight: 600 }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: '#0F172A', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>
            {product.name}
          </span>
        </nav>

        {/* Top Product Hero Card */}
        <div 
          className="card" 
          style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', marginBottom: '2.5rem', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}
        >
          <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Image Viewport */}
            <div>
              <div 
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  position: 'relative'
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: 'clamp(260px, 40vw, 420px)', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {product.featured && <span className="badge badge-featured">Featured Instrument</span>}
                  <span className={`badge ${product.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}`}>
                    {product.inStock ? 'In Stock (Tanzania)' : 'Procurement on Request'}
                  </span>
                </div>
              </div>

              {/* Security & Warranty Trust Bar */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  marginTop: '1.25rem',
                  padding: '0.85rem',
                  backgroundColor: '#F0F9FF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid #BAE6FD',
                  textAlign: 'center',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={20} color="#0284C7" />
                  <span style={{ fontWeight: 700, color: '#0A192F' }}>1-Year Warranty</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <Truck size={20} color="#0284C7" />
                  <span style={{ fontWeight: 700, color: '#0A192F' }}>Tanzania Logistics</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle2 size={20} color="#0284C7" />
                  <span style={{ fontWeight: 700, color: '#0A192F' }}>Factory Calibrated</span>
                </div>
              </div>
            </div>

            {/* Right Product Buy Box */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {product.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                  SKU: <strong style={{ color: '#0F172A' }}>{product.sku}</strong>
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.95rem)', fontWeight: 800, color: '#0A192F', marginBottom: '1rem', lineHeight: 1.25 }}>
                {product.name}
              </h1>

              {/* Price Banner */}
              <div 
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#F0F9FF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid #BAE6FD',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#0369A1', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official Price / Estimate
                  </div>
                  <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 800, color: '#0A192F', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(product.price)}
                  </div>
                </div>

                <button 
                  onClick={() => openQuoteModal(product)} 
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem', backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', color: '#0A192F' }}
                >
                  <FileText size={15} color="#0284C7" />
                  <span>Request Official Quotation</span>
                </button>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {product.description}
              </p>

              {/* Feature Quick List */}
              {product.features && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0A192F', marginBottom: '0.6rem' }}>
                    Key Highlights:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {product.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: '#334155' }}>
                        <Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector & Add to Cart */}
              <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #CBD5E1', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ width: '42px', height: '42px', background: '#F8FAFC', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span style={{ width: '50px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ width: '42px', height: '42px', background: '#F8FAFC', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, minWidth: '200px', backgroundColor: '#1B4268', borderColor: '#1B4268' }}
                  >
                    {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                    <span>{added ? 'Added to Cart!' : 'Add to Inquiry Cart'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Warranty Info */}
        <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '3.5rem', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
          <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #E2E8F0', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('specs')}
              style={{
                background: 'none',
                paddingBottom: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: activeTab === 'specs' ? '#0284C7' : '#64748B',
                borderBottom: activeTab === 'specs' ? '3px solid #0284C7' : '3px solid transparent',
                marginBottom: '-2px'
              }}
            >
              Technical Specifications
            </button>
            <button 
              onClick={() => setActiveTab('warranty')}
              style={{
                background: 'none',
                paddingBottom: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: activeTab === 'warranty' ? '#0284C7' : '#64748B',
                borderBottom: activeTab === 'warranty' ? '3px solid #0284C7' : '3px solid transparent',
                marginBottom: '-2px'
              }}
            >
              Warranty & Calibration
            </button>
          </div>

          {activeTab === 'specs' && product.specifications && (
            <div className="table-responsive">
              <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr key={key} style={{ backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ width: '35%', fontWeight: 700, color: '#0A192F', padding: '0.85rem 1rem' }}>{key}</td>
                      <td style={{ color: '#334155', padding: '0.85rem 1rem' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div style={{ padding: '0.5rem 0', color: '#334155', lineHeight: 1.7 }}>
              <h4 style={{ color: '#0A192F', marginBottom: '0.5rem', fontWeight: 800 }}>
                Seagull Quality Assurance Guarantee
              </h4>
              <p style={{ marginBottom: '1rem' }}>
                All scientific apparatus and laboratory instruments supplied by Seagull General Supply Limited undergo pre-dispatch inspection and calibration checks. Equipment is covered under a 12-month standard manufacturer warranty against manufacturing defects.
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Factory test certificates and conformity reports provided upon request.</li>
                <li>On-site installation and operator training available for institutions in Dar es Salaam and upcountry regions.</li>
                <li>Spare parts and consumable replenishment support throughout instrument lifespan.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Related Equipment Suggestions */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                Related Laboratory Instruments
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                Complementary apparatus and supplies frequently requested together
              </p>
            </div>
            <div className="grid-4">
              {relatedProducts.map(p => (
                <ProductCard key={p._id || p.id || p.sku} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
