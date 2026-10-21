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
              className={`flex flex-col items-center justify-center p-3 rounded-hero min-h-[86px] sm:min-h-[94px] transition-all duration-150 active:scale-95 shadow-sm text-center relative overflow-hidden group border-2 ${
                isDone
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 scale-[0.98] ring-2 ring-emerald-200'
                  : isWobbling
                  ? 'bg-rose-50 border-rose-500 text-rose-700 animate-bounce'
                  : 'bg-white border-hero-border text-hero-black hover:border-hero-red hover:shadow-md'
              }`}
            >
              {isDone && (
                <span className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full w-5 h-5 text-[0.65rem] flex items-center justify-center font-black shadow-xs">
                  ✓
                </span>
              )}
              <span className="text-3xl sm:text-4xl leading-none mb-1 group-hover:scale-105 transition-transform">
                {item.emoji}
              </span>
              <span className="font-black text-xs sm:text-sm leading-tight text-hero-black">
                {item.label}
              </span>
            </button>
          );
        })}
      </footer>
    );
  }

  // CASE B: Standard Choices Grid
  const gridColsClass = choices.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <footer className={`grid ${gridColsClass} gap-2.5 sm:gap-3.5 w-full`}>
      {choices.map((choice, idx) => {
        const isSelected = selectedIndex === idx;
        const isCorrectChoice = choice.isCorrect;

        let statusStyle = 'bg-white border-2 border-hero-border text-hero-black hover:border-slate-300 hover:shadow-md';

        if (isAnswered) {
          if (isSelected) {
            statusStyle = isCorrectChoice
              ? 'bg-hero-successBg border-2 border-hero-success text-hero-success scale-[1.03] shadow-lg ring-2 ring-emerald-300'
              : 'bg-hero-dangerBg border-2 border-hero-danger text-hero-danger scale-[0.97] shadow-sm ring-2 ring-rose-300';
          } else if (isCorrectChoice) {
            statusStyle = 'bg-emerald-50 border-2 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200';
          }
        }

        const isPureNumber = /^[0-9]+$/.test(choice.label.trim());

        return (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => onSelectChoice(idx)}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-hero min-h-[82px] sm:min-h-[88px] transition-all duration-150 active:scale-95 shadow-sm text-center relative overflow-hidden group ${statusStyle}`}
          >
            {/* Visual: Real Photo thumbnail or Emoji/SVG */}
            {choice.visual ? (
              <div
                className="text-2xl sm:text-3xl leading-none mb-1 group-hover:scale-105 transition-transform"
                dangerouslySetInnerHTML={{ __html: choice.visual }}
              />
            ) : null}

            {/* Choice Label */}
            <span
              className={`font-black leading-tight line-clamp-2 ${
                isPureNumber ? 'text-2xl sm:text-3xl text-hero-black' : 'text-xs sm:text-sm'
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
