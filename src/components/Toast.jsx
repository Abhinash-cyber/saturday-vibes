import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md text-sm font-semibold transition-all ${
        toast.type === 'success' 
          ? 'bg-emerald-900/90 text-white border-emerald-500/50 shadow-emerald-500/20' 
          : 'bg-slate-900/90 text-white border-slate-700 shadow-slate-900/30'
      }`}>
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
