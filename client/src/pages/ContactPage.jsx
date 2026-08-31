import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Building2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/sampleProducts';
import { useNotification } from '../context/NotificationContext';
import { contactService } from '../services/api';

export const ContactPage = () => {
  const { toastSuccess, toastError } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      q: 'Do you deliver laboratory equipment across all regions of Tanzania?',
      a: 'Yes, Seagull General Supply Limited delivers throughout all 31 regions of Tanzania including Dar es Salaam, Dodoma, Arusha, Mwanza, Mbeya, Morogoro, Tanga, Moshi, Kilimanjaro, Iringa, Tabora, Kigoma, Mtwara, and Zanzibar. All delicate glassware and precision instruments are packed in custom shock-absorbing materials.'
    },
    {
      q: 'Can you provide official Proforma Invoices and EFD/VAT receipts for institutions?',
      a: 'Yes, we are a fully registered Tanzanian enterprise. We supply official itemized Proforma Invoices, TIN/VAT compliant EFD tax receipts, and batch calibration certificates required for institutional and government procurement.'
    },
    {
      q: 'Do your laboratory instruments come with a warranty and calibration certificate?',
      a: 'Yes, all electronic and analytical instruments (such as analytical balances, pH meters, spectrophotometers, and centrifuges) carry a minimum 12-month standard warranty and are factory calibrated.'
    },
    {
      q: 'Can you source custom scientific equipment not currently listed on the website?',
      a: 'Absolutely. We maintain direct partnerships with international scientific manufacturers. Contact our team with your required model numbers or specifications, and we will source and deliver them.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactService.sendMessage({
        ...formData,
        type: 'contact_inquiry'
      });
      setSubmitted(true);
      toastSuccess('Your message has been sent to Seagull General Supply Limited!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toastError('Failed to send message. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="contact-page-root">
      {/* Top Banner - High Contrast Visible Header */}
      <section 
        className="section science-grid-bg" 
        style={{ 
          padding: '4rem 0 3.5rem 0',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #E0F2FE 100%)',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span 
            className="section-tag"
            style={{ 
              backgroundColor: '#E0F2FE', 
              color: '#0369A1', 
              borderColor: '#BAE6FD',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={14} />
            <span>Get in Touch</span>
          </span>
          <h1 
            style={{ 
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', 
              fontWeight: 800, 
              color: '#0A192F', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Contact Seagull General Supply Limited
          </h1>
          <p 
            style={{ 
              fontSize: '1.15rem', 
              color: '#334155', 
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            <strong style={{ color: '#0F172A' }}>"Services Beyond Measure!"</strong> — Speak directly with our laboratory equipment specialists, request quotations, or place custom scientific orders across Tanzania.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="section science-grid-bg" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Column: Direct Contact Details */}
            <div>
              <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Direct Communication</span>
              <h2 className="section-title" style={{ marginBottom: '1.25rem', color: '#0A192F' }}>
                We're Here to Support Your Laboratory Needs
              </h2>

              <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Whether you require a single digital balance, bulk borosilicate glassware sets for a chemistry department, or complete turn-key laboratory setup, our team responds swiftly.
              </p>

              {/* Contact Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {/* Phone Card */}
                <a href={`tel:${COMPANY_INFO.phoneClean}`} className="contact-info-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                  <div className="contact-icon-pill" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase' }}>
                      Telephone / WhatsApp
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
                      {COMPANY_INFO.phone}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Mon - Fri 8:00 AM - 5:30 PM
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a href={`mailto:${COMPANY_INFO.email}`} className="contact-info-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                  <div className="contact-icon-pill" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase' }}>
                      Official Email
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', wordBreak: 'break-all' }}>
                      {COMPANY_INFO.email}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Inquiries & Proforma Requests
                    </span>
                  </div>
                </a>

                {/* Website Card */}
                <a href="https://www.seagull.co.tz" target="_blank" rel="noreferrer" className="contact-info-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                  <div className="contact-icon-pill" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                    <Globe size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase' }}>
                      Official Portal
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
                      {COMPANY_INFO.website}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Online Scientific Catalog
                    </span>
                  </div>
                </a>

                {/* Instagram Card */}
                <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noreferrer" className="contact-info-card" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                  <div className="contact-icon-pill" style={{ background: '#FFF1F2', color: '#E1306C' }}>
                    <Instagram size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E1306C', textTransform: 'uppercase' }}>
                      Instagram Page
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
                      @{COMPANY_INFO.instagram}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Follow product showcases & updates
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                  Send a Direct Message
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Fill out the details below and our laboratory specialists will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
                    Message Sent Successfully!
                  </h4>
                  <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                    Thank you for reaching out to Seagull General Supply Limited. We will review your message and reply via email or phone.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#0F172A', fontWeight: 600 }}>Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Martha Ndosi" 
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ color: '#0F172A', fontWeight: 600 }}>Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="e.g. m.ndosi@lab.co.tz" 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#0F172A', fontWeight: 600 }}>Phone Number *</label>
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
                      <label className="form-label" style={{ color: '#0F172A', fontWeight: 600 }}>Subject *</label>
                      <input 
                        type="text" 
                        name="subject" 
                        required 
                        value={formData.subject} 
                        onChange={handleChange} 
                        placeholder="e.g. Quotation for Chemistry Glassware" 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#0F172A', fontWeight: 600 }}>Message / Inquiry Details *</label>
                    <textarea 
                      name="message" 
                      required 
                      rows="4" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Please specify item quantities, equipment requirements, institutional details, or questions..." 
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
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header">
            <span className="section-tag" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Procurement FAQs</span>
            <h2 className="section-title" style={{ color: '#0A192F' }}>Frequently Asked Questions</h2>
            <p className="section-subtitle" style={{ color: '#475569' }}>
              Common questions regarding laboratory equipment ordering, institutional delivery, and warranties across Tanzania.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid #CBD5E1',
                  cursor: 'pointer',
                  backgroundColor: expandedFaq === idx ? '#F0F9FF' : '#FFFFFF',
                  boxShadow: 'var(--shadow-xs)'
                }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0A192F' }}>
                    {faq.q}
                  </h4>
                  <div style={{ color: '#0284C7', flexShrink: 0 }}>
                    {expandedFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {expandedFaq === idx && (
                  <p style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #E2E8F0', color: '#334155', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
