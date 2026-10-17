import React from 'react';
import { Plus, Minus, Star, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function MenuItemCard({ item, restaurant, onItemClick }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartEntry = cartItems.find((i) => i.id === item.id);
  const currentQuantity = cartEntry ? cartEntry.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item, restaurant, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, -1);
  };

  return (
    <div
      onClick={() => onItemClick && onItemClick(item)}
      className="group bg-white rounded-2xl p-4 border border-charcoal/10 shadow-soft hover:shadow-card transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div className="flex gap-4">
        {/* Info Column */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Dietary Badge & Popularity */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border ${
                  item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
                title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                />
              </span>
              {item.isPopular && (
                <span className="text-[10px] font-bold text-brand uppercase tracking-wider bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                  Popular
                </span>
              )}
            </div>

            <h4 className="font-bold text-base text-charcoal group-hover:text-brand transition-colors line-clamp-1">
              {item.name}
            </h4>

            <p className="text-xs text-charcoal-400 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-base font-extrabold text-charcoal">
              ${item.price.toFixed(2)}
            </span>
            {item.rating && (
              <span className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                {item.rating}
              </span>
            )}
            {item.prepTime && (
              <span className="flex items-center gap-1 text-xs text-charcoal-400 font-medium">
                <Clock className="w-3 h-3" />
                {item.prepTime}
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail & Add Button */}
        <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-warm-100 border border-charcoal/5">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Quick Add / Quantity Pill Overlay */}
          <div className="absolute bottom-2 inset-x-2">
            {currentQuantity > 0 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-between bg-charcoal text-white rounded-xl px-2 py-1 shadow-md text-xs font-bold"
              >
                <button
                  onClick={handleDecrement}
                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-charcoal-700 text-brand"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span>{currentQuantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-charcoal-700 text-brand"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full py-1.5 px-3 rounded-xl bg-white/95 backdrop-blur-md text-brand font-bold text-xs shadow-md hover:bg-brand hover:text-white transition-all flex items-center justify-center gap-1 border border-brand/20 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
