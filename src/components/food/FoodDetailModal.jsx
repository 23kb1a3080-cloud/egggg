import React, { useState } from 'react';
import { X, Plus, Minus, Star, Clock, Flame, ShieldAlert, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function FoodDetailModal({ item, restaurant, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('Medium');

  if (!item) return null;

  const handleAdd = () => {
    const fullNotes = [
      spiceLevel ? `Spice: ${spiceLevel}` : '',
      instructions ? `Notes: ${instructions}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    addToCart(item, restaurant, quantity, fullNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-elevated border border-charcoal/10 flex flex-col max-h-[90vh]">
        
        {/* Header Image */}
        <div className="relative aspect-[16/10] bg-charcoal-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-charcoal transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
            {item.calories && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-charcoal/80 text-white backdrop-blur-md">
                {item.calories}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-charcoal">{item.name}</h2>
              <span className="text-xl font-extrabold text-brand">
                ${(item.price * quantity).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-charcoal-500">
              {item.rating && (
                <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  {item.rating} ({item.reviews || '200+'} reviews)
                </span>
              )}
              {item.prepTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Prep time: {item.prepTime}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Spice Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-2">
              Spice Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild', 'Medium', 'Extra Spicy 🔥'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    spiceLevel === level
                      ? 'bg-brand text-white border-brand shadow-sm'
                      : 'bg-warm-50 text-charcoal-700 border-charcoal/10 hover:border-brand/40'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-2">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra dressing on the side, no onions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-warm-50 border border-charcoal/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-charcoal/10 bg-warm-50 flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-white border border-charcoal/10 rounded-2xl px-3 py-1.5 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal hover:bg-warm-100"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-charcoal">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal hover:bg-warm-100"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-2xl bg-brand hover:bg-brand-600 text-white font-bold text-sm shadow-brand flex items-center justify-between active:scale-95 transition-all"
          >
            <span>Add to Order</span>
            <span>${(item.price * quantity).toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
