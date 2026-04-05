import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import { useSound } from '../../../hooks/useSound';
import { LEVELS, SYMBOLS } from '../../../data/romans';
import { toRoman } from '../../../utils/converter';
import { Button } from '../../ui/Button';
import { LevelSelector } from '../../ui/LevelSelector';
import { ProgressBar } from '../../ui/ProgressBar';
import { ScoreDisplay } from '../../ui/ScoreDisplay';
import { NumberCard } from '../../ui/NumberCard';
import { RomanSymbolTile } from '../../ui/RomanSymbolTile';
import { Celebration } from '../../ui/Celebration';

type Phase = 'select' | 'play' | 'result';

function generateNumbers(min: number, max: number, count: number): number[] {
  const nums = new Set<number>();
  while (nums.size < Math.min(count, max - min + 1)) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return [...nums];
}

export function ConverterMode() {
  const { t } = useLanguage();
  const { state, dispatch } = useGame();
  const { play } = useSound();

  const [phase, setPhase] = useState<Phase>('select');
  const [levelId, setLevelId] = useState(1);
  const [questions, setQuestions] = useState<number[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [hintIdx, setHintIdx] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const level = LEVELS.find((l) => l.id === levelId)!;
  const allowedSymbols = useMemo(
    () => SYMBOLS.filter((s) => level.symbolsAllowed.includes(s.symbol)),
    [level]
  );

  const currentNumber = questions[qIdx];
  const expectedRoman = currentNumber ? toRoman(currentNumber) : '';
  const userRoman = answer.join('');

  const startLevel = (id: number) => {
    const lvl = LEVELS.find((l) => l.id === id)!;
    setLevelId(id);
    setQuestions(generateNumbers(lvl.range.min, lvl.range.max, lvl.questionsCount));
    setQIdx(0);
    setAnswer([]);
    setScore(0);
    setCorrectCount(0);
    setHintIdx(0);
    setFeedback(null);
    setPhase('play');
  };

  const addSymbol = useCallback((symbol: string) => {
    if (feedback) return;
    setAnswer((prev) => [...prev, symbol]);
    play('click');
  }, [feedback, play]);

  const removeLastSymbol = () => {
    if (feedback) return;
    setAnswer((prev) => prev.slice(0, -1));
  };

  const clearAnswer = () => {
    if (feedback) return;
    setAnswer([]);
    setHintIdx(0);
  };

  const showHint = () => {
    if (hintIdx < expectedRoman.length) {
      setAnswer(expectedRoman.slice(0, hintIdx + 1).split(''));
      setHintIdx(hintIdx + 1);
    }
  };

  const checkAnswer = () => {
    if (userRoman === expectedRoman) {
      setFeedback('correct');
      play('correct');
      const points = Math.max(10 - hintIdx * 2, 2);
      setScore((s) => s + points);
      setCorrectCount((c) => c + 1);
    } else {
      setFeedback('wrong');
      play('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setAnswer([]);
      setHintIdx(0);
      if (qIdx + 1 < questions.length) {
        setQIdx(qIdx + 1);
      } else {
        // Level complete
        const finalCorrect = correctCount + (userRoman === expectedRoman ? 1 : 0);
        if (finalCorrect >= Math.floor(level.questionsCount * 0.8)) {
          const nextLevel = levelId + 1;
          if (nextLevel <= LEVELS.length) {
            dispatch({ type: 'UNLOCK_LEVEL', mode: 'converter', level: nextLevel });
          }
        }
        dispatch({ type: 'SET_HIGH_SCORE', key: `converter-${levelId}`, score: score });
        setShowCelebration(true);
        setPhase('result');
      }
    }, 1200);
  };

  if (phase === 'select') {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="font-roman text-2xl font-bold text-roman-dark">{t('converter')}</h2>
        <p className="text-roman-brown">{t('converterDesc')}</p>
        <LevelSelector
          unlockedLevels={state.unlockedLevels.converter}
          onSelect={startLevel}
        />
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 animate-pop-in">
        <h2 className="font-roman text-2xl font-bold text-roman-dark">{t('roundComplete')}</h2>
        <ScoreDisplay score={score} />
        <p className="text-roman-brown">
          {correctCount}/{questions.length} {t('correct')}
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => startLevel(levelId)}>
            {t('playAgain')}
          </Button>
          <Button variant="ghost" onClick={() => setPhase('select')}>
            {t('mainMenu')}
          </Button>
        </div>
        <Celebration show={showCelebration} onDone={() => setShowCelebration(false)} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between">
        <ScoreDisplay score={score} />
        <ProgressBar current={qIdx + 1} total={questions.length} />
      </div>

      {/* Target number */}
      <p className="text-roman-brown text-sm">{t('buildRoman')}</p>
      <NumberCard value={currentNumber} size="lg" />

      {/* User's answer */}
      <div className={`w-full min-h-[80px] p-4 rounded-2xl border-2 text-center font-roman text-4xl font-bold
        transition-colors duration-300 flex items-center justify-center gap-1
        ${feedback === 'correct' ? 'border-correct bg-correct-bg' : ''}
        ${feedback === 'wrong' ? 'border-wrong bg-wrong-bg animate-shake' : ''}
        ${!feedback ? 'border-gold/40 bg-white' : ''}`}
      >
        {answer.length > 0 ? (
          answer.map((s, i) => (
            <span key={i} className="animate-pop-in text-roman-dark">{s}</span>
          ))
        ) : (
          <span className="text-roman-brown/30 text-lg font-normal">{t('tapToAdd')}</span>
        )}
      </div>

      {feedback && (
        <div className={`text-lg font-bold ${feedback === 'correct' ? 'text-correct' : 'text-wrong'}`}>
          {feedback === 'correct' ? `✓ ${t('correct')}` : `✗ ${t('wrong')} → ${expectedRoman}`}
        </div>
      )}

      {/* Symbol palette */}
      <div className="flex flex-wrap gap-2 justify-center">
        {allowedSymbols.map((s) => (
          <RomanSymbolTile
            key={s.symbol}
            symbol={s.symbol}
            value={s.value}
            showValue
            size="lg"
            onClick={() => addSymbol(s.symbol)}
            disabled={!!feedback}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap justify-center">
        <Button variant="ghost" size="sm" onClick={removeLastSymbol} disabled={answer.length === 0 || !!feedback}>
          ⌫ 
        </Button>
        <Button variant="ghost" size="sm" onClick={clearAnswer} disabled={answer.length === 0 || !!feedback}>
          {t('clear')}
        </Button>
        <Button variant="ghost" size="sm" onClick={showHint} disabled={!!feedback}>
          💡 {t('hint')}
        </Button>
        <Button variant="primary" size="md" onClick={checkAnswer} disabled={answer.length === 0 || !!feedback}>
          {t('check')} ✓
        </Button>
      </div>
    </div>
  );
}
