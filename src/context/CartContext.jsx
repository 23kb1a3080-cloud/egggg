import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('quickbite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeRestaurant, setActiveRestaurant] = useState(() => {
    try {
      const saved = localStorage.getItem('quickbite_rest');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('quickbite_cart', JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      setActiveRestaurant(null);
      localStorage.removeItem('quickbite_rest');
    }
  }, [cartItems]);

  useEffect(() => {
    if (activeRestaurant) {
      localStorage.setItem('quickbite_rest', JSON.stringify(activeRestaurant));
    }
  }, [activeRestaurant]);

  const addToCart = (item, restaurant, quantity = 1, instructions = '') => {
    // If adding from a different restaurant, we can confirm or switch
    if (activeRestaurant && activeRestaurant.id !== restaurant.id && cartItems.length > 0) {
      const confirmSwitch = window.confirm(
        `Your cart already has items from "${activeRestaurant.name}". Start a new order from "${restaurant.name}"?`
      );
      if (!confirmSwitch) return false;
      setCartItems([{ ...item, quantity, instructions, restaurantId: restaurant.id }]);
      setActiveRestaurant(restaurant);
      setIsCartOpen(true);
      return true;
    }

    setActiveRestaurant(restaurant);
    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          instructions: instructions || next[existingIndex].instructions
        };
        return next;
      }
      return [...prev, { ...item, quantity, instructions, restaurantId: restaurant.id }];
    });
    setIsCartOpen(true);
    return true;
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setActiveRestaurant(null);
    setPromoCode('');
    setDiscount(0);
    localStorage.removeItem('quickbite_cart');
    localStorage.removeItem('quickbite_rest');
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'QUICKBITE20' || clean === 'BURGER20') {
      setPromoCode(clean);
      setDiscount(0.20); // 20% off
      return { success: true, message: '20% discount applied!' };
    } else if (clean === 'FREESHIP') {
      setPromoCode(clean);
      setDiscount('FREESHIP');
      return { success: true, message: 'Free delivery applied!' };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = discount === 'FREESHIP' ? 0 : (activeRestaurant ? activeRestaurant.deliveryFee : 1.99);
  const serviceFee = subtotal > 0 ? 1.50 : 0;
  const discountAmount = typeof discount === 'number' && discount > 0 ? subtotal * discount : 0;
  const total = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? deliveryFee + serviceFee : 0));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        activeRestaurant,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        deliveryFee,
        serviceFee,
        discountAmount,
        promoCode,
        applyPromo,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
