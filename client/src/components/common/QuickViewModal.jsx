import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  ShoppingCart, 
  FileText, 
  Check, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, openQuoteModal, formatCurrency } = useCart();
  const { toastSuccess } = useNotification();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setAddedAnimation(true);
    toastSuccess(`Added ${quantity} × ${quickViewProduct.name} to cart`);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleRequestQuote = () => {
    const prod = quickViewProduct;
    closeQuickView();
    openQuoteModal(prod);
  };

  return (
    <div className="modal-overlay" onClick={closeQuickView}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '800px', padding: 'clamp(1.25rem, 3vw, 1.75rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-featured">Quick Inspect</span>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              SKU: <strong style={{ color: '#0F172A' }}>{quickViewProduct.sku}</strong>
            </span>
          </div>
          <button className="modal-close-btn" onClick={closeQuickView} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {/* Product Image Column */}
          <div>
            <div 
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid #CBD5E1',
                position: 'relative',
                backgroundColor: '#F8FAFC'
              }}
            >
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                style={{ width: '100%', height: '260px', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                <span className="badge badge-in-stock">In Stock</span>
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#475569' }}>
                <ShieldCheck size={15} color="#0284C7" />
                <span>Original Guaranteed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#475569' }}>
                <Truck size={15} color="#0284C7" />
                <span>Tanzania Delivery</span>
              </div>
            </div>
          </div>

          {/* Product Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase' }}>
              {quickViewProduct.category}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', margin: '0.35rem 0 0.5rem 0', lineHeight: 1.3 }}>
              {quickViewProduct.name}
            </h3>

            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>PRICE / ESTIMATE</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(quickViewProduct.price)}
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, marginBottom: '1rem' }}>
              {quickViewProduct.description}
            </p>

            {/* Quick Specs table snippet */}
            {quickViewProduct.specifications && (
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.35rem' }}>
                  KEY SPECIFICATIONS:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', fontSize: '0.78rem' }}>
                  {Object.entries(quickViewProduct.specifications).slice(0, 4).map(([key, val]) => (
                    <div key={key} style={{ color: '#475569' }}>
                      <strong style={{ color: '#0F172A' }}>{key}:</strong> {val}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #CBD5E1', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '36px', height: '36px', background: '#F8FAFC', fontWeight: 800, color: '#0F172A' }}
                  >
                    -
                  </button>
                  <span style={{ width: '38px', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: '36px', height: '36px', background: '#F8FAFC', fontWeight: 800, color: '#0F172A' }}
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart} 
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '140px', gap: '0.5rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}
                >
                  {addedAnimation ? <Check size={18} /> : <ShoppingCart size={18} />}
                  <span>{addedAnimation ? 'Added!' : 'Add to Cart'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleRequestQuote}
                  className="btn btn-secondary btn-sm" 
                  style={{ flex: 1, minWidth: '160px', backgroundColor: '#F0F9FF', color: '#0A192F', borderColor: '#BAE6FD' }}
                >
                  <FileText size={15} color="#0284C7" />
                  <span>Request Quotation</span>
                </button>
                <Link 
                  to={`/products/${quickViewProduct._id || quickViewProduct.id}`} 
                  onClick={closeQuickView}
                  className="btn btn-outline btn-sm"
                  style={{ minWidth: '100px', textAlign: 'center' }}
                >
                  <span>Full Details →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
