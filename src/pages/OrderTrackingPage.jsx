import React from 'react';
import { 
  Bike, 
  Store, 
  Home, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

export default function OrderTrackingPage() {
  const { orders, activeTrackingOrderId, setActiveTrackingOrderId, currentActiveOrder } = useOrder();

  if (!currentActiveOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-charcoal">No Active Orders</h2>
        <p className="text-sm text-charcoal-400">You do not have any orders in progress yet.</p>
        <Link to="/" className="inline-block px-5 py-2.5 bg-brand text-white text-xs font-bold rounded-xl shadow-brand-sm">
          Browse Top Restaurants
        </Link>
      </div>
    );
  }

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
    deliveryNote,
    stages,
    createdAt
  } = currentActiveOrder;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-bold text-charcoal-600 hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-400 font-semibold">Switch Order:</span>
            <select
              value={activeTrackingOrderId}
              onChange={(e) => setActiveTrackingOrderId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-charcoal/10 text-xs font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  #{o.id} - {o.restaurant.name} ({o.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Live Map Simulation & Courier Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Simulated Map */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-charcoal/20 shadow-elevated h-72 sm:h-96 flex flex-col justify-between p-6">
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="full-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#full-grid)" />
              </svg>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 80 180 Q 240 70 380 170 T 700 100"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="5"
                strokeDasharray="8 8"
                className="animate-pulse"
              />
            </svg>

            {/* Top Stats */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-charcoal-800/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-charcoal-700 text-white flex items-center gap-2.5 text-xs shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-brand live-beacon" />
                <span className="font-bold">
                  {status === 'delivered' ? 'Delivered to Door' : `Estimated Arrival in ${estimatedDeliveryMin} mins`}
                </span>
              </div>

              <div className="bg-charcoal-800/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-charcoal-700 text-white text-xs font-mono font-semibold">
                Live GPS Active
              </div>
            </div>

            {/* Map Pin Entities */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-14 py-8">
              {/* Restaurant */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-white text-charcoal shadow-lg flex items-center justify-center border-2 border-brand">
                  <Store className="w-6 h-6 text-brand" />
                </div>
                <span className="text-xs font-bold text-white mt-1.5 bg-charcoal-900/90 px-2.5 py-0.5 rounded-md">
                  {restaurant.name}
                </span>
              </div>

              {/* Courier Bike */}
              <div
                className="flex flex-col items-center transition-all duration-700 ease-out"
                style={{
                  transform: `translateX(${(progressPercentage - 50) * 1.8}px)`,
                }}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-brand text-white shadow-brand flex items-center justify-center animate-bounce">
                    <Bike className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
                </div>
                <span className="text-xs font-bold text-brand bg-white px-2.5 py-0.5 rounded-md mt-1.5 shadow-md">
                  {driver.name}
                </span>
              </div>

              {/* Destination */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-center border-2 border-white">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white mt-1.5 bg-charcoal-900/90 px-2.5 py-0.5 rounded-md">
                  Your Address
                </span>
              </div>
            </div>

            {/* Delivery destination bar */}
            <div className="relative z-10 flex items-center gap-2 text-xs text-slate-300 bg-charcoal-800/95 backdrop-blur-md p-3 rounded-2xl border border-charcoal-700">
              <MapPin className="w-4 h-4 text-brand shrink-0" />
              <span className="truncate">{deliveryAddress}</span>
            </div>
          </div>

          {/* Courier Contact Card */}
          <div className="p-5 bg-white rounded-3xl border border-charcoal/10 shadow-card flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-brand"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-base text-charcoal">{driver.name}</h4>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                    ★ {driver.rating}
                  </span>
                </div>
                <p className="text-xs text-charcoal-400 mt-0.5">{driver.vehicle} • {driver.trips}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => alert(`Calling driver at ${driver.phone}`)}
                className="w-11 h-11 rounded-2xl bg-warm-100 border border-charcoal/10 text-charcoal hover:text-brand flex items-center justify-center transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert(`Messaging courier ${driver.name}`)}
                className="w-11 h-11 rounded-2xl bg-brand text-white flex items-center justify-center hover:bg-brand-600 transition-colors shadow-brand-sm"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Col: Timeline & Receipt */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Order Status Stepper */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-charcoal">Delivery Progress</h3>
                <p className="text-xs text-charcoal-400">Order #{id} placed at {createdAt}</p>
              </div>
              <span className="font-mono text-xs font-bold text-brand bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                {progressPercentage}%
              </span>
            </div>

            <div className="space-y-4">
              {stages.map((stage, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      stage.completed
                        ? 'bg-emerald-500 text-white'
                        : stage.active
                        ? 'bg-brand text-white live-beacon'
                        : 'bg-warm-200 text-charcoal-400'
                    }`}
                  >
                    {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5
                        className={`text-sm font-bold truncate ${
                          stage.active ? 'text-brand' : 'text-charcoal'
                        }`}
                      >
                        {stage.label}
                      </h5>
                      <span className="text-xs text-charcoal-400 font-medium">{stage.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {deliveryNote && (
              <div className="p-3 bg-warm-50 rounded-2xl text-xs text-charcoal-600 border border-charcoal/5">
                <span className="font-bold text-charcoal block mb-0.5">Drop-off note:</span>
                <span>{deliveryNote}</span>
              </div>
            )}
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-card space-y-4">
            <h3 className="font-extrabold text-base text-charcoal">Order Items</h3>
            <div className="divide-y divide-charcoal/5">
              {items.map((it, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand">{it.quantity}x</span>
                    <span className="font-medium text-charcoal-800">{it.name}</span>
                  </div>
                  <span className="font-semibold text-charcoal">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-charcoal/10 flex justify-between items-center text-base font-extrabold text-charcoal">
              <span>Total Paid</span>
              <span className="text-brand">${total.toFixed(2)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
