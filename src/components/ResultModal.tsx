import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowRight, Home } from 'lucide-react';
import { DailyResult } from '../types';

interface ResultModalProps {
  result: DailyResult;
  onRetry: () => void;
  onNextDay: () => void;
  onGoHome: () => void;
  dayName: string;
  nextDayName: string;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  onRetry,
  onNextDay,
  onGoHome,
  dayName,
  nextDayName
}) => {
  useEffect(() => {
    if (result.passed) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [result.passed]);

  return (
    <div className="fixed inset-0 bg-hero-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-hero-lg border-2 border-hero-border shadow-2xl w-full max-w-sm p-6 text-center animate-pop relative">
        {/* Top Hero Icon */}
        <div className="text-5xl mb-2">
          {result.passed ? '🌟' : '💪'}
        </div>

        <h3 className="text-xl font-black text-hero-black mb-1">
          {result.passed ? 'Luar Biasa Kak Reza!' : 'Semangat Kak Reza!'}
        </h3>

        <p className="text-xs font-bold text-slate-500 mb-4 leading-relaxed">
          {result.passed
            ? `Hebat! Misi ${dayName} berhasil dituntaskan dengan nilai ${result.percentage}%!`
            : `Skor Kak Reza ${result.percentage}% (belum mencapai 50%). Yuk ulangi lagi dengan variasi soal baru!`}
        </p>

        {/* Big Score Circle */}
        <div className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-50 border-4 border-hero-red mb-4 shadow-sm">
          <span className="text-3xl font-black text-hero-red leading-none">
            {result.score}
          </span>
          <span className="text-[0.7rem] font-black text-slate-400 mt-1">
            dari {result.total} Benar
          </span>
        </div>

        {/* Score Badges */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
            ✅ Benar: {result.score}
          </span>
          <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
            ❌ Salah: {result.wrong}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          {result.passed ? (
            <>
              <button
                onClick={onNextDay}
                className="w-full flex items-center justify-center gap-2 bg-hero-red text-white font-black text-sm py-3 px-4 rounded-xl shadow-hero-red hover:bg-hero-crimson transition-all active:scale-95"
              >
                <span>Lanjut ke {nextDayName}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-hero-black font-black text-xs py-2.5 px-4 rounded-xl hover:bg-slate-200 transition-all active:scale-95"
              >
                <RotateCcw size={14} />
                <span>Mainkan Lagi Hari Ini (Soal Baru)</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 bg-hero-red text-white font-black text-sm py-3 px-4 rounded-xl shadow-hero-red hover:bg-hero-crimson transition-all active:scale-95"
              >
                <RotateCcw size={16} />
                <span>Ulangi {dayName} Sekarang (Variasi Baru)</span>
              </button>

              <button
                onClick={onGoHome}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-slate-200 transition-all active:scale-95"
              >
                <Home size={14} />
                <span>Kembali ke Menu Awal</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
