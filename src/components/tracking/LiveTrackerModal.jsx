import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Bike, 
  Store, 
  Home, 
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export default function LiveTrackerModal() {
  const { isTrackerOpen, setIsTrackerOpen, currentActiveOrder } = useOrder();

  if (!isTrackerOpen || !currentActiveOrder) return null;

  const {
    id,
    restaurant,
    status,
    progressPercentage,
    estimatedDeliveryMin,
    driver,
    items,
    total,
    deliveryAddress,
    stages,
  } = currentActiveOrder;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-elevated border border-charcoal/10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-charcoal/10 bg-warm-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-charcoal">Live Order Tracking</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand text-white">
                  LIVE GPS
                </span>
              </div>
              <p className="text-xs text-charcoal-400 font-mono">Order #{id} • {restaurant.name}</p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackerOpen(false)}
            className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-warm-100 transition-colors"
            aria-label="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Simulated Map & Delivery Graphic */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-charcoal/20 shadow-inner h-52 sm:h-64 flex flex-col justify-between p-4">
            {/* SVG Background Grid / Street Map Graphic */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#street-grid)" />
              </svg>
            </div>

            {/* Simulated Animated Road Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 60 140 Q 180 60 300 130 T 560 80"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="4"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>

            {/* Top Info overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-charcoal-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-charcoal-700 text-white flex items-center gap-2 text-xs shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-brand live-beacon" />
                <span className="font-semibold">
                  {status === 'delivered' ? 'Delivered!' : `Estimated in ${estimatedDeliveryMin} mins`}
                </span>
              </div>

              <div className="bg-charcoal-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-charcoal-700 text-white text-xs font-mono font-medium">
                Speed: 24 km/h
              </div>
            </div>

            {/* Map Markers Overlay */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-10 py-6">
              {/* Restaurant Marker */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-white text-charcoal shadow-lg flex items-center justify-center border-2 border-brand">
                  <Store className="w-5 h-5 text-brand" />
                </div>
                <span className="text-[11px] font-bold text-white mt-1 bg-charcoal-900/80 px-2 py-0.5 rounded-md truncate max-w-[100px]">
                  {restaurant.name.split(' ')[0]}
                </span>
              </div>

              {/* Animated Driver Marker */}
              <div
                className="flex flex-col items-center transition-all duration-700 ease-out"
                style={{
                  transform: `translateX(${(progressPercentage - 50) * 1.5}px)`,
                }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-brand text-white shadow-brand flex items-center justify-center animate-bounce">
                    <Bike className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
                </div>
                <span className="text-[11px] font-bold text-brand bg-white px-2 py-0.5 rounded-md mt-1 shadow-md">
                  {driver.name.split(' ')[0]}
                </span>
              </div>

              {/* Customer Home Marker */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-center border-2 border-white">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white mt-1 bg-charcoal-900/80 px-2 py-0.5 rounded-md">
                  Home
                </span>
              </div>
            </div>

            {/* Bottom Address info on map */}
            <div className="relative z-10 flex items-center gap-2 text-xs text-slate-300 bg-charcoal-800/90 backdrop-blur-md p-2 rounded-xl border border-charcoal-700 truncate">
              <MapPin className="w-4 h-4 text-brand shrink-0" />
              <span className="truncate">Destination: {deliveryAddress}</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-charcoal">
              <span>Delivery Progress</span>
              <span className="text-brand font-mono">{progressPercentage}%</span>
            </div>

            <div className="w-full bg-warm-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-600 to-brand-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Stage items */}
            <div className="grid grid-cols-5 gap-1 pt-2">
              {stages.map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-colors ${
                      stage.completed
                        ? 'bg-emerald-500 text-white'
                        : stage.active
                        ? 'bg-brand text-white live-beacon'
                        : 'bg-warm-200 text-charcoal-400'
                    }`}
                  >
                    {stage.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] leading-tight font-semibold line-clamp-1 ${
                      stage.active ? 'text-brand font-bold' : 'text-charcoal-600'
                    }`}
                  >
                    {stage.label}
                  </span>
                  <span className="text-[9px] text-charcoal-400 mt-0.5">{stage.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courier Card */}
          <div className="p-4 bg-warm-50 rounded-2xl border border-charcoal/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-brand"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-charcoal">{driver.name}</h4>
                  <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-bold">
                    ★ {driver.rating}
                  </span>
                </div>
                <p className="text-xs text-charcoal-400">{driver.vehicle} • {driver.trips}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${driver.phone}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Calling driver ${driver.name} at ${driver.phone}`);
                }}
                className="w-10 h-10 rounded-xl bg-white border border-charcoal/10 text-charcoal-700 hover:text-brand hover:border-brand flex items-center justify-center transition-colors shadow-sm"
                title="Call Driver"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => alert(`Opening message chat with ${driver.name}`)}
                className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand-600 transition-colors shadow-brand-sm"
                title="Message Driver"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div className="border border-charcoal/10 rounded-2xl p-4 bg-white space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-charcoal uppercase tracking-wider">
              <span>Order Summary ({items.length} items)</span>
              <span className="text-brand">${total.toFixed(2)}</span>
            </div>
            <div className="divide-y divide-charcoal/5 pt-1">
              {items.map((item, i) => (
                <div key={i} className="py-2 flex justify-between items-center text-xs text-charcoal-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand">{item.quantity}x</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-charcoal-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-charcoal/10 bg-warm-50 flex items-center justify-between">
          <p className="text-xs text-charcoal-400">
            Need changes? <a href="#help" onClick={(e) => { e.preventDefault(); alert("Live 24/7 support agent connected."); }} className="text-brand font-semibold hover:underline">Contact 24/7 Support</a>
          </p>
          <button
            onClick={() => setIsTrackerOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-charcoal hover:bg-charcoal-700 text-white text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
