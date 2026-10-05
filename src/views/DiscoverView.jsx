import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/initialEvents';
import ActivityCard from '../components/ActivityCard';
import CategoryCard from '../components/CategoryCard';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Compass, 
  Sparkles, 
  PlusCircle,
  Clock,
  Layers,
  MapPin
} from 'lucide-react';

export default function DiscoverView() {
  const { events, setActiveTab } = useApp();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All');
  const [selectedModeFilter, setSelectedModeFilter] = useState('All');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('All');
  const [selectedParticipationFilter, setSelectedParticipationFilter] = useState('All');

  // Filter Logic
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesDesc = evt.description.toLowerCase().includes(query);
        const matchesLocation = evt.location.toLowerCase().includes(query);
        const matchesOrganizer = evt.organizer.toLowerCase().includes(query);
        const matchesTag = evt.tags?.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesLocation && !matchesOrganizer && !matchesTag) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All' && evt.category !== selectedCategory) {
        return false;
      }

      // 3. Time of Day Filter
      if (selectedTimeFilter !== 'All') {
        const hour = evt.rawHour || 12;
        if (selectedTimeFilter === 'Morning' && hour >= 12) return false;
        if (selectedTimeFilter === 'Afternoon' && (hour < 12 || hour >= 17)) return false;
        if (selectedTimeFilter === 'Evening' && hour < 17) return false;
      }

      // 4. Mode Filter (Indoor / Outdoor / Online)
      if (selectedModeFilter !== 'All') {
        if (evt.mode.toLowerCase() !== selectedModeFilter.toLowerCase()) return false;
      }

      // 5. Mood Filter
      if (selectedMoodFilter !== 'All') {
        if (!evt.moods?.includes(selectedMoodFilter)) return false;
      }

      // 6. Participation Filter
      if (selectedParticipationFilter !== 'All') {
        if (evt.participationType !== selectedParticipationFilter) return false;
      }

      return true;
    });
  }, [
    events, 
    searchTerm, 
    selectedCategory, 
    selectedTimeFilter, 
    selectedModeFilter, 
    selectedMoodFilter, 
    selectedParticipationFilter
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTimeFilter('All');
    setSelectedModeFilter('All');
    setSelectedMoodFilter('All');
    setSelectedParticipationFilter('All');
  };

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategory !== 'All' || 
    selectedTimeFilter !== 'All' || 
    selectedModeFilter !== 'All' || 
    selectedMoodFilter !== 'All' || 
    selectedParticipationFilter !== 'All';

  return (
    <div className="space-y-8 py-4">
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Activity Explorer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Discover Campus Saturdays
          </h1>
          <p className="mt-1 text-slate-500 text-xs sm:text-sm">
            Browse through {events.length} student-led sessions, chill workshops, tournaments, and creative jams.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create')}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Host Your Own Event</span>
        </button>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Category
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Search & Multi-Filter Controls Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event name, hobby, location, tags, or student organizer..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium text-slate-800"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Granular Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
          
          {/* Time Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Time of Day
            </label>
            <select
              value={selectedTimeFilter}
              onChange={(e) => setSelectedTimeFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:border-rose-500 focus:outline-hidden"
            >
              <option value="All">All Times</option>
              <option value="Morning">Morning (Before 12 PM)</option>
              <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="Evening">Evening (5 PM onwards)</option>
            </select>
          </div>

          {/* Setting / Mode Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Indoor / Outdoor
            </label>
            <select
              value={selectedModeFilter}
              onChange={(e) => setSelectedModeFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:border-rose-500 focus:outline-hidden"
            >
              <option value="All">All Modes</option>
              <option value="Indoor">Indoor Only</option>
              <option value="Outdoor">Outdoor Only</option>
              <option value="Online">Online / Hybrid</option>
            </select>
          </div>

          {/* Mood Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Vibe / Mood
            </label>
            <select
              value={selectedMoodFilter}
              onChange={(e) => setSelectedMoodFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:border-rose-500 focus:outline-hidden"
            >
              <option value="All">All Moods</option>
              <option value="Creative">Creative</option>
              <option value="Social">Social</option>
              <option value="Relaxed">Relaxed</option>
              <option value="Energetic">Energetic</option>
              <option value="Curious">Curious</option>
              <option value="Competitive">Competitive</option>
            </select>
          </div>

          {/* Participation Style */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Participation Style
            </label>
            <select
              value={selectedParticipationFilter}
              onChange={(e) => setSelectedParticipationFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:border-rose-500 focus:outline-hidden"
            >
              <option value="All">Any Style</option>
              <option value="Alone">Solo / Chill</option>
              <option value="With Friends">With Friends</option>
              <option value="Meet New People">Meet New People</option>
            </select>
          </div>

        </div>

        {/* Filter Summary & Reset Pill */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filteredEvents.length}</strong> matching activities
            </span>
            <button
              onClick={handleResetFilters}
              className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Activities Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4">
          <span className="text-4xl block">🔍</span>
          <h3 className="text-xl font-bold text-slate-900">No activities match your filters.</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, broadening your mood selection, or reset all active filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-2xl bg-rose-500 text-white font-bold text-xs shadow-md cursor-pointer hover:bg-rose-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <ActivityCard key={evt.id} event={evt} />
          ))}
        </div>
      )}

    </div>
  );
}
