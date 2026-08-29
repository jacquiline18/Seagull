import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { QuickViewModal } from './components/common/QuickViewModal';
import { QuoteModal } from './components/common/QuoteModal';
import { FloatingActionButtons } from './components/common/FloatingActionButtons';

// Pages
import { IntroPage } from './pages/IntroPage';
import { HomePage } from './pages/HomePage';
import { OrderRequestPage } from './pages/OrderRequestPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Main App Layout Wrapper
const AppLayout = () => {
  const location = useLocation();
  const isIntro = location.pathname === '/intro';
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isIntro && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/order-request" element={<OrderRequestPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isIntro && <Footer />}
      {!isIntro && !isAdmin && <FloatingActionButtons />}

      {/* Global Interactive Modals */}
      <QuickViewModal />
      <QuoteModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <AppLayout />
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
