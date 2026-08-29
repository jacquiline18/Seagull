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
  MessageSquare, 
  HelpCircle, 
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

  // FAQ Accordion State
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
      {/* Top Banner */}
      <section className="section section-dark science-grid-dark" style={{ padding: '4.5rem 0 3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="section-tag dark-tag">Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
            Contact Seagull General Supply Limited
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            "Services Beyond Measure!" — Speak directly with our laboratory equipment specialists, request quotations, or visit our operations center in Tanzania.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="section science-grid-bg">
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            {/* Left Column: Direct Contact Details */}
            <div>
              <span className="section-tag">Direct Communication</span>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                We're Here to Support Your Laboratory Needs
              </h2>

              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Whether you require a single digital pH meter, bulk borosilicate glassware sets for a chemistry department, or complete turn-key laboratory setup, our team responds swiftly.
              </p>

              {/* Contact Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {/* Phone Card */}
                <a href={`tel:${COMPANY_INFO.phoneClean}`} className="contact-info-card">
                  <div className="contact-icon-pill">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase' }}>
                      Telephone / WhatsApp
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                      {COMPANY_INFO.phone}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Mon - Fri 8:00 AM - 5:30 PM
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a href={`mailto:${COMPANY_INFO.email}`} className="contact-info-card">
                  <div className="contact-icon-pill">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase' }}>
                      Official Email
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                      {COMPANY_INFO.email}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Inquiries & Proforma Requests
                    </span>
                  </div>
                </a>

                {/* Website Card */}
                <a href="https://www.seagull.co.tz" target="_blank" rel="noreferrer" className="contact-info-card">
                  <div className="contact-icon-pill">
                    <Globe size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase' }}>
                      Official Portal
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                      {COMPANY_INFO.website}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Online Scientific Catalog
                    </span>
                  </div>
                </a>

                {/* Instagram Card */}
                <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noreferrer" className="contact-info-card">
                  <div className="contact-icon-pill" style={{ background: '#FFF1F2', color: '#E1306C' }}>
                    <Instagram size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E1306C', textTransform: 'uppercase' }}>
                      Instagram Page
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                      @{COMPANY_INFO.instagram}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Follow product showcases & updates
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary-950)', marginBottom: '0.25rem' }}>
                  Send a Direct Message
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Fill out the details below and our laboratory specialists will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Message Sent Successfully!
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
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
                      <label className="form-label">Full Name *</label>
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
                      <label className="form-label">Email Address *</label>
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
                      <label className="form-label">Phone Number *</label>
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
                      <label className="form-label">Subject *</label>
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
                    <label className="form-label">Message / Inquiry Details *</label>
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
                    style={{ marginTop: '1rem', gap: '0.5rem' }}
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
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header">
            <span className="section-tag">Procurement FAQs</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Common questions regarding laboratory equipment ordering, institutional delivery, and warranties.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  backgroundColor: expandedFaq === idx ? 'var(--color-primary-50)' : '#FFFFFF'
                }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                    {faq.q}
                  </h4>
                  <div style={{ color: 'var(--color-primary-600)', flexShrink: 0 }}>
                    {expandedFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {expandedFaq === idx && (
                  <p style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(0,0,0,0.06)', color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
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
