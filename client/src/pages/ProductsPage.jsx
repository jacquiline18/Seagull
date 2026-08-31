import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  ArrowUpDown, 
  FlaskConical, 
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Lock
} from 'lucide-react';
import { SAMPLE_PRODUCTS, CATEGORIES } from '../data/sampleProducts';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/product/ProductFilters';
import { productService } from '../services/api';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState(8000000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Update when URL search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Fetch products from API service (falls back automatically to sample products)
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await productService.getAllProducts();
        if (res && res.products && Array.isArray(res.products) && res.products.length > 0) {
          setProducts(res.products);
        } else {
          setProducts(SAMPLE_PRODUCTS);
        }
      } catch {
        setProducts(SAMPLE_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const currentList = Array.isArray(products) && products.length > 0 ? products : SAMPLE_PRODUCTS;
    return currentList.filter(p => {
      if (!p) return false;

      // Category match
      if (selectedCategory !== 'all') {
        const matchesCat = (p.categoryId === selectedCategory) || 
          (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
        if (!matchesCat) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
          (p.name && p.name.toLowerCase().includes(q)) || 
          (p.description && p.description.toLowerCase().includes(q)) || 
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Price Range match
      if (typeof p.price === 'number' && p.price > priceRange) {
        return false;
      }

      // In-stock match
      if (onlyInStock && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, priceRange, onlyInStock, sortBy]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(8000000);
    setOnlyInStock(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="products-page-root section-sm science-grid-bg" style={{ minHeight: '85vh', paddingTop: '2rem' }}>
      <div className="container">
        {/* Page Top Header with High-Contrast Dark Typography */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
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
            <span>Certified Laboratory Catalog</span>
          </span>
          <h1 
            className="section-title" 
            style={{ 
              color: '#0A192F', 
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginTop: '0.5rem',
              marginBottom: '0.75rem' 
            }}
          >
            Laboratory Equipment & Scientific Supplies
          </h1>
          <p 
            className="section-subtitle" 
            style={{ 
              maxWidth: '720px', 
              margin: '0 auto', 
              color: '#334155',
              fontSize: '1.05rem',
              lineHeight: 1.6
            }}
          >
            Browse certified analytical balances, precision glassware, chemical apparatus, safety gear, and diagnostic instruments. 
          </p>

          {/* Admin Managed Note Badge */}
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#475569', background: '#FFFFFF', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid #CBD5E1', boxShadow: 'var(--shadow-xs)' }}>
              <ShieldCheck size={15} color="#0284C7" />
              <span>Full sample inventory loaded. Official catalog updates managed securely by <strong>Seagull Admin</strong>.</span>
            </span>
          </div>
        </div>

        {/* Filter and Search Action Bar */}
        <div 
          className="card"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1'
          }}
        >
          {/* Live Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input 
              type="text"
              placeholder="Search by instrument name, SKU, category, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ 
                paddingLeft: '2.75rem', 
                height: '44px',
                color: '#0F172A',
                fontWeight: 500,
                borderColor: '#CBD5E1'
              }}
            />
          </div>

          {/* Controls: Sort, View Toggle, Mobile Filter Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowUpDown size={16} color="#0284C7" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ 
                  width: 'auto', 
                  padding: '0.45rem 1.75rem 0.45rem 0.75rem', 
                  height: '44px', 
                  fontSize: '0.85rem',
                  color: '#0F172A',
                  fontWeight: 600,
                  borderColor: '#CBD5E1'
                }}
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Grid / List Mode Buttons */}
            <div style={{ display: 'flex', border: '1px solid #CBD5E1', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.55rem 0.75rem',
                  background: viewMode === 'grid' ? '#E0F2FE' : '#FFFFFF',
                  color: viewMode === 'grid' ? '#0369A1' : '#64748B',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.55rem 0.75rem',
                  background: viewMode === 'list' ? '#E0F2FE' : '#FFFFFF',
                  color: viewMode === 'list' ? '#0369A1' : '#64748B',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="List View"
                aria-label="List View"
              >
                <List size={18} />
              </button>
            </div>

            {/* Mobile Filter Trigger Button */}
            <button 
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="btn btn-secondary btn-sm d-lg-none"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Catalogue Body: Sidebar + Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'flex-start' }} className="catalog-layout-grid">
          {/* Left Filter Sidebar */}
          <aside className={`catalog-sidebar ${mobileFilterOpen ? 'open' : ''}`}>
            <ProductFilters 
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onlyInStock={onlyInStock}
              onStockToggle={setOnlyInStock}
              onResetFilters={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </aside>

          {/* Right Product Grid */}
          <main>
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid-3' : 'list-view-container'}>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product._id || product.id || product.sku} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div 
                className="card" 
                style={{ textAlign: 'center', padding: '4rem 2rem', background: '#FFFFFF', border: '1px solid #CBD5E1' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <FlaskConical size={32} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
                  No Laboratory Inventory Matches this Filter
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                  You can reset your filters to see all available samples, or submit a custom laboratory procurement inquiry directly.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link to="/order-request" className="btn btn-primary" style={{ backgroundColor: '#1B4268', borderColor: '#1B4268' }}>
                    Request Custom Equipment Order
                  </Link>
                  <button onClick={handleResetFilters} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                    <RotateCcw size={16} />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
