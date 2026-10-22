'use client';

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
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [result.passed]);

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="liquid-glass-modal rounded-[36px] w-full max-w-sm p-6 text-center animate-pop relative overflow-hidden liquid-lens-sheen shadow-2xl">
        {/* Top Hero Icon with Liquid Aura */}
        <div className="text-5xl mb-2 drop-shadow-md">
          {result.passed ? '🌟' : '💪'}
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-1 drop-shadow-xs">
          {result.passed ? 'Luar Biasa Kak Reza!' : 'Semangat Kak Reza!'}
        </h3>

        <p className="text-xs font-bold text-slate-500 mb-4 leading-relaxed">
          {result.passed
            ? `Hebat! Misi ${dayName} berhasil dituntaskan dengan nilai ${result.percentage}%!`
            : `Skor Kak Reza ${result.percentage}% (belum mencapai 50%). Yuk ulangi lagi dengan variasi soal baru!`}
        </p>

        {/* Big Score Liquid Glass Orb */}
        <div className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-full liquid-glass border-4 border-rose-500 mb-4 shadow-[0_8px_24px_rgba(244,63,94,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
          <span className="text-3xl font-black text-hero-red leading-none drop-shadow-xs">
            {result.score}
          </span>
          <span className="text-[0.7rem] font-black text-slate-500 mt-1">
            dari {result.total} Benar
          </span>
        </div>

        {/* Score Badges */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <span className="px-3.5 py-1 rounded-full liquid-tint-emerald text-xs font-black shadow-sm">
            ✅ Benar: {result.score}
          </span>
          <span className="px-3.5 py-1 rounded-full liquid-tint-rose text-xs font-black shadow-sm">
            ❌ Salah: {result.wrong}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          {result.passed ? (
            <>
              <button
                onClick={onNextDay}
                className="w-full flex items-center justify-center gap-2 liquid-tint-ruby text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-lg liquid-interactive liquid-lens-sheen"
              >
                <span>Lanjut ke {nextDayName}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 liquid-glass text-slate-700 hover:text-slate-900 font-black text-xs py-2.5 px-4 rounded-xl liquid-interactive liquid-lens-sheen"
              >
                <RotateCcw size={14} />
                <span>Mainkan Lagi Hari Ini (Soal Baru)</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 liquid-tint-ruby text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-lg liquid-interactive liquid-lens-sheen"
              >
                <RotateCcw size={16} />
                <span>Ulangi {dayName} Sekarang (Variasi Baru)</span>
              </button>

              <button
                onClick={onGoHome}
                className="w-full flex items-center justify-center gap-2 liquid-glass text-slate-600 hover:text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl liquid-interactive liquid-lens-sheen"
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
