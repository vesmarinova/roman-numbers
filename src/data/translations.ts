export type Language = 'en' | 'bg';

type TranslationStrings = {
  [key: string]: { en: string; bg: string };
};

export const T: TranslationStrings = {
  // App
  appTitle: { en: 'Roman Numerals', bg: 'Римски цифри' },
  appSubtitle: { en: 'Learning Game', bg: 'Образователна игра' },

  // Navigation
  back: { en: 'Back', bg: 'Назад' },
  home: { en: 'Home', bg: 'Начало' },
  settings: { en: 'Settings', bg: 'Настройки' },
  playAgain: { en: 'Play Again', bg: 'Играй отново' },
  mainMenu: { en: 'Main Menu', bg: 'Главно меню' },
  next: { en: 'Next', bg: 'Напред' },
  start: { en: 'Start', bg: 'Старт' },
  continue: { en: 'Continue', bg: 'Продължи' },

  // Game Modes
  tutorial: { en: 'Tutorial', bg: 'Урок' },
  tutorialDesc: { en: 'Learn the symbols & rules', bg: 'Научи символите и правилата' },
  converter: { en: 'Number Builder', bg: 'Конструктор' },
  converterDesc: { en: 'Build Roman numerals', bg: 'Построй римски цифри' },
  challenge: { en: 'Challenge', bg: 'Предизвикателство' },
  challengeDesc: { en: 'Test your knowledge', bg: 'Провери знанията си' },
  quickMatch: { en: 'Quick Match', bg: 'Бърз мач' },
  quickMatchDesc: { en: 'Memory card game', bg: 'Игра с карти' },

  // Settings
  language: { en: 'Language', bg: 'Език' },
  sound: { en: 'Sound', bg: 'Звук' },
  soundOn: { en: 'On', bg: 'Вкл.' },
  soundOff: { en: 'Off', bg: 'Изкл.' },

  // Levels
  level: { en: 'Level', bg: 'Ниво' },
  locked: { en: 'Locked', bg: 'Заключено' },
  unlocked: { en: 'Unlocked', bg: 'Отключено' },
  beginner: { en: 'Beginner', bg: 'Начинаещи' },
  intermediate: { en: 'Intermediate', bg: 'Средно ниво' },
  advanced: { en: 'Advanced', bg: 'Напреднали' },

  // Game
  score: { en: 'Score', bg: 'Точки' },
  streak: { en: 'Streak', bg: 'Поредица' },
  time: { en: 'Time', bg: 'Време' },
  correct: { en: 'Correct!', bg: 'Вярно!' },
  wrong: { en: 'Wrong!', bg: 'Грешно!' },
  hint: { en: 'Hint', bg: 'Подсказка' },
  check: { en: 'Check', bg: 'Провери' },
  clear: { en: 'Clear', bg: 'Изчисти' },
  submit: { en: 'Submit', bg: 'Изпрати' },

  // Converter Mode
  buildRoman: { en: 'Build the Roman numeral for:', bg: 'Построй римската цифра за:' },
  tapToAdd: { en: 'Tap symbols to build', bg: 'Натисни символите за да построиш' },
  yourAnswer: { en: 'Your answer:', bg: 'Твоят отговор:' },

  // Challenge Mode
  whatNumber: { en: 'What number is this?', bg: 'Кое число е това?' },
  timeUp: { en: "Time's up!", bg: 'Времето изтече!' },
  bestStreak: { en: 'Best Streak', bg: 'Най-добра поредица' },
  accuracy: { en: 'Accuracy', bg: 'Точност' },
  roundComplete: { en: 'Round Complete!', bg: 'Рундът завърши!' },

  // Match Mode
  matchPairs: { en: 'Match the pairs!', bg: 'Намери двойките!' },
  pairs: { en: 'Pairs', bg: 'Двойки' },
  moves: { en: 'Moves', bg: 'Ходове' },
  personalBest: { en: 'Personal Best', bg: 'Личен рекорд' },
  newRecord: { en: 'New Record!', bg: 'Нов рекорд!' },
  allMatched: { en: 'All matched!', bg: 'Всички намерени!' },

  // Tutorial
  tutorialIntro: { en: 'Romans counted differently!', bg: 'Римляните броели различно!' },
  tutorialIntroDesc: {
    en: 'They used letters instead of digits. Let\'s learn how!',
    bg: 'Използвали букви вместо цифри. Нека научим как!'
  },
  symbolMeans: { en: 'means', bg: 'означава' },
  additiveRule: { en: 'Additive Rule', bg: 'Правило за събиране' },
  additiveExplain: {
    en: 'When a smaller symbol comes AFTER a bigger one, ADD them.',
    bg: 'Когато по-малък символ е СЛЕД по-голям, СЪБИРАМЕ ги.'
  },
  subtractiveRule: { en: 'Subtractive Rule', bg: 'Правило за изваждане' },
  subtractiveExplain: {
    en: 'When a smaller symbol comes BEFORE a bigger one, SUBTRACT it.',
    bg: 'Когато по-малък символ е ПРЕДИ по-голям, ИЗВАЖДАМЕ го.'
  },
  repetitionRule: { en: 'Repetition Rule', bg: 'Правило за повторение' },
  repetitionExplain: {
    en: 'You can repeat I, X, C up to 3 times. Never repeat V or L.',
    bg: 'Можеш да повтариш I, X, C до 3 пъти. Никога V или L.'
  },
  quizTime: { en: 'Quiz Time!', bg: 'Време за тест!' },
  tutorialComplete: { en: 'Tutorial Complete!', bg: 'Урокът е завършен!' },
  tutorialCompleteDesc: {
    en: 'You now know the basics! Go play the games!',
    bg: 'Вече знаеш основите! Отиди и играй!'
  },

  // Celebration
  congratulations: { en: 'Congratulations!', bg: 'Поздравления!' },
  levelComplete: { en: 'Level Complete!', bg: 'Нивото е завършено!' },
  greatJob: { en: 'Great job!', bg: 'Страхотна работа!' },

  // Questions for quiz
  question: { en: 'Question', bg: 'Въпрос' },
  of: { en: 'of', bg: 'от' },
};
