# Roman Numerals Learning Game — Implementation Plan

## Tech Stack Summary

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + TypeScript (strict) | Prompt requirement |
| Build | Vite (latest, `npm create vite@latest`) | Fast HMR, optimized builds |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) | Rapid responsive design, mobile-first utilities |
| Drag & Drop | **@dnd-kit** (framework-agnostic, touch-first) | Best React DnD lib; built-in touch/pointer sensors |
| Sound | **Howler.js** | Lightweight, mobile-compatible, sprite support |
| State | React Context + `useReducer` | Simple enough for this scope; no extra dep |
| Persistence | `localStorage` | Language pref, unlocked levels, high scores |
| Routing | **React Router v7** (hash router for static deploy) | Mode navigation, deep links |
| i18n | Custom lightweight context (EN/BG only) | Two languages don't justify a full i18n lib |
| Testing | Vitest + React Testing Library | Co-located with Vite, fast |
| Deploy | GitHub Pages (or Vercel) | Free, simple |

---

## Project Structure

```
roman-numbers/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── fonts/            # Roman-style serif fonts
│   └── sounds/           # .mp3/.webm sound effects
├── src/
│   ├── main.tsx          # Entry point, providers
│   ├── App.tsx           # Router + layout shell
│   ├── index.css         # Tailwind import + theme tokens
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx        # Header, nav, footer wrapper
│   │   │   ├── HomeScreen.tsx      # 4 game mode cards + settings
│   │   │   └── SettingsPanel.tsx   # Language toggle, sound toggle
│   │   │
│   │   ├── ui/
│   │   │   ├── RomanSymbolTile.tsx # Draggable/tappable symbol chip
│   │   │   ├── NumberCard.tsx      # Styled number display
│   │   │   ├── LevelSelector.tsx   # Level picker with lock icons
│   │   │   ├── Timer.tsx           # Countdown / elapsed timer
│   │   │   ├── StreakCounter.tsx   # Consecutive correct answers
│   │   │   ├── ProgressBar.tsx     # Animated progress indicator
│   │   │   ├── ScoreDisplay.tsx    # Points display
│   │   │   ├── Celebration.tsx     # Confetti / laurel animation
│   │   │   └── Button.tsx          # Themed button variants
│   │   │
│   │   └── modes/
│   │       ├── tutorial/
│   │       │   ├── TutorialMode.tsx      # Tutorial orchestrator
│   │       │   ├── SymbolLesson.tsx      # Teach one symbol
│   │       │   ├── RuleLesson.tsx        # Teach additive/subtractive
│   │       │   └── TutorialQuiz.tsx      # Mini quiz after each rule
│   │       │
│   │       ├── converter/
│   │       │   ├── ConverterMode.tsx     # Mode 1 orchestrator
│   │       │   ├── SymbolPalette.tsx     # Available symbols to drag
│   │       │   ├── DropZone.tsx          # Build area for Roman numeral
│   │       │   └── HintSystem.tsx        # Progressive hint display
│   │       │
│   │       ├── challenge/
│   │       │   ├── ChallengeMode.tsx     # Mode 2 orchestrator
│   │       │   ├── QuestionCard.tsx      # Roman numeral display
│   │       │   ├── AnswerOptions.tsx     # 4 multiple-choice buttons
│   │       │   └── Breakdown.tsx         # Visual numeral breakdown
│   │       │
│   │       └── match/
│   │           ├── MatchMode.tsx         # Mode 3 orchestrator
│   │           ├── CardGrid.tsx          # Memory card layout
│   │           └── MatchCard.tsx         # Flip-able card component
│   │
│   ├── data/
│   │   ├── romans.ts          # SYMBOLS, PATTERNS, LEVELS constants
│   │   └── translations.ts   # All UI strings { en, bg }
│   │
│   ├── hooks/
│   │   ├── useLanguage.ts         # Language context consumer hook
│   │   ├── useGameState.ts        # Score, level, streak management
│   │   ├── useTimer.ts            # Countdown / stopwatch logic
│   │   ├── useSound.ts            # Play sound effects
│   │   └── useLocalStorage.ts     # Generic typed localStorage hook
│   │
│   ├── context/
│   │   ├── LanguageContext.tsx     # Provider + toggle logic
│   │   └── GameContext.tsx         # Global game state provider
│   │
│   ├── utils/
│   │   ├── converter.ts      # toRoman(), toArabic()
│   │   ├── validator.ts      # isValidRoman(), validateAnswer()
│   │   ├── distractor.ts     # Generate plausible wrong answers
│   │   └── shuffle.ts        # Fisher-Yates shuffle
│   │
│   └── __tests__/
│       ├── converter.test.ts
│       ├── validator.test.ts
│       └── distractor.test.ts
```

