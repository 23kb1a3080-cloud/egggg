import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Flame, 
  Clock, 
  ChevronDown, 
  Menu, 
  X, 
  Percent,
  Sparkles,
  Navigation
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export default function Navbar({ onSearchChange, searchQuery = '' }) {
  const { totalCount, subtotal, setIsCartOpen } = useCart();
  const { currentActiveOrder, setIsTrackerOpen } = useOrder();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('742 Evergreen Terrace, Downtown');
  const navigate = useNavigate();

  const savedAddresses = [
    '742 Evergreen Terrace, Downtown',
    '88 Innovation Way, Suite 400 (Work)',
    '12 West Riverdale Ave (Gym & Studio)',
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-brand-sm group-hover:scale-105 transition-transform duration-200">
              <Flame className="w-6 h-6 fill-white stroke-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-charcoal">
                Quick<span className="text-brand">Bite</span>
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 rounded-md border border-brand-200">
                Ultra-Fast
              </span>
            </div>
          </Link>

          {/* Location Picker */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-warm-100 hover:bg-warm-200/80 text-charcoal-700 text-sm font-medium transition-colors border border-charcoal/5"
            >
              <MapPin className="w-4 h-4 text-brand shrink-0" />
              <div className="text-left max-w-[210px] truncate">
                <span className="text-xs text-charcoal-400 block font-normal leading-tight">Deliver to</span>
                <span className="font-semibold text-charcoal-900 truncate block text-xs">{currentAddress}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 shrink-0 ml-1" />
            </button>

            {locationOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-charcoal/5 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                  Select Delivery Location
                </div>
                {savedAddresses.map((addr) => (
                  <button
                    key={addr}
                    onClick={() => {
                      setCurrentAddress(addr);
                      setLocationOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-warm-50 flex items-center gap-2.5 text-charcoal-700 hover:text-brand font-medium transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="truncate">{addr}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search food, groceries, or restaurants..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-warm-50 hover:bg-white focus:bg-white text-sm rounded-xl border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all placeholder:text-charcoal-400"
              />
            </div>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">

            {/* Live Order Tracker Banner / Pill */}
            {currentActiveOrder && (
              <button
                onClick={() => setIsTrackerOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-all shadow-sm"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-brand live-beacon"></span>
                <span className="truncate max-w-[120px]">
                  Order {currentActiveOrder.status === 'on_the_way' ? 'Arriving' : 'Active'}
                </span>
                <Clock className="w-3.5 h-3.5 text-brand" />
              </button>
            )}

            {/* Offers Link */}
            <Link
              to="/offers"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-charcoal-700 hover:text-brand hover:bg-warm-100 rounded-xl transition-colors"
            >
              <Percent className="w-4 h-4 text-brand" />
              <span>Offers</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-charcoal hover:bg-charcoal-700 text-white font-medium text-sm transition-all shadow-md active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-brand" />
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center border-2 border-white animate-scale">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-warm-100 lg:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input in Sub-bar */}
        <div className="pb-3 lg:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search burgers, sushi, pizza..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-xl border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all placeholder:text-charcoal-400"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-charcoal/5 py-4 space-y-2 bg-warm-50 rounded-2xl p-4 mb-3 animate-fade-in">
            <div className="pb-2 border-b border-charcoal/5">
              <span className="text-xs text-charcoal-400 block font-normal">Delivering to</span>
              <span className="text-sm font-semibold text-charcoal-800">{currentAddress}</span>
            </div>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-charcoal-800 hover:text-brand hover:bg-white rounded-lg transition-colors"
            >
              Explore Restaurants
            </Link>
            <Link
              to="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-charcoal-800 hover:text-brand hover:bg-white rounded-lg transition-colors"
            >
              <span>Promos & Deals</span>
              <span className="text-xs font-bold bg-brand text-white px-2 py-0.5 rounded-full">Save 20%</span>
            </Link>
            {currentActiveOrder && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackerOpen(true);
                }}
                className="w-full text-left flex items-center justify-between px-3 py-2 text-sm font-semibold text-brand bg-brand-50 rounded-lg"
              >
                <span>Live Order Status</span>
                <span className="text-xs bg-brand text-white px-2 py-0.5 rounded-md">Track</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
