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
  FlaskConical,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, subtotalFormatted, formatCurrency, openQuoteModal } = useCart();
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
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Order Summary</span>
          <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Laboratory Equipment Cart
          </h1>
          <p className="section-subtitle">
            Review your selected scientific equipment, adjust quantities, or proceed to submit an official institutional order request.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }} className="cart-layout-grid">
            {/* Left Items Column */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  Selected Items ({cartItems.length})
                </h3>
                <button 
                  onClick={handleClear}
                  style={{ background: 'none', color: 'var(--color-danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}
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
                        gap: '1.25rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid var(--color-border)',
                        flexWrap: 'wrap'
                      }}
                    >
                      {/* Product Thumbnail */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                      />

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase' }}>
                          {item.category}
                        </span>
                        <Link to={`/products/${item._id || item.id}`}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-950)', margin: '0.2rem 0' }}>
                            {item.name}
                          </h4>
                        </Link>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                          SKU: {item.sku}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          style={{ width: '32px', height: '32px', background: 'var(--color-bg-subtle)', fontWeight: 700 }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ width: '38px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          style={{ width: '32px', height: '32px', background: 'var(--color-bg-subtle)', fontWeight: 700 }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div style={{ minWidth: '120px', textAlign: 'right' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                          {formatCurrency(itemTotal)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {formatCurrency(itemPrice)} each
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button 
                        onClick={() => handleRemove(item._id || item.id, item.name)}
                        style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-full)', background: 'var(--color-danger-bg)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-600)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <ArrowLeft size={16} />
                  <span>Continue Browsing Catalogue</span>
                </Link>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                Order Estimate
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Item Subtotal</span>
                  <span style={{ fontWeight: 700 }}>{subtotalFormatted}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Logistics & Handling</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>Calculated on Request</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Calibration Certification</span>
                  <span style={{ color: 'var(--color-primary-600)', fontWeight: 700 }}>Included</span>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '2px dashed var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-950)' }}>
                    Total (TZS)
                  </span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-600)' }}>
                    {subtotalFormatted}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary btn-block btn-lg"
                  style={{ gap: '0.5rem' }}
                >
                  <span>Proceed to Order Request</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  onClick={() => openQuoteModal()}
                  className="btn btn-secondary btn-block"
                  style={{ gap: '0.4rem' }}
                >
                  <FileText size={16} />
                  <span>Request Proforma Invoice</span>
                </button>
              </div>

              {/* Guarantees note */}
              <div style={{ marginTop: '1.5rem', padding: '0.85rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-900)', fontWeight: 700 }}>
                  <ShieldCheck size={16} color="#0066CC" />
                  <span>Seagull Procurement Guarantee</span>
                </div>
                <span>All quotes are verified with official TIN/VAT documentation for institutional compliance.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="card" style={{ textAlign: 'center', padding: '4.5rem 2rem', maxWidth: '640px', margin: '0 auto', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <ShoppingCart size={40} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
              Your Cart is Currently Empty
            </h3>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              You haven't added any chemistry or laboratory equipment yet. Browse our catalogue to choose precision instruments, glassware, and consumables.
            </p>

            <Link to="/products" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
              <FlaskConical size={18} />
              <span>Explore Laboratory Equipment</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
