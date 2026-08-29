import React from 'react';
import { Filter, X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/sampleProducts';

export const ProductFilters = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  onlyInStock,
  onStockToggle,
  onResetFilters,
  totalResults
}) => {
  return (
    <div 
      className="card" 
      style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={18} color="var(--color-primary-600)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Filter Catalog</h3>
        </div>
        <button 
          onClick={onResetFilters}
          style={{ background: 'none', color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          title="Reset all filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Section */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-900)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
          Categories
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <button
            onClick={() => onSelectCategory('all')}
            style={{
              textAlign: 'left',
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: selectedCategory === 'all' ? 700 : 500,
              backgroundColor: selectedCategory === 'all' ? 'var(--color-primary-50)' : 'transparent',
              color: selectedCategory === 'all' ? 'var(--color-primary-600)' : 'var(--color-text-main)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.15s'
            }}
          >
            <span>All Categories</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>16</span>
          </button>

          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  textAlign: 'left',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--color-primary-50)' : 'transparent',
                  color: isSelected ? 'var(--color-primary-600)' : 'var(--color-text-main)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.15s'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Filter */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-900)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Max Price
          </h4>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-600)' }}>
            TZS {Number(priceRange).toLocaleString()}
          </span>
        </div>
        <input 
          type="range"
          min="50000"
          max="8000000"
          step="50000"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-primary-600)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
          <span>TZS 50k</span>
          <span>TZS 8M+</span>
        </div>
      </div>

      {/* In Stock Toggle */}
      <div style={{ marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', userSelect: 'none' }}>
          <input 
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => onStockToggle(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary-600)', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>
            Show In-Stock Only
          </span>
        </label>
      </div>

      {/* Matching count badge */}
      <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
        Showing <strong>{totalResults}</strong> scientific products
      </div>
    </div>
  );
};
