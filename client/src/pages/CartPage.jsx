import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Minus,
  FlaskConical
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotalFormatted, formatCurrency, openQuoteModal } = useCart();
  const { toastSuccess, toastInfo } = useNotification();
  const navigate = useNavigate();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toastSuccess(`Removed "${name}" from cart`);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toastInfo('Cart cleared');
    }
  };

  return (
    <div className="cart-page-root section-sm science-grid-bg" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Title Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Order Summary</span>
          <h1 className="section-title" style={{ color: '#0A192F', marginBottom: '0.5rem' }}>
            Laboratory Equipment Cart
          </h1>
          <p className="section-subtitle" style={{ color: '#475569' }}>
            Review your selected scientific equipment, adjust quantities, or proceed to submit an official institutional order request.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }} className="cart-layout-grid">
            {/* Left Items Column */}
            <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                  Selected Items ({cartItems.length})
                </h3>
                <button 
                  onClick={handleClear}
                  style={{ background: 'none', color: '#DC2626', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}
                >
                  <Trash2 size={14} />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cartItems.map((item) => {
                  const itemPrice = typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div 
                      key={item._id || item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid #E2E8F0',
                        flexWrap: 'wrap'
                      }}
                    >
                      {/* Product Thumbnail */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid #CBD5E1' }}
                      />

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase' }}>
                          {item.category}
                        </span>
                        <Link to={`/products/${item._id || item.id}`}>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0A192F', margin: '0.2rem 0' }}>
                            {item.name}
                          </h4>
                        </Link>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                          SKU: {item.sku}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #CBD5E1', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          style={{ width: '32px', height: '32px', background: '#F8FAFC', fontWeight: 800, color: '#0A192F' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ width: '38px', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#0A192F' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          style={{ width: '32px', height: '32px', background: '#F8FAFC', fontWeight: 800, color: '#0A192F' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div style={{ minWidth: '110px', textAlign: 'right' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A192F', fontFamily: 'var(--font-mono)' }}>
                          {formatCurrency(itemTotal)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          {formatCurrency(itemPrice)} each
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button 
                        onClick={() => handleRemove(item._id || item.id, item.name)}
                        style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-full)', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FECACA' }}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369A1', fontWeight: 700, fontSize: '0.9rem' }}>
                  <ArrowLeft size={16} />
                  <span>Continue Browsing Catalogue</span>
                </Link>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                Order Estimate
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Item Subtotal</span>
                  <span style={{ fontWeight: 800, color: '#0A192F' }}>{subtotalFormatted}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Logistics & Handling</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Calculated on Request</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Calibration Certification</span>
                  <span style={{ color: '#0369A1', fontWeight: 700 }}>Included</span>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '2px dashed #CBD5E1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A192F' }}>
                    Total (TZS)
                  </span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                    {subtotalFormatted}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  onClick={() => navigate('/order-request')}
                  className="btn btn-primary btn-block btn-lg"
                  style={{ gap: '0.5rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}
                >
                  <span>Proceed to Order Request</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  onClick={() => openQuoteModal()}
                  className="btn btn-secondary btn-block"
                  style={{ gap: '0.4rem', backgroundColor: '#F0F9FF', color: '#0A192F', borderColor: '#BAE6FD' }}
                >
                  <FileText size={16} color="#0284C7" />
                  <span>Request Proforma Invoice</span>
                </button>
              </div>

              {/* Guarantees note */}
              <div style={{ marginTop: '1.5rem', padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0A192F', fontWeight: 700 }}>
                  <ShieldCheck size={16} color="#0284C7" />
                  <span>Seagull Procurement Guarantee</span>
                </div>
                <span>All quotes are verified with official TIN/VAT documentation for institutional compliance.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '640px', margin: '0 auto', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-full)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <ShoppingCart size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
              Your Cart is Currently Empty
            </h3>

            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
              You haven't added any chemistry or laboratory equipment yet. Browse our catalogue to choose precision instruments, glassware, and consumables.
            </p>

            <Link to="/products" className="btn btn-primary btn-lg" style={{ gap: '0.5rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
              <FlaskConical size={18} />
              <span>Explore Laboratory Equipment</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
