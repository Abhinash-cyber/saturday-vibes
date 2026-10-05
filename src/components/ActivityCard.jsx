import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  Check, 
  Share2, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export default function ActivityCard({ event, showMatchScore = false }) {
  const { 
    joinedIds, 
    toggleJoinEvent, 
    setSelectedEvent, 
    setBuddyModalEvent 
  } = useApp();

  const isJoined = joinedIds.includes(event.id);
  const currentParticipants = event.participants + (isJoined && !event.isStudentLed ? 1 : 0);
  const isFull = currentParticipants >= event.maxParticipants;

  return (
    <div 
      className={`group relative bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
        isJoined 
          ? 'border-emerald-400 ring-2 ring-emerald-400/20 shadow-md shadow-emerald-500/10' 
          : 'border-slate-200/90 hover:border-rose-300 shadow-xs'
      }`}
    >
      {/* Top Banner & Badges */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          
          {/* Category Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <span>{event.categoryIcon}</span>
            <span>{event.category}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Mode badge */}
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              event.mode === 'Outdoor' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}>
              {event.mode}
            </span>

            {/* Student-led badge */}
            {event.isStudentLed && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                ⭐ Student-Led
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => setSelectedEvent(event)}
          className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors cursor-pointer line-clamp-1"
        >
          {event.title}
        </h3>

        {/* Short description */}
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Match score badge if inside Personalize */}
        {showMatchScore && event.matchScore > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>High Vibe Match ({event.matchScore} pts)</span>
          </div>
        )}

        {/* Mood Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {event.moods?.map((m) => (
            <span 
              key={m} 
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
            >
              #{m}
            </span>
          ))}
        </div>
      </div>

      {/* Meta Specs: Time, Location, Attendance */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{event.time}</span>
            <span className="text-slate-400">•</span>
            <span>{event.duration}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{currentParticipants}/{event.maxParticipants}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 pt-3 border-t border-slate-100 bg-white flex items-center gap-2">
        
        {/* Join / Joined Button */}
        <button
          onClick={() => toggleJoinEvent(event.id)}
          className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
            isJoined
              ? 'bg-emerald-600 text-white shadow-emerald-500/25 hover:bg-emerald-700'
              : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25'
          }`}
        >
          {isJoined ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>✓ Joined</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Event</span>
            </>
          )}
        </button>

        {/* View Details modal button */}
        <button
          onClick={() => setSelectedEvent(event)}
          className="p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          title="View Event Details"
          aria-label="View Details"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Invite Friend button */}
        <button
          onClick={() => setBuddyModalEvent(event)}
          className="p-2.5 rounded-2xl border border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 text-slate-600 transition-colors cursor-pointer"
          title="Invite a Campus Buddy"
          aria-label="Invite Buddy"
        >
          <UserCheck className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
