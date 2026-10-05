import React from 'react';
import ProcessTimeline from '../components/ProcessTimeline';
import PersonaCard from '../components/PersonaCard';
import DivergentIdeas from '../components/DivergentIdeas';
import ConvergentTable from '../components/ConvergentTable';
import { TESTING_RESULTS } from '../data/designProcessData';
import { 
  Sparkles, 
  HelpCircle, 
  Layers, 
  FlaskConical, 
  CheckCircle, 
  FileText, 
  ArrowRight,
  Lightbulb,
  Check,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function DesignProcessView() {
  return (
    <div className="space-y-16 py-4">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Digital Engineering Lab Capstone</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Our Design Thinking Journey
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Follow the 7-stage human-centered innovation framework that transformed weekend campus disengagement into an empowering, personalized student platform.
          </p>
        </div>

        <div className="absolute right-6 -bottom-10 opacity-10 text-9xl pointer-events-none">
          💡
        </div>
      </div>

      {/* 01. VISUAL 7-STAGE TIMELINE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
            01
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Process Overview
          </h2>
        </div>
        <ProcessTimeline />
      </section>

      <hr className="border-slate-200" />

      {/* 02. PROBLEM DEFINITION & HOW MIGHT WE */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
            02
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Define: Problem & How Might We
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">The Problem Statement</span>
            <h3 className="text-xl sm:text-2xl font-black text-rose-950">
              Meera and her peers find Saturday campus activities unappealing, repetitive, and inflexible.
            </h3>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
              After exhausting 5-day academic weeks, students protect their Saturdays. When universities only schedule rigid, mandatory, or generic seminars, students vote with their feet and stay home.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">The Core Design Question</span>
            <h3 className="text-xl sm:text-2xl font-black text-indigo-950">
              "How might we redesign Saturday activities to be more engaging, inclusive, flexible, personalized, and something students genuinely look forward to?"
            </h3>
            <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed">
              By shifting the dynamic from institutional mandate to student autonomy, mood-alignment, and peer camaraderie.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* 03. EMPATHY & USER PERSONA */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
            03
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Empathy: User Persona (Meera)
          </h2>
        </div>
        <PersonaCard />
      </section>

      <hr className="border-slate-200" />

      {/* 04. DIVERGENT THINKING (10 IDEAS) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-yellow-500 text-white flex items-center justify-center font-bold text-xs">
            04
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Divergent Thinking: 10 Solutions
          </h2>
        </div>
        <DivergentIdeas />
      </section>

      <hr className="border-slate-200" />

      {/* 05. CONVERGENT THINKING (DECISION MATRIX) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            05
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Convergent Thinking: Decision Matrix & Final Concept
          </h2>
        </div>
        <ConvergentTable />
      </section>

      <hr className="border-slate-200" />

      {/* 06. PROTOTYPE EVOLUTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
            06
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Prototype Evolution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Phase 1: Low-Fidelity
            </span>
            <h4 className="text-lg font-bold text-slate-900">Paper Wireframes & Flow</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mapped out the 3 core student journeys: quick discovery via search, personalized quiz flow, and event creation without login friction.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Focused on clean information architecture</li>
              <li>• Verified questionnaire brevity (5 questions max)</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              Phase 2: Digital Prototype
            </span>
            <h4 className="text-lg font-bold text-slate-900">Interactive Component Layout</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed youthful typography, rounded card geometry, visual category chips, and the "Buddy Mode" roster to conquer social anxiety.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Mobile viewport responsiveness</li>
              <li>• Color-coded category identity</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-rose-200 ring-2 ring-rose-500/10 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              Phase 3: Final Web Platform
            </span>
            <h4 className="text-lg font-bold text-rose-600">Saturday Vibes (Live Build)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineered full client-side state engine with localStorage persistence, dynamic recommendation algorithm, points rewards, and accessible modals.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• 100% interactive — zero static mocks</li>
              <li>• Immediate feedback with celebration toasts</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* 07. TESTING & FINDINGS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            07
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Testing & Iterative Improvements
          </h2>
        </div>

        {/* Usability Questions */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Usability Testing Protocol (6 Key Student Questions)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TESTING_RESULTS.questions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">Question {idx + 1}</span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.result}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800">{item.q}</p>
                <p className="text-[11px] text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TESTING_RESULTS.findings.map((f, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <h4 className="font-extrabold text-sm text-amber-950">{f.title}</h4>
              <p className="text-xs text-amber-900 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Design Improvements Implemented */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <h4 className="text-lg font-bold text-amber-300">
            Direct Design Improvements Implemented Based on Feedback:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TESTING_RESULTS.improvements.map((imp, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                  <Check className="w-3.5 h-3.5" />
                  <span>{imp.title}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">{imp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. FINAL PRODUCT PILLARS (Section 20) */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white shadow-xl space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
            The Result
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Saturday Vibes: Your Saturday. Your Vibe.
          </h2>
          <p className="text-rose-100 text-sm leading-relaxed">
            The platform helps students stop asking "Do I really want to go to this campus event?" and start thinking "What kind of Saturday do I want?"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            { word: "DISCOVER", desc: "Find activities matching your authentic interests." },
            { word: "PERSONALIZE", desc: "Choose mood, hours, energy, and social format." },
            { word: "CONNECT", desc: "Join friends or match with peers via Buddy Mode." },
            { word: "CREATE", desc: "Suggest and organize student-led activities with 0 red tape." },
            { word: "ENJOY", desc: "Build a Saturday schedule you genuinely look forward to." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 space-y-1">
              <span className="font-black text-sm text-amber-300 block">{item.word}</span>
              <p className="text-xs text-white leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
