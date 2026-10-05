import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Compass, PlusCircle, Lightbulb, GraduationCap, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-rose-600 bg-clip-text text-transparent">
                Saturday Vibes
              </span>
            </div>

            <p className="text-sm font-semibold text-rose-600">
              "Your Saturday. Your Vibe."
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Discover, personalize, and participate in Saturday campus activities based on your interests, mood, availability, and preferred social experience.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span>Digital Engineering Lab Capstone Project</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('discover')}
                  className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Discover Activities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('personalize')}
                  className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Find My Saturday (Quiz)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('create')}
                  className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Create Student Event
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mysaturday')}
                  className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  My Saturday Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('process')}
                  className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Our Process (Design Thinking)
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Student Credits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Project & Student Info
            </h4>
            <div className="text-xs text-slate-500 space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <p><strong className="text-slate-700">Project:</strong> Digital Engineering Capstone</p>
              <p><strong className="text-slate-700">Student:</strong> Meera S. [Editable Placeholder]</p>
              <p><strong className="text-slate-700">Branch:</strong> Digital Engineering & CS</p>
              <p><strong className="text-slate-700">Mentor:</strong> Faculty Guide [Editable]</p>
              <p><strong className="text-slate-700">Status:</strong> Prototype v1.0.0 (Functional)</p>
            </div>

            <button
              onClick={scrollToTop}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Saturday Vibes. All campus activities & rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for College Saturdays
          </p>
        </div>
      </div>
    </footer>
  );
}
