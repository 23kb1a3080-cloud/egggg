import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Clock, 
  Sparkles, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onCheckoutClick }) {
  const {
    cartItems,
    activeRestaurant,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    serviceFee,
    discountAmount,
    promoCode,
    applyPromo,
    total,
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromo(inputPromo);
    setPromoMessage(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-charcoal/10 bg-warm-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shadow-brand-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-charcoal">Your Order</h2>
                {activeRestaurant ? (
                  <p className="text-xs text-charcoal-400 font-medium truncate max-w-[220px]">
                    From <span className="font-bold text-charcoal-700">{activeRestaurant.name}</span>
                  </p>
                ) : (
                  <p className="text-xs text-charcoal-400 font-medium">No items yet</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-warm-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-warm-100 flex items-center justify-center text-brand">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-charcoal">Your basket is empty</h3>
                  <p className="text-xs text-charcoal-400 mt-1 max-w-xs">
                    Explore mouth-watering dishes from top-rated restaurants near you!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-brand hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-brand-sm"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                {/* Active Restaurant delivery time banner */}
                {activeRestaurant && (
                  <div className="p-3 bg-brand-50 border border-brand-200 rounded-2xl flex items-center justify-between text-xs text-brand-900">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand" />
                      <span className="font-semibold">Estimated Delivery:</span>
                    </div>
                    <span className="font-extrabold bg-white px-2.5 py-0.5 rounded-lg border border-brand-200">
                      {activeRestaurant.deliveryTime} mins
                    </span>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-warm-50 rounded-2xl border border-charcoal/5 flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-charcoal truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs font-bold text-brand mt-0.5">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.instructions && (
                          <p className="text-[11px] text-charcoal-400 truncate mt-0.5 italic">
                            {item.instructions}
                          </p>
                        )}
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center bg-white border border-charcoal/10 rounded-xl px-1.5 py-1 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-charcoal hover:text-brand"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-charcoal hover:text-brand"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-charcoal-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="pt-2">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. QUICKBITE20)"
                        value={inputPromo}
                        onChange={(e) => setInputPromo(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-warm-50 border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-brand uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-charcoal hover:bg-charcoal-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {promoMessage && (
                    <div
                      className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                        promoMessage.success ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {promoMessage.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{promoMessage.message}</span>
                    </div>
                  )}

                  {promoCode && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-200">
                      <Sparkles className="w-3 h-3" />
                      <span>Code {promoCode} active</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Checkout Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-charcoal/10 bg-warm-50 space-y-4">
              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-charcoal-800">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Service Fee</span>
                  <span className="font-semibold text-charcoal-800">${serviceFee.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-charcoal/10 text-sm font-extrabold text-charcoal">
                  <span>Total</span>
                  <span className="text-brand text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 rounded-2xl bg-warm-200/60 hover:bg-rose-50 hover:text-rose-600 text-charcoal-500 text-xs font-semibold transition-colors"
                  title="Empty Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckoutClick && onCheckoutClick();
                  }}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-brand hover:bg-brand-600 text-white font-bold text-sm shadow-brand flex items-center justify-between active:scale-95 transition-all"
                >
                  <span>Checkout</span>
                  <div className="flex items-center gap-1.5">
                    <span>${total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
