import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Compass, 
  CalendarCheck, 
  PlusCircle, 
  Award, 
  Menu, 
  X, 
  Info,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    joinedIds, 
    points, 
    currentUser, 
    logoutUser 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Note: "Our Process" removed per user request
  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'personalize', label: 'Find My Saturday', icon: Sparkles, badge: 'Quiz' },
    { id: 'create', label: 'Create Event', icon: PlusCircle },
    { 
      id: 'mysaturday', 
      label: 'My Saturday', 
      icon: CalendarCheck, 
      count: joinedIds.length 
    },
    { id: 'about', label: 'About', icon: Info }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-purple-900 to-rose-600 bg-clip-text text-transparent">
                  Saturday Vibes
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Capstone
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-0.5 hidden sm:block">
                Your Saturday. Your Vibe.
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>

                  {/* Joined count pill */}
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {/* Special Badge */}
                  {item.badge && (
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Points + Auth / Profile + CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Gamification Points pill */}
            <div 
              onClick={() => handleNavClick('mysaturday')}
              title="Your Saturday Points & Badges"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold shadow-xs cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>{points} pts</span>
            </div>

            {/* Login / Student Profile Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all cursor-pointer ${
                    activeTab === 'auth'
                      ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                  title="View Student Profile"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-rose-300"
                  />
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        {currentUser.rollNo}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavClick('auth')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Manage Profile & Switch</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('mysaturday')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <CalendarCheck className="w-4 h-4 text-slate-400" />
                      <span>My Saturday Itinerary</span>
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Log In / Sign Up</span>
              </button>
            )}

            {/* Quick CTA */}
            <button
              onClick={() => handleNavClick('personalize')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white text-xs font-bold shadow-sm shadow-rose-500/20 hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find My Vibe</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>{points}</span>
            </div>

            <button
              onClick={() => handleNavClick('auth')}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              title="Student Account"
            >
              {currentUser ? (
                <img src={currentUser.avatar} alt="User" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-1">
          
          {/* User Status Bar in Mobile Menu */}
          <div className="p-3 mb-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <img src={currentUser.avatar} alt="User" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Not logged in</span>
              </div>
            )}

            {currentUser ? (
              <button
                onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="px-3 py-1 rounded-xl bg-rose-500 text-white text-xs font-bold"
              >
                Log In
              </button>
            )}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.count} scheduled
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 space-y-2">
            <button
              onClick={() => handleNavClick('auth')}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>{currentUser ? 'Manage Student Profile' : 'Student Login / Sign Up'}</span>
            </button>

            <button
              onClick={() => handleNavClick('personalize')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-sm font-bold shadow-md text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Find My Saturday Quiz</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
