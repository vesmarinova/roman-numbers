# Roman Numerals Learning Game - Project Prompt

## Project Overview
Create an interactive, mobile-friendly educational game that teaches children Roman numerals (I-C, numbers 1-100). The game should be engaging, visually appealing, and suitable for kids aged 7-12, helping them understand conversion between Arabic and Roman numeral systems.

## Technical Requirements

### Core Technologies
- **Language**: TypeScript
- **Framework**: React with Vite (fast, modern, mobile-optimized)
- **Styling**: CSS-in-JS or Tailwind CSS for responsive mobile design
- **Deployment**: Vercel, Netlify, or GitHub Pages (free tier)
- **Build Tool**: Vite for fast development and optimized builds

### Mobile Requirements
- Responsive design (mobile-first approach)
- Touch-friendly interactions (large tap targets, swipe gestures)
- Works on iOS and Android browsers
- Portrait orientation optimized
- No external dependencies that require app store deployment

### Language Requirements
- **Bilingual Support**: English and Bulgarian
- **Implementation Options**:
  1. **Dual Display (Recommended)**: Show instructions in both languages
     - Example: "Roman Numerals / Римски цифри"
  2. **Language Toggle**: Button to switch between English ↔ Bulgarian
     - Saves preference to localStorage
     - Flag icons (🇬🇧 🇧🇬) for visual language selection
- All UI text, instructions, and feedback must be translated
- Number values remain universal (1, 2, 3... and I, II, III...)

## Game Features

### Game Modes

#### Mode 1: Number Converter Practice
- Display an Arabic number (e.g., 47)
- Kid builds the Roman numeral using draggable symbols (I, V, X, L, C)
- Real-time validation: ✓ correct, ✗ incorrect
- Progressive difficulty:
  - Level 1: 1-10 (I, V, X only)
  - Level 2: 11-50 (add L)
  - Level 3: 51-100 (add C)
- Hints available (show one symbol at a time)
- Score based on attempts and time

#### Mode 2: Roman to Arabic Challenge
- Show a Roman numeral (e.g., XLVII)
- Multiple choice: select the correct Arabic number
- 4 options with plausible distractors
- Timed rounds (30 seconds per question)
- Streak counter for consecutive correct answers
- Visual breakdown of numeral on correct answer (XL=40, VII=7)

#### Mode 3: Quick Match
- Grid of cards (memory game style)
- Match pairs: Arabic ↔ Roman (e.g., 25 ↔ XXV)
- Start with 6 pairs, increase to 12
- Flip cards by tapping
- Celebration when all matched
- Timer to beat personal best

#### Mode 4: Symbol Builder Tutorial
- Interactive lesson mode
- Teaches the 7 basic symbols: I(1), V(5), X(10), L(50), C(100), D(500), M(1000)
- Focus on 1-100 for main gameplay
- Explains rules:
  - Additive: VI = 5+1 = 6
  - Subtractive: IV = 5-1 = 4
  - No more than 3 repeating symbols (III ✓, IIII ✗)
- Animated examples
- Quiz after each rule

### User Interface Requirements

#### Visual Design
- Ancient Rome theme (columns, laurel wreaths, marble textures)
- Gold, red, and cream color palette
- Large, readable fonts (minimum 18px)
- Roman-inspired font for numerals (serif, classical)
- Sound effects for correct/incorrect answers (with mute option)
- Smooth transitions between screens
- Progress bars and level indicators

#### Navigation
- Home screen with four game mode buttons
- Tutorial always accessible from menu
- Back button always visible
- Settings icon for language/sound
- "Play Again" and "Main Menu" options
- Level selector for unlocked levels

#### Accessibility
- High contrast text
- Simple language appropriate for age 7-12
- Audio cues for actions
- Support for both tap and drag interactions
- Color-blind friendly feedback (not just red/green)

## Data Structure

