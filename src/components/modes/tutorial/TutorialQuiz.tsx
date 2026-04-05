import { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { toRoman } from '../../../utils/converter';
import { shuffle } from '../../../utils/shuffle';
import { Button } from '../../ui/Button';

interface TutorialQuizProps {
  rule: 'additive' | 'subtractive' | 'repetition';
  onComplete: () => void;
}

interface QuizQuestion {
  roman: string;
  correct: number;
  options: number[];
}

function generateQuestions(rule: string): QuizQuestion[] {
  let numbers: number[];
  if (rule === 'additive') numbers = [6, 7, 11];
  else if (rule === 'subtractive') numbers = [4, 9, 40];
  else numbers = [3, 30, 8]; // repetition

  return numbers.map((n) => {
    const correct = n;
    const opts = new Set<number>([correct]);
    while (opts.size < 4) {
      const offset = Math.floor(Math.random() * 5) + 1;
      const candidate = correct + (Math.random() > 0.5 ? offset : -offset);
      if (candidate > 0 && candidate <= 100) opts.add(candidate);
    }
    return { roman: toRoman(n), correct, options: shuffle([...opts]) };
  });
}

export function TutorialQuiz({ rule, onComplete }: TutorialQuizProps) {
  const { t } = useLanguage();
  const questions = useMemo(() => generateQuestions(rule), [rule]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const q = questions[qIdx];

  const handleSelect = (val: number) => {
    if (selected !== null) return;
    setSelected(val);
    setIsCorrect(val === q.correct);

    setTimeout(() => {
      if (qIdx + 1 < questions.length) {
        setQIdx(qIdx + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        onComplete();
      }
    }, 1200);
  };

  return (
    <div className="text-center w-full max-w-sm animate-pop-in">
      <h3 className="font-roman text-lg font-bold text-roman-dark mb-1">{t('quizTime')}</h3>
      <p className="text-sm text-roman-brown mb-4">
        {t('question')} {qIdx + 1} {t('of')} {questions.length}
      </p>

      <div className="font-roman text-5xl font-bold text-roman-dark mb-6 p-4 bg-white rounded-2xl border-2 border-gold shadow-lg">
        {q.roman}
      </div>

      <p className="text-roman-brown mb-4">{t('whatNumber')}</p>

      <div className="grid grid-cols-2 gap-3">
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

      {isCorrect !== null && (
        <div className={`mt-4 text-lg font-bold ${isCorrect ? 'text-correct' : 'text-wrong'}`}>
          {isCorrect ? `✓ ${t('correct')}` : `✗ ${t('wrong')}`}
        </div>
      )}
    </div>
  );
}
