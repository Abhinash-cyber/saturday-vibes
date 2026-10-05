import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_BUDDIES } from '../data/buddiesData';
import { X, HeartHandshake, Check, Send, Sparkles, UserPlus } from 'lucide-react';

export default function BuddyModal() {
  const { buddyModalEvent, setBuddyModalEvent, sendBuddyInvite } = useApp();
  const [invitedMap, setInvitedMap] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setBuddyModalEvent(null);
    };
    if (buddyModalEvent) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [buddyModalEvent, setBuddyModalEvent]);

  if (!buddyModalEvent) return null;

  const handleInvite = (buddy) => {
    sendBuddyInvite(buddy, buddyModalEvent);
    setInvitedMap(prev => ({ ...prev, [buddy.id]: true }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setBuddyModalEvent(null)}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Buddy Mode: Find Your People</h3>
              <p className="text-xs text-slate-500">
                For: <span className="font-semibold text-rose-600">{buddyModalEvent.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setBuddyModalEvent(null)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Never attend alone! Invite classmates with matching vibes to head out together and earn +15 Saturday Points.
            </span>
          </div>

          <div className="space-y-3">
            {DEMO_BUDDIES.map((buddy) => {
              const isInvited = !!invitedMap[buddy.id];
              return (
                <div 
                  key={buddy.id}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-rose-200 hover:shadow-xs transition-all bg-white flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={buddy.avatar} 
                      alt={buddy.name} 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{buddy.name}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {buddy.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{buddy.department}</p>
                      <p className="text-[11px] text-rose-600 font-medium italic mt-1">
                        "{buddy.status}"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInvite(buddy)}
                    disabled={isInvited}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isInvited
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs active:scale-95'
                    }`}
                  >
                    {isInvited ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Invited!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Invite</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setBuddyModalEvent(null)}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
