import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_EVENTS } from '../data/initialEvents';
import { DEMO_USERS } from '../data/usersData';
export { DEMO_USERS };

const AppContext = createContext();

const STORAGE_KEYS = {
  CUSTOM_EVENTS: 'saturday_vibes_custom_events_v1',
  JOINED_IDS: 'saturday_vibes_joined_ids_v1',
  POINTS: 'saturday_vibes_points_v1',
  BADGES: 'saturday_vibes_badges_v1',
  QUIZ_RESULTS: 'saturday_vibes_quiz_results_v1',
  AUTH_USER: 'saturday_vibes_auth_user_v1',
  USERS_DB: 'saturday_vibes_registered_users_v1'
};

const DEFAULT_BADGES = [
  { id: 'first-vibe', name: 'First Vibe', icon: '🌟', description: 'Joined your first campus Saturday activity', unlocked: true },
  { id: 'creative-explorer', name: 'Creative Explorer', icon: '🎨', description: 'Participated in Art, Music, or Photography', unlocked: false },
  { id: 'social-spark', name: 'Social Spark', icon: '🤝', description: 'Used Buddy Mode to invite or join friends', unlocked: false },
  { id: 'weekend-regular', name: 'Weekend Regular', icon: '🔥', description: 'Scheduled 3 or more Saturday activities', unlocked: false },
  { id: 'campus-creator', name: 'Campus Creator', icon: '🚀', description: 'Proposed and created a student-led event', unlocked: false }
];

