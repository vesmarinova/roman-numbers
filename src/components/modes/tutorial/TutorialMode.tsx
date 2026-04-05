import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import { SYMBOLS } from '../../../data/romans';
import { Button } from '../../ui/Button';
import { ProgressBar } from '../../ui/ProgressBar';
import { SymbolLesson } from './SymbolLesson';
import { RuleLesson } from './RuleLesson';
import { TutorialQuiz } from './TutorialQuiz';
import { Celebration } from '../../ui/Celebration';

type Step =
  | { type: 'intro' }
  | { type: 'symbol'; index: number }
  | { type: 'rule'; rule: 'additive' | 'subtractive' | 'repetition' }
  | { type: 'quiz'; rule: 'additive' | 'subtractive' | 'repetition' }
  | { type: 'complete' };

const STEPS: Step[] = [
  { type: 'intro' },
  { type: 'symbol', index: 0 }, // I
  { type: 'symbol', index: 1 }, // V
  { type: 'symbol', index: 2 }, // X
  { type: 'rule', rule: 'additive' },
  { type: 'quiz', rule: 'additive' },
  { type: 'rule', rule: 'subtractive' },
  { type: 'quiz', rule: 'subtractive' },
  { type: 'symbol', index: 3 }, // L
  { type: 'symbol', index: 4 }, // C
  { type: 'rule', rule: 'repetition' },
  { type: 'quiz', rule: 'repetition' },
  { type: 'complete' },
];

export function TutorialMode() {
  const { t } = useLanguage();
  const { dispatch } = useGame();
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const step = STEPS[stepIdx];
  const progress = stepIdx;
  const total = STEPS.length - 1;

  const goNext = () => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(stepIdx + 1);
    }
  };

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_TUTORIAL' });
    setShowCelebration(true);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      <ProgressBar current={progress} total={total} />

      {step.type === 'intro' && (
        <div className="text-center animate-pop-in">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="font-roman text-2xl font-bold text-roman-dark mb-2">
            {t('tutorialIntro')}
          </h2>
          <p className="text-roman-brown mb-6">{t('tutorialIntroDesc')}</p>
          <Button variant="secondary" size="lg" onClick={goNext}>
            {t('start')} →
          </Button>
        </div>
      )}

      {step.type === 'symbol' && (
        <SymbolLesson symbol={SYMBOLS[step.index]} onNext={goNext} />
      )}

      {step.type === 'rule' && (
        <RuleLesson rule={step.rule} onNext={goNext} />
      )}

      {step.type === 'quiz' && (
        <TutorialQuiz rule={step.rule} onComplete={goNext} />
      )}

      {step.type === 'complete' && (
        <div className="text-center animate-pop-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-roman text-2xl font-bold text-roman-dark mb-2">
            {t('tutorialComplete')}
          </h2>
          <p className="text-roman-brown mb-6">{t('tutorialCompleteDesc')}</p>
          <Button variant="secondary" size="lg" onClick={handleComplete}>
            {t('mainMenu')} 🏛️
          </Button>
        </div>
      )}

      <Celebration
        show={showCelebration}
        message={t('tutorialComplete')}
        onDone={() => navigate('/')}
      />
    </div>
  );
}
