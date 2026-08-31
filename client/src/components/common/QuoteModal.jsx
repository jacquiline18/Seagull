import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { contactService } from '../../services/api';

export const QuoteModal = () => {
  const { isQuoteModalOpen, quoteModalProduct, closeQuoteModal } = useCart();
  const { toastSuccess, toastError } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    department: '',
    productName: '',
    quantity: 1,
    specRequirements: '',
    deliveryLocation: 'Dar es Salaam, Tanzania'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [quoteRefNumber, setQuoteRefNumber] = useState('');

  useEffect(() => {
    if (quoteModalProduct) {
      setFormData(prev => ({
        ...prev,
        productName: quoteModalProduct.name,
        quantity: 1,
        specRequirements: `Reference SKU: ${quoteModalProduct.sku}. Please include delivery lead time and formal Proforma Invoice.`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        productName: 'General Laboratory Supplies / Multiple Items',
        quantity: 1,
        specRequirements: 'Please quote based on attached specifications / requirements.'
      }));
    }
    setSubmittedSuccess(false);
  }, [quoteModalProduct]);

  if (!isQuoteModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const generatedRef = 'SGL-QT-' + Math.floor(100000 + Math.random() * 900000);
      setQuoteRefNumber(generatedRef);

      await contactService.sendMessage({
        ...formData,
        subject: `Official Quotation Request [${generatedRef}] - ${formData.productName}`,
        type: 'quote_request'
      });

      setSubmittedSuccess(true);
      toastSuccess('Quotation request submitted to Seagull General Supply Limited!');
    } catch {
      toastError('Failed to send quotation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeQuoteModal}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', padding: 'clamp(1.25rem, 3vw, 2rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>Request Official Quotation</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>
                Seagull General Supply Limited • "Services Beyond Measure!"
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={closeQuoteModal} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {submittedSuccess ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={38} />
            </div>
            <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
              Quotation Request Received!
            </h4>
            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
              Our scientific sales engineers have received your inquiry. A formal proforma invoice with technical specifications will be dispatched to <strong>{formData.email}</strong>.
            </p>

            <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.75rem', border: '1px solid #CBD5E1' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', fontWeight: 700 }}>QUOTE REFERENCE CODE</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                {quoteRefNumber}
              </span>
            </div>

            <div>
              <button onClick={closeQuoteModal} className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                Return to Catalog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {quoteModalProduct && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', backgroundColor: '#F0F9FF', borderRadius: 'var(--radius-md)', border: '1px solid #BAE6FD', marginBottom: '1.25rem' }}>
                <img src={quoteModalProduct.image} alt={quoteModalProduct.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0A192F' }}>{quoteModalProduct.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#0369A1', fontWeight: 600 }}>SKU: {quoteModalProduct.sku} • {quoteModalProduct.category}</div>
                </div>
              </div>
            )}

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Dr. John Mrope" 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Official Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e.g. j.mrope@lab.co.tz" 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Phone / WhatsApp *</label>
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

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Institution / Organization *</label>
                <input 
                  type="text" 
                  name="organization" 
                  required 
                  value={formData.organization} 
                  onChange={handleChange} 
                  placeholder="e.g. UDSM / Aga Khan / Lab" 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Quantity Units Required</label>
                <input 
                  type="number" 
                  name="quantity" 
                  min="1" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Delivery Destination</label>
                <input 
                  type="text" 
                  name="deliveryLocation" 
                  value={formData.deliveryLocation} 
                  onChange={handleChange} 
                  placeholder="e.g. Dar es Salaam, Dodoma, Mwanza" 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Specific Requirements / Notes</label>
              <textarea 
                name="specRequirements" 
                rows="3" 
                value={formData.specRequirements} 
                onChange={handleChange} 
                placeholder="Specify calibration standards, voltage (220V/50Hz), tender ref number, or additional reagents..." 
                className="form-textarea" 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
              <button type="button" onClick={closeQuoteModal} className="btn btn-secondary" style={{ backgroundColor: '#F8FAFC', color: '#0A192F', borderColor: '#CBD5E1' }}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
