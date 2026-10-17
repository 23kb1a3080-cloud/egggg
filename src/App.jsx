import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import OffersPage from './pages/OffersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';
import LiveTrackerModal from './components/tracking/LiveTrackerModal';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-warm text-charcoal font-sans">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Main Pages */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/track" element={<OrderTrackingPage />} />
          <Route path="*" element={<HomePage searchQuery={searchQuery} />} />
        </Routes>
      </main>

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer onCheckoutClick={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <LiveTrackerModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <OrderProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </OrderProvider>
    </Router>
  );
}
