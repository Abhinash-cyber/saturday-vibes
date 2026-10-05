import React, { useState } from 'react';
import { 
  Users, 
  HelpCircle, 
  Lightbulb, 
  Target, 
  Smartphone, 
  FlaskConical, 
  Sparkles, 
  ChevronRight,
  ArrowDown
} from 'lucide-react';

const STAGES = [
  {
    step: "01",
    name: "Empathize",
    tagline: "Understanding the student experience deeply",
    icon: Users,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50 border-rose-200 text-rose-800",
    keyItem: "Persona Meera (21, Final Year)",
    summary: "Conducted empathy interviews and observations with weekend students. Discovered that students don't hate campus, but are mentally exhausted after weekday coursework and find traditional Saturday events unappealing, repetitive, and inflexible."
  },
  {
    step: "02",
    name: "Define",
    tagline: "Framing the core design challenge",
    icon: HelpCircle,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 border-amber-200 text-amber-800",
    keyItem: "How Might We (HMW)",
    summary: "Framed the core Problem Statement & How Might We: 'How might we redesign Saturday activities to be engaging, inclusive, flexible, personalized, and something students genuinely look forward to?'"
  },
  {
    step: "03",
    name: "Diverge",
    tagline: "Brainstorming wide without judgment",
    icon: Lightbulb,
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50 border-yellow-200 text-yellow-800",
    keyItem: "10 Brainstormed Ideas",
    summary: "Generated 10 wide-ranging concepts including Interest-Based Tracks, Student-Led Hosting, Buddy Attendance Mode, Low-Pressure Chill Zones, Peer Skill Swaps, Food Fests, and Saturday Rewards."
  },
  {
    step: "04",
    name: "Converge",
    tagline: "Applying criteria & selecting the champion solution",
    icon: Target,
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50 border-indigo-200 text-indigo-800",
    keyItem: "Evaluation Decision Matrix",
    summary: "Evaluated ideas against Student Interest, Feasibility, Inclusiveness, Flexibility, Engagement, and Ease. Selected the 'Personalized Saturday Activity Hub' combining interest matching, flexible hours, student hosting, and buddy connection."
  },
  {
    step: "05",
    name: "Prototype",
    tagline: "From sketches to interactive digital experience",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50 border-blue-200 text-blue-800",
    keyItem: "Low-Fi → Digital → React App",
    summary: "Iterated from paper wireframes to digital mockups to this fully functional, responsive React prototype with real local state persistence, dynamic quiz filtering, and student event creation."
  },
  {
    step: "06",
    name: "Test",
    tagline: "Usability testing with campus students",
    icon: FlaskConical,
    color: "from-teal-500 to-emerald-600",
    bgColor: "bg-teal-50 border-teal-200 text-teal-800",
    keyItem: "6 Usability Questions & Insights",
    summary: "Tested with representative students. Over 94% successfully personalized their weekend in under 30 seconds. Key feedback led to adding the 1-click Buddy Invite feature and Mood-based filters."
  },
  {
    step: "07",
    name: "Final Solution",
    tagline: "Saturday Vibes: Your Saturday. Your Vibe.",
    icon: Sparkles,
    color: "from-purple-600 to-rose-600",
    bgColor: "bg-purple-50 border-purple-200 text-purple-800",
    keyItem: "Saturday Vibes Platform",
    summary: "A student-centric digital ecosystem that empowers students to discover, personalize, connect, host, and genuinely enjoy their weekend campus life."
  }
];

export default function ProcessTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="space-y-8">
      {/* Visual Step Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {STAGES.map((s, idx) => {
          const Icon = s.icon;
          const isSelected = activeStage === idx;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25 scale-[1.03]'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                  STAGE {s.step}
                </span>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs font-black tracking-tight">{s.name}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wider">
              Step {STAGES[activeStage].step} of 07
            </span>
            <span className="text-xs font-bold text-slate-500">
              {STAGES[activeStage].keyItem}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {STAGES[activeStage].name}: {STAGES[activeStage].tagline}
          </h3>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {STAGES[activeStage].summary}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              disabled={activeStage === 0}
              onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Previous Stage
            </button>
            <button
              disabled={activeStage === STAGES.length - 1}
              onClick={() => setActiveStage(prev => Math.min(STAGES.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
