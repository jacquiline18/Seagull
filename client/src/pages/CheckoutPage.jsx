import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Download, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { orderService } from '../services/api';
import { COMPANY_INFO } from '../data/sampleProducts';

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
          <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <div 
              style={{
                width: '76px',
                height: '76px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <span className="section-tag" style={{ backgroundColor: 'var(--color-success-bg)', color: '#065F46', borderColor: '#A7F3D0' }}>
              Order Request Confirmed
            </span>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-950)', margin: '0.75rem 0' }}>
              Order Request Submitted Successfully!
            </h1>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 2rem auto' }}>
              Thank you, <strong>{completedOrder.customer.name}</strong>. Seagull General Supply Limited has received your order request. A sales representative will review your item requirements and contact you with the proforma invoice.
            </p>

            {/* Order Reference Card */}
            <div 
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--color-primary-50)',
                border: '1px solid var(--color-primary-200)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '2rem',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-primary-200)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-700)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Order Reference ID
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-900)', fontFamily: 'var(--font-mono)' }}>
                    {completedOrder._id || completedOrder.id}
                  </div>
                </div>
                <span className="badge badge-featured">Pending Verification</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Institution / Client:</span>
                  <strong>{completedOrder.customer.company || completedOrder.customer.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Email Address:</span>
                  <strong>{completedOrder.customer.email}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Phone Contact:</span>
                  <strong>{completedOrder.customer.phone}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Estimated Total:</span>
                  <strong>{formatCurrency(completedOrder.totalAmount)}</strong>
                </div>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary">
                Return to Product Catalogue
              </Link>
              <a 
                href={`https://wa.me/255743611101?text=Hello%20Seagull%20General%20Supply,%20I%20have%20submitted%20order%20reference%20${completedOrder._id || completedOrder.id}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary"
                style={{ gap: '0.4rem' }}
              >
                <MessageSquare size={16} />
                <span>Confirm on WhatsApp</span>
              </a>
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
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-600)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>
            <ArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>
          <span className="section-tag" style={{ display: 'block', width: 'fit-content' }}>Formal Procurement</span>
          <h1 className="section-title">Submit Order / Institutional Request</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '2.5rem', alignItems: 'start' }} className="checkout-layout-grid">
          {/* Left Checkout Form */}
          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
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

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting || cartItems.length === 0} 
                  className="btn btn-primary btn-block btn-lg"
                  style={{ gap: '0.5rem' }}
                >
                  {isSubmitting ? (
                    <span>Submitting Order Request...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Order Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Order Review Box */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              Order Review ({cartItems.length} Products)
            </h3>

            {/* Mini Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {cartItems.map(item => {
                const itemPrice = typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
                return (
                  <div key={item._id || item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary-950)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                        {item.name}
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        Qty: {item.quantity} × {formatCurrency(itemPrice)}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-900)' }}>
                      {formatCurrency(itemPrice * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculation */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Estimated Amount</span>
                <span style={{ fontWeight: 800, color: 'var(--color-primary-900)' }}>{subtotalFormatted}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                <span>Official Proforma Invoice</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Sent via Email</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '0.85rem', backgroundColor: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--color-primary-800)' }}>
              <strong>Direct Inquiries:</strong> Call +255 (0) 743 611 101 or email seagull.tech20@gmail.com for expedited quotation processing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
