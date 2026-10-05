import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import EventModal from './components/EventModal';
import BuddyModal from './components/BuddyModal';
import PresentationMode from './components/PresentationMode';

// Views
import HomeView from './views/HomeView';
import DiscoverView from './views/DiscoverView';
import RecommendationQuiz from './components/RecommendationQuiz';
import CreateEventForm from './components/CreateEventForm';
import MySaturday from './components/MySaturday';
import AboutProjectView from './views/AboutProjectView';
import AuthView from './views/AuthView';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Top Fixed / Sticky Navigation */}
      <Navbar />

      {/* Main Dynamic View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'discover' && <DiscoverView />}
        {activeTab === 'personalize' && <RecommendationQuiz />}
        {activeTab === 'events' && <DiscoverView />}
        {activeTab === 'create' && <CreateEventForm />}
        {activeTab === 'mysaturday' && <MySaturday />}
        {activeTab === 'about' && <AboutProjectView />}
        {activeTab === 'auth' && <AuthView />}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <EventModal />
      <BuddyModal />
      <Toast />
      <PresentationMode />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
