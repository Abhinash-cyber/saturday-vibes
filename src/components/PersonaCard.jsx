import React from 'react';
import { PERSONA_MEERA } from '../data/designProcessData';
import { User, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Brain, Eye, Heart } from 'lucide-react';

export default function PersonaCard() {
  const p = PERSONA_MEERA;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={p.avatar}
            alt={p.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white/30 shadow-xl shrink-0"
          />
          <div className="text-center sm:text-left space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl sm:text-3xl font-black">{p.name}</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                Age {p.age} • {p.year}
              </span>
            </div>
            <p className="text-rose-100 text-xs sm:text-sm font-medium">{p.degree}</p>
            <p className="mt-3 text-xs sm:text-sm italic text-white/90 bg-white/10 p-3 rounded-2xl border border-white/15">
              {p.quote}
            </p>
          </div>
        </div>
      </div>

      {/* Main Breakdown: Goals, Pain Points, Needs */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Goals */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
            <h4 className="font-extrabold text-sm uppercase tracking-wider">User Goals</h4>
          </div>
          <ul className="space-y-2 text-xs text-amber-950">
            {p.goals.map((g, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pain Points */}
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
          <div className="flex items-center gap-2 text-rose-900">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <h4 className="font-extrabold text-sm uppercase tracking-wider">Pain Points</h4>
          </div>
          <ul className="space-y-2 text-xs text-rose-950">
            {p.painPoints.map((pp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{pp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs & Latent Desires */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-3">
          <div className="flex items-center gap-2 text-indigo-900">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <h4 className="font-extrabold text-sm uppercase tracking-wider">User Needs</h4>
          </div>
          <ul className="space-y-2 text-xs text-indigo-950">
            {p.needs.map((n, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Empathy Map Quad */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Empathy Map Synthesis
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span>SAYS</span>
            </div>
            {p.empathyMap.says.map((s, i) => (
              <p key={i} className="text-slate-600 italic">{s}</p>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>THINKS</span>
            </div>
            {p.empathyMap.thinks.map((t, i) => (
              <p key={i} className="text-slate-600">{t}</p>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Eye className="w-4 h-4 text-emerald-500" />
              <span>DOES</span>
            </div>
            {p.empathyMap.does.map((d, i) => (
              <p key={i} className="text-slate-600">{d}</p>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>FEELS</span>
            </div>
            {p.empathyMap.feels.map((f, i) => (
              <p key={i} className="text-slate-600">{f}</p>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
