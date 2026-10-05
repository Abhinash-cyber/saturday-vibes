import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_BUDDIES } from '../data/buddiesData';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  Luggage, 
  Mail, 
  HeartHandshake,
  Tag
} from 'lucide-react';

export default function EventModal() {
  const { 
    selectedEvent, 
    setSelectedEvent, 
    joinedIds, 
    toggleJoinEvent, 
    setBuddyModalEvent,
    sendBuddyInvite,
    setActiveTab
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    if (selectedEvent) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedEvent, setSelectedEvent]);

  if (!selectedEvent) return null;

  const isJoined = joinedIds.includes(selectedEvent.id);
  const currentParticipants = selectedEvent.participants + (isJoined && !selectedEvent.isStudentLed ? 1 : 0);
  const availableSeats = Math.max(0, selectedEvent.maxParticipants - currentParticipants);

  // Relevant demo buddies for this category
  const interestedBuddies = DEMO_BUDDIES.filter(b => 
    b.favoriteCategories.includes(selectedEvent.category) || Math.random() > 0.6
  ).slice(0, 3);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setSelectedEvent(null)}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedEvent.categoryIcon}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              {selectedEvent.category}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {selectedEvent.mode}
            </span>
          </div>

          <button
            onClick={() => setSelectedEvent(null)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {selectedEvent.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Organized by:</span>
              <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-slate-700 font-medium">
                {selectedEvent.organizer}
              </span>
              {selectedEvent.organizerContact && (
                <span className="text-slate-400 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {selectedEvent.organizerContact}
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-rose-500" /> Time & Day
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800">{selectedEvent.time}</p>
              <p className="text-[11px] text-slate-500">{selectedEvent.date}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" /> Duration
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800">{selectedEvent.duration}</p>
              <p className="text-[11px] text-slate-500">Flexible window</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-500" /> Attendance
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                {currentParticipants} / {selectedEvent.maxParticipants}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">
                {availableSeats > 0 ? `${availableSeats} seats left` : 'Waitlist only'}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Level
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800">{selectedEvent.difficulty}</p>
              <p className="text-[11px] text-slate-500">Zero pressure</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-900 text-xs sm:text-sm">
            <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Location & Meeting Point: </span>
              <span>{selectedEvent.location}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              About This Experience
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          {/* What to Bring */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
            <Luggage className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-1">
                What to Bring
              </h5>
              <p className="text-xs text-indigo-900 leading-normal">
                {selectedEvent.whatToBring}
              </p>
            </div>
          </div>

          {/* Mood Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Activity Vibes & Moods
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedEvent.moods?.map(m => (
                <span key={m} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                  ✨ {m}
                </span>
              ))}
              {selectedEvent.tags?.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 text-xs font-medium">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Buddy Mode Section: Students Interested in This Activity */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Campus Buddies Interested in This
                </h4>
              </div>
              <button 
                onClick={() => setBuddyModalEvent(selectedEvent)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
              >
                Find More +
              </button>
            </div>

            <div className="space-y-2.5">
              {interestedBuddies.map((buddy) => (
                <div 
                  key={buddy.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={buddy.avatar} 
                      alt={buddy.name} 
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-200"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{buddy.name}</p>
                      <p className="text-[11px] text-slate-400">{buddy.department}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => sendBuddyInvite(buddy, selectedEvent)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition-colors cursor-pointer border border-rose-200 flex items-center gap-1 active:scale-95"
                  >
                    <span>Invite</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          
          <button
            onClick={() => toggleJoinEvent(selectedEvent.id)}
            className={`w-full sm:flex-1 py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              isJoined
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
            }`}
          >
            {isJoined ? (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>✓ Joined (In My Saturday)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Join Event</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (!isJoined) toggleJoinEvent(selectedEvent.id);
              setSelectedEvent(null);
              setActiveTab('mysaturday');
            }}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl font-bold text-xs border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer text-center"
          >
            View in My Saturday
          </button>

          <button
            onClick={() => setBuddyModalEvent(selectedEvent)}
            className="w-full sm:w-auto py-3 px-4 rounded-2xl font-bold text-xs bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            title="Invite friends"
          >
            <Share2 className="w-4 h-4 text-amber-600" />
            <span>Invite Friend</span>
          </button>

        </div>
      </div>
    </div>
  );
}
