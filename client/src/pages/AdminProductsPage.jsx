import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  X, 
  Check, 
  ArrowLeft, 
  SlidersHorizontal,
  Package,
  Layers,
  Upload,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { productService } from '../services/api';
import { CATEGORIES, SAMPLE_PRODUCTS } from '../data/sampleProducts';

export const AdminProductsPage = () => {
  const { isAuthenticated } = useAuth();
  const { toastSuccess, toastError } = useNotification();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laboratory Instruments',
    categoryId: 'instruments',
    sku: '',
    price: '',
    stock: 10,
    image: '',
    description: '',
    featured: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadProducts();
  }, [isAuthenticated, navigate]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getAllProducts();
      setProducts(res.products || SAMPLE_PRODUCTS);
    } catch {
      setProducts(SAMPLE_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Laboratory Instruments',
      categoryId: 'instruments',
      sku: 'SGL-LAB-' + Math.floor(100 + Math.random() * 900),
      price: '',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: '',
      featured: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category || 'Laboratory Instruments',
      categoryId: prod.categoryId || 'instruments',
      sku: prod.sku || '',
      price: prod.price || '',
      stock: prod.stock ?? 10,
      image: prod.image || '',
      description: prod.description || '',
      featured: prod.featured || false
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      try {
        await productService.deleteProduct(id);
        toastSuccess(`Product "${name}" deleted`);
        loadProducts();
      } catch {
        toastError('Failed to delete product');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id || editingProduct.id, formData);
        toastSuccess('Product updated successfully');
      } else {
        await productService.createProduct(formData);
        toastSuccess('New product added to catalogue');
      }
      setModalOpen(false);
      loadProducts();
    } catch {
      toastError('Failed to save product');
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-products-root section-sm science-grid-bg" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Header Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-600)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="section-title" style={{ margin: 0, fontSize: '2rem' }}>
              Product Inventory Management
            </h1>
          </div>

          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ gap: '0.4rem' }}>
            <Plus size={18} />
            <span>Add New Laboratory Product</span>
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search by product name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', height: '40px' }}
            />
          </div>

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
            style={{ width: 'auto', minWidth: '180px', height: '40px', fontSize: '0.85rem' }}
          >
            <option value="all">All Categories ({products.length})</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Product Table */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price (TZS)</th>
                  <th>Stock Units</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p._id || p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {p.image ? (
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} 
                          />
                        ) : (
                          <div style={{ width: '48px', height: '48px', backgroundColor: '#EFF6FF', color: '#1B4268', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Package size={22} />
                          </div>
                        )}
                        <div>
                          <strong style={{ color: 'var(--color-primary-950)' }}>{p.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                            {p.description || 'No description provided'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {p.sku || 'N/A'}
                    </td>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}>
                        {p.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary-900)' }}>
                      {p.price > 0 ? `TZS ${Number(p.price).toLocaleString()}` : 'Quote on Request'}
                    </td>
                    <td>
                      <span className={`badge ${Number(p.stock) > 0 ? 'badge-in-stock' : 'badge-out-of-stock'}`}>
                        {p.stock || 0} units
                      </span>
                    </td>
                    <td>
                      {p.featured ? (
                        <span className="badge badge-featured">Yes (Featured)</span>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>No</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <Link 
                          to={`/products/${p._id || p.id}`} 
                          target="_blank" 
                          className="btn btn-secondary btn-sm" 
                          title="View on site"
                        >
                          <Eye size={14} />
                        </Link>
                        <button 
                          onClick={() => handleOpenEdit(p)} 
                          className="btn btn-secondary btn-sm" 
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p._id || p.id, p.name)} 
                          className="btn btn-danger btn-sm" 
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                      <Package size={36} color="#94A3B8" style={{ margin: '0 auto 0.75rem auto' }} />
                      <p style={{ fontWeight: 700, color: '#163A59', fontSize: '1.05rem', marginBottom: '0.25rem' }}>No Inventory Items Added Yet</p>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>Use the "Add New Laboratory Product" button above to populate your inventory and feature products on the Home page.</p>
                      <button onClick={handleOpenAdd} className="btn btn-primary btn-sm" style={{ backgroundColor: '#1B4268' }}>
                        <Plus size={15} />
                        <span>Add First Inventory Product</span>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Product Modal */}
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {editingProduct ? 'Edit Laboratory Product' : 'Add New Laboratory Product'}
                </h3>
                <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    className="form-input" 
                    placeholder="e.g. Digital Laboratory Balance (0.0001g)" 
                  />
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select 
                      value={formData.categoryId} 
                      onChange={(e) => {
                        const selected = CATEGORIES.find(c => c.id === e.target.value);
                        setFormData({ 
                          ...formData, 
                          categoryId: e.target.value, 
                          category: selected ? selected.name : 'Laboratory Instruments' 
                        });
                      }}
                      className="form-select"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">SKU Reference Code</label>
                    <input 
                      type="text" 
                      value={formData.sku} 
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Price in TZS *</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.price} 
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} 
                      className="form-input" 
                      placeholder="e.g. 1850000" 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Available Stock Units</label>
                    <input 
                      type="number" 
                      value={formData.stock} 
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input 
                    type="url" 
                    value={formData.image} 
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                    className="form-input" 
                    placeholder="https://..." 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Technical Description</label>
                  <textarea 
                    rows="3" 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    className="form-textarea" 
                    placeholder="Enter analytical specifications, materials, and applications..." 
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.featured} 
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} 
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary-600)' }} 
                    />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mark as Featured Product on Home Page</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
