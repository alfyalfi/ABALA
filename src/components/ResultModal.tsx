'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { RotateCcw, ArrowRight, Home, Sparkles, Trophy, Award } from 'lucide-react';
import { DailyResult } from '../types';
import { AchievementDefinition, CollectibleDefinition } from '../types/progression';

interface ResultModalProps {
  result: DailyResult;
  xpAwarded: number;
  currentLevel: number;
  levelTitle: string;
  newAchievements?: AchievementDefinition[];
  newCollectibles?: CollectibleDefinition[];
  onRetry: () => void;
  onNextDay: () => void;
  onGoHome: () => void;
  onGoToRoom: () => void;
  dayName: string;
  nextDayName: string;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  xpAwarded,
  currentLevel,
  levelTitle,
  newAchievements = [],
  newCollectibles = [],
  onRetry,
  onNextDay,
  onGoHome,
  onGoToRoom,
  dayName,
  nextDayName,
}) => {
  useEffect(() => {
    if (result.passed) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  }, [result.passed]);

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="liquid-glass-modal rounded-[36px] w-full max-w-sm p-5 sm:p-6 text-center animate-pop relative overflow-hidden liquid-lens-sheen shadow-2xl border border-white/70 my-auto">
        {/* Top Hero Icon with Liquid Aura */}
        <div className="text-5xl mb-2 drop-shadow-md">
          {result.passed ? '🌟' : '💪'}
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-1 drop-shadow-xs">
          {result.passed ? 'Luar Biasa Kak Reza!' : 'Semangat Kak Reza!'}
        </h3>

        <p className="text-xs font-bold text-slate-500 mb-3 leading-relaxed">
          {result.passed
            ? `Hebat! Misi ${dayName} tuntas dengan nilai ${result.percentage}%!`
            : `Skor Kak Reza ${result.percentage}% (belum mencapai 50%). Yuk ulangi lagi dengan variasi soal baru!`}
        </p>

        {/* Big Score Liquid Glass Orb */}
        <div className="inline-flex flex-col items-center justify-center w-22 h-22 sm:w-24 sm:h-24 rounded-full liquid-glass border-4 border-rose-500 mb-3 shadow-[0_8px_24px_rgba(244,63,94,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
          <span className="text-3xl font-black text-hero-red leading-none drop-shadow-xs">
            {result.score}
          </span>
          <span className="text-[0.65rem] font-black text-slate-500 mt-0.5">
            dari {result.total} Benar
          </span>
        </div>

        {/* XP and Level Summary Pill */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-xs">
            <span>⚡ +{xpAwarded} XP</span>
          </div>
          <div className="flex items-center gap-1 liquid-tint-ruby text-white px-3 py-1 rounded-full text-xs font-black shadow-xs">
            <span>Level {currentLevel}</span>
          </div>
        </div>

        {/* Unlocked Collectibles Callout */}
        {newCollectibles.length > 0 && (
          <div className="mb-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-left">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 mb-1">
              <Sparkles size={14} className="text-amber-500 animate-spin" />
              <span>Barang Baru untuk Kamar!</span>
            </div>
            {newCollectibles.map((col) => (
              <div key={col.id} className="flex items-center justify-between text-xs font-bold text-slate-800 mt-1">
                <span className="flex items-center gap-1">
                  <span>{col.iconEmoji}</span>
                  <span>{col.name}</span>
                </span>
                <span className="text-[0.62rem] text-amber-800 bg-white/80 px-2 py-0.5 rounded-full font-black">
                  Buka!
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Unlocked Achievements Callout */}
        {newAchievements.length > 0 && (
          <div className="mb-3 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-left">
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 mb-1">
              <Trophy size={14} className="text-hero-red" />
              <span>Pencapaian Baru Terbuka!</span>
            </div>
            {newAchievements.map((ach) => (
              <div key={ach.id} className="flex items-center justify-between text-xs font-bold text-slate-800 mt-1">
                <span className="flex items-center gap-1">
                  <span>{ach.icon}</span>
                  <span>{ach.title}</span>
                </span>
                <span className="text-[0.62rem] text-hero-red bg-white/80 px-2 py-0.5 rounded-full font-black">
                  +{ach.xpReward} XP
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Score Badges */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="px-3 py-0.5 rounded-full liquid-tint-emerald text-xs font-black shadow-xs">
            ✅ Benar: {result.score}
          </span>
          <span className="px-3 py-0.5 rounded-full liquid-tint-rose text-xs font-black shadow-xs">
            ❌ Salah: {result.wrong}
          </span>
        </div>

        {/* Formative Assessment: Keahlian yang Dikuasai */}
        {result.masteredSkills && result.masteredSkills.length > 0 && (
          <div className="mb-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 mb-1.5">
              <span>🌟 Keahlian yang Dikuasai:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {result.masteredSkills.slice(0, 5).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[0.65rem] font-bold capitalize bg-white/90 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-300 shadow-xs"
                >
                  ✓ {skill}
                </span>
              ))}
              {result.masteredSkills.length > 5 && (
                <span className="text-[0.62rem] font-black text-emerald-600 px-1.5 py-0.5 self-center">
                  +{result.masteredSkills.length - 5} lainnya
                </span>
              )}
            </div>
          </div>
        )}

        {/* Formative Assessment: Rekomendasi Stimulasi Ramah Anak */}
        {result.practiceSuggestions && result.practiceSuggestions.length > 0 && (
          <div className="mb-3 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-left">
            <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 mb-1">
              <span>💡 Saran Stimulasi Kak Reza:</span>
            </div>
            <p className="text-[0.68rem] text-slate-600 font-bold leading-relaxed mb-1.5">
              Kak Reza hebat sudah berusaha! Yuk luangkan waktu bermain sambil melatih:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.practiceSuggestions.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[0.65rem] font-bold capitalize bg-white/90 text-blue-800 px-2 py-0.5 rounded-lg border border-blue-300 shadow-xs"
                >
                  🎯 {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          {newCollectibles.length > 0 && (
            <button
              onClick={onGoToRoom}
              className="w-full flex items-center justify-center gap-2 liquid-tint-amber text-slate-950 font-black text-xs py-3 px-4 rounded-2xl shadow-md liquid-interactive"
            >
              <Sparkles size={16} />
              <span>Lihat di Kamar 3D Kak Reza</span>
            </button>
          )}

          {result.passed ? (
            <>
              <button
                onClick={onNextDay}
                className="w-full flex items-center justify-center gap-2 liquid-tint-ruby text-white font-black text-xs py-3 px-4 rounded-2xl shadow-lg liquid-interactive"
              >
                <span>Lanjut ke {nextDayName}</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 liquid-glass text-slate-700 hover:text-slate-900 font-black text-xs py-2.5 px-4 rounded-xl liquid-interactive"
              >
                <RotateCcw size={14} />
                <span>Ulangi dengan Soal Baru</span>
              </button>
            </>
          ) : (
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 liquid-tint-ruby text-white font-black text-xs py-3 px-4 rounded-2xl shadow-lg liquid-interactive"
            >
              <RotateCcw size={15} />
              <span>Coba Lagi Bersama!</span>
            </button>
          )}

          <button
            onClick={onGoHome}
            className="w-full flex items-center justify-center gap-2 liquid-glass text-slate-600 hover:text-slate-900 font-bold text-xs py-2 px-3 rounded-xl"
          >
            <Home size={14} />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
