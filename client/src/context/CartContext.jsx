import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sgl_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quoteModalProduct, setQuoteModalProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sgl_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id || item.id === product.id);
      if (existing) {
        return prev.map(item =>
          (item._id === product._id || item.id === product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        (item._id === productId || item.id === productId)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId && item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
    return acc + (priceNum * item.quantity);
  }, 0);

  const formatCurrency = (val) => {
    return 'TZS ' + Number(val).toLocaleString();
  };

  const openQuoteModal = (product = null) => {
    setQuoteModalProduct(product);
  };

  const closeQuoteModal = () => {
    setQuoteModalProduct(null);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        subtotalFormatted: formatCurrency(subtotal),
        formatCurrency,
        quoteModalProduct,
        openQuoteModal,
        closeQuoteModal,
        quickViewProduct,
        openQuickView,
        closeQuickView
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
