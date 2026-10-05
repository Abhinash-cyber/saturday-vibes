import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trash2, 
  Plus, 
  Sparkles, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Share2, 
  CalendarDays,
  Compass,
  Trophy
} from 'lucide-react';

export default function MySaturday() {
  const { 
    events, 
    joinedIds, 
    toggleJoinEvent, 
    setSelectedEvent, 
    setBuddyModalEvent,
    setActiveTab, 
    points, 
    badges,
    currentUser
  } = useApp();

  // Filter joined events and sort chronologically by rawHour
  const joinedEvents = events
    .filter(e => joinedIds.includes(e.id))
    .sort((a, b) => (a.rawHour || 0) - (b.rawHour || 0));

  const totalCommittedHours = joinedEvents.reduce(
    (acc, curr) => acc + (curr.durationHours || 2), 0
  );

  return (
    <div className="space-y-10">
      
      {/* Top Banner & Stats Overview */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-rose-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{currentUser ? `${currentUser.name} (${currentUser.rollNo})` : 'Personalized Weekend Dashboard'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {currentUser ? `${currentUser.name.split(' ')[0]}'s Saturday Schedule` : 'My Saturday Schedule'}
            </h2>
            <p className="mt-1 text-slate-300 text-sm max-w-xl">
              Here is your custom-curated Saturday itinerary. Enjoy activities at your own pace without pressure.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 text-center">
              <span className="text-xs text-rose-200 font-medium block">Activities</span>
              <span className="text-2xl font-black text-white">{joinedEvents.length}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 text-center">
              <span className="text-xs text-amber-200 font-medium block">Time Booked</span>
              <span className="text-2xl font-black text-white">{totalCommittedHours} hrs</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 text-center">
              <span className="text-xs text-emerald-200 font-medium block">Points</span>
              <span className="text-2xl font-black text-amber-300">{points}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SCHEDULE TIMELINE & EMPTY STATE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-500" />
            <span>Saturday Timeline</span>
          </h3>

          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Activity</span>
          </button>
        </div>

        {/* Empty State */}
        {joinedEvents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center text-3xl">
              ✨
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="text-2xl font-black text-slate-900">Your Saturday is empty.</h4>
              <p className="mt-2 text-slate-500 text-sm">
                Let's find your vibe! Explore dozens of student-led and interest-based campus experiences.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setActiveTab('personalize')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Find My Saturday</span>
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Activities</span>
              </button>
            </div>
          </div>
        ) : (
          /* Timeline of Scheduled Activities */
          <div className="relative border-l-2 border-rose-200 ml-4 sm:ml-8 space-y-8 py-2">
            {joinedEvents.map((evt, idx) => (
              <div key={evt.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />

                {/* Card Container */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  
                  {/* Left: Time & Core Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 font-black text-xs border border-rose-200">
                        {evt.time}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                        {evt.duration}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {evt.categoryIcon} {evt.category}
                      </span>
                      {evt.isStudentLed && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          ⭐ Student-Led
                        </span>
                      )}
                    </div>

                    <h4 
                      onClick={() => setSelectedEvent(evt)}
                      className="text-lg sm:text-xl font-bold text-slate-900 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      {evt.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {evt.location}
                      </span>
                      <span>Organized by: <strong className="text-slate-700">{evt.organizer}</strong></span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end">
                    
                    <button
                      onClick={() => setBuddyModalEvent(evt)}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Invite a friend"
                    >
                      <Share2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Invite</span>
                    </button>

                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => toggleJoinEvent(evt.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Remove activity from schedule"
                      aria-label="Remove activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* REWARDS & BADGES SECTION (Section 16) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-slate-900">Saturday Rewards & Badges</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Earn points for joining events (+30 pts), inviting buddies (+15 pts), or creating student events (+50 pts).
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <Award className="w-5 h-5 text-amber-600" />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Total Balance</span>
              <span className="text-lg font-black">{points} Points</span>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-gradient-to-b from-amber-50 to-orange-50/40 border-amber-300 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <h5 className="font-extrabold text-xs text-slate-900">{b.name}</h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{b.description}</p>
              <span className={`inline-block mt-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                b.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}>
                {b.unlocked ? 'Unlocked ✓' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