### Roman Numeral System
```typescript
interface RomanSymbol {
  symbol: string;
  value: number;
  order: number;
}

const SYMBOLS: RomanSymbol[] = [
  { symbol: 'I', value: 1, order: 1 },
  { symbol: 'V', value: 5, order: 2 },
  { symbol: 'X', value: 10, order: 3 },
  { symbol: 'L', value: 50, order: 4 },
  { symbol: 'C', value: 100, order: 5 },
  { symbol: 'D', value: 500, order: 6 },    // Optional for advanced levels
  { symbol: 'M', value: 1000, order: 7 }    // Optional for advanced levels
];

interface ConversionRule {
  pattern: RegExp;
  value: number;
  explanation: {
    en: string;
    bg: string;
  };
}

// Common patterns
const PATTERNS = [
  { pattern: /IV/, value: 4, explanation: { en: '5-1=4', bg: '5-1=4' } },
  { pattern: /IX/, value: 9, explanation: { en: '10-1=9', bg: '10-1=9' } },
  { pattern: /XL/, value: 40, explanation: { en: '50-10=40', bg: '50-10=40' } },
  { pattern: /XC/, value: 90, explanation: { en: '100-10=90', bg: '100-10=90' } },
];

interface GameLevel {
  id: number;
  name: { en: string; bg: string };
  range: { min: number; max: number };
  symbolsAllowed: string[];
  questionsCount: number;
  unlocked: boolean;
}

const LEVELS: GameLevel[] = [
  { 
    id: 1, 
    name: { en: 'Beginner', bg: 'Начинаещи' }, 
    range: { min: 1, max: 10 }, 
    symbolsAllowed: ['I', 'V', 'X'], 
    questionsCount: 10,
    unlocked: true 
  },
  { 
    id: 2, 
    name: { en: 'Intermediate', bg: 'Средно' }, 
    range: { min: 11, max: 50 }, 
    symbolsAllowed: ['I', 'V', 'X', 'L'], 
    questionsCount: 15,
    unlocked: false 
  },
  { 
    id: 3, 
    name: { en: 'Advanced', bg: 'Напреднали' }, 
    range: { min: 51, max: 100 }, 
    symbolsAllowed: ['I', 'V', 'X', 'L', 'C'], 
    questionsCount: 20,
    unlocked: false 
  },
];
```

### Conversion Functions
```typescript
// Convert Arabic to Roman
function toRoman(num: number): string {
  const conversions = [
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];
  
  let result = '';
  for (const { value, numeral } of conversions) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

// Convert Roman to Arabic
function toArabic(roman: string): number {
  const values: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };
  
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = values[roman[i]];
    const next = values[roman[i + 1]];
    
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

// Validate Roman numeral format
function isValidRoman(roman: string): boolean {
  const validPattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return validPattern.test(roman);
}
```

## Implementation Steps

### Phase 1: Setup & Foundation (Day 1)
1. Initialize Vite + React + TypeScript project
2. Set up project structure:
   ```
   /src
     /components
       /GameModes
         /Converter
         /RomanToArabic
         /QuickMatch
         /Tutorial
       /UI
         /RomanSymbolTile
         /NumberCard
         /LevelSelector
     /data
       romans.ts (conversion data and rules)
       translations.ts (UI text in both languages)
     /hooks
       useLanguage.ts (language toggle hook)
       useRomanConverter.ts (conversion logic)
     /utils
       converter.ts (toRoman, toArabic functions)
       validator.ts (validation logic)
     /styles
     /i18n (language context and utilities)
   ```
3. Create Roman numeral conversion utilities
4. Set up language context/provider
5. Build responsive layout shell with Roman theme
6. Deploy basic version to Vercel/Netlify

### Phase 2: Core Gameplay (Day 1-2)
1. Implement Tutorial Mode
   - Teach 7 basic symbols
   - Interactive rule explanations
   - Animated examples
2. Implement Number Converter Practice
   - Draggable symbol tiles
   - Drop zone for building numerals
   - Real-time validation
   - Level progression system
3. Implement Roman to Arabic Challenge
   - Question generator with smart distractors
   - Timer and streak tracking
   - Visual breakdown of answers
4. Add game state management (Context API or Zustand)
5. Implement level unlocking system

### Phase 3: Polish & Deploy (Day 2-3)
1. Implement Quick Match mode (memory game)
2. Add sound effects (coin clinks, fanfare)
3. Create celebration animations (Roman laurel wreaths, gold coins)
4. Add score tracking and local storage persistence
5. Implement progress dashboard
6. Mobile testing and optimization
7. Final deployment with custom domain (optional)

## Educational Content

