import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, activeRestaurant, subtotal, deliveryFee, serviceFee, discountAmount, total, clearCart } = useCart();
  const { placeOrder } = useOrder();

  const [address, setAddress] = useState('742 Evergreen Terrace, Downtown, Apt 4B');
  const [deliveryNote, setDeliveryNote] = useState('Leave at front door and ring bell');
  const [paymentMethod, setPaymentMethod] = useState('apple_pay');
  const [tip, setTip] = useState(3.00);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !activeRestaurant || cartItems.length === 0) return null;

  const finalOrderTotal = total + tip;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        items: cartItems,
        restaurant: activeRestaurant,
        subtotal,
        deliveryFee,
        serviceFee,
        discountAmount,
        total: finalOrderTotal,
        address,
        deliveryNote,
      });

      clearCart();
      setIsSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-elevated border border-charcoal/10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-charcoal/10 bg-warm-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center shadow-brand-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-charcoal">QuickBite Checkout</h3>
              <p className="text-xs text-charcoal-400">Fast delivery from {activeRestaurant.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-warm-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Estimated Arrival Banner */}
          <div className="p-3.5 bg-brand-50 border border-brand-200 rounded-2xl flex items-center justify-between text-xs text-brand-900">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand" />
              <span className="font-semibold">Estimated Delivery Window:</span>
            </div>
            <span className="font-extrabold bg-white px-2.5 py-1 rounded-lg border border-brand-200">
              {activeRestaurant.deliveryTime || '20-25'} mins
            </span>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
              Delivery Address
            </label>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-warm-50 border border-charcoal/10">
              <MapPin className="w-5 h-5 text-brand shrink-0" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs font-semibold text-charcoal bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Delivery Drop-off Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
              Drop-off Instructions
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {['Leave at door', 'Meet outside', 'Hand to me', 'Call on arrival'].map((note) => (
                <button
                  key={note}
                  type="button"
                  onClick={() => setDeliveryNote(note)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                    deliveryNote === note
                      ? 'bg-brand-50 text-brand border-brand'
                      : 'bg-warm-50 text-charcoal-600 border-charcoal/10'
                  }`}
                >
                  {note}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              placeholder="Add specific instructions for courier..."
              className="w-full p-2.5 rounded-xl bg-warm-50 border border-charcoal/10 text-xs focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>

          {/* Payment Method Selector (Simulated) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
              Payment Method (Simulated)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'apple_pay'
                    ? 'border-brand bg-brand-50/60 shadow-sm text-brand'
                    : 'border-charcoal/10 bg-warm-50 text-charcoal-600 hover:border-brand/40'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-xs font-bold">Apple / Google</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-brand bg-brand-50/60 shadow-sm text-brand'
                    : 'border-charcoal/10 bg-warm-50 text-charcoal-600 hover:border-brand/40'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-bold">Card **** 4921</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'border-brand bg-brand-50/60 shadow-sm text-brand'
                    : 'border-charcoal/10 bg-warm-50 text-charcoal-600 hover:border-brand/40'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span className="text-xs font-bold">Cash on Delivery</span>
              </button>
            </div>
            <p className="text-[11px] text-charcoal-400 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Demo mode: No real payment processed. 100% simulated sandbox.
            </p>
          </div>

          {/* Courier Tip */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                Courier Tip
              </label>
              <span className="text-xs font-bold text-charcoal-700">${tip.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1.50, 3.00, 5.00, 0].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setTip(amount)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    tip === amount
                      ? 'bg-brand text-white border-brand'
                      : 'bg-warm-50 text-charcoal-600 border-charcoal/10 hover:border-brand/40'
                  }`}
                >
                  {amount === 0 ? 'Not now' : `$${amount.toFixed(2)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Final Price Breakdown */}
          <div className="p-4 bg-warm-50 rounded-2xl space-y-1.5 text-xs text-charcoal-600 border border-charcoal/5">
            <div className="flex justify-between">
              <span>Items Total ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
              <span className="font-semibold text-charcoal-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
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
            <div className="flex justify-between">
              <span>Courier Tip</span>
              <span className="font-semibold text-charcoal-800">${tip.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-charcoal/10 flex justify-between font-extrabold text-charcoal text-base">
              <span>Total to Pay</span>
              <span className="text-brand">${finalOrderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-brand hover:bg-brand-600 text-white font-extrabold text-base shadow-brand flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Confirming Order with Kitchen...
              </span>
            ) : (
              <>
                <span>Place Order • ${finalOrderTotal.toFixed(2)}</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
