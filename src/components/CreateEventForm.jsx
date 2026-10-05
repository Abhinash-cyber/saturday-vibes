import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/initialEvents';
import { 
  PlusCircle, 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Mail, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function CreateEventForm() {
  const { createNewEvent, setActiveTab, currentUser } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Art',
    description: '',
    date: 'Upcoming Saturday',
    time: '11:00 AM',
    location: '',
    duration: '2 hours',
    maxParticipants: 20,
    organizerName: currentUser?.name || '',
    organizerContact: currentUser?.email || '',
    mode: 'Indoor',
    whatToBring: '',
    moods: ['Creative', 'Social']
  });

  React.useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        organizerName: prev.organizerName || currentUser.name,
        organizerContact: prev.organizerContact || currentUser.email
      }));
    }
  }, [currentUser]);

  const [submitted, setSubmitted] = useState(false);
  const [createdTitle, setCreatedTitle] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMoodToggle = (mood) => {
    setFormData(prev => {
      const exists = prev.moods.includes(mood);
      return {
        ...prev,
        moods: exists ? prev.moods.filter(m => m !== mood) : [...prev.moods, mood]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.location.trim() || !formData.organizerName.trim()) {
      alert('Please fill in the required fields: Event Title, Location, and Organizer Name.');
      return;
    }

    createNewEvent(formData);
    setCreatedTitle(formData.title);
    setSubmitted(true);

    // Reset form
    setFormData({
      title: '',
      category: 'Art',
      description: '',
      date: 'Upcoming Saturday',
      time: '11:00 AM',
      location: '',
      duration: '2 hours',
      maxParticipants: 20,
      organizerName: '',
      organizerContact: '',
      mode: 'Indoor',
      whatToBring: '',
      moods: ['Creative', 'Social']
    });
  };

  const allMoods = ['Creative', 'Social', 'Relaxed', 'Energetic', 'Curious', 'Competitive'];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-purple-500/10 border border-rose-200 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Student Empowerment</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Host Your Own Saturday Vibe
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have an idea for a photowalk, acoustic jam, FIFA tournament, or coding hangout? 
          Publish it instantly without campus red-tape. Your event appears directly on the Discover page, and you earn <strong className="text-rose-600">+50 Saturday Points</strong>!
        </p>
      </div>

      {/* Success Notification Alert */}
      {submitted && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h3 className="font-extrabold text-base text-emerald-950">
                Event created successfully!
              </h3>
              <p className="text-xs text-emerald-800">
                "{createdTitle}" is now live on the Discover page and automatically added to your Saturday schedule.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('discover')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              View in Discover
            </button>
            <button
              onClick={() => setActiveTab('mysaturday')}
              className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
            >
              See My Schedule
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-medium text-emerald-700 underline cursor-pointer ml-auto"
            >
              Create another
            </button>
          </div>
        </div>
      )}

      {/* The Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Event Name *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Sunset Acoustic Jam & Ukulele Circle"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-800"
          />
        </div>

        {/* Category & Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-rose-500 text-sm font-semibold text-slate-800 bg-white"
            >
              {CATEGORIES_LIST.filter(c => c.id !== 'All').map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Activity Setting / Mode *
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-rose-500 text-sm font-semibold text-slate-800 bg-white"
            >
              <option value="Indoor">🛋️ Indoor (Lounge, Lab, Hall)</option>
              <option value="Outdoor">🌳 Outdoor (Lawns, Amphitheatre, Courts)</option>
              <option value="Online">💻 Online / Hybrid Stream</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="What is this activity about? What will students do, experience, or enjoy?"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-rose-500 text-sm font-medium text-slate-800"
          />
        </div>

        {/* Date, Time, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Date
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Start Time *
            </label>
            <input
              type="text"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g. 03:00 PM"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Duration
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white"
            >
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
              <option value="2.5 hours">2.5 hours</option>
              <option value="3 hours">3 hours</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Location & Max Participants */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Location / Meeting Spot *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Central Library Gazebo or Student Center 204"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Max Capacity
            </label>
            <input
              type="number"
              name="maxParticipants"
              min="2"
              max="150"
              value={formData.maxParticipants}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
            />
          </div>
        </div>

        {/* Organizer Name & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Your Name (Organizer) *
            </label>
            <input
              type="text"
              name="organizerName"
              required
              value={formData.organizerName}
              onChange={handleChange}
              placeholder="e.g. Meera S."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Contact / Campus Email
            </label>
            <input
              type="email"
              name="organizerContact"
              value={formData.organizerContact}
              onChange={handleChange}
              placeholder="meera.cs@campus.edu"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
            />
          </div>
        </div>

        {/* What to Bring */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            What Should Attendees Bring?
          </label>
          <input
            type="text"
            name="whatToBring"
            value={formData.whatToBring}
            onChange={handleChange}
            placeholder="e.g. Acoustic guitar, comfortable sneakers, sketchpad (optional)"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800"
          />
        </div>

        {/* Mood Tags Multi-selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Select Vibes & Mood Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {allMoods.map((m) => {
              const active = formData.moods.includes(m);
              return (
                <button
                  type="button"
                  key={m}
                  onClick={() => handleMoodToggle(m)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  #{m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-base shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create Event (+50 Points)</span>
          </button>
        </div>

      </form>
    </div>
  );
}
