'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Trophy,
  ArrowRight,
  Play,
  RotateCcw,
  BarChart2,
  Bell,
  BellOff,
  Flame,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { LiquidMeshBackground } from '../components/ui/LiquidGlassPrimitives';
import { GlobalNavBar } from '../components/GlobalNavBar';
import { ParentalGateModal } from '../components/ParentalGateModal';
import { ParentDashboardModal } from '../components/ParentDashboardModal';
import { StorageService } from '../services/storageService';
import { ProgressionService } from '../services/progressionService';
import { audioService } from '../services/audioService';
import { ACHIEVEMENT_CATALOG } from '../data/achievementCatalog';
import { COLLECTIBLE_CATALOG } from '../data/collectibleCatalog';
import {
  ProgressionState,
  ActiveLearningSessionState,
} from '../types/progression';
import { LearningPillarProgress } from '../types';
import { CATEGORIES_META } from '../data/categoriesMeta';

const PILLARS_CONFIG = CATEGORIES_META;

const PILLAR_KEYS: Record<number, keyof LearningPillarProgress> = {
  1: 'berhitung',
  2: 'membaca',
  3: 'menyimak',
  4: 'nalar',
  5: 'bentuk',
  6: 'kemandirian',
};

export default function HomeBasePage() {
  const router = useRouter();
  const [progression, setProgression] = useState<ProgressionState | null>(null);
  const [pillars, setPillars] = useState<LearningPillarProgress | null>(null);
  const [activeSession, setActiveSession] = useState<ActiveLearningSessionState | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showGate, setShowGate] = useState<boolean>(false);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);

  useEffect(() => {
    // Load state from local storage
    const prog = ProgressionService.getState();
    setProgression(prog);
    const pil = StorageService.getPillarProgress();
    setPillars(pil);
    const active = StorageService.getActiveSession();
    setActiveSession(active);
    setIsMuted(audioService.getMuted());
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioService.setMuted(nextMuted);
  };

  const handleSoundClick = () => {
    try {
      audioService.playFeedback('step');
    } catch (e) {}
  };

  if (!progression || !pillars) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-100">
        <div className="w-12 h-12 rounded-full border-4 border-hero-red border-t-transparent animate-spin" />
      </div>
    );
  }

  const levelInfo = StorageService.calculateLevelFromXp(progression.totalXp);
  const placedCount = Object.keys(progression.placedDecorations).length;

  // Next reward to unlock
  const nextCollectible = COLLECTIBLE_CATALOG.find(
    (c) =>
      !progression.unlockedCollectibleIds.includes(c.id) &&
      c.unlockRequirement.type === 'level'
  );

  return (
    <div className="min-h-screen w-full max-w-[640px] mx-auto flex flex-col bg-slate-50 text-slate-800 pb-24 relative select-none">
      <LiquidMeshBackground />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 p-3 sm:p-4 liquid-glass-pill mx-2.5 mt-2.5 shadow-sm border border-white/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-hero-red to-rose-600 text-white flex items-center justify-center font-black text-lg shadow-md ring-2 ring-white/60">
            ⚡
          </div>
          <div>
            <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">
              Superhero Belajar
            </div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
              Kak Reza
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Bunyikan Suara' : 'Matikan Suara'}
            className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red transition-colors"
          >
            {isMuted ? <BellOff size={16} /> : <Bell size={16} />}
          </button>

          <button
            onClick={() => setShowGate(true)}
            title="Area & Rapor Orang Tua"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl liquid-glass text-hero-red font-black text-xs hover:bg-white/80 transition-all"
          >
            <BarChart2 size={15} />
            <span className="hidden sm:inline">Rapor</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="p-3 sm:p-4 space-y-4 relative z-10">
        {/* A. HERO GREETING & PROGRESS CARD */}
        <section className="liquid-glass-card rounded-[32px] p-4 sm:p-5 shadow-xl border border-white/70 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full liquid-tint-ruby text-white text-[0.68rem] font-black tracking-wide uppercase mb-1 shadow-xs">
                <span>🌟 Level {levelInfo.level}</span>
                <span>•</span>
                <span>{levelInfo.levelTitle}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Halo, Kak Reza! 🦸‍♂️
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Kumpulkan XP belajar untuk menghias Kamar Superhero!
              </p>
            </div>

            {/* Total XP Badge */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 font-black px-3.5 py-2 rounded-2xl shadow-md border border-white/50 shrink-0">
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold opacity-85">
                Total XP
              </span>
              <span className="text-lg sm:text-xl leading-none font-black drop-shadow-xs">
                ⚡ {progression.totalXp}
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[0.7rem] font-black text-slate-600">
              <span>Menuju Level {levelInfo.level < 10 ? levelInfo.level + 1 : 'MAX'}</span>
              <span>
                {progression.totalXp} / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-white/70 rounded-full overflow-hidden shadow-inner border border-white/60 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-hero-red rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
            {nextCollectible && (
              <p className="text-[0.68rem] font-bold text-slate-500 mt-1 flex items-center gap-1">
                <span>🎁 Reward Level {nextCollectible.unlockRequirement.targetValue}:</span>
                <span className="text-slate-800 font-black">{nextCollectible.name}</span>
              </p>
            )}
          </div>
        </section>

        {/* B. CONTINUE LEARNING CALLOUT */}
        <section>
          {activeSession ? (
            <div className="liquid-glass-card rounded-[28px] p-4 shadow-lg border-2 border-hero-red/50 bg-rose-50/40 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl liquid-tint-ruby text-white flex items-center justify-center text-2xl font-black shadow-md animate-pulse">
                    ▶️
                  </div>
                  <div>
                    <span className="text-[0.65rem] font-black text-hero-red uppercase tracking-wider">
                      Sesi Belajar Aktif
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      Lanjutkan {activeSession.dayTitle}
                    </h3>
                    <p className="text-xs text-slate-600 font-bold">
                      Misi {activeSession.currentQIndex + 1} dari {activeSession.questions.length || 25} Soal
                    </p>
                  </div>
                </div>

                <Link
                  href={`/learn/${activeSession.dayId}`}
                  onClick={handleSoundClick}
                  className="px-4 py-2.5 rounded-2xl liquid-tint-ruby text-white font-black text-xs shadow-md flex items-center gap-1.5 shrink-0 hover:scale-105 transition-all"
                >
                  <span>Lanjut</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <Link
              href="/learn"
              onClick={handleSoundClick}
              className="w-full flex items-center justify-between p-4 rounded-[28px] liquid-tint-ruby text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <div>
                  <span className="text-[0.65rem] font-black tracking-wider uppercase opacity-85">
                    Mulai Petualangan Belajar
                  </span>
                  <h3 className="text-base sm:text-lg font-black leading-tight">
                    Pilih Misi Superhero Hari Ini
                  </h3>
                </div>
              </div>
              <ArrowRight size={20} className="mr-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </section>

        {/* C. 3D ACHIEVEMENT ROOM PREVIEW MINIATURE */}
        <section className="liquid-glass-card rounded-[28px] p-4 shadow-md border border-white/60">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛏️</span>
              <div>
                <h3 className="text-sm font-black text-slate-800">Kamar Superhero Reza</h3>
                <p className="text-[0.68rem] font-bold text-slate-500">
                  {placedCount} dari 5 slot artefak terpasang
                </p>
              </div>
            </div>
            <Link
              href="/room"
              onClick={handleSoundClick}
              className="text-xs font-black text-hero-red hover:underline flex items-center gap-1"
            >
              <span>Buka Kamar 3D</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="p-3 rounded-2xl liquid-glass-subtle border border-white/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-lg">
                🏆
              </div>
              <div>
                <div className="text-xs font-black text-slate-800">
                  Diorama 3D Interaktif
                </div>
                <div className="text-[0.68rem] font-bold text-slate-500">
                  Pasang piala, roket, lampu bintang, dan jubah superhero
                </div>
              </div>
            </div>
            <Link
              href="/room"
              onClick={handleSoundClick}
              className="px-3.5 py-1.5 rounded-xl liquid-tint-amber text-slate-950 font-black text-xs shadow-xs shrink-0"
            >
              Kunjungi
            </Link>
          </div>
        </section>

        {/* D. 6 LEARNING PILLARS OVERVIEW */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Compass size={16} className="text-hero-red" />
              <span>6 Pilar Belajar Superhero</span>
            </h3>
            <Link
              href="/learn"
              onClick={handleSoundClick}
              className="text-xs font-black text-hero-red hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PILLARS_CONFIG.map((p) => {
              const score = pillars ? (pillars[PILLAR_KEYS[p.id]] ?? 0) : 0;

              return (
                <Link
                  key={p.id}
                  href={`/learn/${p.id}`}
                  onClick={handleSoundClick}
                  className="liquid-glass-card p-3 rounded-2xl border border-white/60 hover:bg-white/80 transition-all flex flex-col justify-between gap-2 group hover:scale-[1.01]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="text-2xl p-1.5 rounded-xl bg-white/70 shadow-xs group-hover:scale-110 transition-transform">
                        {p.icon}
                      </div>
                      <div>
                        <span className="text-[0.62rem] font-black text-hero-red uppercase tracking-wider">
                          {p.name}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          {p.title}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-700 bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
                      {score}%
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${p.color} transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </Link>
              );
            })}

            {/* Sunday Free Exploration Card */}
            <div className="col-span-1 sm:col-span-2 liquid-glass-subtle p-3.5 rounded-2xl border border-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="text-2xl p-2 rounded-xl bg-amber-400/20 shadow-xs">
                  🌈
                </div>
                <div>
                  <span className="text-[0.65rem] font-black text-amber-600 uppercase tracking-wider">
                    Minggu — Eksplorasi Bebas
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    Hari Santai & Pengulangan Sukarela
                  </h4>
                  <p className="text-[0.7rem] text-slate-500 font-bold">
                    Bebas pilih pilar mana saja, hias kamar 3D, atau koleksi artefak tanpa batas waktu!
                  </p>
                </div>
              </div>
              <Link
                href="/learn"
                onClick={handleSoundClick}
                className="px-4 py-2 rounded-xl liquid-tint-amber text-slate-900 font-black text-xs shrink-0 hover:scale-105 transition-transform self-end sm:self-auto"
              >
                Eksplorasi Sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* E. DAILY MISSION & ACHIEVEMENT PREVIEW */}
        <section className="liquid-glass-card rounded-[28px] p-4 shadow-md border border-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" />
              <span>Pencapaian & Misi Harian</span>
            </span>
            <Link
              href="/collection"
              onClick={handleSoundClick}
              className="text-xs font-black text-hero-red hover:underline"
            >
              Koleksi ({progression.unlockedAchievementIds.length} / {ACHIEVEMENT_CATALOG.length})
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl liquid-glass-subtle border border-white/50">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 mb-1">
                <span>🎯 Misi Hari Ini</span>
              </div>
              <p className="text-[0.68rem] text-slate-600 font-medium">
                {progression.completedSessionsCount > 0
                  ? '✅ Selesaikan latihan pilar berikutnya!'
                  : 'Selesaikan 1 sesi petualangan pertama Kak Reza!'}
              </p>
            </div>

            <div className="p-3 rounded-2xl liquid-glass-subtle border border-white/50">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 mb-1">
                <span>⚡ Energi XP</span>
              </div>
              <p className="text-[0.68rem] text-slate-600 font-medium">
                Setiap soal memberi 3 XP, jawaban benar memberi +7 XP!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* PARENTAL GATE MODAL */}
      <ParentalGateModal
        isOpen={showGate}
        onSuccess={() => {
          setShowGate(false);
          setShowParentModal(true);
        }}
        onClose={() => setShowGate(false)}
      />

      {/* PARENT DASHBOARD MODAL */}
      <ParentDashboardModal
        isOpen={showParentModal}
        onClose={() => setShowParentModal(false)}
      />

      {/* GLOBAL BOTTOM NAV */}
      <GlobalNavBar />
    </div>
  );
}
