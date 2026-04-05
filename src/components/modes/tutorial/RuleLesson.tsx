import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../../ui/Button';

interface RuleLessonProps {
  rule: 'additive' | 'subtractive' | 'repetition';
  onNext: () => void;
}

const EXAMPLES: Record<string, { roman: string; parts: string; value: number }[]> = {
  additive: [
    { roman: 'VI', parts: '5 + 1', value: 6 },
    { roman: 'XI', parts: '10 + 1', value: 11 },
    { roman: 'LX', parts: '50 + 10', value: 60 },
  ],
  subtractive: [
    { roman: 'IV', parts: '5 − 1', value: 4 },
    { roman: 'IX', parts: '10 − 1', value: 9 },
    { roman: 'XL', parts: '50 − 10', value: 40 },
  ],
  repetition: [
    { roman: 'III', parts: '1 + 1 + 1', value: 3 },
    { roman: 'XXX', parts: '10 + 10 + 10', value: 30 },
    { roman: 'IIII ✗', parts: '', value: 0 },
  ],
};

export function RuleLesson({ rule, onNext }: RuleLessonProps) {
  const { t } = useLanguage();
  const titleKey = `${rule}Rule` as const;
  const explainKey = `${rule}Explain` as const;
  const examples = EXAMPLES[rule];

  return (
    <div className="text-center animate-pop-in w-full max-w-sm">
      <div className="text-4xl mb-3">{rule === 'additive' ? '➕' : rule === 'subtractive' ? '➖' : '🔢'}</div>
      <h3 className="font-roman text-xl font-bold text-roman-dark mb-2">{t(titleKey)}</h3>
      <p className="text-roman-brown mb-5">{t(explainKey)}</p>

      <div className="space-y-3">
        {examples.map((ex, i) => (
          <div
            key={i}
            className={`flex items-center justify-center gap-3 p-3 rounded-xl border ${
              ex.value === 0 ? 'bg-wrong-bg border-wrong/30' : 'bg-white border-gold/30'
            }`}
          >
            <span className="font-roman text-2xl font-bold text-roman-dark">{ex.roman}</span>
            {ex.value > 0 && (
              <>
                <span className="text-roman-brown">=</span>
                <span className="text-roman-brown">{ex.parts}</span>
                <span className="text-roman-brown">=</span>
                <span className="font-bold text-gold-dark text-xl">{ex.value}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button variant="secondary" onClick={onNext}>{t('next')} →</Button>
      </div>
    </div>
  );
}
