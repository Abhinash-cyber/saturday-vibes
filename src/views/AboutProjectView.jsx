import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  GraduationCap, 
  UserCheck, 
  Layers, 
  Code2, 
  RotateCcw,
  BookOpen,
  Award,
  Terminal,
  Cpu
} from 'lucide-react';

export default function AboutProjectView() {
  const { resetAllData } = useApp();

  return (
    <div className="space-y-12 py-4 max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Capstone Project Documentation</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          About "Saturday Vibes"
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          <strong className="text-white">PROJECT TITLE:</strong> "Reimagining Saturdays: Making Campus Activities Irresistible"
          <br />
          Developed for the <strong className="text-white">Digital Engineering Lab</strong> course as an interactive capstone prototype combining human-centered design thinking with modern frontend software engineering.
        </p>
      </div>

      {/* Core Project Metadata & Editable Team Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academic Details */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Academic Metadata</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Course:</span>
              <span className="font-bold text-slate-800">Digital Engineering Lab Capstone</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Project Name:</span>
              <span className="font-bold text-slate-800">Saturday Vibes</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Tagline:</span>
              <span className="font-bold text-slate-800">Your Saturday. Your Vibe.</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Framework:</span>
              <span className="font-bold text-slate-800">Design Thinking (7 Stages)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 font-medium">Academic Year:</span>
              <span className="font-bold text-slate-800">2025 – 2026</span>
            </div>
          </div>
        </div>

        {/* Student / Team Information (Editable) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Student & Team Credentials</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Student Name:</span>
              <span className="font-bold text-slate-800">Meera S. & Capstone Team</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Roll No / ID:</span>
              <span className="font-bold text-slate-800">[Editable: 21BCE0482]</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Department:</span>
              <span className="font-bold text-slate-800">Department of Digital Engineering</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Faculty Guide:</span>
              <span className="font-bold text-slate-800">[Prof. Dr. Faculty Mentor]</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 font-medium">Lab Status:</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Completed Prototype
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Technical Architecture Specs */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-purple-700 font-bold text-sm uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Technical Architecture & Client-Side Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-black text-slate-900 block mb-1">React 19 + Vite</span>
            <p className="text-slate-500 text-[11px]">Lightning fast modular component architecture.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-black text-slate-900 block mb-1">Tailwind CSS v4</span>
            <p className="text-slate-500 text-[11px]">Modern utility styling, responsive grid, glassmorphism.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-black text-slate-900 block mb-1">LocalStorage Sync</span>
            <p className="text-slate-500 text-[11px]">Zero backend dependency; persists joined events & created items across refreshes.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-black text-slate-900 block mb-1">Interactive Scoring</span>
            <p className="text-slate-500 text-[11px]">Dynamic matching algorithm for 5-question personalization questionnaire.</p>
          </div>
        </div>
      </div>

      {/* Prototype Reset / Viva Demo Management */}
      <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-amber-950 text-sm">Viva Demonstration Controls</h4>
          <p className="text-xs text-amber-800">
            Need to demonstrate the user flow from an empty or clean state for professors/evaluators?
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

    </div>
  );
}
