import { LEVELS } from '../../data/romans';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';

interface LevelSelectorProps {
  unlockedLevels: number[];
  onSelect: (levelId: number) => void;
}

export function LevelSelector({ unlockedLevels, onSelect }: LevelSelectorProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {LEVELS.map((level) => {
        const isUnlocked = unlockedLevels.includes(level.id);
        return (
          <Button
            key={level.id}
            variant={isUnlocked ? 'secondary' : 'ghost'}
            size="lg"
            disabled={!isUnlocked}
            onClick={() => onSelect(level.id)}
            className="w-full flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              {isUnlocked ? '⭐' : '🔒'}
              <span>{level.name[lang]}</span>
            </span>
            <span className="text-sm opacity-70">{level.range.min}–{level.range.max}</span>
          </Button>
        );
      })}
    </div>
  );
}
