# Saturday Vibes ✨
> **Project Title:** Reimagining Saturdays: Making Campus Activities Irresistible  
> **Course / Lab:** Digital Engineering Lab Capstone Project  
> **Tagline:** *"Your Saturday. Your Vibe."*  
> **Philosophy:** *"Discover. Choose. Connect. Enjoy."*

---

## 1. Project Overview

**Saturday Vibes** is a student-centric platform built as a Digital Engineering Lab Capstone prototype. It transforms ordinary campus Saturdays from rigid, repetitive routines into engaging, personalized experiences. 

Instead of forcing students to attend predefined, one-size-fits-all college events, **Saturday Vibes** empowers students to curate a weekend that genuinely matches their current mood, available time, creative passions, and social preferences.

---

## 2. Problem Statement

Meera is a 21-year-old final-year undergraduate student who typically prefers resting at home on weekends rather than attending campus activities. 

Meera and her peers find traditional Saturday campus events:
* **Unappealing & Repetitive:** Similar generic guest lectures, formal assemblies, or mandatory attendance rallies week after week.
* **Irrelevant:** Events do not align with creative, casual, or hands-on hobbies (art, gaming, coding sprints, indie music, coffee circles).
* **Difficult to Discover:** Fragmented WhatsApp groups and noticeboards discovered after events have already occurred.
* **Inflexible:** Rigid, whole-day commitments that prevent students from catching up on sleep or academics.
* **Socially Intimidating:** High pressure of having to attend alone if immediate friends are unavailable.

> **How Might We (HMW):**  
> *"How might we redesign Saturday campus activities to be more engaging, inclusive, flexible, personalized, and something students genuinely look forward to?"*

---

## 3. Human-Centered Design Thinking Process

The project followed the Stanford d.school 7-Stage Design Thinking Framework:

```
01 Empathize ──> 02 Define ──> 03 Diverge ──> 04 Converge ──> 05 Prototype ──> 06 Test ──> 07 Final Solution
```

### Stage 1: Empathize (User Persona: Meera)
* **Age:** 21 | **Year:** Final Year Student | **Major:** Computer Science & Design
* **Quote:** *"I don't hate campus life, but after an intense week of coursework, Saturday is my only recharge time. Traditional events feel like another mandatory chore."*
* **Goals:** Relaxing weekend, personalized activities, time with friends, low-pressure participation.
* **Pain Points:** Repetitive events, rigid timings, awkwardness of attending alone, compulsory pressure.

### Stage 2: Define
Framed the challenge around student autonomy, mood-alignment, and peer connection rather than institutional compliance.

### Stage 3: Divergent Thinking (Think Wide)
Generated 10 wide-ranging concepts:
1. **Interest-Based Activities** (Music, Art, Gaming, Tech, Sports, Movies, Photography, Chill)
2. **Student-Led Events** (Zero-bureaucracy proposal and publishing)
3. **Flexible Saturday** (Choose duration, start time, indoor vs. outdoor mode)
4. **Food + Fun Festival** (Food popups, acoustic tunes, and mini lawn games)
5. **Buddy Mode** (Find interested peers and never attend an activity alone)
6. **Chill Zone** (Quiet reading, ambient lo-fi sketching, meditation decks)
7. **Skill Swap** (Peer-to-peer 45-minute hobby teaching exchanges)
8. **Weekend Challenge** (Playful bite-sized quests and photo prompts)
9. **Campus Adventure** (Scavenger hunts and architectural photowalks)
10. **Saturday Points & Rewards** (Badges, participation points, and perks)

### Stage 4: Convergent Thinking (Choose the Best)
Evaluated ideas using a weighted matrix (Student Interest, Feasibility, Inclusiveness, Flexibility, Engagement, and Ease of Implementation).

**Selected Champion Solution:**  
**"Personalized Saturday Activity Hub"**  
Synthesizing:
* Interest-based multi-category catalog
* Dynamic mood & time questionnaire
* Student-led activity publishing
* Buddy/peer participation layer
* Low-pressure engagement mechanics

