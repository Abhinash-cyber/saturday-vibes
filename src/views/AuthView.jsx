import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
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
  ShieldCheck
} from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Visual Communication & Design',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Media, Arts & Literature',
  'Business Administration',
  'Architecture & Planning'
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

  // If already logged in, show student profile card
  if (currentUser) {
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white/30 shadow-lg shrink-0 bg-white"
              />
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-black">{currentUser.name}</h2>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20">
                    {currentUser.year || 'Student'}
                  </span>
                </div>
                <p className="text-xs text-rose-100 font-medium">{currentUser.email}</p>
                <p className="text-xs text-rose-200">
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

  // Logged-out state: Show Login & Sign Up Forms
  return (
    <div className="max-w-xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg text-2xl">
          ✨
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Welcome to Saturday Vibes
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto">
          Log in with your campus credentials to personalize your weekend, match with buddies, and host student events.
        </p>
      </div>

      {/* Mode Switch Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center max-w-md mx-auto">
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

      {/* Quick Demo Logins Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Quick 1-Click Demo Logins (For Lab Evaluators):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
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
        <form onSubmit={handleLoginSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500">Enter your campus email or use one of the demo accounts above.</p>
          </div>

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
                placeholder="meera.cs@campus.edu"
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

          <p className="text-center text-xs text-slate-500">
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
        <form onSubmit={handleSignupSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Create Student Profile</h2>
            <p className="text-xs text-slate-500">Join the campus hub and earn +25 welcome points instantly.</p>
          </div>

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
                  placeholder="e.g. 21BCE0482"
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
                placeholder="meera.cs@campus.edu"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
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
  );
}