---

## Implementation Phases & Steps

### Phase 1 — Project Scaffold & Foundation

```
- [ ] 1.1  Scaffold Vite + React + TypeScript project
- [ ] 1.2  Install core deps: tailwindcss, @tailwindcss/vite, react-router, @dnd-kit/core, @dnd-kit/sortable, howler
- [ ] 1.3  Configure Tailwind v4 as Vite plugin; add Roman theme tokens (gold, cream, red palette)
- [ ] 1.4  Set up project directory structure (components, data, hooks, utils, context)
- [ ] 1.5  Implement `utils/converter.ts` — toRoman(), toArabic() with full 1-100 support
- [ ] 1.6  Implement `utils/validator.ts` — isValidRoman(), max-3 repeat rule, subtractive rule
- [ ] 1.7  Write unit tests for converter & validator (edge cases: 4, 9, 40, 49, 90, 99, 100)
- [ ] 1.8  Create `data/romans.ts` — SYMBOLS, PATTERNS, LEVELS constants
- [ ] 1.9  Create `data/translations.ts` — all UI strings in EN + BG
- [ ] 1.10 Build LanguageContext + useLanguage hook (toggle, localStorage persistence)
- [ ] 1.11 Build useLocalStorage generic hook
- [ ] 1.12 Set up React Router with HashRouter (/, /tutorial, /converter, /challenge, /match)
- [ ] 1.13 Create AppShell layout — header with title, back button, settings icon
- [ ] 1.14 Create HomeScreen — 4 game mode cards with icons, bilingual labels
- [ ] 1.15 Verify dev server runs, hot reload works, and deploy a blank shell to GitHub Pages
```

### Phase 2 — Core UI Components

```
- [ ] 2.1  Build Button component — primary/secondary/ghost variants, large touch targets (min 48px)
- [ ] 2.2  Build RomanSymbolTile — draggable chip with ancient styling, active/disabled states
- [ ] 2.3  Build NumberCard — styled Arabic/Roman number display with marble texture
- [ ] 2.4  Build Timer component — countdown mode (30s) and elapsed mode
- [ ] 2.5  Build ProgressBar — animated, level-aware, shows x/total questions
- [ ] 2.6  Build StreakCounter — flame icon + count, animates on increment
- [ ] 2.7  Build ScoreDisplay — gold coin icon + animated score counter
- [ ] 2.8  Build LevelSelector — 3 levels with lock icons, unlock state from localStorage
- [ ] 2.9  Build Celebration component — CSS confetti/laurel wreath animation on level complete
- [ ] 2.10 Build SettingsPanel — language toggle (🇬🇧/🇧🇬), sound on/off, close button
```

### Phase 3 — Mode 4: Symbol Builder Tutorial

```
- [ ] 3.1  Create TutorialMode orchestrator — step-by-step flow with progress indicator
- [ ] 3.2  Build SymbolLesson — introduce each symbol (I, V, X, L, C) with animation
- [ ] 3.3  Build RuleLesson — teach additive rule (VI = 5+1), subtractive rule (IV = 5-1), repetition rule
- [ ] 3.4  Add animated examples — symbol appears, breaks apart, shows math
- [ ] 3.5  Build TutorialQuiz — mini quiz after each rule (3 questions per rule)
- [ ] 3.6  Implement tutorial completion state — unlocks game modes, saves to localStorage
- [ ] 3.7  Add bilingual text for all lessons and quizzes
- [ ] 3.8  Test full tutorial flow start-to-finish
```

### Phase 4 — Mode 1: Number Converter Practice