### Stage 5: Prototype Evolution
* **Phase 1 (Low-Fi):** Information architecture & 5-question questionnaire flow.
* **Phase 2 (Digital Wireframes):** Component layouts, responsive grids, and color-coded vibes.
* **Phase 3 (Interactive React Prototype):** Live filtering, scoring engine, and `localStorage` persistence.

### Stage 6: Usability Testing & Iteration
Tested with campus students across 6 benchmark questions:
* *94%* found activities matching their vibe in < 30 seconds.
* *98%* loved mood-based filtering (Relaxed vs. Energetic vs. Creative).
* Implemented key improvements: 1-click **Buddy Mode** invites, dynamic matching badges, and chronological **My Saturday** timeline.

### Stage 7: Final Solution Architecture
* **DISCOVER:** Instant search and multi-dimensional filters.
* **PERSONALIZE:** Dynamic matching engine.
* **CONNECT:** Peer invites and attendee rosters.
* **CREATE:** Student self-hosting engine.
* **ENJOY:** Visual weekend schedule with gamified rewards.

---

## 4. Key Interactive Features

| Feature | Description | State Persistence |
| :--- | :--- | :--- |
| **Find My Saturday (Quiz)** | 5-step questionnaire matching interests, mood, hours, participation, and setting. | Dynamic scoring engine |
| **Activity Discovery** | Real-time search and multi-filtering (Category, Time of Day, Mode, Mood, Company). | Live React memo |
| **Join Event Flow** | 1-click join, seat counter updates, confetti celebration, and schedule sync. | `localStorage` |
| **My Saturday Dashboard** | Chronological timeline visualizer, duration tracker, and cancel/remove actions. | `localStorage` |
| **Create Event** | Student self-hosting form with validation and instant appearance in feed. | `localStorage` |
| **Buddy Mode** | "Find Your People" attendee roster with 1-click friend invites. | `localStorage` |
| **Gamification & Rewards** | Points balance (+30 join, +50 create, +15 invite) with milestone badges. | `localStorage` |
| **Viva / Pitch Deck Mode** | Built-in fullscreen presentation slideshow for lab viva reviews. | Session state |

---

## 5. Technology Stack

* **Core Framework:** React 19 + Vite 8
* **Styling:** Tailwind CSS v4 (Mobile-first responsive design, modern glassmorphism)
* **Icons:** Lucide React
* **Micro-Delight:** Canvas Confetti
* **Typography:** Plus Jakarta Sans (Google Fonts)
* **Data Layer:** Client-side State Engine + LocalStorage Synchronization (Zero backend requirement for prototype demos)

---

## 6. How to Run Locally

### Prerequisites
* **Node.js** (v18.0.0 or higher, tested on v24.19.0)
* **npm** (v9.0.0 or higher)

### Setup Steps
```bash
# 1. Clone or navigate to the project directory
cd saturday-vibes

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 7. How to Build & Preview Production

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

The output bundle is generated inside the `dist/` directory with relative asset paths ready for static hosting.

---

## 8. Automated Verification Suite

Run the built-in automated test suite verifying data integrity, journey scoring, and state mutations:

```bash
node test-runner.js
```

---

## 9. GitHub & Deployment to GitHub Pages

The project is structured with relative asset paths (`base: './'` in `vite.config.js`), making it 100% compatible with GitHub Pages or Vercel.

### Deploying via GitHub Pages:
1. Initialize repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Saturday Vibes capstone prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Enable GitHub Pages in repository settings:
   * Go to **Settings** > **Pages**
   * Under **Build and deployment**, select **GitHub Actions** (or deploy from `gh-pages` branch).

---

## 10. Capstone Credits & Student Team

* **Project:** Digital Engineering Lab Capstone
* **Student:** Meera S. *(Editable Student Placeholder)*
* **Roll No:** 21BCE0482 *(Editable Placeholder)*
* **Department:** Department of Digital Engineering & Computer Science
* **Faculty Mentor:** [Prof. Faculty Guide]
* **Academic Year:** 2025–2026

---

> *"Saturday Vibes helps students stop asking 'Do I really want to go to this campus event?' and start thinking 'What kind of Saturday do I want?'"*
