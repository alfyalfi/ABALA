import React, { useState, useEffect } from 'react';
import { Volume2, Play, Sparkles } from 'lucide-react';
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
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  dayIcon,
  feedbackToast
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // If question has a real sound file, play the authentic sound after prompt finishes!
  useEffect(() => {
    if (question.soundFile) {
      const timer = setTimeout(() => {
        handlePlayAuthenticSound();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [question.soundFile, question.prompt]);

  const handlePlayAuthenticSound = async () => {
    if (!question.soundFile) return;
    setIsPlayingSound(true);
    await audioService.playSoundFile(question.soundFile);
    setTimeout(() => setIsPlayingSound(false), 2000);
  };

  return (
    <main className="bg-white rounded-hero-lg border-2 border-hero-border shadow-hero-md flex-1 flex flex-col items-center justify-between p-4 sm:p-5 text-center relative mb-3 min-h-0 w-full overflow-hidden">
      {/* Toast Notification Top */}
      <div
        className={`absolute top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white font-black text-sm shadow-lg transition-all duration-200 pointer-events-none z-30 whitespace-nowrap ${
          feedbackToast.show
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-90'
        } ${
          feedbackToast.type === 'correct'
            ? 'bg-hero-success'
            : feedbackToast.type === 'timeout'
            ? 'bg-hero-gold'
            : 'bg-hero-danger'
        }`}
      >
        {feedbackToast.text}
      </div>

      {/* Topic Badge */}
      <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-black uppercase tracking-wider text-hero-red bg-red-50 border border-red-100 px-3 py-1 rounded-full">
        <span>{dayIcon}</span>
        <span>{question.topic}</span>
      </div>

      {/* Main Prompt */}
      <h2 className="text-base sm:text-lg font-black text-hero-black leading-snug max-w-md my-1.5">
        {question.prompt}
      </h2>

      {/* ======================================================== */}
      {/* CENTER STAGE ACCORDING TO PEDAGOGICAL QUESTION TYPE */}
      {/* ======================================================== */}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-1 relative min-h-[110px]">
        
        {/* CASE 1: COUNTING QUESTIONS (Menghitung Benda) */}
        {question.type === 'counting' && question.countItems ? (
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 w-full max-w-xs shadow-inner flex flex-col items-center justify-center">
            <div className="text-[0.7rem] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Hitung Benda di Bawah Ini:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {question.countItems.map((itemIco, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-white p-2 rounded-xl shadow-xs border border-slate-100 min-w-[48px] min-h-[48px]"
                >
                  <span className="text-3xl sm:text-4xl leading-none">{itemIco}</span>
                  <span className="text-[0.65rem] font-black text-slate-400 mt-1">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ) : question.type === 'sound' && question.soundFile ? (
          /* CASE 2: REAL SOUND IDENTIFICATION (Menyimak Suara Asli) */
          <div className="bg-gradient-to-b from-red-50 to-white border-2 border-hero-red/30 rounded-2xl p-4 w-full max-w-xs shadow-sm flex flex-col items-center justify-center">
            <button
              onClick={handlePlayAuthenticSound}
              className={`w-16 h-16 rounded-full bg-hero-red text-white flex items-center justify-center shadow-hero-red transition-all duration-200 active:scale-90 ${
                isPlayingSound ? 'ring-8 ring-red-200 animate-pulse scale-105' : 'hover:scale-105'
              }`}
              title="Dengarkan Suara Asli"
            >
              <Volume2 size={32} className={isPlayingSound ? 'animate-bounce text-hero-gold' : ''} />
            </button>

            <span className="text-xs font-black text-hero-red mt-2.5 flex items-center gap-1">
              <span>{isPlayingSound ? 'Sedang Memutar Suara Asli...' : 'Ketuk untuk Putar Suara Asli'}</span>
            </span>

            <span className="text-[0.68rem] font-bold text-slate-400 mt-0.5">
              Dengarkan baik-baik, lalu tebak hewannya di bawah!
            </span>
          </div>
        ) : question.type === 'sequence' ? (
          /* CASE 3: NUMBER SEQUENCE (Urutan Angka) */
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 w-full max-w-xs shadow-inner flex items-center justify-center">
            <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-black text-hero-black">
              {question.visual?.split('➔').map((chunk, cIdx) => (
                <React.Fragment key={cIdx}>
                  {cIdx > 0 && <span className="text-slate-300 text-lg">➔</span>}
                  {chunk.includes('?') ? (
                    <span className="bg-red-100 text-hero-red px-3 py-1 rounded-xl border-2 border-dashed border-hero-red animate-pulse">
                      ?
                    </span>
                  ) : (
                    <span className="bg-white px-3 py-1 rounded-xl shadow-xs border border-slate-200">
                      {chunk.trim()}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : question.type === 'number_match' ? (
          /* CASE 4: NUMBER MATCHING */
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-hero-black border-4 border-hero-red flex items-center justify-center text-3xl sm:text-4xl font-black text-hero-gold shadow-hero-md">
              {question.visual?.replace(/[^0-9]/g, '') || question.prompt.match(/[0-9]/)?.[0] || '1'}
            </div>
            <span className="text-xs font-black text-slate-400 mt-2">Cari kotak yang jumlahnya cocok!</span>
          </div>
        ) : (
          /* CASE 5: GENERAL VISUAL (Clean, Distinct Hero Subject) */
          <div className="flex flex-col items-center justify-center">
            <div
              className="text-4xl sm:text-5xl font-black text-hero-black drop-shadow-sm flex items-center justify-center p-2"
              dangerouslySetInnerHTML={{ __html: question.visual || '⭐' }}
            />
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex items-center justify-center gap-1 text-xs font-bold text-slate-400">
        <Sparkles size={12} className="text-hero-gold" />
        <span>Pilih jawaban yang benar di bawah ya Kak Reza!</span>
      </div>
    </main>
  );
};
