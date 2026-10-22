'use client';

import React from 'react';
import { ChoiceOption, SequenceItem } from '../types';
import { audioService } from '../services/audioService';

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
  // Direct 1-Tap Response for Standard Choices
  const handleChoiceClick = (idx: number) => {
    if (isAnswered) return;
    audioService.playFeedback('step');
    onSelectChoice(idx);
  };

  // Direct 1-Tap Response for Sequence Items
  const handleSeqItemClick = (item: SequenceItem) => {
    if (isAnswered) return;
    audioService.playFeedback('step');
    if (onSelectSequenceItem) onSelectSequenceItem(item);
  };

  // Direct 1-Tap Response for Word Builder Letters
  const handleLetterClick = (ltr: string, idx: number) => {
    if (isAnswered) return;
    if (onSelectLetter) onSelectLetter(ltr, idx);
  };

  // ========================================================
  // MODE 1: WORD / NAME BUILDER (1-Tap to Place Letter)
  // ========================================================
  if (questionType === 'word_builder' && letterChoices && letterChoices.length > 0 && onSelectLetter) {
    const liquidTints = [
      'liquid-tint-ruby',
      'liquid-tint-azure',
      'liquid-tint-emerald',
      'liquid-tint-amber',
      'liquid-tint-rose',
      'liquid-tint-ruby'
    ];

    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-2 sm:p-2.5 liquid-glass-subtle rounded-3xl shadow-inner overflow-hidden">
        <div className="text-[0.7rem] font-black uppercase tracking-wider text-hero-red mb-1.5 flex items-center gap-1 shrink-0">
          <span>🔤 Ketuk Huruf untuk Menyusun Kata:</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5 w-full max-w-md overflow-hidden">
          {letterChoices.map((ltr, idx) => {
            const isUsed = usedLetterIndices.includes(idx);
            const tintClass = liquidTints[idx % liquidTints.length];

            return (
              <button
                key={idx}
                type="button"
                style={{ touchAction: 'manipulation' }}
                disabled={isUsed || isAnswered}
                onClick={() => handleLetterClick(ltr, idx)}
                className={`flex flex-col items-center justify-center h-14 sm:h-18 rounded-2xl sm:rounded-3xl text-2xl sm:text-3xl font-black transition-all duration-150 active:scale-90 relative liquid-interactive liquid-lens-sheen cursor-pointer ${
                  isUsed
                    ? 'opacity-20 scale-90 pointer-events-none liquid-glass text-slate-400'
                    : tintClass
                }`}
              >
                <span className="pointer-events-none drop-shadow-sm select-none">{ltr}</span>
              </button>
            );
          })}
        </div>
        <div className="text-[0.65rem] font-bold text-slate-500 mt-1.5 shrink-0">
          {builtLetters.length < targetWord.length
            ? `Cari huruf ke-${builtLetters.length + 1}: ${targetWord[builtLetters.length]}`
            : '🌟 Kata Lengkap! Hebat Kak Reza!'}
        </div>
      </div>
    );
  }

  // ========================================================
  // MODE 2: SEQUENCE 2-STEP INTERACTIVE MISSION (1-Tap Per Step)
  // ========================================================
  if (questionType === 'sequence_2' && sequenceItems && sequenceItems.length > 0 && onSelectSequenceItem) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-1 sm:p-1.5 overflow-hidden">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full h-full max-w-lg overflow-hidden">
          {sequenceItems.map((item) => {
            const isDone = seqCompletedIds.includes(item.id);
            const isWobbling = seqWobbleId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                style={{ touchAction: 'manipulation' }}
                disabled={isDone || isAnswered}
                onClick={() => handleSeqItemClick(item)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-3xl transition-all duration-150 active:scale-95 text-center relative overflow-hidden group liquid-interactive liquid-lens-sheen cursor-pointer ${
                  isDone
                    ? 'liquid-tint-emerald text-white scale-[0.98] ring-4 ring-emerald-300/60 shadow-lg'
                    : isWobbling
                    ? 'liquid-tint-rose text-white animate-bounce'
                    : 'liquid-glass text-slate-800 hover:bg-white/80'
                }`}
              >
                {/* Done Badge */}
                {isDone && (
                  <span className="pointer-events-none absolute top-2 right-2 bg-white/30 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-black shadow-sm backdrop-blur-md">
                    ✓
                  </span>
                )}

                <span className="pointer-events-none text-3xl sm:text-4xl leading-none mb-0.5 group-hover:scale-110 transition-transform drop-shadow-sm select-none">
                  {item.emoji}
                </span>

                <span className="pointer-events-none font-black text-xs sm:text-sm leading-tight mt-0.5 flex items-center justify-center gap-1 select-none">
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ========================================================
  // MODE 3: COMPARISON BATTLE CARDS (1-Tap Selection)
  // ========================================================
  if (questionType === 'comparison' && choices.length === 2) {
    return (
      <div className="w-full h-full flex items-center justify-center p-1 sm:p-1.5 overflow-hidden">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full h-full max-w-lg overflow-hidden">
          {choices.map((choice, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectChoice = choice.isCorrect;

            let cardStyle = 'liquid-glass text-slate-800 hover:bg-white/80';

            if (isAnswered) {
              if (isSelected) {
                cardStyle = isCorrectChoice
                  ? 'liquid-tint-emerald text-white scale-[1.03] shadow-2xl ring-4 ring-emerald-300/60'
                  : 'liquid-tint-rose text-white scale-[0.97] shadow-sm ring-4 ring-rose-300/60';
              } else if (isCorrectChoice) {
                cardStyle = 'liquid-tint-emerald text-white opacity-90 ring-2 ring-white/60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                style={{ touchAction: 'manipulation' }}
                disabled={isAnswered}
                onClick={() => handleChoiceClick(idx)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-3xl transition-all duration-150 active:scale-95 relative overflow-hidden group liquid-interactive liquid-lens-sheen cursor-pointer ${cardStyle}`}
              >
                {/* Visual Items Plate */}
                {choice.visual && (
                  <div className="pointer-events-none flex-1 flex flex-wrap items-center justify-center gap-1 max-w-[130px] text-xl sm:text-2xl leading-snug my-1 group-hover:scale-105 transition-transform liquid-glass-subtle p-2 rounded-2xl w-full shadow-inner select-none">
                    {choice.visual}
                  </div>
                )}

                {/* Choice Label */}
                <span className="pointer-events-none font-black text-xs sm:text-sm text-center mt-0.5 flex items-center justify-center gap-1 select-none">
                  <span>{choice.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ========================================================
  // MODE 4: STANDARD CHOICES GRID (1-Tap Direct Answer)
  // ========================================================
  const gridColsClass = choices.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="w-full h-full flex items-center justify-center p-1 sm:p-1.5 overflow-hidden">
      <div className={`grid ${gridColsClass} gap-2 sm:gap-2.5 w-full h-full max-w-lg overflow-hidden`}>
        {choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrectChoice = choice.isCorrect;

          let statusStyle = 'liquid-glass text-slate-800 hover:bg-white/80';

          if (isAnswered) {
            if (isSelected) {
              statusStyle = isCorrectChoice
                ? 'liquid-tint-emerald text-white scale-[1.03] shadow-2xl ring-4 ring-emerald-300/60'
                : 'liquid-tint-rose text-white scale-[0.97] shadow-sm ring-4 ring-rose-300/60';
            } else if (isCorrectChoice) {
              statusStyle = 'liquid-tint-emerald text-white opacity-85 ring-2 ring-white/60';
            }
          }

          const isPureNumber = /^[0-9]+$/.test(choice.label.trim());

          return (
            <button
              key={idx}
              type="button"
              style={{ touchAction: 'manipulation' }}
              disabled={isAnswered}
              onClick={() => handleChoiceClick(idx)}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-3xl transition-all duration-150 active:scale-95 text-center relative overflow-hidden group liquid-interactive liquid-lens-sheen cursor-pointer ${statusStyle}`}
            >
              {/* Optional Visual */}
              {choice.visual ? (
                <div
                  className="pointer-events-none text-2xl sm:text-3xl leading-none mb-1 group-hover:scale-110 transition-transform drop-shadow-xs select-none"
                  dangerouslySetInnerHTML={{ __html: choice.visual }}
                />
              ) : null}

              {/* Label */}
              <span
                className={`pointer-events-none font-black leading-tight line-clamp-2 flex items-center justify-center gap-1 select-none ${
                  isPureNumber
                    ? 'text-2xl sm:text-4xl tracking-tight drop-shadow-xs'
                    : 'text-xs sm:text-sm'
                }`}
              >
                <span>{choice.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
