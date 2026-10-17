import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  MapPin, 
  Tag, 
  Search, 
  ArrowLeft, 
  ShoppingBag, 
  Sparkles, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import MenuItemCard from '../components/food/MenuItemCard';
import FoodDetailModal from '../components/food/FoodDetailModal';
import { useCart } from '../context/CartContext';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const { cartItems, activeRestaurant, setIsCartOpen, totalCount, subtotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  // Find restaurant
  const restaurant = useMemo(() => {
    return RESTAURANTS.find((r) => r.id === id) || RESTAURANTS[0];
  }, [id]);

  // Extract menu categories
  const categories = useMemo(() => {
    const cats = ['All'];
    restaurant.menu.forEach((item) => {
      if (item.category && !cats.includes(item.category)) {
        cats.push(item.category);
      }
    });
    return cats;
  }, [restaurant]);

  // Filter menu items
  const filteredMenu = useMemo(() => {
    return restaurant.menu.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        !menuSearch ||
        item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(menuSearch.toLowerCase());
      const matchVeg = !vegOnly || item.isVeg;

      return matchCat && matchSearch && matchVeg;
    });
  }, [restaurant, selectedCategory, menuSearch, vegOnly]);

  const hasItemsInCartFromThisRestaurant =
    activeRestaurant && activeRestaurant.id === restaurant.id && totalCount > 0;

  return (
    <div className="pb-24">
      
      {/* Restaurant Hero Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-charcoal overflow-hidden">
        <img
          src={restaurant.bannerImage || restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-black/30" />

        {/* Back Link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md text-charcoal font-bold text-xs shadow-md hover:bg-white hover:text-brand transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </Link>
        </div>

        {/* Floating Restaurant Info Card */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand text-white shadow-brand-sm">
                  {restaurant.priceRange}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                  {restaurant.cuisine}
                </span>
                {restaurant.tags && restaurant.tags.map((tag) => (
                  <span key={tag} className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/40 text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {restaurant.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {restaurant.tagline}
              </p>
            </div>

            {/* Quick Metrics Badge Group */}
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-elevated border border-charcoal/10 shrink-0">
              <div className="text-center px-3 border-r border-charcoal/10">
                <div className="flex items-center justify-center gap-1 text-sm font-extrabold text-charcoal">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-[10px] text-charcoal-400 font-semibold">{restaurant.reviewCount}+ reviews</span>
              </div>

              <div className="text-center px-3 border-r border-charcoal/10">
                <div className="flex items-center justify-center gap-1 text-sm font-extrabold text-brand">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}m</span>
                </div>
                <span className="text-[10px] text-charcoal-400 font-semibold">Delivery Time</span>
              </div>

              <div className="text-center px-3">
                <div className="flex items-center justify-center gap-1 text-sm font-extrabold text-charcoal">
                  <MapPin className="w-4 h-4 text-charcoal-400" />
                  <span>{restaurant.distance}</span>
                </div>
                <span className="text-[10px] text-charcoal-400 font-semibold">{restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee.toFixed(2)}`}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Menu Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Promo Notice */}
        {restaurant.promo && (
          <div className="p-4 bg-brand-50 border border-brand-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-900 font-bold">
              <Tag className="w-4 h-4 text-brand shrink-0" />
              <span>Special Offer: {restaurant.promo}</span>
            </div>
            <span className="text-xs font-mono font-bold bg-white text-brand px-2.5 py-1 rounded-lg border border-brand-200">
              Auto-Applied
            </span>
          </div>
        )}

        {/* Menu Navigation & Filters Bar */}
        <div className="sticky top-20 z-30 bg-warm/95 backdrop-blur-md py-4 border-b border-charcoal/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-white text-charcoal-600 border border-charcoal/10 hover:border-brand/40 hover:text-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search within Menu & Veg Only switch */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search dish..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
              />
            </div>

            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                vegOnly
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-charcoal-600 border-charcoal/10 hover:border-emerald-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Veg Only</span>
            </button>
          </div>

        </div>

        {/* Menu Items Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-charcoal">
              {selectedCategory === 'All' ? 'Full Menu' : selectedCategory}
            </h2>
            <span className="text-xs text-charcoal-400 font-semibold">
              {filteredMenu.length} items
            </span>
          </div>

          {filteredMenu.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-charcoal/10">
              <p className="text-charcoal-500 text-sm">No items match your criteria in this section.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMenuSearch('');
                  setVegOnly(false);
                }}
                className="mt-3 px-4 py-2 bg-brand text-white text-xs font-bold rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredMenu.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  restaurant={restaurant}
                  onItemClick={(selected) => setModalItem(selected)}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Floating Bottom Bar if Cart has items */}
      {hasItemsInCartFromThisRestaurant && (
        <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto z-40 animate-fade-in">
          <div
            onClick={() => setIsCartOpen(true)}
            className="p-3.5 bg-charcoal text-white rounded-2xl shadow-elevated flex items-center justify-between cursor-pointer hover:bg-charcoal-700 transition-all border border-charcoal-600"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-brand-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} in order
                </span>
                <span className="text-xs text-brand font-semibold">
                  View cart & checkout
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white">${subtotal.toFixed(2)}</span>
              <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center font-bold text-xs">
                →
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Customization Modal */}
      {modalItem && (
        <FoodDetailModal
          item={modalItem}
          restaurant={restaurant}
          onClose={() => setModalItem(null)}
        />
      )}

    </div>
  );
}