```
- [ ] 4.1  Create ConverterMode orchestrator — question generation, level selection, scoring
- [ ] 4.2  Build SymbolPalette — row of draggable symbols filtered by current level
- [ ] 4.3  Build DropZone — area where symbols are placed to build Roman numeral
- [ ] 4.4  Integrate @dnd-kit — drag from palette to drop zone, tap-to-add fallback for mobile
- [ ] 4.5  Add real-time validation — green check / red X as user builds answer
- [ ] 4.6  Build HintSystem — "Show next symbol" button, reveals one symbol at a time
- [ ] 4.7  Implement progressive difficulty — Level 1 (1-10), Level 2 (11-50), Level 3 (51-100)
- [ ] 4.8  Implement scoring — based on attempts (fewer = more points) and hints used
- [ ] 4.9  Level unlock logic — complete 8/10 correct to unlock next level
- [ ] 4.10 Persist scores and level unlock state to localStorage
- [ ] 4.11 Test all levels, edge case numbers (4, 9, 14, 40, 49, 90, 99)
```

### Phase 5 — Mode 2: Roman to Arabic Challenge

```
- [ ] 5.1  Create ChallengeMode orchestrator — timed rounds, streak tracking
- [ ] 5.2  Build `utils/distractor.ts` — generate 3 plausible wrong answers (±1-10 of correct, no negatives, no dupes)
- [ ] 5.3  Build QuestionCard — large Roman numeral display
- [ ] 5.4  Build AnswerOptions — 4 shuffled buttons, highlight correct/wrong on tap
- [ ] 5.5  Add 30-second countdown timer per question
- [ ] 5.6  Implement streak counter — resets on wrong answer, persists best streak
- [ ] 5.7  Build Breakdown — on correct answer, show XL=40, VII=7 → XLVII=47
- [ ] 5.8  Implement level-based question ranges
- [ ] 5.9  End-of-round summary screen with score, streak, accuracy
- [ ] 5.10 Test with edge-case numerals (IV, IX, XL, XC, XCIX)
```

### Phase 6 — Mode 3: Quick Match (Memory Game)

```
- [ ] 6.1  Create MatchMode orchestrator — pair generation, shuffle, timer
- [ ] 6.2  Build CardGrid — responsive grid (3x4 for 6 pairs, 4x6 for 12 pairs)
- [ ] 6.3  Build MatchCard — flip animation (CSS 3D transform), face-down/face-up states
- [ ] 6.4  Implement matching logic — 2 cards flipped, check pair, lock matched pairs
- [ ] 6.5  Progressive difficulty — start 6 pairs, unlock 12 pairs
- [ ] 6.6  Add elapsed timer — beat personal best (saved to localStorage)
- [ ] 6.7  Celebration animation when all pairs matched
- [ ] 6.8  Test with various grid sizes and touch interactions
```

### Phase 7 — Sound, Animation & Polish

```
- [ ] 7.1  Source/create sound effects — correct ding, wrong buzz, card flip, coin clink, fanfare
- [ ] 7.2  Implement useSound hook — Howler.js wrapper, respects mute setting
- [ ] 7.3  Wire sounds to all game events (correct, wrong, streak, level-up, match)
- [ ] 7.4  Add CSS transitions — page transitions, card flips, score pop, streak fire
- [ ] 7.5  Implement Celebration with CSS keyframe confetti + laurel wreath SVG
- [ ] 7.6  Add Roman theme polish — marble textures, column decorations, gold accents
- [ ] 7.7  Import and apply serif/Roman font (e.g., Cinzel from Google Fonts)
- [ ] 7.8  Ensure color-blind friendly feedback — icons + patterns, not just red/green
```

### Phase 8 — Mobile Optimization & Accessibility

```
- [ ] 8.1  Audit all touch targets — minimum 48x48px
- [ ] 8.2  Test responsive breakpoints — 320px, 375px, 414px, 768px
- [ ] 8.3  Optimize portrait orientation — stack layouts vertically
- [ ] 8.4  Add landscape fallback — gentle prompt to rotate, or fluid layout
- [ ] 8.5  Verify drag interactions work on iOS Safari and Android Chrome
- [ ] 8.6  Add tap-to-add alternative for all drag interactions
- [ ] 8.7  Ensure high contrast text (WCAG AA minimum)
- [ ] 8.8  Add aria-labels to interactive elements
- [ ] 8.9  Test with VoiceOver (iOS) for basic screen reader support
- [ ] 8.10 Verify Bulgarian Cyrillic renders correctly across devices
```

### Phase 9 — Testing & QA

