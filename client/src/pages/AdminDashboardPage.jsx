import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  Eye, 
  SlidersHorizontal,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { productService, orderService } from '../services/api';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';

export const AdminDashboardPage = () => {
  const { isAuthenticated, logout, adminUser } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const prodRes = await productService.getAllProducts();
        const ordRes = await orderService.getAllOrders();
        setProducts(prodRes.products || SAMPLE_PRODUCTS);
        setOrders(ordRes.orders || []);
      } catch {
        setProducts(SAMPLE_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate]);

  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing');
  const completedOrders = orders.filter(o => o.status === 'Completed');

  const totalSalesEstimate = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="badge badge-in-stock">Completed</span>;
      case 'Confirmed': return <span className="badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Confirmed</span>;
      case 'Processing': return <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>Processing</span>;
      case 'Cancelled': return <span className="badge badge-out-of-stock">Cancelled</span>;
      default: return <span className="badge badge-on-order">Pending</span>;
    }
  };

  return (
    <div className="admin-dashboard-root section-sm science-grid-bg" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="section-tag" style={{ margin: 0 }}>Seagull Operations</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>• Logged in as {adminUser?.name || 'Administrator'}</span>
            </div>
            <h1 className="section-title" style={{ margin: 0, fontSize: '2rem' }}>
              Admin Management Portal
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/admin/products" className="btn btn-primary" style={{ gap: '0.4rem' }}>
              <Plus size={16} />
              <span>Manage Products</span>
            </Link>
            <Link to="/admin/orders" className="btn btn-secondary" style={{ gap: '0.4rem' }}>
              <ShoppingBag size={16} />
              <span>Review Orders ({orders.length})</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Total Products
              </span>
              <div style={{ padding: '8px', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', borderRadius: 'var(--radius-md)' }}>
                <Package size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
              {products.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '0.25rem' }}>
              In-stock catalogue active
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #00D2FF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Total Orders & Quotes
              </span>
              <div style={{ padding: '8px', background: '#F0F9FF', color: '#0284C7', borderRadius: 'var(--radius-md)' }}>
                <ShoppingBag size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
              {orders.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Institutional orders logged
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-warning)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Pending / Processing
              </span>
              <div style={{ padding: '8px', background: 'var(--color-warning-bg)', color: 'var(--color-warning)', borderRadius: 'var(--radius-md)' }}>
                <Clock size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-warning)' }}>
              {pendingOrders.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Requires sales engineer review
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-success)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Total Quotation Pipeline
              </span>
              <div style={{ padding: '8px', background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)' }}>
                <TrendingUp size={20} />
              </div>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
              TZS {totalSalesEstimate.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '0.25rem' }}>
              Active quotes value
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Recent Orders & Proforma Requests
            </h3>
            <Link to="/admin/orders" style={{ fontSize: '0.85rem', color: 'var(--color-primary-600)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>View All Orders</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer / Institution</th>
                    <th>Items</th>
                    <th>Total (TZS)</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o._id || o.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                        {o._id || o.id}
                      </td>
                      <td>
                        <strong>{o.customer?.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {o.customer?.company || o.customer?.email}
                        </div>
                      </td>
                      <td>
                        {o.products?.length || 1} items
                      </td>
                      <td style={{ fontWeight: 700 }}>
                        TZS {Number(o.totalAmount || 0).toLocaleString()}
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        {getStatusBadge(o.status)}
                      </td>
                      <td>
                        <Link to="/admin/orders" className="btn btn-secondary btn-sm">
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
              No orders registered yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
