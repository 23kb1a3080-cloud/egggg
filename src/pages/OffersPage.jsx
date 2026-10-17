import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, Copy, Check, ArrowRight, Percent, Gift, Flame } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    {
      code: 'QUICKBITE20',
      title: '20% Off Your Entire Feast',
      discount: '20% OFF',
      description: 'Valid on all orders from any top restaurant with minimum order of $20. One per customer.',
      badge: 'Popular',
      color: 'from-orange-500 to-amber-500',
    },
    {
      code: 'FREESHIP',
      title: 'Unlimited Free Delivery',
      discount: 'FREE DELIVERY',
      description: 'Zero delivery fee applied on all nearby restaurants within 3 miles. No minimum spend required.',
      badge: 'Zero Fees',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      code: 'BURGER20',
      title: 'Burger Lab Special Promo',
      discount: '20% OFF BURGERS',
      description: 'Enjoy 20% discount on artisan smash patties, truffle fries, and milkshakes from The Burger Lab.',
      badge: 'Exclusive',
      color: 'from-rose-500 to-brand-500',
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand text-xs font-bold">
          <Percent className="w-3.5 h-3.5" />
          <span>Exclusive Promo Codes & Deals</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          Supercharge your savings
        </h1>
        <p className="text-sm sm:text-base text-charcoal-500">
          Apply any of these verified promo codes at checkout to unlock instant discounts and free delivery on QuickBite.
        </p>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.code}
            className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className={`h-2 absolute top-0 inset-x-0 bg-gradient-to-r ${offer.color}`} />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                  {offer.badge}
                </span>
                <span className="text-xs font-black text-charcoal-700 bg-warm-100 px-2 py-0.5 rounded-md">
                  {offer.discount}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-charcoal mb-2">
                {offer.title}
              </h3>

              <p className="text-xs text-charcoal-500 leading-relaxed mb-6">
                {offer.description}
              </p>
            </div>

            {/* Code Box & Copy Button */}
            <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-warm-50 border border-charcoal/15 px-3.5 py-2 rounded-xl flex-1 font-mono font-bold text-sm text-charcoal">
                <Tag className="w-4 h-4 text-brand shrink-0" />
                <span>{offer.code}</span>
              </div>

              <button
                onClick={() => handleCopy(offer.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  copiedCode === offer.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-charcoal text-white hover:bg-brand'
                }`}
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Restaurant Deals */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal">
              Restaurants with Active Specials
            </h2>
            <p className="text-xs text-charcoal-400 font-medium">
              Free sides, complimentary drinks, and bundle discounts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESTAURANTS.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-5 border border-charcoal/10 shadow-soft flex items-center gap-4 hover:shadow-card transition-all"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-brand bg-brand-50 px-2 py-0.5 rounded-md inline-block mb-1">
                  {r.promo || 'Special Bundle Available'}
                </span>
                <h4 className="font-bold text-base text-charcoal truncate">{r.name}</h4>
                <p className="text-xs text-charcoal-400 truncate mt-0.5">{r.cuisine}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal-600">
                    ⚡ {r.deliveryTime} mins arrival
                  </span>
                  <Link
                    to={`/restaurant/${r.id}`}
                    className="text-xs font-bold text-brand hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
