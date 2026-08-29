import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Check, 
  ArrowLeft, 
  Download, 
  Share2, 
  HelpCircle, 
  CheckCircle2, 
  Phone,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_PRODUCTS, COMPANY_INFO } from '../data/sampleProducts';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { productService } from '../services/api';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openQuoteModal, formatCurrency } = useCart();
  const { toastSuccess, toastInfo } = useNotification();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('specs');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find product from ID
    const found = SAMPLE_PRODUCTS.find(p => p._id === id || p.id === id);
    if (found) {
      setProduct(found);
      // Find related products in same category
      const related = SAMPLE_PRODUCTS.filter(p => (p._id !== found._id && p.id !== found.id) && (p.categoryId === found.categoryId || p.category === found.category)).slice(0, 4);
      setRelatedProducts(related.length > 0 ? related : SAMPLE_PRODUCTS.slice(0, 4));
    } else {
      // Fallback
      setProduct(SAMPLE_PRODUCTS[0]);
    }
  }, [id]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    toastSuccess(`Added ${quantity} × ${product.name} to cart`);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleDownloadDatasheet = () => {
    toastInfo(`Generating official specification sheet for ${product.sku}...`);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="product-details-root section-sm" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
          <Link to="/" style={{ color: 'var(--color-primary-600)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: 'var(--color-primary-600)' }}>Catalogue</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${product.categoryId}`} style={{ color: 'var(--color-primary-600)' }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-text-main)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>
            {product.name}
          </span>
        </nav>

        {/* Top Product Hero Grid */}
        <div 
          className="card" 
          style={{ padding: '2.5rem', marginBottom: '3rem', backgroundColor: '#FFFFFF' }}
        >
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            {/* Left Image Viewport */}
            <div>
              <div 
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#F8FAFC',
                  position: 'relative'
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {product.featured && <span className="badge badge-featured">Featured Instrument</span>}
                  <span className={`badge ${product.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}`}>
                    {product.inStock ? 'In Stock (Dar es Salaam)' : 'Procurement on Request'}
                  </span>
                </div>
              </div>

              {/* Security & Warranty Trust Bar */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  marginTop: '1.25rem',
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={20} color="#0066CC" />
                  <span style={{ fontWeight: 700 }}>1-Year Warranty</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <Truck size={20} color="#0066CC" />
                  <span style={{ fontWeight: 700 }}>Tanzania Logistics</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={20} color="#0066CC" />
                  <span style={{ fontWeight: 700 }}>Factory Calibrated</span>
                </div>
              </div>
            </div>

            {/* Right Product Buy Box */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {product.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  SKU: <strong>{product.sku}</strong>
                </span>
              </div>

              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-primary-950)', marginBottom: '1rem', lineHeight: 1.25 }}>
                {product.name}
              </h1>

              {/* Price Banner */}
              <div 
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--color-primary-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-primary-200)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-primary-700)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official Price / Estimate
                  </div>
                  <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                    {formatCurrency(product.price)}
                  </div>
                </div>

                <button 
                  onClick={() => openQuoteModal(product)} 
                  className="btn btn-cyan btn-sm"
                  style={{ gap: '0.4rem' }}
                >
                  <FileText size={15} />
                  <span>Request Official Quotation</span>
                </button>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {product.description}
              </p>

              {/* Feature Quick List */}
              {product.features && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.6rem' }}>
                    Key Highlights:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {product.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                        <Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector & Add to Cart */}
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ width: '42px', height: '42px', background: '#F8FAFC', fontSize: '1.1rem', fontWeight: 700 }}
                    >
                      -
                    </button>
                    <span style={{ width: '50px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ width: '42px', height: '42px', background: '#F8FAFC', fontSize: '1.1rem', fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, minWidth: '200px' }}
                  >
                    {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
                    <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleDownloadDatasheet}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.4rem', flex: 1 }}
                  >
                    <Download size={15} />
                    <span>Print Technical Sheet</span>
                  </button>
                  <a 
                    href={`tel:${COMPANY_INFO.phoneClean}`}
                    className="btn btn-outline btn-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <Phone size={15} />
                    <span>Consult Engineer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Tabbed Table */}
        <div className="card" style={{ padding: '2rem', marginBottom: '3.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ borderBottom: '2px solid var(--color-border)', marginBottom: '1.5rem', display: 'flex', gap: '2rem' }}>
            <button 
              onClick={() => setActiveTab('specs')}
              style={{
                background: 'none',
                paddingBottom: '0.75rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: activeTab === 'specs' ? 'var(--color-primary-600)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'specs' ? '3px solid var(--color-primary-600)' : '3px solid transparent',
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
                fontSize: '1.1rem',
                fontWeight: 700,
                color: activeTab === 'warranty' ? 'var(--color-primary-600)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'warranty' ? '3px solid var(--color-primary-600)' : '3px solid transparent',
                marginBottom: '-2px'
              }}
            >
              Warranty & Calibration
            </button>
          </div>

          {activeTab === 'specs' && product.specifications && (
            <div className="table-responsive">
              <table className="custom-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr key={key} style={{ backgroundColor: idx % 2 === 0 ? 'var(--color-bg-subtle)' : '#FFFFFF' }}>
                      <td style={{ width: '35%', fontWeight: 700, color: 'var(--color-primary-900)' }}>{key}</td>
                      <td style={{ color: 'var(--color-text-main)' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div style={{ padding: '1rem 0', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              <h4 style={{ color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
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

        {/* Related Laboratory Equipment Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <span className="section-tag">Recommendations</span>
              <h2 className="section-title">Related Laboratory Equipment</h2>
            </div>
            <div className="grid-4">
              {relatedProducts.map(rel => (
                <ProductCard key={rel._id || rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
