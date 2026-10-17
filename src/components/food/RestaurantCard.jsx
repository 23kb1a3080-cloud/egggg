import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Tag, Sparkles } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group block bg-white rounded-3xl overflow-hidden border border-charcoal/10 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
    >
      {/* Restaurant Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          {restaurant.featured ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-brand text-white shadow-brand-sm">
              <Sparkles className="w-3 h-3 fill-white" />
              Featured
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-charcoal-800 shadow-sm">
              {restaurant.priceRange}
            </span>
          )}

          {/* Delivery Time Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-charcoal/90 backdrop-blur-md text-white border border-white/20 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-brand" />
            {restaurant.deliveryTime} min
          </span>
        </div>

        {/* Promo Banner if available */}
        {restaurant.promo && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-brand-700 text-xs font-bold shadow-sm max-w-full truncate">
              <Tag className="w-3 h-3 shrink-0 text-brand" />
              <span className="truncate">{restaurant.promo}</span>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-lg text-charcoal group-hover:text-brand transition-colors duration-200 line-clamp-1">
              {restaurant.name}
            </h3>
            {/* Rating */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="text-xs font-bold">{restaurant.rating}</span>
            </div>
          </div>

          <p className="text-xs text-charcoal-400 line-clamp-1 mb-2 font-medium">
            {restaurant.tagline}
          </p>

          <p className="text-xs font-medium text-charcoal-600 mb-3">
            {restaurant.cuisine}
          </p>
        </div>

        {/* Bottom Metadata: Distance & Delivery Fee */}
        <div className="pt-3 border-t border-charcoal/5 flex items-center justify-between text-xs text-charcoal-500">
          <div className="flex items-center gap-1 text-charcoal-600">
            <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
            <span>{restaurant.distance}</span>
          </div>

          <div className="font-semibold text-charcoal-700">
            {restaurant.deliveryFee === 0 ? (
              <span className="text-emerald-600 font-bold">Free Delivery</span>
            ) : (
              <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
