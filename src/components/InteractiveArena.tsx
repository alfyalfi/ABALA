import React from 'react';
import { ChoiceOption, SequenceItem } from '../types';

interface InteractiveArenaProps {
  questionType?: string;
  choices: ChoiceOption[];
  onSelectChoice: (index: number) => void;
  selectedIndex: number | null;
  isAnswered: boolean;

  // Sequence 2 Props
  sequenceItems?: SequenceItem[];
  onSelectSequenceItem?: (item: SequenceItem) => void;
  seqCompletedIds?: string[];
  seqWobbleId?: string | null;

  // Word Builder Props
  targetWord?: string[];
  letterChoices?: string[];
  builtLetters?: string[];
  onSelectLetter?: (letter: string, index: number) => void;
  usedLetterIndices?: number[];

  // Comparison Props
  isComparison?: boolean;
}

export const InteractiveArena: React.FC<InteractiveArenaProps> = ({
  questionType,
  choices,
  onSelectChoice,
  selectedIndex,
  isAnswered,
  sequenceItems,
  onSelectSequenceItem,
  seqCompletedIds = [],
  seqWobbleId = null,
  targetWord = [],
  letterChoices = [],
  builtLetters = [],
  onSelectLetter,
  usedLetterIndices = [],
}) => {

  // ========================================================
  // MODE 1: WORD / NAME BUILDER (Menyusun Huruf Kata / Nama)
  // ========================================================
  if (questionType === 'word_builder' && letterChoices && letterChoices.length > 0 && onSelectLetter) {
    const palette = [
      'bg-red-500 hover:bg-red-600 text-white border-red-600',
      'bg-blue-500 hover:bg-blue-600 text-white border-blue-600',
      'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600',
      'bg-amber-500 hover:bg-amber-600 text-white border-amber-600',
      'bg-purple-500 hover:bg-purple-600 text-white border-purple-600',
      'bg-rose-500 hover:bg-rose-600 text-white border-rose-600'
    ];

    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-2 bg-slate-50/80 rounded-3xl border-2 border-slate-200 shadow-inner">
        <div className="text-[0.72rem] font-black uppercase tracking-wider text-hero-red mb-2">
          🔤 Ketuk Huruf Secara Berurutan:
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 w-full max-w-md">
          {letterChoices.map((ltr, idx) => {
            const isUsed = usedLetterIndices.includes(idx);
            const colorClass = palette[idx % palette.length];

            return (
              <button
                key={idx}
                disabled={isUsed || isAnswered}
                onClick={() => onSelectLetter(ltr, idx)}
                className={`flex items-center justify-center h-16 sm:h-20 rounded-2xl text-3xl sm:text-4xl font-black shadow-md border-b-4 transition-all duration-150 active:scale-90 active:border-b-0 ${
                  isUsed
                    ? 'opacity-20 scale-90 pointer-events-none bg-slate-300 text-slate-500 border-slate-400'
                    : colorClass
                }`}
              >
                {ltr}
              </button>
            );
          })}
        </div>
        <div className="text-[0.68rem] font-bold text-slate-400 mt-2">
          {builtLetters.length < targetWord.length
            ? `Cari huruf ke-${builtLetters.length + 1}: ${targetWord[builtLetters.length]}`
            : '🌟 Kata Lengkap! Hebat Kak Reza!'}
        </div>
      </div>
    );
  }

  // ========================================================
  // MODE 2: SEQUENCE 2-STEP INTERACTIVE MISSION
  // ========================================================
  if (questionType === 'sequence_2' && sequenceItems && sequenceItems.length > 0 && onSelectSequenceItem) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-1.5 sm:p-2">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full h-full max-w-lg">
          {sequenceItems.map((item) => {
            const isDone = seqCompletedIds.includes(item.id);
            const isWobbling = seqWobbleId === item.id;

            return (
              <button
                key={item.id}
                disabled={isDone || isAnswered}
                onClick={() => onSelectSequenceItem(item)}
                className={`flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-150 active:scale-95 shadow-sm text-center relative overflow-hidden group border-2 sm:border-3 ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 scale-[0.98] ring-4 ring-emerald-200'
                    : isWobbling
                    ? 'bg-rose-50 border-rose-500 text-rose-700 animate-bounce'
                    : 'bg-white border-hero-border text-hero-black hover:border-hero-red hover:shadow-lg'
                }`}
              >
                {isDone && (
                  <span className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-black shadow-sm">
                    ✓
                  </span>
                )}
                <span className="text-4xl sm:text-5xl leading-none mb-1 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="font-black text-sm sm:text-base leading-tight text-hero-black mt-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ========================================================
  // MODE 3: COMPARISON BATTLE CARDS (Side-by-Side 50/50 Split)
  // ========================================================
  if (questionType === 'comparison' && choices.length === 2) {
    return (
      <div className="w-full h-full flex items-center justify-center p-1.5 sm:p-2">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full h-full max-w-lg">
          {choices.map((choice, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectChoice = choice.isCorrect;

            let cardStyle = 'bg-white border-2 sm:border-3 border-hero-border text-hero-black hover:border-hero-red hover:shadow-xl';

            if (isAnswered) {
              if (isSelected) {
                cardStyle = isCorrectChoice
                  ? 'bg-emerald-50 border-2 sm:border-3 border-hero-success text-hero-success scale-[1.03] shadow-xl ring-4 ring-emerald-300'
                  : 'bg-rose-50 border-2 sm:border-3 border-hero-danger text-hero-danger scale-[0.97] shadow-sm ring-4 ring-rose-300';
              } else if (isCorrectChoice) {
                cardStyle = 'bg-emerald-50 border-2 sm:border-3 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => onSelectChoice(idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-150 active:scale-95 shadow-md relative overflow-hidden group ${cardStyle}`}
              >
                {/* Visual Items Plate */}
                {choice.visual && (
                  <div className="flex-1 flex flex-wrap items-center justify-center gap-1.5 max-w-[140px] text-2xl sm:text-3xl leading-snug my-2 group-hover:scale-105 transition-transform bg-slate-50 p-2.5 rounded-2xl border border-slate-100 w-full shadow-inner">
                    {choice.visual}
                  </div>
                )}

                {/* Choice Label */}
                <span className="font-black text-xs sm:text-sm text-hero-black text-center mt-1">
                  {choice.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ========================================================
  // MODE 4: STANDARD CHOICES GRID (Generous 50% Height, 2 or 3 Columns)
  // ========================================================
  const gridColsClass = choices.length === 2 ? 'grid-cols-2' : 'grid-cols-3';
  const isAllPureNumbers = choices.every(c => /^[0-9]+$/.test(c.label.trim()));

  return (
    <div className="w-full h-full flex items-center justify-center p-1.5 sm:p-2">
      <div className={`grid ${gridColsClass} gap-2.5 sm:gap-3.5 w-full h-full max-w-lg`}>
        {choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrectChoice = choice.isCorrect;

          let statusStyle = 'bg-white border-2 sm:border-3 border-hero-border text-hero-black hover:border-hero-red hover:shadow-lg';

          if (isAnswered) {
            if (isSelected) {
              statusStyle = isCorrectChoice
                ? 'bg-hero-successBg border-2 sm:border-3 border-hero-success text-hero-success scale-[1.03] shadow-xl ring-4 ring-emerald-300'
                : 'bg-hero-dangerBg border-2 sm:border-3 border-hero-danger text-hero-danger scale-[0.97] shadow-sm ring-4 ring-rose-300';
            } else if (isCorrectChoice) {
              statusStyle = 'bg-emerald-50 border-2 sm:border-3 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200';
            }
          }

          const isPureNumber = /^[0-9]+$/.test(choice.label.trim());

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => onSelectChoice(idx)}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-3xl transition-all duration-150 active:scale-95 shadow-md text-center relative overflow-hidden group ${statusStyle}`}
            >
              {/* Optional Visual */}
              {choice.visual ? (
                <div
                  className="text-3xl sm:text-4xl leading-none mb-1.5 group-hover:scale-110 transition-transform"
                  dangerouslySetInnerHTML={{ __html: choice.visual }}
                />
              ) : null}

              {/* Label */}
              <span
                className={`font-black leading-tight line-clamp-2 ${
                  isPureNumber
                    ? 'text-3xl sm:text-5xl text-hero-black tracking-tight'
                    : 'text-xs sm:text-sm'
                }`}
              >
                {choice.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
