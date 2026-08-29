import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Search, 
  X,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { orderService } from '../services/api';

export const AdminOrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const { toastSuccess, toastError } = useNotification();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [inspectOrder, setInspectOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated, navigate]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getAllOrders();
      setOrders(res.orders || []);
    } catch {
      toastError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toastSuccess(`Order ${orderId} updated to ${newStatus}`);
      loadOrders();
      if (inspectOrder && (inspectOrder._id === orderId || inspectOrder.id === orderId)) {
        setInspectOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch {
      toastError('Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="badge badge-in-stock">Completed</span>;
      case 'Confirmed': return <span className="badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Confirmed</span>;
      case 'Processing': return <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>Processing</span>;
      case 'Cancelled': return <span className="badge badge-out-of-stock">Cancelled</span>;
      default: return <span className="badge badge-on-order">Pending</span>;
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = selectedStatus === 'all' || o.status.toLowerCase() === selectedStatus.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (o._id && o._id.toLowerCase().includes(q)) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(q)) ||
      (o.customer?.company && o.customer.company.toLowerCase().includes(q)) ||
      (o.customer?.email && o.customer.email.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-orders-root section-sm science-grid-bg" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-600)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="section-title" style={{ margin: 0, fontSize: '2rem' }}>
              Customer Order & Quotation Requests
            </h1>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search by Order ID, customer, institution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', height: '40px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['all', 'Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`btn btn-sm ${selectedStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              >
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Institution / Lab</th>
                  <th>Products Count</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                  <th style={{ textAlign: 'right' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(o => (
                  <tr key={o._id || o.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                      {o._id || o.id}
                    </td>
                    <td>
                      <strong>{o.customer?.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {o.customer?.phone}
                      </div>
                    </td>
                    <td>
                      {o.customer?.company || 'Individual Client'}
                    </td>
                    <td>
                      {o.products?.length || 1} items
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary-900)' }}>
                      TZS {Number(o.totalAmount || 0).toLocaleString()}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {getStatusBadge(o.status)}
                    </td>
                    <td>
                      <select 
                        value={o.status} 
                        onChange={(e) => handleStatusChange(o._id || o.id, e.target.value)}
                        className="form-select"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', height: 'auto', width: 'auto' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => setInspectOrder(o)} 
                        className="btn btn-secondary btn-sm"
                        title="Inspect full details"
                      >
                        <Eye size={14} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Inspector Modal */}
        {inspectOrder && (
          <div className="modal-overlay" onClick={() => setInspectOrder(null)}>
            <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    Order Details: {inspectOrder._id || inspectOrder.id}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Submitted on {new Date(inspectOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <button className="modal-close-btn" onClick={() => setInspectOrder(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Customer Info Card */}
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Customer Name</span>
                  <strong>{inspectOrder.customer?.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Institution</span>
                  <strong>{inspectOrder.customer?.company || 'N/A'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email</span>
                  <a href={`mailto:${inspectOrder.customer?.email}`} style={{ color: 'var(--color-primary-600)' }}>{inspectOrder.customer?.email}</a>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone</span>
                  <a href={`tel:${inspectOrder.customer?.phone}`} style={{ color: 'var(--color-primary-600)' }}>{inspectOrder.customer?.phone}</a>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Delivery Location</span>
                  <span>{inspectOrder.customer?.deliveryAddress}</span>
                </div>
                {inspectOrder.notes && (
                  <div style={{ gridColumn: 'span 2', borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Customer Notes</span>
                    <p style={{ fontStyle: 'italic', margin: 0 }}>"{inspectOrder.notes}"</p>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Ordered Products
              </h4>
              <div className="table-responsive" style={{ marginBottom: '1.5rem' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th style={{ textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectOrder.products?.map((item, idx) => (
                      <tr key={idx}>
                        <td><strong>{item.name}</strong></td>
                        <td>{item.quantity}</td>
                        <td>TZS {Number(item.price).toLocaleString()}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700 }}>
                          TZS {Number(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'right', fontWeight: 800 }}>Estimated Total:</td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--color-primary-600)', fontSize: '1.1rem' }}>
                        TZS {Number(inspectOrder.totalAmount).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Status Update Control in Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Status:</span>
                  <select 
                    value={inspectOrder.status} 
                    onChange={(e) => handleStatusChange(inspectOrder._id || inspectOrder.id, e.target.value)}
                    className="form-select"
                    style={{ width: 'auto' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button onClick={() => setInspectOrder(null)} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
