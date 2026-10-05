import React from 'react';
import { DIVERGENT_IDEAS } from '../data/designProcessData';
import { Lightbulb, StickyNote } from 'lucide-react';

export default function DivergentIdeas() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Brainstorming Stage</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Divergent Solutions – Think Wide
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
            In the divergent phase, we deferred judgment and generated a wide spectrum of ideas 
            to address student boredom, anxiety, and disinterest before filtering down to feasibility.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 self-start sm:self-auto">
          10 Brainstormed Concepts
        </span>
      </div>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DIVERGENT_IDEAS.map((idea) => (
          <div
            key={idea.number}
            className={`p-5 rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between relative shadow-xs ${idea.color}`}
          >
            {/* Pin / Sticky tape representation */}
            <div className="w-8 h-2.5 bg-black/10 rounded-sm mx-auto -mt-6 mb-3" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{idea.icon}</span>
                <span className="text-xs font-black opacity-60">IDEA {idea.number}</span>
              </div>

              <h4 className="font-extrabold text-sm sm:text-base leading-snug">
                {idea.title}
              </h4>
              <p className="text-[11px] font-bold opacity-80 mt-0.5">
                {idea.tagline}
              </p>

              <p className="text-xs mt-3 leading-relaxed opacity-90">
                {idea.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
              <span>Sticky Note</span>
              <span>Divergent</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