export function AppProvider({ children }) {
  // Navigation
  const [activeTab, setActiveTab] = useState('home');
  const [presentationMode, setPresentationMode] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default logged in as Meera for prototype showcase
    } catch {
      return DEMO_USERS[0];
    }
  });

  // Registered Users Directory (in localStorage)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS_DB);
      return saved ? JSON.parse(saved) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  // Events: Initial + Custom from LocalStorage
  const [customEvents, setCustomEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_EVENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Joined Events
  const [joinedIds, setJoinedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOINED_IDS);
      return saved ? JSON.parse(saved) : ['evt-2']; // Pre-joined Art Jam by default for delightful preview
    } catch {
      return ['evt-2'];
    }
  });

  // Gamification Points
  const [points, setPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POINTS);
      return saved ? parseInt(saved, 10) : 120;
    } catch {
      return 120;
    }
  });

  // Badges
  const [badges, setBadges] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
      return saved ? JSON.parse(saved) : DEFAULT_BADGES;
    } catch {
      return DEFAULT_BADGES;
    }
  });

  // Quiz Results / Personalization
  const [quizResults, setQuizResults] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals & Popups
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [buddyModalEvent, setBuddyModalEvent] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Sync Auth to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error(e);
    }
  }, [registeredUsers]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_EVENTS, JSON.stringify(customEvents));
    } catch (e) {
      console.error(e);
    }
  }, [customEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOINED_IDS, JSON.stringify(joinedIds));
    } catch (e) {
      console.error(e);
    }
  }, [joinedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POINTS, points.toString());
    } catch (e) {
      console.error(e);
    }
  }, [points]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    } catch (e) {
      console.error(e);
    }
  }, [badges]);

  useEffect(() => {
    try {
      if (quizResults) {
        localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(quizResults));
      }
    } catch (e) {
      console.error(e);
    }
  }, [quizResults]);

  // Combined all events (custom first, then initial)
  const allEvents = [...customEvents, ...INITIAL_EVENTS];

  // Helper Toast trigger
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Trigger playful confetti explosion
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981']
      });
    } catch (err) {
      console.log('Confetti effect skipped', err);
    }
  };

  // Auth Functions
  const loginUser = (email, password) => {
    const found = registeredUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      // Create user on the fly if valid campus email
      const generatedName = email.split('@')[0].replace(/[._]/g, ' ');
      const newUser = {
        id: `user-${Date.now()}`,
        name: generatedName.charAt(0).toUpperCase() + generatedName.slice(1),
        email: email.trim(),
        rollNo: `24STU${Math.floor(1000 + Math.random() * 9000)}`,
        department: 'Campus Student',
        year: 'Undergraduate',
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
        bio: 'Ready to make Saturdays count!',
        vibes: ['Art', 'Music', 'Tech']
      };
      setRegisteredUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      fireConfetti();
      showToast(`Welcome to Saturday Vibes, ${newUser.name}!`, 'success');
      return { success: true, user: newUser };
    }

    setCurrentUser(found);
    fireConfetti();
    showToast(`Welcome back, ${found.name}!`, 'success');
    return { success: true, user: found };
  };

  const signupUser = (formData) => {
    const existing = registeredUsers.find(
      u => u.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (existing) {
      showToast('An account with this campus email already exists. Please log in.', 'info');
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      rollNo: formData.rollNo.trim() || `24ENG${Math.floor(1000 + Math.random() * 9000)}`,
      department: formData.department || 'Digital Engineering',
      year: formData.year || '1st Year',
      avatar: formData.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(formData.name)}`,
      bio: formData.bio || 'Excited to discover campus Saturday vibes!',
      vibes: formData.vibes || ['Art', 'Gaming', 'Music']
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setPoints(prev => prev + 25); // Welcome bonus points!
    unlockBadge('first-vibe');
    fireConfetti();
    showToast(`Account created! Welcome to the hub, ${newUser.name} (+25 pts)`, 'success');
    return { success: true, user: newUser };
  };

  const logoutUser = () => {
    const name = currentUser?.name || 'Student';
    setCurrentUser(null);
    showToast(`Signed out of ${name}'s profile.`, 'info');
    setActiveTab('home');
  };

  // Unlock badge utility
  const unlockBadge = (badgeId) => {
    setBadges(prev =>
      prev.map(b => (b.id === badgeId ? { ...b, unlocked: true } : b))
    );
  };

  // Toggle or Join Event
  const toggleJoinEvent = (eventId) => {
    const isJoined = joinedIds.includes(eventId);
    const event = allEvents.find(e => e.id === eventId);
    const eventTitle = event ? event.title : 'the event';

    if (isJoined) {
      setJoinedIds(prev => prev.filter(id => id !== eventId));
      showToast(`Removed "${eventTitle}" from your Saturday schedule`, 'info');
    } else {
      const updatedJoined = [...joinedIds, eventId];
      setJoinedIds(updatedJoined);
      setPoints(prev => prev + 30);
      fireConfetti();
      showToast("You're in! See you on Saturday.", 'success');

      // Check badges
      unlockBadge('first-vibe');

      if (event && ['Art', 'Music', 'Photography'].includes(event.category)) {
        unlockBadge('creative-explorer');
      }

      if (updatedJoined.length >= 3) {
        unlockBadge('weekend-regular');
      }
    }
  };

  // Create new student-led event
  const createNewEvent = (formData) => {
    const newId = `custom-${Date.now()}`;
    const newEvent = {
      id: newId,
      title: formData.title,
      category: formData.category,
      categoryIcon: getCategoryIcon(formData.category),
      date: formData.date || 'Upcoming Saturday',
      time: formData.time || '11:00 AM',
      rawHour: parseHourFromTime(formData.time),
      location: formData.location,
      duration: formData.duration || '2 hours',
      durationHours: 2,
      mode: formData.mode || 'Indoor',
      moods: formData.moods && formData.moods.length ? formData.moods : ['Creative', 'Social'],
      participationType: formData.participationType || 'With Friends',
      organizer: `${formData.organizerName || currentUser?.name || 'Student'} (Student Organizer)`,
      organizerContact: formData.organizerContact || currentUser?.email || 'student@campus.edu',
      participants: 1,
      maxParticipants: parseInt(formData.maxParticipants, 10) || 20,
      difficulty: 'Student Hosted',
      whatToBring: formData.whatToBring || 'Good vibes and student ID',
      description: formData.description,
      isStudentLed: true,
      tags: ['Student-Led', formData.category, formData.mode]
    };

    setCustomEvents(prev => [newEvent, ...prev]);
    // Also auto-join creator to their own event!
    setJoinedIds(prev => [...prev, newId]);
    setPoints(prev => prev + 50);
    unlockBadge('campus-creator');
    fireConfetti();
    showToast('Event created successfully! Added to your schedule with +50 points.', 'success');
  };

  // Send Invite to Buddy
  const sendBuddyInvite = (buddy, event) => {
    setPoints(prev => prev + 15);
    unlockBadge('social-spark');
    showToast(`Invite sent to ${buddy.name} for ${event.title}!`, 'success');
  };

  // Calculate dynamic recommendations based on user quiz answers
  const calculateRecommendations = (answers) => {
    const scored = allEvents.map(event => {
      let score = 0;
      const reasons = [];

      // 1. Interest match (Weight: 4)
      if (answers.interests && answers.interests.length > 0) {
        const matchesInterest = answers.interests.some(
          interest =>
            event.category.toLowerCase().includes(interest.toLowerCase()) ||
            event.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
        );
        if (matchesInterest) {
          score += 4;
          reasons.push(`Matches interest: ${event.category}`);
        }
      }

      // 2. Mood match (Weight: 3)
      if (answers.mood && event.moods.includes(answers.mood)) {
        score += 3;
        reasons.push(`Matches your ${answers.mood} mood`);
      }

      // 3. Participation match (Weight: 2)
      if (answers.participation) {
        if (answers.participation === 'Any' || event.participationType === answers.participation) {
          score += 2;
          reasons.push(`Fits "${answers.participation}" vibe`);
        }
      }

      // 4. Duration / Time match (Weight: 2)
      if (answers.time) {
        if (answers.time === 'Flexible') {
          score += 2;
        } else if (answers.time === 'Less than 1 hour' && event.durationHours <= 1.2) {
          score += 2;
          reasons.push('Under 1 hour');
        } else if (answers.time === '1–2 hours' && event.durationHours >= 1 && event.durationHours <= 2) {
          score += 2;
          reasons.push('Ideal 1-2h length');
        } else if (answers.time === '2–4 hours' && event.durationHours >= 2 && event.durationHours <= 4) {
          score += 2;
          reasons.push('Fits 2-4h window');
        }
      }

      // 5. Mode match (Weight: 2)
      if (answers.mode) {
        if (answers.mode === 'Either' || event.mode.toLowerCase() === answers.mode.toLowerCase()) {
          score += 2;
          reasons.push(`${event.mode} setting`);
        }
      }

      return {
        ...event,
        matchScore: score,
        matchReasons: reasons
      };
    });

    // Sort by highest score first
    const sorted = scored.sort((a, b) => b.matchScore - a.matchScore);

    // Build personality summary string
    const vibeSummary = `You seem to be a ${answers.mood || 'Relaxed'} + ${answers.participation === 'With Friends' ? 'Social' : 'Autonomous'} + ${answers.interests.slice(0, 2).join(' & ') || 'Curious'} person.`;

    const resultPayload = {
      answers,
      summary: vibeSummary,
      matchedEvents: sorted.slice(0, 6)
    };

    setQuizResults(resultPayload);
    fireConfetti();
    showToast('Your personalized Saturday Vibes are ready!', 'success');
    return resultPayload;
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_EVENTS);
    localStorage.removeItem(STORAGE_KEYS.JOINED_IDS);
    localStorage.removeItem(STORAGE_KEYS.POINTS);
    localStorage.removeItem(STORAGE_KEYS.BADGES);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
    setCustomEvents([]);
    setJoinedIds(['evt-2']);
    setPoints(120);
    setBadges(DEFAULT_BADGES);
    setQuizResults(null);
    setCurrentUser(DEMO_USERS[0]);
    showToast('Prototype data reset to initial demo state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        presentationMode,
        setPresentationMode,
        currentUser,
        setCurrentUser,
        registeredUsers,
        loginUser,
        signupUser,
        logoutUser,
        events: allEvents,
        joinedIds,
        points,
        badges,
        quizResults,
        selectedEvent,
        setSelectedEvent,
        buddyModalEvent,
        setBuddyModalEvent,
        toast,
        showToast,
        toggleJoinEvent,
        createNewEvent,
        sendBuddyInvite,
        calculateRecommendations,
        resetAllData,
        fireConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Helpers
function getCategoryIcon(cat) {
  const map = {
    Music: '🎵',
    Art: '🎨',
    Sports: '⚽',
    Gaming: '🎮',
    Technology: '💻',
    Movies: '🎬',
    'Food & Social': '🍕',
    Learning: '📚',
    'Chill & Wellness': '🧘',
    Photography: '📷'
  };
  return map[cat] || '✨';
}

function parseHourFromTime(timeStr) {
  if (!timeStr) return 12;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 12;
  let hour = parseInt(match[1], 10);
  const min = parseInt(match[2], 10) / 60;
  const period = match[3].toUpperCase();
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour + min;
}
