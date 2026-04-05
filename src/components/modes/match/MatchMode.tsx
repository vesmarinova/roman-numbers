import { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import { useSound } from '../../../hooks/useSound';
import { useTimer } from '../../../hooks/useTimer';
import { toRoman } from '../../../utils/converter';
import { shuffle } from '../../../utils/shuffle';
import { Button } from '../../ui/Button';
import { Timer } from '../../ui/Timer';
import { Celebration } from '../../ui/Celebration';

type Phase = 'select' | 'play' | 'result';

interface Card {
  id: string;
  display: string;
  pairKey: number;
  flipped: boolean;
  matched: boolean;
}

function generateCards(pairCount: number): Card[] {
  const nums = new Set<number>();
  while (nums.size < pairCount) {
    nums.add(Math.floor(Math.random() * 50) + 1);
  }
  const cards: Card[] = [];
  for (const n of nums) {
    cards.push({ id: `a-${n}`, display: String(n), pairKey: n, flipped: false, matched: false });
    cards.push({ id: `r-${n}`, display: toRoman(n), pairKey: n, flipped: false, matched: false });
  }
  return shuffle(cards);
}

export function MatchMode() {
  const { t } = useLanguage();
  const { state, dispatch } = useGame();
  const { play } = useSound();

  const [phase, setPhase] = useState<Phase>('select');
  const [pairCount, setPairCount] = useState(6);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const timer = useTimer({ mode: 'elapsed', initialSeconds: 0 });

  const startGame = (pairs: number) => {
    setPairCount(pairs);
    setCards(generateCards(pairs));
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsChecking(false);
    setPhase('play');
    timer.reset();
    setTimeout(() => timer.start(), 100);
  };

  const handleCardClick = useCallback((id: string) => {
    if (isChecking) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;

    play('flip');
    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((fid) => newCards.find((c) => c.id === fid)!);

      if (first.pairKey === second.pairKey) {
        play('match');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => c.pairKey === first.pairKey ? { ...c, matched: true } : c)
          );
          setMatchedPairs((mp) => mp + 1);
          setFlippedIds([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, flipped: false } : c
            )
          );
          setFlippedIds([]);
          setIsChecking(false);
        }, 800);
      }
    }
  }, [cards, flippedIds, isChecking, play]);

  // Check for game completion
  useEffect(() => {
    if (phase === 'play' && matchedPairs === pairCount && pairCount > 0) {
      timer.stop();
      play('fanfare');
      dispatch({ type: 'SET_BEST_TIME', key: `match-${pairCount}`, time: timer.seconds });
      setShowCelebration(true);
      setTimeout(() => setPhase('result'), 500);
    }
  }, [matchedPairs, pairCount, phase]);

  if (phase === 'select') {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="font-roman text-2xl font-bold text-roman-dark">{t('quickMatch')}</h2>
        <p className="text-roman-brown">{t('quickMatchDesc')}</p>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Button variant="secondary" size="lg" onClick={() => startGame(6)}>
            6 {t('pairs')} (3×4)
          </Button>
          <Button variant="secondary" size="lg" onClick={() => startGame(8)}>
            8 {t('pairs')} (4×4)
          </Button>
          <Button variant="secondary" size="lg" onClick={() => startGame(12)}>
            12 {t('pairs')} (4×6)
          </Button>
        </div>
        {state.bestTimes[`match-6`] && (
          <p className="text-sm text-roman-brown">
            {t('personalBest')}: {state.bestTimes[`match-6`]}s (6 {t('pairs')})
          </p>
        )}
      </div>
    );
  }

  if (phase === 'result') {
    const best = state.bestTimes[`match-${pairCount}`];
    const isNewRecord = best === timer.seconds;
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-4 animate-pop-in">
        <h2 className="font-roman text-2xl font-bold text-roman-dark">{t('allMatched')}</h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-roman-brown">{t('time')}</div>
            <div className="font-bold text-xl">{timer.seconds}s</div>
          </div>
          <div>
            <div className="text-sm text-roman-brown">{t('moves')}</div>
            <div className="font-bold text-xl">{moves}</div>
          </div>
        </div>
        {isNewRecord && <div className="text-gold-dark font-bold text-lg animate-bounce">🏆 {t('newRecord')}</div>}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => startGame(pairCount)}>{t('playAgain')}</Button>
          <Button variant="ghost" onClick={() => setPhase('select')}>{t('mainMenu')}</Button>
        </div>
        <Celebration show={showCelebration} onDone={() => setShowCelebration(false)} />
      </div>
    );
  }

  const cols = pairCount <= 6 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="text-sm text-roman-brown">{t('moves')}: {moves}</div>
        <div className="text-sm text-roman-brown">{matchedPairs}/{pairCount} {t('pairs')}</div>
        <Timer seconds={timer.seconds} />
      </div>

      <div className={`grid ${cols} gap-2 w-full`}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched || card.flipped}
            className={`aspect-square rounded-xl border-2 font-roman font-bold text-lg sm:text-xl
              transition-all duration-300 cursor-pointer select-none
              ${card.matched
                ? 'border-correct bg-correct-bg text-correct scale-95'
                : card.flipped
                  ? 'border-gold bg-white text-roman-dark'
                  : 'border-gold/30 bg-gradient-to-b from-roman-dark to-roman-brown text-transparent hover:border-gold'
              }`}
          >
            {card.flipped || card.matched ? card.display : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}
