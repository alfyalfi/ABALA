'use client';

import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { ActiveQuestion } from '../types';
import { audioService } from '../services/audioService';

interface QuestionCardProps {
  question: ActiveQuestion;
  dayIcon: string;
  feedbackToast: {
    show: boolean;
    text: string;
    type: 'correct' | 'wrong' | 'timeout';
  };
  seqStep?: number;
  seqCompletedIds?: string[];
  isAudioPlaying?: boolean;
  builtLetters?: string[];
  countedItems?: number[];
  onTapCountItem?: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  dayIcon,
  feedbackToast,
  seqStep = 1,
  seqCompletedIds = [],
  isAudioPlaying = false,
  builtLetters = [],
  countedItems = [],
  onTapCountItem
}) => {
  const [isManualPlaying, setIsManualPlaying] = useState(false);

  const handlePlayAuthenticSound = async () => {
    if (!question.soundFile) return;
    setIsManualPlaying(true);
    await audioService.playSoundFile(question.soundFile);
    setIsManualPlaying(false);
  };

  const isSoundPlaying = isAudioPlaying || isManualPlaying;

  // Auto-scale calculations for multiple items (prevents scrollbars)
  const additionCount = Math.max(question.plateA?.length || 0, question.plateB?.length || 0);
  const additionEmojiSize = additionCount > 4 ? 'text-lg sm:text-xl' : additionCount > 2 ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl';

  const subtractionTotal = (question.remainingCount || 0) + (question.subtractedCount || 0);
  const subtractionEmojiSize = subtractionTotal > 8 ? 'text-base sm:text-lg' : subtractionTotal > 4 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl';

  const countItemsLen = question.countItems?.length || 0;
  const countBtnClass = countItemsLen > 10
    ? 'min-w-[34px] min-h-[34px] p-0.5'
    : countItemsLen > 6
    ? 'min-w-[40px] min-h-[40px] sm:min-w-[46px] sm:min-h-[46px] p-1'
    : 'min-w-[48px] min-h-[48px] sm:min-w-[54px] sm:min-h-[54px] p-1.5';
  const countEmojiClass = countItemsLen > 10
    ? 'text-lg sm:text-xl'
    : countItemsLen > 6
    ? 'text-xl sm:text-2xl'
    : 'text-2xl sm:text-3xl';
  const countBadgeClass = countItemsLen > 10
    ? 'text-[0.52rem] px-1'
    : countItemsLen > 6
    ? 'text-[0.58rem] px-1.5'
    : 'text-[0.65rem] px-1.5';
  const countGapClass = countItemsLen > 10 ? 'gap-1' : countItemsLen > 6 ? 'gap-1.5' : 'gap-2';

  const visualCleanLength = (question.visual || '⭐').replace(/<[^>]*>/g, '').trim().length;
  const generalVisualSize = visualCleanLength > 20
    ? 'text-xl sm:text-2xl'
    : visualCleanLength > 8
    ? 'text-2xl sm:text-3xl'
    : 'text-4xl sm:text-5xl';

  return (
    <main className="liquid-glass-card rounded-3xl sm:rounded-[32px] flex flex-col items-center justify-between p-2.5 sm:p-4 text-center relative w-full h-full overflow-hidden liquid-lens-sheen">
      {/* Toast Notification Top (Floating Liquid Pill) */}
      <div
        className={`absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-black text-xs sm:text-sm shadow-xl transition-all duration-300 pointer-events-none z-30 whitespace-nowrap liquid-lens-sheen ${
          feedbackToast.show
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-90'
        } ${
          feedbackToast.type === 'correct'
            ? 'liquid-tint-emerald'
            : feedbackToast.type === 'timeout'
            ? 'liquid-tint-amber'
            : 'liquid-tint-rose'
        }`}
      >
        {feedbackToast.text}
      </div>

      {/* Topic Badge (Refractive Liquid Glass Pill) */}
      <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-black uppercase tracking-wider text-hero-red liquid-glass-pill px-3 py-0.5 shadow-xs shrink-0">
        <span className="text-sm drop-shadow-xs">{dayIcon}</span>
        <span>{question.topic}</span>
      </div>

      {/* Main Prompt */}
      <h2 className="text-xs sm:text-sm md:text-base font-black text-slate-800 leading-tight max-w-md my-0.5 line-clamp-2 drop-shadow-xs shrink-0">
        {question.prompt}
      </h2>

      {/* ======================================================== */}
      {/* CENTER STAGE ACCORDING TO PEDAGOGICAL QUESTION TYPE     */}
      {/* (100% NO SCROLLBAR - AUTO-SCALED TO FIT ALWAYS)         */}
      {/* ======================================================== */}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-0.5 relative min-h-0 overflow-hidden">
        
        {/* CASE 1: ADDITION (Papan Penjumlahan Superhero) */}
        {question.type === 'addition' && question.plateA && question.plateB ? (
          <div className="liquid-glass-subtle rounded-2xl p-2 sm:p-2.5 w-full max-w-sm shadow-inner flex flex-col items-center justify-center overflow-hidden">
            <div className="text-[0.65rem] font-black text-hero-red mb-1 uppercase tracking-wider flex items-center gap-1">
              <span>➕ Papan Penjumlahan Superhero:</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 w-full overflow-hidden">
              {/* Plate A */}
              <div className="flex flex-col items-center justify-center liquid-glass p-1.5 sm:p-2 rounded-2xl flex-1 min-h-[50px] shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {question.plateA.map((ico, idx) => (
                    <span key={idx} className={`${additionEmojiSize} leading-none drop-shadow-xs`}>{ico}</span>
                  ))}
                </div>
                <span className="text-[0.62rem] font-black text-slate-500 mt-0.5">
                  {question.plateA.length} {question.itemName || 'Benda'}
                </span>
              </div>

              {/* Plus Sign */}
              <span className="text-xl sm:text-2xl font-black text-hero-red drop-shadow-sm shrink-0">➕</span>

              {/* Plate B */}
              <div className="flex flex-col items-center justify-center liquid-glass p-1.5 sm:p-2 rounded-2xl flex-1 min-h-[50px] shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {question.plateB.map((ico, idx) => (
                    <span key={idx} className={`${additionEmojiSize} leading-none drop-shadow-xs`}>{ico}</span>
                  ))}
                </div>
                <span className="text-[0.62rem] font-black text-slate-500 mt-0.5">
                  {question.plateB.length} {question.itemName || 'Benda'}
                </span>
              </div>
            </div>
          </div>
        ) : question.type === 'subtraction' ? (
          /* CASE: SUBTRACTION (Papan Pengurangan Superhero) */
          <div className="liquid-glass-subtle rounded-2xl p-2 w-full max-w-sm shadow-inner flex flex-col items-center justify-center overflow-hidden">
            <div className="text-[0.65rem] font-black text-hero-red mb-1 uppercase tracking-wider">
              ➖ Papan Pengurangan Superhero:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 liquid-glass p-1.5 sm:p-2 rounded-2xl w-full min-h-[50px] shadow-sm overflow-hidden">
              {/* Remaining Items */}
              {Array(question.remainingCount || 0).fill(question.itemEmoji || '🍎').map((ico, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-emerald-500/15 border border-emerald-400/50 backdrop-blur-md p-1 rounded-xl shadow-xs">
                  <span className={`${subtractionEmojiSize} leading-none drop-shadow-xs`}>{ico}</span>
                  <span className="text-[0.52rem] font-black text-emerald-800 mt-0.5">Sisa {idx + 1}</span>
                </div>
              ))}

              {/* Subtracted Items */}
              {Array(question.subtractedCount || 0).fill(question.itemEmoji || '🍎').map((ico, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-rose-500/15 border border-rose-400/50 backdrop-blur-md p-1 rounded-xl opacity-60 relative">
                  <span className={`${subtractionEmojiSize} leading-none`}>{ico}</span>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-rose-600 drop-shadow-sm">❌</span>
                  <span className="text-[0.52rem] font-black text-rose-700 mt-0.5">Hilang</span>
                </div>
              ))}
            </div>
          </div>
        ) : (question.type === 'touch_count' || question.type === 'counting') && question.countItems ? (
          /* CASE: TOUCH COUNTING QUESTIONS - DYNAMIC SCALING */
          <div className="liquid-glass-subtle rounded-2xl p-2 w-full max-w-sm shadow-inner flex flex-col items-center justify-center overflow-hidden">
            <div className="text-[0.65rem] font-black text-slate-500 mb-1 uppercase tracking-wider flex items-center gap-1">
              <span>👆 Sentuh Benda untuk Menghitung:</span>
            </div>
            <div className={`flex flex-wrap items-center justify-center ${countGapClass} p-0.5 w-full overflow-hidden`}>
              {question.countItems.map((itemIco, idx) => {
                const isCounted = countedItems.includes(idx);
                const countBadgeNum = countedItems.indexOf(idx) + 1;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onTapCountItem && onTapCountItem(idx)}
                    className={`flex flex-col items-center justify-center rounded-xl transition-all duration-150 active:scale-90 ${countBtnClass} liquid-interactive liquid-lens-sheen ${
                      isCounted
                        ? 'liquid-tint-emerald scale-105 ring-2 ring-white/70 shadow-[0_4px_12px_rgba(16,185,129,0.35)]'
                        : 'liquid-glass hover:bg-white/80'
                    }`}
                  >
                    <span className={`${countEmojiClass} leading-none drop-shadow-xs`}>{itemIco}</span>
                    <span
                      className={`font-black mt-0.5 rounded-full ${countBadgeClass} ${
                        isCounted ? 'bg-white/30 text-white' : 'text-slate-500'
                      }`}
                    >
                      {isCounted ? countBadgeNum : idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : question.type === 'word_builder' && question.targetWord ? (
          /* CASE 2: WORD / NAME BUILDER SLOTS */
          <div className="liquid-glass-subtle rounded-2xl p-2 sm:p-2.5 w-full max-w-sm shadow-inner flex flex-col items-center justify-center overflow-hidden">
            <div className="text-[0.68rem] font-black text-hero-black mb-1.5 uppercase tracking-wider">
              {question.wordLabel || 'Susun Kata'}
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
              {question.targetWord.map((ltr, lIdx) => {
                const isFilled = builtLetters.length > lIdx;
                const char = isFilled ? builtLetters[lIdx] : '';
                const isCurrentSlot = builtLetters.length === lIdx;

                return (
                  <div
                    key={lIdx}
                    className={`w-10 h-12 sm:w-12 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all duration-200 liquid-lens-sheen shadow-sm ${
                      isFilled
                        ? 'liquid-tint-emerald text-white scale-105 shadow-md'
                        : isCurrentSlot
                        ? 'liquid-glass border-2 border-hero-red text-hero-red ring-4 ring-rose-400/40 animate-pulse'
                        : 'liquid-glass-subtle border-2 border-dashed border-slate-300 text-slate-400'
                    }`}
                  >
                    {isFilled ? char : isCurrentSlot ? '?' : ''}
                  </div>
                );
              })}
            </div>
          </div>
        ) : question.type === 'sound' && question.soundFile ? (
          /* CASE 3: REAL SOUND IDENTIFICATION */
          <div className="liquid-glass rounded-2xl p-3 sm:p-4 w-full max-w-xs shadow-md flex flex-col items-center justify-center overflow-hidden">
            <button
              type="button"
              onClick={handlePlayAuthenticSound}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full liquid-tint-ruby text-white flex items-center justify-center shadow-[0_10px_24px_rgba(220,38,38,0.5)] transition-all duration-200 active:scale-90 liquid-interactive liquid-lens-sheen ${
                isSoundPlaying ? 'ring-8 ring-rose-400/40 animate-pulse scale-105' : 'hover:scale-105'
              }`}
              title="Dengarkan Suara Asli"
            >
              <Volume2 size={30} className={isSoundPlaying ? 'animate-bounce text-amber-300' : ''} />
            </button>

            <span className="text-[0.72rem] font-black text-hero-red mt-2 flex items-center gap-1">
              <span>{isSoundPlaying ? 'Sedang Memutar Suara Asli...' : 'Ketuk untuk Putar Suara Asli'}</span>
            </span>

            <span className="text-[0.65rem] font-bold text-slate-500 mt-0.5">
              Dengarkan baik-baik, lalu tebak di bawah!
            </span>
          </div>
        ) : question.type === 'sequence_2' ? (
          /* CASE 4: SEQUENCE 2-STEP INTERACTIVE MEMORY MISSION */
          <div className="w-full max-w-sm flex flex-col items-center justify-center p-2.5 liquid-glass-subtle rounded-2xl shadow-xs overflow-hidden">
            <div className="text-[0.68rem] font-black uppercase tracking-wider text-hero-red mb-1.5">
              🎯 Misi Ingatan 2 Langkah
            </div>
            <div className="flex items-center justify-center gap-2 w-full">
              {/* Badge Step 1 */}
              <div
                className={`flex-1 py-1.5 px-2.5 rounded-xl border flex items-center justify-center gap-1 transition-all text-xs font-black liquid-lens-sheen ${
                  seqCompletedIds.includes(question.step1Target || '')
                    ? 'liquid-tint-emerald text-white shadow-xs'
                    : seqStep === 1
                    ? 'liquid-glass border-2 border-hero-red text-hero-red ring-4 ring-rose-400/40 animate-pulse'
                    : 'liquid-glass-subtle text-slate-700'
                }`}
              >
                <span>{seqCompletedIds.includes(question.step1Target || '') ? '✅' : '1️⃣'}</span>
                <span className="truncate">{question.step1Label || 'Langkah 1'}</span>
              </div>

              <span className="text-slate-400 font-black text-xs">➔</span>

              {/* Badge Step 2 */}
              <div
                className={`flex-1 py-1.5 px-2.5 rounded-xl border flex items-center justify-center gap-1 transition-all text-xs font-black liquid-lens-sheen ${
                  seqCompletedIds.includes(question.step2Target || '')
                    ? 'liquid-tint-emerald text-white shadow-xs'
                    : seqStep === 2
                    ? 'liquid-glass border-2 border-hero-red text-hero-red ring-4 ring-rose-400/40 animate-pulse'
                    : 'liquid-glass-subtle text-slate-400 border-dashed'
                }`}
              >
                <span>{seqCompletedIds.includes(question.step2Target || '') ? '✅' : '2️⃣'}</span>
                <span className="truncate">{question.step2Label || 'Langkah 2'}</span>
              </div>
            </div>
            <div className="text-[0.65rem] font-bold text-slate-500 mt-1.5">
              {seqStep === 1
                ? `👆 Sentuh benda PERTAMA di bawah: ${question.step1Label}`
                : `👆 Sekarang sentuh benda KEDUA: ${question.step2Label}`}
            </div>
          </div>
        ) : question.type === 'pattern' || question.type === 'sequence' ? (
          /* CASE 5: SEQUENCE / PATTERN MISSING NUMBER */
          <div className="liquid-glass-subtle rounded-2xl p-2.5 sm:p-3 w-full max-w-sm shadow-inner flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-black text-slate-800">
              {question.visual?.split('➔').map((chunk, cIdx) => (
                <React.Fragment key={cIdx}>
                  {cIdx > 0 && <span className="text-slate-400 text-sm sm:text-base">➔</span>}
                  {chunk.includes('?') ? (
                    <span className="liquid-tint-ruby text-white px-3 py-0.5 rounded-xl shadow-md animate-pulse">
                      ?
                    </span>
                  ) : (
                    <span className="liquid-glass px-3 py-0.5 rounded-xl shadow-xs">
                      {chunk.trim()}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : question.type === 'number_match' ? (
          /* CASE 6: NUMBER MATCHING */
          <div className="flex flex-col items-center justify-center overflow-hidden">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl liquid-tint-ruby flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-[0_10px_24px_rgba(220,38,38,0.45)] liquid-lens-sheen">
              {question.targetCount || question.visual?.replace(/[^0-9]/g, '') || question.prompt.match(/[0-9]/)?.[0] || '1'}
            </div>
            <span className="text-[0.68rem] font-black text-slate-500 mt-1">Cari kotak yang jumlahnya cocok!</span>
          </div>
        ) : (
          /* CASE 7: GENERAL VISUAL (Auto-scaled) */
          <div className="flex flex-col items-center justify-center p-1 overflow-hidden max-w-full">
            <div
              className={`${generalVisualSize} font-black text-slate-800 drop-shadow-md flex flex-wrap items-center justify-center gap-1 p-1 max-w-full overflow-hidden`}
              dangerouslySetInnerHTML={{ __html: question.visual || '⭐' }}
            />
          </div>
        )}
      </div>

      {/* Bottom Hint (Liquid Subtext Pill) */}
      <div className="w-full flex items-center justify-center gap-1 text-[0.68rem] font-bold text-slate-500 shrink-0">
        <Sparkles size={11} className="text-amber-500" />
        <span>
          {question.type === 'sequence_2'
            ? 'Sentuh benda berurutan di bawah ya Kak Reza!'
            : question.type === 'word_builder'
            ? 'Ketuk huruf satu-satu untuk menyusun kata!'
            : 'Pilih jawaban yang benar di bawah ya Kak Reza!'}
        </span>
      </div>
    </main>
  );
};
