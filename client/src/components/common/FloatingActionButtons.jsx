import React from 'react';
import { MessageSquare, FileText, ArrowUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { COMPANY_INFO } from '../../data/sampleProducts';

export const FloatingActionButtons = () => {
  const { openQuoteModal } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Quick contact and actions"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '1.5rem',
        zIndex: 800,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        alignItems: 'flex-end'
      }}
    >
      {/* WhatsApp Floating Chat */}
      <a 
        href={`https://wa.me/${COMPANY_INFO.phoneClean.replace('+', '')}?text=Hello%20Seagull%20General%20Supply,%20I%20would%20like%20to%20inquire%20about%20laboratory%20equipment.`} 
        target="_blank" 
        rel="noreferrer"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.2s ease',
          border: '2px solid #FFFFFF'
        }}
        title="Chat with Laboratory Specialist on WhatsApp"
      >
        <MessageSquare size={24} />
      </a>

      {/* Floating Quick Quote Button */}
      <button 
        onClick={() => openQuoteModal()}
        style={{
          padding: '0.65rem 1.1rem',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-900))',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 6px 20px rgba(0, 102, 204, 0.35)',
          fontWeight: 700,
          fontSize: '0.85rem',
          border: '1.5px solid rgba(255, 255, 255, 0.2)'
        }}
        title="Request an instant quote"
      >
        <FileText size={16} />
        <span>Get Quote</span>
      </button>
    </aside>
  );
};
