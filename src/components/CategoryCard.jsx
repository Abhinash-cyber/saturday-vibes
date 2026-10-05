import React from 'react';

export default function CategoryCard({ category, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group px-4 py-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 shrink-0 ${
        isSelected
          ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white border-rose-500 shadow-md shadow-rose-500/20 scale-[1.02]'
          : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700 hover:border-slate-300 shadow-2xs'
      }`}
    >
      <span className="text-2xl transition-transform group-hover:scale-110">
        {category.icon}
      </span>
      <div>
        <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
          {category.name}
        </p>
        <span className={`text-[10px] ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
          {category.id === 'All' ? 'View all' : 'Explore vibe'}
        </span>
      </div>
    </button>
  );
}