```
- [ ] 9.1  Unit tests — converter, validator, distractor (Vitest)
- [ ] 9.2  Component tests — key UI components render correctly (React Testing Library)
- [ ] 9.3  Integration tests — each game mode completes a full round
- [ ] 9.4  Manual test: full tutorial flow
- [ ] 9.5  Manual test: all edge-case numbers (4, 9, 14, 40, 44, 49, 90, 99, 100)
- [ ] 9.6  Manual test: invalid Roman detection (IIII, VV, IL, IC)
- [ ] 9.7  Manual test: language toggle mid-game
- [ ] 9.8  Manual test: localStorage persistence (refresh, reopen)
- [ ] 9.9  Manual test: iPhone Safari + Android Chrome
- [ ] 9.10 Performance audit — Lighthouse score ≥ 90, load < 3s on throttled 3G
- [ ] 9.11 Fix all TypeScript strict-mode errors
```

### Phase 10 — Deployment & Documentation

```
- [ ] 10.1  Configure vite.config.ts base path for GitHub Pages
- [ ] 10.2  Set up GitHub Actions workflow for auto-deploy on push to main
- [ ] 10.3  Deploy to GitHub Pages, verify live URL works
- [ ] 10.4  Write README — local setup, deploy instructions, game overview, screenshots
- [ ] 10.5  Add bilingual game instructions to README
- [ ] 10.6  Record GIF demo of each game mode
- [ ] 10.7  Final smoke test on live URL across devices
```

---

## Key Design Decisions

### 1. Drag & Drop Strategy
- **@dnd-kit** with `PointerSensor` (works for both mouse and touch)
- Every drag interaction also has a **tap-to-add** fallback — user taps a symbol tile, it appends to the drop zone
- This ensures usability on all devices without complex gesture handling

### 2. Distractor Generation (Mode 2)
Generate 3 wrong answers that are plausible:
- ±1 to ±3 from correct answer (near misses)
- Common confusion values (e.g., if correct is 4, offer 6 because IV vs VI confusion)
- Ensure no duplicates, no negatives, all within level range

### 3. Bilingual Approach
- **Language toggle** with flag icons (🇬🇧 🇧🇬) in settings
- All strings stored in `translations.ts` as `{ en: string; bg: string }` objects
- `useLanguage()` hook returns current language and `t(key)` function
- Preference persisted to localStorage

### 4. Level Progression
- Level 1 unlocked by default
- Tutorial completion is **recommended** but not **required** to play
- Complete 80% of questions correctly in a level to unlock the next
- Progress saved per-mode to localStorage

### 5. Performance Targets
- Bundle size < 200KB gzipped (React + DnD Kit + Howler + Tailwind)
- No heavy image assets — use CSS gradients, SVGs, and emoji for theming
- Sound files as compressed `.webm` with `.mp3` fallback
- Lazy-load game modes with `React.lazy()` + `Suspense`

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| DnD feels janky on mobile | Tap-to-add fallback; test early on real devices |
| Sound doesn't play on iOS | Howler.js handles Web Audio unlock; user tap to start |
| Tailwind bloat | Tailwind v4 tree-shakes automatically; no config bloat |
| Bulgarian text breaks layout | Test early with longest BG strings; use `text-ellipsis` |
| Kids confused by UI | Tutorial first; large buttons; visual icons over text |

---

## Estimated Effort Breakdown

| Phase | Weight |
|-------|--------|
| 1. Scaffold & Foundation | 15% |
| 2. Core UI Components | 10% |
| 3. Tutorial Mode | 12% |
| 4. Converter Mode | 15% |
| 5. Challenge Mode | 12% |
| 6. Quick Match Mode | 12% |
| 7. Sound & Polish | 8% |
| 8. Mobile & A11y | 8% |
| 9. Testing & QA | 5% |
| 10. Deploy & Docs | 3% |

---

## Commands Cheat Sheet

```bash
# Scaffold
npm create vite@latest roman-numerals -- --template react-ts
cd roman-numerals

# Install deps
npm install react-router howler @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install tailwindcss @tailwindcss/vite
npm install -D @types/howler vitest @testing-library/react @testing-library/jest-dom jsdom

# Dev
npm run dev

# Test
npx vitest run

# Build & Deploy
npm run build
npx gh-pages -d dist
```
