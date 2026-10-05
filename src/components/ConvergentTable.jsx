import React from 'react';
import { CONVERGENT_EVALUATION } from '../data/designProcessData';
import { Target, CheckCircle2, Sparkles, Filter, Layers } from 'lucide-react';

export default function ConvergentTable() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Target className="w-3.5 h-3.5" />
          <span>Evaluation & Convergence</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Convergent Solution – Choose the Best
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl">
          After divergent ideation, we applied weighted decision criteria: Student Interest, Feasibility, Inclusiveness, Flexibility, Engagement, and Ease of Implementation to synthesize the definitive platform architecture.
        </p>
      </div>

      {/* Evaluation Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-5">Brainstormed Idea</th>
                <th className="py-4 px-3 text-center">Student Interest</th>
                <th className="py-4 px-3 text-center">Feasibility</th>
                <th className="py-4 px-3 text-center">Inclusiveness</th>
                <th className="py-4 px-3 text-center">Flexibility</th>
                <th className="py-4 px-3 text-center">Decision Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {CONVERGENT_EVALUATION.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>{row.idea}</span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      row.interest === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {row.interest}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      row.feasibility === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.feasibility}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      row.inclusiveness === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.inclusiveness}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      row.flexibility === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {row.flexibility}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 font-bold border border-purple-200">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HIGHLIGHTED FINAL SYNTHESIS CARD */}
      <div className="bg-gradient-to-br from-purple-900 via-rose-900 to-amber-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-500/30">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Final Synthesized Solution</span>
          </div>

          <h4 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Personalized Saturday Activity Hub
          </h4>

          <p className="text-rose-100 text-sm sm:text-base leading-relaxed font-medium">
            "Instead of forcing students to attend predefined events, Saturday Vibes allows students to choose a Saturday experience that fits their interests, mood, availability, and social preferences."
          </p>

          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { num: "01", title: "Interest-Based Activities", desc: "10 rich categories matching authentic student passions" },
              { num: "02", title: "Flexible Scheduling", desc: "Morning, afternoon, and evening durations that respect sleep" },
              { num: "03", title: "Student-Led Activities", desc: "Any student can organize an event with zero bureaucracy" },
              { num: "04", title: "Buddy/Friend Participation", desc: "Never attend alone; sync plans with peers" },
              { num: "05", title: "Fun Social Experiences", desc: "Low-pressure, high-delight campus culture" }
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-[10px] font-black text-amber-300 block">PILLAR {item.num}</span>
                <p className="text-xs font-bold text-white">{item.title}</p>
                <p className="text-[11px] text-rose-200 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
