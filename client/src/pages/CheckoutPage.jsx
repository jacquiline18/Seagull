import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  FileText, 
  ShieldCheck, 
  Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { orderService } from '../services/api';

export const CheckoutPage = () => {
  const { cartItems, subtotal, subtotalFormatted, clearCart, formatCurrency } = useCart();
  const { toastSuccess, toastError } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    deliveryAddress: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toastError('Your cart is empty. Please add products before checking out.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          deliveryAddress: formData.deliveryAddress
        },
        products: cartItems.map(item => ({
          product: item._id || item.id,
          name: item.name,
          price: typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0,
          quantity: item.quantity
        })),
        totalAmount: subtotal,
        notes: formData.notes,
        status: 'Pending'
      };

      const res = await orderService.createOrder(orderPayload);
      if (res && res.order) {
        setCompletedOrder(res.order);
        setOrderComplete(true);
        clearCart();
        toastSuccess('Order request submitted successfully!');
      }
    } catch {
      toastError('Failed to process order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete && completedOrder) {
    return (
      <div className="section-sm science-grid-bg" style={{ minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
            <div 
              style={{
                width: '68px',
                height: '68px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <span className="section-tag" style={{ backgroundColor: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}>
              Order Request Confirmed
            </span>

            <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)', fontWeight: 800, color: '#0A192F', margin: '0.75rem 0' }}>
              Order Request Submitted Successfully!
            </h1>

            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 2rem auto' }}>
              Thank you, <strong>{completedOrder.customer.name}</strong>. Seagull General Supply Limited has received your order request. A sales representative will review your item requirements and contact you with the proforma invoice.
            </p>

            {/* Order Reference Card */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>ORDER REFERENCE</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                    {completedOrder._id || completedOrder.id}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#64748B' }}>
                  Status: <strong style={{ color: '#F59E0B' }}>Pending Verification</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                {completedOrder.products.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#334155' }}>
                    <span>{item.quantity} × {item.name}</span>
                    <strong style={{ color: '#0A192F' }}>{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px dashed #CBD5E1', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0A192F' }}>Total Estimated Amount:</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(completedOrder.totalAmount)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => window.print()} className="btn btn-secondary" style={{ gap: '0.4rem' }}>
                <Printer size={16} />
                <span>Print Confirmation</span>
              </button>
              <Link to="/products" className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                Browse More Equipment
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-root section-sm science-grid-bg" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369A1', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            <ArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>
          <span className="section-tag" style={{ display: 'block', width: 'fit-content', backgroundColor: '#E0F2FE', color: '#0369A1' }}>Formal Procurement</span>
          <h1 className="section-title" style={{ color: '#0A192F', marginBottom: '0.35rem' }}>Submit Order / Institutional Request</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }} className="checkout-layout-grid">
          {/* Left Checkout Form */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              1. Customer & Institutional Information
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Dr. Frank Masanja" 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="e.g. f.masanja@lab.or.tz" 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number / WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="e.g. +255 743 611 101" 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company / Institution / Lab</label>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="e.g. Muhimbili University / Mines QC Lab" 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address / Laboratory Location *</label>
                <input 
                  type="text" 
                  name="deliveryAddress" 
                  required 
                  value={formData.deliveryAddress} 
                  onChange={handleChange} 
                  placeholder="e.g. Science Block Floor 2, University Campus, Dar es Salaam, Tanzania" 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Instructions / Tender Ref</label>
                <textarea 
                  name="notes" 
                  rows="3" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  placeholder="Add custom voltage specifications, calibration certificates required, delivery deadlines, or payment term preferences..." 
                  className="form-textarea" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="btn btn-primary btn-block btn-lg"
                style={{ marginTop: '1rem', gap: '0.5rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Institutional Order Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Order Review Sidebar */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              Order Review ({cartItems.length} items)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.25rem' }}>
              {cartItems.map(item => (
                <div key={item._id || item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0A192F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Estimated Subtotal</span>
                <span style={{ fontWeight: 800, color: '#0A192F' }}>{subtotalFormatted}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Institutional Verification</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>Included</span>
              </div>
              <div style={{ paddingTop: '0.75rem', borderTop: '2px dashed #CBD5E1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A192F' }}>Total Estimate:</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                  {subtotalFormatted}
                </span>
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#F0F9FF', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: '#1B4268', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #BAE6FD' }}>
              <ShieldCheck size={16} color="#1B4268" style={{ flexShrink: 0 }} />
              <span>Official invoice with EFD / VAT compliance will be issued prior to payment.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
