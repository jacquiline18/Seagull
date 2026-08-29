import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Eye, 
  FileText, 
  Check, 
  Star, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart, openQuickView, openQuoteModal, formatCurrency } = useCart();
  const { toastSuccess } = useNotification();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    toastSuccess(`Added "${product.name}" to cart`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleQuoteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuoteModal(product);
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1.25rem',
          gap: '1.5rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ width: '160px', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {product.featured && (
            <span className="badge badge-featured" style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '0.65rem' }}>
              Featured
            </span>
          )}
        </div>

        <div style={{ flex: 1, minWidth: '240px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-600)', textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <Link to={`/products/${product._id || product.id}`}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0 0.5rem 0', color: 'var(--color-primary-950)' }}>
              {product.name}
            </h3>
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="spec-chip">SKU: {product.sku}</span>
            <span className={`badge ${product.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'On Request'}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '180px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>PRICE / ESTIMATE</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
              {formatCurrency(product.price)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleQuickView}
              className="btn btn-secondary btn-sm"
              title="Quick Inspect"
            >
              <Eye size={15} />
            </button>
            <button 
              onClick={handleQuoteClick}
              className="btn btn-outline btn-sm"
              title="Request Quote"
            >
              <FileText size={15} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
              style={{ minWidth: '110px' }}
            >
              {justAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
              <span>{justAdded ? 'Added' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode Card
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product._id || product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        </Link>
        <div className="product-badge-overlay">
          {product.featured && <span className="badge badge-featured">Featured</span>}
          <span className={`badge ${product.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'On Order'}
          </span>
        </div>

        {/* Quick Action Float Bar */}
        <div 
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            display: 'flex',
            gap: '0.35rem',
            zIndex: 3
          }}
        >
          <button 
            onClick={handleQuickView}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-900)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/products/${product._id || product.id}`}>
          <h4 className="product-card-title">{product.name}</h4>
        </Link>
        <p className="product-card-desc">{product.description}</p>

        <div className="product-card-specs">
          <span className="spec-chip">SKU: {product.sku}</span>
          {product.specifications && Object.keys(product.specifications)[0] && (
            <span className="spec-chip">
              {Object.keys(product.specifications)[0]}: {Object.values(product.specifications)[0]}
            </span>
          )}
        </div>

        <div className="product-card-footer">
          <div>
            <span className="product-price-label">Price / Estimate</span>
            <div className="product-price">{formatCurrency(product.price)}</div>
          </div>

          <div className="product-actions-btn-group">
            <button 
              onClick={handleQuoteClick}
              className="btn btn-secondary btn-sm"
              title="Request Quote"
              aria-label="Request Quote"
            >
              <FileText size={15} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              {justAdded ? <Check size={16} /> : <Plus size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
