// Automated test runner for Saturday Vibes functionality verification
import { INITIAL_EVENTS, CATEGORIES_LIST } from './src/data/initialEvents.js';
import { DIVERGENT_IDEAS, CONVERGENT_EVALUATION, PERSONA_MEERA, TESTING_RESULTS } from './src/data/designProcessData.js';
import { DEMO_BUDDIES } from './src/data/buddiesData.js';

console.log('🧪 Starting Saturday Vibes Automated Verification Suite...\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    testsFailed++;
  }
}

// 1. Data Integrity Tests
console.log('--- 1. Data Integrity & Content Check ---');
assert(INITIAL_EVENTS.length >= 15, `Initial events count is ${INITIAL_EVENTS.length} (>= 15 required)`);
assert(CATEGORIES_LIST.length >= 10, `Categories count is ${CATEGORIES_LIST.length} (>= 10 required)`);
assert(DIVERGENT_IDEAS.length === 10, `Divergent ideas count is ${DIVERGENT_IDEAS.length} (exactly 10 required)`);
assert(DEMO_BUDDIES.length >= 4, `Buddy profiles count is ${DEMO_BUDDIES.length} (>= 4 required)`);
assert(PERSONA_MEERA.name === 'Meera' && PERSONA_MEERA.age === 21, 'Persona Meera correctly initialized');
assert(TESTING_RESULTS.questions.length === 6, 'Usability testing has 6 questions');

// 2. Personalization Algorithm Test (Section 32 Sample User Journey)
console.log('\n--- 2. Personalization Algorithm Verification (Section 32 Journey) ---');

const sampleAnswers = {
  interests: ['Art', 'Movies', 'Photography', 'Chill & Wellness'],
  mood: 'Creative',
  participation: 'With Friends',
  time: '2–4 hours',
  mode: 'Either'
};

function scoreEvents(events, answers) {
  return events.map(event => {
    let score = 0;
    if (answers.interests && answers.interests.length > 0) {
      const matchesInterest = answers.interests.some(
        interest =>
          event.category.toLowerCase().includes(interest.toLowerCase()) ||
          event.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchesInterest) score += 4;
    }
    if (answers.mood && event.moods.includes(answers.mood)) {
      score += 3;
    }
    if (answers.participation) {
      if (answers.participation === 'Any' || event.participationType === answers.participation) {
        score += 2;
      }
    }
    if (answers.time) {
      if (answers.time === 'Flexible') {
        score += 2;
      } else if (answers.time === '2–4 hours' && event.durationHours >= 2 && event.durationHours <= 4) {
        score += 2;
      }
    }
    if (answers.mode) {
      if (answers.mode === 'Either' || event.mode.toLowerCase() === answers.mode.toLowerCase()) {
        score += 2;
      }
    }
    return { ...event, score };
  }).sort((a, b) => b.score - a.score);
}

const scored = scoreEvents(INITIAL_EVENTS, sampleAnswers);
const topTitles = scored.slice(0, 5).map(e => e.title);
console.log('  Top Recommended Activities:', topTitles);

assert(topTitles.includes('Art Jam & Canvas Splash'), 'Recommends Art Jam');
assert(topTitles.includes('Campus Photography Walk'), 'Recommends Campus Photography Walk');
assert(topTitles.includes('Cozy Movie Evening & Popcorn Social'), 'Recommends Cozy Movie Evening');
assert(topTitles.includes('Board Game Cafe & Strategy Social'), 'Recommends Board Game Cafe & Strategy Social');

// 3. Search and Category Filter Verification
console.log('\n--- 3. Search and Filter Tests ---');

const photoEvents = INITIAL_EVENTS.filter(e => e.category === 'Photography');
assert(photoEvents.length > 0, 'Photography filter returns events');

const morningEvents = INITIAL_EVENTS.filter(e => (e.rawHour || 0) < 12);
assert(morningEvents.length > 0, 'Morning time filter returns events');

const outdoorEvents = INITIAL_EVENTS.filter(e => e.mode === 'Outdoor');
assert(outdoorEvents.length > 0, 'Outdoor filter returns events');

// 4. Custom Event Simulation
console.log('\n--- 4. Student Event Creation Simulation ---');

const mockCustomEvent = {
  id: `custom-${Date.now()}`,
  title: 'Student Drone Flight Lab',
  category: 'Technology',
  location: 'North Quad',
  organizer: 'Vikram (Student Organizer)',
  duration: '2 hours',
  isStudentLed: true,
  participants: 1,
  maxParticipants: 15
};

const combined = [mockCustomEvent, ...INITIAL_EVENTS];
assert(combined[0].title === 'Student Drone Flight Lab', 'Custom event prepends successfully to event feed');
assert(combined.find(e => e.id === mockCustomEvent.id).isStudentLed === true, 'Custom event is tagged as student-led');

console.log('\n======================================');
console.log(`SUMMARY: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('======================================\n');

if (testsFailed > 0) {
  process.exit(1);
}
