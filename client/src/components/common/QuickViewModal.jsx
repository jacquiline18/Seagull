import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  ShoppingCart, 
  FileText, 
  Check, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Info,
  CheckCircle2
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
        style={{ maxWidth: '820px', padding: '1.75rem' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ marginBottom: '1rem', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-featured">Quick Inspect</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              SKU: {quickViewProduct.sku}
            </span>
          </div>
          <button className="modal-close-btn" onClick={closeQuickView} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Product Image Column */}
          <div>
            <div 
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                position: 'relative',
                backgroundColor: '#F8FAFC'
              }}
            >
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span className="badge badge-in-stock">In Stock</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <ShieldCheck size={14} color="#0066CC" />
                <span>Original Guaranteed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <Truck size={14} color="#0066CC" />
                <span>Tanzania Delivery</span>
              </div>
            </div>
          </div>

          {/* Product Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase' }}>
              {quickViewProduct.category}
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.4rem 0 0.75rem 0', lineHeight: 1.3 }}>
              {quickViewProduct.name}
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>PRICE / ESTIMATE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                {formatCurrency(quickViewProduct.price)}
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {quickViewProduct.description}
            </p>

            {/* Quick Specs table snippet */}
            {quickViewProduct.specifications && (
              <div style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.4rem' }}>
                  KEY SPECIFICATIONS:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', fontSize: '0.78rem' }}>
                  {Object.entries(quickViewProduct.specifications).slice(0, 4).map(([key, val]) => (
                    <div key={key} style={{ color: 'var(--color-text-muted)' }}>
                      <strong style={{ color: 'var(--color-text-main)' }}>{key}:</strong> {val}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '36px', height: '36px', background: '#F8FAFC', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: '36px', height: '36px', background: '#F8FAFC', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart} 
                  className="btn btn-primary"
                  style={{ flex: 1, gap: '0.5rem' }}
                >
                  {addedAnimation ? <Check size={18} /> : <ShoppingCart size={18} />}
                  <span>{addedAnimation ? 'Added!' : 'Add to Cart'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleRequestQuote}
                  className="btn btn-secondary btn-sm" 
                  style={{ flex: 1 }}
                >
                  <FileText size={15} />
                  <span>Request Official Quotation</span>
                </button>
                <Link 
                  to={`/products/${quickViewProduct._id || quickViewProduct.id}`} 
                  onClick={closeQuickView}
                  className="btn btn-outline btn-sm"
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
