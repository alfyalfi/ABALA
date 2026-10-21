import React from 'react';
import { ChoiceOption } from '../types';

interface ChoicesGridProps {
  choices: ChoiceOption[];
  onSelectChoice: (index: number) => void;
  selectedIndex: number | null;
  isAnswered: boolean;
}

export const ChoicesGrid: React.FC<ChoicesGridProps> = ({
  choices,
  onSelectChoice,
  selectedIndex,
  isAnswered
}) => {
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
            // Reveal the correct one gently if user picked wrong
            statusStyle = 'bg-emerald-50 border-2 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200';
          }
        }

        return (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => onSelectChoice(idx)}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-hero min-h-[82px] sm:min-h-[88px] transition-all duration-150 active:scale-95 shadow-sm text-center relative overflow-hidden group ${statusStyle}`}
          >
            {/* Visual: Real Photo thumbnail or Emoji/SVG */}
            {choice.realImage ? (
              <img
                src={choice.realImage}
                alt={choice.label}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover mb-1 border border-slate-200 shadow-2xs"
              />
            ) : choice.visual ? (
              <div
                className="text-2xl sm:text-3xl leading-none mb-1 group-hover:scale-110 transition-transform"
                dangerouslySetInnerHTML={{ __html: choice.visual }}
              />
            ) : null}

            {/* Choice Label */}
            <span className="text-xs sm:text-sm font-black leading-tight line-clamp-2">
              {choice.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
};