### Key Concepts to Teach
1. **Seven Basic Symbols**: I, V, X, L, C, D, M
2. **Additive Principle**: Add when larger/equal before smaller (VI = 6, XXX = 30)
3. **Subtractive Principle**: Subtract when smaller before larger (IV = 4, IX = 9)
4. **Repetition Rules**: 
   - Only I, X, C, M can repeat
   - Maximum 3 times (III ✓, IIII ✗)
5. **Subtraction Rules**:
   - Only I, X, C can be subtracted
   - Only from next two higher values (IV, IX ✓, IL ✗)
   - Only one subtracted symbol (XIX ✓, IIX ✗)

### Tutorial Flow
1. Introduction: "Romans counted differently!" (with cartoon Roman character)
2. Learn I, V, X (interactive matching)
3. Practice 1-10
4. Learn additive rule (VI, VII, VIII)
5. Learn subtractive rule (IV, IX)
6. Practice 1-39
7. Introduce L, C
8. Practice 40-100
9. Final quiz to unlock games

## Deployment Instructions

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify
```bash
npm run build
# Drag /dist folder to netlify.com/drop
```

### GitHub Pages
```bash
# Add to vite.config.ts: base: '/roman-numerals/'
npm install -g gh-pages
npm run build
gh-pages -d dist
# Enable in repo settings: Settings → Pages → Source: gh-pages branch
```

## Success Criteria
- ✅ All four game modes functional
- ✅ Tutorial teaches all key concepts clearly
- ✅ Full bilingual support (English & Bulgarian)
- ✅ Conversion functions work correctly for 1-100
- ✅ Validation catches invalid Roman numerals
- ✅ Fully responsive on mobile devices (320px - 768px)
- ✅ Loads in < 3 seconds on 3G connection
- ✅ No TypeScript errors
- ✅ Deployed and accessible via public URL
- ✅ Works on iOS Safari and Android Chrome
- ✅ Level progression saves to localStorage
- ✅ Intuitive for kids to play after tutorial

## Optional Enhancements (If Time Permits)
- 🎵 Background music (Roman/classical theme)
- 🏆 Achievements system (badges for milestones)
- 📊 Progress tracking dashboard
- 🎮 Boss battles (complex conversion challenges)
- 👥 Multiplayer mode (compete with friends)
- 🔊 Audio pronunciation of numbers in both languages
- 🎨 Unlockable themes (different Roman eras)
- 📚 History facts about Roman numerals
- 🌟 Daily challenges
- 📈 Statistics and performance graphs
- 🎯 Timed speed rounds
- 💰 Virtual Roman coins as rewards

## Code Quality Requirements
- TypeScript strict mode enabled
- ESLint configured for React/TypeScript
- Component-based architecture
- Reusable UI components (Symbol tiles, number cards)
- Mobile-first CSS
- Semantic HTML
- Comments for conversion algorithms
- Unit tests for conversion functions (toRoman, toArabic, isValidRoman)

## Testing Checklist
- [ ] Test on iPhone (Safari)
- [ ] Test on Android phone (Chrome)
- [ ] Test all game modes complete successfully
- [ ] Test tutorial flow from start to finish
- [ ] Test conversion accuracy (edge cases: 4, 9, 40, 90, 99, 100)
- [ ] Test invalid Roman numeral detection (IIII, IL, VV)
- [ ] Test touch interactions (tap, drag, swipe)
- [ ] Test language toggle functionality
- [ ] Verify Bulgarian text displays correctly (Cyrillic characters)
- [ ] Test that language and level progress persist across sessions
- [ ] Verify responsive design at 375px, 414px, 768px
- [ ] Test in landscape mode
- [ ] Verify loading states and error handling
- [ ] Check local storage persistence

## Delivery
Provide:
1. GitHub repository URL
2. Live deployment URL
3. README with:
   - How to run locally
   - How to deploy
   - Game instructions
   - Educational goals
   - Screenshots/GIF demo
4. Estimated 3-4 hours total development time for MVP

---

**Start Command**: `npm create vite@latest roman-numerals -- --template react-ts`
**Target Completion**: 1-2 days for full featured version
**Primary Focus**: Educational, fun, historically themed, mobile-optimized
**Age Range**: 7-12 years old (more complex than months game)
