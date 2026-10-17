import React from 'react';
import { 
  Utensils, 
  Pizza, 
  Sandwich, 
  Fish, 
  Salad, 
  Flame, 
  IceCream, 
  Coffee 
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const iconMap = {
  Utensils,
  Pizza,
  Sandwich,
  Fish,
  Salad,
  Flame,
  IceCream,
  Coffee,
};

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Utensils;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all duration-200 shrink-0 border ${
                isSelected
                  ? 'bg-brand text-white border-brand shadow-brand-sm scale-105'
                  : 'bg-white text-charcoal-700 hover:text-charcoal-900 border-charcoal/10 hover:border-brand/40 hover:bg-warm-50 shadow-soft'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
