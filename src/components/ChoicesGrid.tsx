'use client';

import React from 'react';
import { ChoiceOption, SequenceItem } from '../types';

interface ChoicesGridProps {
  choices: ChoiceOption[];
  onSelectChoice: (index: number) => void;
  selectedIndex: number | null;
  isAnswered: boolean;
  questionType?: string;
  sequenceItems?: SequenceItem[];
  onSelectSequenceItem?: (item: SequenceItem) => void;
  seqCompletedIds?: string[];
  seqWobbleId?: string | null;
}

export const ChoicesGrid: React.FC<ChoicesGridProps> = ({
  choices,
  onSelectChoice,
  selectedIndex,
  isAnswered,
  questionType,
  sequenceItems,
  onSelectSequenceItem,
  seqCompletedIds = [],
  seqWobbleId = null
}) => {
  // CASE A: Interactive 2-Step Sequence Mission Grid
  if (questionType === 'sequence_2' && sequenceItems && sequenceItems.length > 0 && onSelectSequenceItem) {
    return (
      <footer className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
        {sequenceItems.map((item) => {
          const isDone = seqCompletedIds.includes(item.id);
          const isWobbling = seqWobbleId === item.id;

          return (
            <button
              key={item.id}
              disabled={isDone || isAnswered}
              onClick={() => onSelectSequenceItem(item)}
              className={`flex flex-col items-center justify-center p-3 rounded-3xl min-h-[86px] sm:min-h-[94px] transition-all duration-200 active:scale-95 text-center relative overflow-hidden group liquid-interactive liquid-lens-sheen ${
                isDone
                  ? 'liquid-tint-emerald text-white scale-[0.98] ring-4 ring-emerald-300/60 shadow-lg'
                  : isWobbling
                  ? 'liquid-tint-rose text-white animate-bounce'
                  : 'liquid-glass text-slate-800 hover:bg-white/80'
              }`}
            >
              {isDone && (
                <span className="absolute top-2 right-2 bg-white/30 text-white rounded-full w-5 h-5 text-[0.65rem] flex items-center justify-center font-black shadow-xs backdrop-blur-md">
                  ✓
                </span>
              )}
              <span className="text-3xl sm:text-4xl leading-none mb-1 group-hover:scale-105 transition-transform drop-shadow-xs">
                {item.emoji}
              </span>
              <span className="font-black text-xs sm:text-sm leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </footer>
    );
  }

  // CASE B: Standard 3-Choices Grid
  return (
    <footer className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
      {choices.map((choice, idx) => {
        const isSelected = selectedIndex === idx;
        const isCorrectChoice = choice.isCorrect;

        let statusStyle = 'liquid-glass text-slate-800 hover:bg-white/80';

        if (isAnswered) {
          if (isSelected) {
            statusStyle = isCorrectChoice
              ? 'liquid-tint-emerald text-white scale-[1.03] ring-4 ring-emerald-300/60 shadow-2xl'
              : 'liquid-tint-rose text-white scale-[0.97] ring-4 ring-rose-300/60 shadow-sm';
          } else if (isCorrectChoice) {
            statusStyle = 'liquid-tint-emerald text-white opacity-85 ring-2 ring-white/60';
          }
        }

        const isPureNumber = /^[0-9]+$/.test(choice.label.trim());

        return (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => onSelectChoice(idx)}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-3xl min-h-[82px] sm:min-h-[92px] transition-all duration-200 active:scale-95 text-center relative overflow-hidden group liquid-interactive liquid-lens-sheen ${statusStyle}`}
          >
            {choice.visual && (
              <span
                className="text-2xl sm:text-3xl leading-none mb-1 group-hover:scale-105 transition-transform drop-shadow-xs"
                dangerouslySetInnerHTML={{ __html: choice.visual }}
              />
            )}
            <span
              className={`font-black leading-tight line-clamp-2 ${
                isPureNumber
                  ? 'text-3xl sm:text-4xl tracking-tight drop-shadow-xs'
                  : 'text-xs sm:text-sm'
              }`}
            >
              {choice.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
};
