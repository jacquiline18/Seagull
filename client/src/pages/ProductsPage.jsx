import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  ArrowUpDown, 
  FlaskConical, 
  AlertCircle,
  RotateCcw
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

  // Fetch products from API service (falls back automatically to mock)
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await productService.getAllProducts();
        if (res && res.products) {
          setProducts(res.products);
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
    return products.filter(p => {
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
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) || 
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Price Range match
      if (p.price > priceRange) {
        return false;
      }

      // In-stock match
      if (onlyInStock && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
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
    <div className="products-page-root section-sm science-grid-bg" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Page Top Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <span className="section-tag">Direct Supply Catalogue</span>
          <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Laboratory Equipment & Scientific Supplies
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Browse certified analytical balances, precision glassware, chemical apparatus, safety gear, and diagnostic instruments.
          </p>
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
            flexWrap: 'wrap'
          }}
        >
          {/* Live Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text"
              placeholder="Search by instrument name, SKU, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', height: '42px' }}
            />
          </div>

          {/* Controls: Sort, View Toggle, Mobile Filter Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowUpDown size={16} color="var(--color-primary-600)" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '0.45rem 1.75rem 0.45rem 0.75rem', height: '42px', fontSize: '0.85rem' }}
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
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: viewMode === 'grid' ? 'var(--color-primary-50)' : '#FFFFFF',
                  color: viewMode === 'grid' ? 'var(--color-primary-600)' : 'var(--color-text-muted)'
                }}
                title="Grid View"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: viewMode === 'list' ? 'var(--color-primary-50)' : '#FFFFFF',
                  color: viewMode === 'list' ? 'var(--color-primary-600)' : 'var(--color-text-muted)'
                }}
                title="List View"
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
                    key={product._id || product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div 
                className="card" 
                style={{ textAlign: 'center', padding: '4rem 2rem' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <FlaskConical size={32} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#163A59', marginBottom: '0.5rem' }}>
                  No Laboratory Inventory Listed in this Filter
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                  Our technical inventory is actively maintained. You can request any custom chemical, instrument, or glassware directly.
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
