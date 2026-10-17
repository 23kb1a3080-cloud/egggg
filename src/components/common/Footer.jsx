import React from 'react';
import { Flame, ShieldCheck, Zap, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 mt-20 border-t border-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-charcoal-700/60">
          <div className="flex items-center gap-4 bg-charcoal-700/40 p-4 rounded-2xl border border-charcoal-600/40">
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Ultra-Fast 20-30m</h4>
              <p className="text-xs text-charcoal-300">Hot and fresh directly from top nearby kitchens</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-charcoal-700/40 p-4 rounded-2xl border border-charcoal-600/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Live GPS Tracking</h4>
              <p className="text-xs text-charcoal-300">Know exactly where your food is every single minute</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-charcoal-700/40 p-4 rounded-2xl border border-charcoal-600/40">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">No Surprise Fees</h4>
              <p className="text-xs text-charcoal-300">Clear itemized pricing and instant order support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white shadow-brand-sm">
                <Flame className="w-5 h-5 fill-white stroke-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Quick<span className="text-brand">Bite</span>
              </span>
            </div>
            <p className="text-sm text-charcoal-300 max-w-sm mb-5 leading-relaxed">
              QuickBite connects hungry food lovers with the best culinary spots in town.
              Designed for blazing speed, culinary satisfaction, and live clarity.
            </p>
            <div className="flex items-center gap-2 text-xs text-charcoal-400">
              <span>Primary brand: #FF6B35</span>
              <span>•</span>
              <span>Dark charcoal: #202124</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm text-white mb-4 tracking-wide uppercase">Discover</h5>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li><Link to="/" className="hover:text-brand transition-colors">Nearby Restaurants</Link></li>
              <li><Link to="/offers" className="hover:text-brand transition-colors">Special Offers</Link></li>
              <li><Link to="/" className="hover:text-brand transition-colors">Top Rated Spots</Link></li>
              <li><Link to="/" className="hover:text-brand transition-colors">Fastest Delivery</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm text-white mb-4 tracking-wide uppercase">Cuisines</h5>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li><Link to="/" className="hover:text-brand transition-colors">Artisan Pizza</Link></li>
              <li><Link to="/" className="hover:text-brand transition-colors">Gourmet Burgers</Link></li>
              <li><Link to="/" className="hover:text-brand transition-colors">Authentic Sushi</Link></li>
              <li><Link to="/" className="hover:text-brand transition-colors">Healthy Bowls</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm text-white mb-4 tracking-wide uppercase">QuickBite Care</h5>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li><a href="#help" className="hover:text-brand transition-colors">24/7 Live Support</a></li>
              <li><a href="#terms" className="hover:text-brand transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-brand transition-colors">Privacy Policy</a></li>
              <li><a href="#partner" className="hover:text-brand transition-colors">Partner With Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>© {new Date().getFullYear()} QuickBite Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-brand fill-brand" /> for speed and great food.
          </p>
        </div>

      </div>
    </footer>
  );
}
