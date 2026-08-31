import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Send, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Printer, 
  Sparkles, 
  FlaskConical, 
  Truck
} from 'lucide-react';
import { SAMPLE_PRODUCTS, COMPANY_INFO } from '../data/sampleProducts';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { orderService } from '../services/api';

const TANZANIA_REGIONS = [
  'Dar es Salaam',
  'Dodoma (Capital)',
  'Arusha',
  'Mwanza',
  'Mbeya',
  'Morogoro',
  'Tanga',
  'Kilimanjaro / Moshi',
  'Iringa',
  'Tabora',
  'Kigoma',
  'Mtwara',
  'Ruvuma / Songea',
  'Shinyanga',
  'Kagera / Bukoba',
  'Mara / Musoma',
  'Manyara / Babati',
  'Singida',
  'Rukwa / Sumbawanga',
  'Katavi / Mpanda',
  'Njombe',
  'Geita',
  'Simiyu / Bariadi',
  'Songwe / Vwawa',
  'Lindi',
  'Pwani / Kibaha',
  'Zanzibar Urban/West',
  'Zanzibar North',
  'Zanzibar South',
  'Pemba North',
  'Pemba South'
];

export const OrderRequestPage = () => {
  const { cartItems, clearCart, formatCurrency } = useCart();
  const { toastSuccess, toastError } = useNotification();
  const navigate = useNavigate();

  // Customer form state
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    region: 'Dar es Salaam',
    address: '',
    orderType: 'Proforma Invoice (Institutional)',
    notes: '',
    calibrationRequired: true
  });

  // Selected requested equipment list (pre-fills from cart if items exist, or starts with sample item)
  const [requestedItems, setRequestedItems] = useState(() => {
    if (cartItems && cartItems.length > 0) {
      return cartItems.map(item => ({
        id: item._id || item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity || 1,
        price: typeof item.price === 'number' ? item.price : 0,
        customNote: ''
      }));
    }
    return [
      {
        id: 'prod-001',
        name: 'Precision Digital Analytical Balance (0.0001g / 220g)',
        category: 'Measuring Equipment',
        quantity: 1,
        price: 1850000,
        customNote: 'Standard 220V/50Hz with calibration certificate'
      }
    ];
  });

  const [customItemInput, setCustomItemInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddItemFromCatalog = (e) => {
    const prodId = e.target.value;
    if (!prodId) return;
    const selected = SAMPLE_PRODUCTS.find(p => p.id === prodId || p._id === prodId);
    if (selected) {
      const existingIdx = requestedItems.findIndex(i => i.id === selected.id);
      if (existingIdx !== -1) {
        const updated = [...requestedItems];
        updated[existingIdx].quantity += 1;
        setRequestedItems(updated);
      } else {
        setRequestedItems(prev => [
          ...prev,
          {
            id: selected.id || selected._id,
            name: selected.name,
            category: selected.category,
            quantity: 1,
            price: selected.price,
            customNote: ''
          }
        ]);
      }
      toastSuccess(`Added "${selected.name}" to request list.`);
    }
    e.target.value = '';
  };

  const handleAddCustomItem = () => {
    if (!customItemInput.trim()) return;
    setRequestedItems(prev => [
      ...prev,
      {
        id: 'custom-' + Date.now(),
        name: customItemInput.trim(),
        category: 'Custom Requisition',
        quantity: 1,
        price: 0,
        customNote: 'Custom requested laboratory item'
      }
    ]);
    setCustomItemInput('');
    toastSuccess('Custom requisition item added.');
  };

  const handleUpdateItemQty = (index, delta) => {
    setRequestedItems(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, idx) => idx !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setRequestedItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const calculateTotal = () => {
    return requestedItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (requestedItems.length === 0) {
      toastError('Please add at least one laboratory equipment item to your request.');
      return;
    }

    setIsSubmitting(true);
    try {
      const totalEstimated = calculateTotal();
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.organization,
          deliveryAddress: `${formData.address}, ${formData.region}, Tanzania`
        },
        products: requestedItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          note: item.customNote
        })),
        totalAmount: totalEstimated,
        notes: `Order Type: ${formData.orderType}. Calibration Certificate: ${formData.calibrationRequired ? 'Yes' : 'No'}. Customer Notes: ${formData.notes || 'None'}`,
        status: 'Pending'
      };

      const res = await orderService.createOrder(orderPayload);
      if (res && res.order) {
        setCompletedOrder(res.order);
        setOrderComplete(true);
        clearCart();
        toastSuccess('Order & quotation request submitted successfully!');
      }
    } catch {
      toastError('Could not process order. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (orderComplete && completedOrder) {
    return (
      <div className="section-sm science-grid-bg" style={{ minHeight: '85vh', padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', backgroundColor: '#FFFFFF', borderTop: '6px solid #1B4268', border: '1px solid #CBD5E1' }}>
            {/* Header with Official Logo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src="/seagull-logo.svg" alt="Seagull Logo" style={{ width: '56px', height: '56px' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>SEAGULL GENERAL SUPPLY LIMITED</h3>
                  <p style={{ fontSize: '0.82rem', color: '#0284C7', fontStyle: 'italic', margin: 0, fontWeight: 700 }}>"Services Beyond Measure!"</p>
                </div>
              </div>
              <div>
                <span className="badge badge-in-stock" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>Order Request Received</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <CheckCircle2 size={38} />
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
                Order Request Submitted Successfully!
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
                Thank you, <strong>{completedOrder.customer.name}</strong>. Our technical sales team in Dar es Salaam has received your request. An official Proforma Invoice will be dispatched to <strong>{completedOrder.customer.email}</strong>.
              </p>
            </div>

            {/* Official Order Summary Box */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>ORDER REFERENCE CODE</span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                    {completedOrder._id || completedOrder.id}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#64748B' }}>
                  Date: {new Date(completedOrder.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#0A192F', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Institution / Delivery Address:
                </div>
                <div style={{ fontSize: '0.92rem', color: '#334155' }}>
                  {completedOrder.customer.company && <strong>{completedOrder.customer.company} — </strong>}
                  {completedOrder.customer.deliveryAddress}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: '#0A192F', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Requested Laboratory Items:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {completedOrder.products.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#334155', borderBottom: '1px dashed #E2E8F0', paddingBottom: '0.35rem' }}>
                      <span>{item.quantity} × {item.name}</span>
                      <span style={{ fontWeight: 700, color: '#0A192F' }}>
                        {item.price > 0 ? formatCurrency(item.price * item.quantity) : 'To be quoted'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => window.print()} className="btn btn-secondary" style={{ gap: '0.4rem' }}>
                <Printer size={16} />
                <span>Print Confirmation</span>
              </button>
              <Link to="/products" className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                Return to Product Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ORDER REQUEST FORM
  return (
    <div className="order-request-root section-sm science-grid-bg" style={{ minHeight: '85vh', paddingTop: '2rem' }}>
      <div className="container">
        {/* Page Top Header Banner */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid #CBD5E1',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span className="section-tag" style={{ margin: 0, backgroundColor: '#E0F2FE', color: '#0369A1', borderColor: '#BAE6FD' }}>
                  Official Procurement Portal
                </span>
                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>• Tanzania Nationwide Supply</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#0A192F', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Request Laboratory Equipment & Place Order
              </h1>
              <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                Fill out your institution details and equipment requirements below. Our technical sales engineers in Dar es Salaam will review and issue an official Proforma Invoice.
              </p>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/seagull-logo.svg" alt="Seagull Logo" style={{ width: '64px', height: '64px', marginBottom: '0.3rem' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0A192F' }}>SEAGULL GENERAL SUPPLY</span>
              <span style={{ fontSize: '0.72rem', color: '#0284C7', fontStyle: 'italic', fontWeight: 700 }}>"Services Beyond Measure!"</span>
            </div>
          </div>
        </div>

        {/* 2-Column Main Order Request Container */}
        <form onSubmit={handleSubmitOrder}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }} className="order-form-layout-grid">
            
            {/* LEFT COLUMN: Customer & Institutional Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Section 1: Customer Details */}
              <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid #F1F5F9' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                      1. Customer & Institutional Information
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                      Provide official contact details for quotation and invoicing
                    </p>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name of Requester *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Dr. Frank Masanja / Eng. Mary Temu" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Organization / Institution / University *</label>
                    <input 
                      type="text" 
                      name="organization" 
                      required 
                      value={formData.organization} 
                      onChange={handleInputChange} 
                      placeholder="e.g. UDSM, Muhimbili, Lab, School" 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Official Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="e.g. f.masanja@udsm.ac.tz" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number / WhatsApp (+255) *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="e.g. +255 743 611 101" 
                      className="form-input" 
                    />
                  </div>
                </div>

                {/* Region in Tanzania */}
                <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Delivery Region (Tanzania) *</label>
                    <select 
                      name="region" 
                      value={formData.region} 
                      onChange={handleInputChange} 
                      className="form-select"
                    >
                      {TANZANIA_REGIONS.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Quotation / Order Type *</label>
                    <select 
                      name="orderType" 
                      value={formData.orderType} 
                      onChange={handleInputChange} 
                      className="form-select"
                    >
                      <option value="Proforma Invoice (Institutional)">Official Proforma Invoice</option>
                      <option value="Direct Purchase Order">Direct Purchase Order</option>
                      <option value="Tender / Government Procurement">Tender / Government Procurement</option>
                      <option value="Urgent Lab Supply">Urgent Emergency Lab Supply</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Physical Delivery Address / Lab Department *</label>
                  <input 
                    type="text" 
                    name="address" 
                    required 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Chemistry Building Room 204, Main Campus, Dar es Salaam" 
                    className="form-input" 
                  />
                </div>
              </div>

              {/* Section 2: Technical Requirements & Notes */}
              <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid #F1F5F9' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                      2. Technical Notes & Delivery Specifications
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                      Specify calibration, voltage ratings, or tender guidelines
                    </p>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', marginBottom: '1rem', backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #CBD5E1' }}>
                    <input 
                      type="checkbox" 
                      name="calibrationRequired" 
                      checked={formData.calibrationRequired} 
                      onChange={handleInputChange} 
                      style={{ width: '18px', height: '18px', accentColor: '#1B4268' }} 
                    />
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0A192F', display: 'block' }}>
                        Include Factory Calibration Certificates
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Recommended for analytical balances, spectrophotometers, and pH meters.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Additional Instructions / Special Reagents / Deadline</label>
                  <textarea 
                    name="notes" 
                    rows="3" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    placeholder="Specify voltage (e.g. 220V/50Hz), tender reference numbers, required chemical grades (AR/ACS), or delivery deadlines..." 
                    className="form-textarea" 
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Equipment Selection & Live Order Summary */}
            <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', backgroundColor: '#FFFFFF', position: 'sticky', top: '100px', borderTop: '4px solid #1B4268', border: '1px solid #CBD5E1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid #F1F5F9' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                    3. Equipment Requested ({requestedItems.length})
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Items selected for quotation</span>
                </div>
              </div>

              {/* Fast Add from Catalog Dropdown */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>+ Add from Standard Catalog:</label>
                <select onChange={handleAddItemFromCatalog} className="form-select" style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}>
                  <option value="">-- Choose Equipment from Catalog --</option>
                  {SAMPLE_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.priceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Item Quick Add */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Or type custom instrument/chemical..." 
                  value={customItemInput} 
                  onChange={(e) => setCustomItemInput(e.target.value)} 
                  className="form-input" 
                  style={{ fontSize: '0.85rem', padding: '0.45rem 0.75rem', flex: 1, minWidth: '150px' }} 
                />
                <button type="button" onClick={handleAddCustomItem} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={14} />
                  <span>Add Custom</span>
                </button>
              </div>

              {/* Selected Equipment List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '320px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.25rem' }}>
                {requestedItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#F8FAFC',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '130px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0A192F', lineHeight: 1.3 }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {item.price > 0 ? formatCurrency(item.price) : 'Custom Quote'}
                      </div>
                    </div>

                    {/* Qty Steppers */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: 'var(--radius-sm)', background: '#FFFFFF' }}>
                      <button 
                        type="button" 
                        onClick={() => handleUpdateItemQty(idx, -1)} 
                        style={{ padding: '0.2rem 0.5rem', background: 'none', fontWeight: 800, color: '#0F172A' }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, minWidth: '24px', textAlign: 'center', color: '#0F172A' }}>
                        {item.quantity}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => handleUpdateItemQty(idx, 1)} 
                        style={{ padding: '0.2rem 0.5rem', background: 'none', fontWeight: 800, color: '#0F172A' }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveItem(idx)} 
                      style={{ color: '#EF4444', background: 'none', padding: '4px' }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div style={{ borderTop: '2px dashed #CBD5E1', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748B' }}>Equipment Count:</span>
                  <strong style={{ color: '#0A192F' }}>{requestedItems.reduce((acc, i) => acc + i.quantity, 0)} Units</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748B' }}>Tanzania Delivery:</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Included in Proforma</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A192F' }}>Estimated Total:</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B4268', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Submit Order Request Button */}
              <button 
                type="submit" 
                disabled={isSubmitting || requestedItems.length === 0}
                className="btn btn-primary btn-block btn-lg"
                style={{ gap: '0.5rem', backgroundColor: '#1B4268', borderColor: '#1B4268' }}
              >
                {isSubmitting ? (
                  <span>Submitting Order Request...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Order & Proforma Request</span>
                  </>
                )}
              </button>

              <div style={{ marginTop: '1.25rem', padding: '0.75rem', backgroundColor: '#F0F9FF', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: '#1B4268', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #BAE6FD' }}>
                <ShieldCheck size={18} color="#1B4268" style={{ flexShrink: 0 }} />
                <span>All requests receive official TIN/VAT Proforma Invoices compliant with Tanzanian procurement laws.</span>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
