import React from 'react';
import { useApp } from '../context/AppContext';
import ActivityCard from '../components/ActivityCard';
import { 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Calendar, 
  Users, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Presentation,
  Flame,
  Award
} from 'lucide-react';

export default function HomeView() {
  const { events, setActiveTab, setPresentationMode } = useApp();

  const featuredEvents = events.slice(0, 3);

  const heroCategories = [
    { title: "Music", icon: "🎵", color: "from-purple-500 to-indigo-600", desc: "Acoustic jams & open mics" },
    { title: "Sports", icon: "⚽", color: "from-emerald-500 to-teal-600", desc: "3v3 hoops & fitness runs" },
    { title: "Gaming", icon: "🎮", color: "from-violet-600 to-purple-700", desc: "FC25 & Smash Bros arenas" },
    { title: "Art", icon: "🎨", color: "from-pink-500 to-rose-600", desc: "Canvas jams & clay workshops" },
    { title: "Tech", icon: "💻", color: "from-blue-500 to-cyan-600", desc: "AI micro-sprints & code labs" },
    { title: "Food", icon: "🍕", color: "from-amber-500 to-orange-600", desc: "Popups & student taste fest" },
    { title: "Movies", icon: "🎬", color: "from-rose-600 to-red-700", desc: "Ghibli screenings & trivia" },
    { title: "Chill", icon: "🧘", color: "from-teal-500 to-emerald-600", desc: "Quiet books & rooftop coffee" }
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* 01. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/15 to-purple-600/15 border border-rose-200/80 p-6 sm:p-12 lg:p-16 text-center sm:text-left">
        <div className="max-w-3xl space-y-6 relative z-10">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold tracking-wide shadow-sm shadow-rose-500/20">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Digital Engineering Lab Capstone</span>
          </div>

          {/* Main Hero Header */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
            Make Your Saturday <span className="bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 bg-clip-text text-transparent">Count.</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-600 text-base sm:text-xl font-medium leading-relaxed max-w-2xl">
            Discover campus activities that match your interests, mood, and vibe.
          </p>

          <p className="text-xs sm:text-sm text-slate-500">
            "Saturday Vibes turns ordinary campus Saturdays into personalized experiences."
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('personalize')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-black text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Saturday</span>
            </button>

            <button
              onClick={() => setActiveTab('discover')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-rose-500" />
              <span>Explore Activities</span>
            </button>

            <button
              onClick={() => setActiveTab('process')}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Our Design Thinking Process</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Decorative Floating Sparkle */}
        <div className="absolute -right-12 -bottom-12 opacity-15 pointer-events-none text-9xl">
          🎨
        </div>
      </section>

      {/* 02. STATS BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { stat: "50+", label: "Activities Hosted", desc: "Across diverse campus clubs", icon: "🎉" },
          { stat: "8+", label: "Interest Categories", desc: "Arts, Tech, Esports & Chill", icon: "✨" },
          { stat: "100%", label: "Student-Led Events", desc: "Zero red tape proposal", icon: "🚀" },
          { stat: "Flexible", label: "Choices & Hours", desc: "No compulsory attendance", icon: "⏱️" }
        ].map((s, idx) => (
          <div 
            key={idx} 
            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
          >
            <span className="text-2xl mb-1 block">{s.icon}</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{s.stat}</p>
            <p className="text-xs font-bold text-slate-700 mt-0.5">{s.label}</p>
            <p className="text-[11px] text-slate-400 mt-1">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* 03. CATEGORY INSPIRATION CARDS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Explore by Interest</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Whatever You're Into, We Got You
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('discover')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>See all categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {heroCategories.map((cat, i) => (
            <div
              key={i}
              onClick={() => setActiveTab('discover')}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-slate-300 group-hover:text-rose-500 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04. VISUAL STORY SECTION (Section 33) */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-300">
            The Saturday Vibes Story
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Why Reimagining Saturdays Matters
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            How a design-thinking intervention solved weekend campus absenteeism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: "01",
              title: "THE PROBLEM",
              color: "text-rose-400",
              desc: "“Saturday campus activities are often repetitive and don't match what students actually want.”"
            },
            {
              step: "02",
              title: "THE INSIGHT",
              color: "text-amber-400",
              desc: "“Students don't dislike campus. They dislike activities that don't fit their interests, mood, time, or social preferences.”"
            },
            {
              step: "03",
              title: "THE OPPORTUNITY",
              color: "text-cyan-400",
              desc: "“Give students autonomy and genuine choice over how they recharge their weekend.”"
            },
            {
              step: "04",
              title: "THE SOLUTION",
              color: "text-purple-400",
              desc: "“Saturday Vibes: A student-centric personalization and discovery hub.”"
            },
            {
              step: "05",
              title: "THE RESULT",
              color: "text-emerald-400",
              desc: "“A personalized Saturday experience that students genuinely look forward to attending.”"
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 relative"
            >
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                STEP {item.step}
              </span>
              <h3 className={`font-black text-xs uppercase tracking-wider ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 05. TRENDING ACTIVITIES SPOTLIGHT */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Happening This Weekend</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trending Campus Vibes
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Explore All 15+ Activities
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((evt) => (
            <ActivityCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* 06. CAPSTONE VIVA BANNER */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-500/30">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
            For Examiners & Project Review
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            Digital Engineering Lab Project Presentation
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
            Want to review the complete human-centered engineering flow from Empathy to Usability Testing?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPresentationMode(true)}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Presentation className="w-4 h-4" />
            <span>Launch Presentation Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('process')}
            className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors cursor-pointer"
          >
            Read Our Process
          </button>
        </div>
      </section>

    </div>
  );
}
