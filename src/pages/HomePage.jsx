import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  MapPin, 
  Search, 
  Flame, 
  ArrowRight,
  Filter,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { RESTAURANTS, POPULAR_DISHES } from '../data/mockData';
import CategoryPills from '../components/food/CategoryPills';
import RestaurantCard from '../components/food/RestaurantCard';
import { useCart } from '../context/CartContext';
import FoodDetailModal from '../components/food/FoodDetailModal';

export default function HomePage({ searchQuery = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'fastest' | 'rating' | 'free_delivery'
  const [selectedDish, setSelectedDish] = useState(null);
  const { addToCart } = useCart();

  // Filter restaurants based on category, filter buttons, and search query
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((rest) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || rest.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        rest.name.toLowerCase().includes(query) ||
        rest.cuisine.toLowerCase().includes(query) ||
        rest.menu.some((item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );

      // Filter tabs
      let matchesFilter = true;
      if (activeFilter === 'fastest') {
        matchesFilter = rest.fastest;
      } else if (activeFilter === 'rating') {
        matchesFilter = rest.rating >= 4.8;
      } else if (activeFilter === 'free_delivery') {
        matchesFilter = rest.deliveryFee === 0 || rest.deliveryFee <= 1.49;
      }

      return matchesCategory && matchesSearch && matchesFilter;
    });
  }, [selectedCategory, searchQuery, activeFilter]);

  // Fastest delivery collection
  const fastestSpots = useMemo(() => {
    return RESTAURANTS.filter((r) => r.fastest);
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-100/70 via-warm-50 to-warm pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text / Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand text-xs font-bold shadow-sm">
              <Zap className="w-4 h-4 fill-brand" />
              <span>Average delivery in 22 mins</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span className="text-charcoal-700">Zero hidden fees</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.15]">
              Cravings satisfied <br />
              at <span className="text-brand relative inline-block">
                lightning speed.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 max-w-xl font-normal leading-relaxed">
              Discover chef-crafted meals, authentic street tacos, artisan sourdough pizzas, and healthy poke bowls from top neighborhood kitchens.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg border-t border-charcoal/10">
              <div>
                <span className="block text-2xl font-extrabold text-charcoal">4.9 ★</span>
                <span className="text-xs text-charcoal-400 font-medium">Customer rating</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-brand">20 min</span>
                <span className="text-xs text-charcoal-400 font-medium">Average arrival</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-charcoal">50+</span>
                <span className="text-xs text-charcoal-400 font-medium">Top local spots</span>
              </div>
            </div>
          </div>

          {/* Right Hero Food Imagery Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden shadow-elevated border-4 border-white group">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
                alt="Delicious Gourmet Food Delivery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

              {/* Floating Live Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-elevated border border-charcoal/5 flex items-center gap-2 text-xs font-bold text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-beacon" />
                <span>32 drivers active nearby</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-elevated border border-charcoal/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand block">
                    Special Launch Offer
                  </span>
                  <p className="text-xs font-bold text-charcoal">
                    20% off your first 3 orders with <span className="font-mono text-brand">QUICKBITE20</span>
                  </p>
                </div>
                <Link
                  to="/offers"
                  className="px-3 py-1.5 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-brand transition-colors shrink-0"
                >
                  Claim
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Pills Slider */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                Explore Cuisines
              </h2>
              <p className="text-xs text-charcoal-400 font-medium">
                Filter by what you're craving right now
              </p>
            </div>
          </div>

          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => setSelectedCategory(id)}
          />
        </section>

        {/* Filter Bar & Sorting */}
        <section className="flex flex-wrap items-center justify-between gap-3 pt-2 border-b border-charcoal/5 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-charcoal-400 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand" /> Filter:
            </span>

            {[
              { id: 'all', label: 'All Places' },
              { id: 'fastest', label: '⚡ Fastest (< 25 min)' },
              { id: 'rating', label: '★ 4.8+ Top Rated' },
              { id: 'free_delivery', label: 'Low/Free Delivery' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  activeFilter === f.id
                    ? 'bg-charcoal text-white border-charcoal shadow-sm'
                    : 'bg-white text-charcoal-600 border-charcoal/10 hover:border-brand hover:text-brand'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-charcoal-400 font-medium">
            Showing <span className="font-bold text-charcoal-800">{filteredRestaurants.length}</span> restaurants
          </div>
        </section>

        {/* Restaurants Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                {selectedCategory === 'all'
                  ? 'Nearby Restaurants'
                  : `${CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Cuisine'} Spots`}
              </h2>
              <p className="text-xs text-charcoal-400 font-medium">
                Hand-picked kitchens ready to prepare your feast
              </p>
            </div>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-charcoal/10 shadow-soft space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-warm-100 mx-auto flex items-center justify-center text-charcoal-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-charcoal">No restaurants match your filters</h3>
              <p className="text-xs text-charcoal-400 max-w-sm mx-auto">
                Try resetting your search query or selecting "All Cuisines" to discover all available kitchens.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 bg-brand text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>

        {/* Trending Popular Dishes Section */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 fill-brand text-brand" />
                Crowd Favorites
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                Trending Bites Right Now
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_DISHES.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden border border-charcoal/10 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-charcoal shadow-sm">
                    {dish.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-charcoal/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-medium text-white">
                    {dish.deliveryTime}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-charcoal-400 block truncate">
                      {dish.restaurantName}
                    </span>
                    <h4 className="font-bold text-sm text-charcoal group-hover:text-brand transition-colors line-clamp-1 mt-0.5">
                      {dish.name}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-charcoal/5 flex items-center justify-between mt-3">
                    <span className="text-base font-extrabold text-charcoal">
                      ${dish.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        const targetRest = RESTAURANTS.find((r) => r.id === dish.restaurantId);
                        if (targetRest) {
                          const fullItem = targetRest.menu.find((m) => m.id === dish.id);
                          if (fullItem) {
                            addToCart(fullItem, targetRest, 1);
                          }
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-brand hover:bg-brand-600 text-white text-xs font-bold shadow-brand-sm transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Hero Banner */}
        <section className="rounded-3xl bg-charcoal text-white p-8 sm:p-12 relative overflow-hidden shadow-elevated">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand text-white inline-block">
              LIMITED TIME PARTNER SPECIAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Craving artisan pizza or gourmet burgers tonight?
            </h3>
            <p className="text-charcoal-300 text-sm leading-relaxed">
              Use code <span className="font-mono font-bold text-brand bg-white/10 px-2 py-0.5 rounded">QUICKBITE20</span> at checkout for 20% off your entire order with instant tracking.
            </p>
            <div className="pt-2">
              <Link
                to="/offers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand hover:bg-brand-600 text-white font-bold text-sm shadow-brand transition-all active:scale-95"
              >
                <span>View All Exclusive Deals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
              alt="Pizza banner"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

      </div>

      {/* Food Detail Modal if open */}
      {selectedDish && (
        <FoodDetailModal
          item={selectedDish.item}
          restaurant={selectedDish.restaurant}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
}
