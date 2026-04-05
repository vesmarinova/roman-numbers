import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import { useSound } from '../../../hooks/useSound';
import { useTimer } from '../../../hooks/useTimer';
import { LEVELS } from '../../../data/romans';
import { toRoman, breakdownRoman } from '../../../utils/converter';
import { generateDistractors } from '../../../utils/distractor';
import { shuffle } from '../../../utils/shuffle';
import { Button } from '../../ui/Button';
import { LevelSelector } from '../../ui/LevelSelector';
import { Timer } from '../../ui/Timer';
import { ProgressBar } from '../../ui/ProgressBar';
import { ScoreDisplay } from '../../ui/ScoreDisplay';
import { StreakCounter } from '../../ui/StreakCounter';
import { Celebration } from '../../ui/Celebration';

type Phase = 'select' | 'play' | 'result';

function generateQuestionSet(min: number, max: number, count: number) {
  const nums = new Set<number>();
  while (nums.size < Math.min(count, max - min + 1)) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return [...nums].map((n) => {
    const distractors = generateDistractors(n, min, max);
    return {
      roman: toRoman(n),
      correct: n,
      options: shuffle([n, ...distractors]),
    };
  });
}

export function ChallengeMode() {
  const { t } = useLanguage();
  const { state, dispatch } = useGame();
  const { play } = useSound();

  const [phase, setPhase] = useState<Phase>('select');
  const [levelId, setLevelId] = useState(1);
  const [questions, setQuestions] = useState<{ roman: string; correct: number; options: number[] }[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const level = LEVELS.find((l) => l.id === levelId)!;

  const handleTimeUp = useCallback(() => {
    setFeedback('timeout');
    play('wrong');
    setStreak(0);
    setTimeout(() => advanceQuestion(), 1500);
  }, []);

  const timer = useTimer({ mode: 'countdown', initialSeconds: 30, onComplete: handleTimeUp });

  const q = questions[qIdx];
  const breakdown = useMemo(() => (q ? breakdownRoman(q.roman) : []), [q]);

  const startLevel = (id: number) => {
    const lvl = LEVELS.find((l) => l.id === id)!;
    setLevelId(id);
    setQuestions(generateQuestionSet(lvl.range.min, lvl.range.max, lvl.questionsCount));
    setQIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setSelected(null);
    setFeedback(null);
    setPhase('play');
    timer.reset();
    setTimeout(() => timer.start(), 100);
  };

  const advanceQuestion = () => {
    setSelected(null);
    setFeedback(null);
    if (qIdx + 1 < questions.length) {
      setQIdx((i) => i + 1);
      timer.reset();
      setTimeout(() => timer.start(), 100);
    } else {
      timer.stop();
      dispatch({ type: 'SET_HIGH_SCORE', key: `challenge-${levelId}`, score });
      dispatch({ type: 'SET_BEST_STREAK', key: `challenge-${levelId}`, streak: bestStreak });
      if (correctCount >= Math.floor(level.questionsCount * 0.8)) {
        const next = levelId + 1;
        if (next <= LEVELS.length) {
          dispatch({ type: 'UNLOCK_LEVEL', mode: 'challenge', level: next });
        }
      }
      setShowCelebration(true);
      setPhase('result');
    }
  };

  const handleSelect = (val: number) => {
    if (selected !== null || feedback) return;
    timer.stop();
    setSelected(val);

    if (val === q.correct) {
      setFeedback('correct');
      play('correct');
      const timeBonus = Math.max(timer.seconds, 0);
      setScore((s) => s + 10 + timeBonus);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setCorrectCount((c) => c + 1);
    } else {
      setFeedback('wrong');
      play('wrong');
      setStreak(0);
    }

    setTimeout(() => advanceQuestion(), 1500);
  };

  if (phase === 'select') {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="font-roman text-2xl font-bold text-roman-dark">{t('challenge')}</h2>
        <p className="text-roman-brown">{t('challengeDesc')}</p>
        <LevelSelector unlockedLevels={state.unlockedLevels.challenge} onSelect={startLevel} />
      </div>
    );
  }

  if (phase === 'result') {
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-4 animate-pop-in">
        <h2 className="font-roman text-2xl font-bold text-roman-dark">{t('roundComplete')}</h2>
        <ScoreDisplay score={score} />
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-roman-brown">{t('accuracy')}</div>
            <div className="font-bold text-xl text-roman-dark">{accuracy}%</div>
          </div>
          <div>
            <div className="text-sm text-roman-brown">{t('bestStreak')}</div>
            <div className="font-bold text-xl text-roman-dark">🔥 {bestStreak}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => startLevel(levelId)}>{t('playAgain')}</Button>
          <Button variant="ghost" onClick={() => setPhase('select')}>{t('mainMenu')}</Button>
        </div>
        <Celebration show={showCelebration} onDone={() => setShowCelebration(false)} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      {/* Header row */}
      <div className="w-full flex items-center justify-between">
        <ScoreDisplay score={score} />
        <StreakCounter streak={streak} />
        <Timer seconds={timer.seconds} />
      </div>
      <ProgressBar current={qIdx + 1} total={questions.length} />

      {/* Question */}
      <p className="text-roman-brown text-sm">{t('whatNumber')}</p>
      <div className="font-roman text-5xl sm:text-6xl font-bold text-roman-dark p-6 bg-white rounded-2xl border-2 border-gold shadow-lg">
        {q.roman}
      </div>

      {/* Breakdown on correct */}
      {feedback === 'correct' && (
        <div className="flex gap-2 flex-wrap justify-center animate-pop-in">
          {breakdown.map((part, i) => (
            <span key={i} className="px-2 py-1 bg-correct-bg rounded-lg text-correct text-sm font-bold">
              {part.part}={part.value}
            </span>
          ))}
        </div>
      )}

      {feedback === 'timeout' && (
        <div className="text-wrong font-bold text-lg">{t('timeUp')} → {q.correct}</div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {q.options.map((opt) => {
          let variant: 'secondary' | 'correct' | 'wrong' | 'ghost' = 'secondary';
          if (selected !== null) {
            if (opt === q.correct) variant = 'correct';
            else if (opt === selected) variant = 'wrong';
            else variant = 'ghost';
          }
          return (
            <Button
              key={opt}
              variant={variant}
              size="lg"
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className="text-2xl font-bold"
            >
              {opt}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
