import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Presentation, 
  Lightbulb, 
  Target, 
  Smartphone, 
  FlaskConical, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import PersonaCard from './PersonaCard';
import DivergentIdeas from './DivergentIdeas';
import ConvergentTable from './ConvergentTable';

const SLIDES = [
  {
    id: "intro",
    title: "Saturday Vibes",
    subtitle: "Reimagining Saturdays: Making Campus Activities Irresistible",
    badge: "Digital Engineering Lab Capstone",
    content: (
      <div className="text-center py-8 space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-xl text-3xl">
          ✨
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Saturday Vibes
        </h2>
        <p className="text-xl font-semibold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          "Your Saturday. Your Vibe."
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          A human-centered digital platform that transforms weekend campus life from rigid mandatory routines into personalized, student-led experiences matching individual mood, energy, and interests.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 font-bold text-slate-700">Stanford d.school Design Thinking</span>
          <span className="px-3 py-1.5 rounded-full bg-slate-100 font-bold text-slate-700">Interactive Prototype</span>
          <span className="px-3 py-1.5 rounded-full bg-rose-100 font-bold text-rose-800">React + Vite + Tailwind</span>
        </div>
      </div>
    )
  },
  {
    id: "problem",
    title: "Stage 1 & 2: Problem & How Might We",
    subtitle: "Addressing Weekend Disengagement on Campus",
    badge: "Define",
    content: (
      <div className="space-y-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-3">
            <span className="text-xs font-black text-rose-600 uppercase tracking-wider">The Observed Problem</span>
            <h3 className="text-xl font-black text-rose-950">Campus Saturdays Feel Like Chores</h3>
            <ul className="text-xs text-rose-900 space-y-2">
              <li>• Repetitive, generic lectures and assemblies</li>
              <li>• Rigid whole-day schedules that ignore sleep & fatigue</li>
              <li>• Fear of attending alone without friend groups</li>
              <li>• Zero student ownership over activity programming</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200 space-y-3">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">The Core HMW Question</span>
            <h3 className="text-xl font-black text-indigo-950">How Might We...</h3>
            <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
              "How might we redesign Saturday campus activities to be engaging, inclusive, flexible, personalized, and something students genuinely look forward to?"
            </p>
            <div className="p-3 bg-white/80 rounded-xl border border-indigo-100 text-xs text-indigo-800">
              💡 <strong>Core Insight:</strong> Students don't dislike campus activities; they dislike activities that don't match their energy or interests.
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "persona",
    title: "User Persona: Meera (21)",
    subtitle: "Final Year Student Needing Weekend Autonomy",
    badge: "Empathize",
    content: (
      <div className="py-2">
        <PersonaCard />
      </div>
    )
  },
  {
    id: "diverge",
    title: "Stage 3: Divergent Solutions – Think Wide",
    subtitle: "10 Brainstormed Concepts Without Premature Judgment",
    badge: "Ideate",
    content: (
      <div className="py-2 max-h-[60vh] overflow-y-auto pr-1">
        <DivergentIdeas />
      </div>
    )
  },
  {
    id: "converge",
    title: "Stage 4: Convergent Evaluation Matrix",
    subtitle: "Weighted Decision Matrix Leading to Final Platform Hub",
    badge: "Converge",
    content: (
      <div className="py-2 max-h-[60vh] overflow-y-auto pr-1">
        <ConvergentTable />
      </div>
    )
  },
  {
    id: "prototype",
    title: "Stage 5 & 6: Prototype Evolution & Testing",
    subtitle: "Iterative Refinement and 94%+ Usability Score",
    badge: "Test & Validate",
    content: (
      <div className="space-y-6 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-700 block">Low-Fidelity</span>
            <p className="text-slate-500">Card sorting, questionnaire length tuning, and navigation IA.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs space-y-2">
            <span className="font-bold text-purple-700 block">Digital Wireframes</span>
            <p className="text-purple-900">Visual category cards, mood tags, and Buddy Mode roster.</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
            <span className="font-bold text-emerald-700 block">Interactive Build</span>
            <p className="text-emerald-900">React + dynamic scoring quiz + localStorage persistence.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">Key Testing Insight</h4>
          <p className="text-xs text-amber-950 leading-relaxed">
            Students unanimously praised <strong>Mood-based filtering</strong> and <strong>Buddy Mode</strong>: 
            knowing who else was attending eliminated 80% of attendance hesitation for introverted students.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "conclusion",
    title: "Stage 7: Final Solution Architecture",
    subtitle: "Discover • Personalize • Connect • Create • Enjoy",
    badge: "Final Solution",
    content: (
      <div className="text-center py-6 space-y-6 max-w-2xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          From Forced Attendance to Genuine Saturday Joy
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Saturday Vibes gives students the steering wheel for their campus weekends. With interactive discovery, dynamic mood questionnaires, peer buddy connections, and zero-friction student hosting, campus Saturdays become irresistible.
        </p>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white space-y-2 shadow-md">
          <p className="font-black text-sm">"What kind of Saturday do you want?"</p>
          <p className="text-xs text-rose-100">Live, functional prototype ready for evaluation.</p>
        </div>
      </div>
    )
  }
];

export default function PresentationMode() {
  const { presentationMode, setPresentationMode, setActiveTab } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPresentationMode(false);
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex(prev => Math.min(SLIDES.length - 1, prev + 1));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      }
    };
    if (presentationMode) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [presentationMode, setPresentationMode]);

  if (!presentationMode) return null;

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col justify-between shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Presentation Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-amber-400" />
            <span className="font-black text-xs uppercase tracking-wider">
              Capstone Pitch Deck / Viva Mode
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-amber-300 font-bold">
              Slide {currentSlideIndex + 1} of {SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPresentationMode(false);
                setActiveTab('personalize');
              }}
              className="px-3 py-1 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              Try Live Prototype
            </button>
            <button
              onClick={() => setPresentationMode(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Exit Presentation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {currentSlide.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              {currentSlide.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {currentSlide.subtitle}
            </p>
          </div>

          {currentSlide.content}
        </div>

        {/* Slide Footer Stepper */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === i ? 'w-8 bg-rose-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              disabled={currentSlideIndex === SLIDES.length - 1}
              onClick={() => setCurrentSlideIndex(prev => Math.min(SLIDES.length - 1, prev + 1))}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
