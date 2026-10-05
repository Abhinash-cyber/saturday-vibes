import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import mvgrCampusImg from '../assets/mvgr-campus.png';
import { 
  Sparkles, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  IdCard, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  LogOut, 
  Award, 
  CalendarCheck,
  Heart,
  ShieldCheck,
  Building2,
  MapPin,
  Compass
} from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Visual Communication & Design',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Media, Arts & Literature',
  'Business Administration',
  'Civil Engineering & Architecture'
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Postgraduate'];

const VIBE_INTERESTS = [
  { id: 'Art', label: '🎨 Art & Painting' },
  { id: 'Music', label: '🎵 Music & Jamming' },
  { id: 'Gaming', label: '🎮 Gaming & Esports' },
  { id: 'Technology', label: '💻 Coding & Tech' },
  { id: 'Sports', label: '⚽ Sports & Fitness' },
  { id: 'Movies', label: '🎬 Movies & Cinema' },
  { id: 'Food', label: '🍕 Food & Hangouts' },
  { id: 'Chill', label: '🧘 Chill & Wellness' }
];

export default function AuthView() {
  const { 
    currentUser, 
    loginUser, 
    signupUser, 
    logoutUser, 
    setActiveTab, 
    points, 
    joinedIds 
  } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sign up form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: DEPARTMENTS[0],
    year: 'Final Year',
    password: '',
    confirmPassword: '',
    vibes: ['Art', 'Relaxation']
  });
  const [signupError, setSignupError] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your campus email address.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your account password.');
      return;
    }

    const res = loginUser(loginEmail, loginPassword);
    if (res.success) {
      setActiveTab('home');
    }
  };

  // Handle Quick Demo Login
  const handleQuickLogin = (demoUser) => {
    loginUser(demoUser.email, 'password123');
    setActiveTab('home');
  };

  // Handle Sign Up Submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');

    if (!signupData.name.trim() || !signupData.email.trim() || !signupData.rollNo.trim()) {
      setSignupError('Please fill in all required campus details.');
      return;
    }

    if (!signupData.email.includes('@')) {
      setSignupError('Please enter a valid email address.');
      return;
    }

    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match. Please re-check.');
      return;
    }

    const res = signupUser(signupData);
    if (res.success) {
      setActiveTab('home');
    } else {
      setSignupError(res.message);
    }
  };

  const toggleVibe = (id) => {
    setSignupData(prev => {
      const exists = prev.vibes.includes(id);
      return {
        ...prev,
        vibes: exists ? prev.vibes.filter(v => v !== id) : [...prev.vibes, id]
      };
    });
  };

  // If already logged in, show student profile card with campus header
  if (currentUser) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header Banner Featuring MVGR Campus Image */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={mvgrCampusImg}
              alt="MVGR College of Engineering Campus"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay for high readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
            
            {/* Campus badge overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-black uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>MVGR Autonomous</span>
              </span>
            </div>

            {/* Profile Info Anchored at Bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center sm:items-end gap-4 text-white">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white/80 shadow-2xl bg-white shrink-0"
              />
              <div className="flex-1 text-center sm:text-left space-y-0.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-black text-white">{currentUser.name}</h2>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                    {currentUser.year || 'Student'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium">{currentUser.email}</p>
                <p className="text-xs text-amber-300 font-semibold">
                  {currentUser.department} • <span className="font-mono">{currentUser.rollNo}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Balance</span>
                <span className="text-xl font-black text-amber-900">{points} pts</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[10px] uppercase font-bold text-rose-700 block">Scheduled</span>
                <span className="text-xl font-black text-rose-900">{joinedIds.length} Vibes</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="text-[10px] uppercase font-bold text-purple-700 block">Status</span>
                <span className="text-xl font-black text-purple-900">Active</span>
              </div>
            </div>

            {/* Bio / Preferences */}
            {currentUser.bio && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800 block mb-1">Campus Vibe Bio:</strong>
                "{currentUser.bio}"
              </div>
            )}

            {/* Favorite Vibes Tags */}
            {currentUser.vibes && currentUser.vibes.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  My Preferred Vibes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.vibes.map((v) => (
                    <span key={v} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                      ✨ {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setActiveTab('mysaturday')}
                className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>View My Saturday Schedule</span>
              </button>

              <button
                onClick={logoutUser}
                className="w-full sm:w-auto py-3 px-5 rounded-2xl border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Switch Account Demo Helper */}
        <div className="p-5 rounded-3xl bg-slate-100 border border-slate-200 text-xs space-y-3">
          <span className="font-bold text-slate-700 block">
            Switch Profile (Evaluator & Demo Presets):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => handleQuickLogin(u)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                  currentUser.id === u.id
                    ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                <div className="truncate">
                  <p className="font-bold truncate leading-tight">{u.name}</p>
                  <p className={`text-[10px] truncate ${currentUser.id === u.id ? 'text-rose-100' : 'text-slate-500'}`}>
                    {u.department.split('&')[0]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Logged-out state: Split-Screen Layout featuring MVGR Campus Image
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Main Split Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Featured MVGR Campus Showcase */}
        <div className="lg:col-span-5 relative bg-slate-900 text-white flex flex-col justify-between min-h-[380px] lg:min-h-[640px] overflow-hidden">
          
          {/* Background Campus Entrance Image */}
          <img
            src={mvgrCampusImg}
            alt="MVGR Autonomous Campus Gate"
            className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />

          {/* Gradient Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />

          {/* Top Brand Badges */}
          <div className="relative z-10 p-6 sm:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>MVGR Autonomous</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
              Maharaj Vijayaram Gajapathi Raj College of Engineering
            </h3>
            <p className="text-xs text-rose-200 font-medium">
              Saturday Vibes • Campus Student Portal
            </p>
          </div>

          {/* Bottom Highlights Overlay */}
          <div className="relative z-10 p-6 sm:p-8 bg-slate-950/70 backdrop-blur-md border-t border-white/10 space-y-3">
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "Reimagining Saturdays for our campus students — from monotonous routines into personal discovery, student-hosted jams, and vibrant peer connections."
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-semibold text-rose-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified MVGR Hub</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Student-Led Clubs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Buddy Attendance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Compulsion</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Auth Forms */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-center">
          
          {/* Form Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Authentication</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'Sign in to Saturday Vibes' : 'Create MVGR Student Account'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              {mode === 'login' 
                ? 'Access your scheduled events, points, and peer buddy invitations.' 
                : 'Join the campus platform and get +25 welcome points instantly.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center">
            <button
              onClick={() => { setMode('login'); setLoginError(''); setSignupError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => { setMode('signup'); setLoginError(''); setSignupError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Student Account
            </button>
          </div>

          {/* Quick Demo Logins for Lab Evaluators */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>1-Click Demo Profiles (For Lab Evaluators):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleQuickLogin(demo)}
                  className="p-2 rounded-xl bg-white hover:bg-amber-100/70 border border-amber-200 text-slate-800 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
                >
                  <img src={demo.avatar} alt={demo.name} className="w-6 h-6 rounded-full object-cover" />
                  <div className="text-left truncate">
                    <p className="truncate font-bold leading-tight">{demo.name}</p>
                    <span className="text-[9px] text-amber-700 block">{demo.year}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {loginError}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Campus Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="meera.cs@mvgrce.edu.in"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-xs sm:text-sm font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password hint for demo accounts: "password123" (or enter any password).')}
                    className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-xs sm:text-sm font-medium text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign In to Saturday Vibes</span>
              </button>

              {/* Quick Guest Access */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Or Quick Access</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={() => handleQuickLogin(DEMO_USERS[0])}
                className="w-full py-2.5 rounded-2xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/60 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-rose-500" />
                <span>Explore as Guest (Meera - Student Persona)</span>
              </button>

              <p className="text-center text-xs text-slate-500 pt-1">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Create student account
                </button>
              </p>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              
              {signupError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {signupError}
                </div>
              )}

              {/* Name & Roll No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      placeholder="e.g. Meera Sharma"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Roll No / Student ID *
                  </label>
                  <div className="relative">
                    <IdCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={signupData.rollNo}
                      onChange={(e) => setSignupData({ ...signupData, rollNo: e.target.value })}
                      placeholder="e.g. 21331A05A1"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Campus Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Campus Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    placeholder="student@mvgrce.edu.in"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Department & Academic Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Department / Major *
                  </label>
                  <select
                    value={signupData.department}
                    onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={signupData.year}
                    onChange={(e) => setSignupData({ ...signupData, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Vibe Interests Multi-select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Select Your Weekend Vibes (Interests)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {VIBE_INTERESTS.map((item) => {
                    const active = signupData.vibes.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleVibe(item.id)}
                        className={`p-2 rounded-xl text-[11px] font-bold border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create Account (+25 Welcome Points)</span>
                </button>
              </div>

              <p className="text-center text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
