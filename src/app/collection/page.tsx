'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle,
  Award,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { LiquidMeshBackground } from '../../components/ui/LiquidGlassPrimitives';
import { GlobalNavBar } from '../../components/GlobalNavBar';
import { StorageService } from '../../services/storageService';
import { ProgressionService } from '../../services/progressionService';
import { audioService } from '../../services/audioService';
import { ACHIEVEMENT_CATALOG } from '../../data/achievementCatalog';
import { COLLECTIBLE_CATALOG, ROOM_SLOTS } from '../../data/collectibleCatalog';
import { ProgressionState, CollectibleCategory } from '../../types/progression';

type ActiveTab = 'all' | 'trophy' | 'decor' | 'achievements';

export default function CollectionPage() {
  const router = useRouter();
  const [progression, setProgression] = useState<ProgressionState | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');

  useEffect(() => {
    setProgression(ProgressionService.getState());
  }, []);

  const handleSoundClick = () => {
    try {
      audioService.playFeedback('step');
    } catch (e) {}
  };

  const handleEquipItem = (collectibleId: string, allowedSlots: string[]) => {
    if (!allowedSlots || allowedSlots.length === 0) return;
    const targetSlot = allowedSlots[0];
    ProgressionService.equipDecoration(targetSlot, collectibleId);
    setProgression(ProgressionService.getState());
    audioService.playFeedback('victory');
    router.push('/room');
  };

  if (!progression) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 rounded-full border-4 border-hero-red border-t-transparent animate-spin" />
      </div>
    );
  }

  const inventoryItems = ProgressionService.getInventoryItems();

  const filteredCollectibles = inventoryItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'trophy') return item.collectible.category === 'trophy';
    if (activeTab === 'decor') return item.collectible.category !== 'trophy';
    return false;
  });

  return (
    <div className="min-h-screen w-full max-w-[640px] mx-auto flex flex-col bg-slate-50 text-slate-800 pb-24 relative select-none">
      <LiquidMeshBackground />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 p-3 sm:p-4 liquid-glass-pill mx-2.5 mt-2.5 shadow-sm border border-white/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            onClick={handleSoundClick}
            className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="text-[0.62rem] font-black text-slate-400 uppercase tracking-wider">
              Koleksi Artefak
            </div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
              Trofi & Penghargaan
            </h1>
          </div>
        </div>

        {/* Counter */}
        <span className="liquid-tint-ruby text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
          {progression.unlockedCollectibleIds.length} / {COLLECTIBLE_CATALOG.length} Terbuka
        </span>
      </header>

      {/* FILTER TABS */}
      <div className="p-3 sm:p-4 pb-1 relative z-10">
        <div className="liquid-glass-card rounded-2xl p-1.5 flex gap-1 shadow-sm border border-white/60">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'all'
                ? 'liquid-tint-ruby text-white shadow-xs'
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setActiveTab('trophy')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'trophy'
                ? 'liquid-tint-ruby text-white shadow-xs'
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            Trofi
          </button>
          <button
            onClick={() => setActiveTab('decor')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'decor'
                ? 'liquid-tint-ruby text-white shadow-xs'
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            Dekorasi
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'achievements'
                ? 'liquid-tint-ruby text-white shadow-xs'
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            Pencapaian
          </button>
        </div>
      </div>

      {/* MAIN LIST */}
      <main className="p-3 sm:p-4 space-y-3 relative z-10">
        {activeTab === 'achievements' ? (
          // ACHIEVEMENTS LIST
          <div className="space-y-2.5">
            {ACHIEVEMENT_CATALOG.map((ach) => {
              const isUnlocked = progression.unlockedAchievementIds.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isUnlocked
                      ? 'liquid-glass text-slate-800 shadow-md border-white/70 bg-white/90'
                      : 'liquid-glass-subtle text-slate-400 border-dashed border-slate-300 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {ach.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          {ach.title}
                        </h3>
                        {!isUnlocked && <Lock size={12} className="text-slate-400" />}
                      </div>
                      <p className="text-[0.68rem] text-slate-500 font-medium leading-tight mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span
                      className={`text-[0.65rem] font-black px-2.5 py-1 rounded-full ${
                        isUnlocked
                          ? 'liquid-tint-ruby text-white shadow-xs'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      +{ach.xpReward} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // COLLECTIBLES INVENTORY
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCollectibles.map((item) => {
              const c = item.collectible;

              return (
                <div
                  key={c.id}
                  className={`liquid-glass-card rounded-[24px] p-3.5 border transition-all flex flex-col justify-between gap-2.5 ${
                    item.isEquipped
                      ? 'border-hero-red/60 bg-rose-50/60 shadow-lg'
                      : item.isUnlocked
                      ? 'border-white/70 shadow-md bg-white/85'
                      : 'border-dashed border-slate-300 liquid-glass-subtle opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl shadow-xs shrink-0 ${
                          item.isEquipped
                            ? 'bg-rose-500 text-white'
                            : item.isUnlocked
                            ? 'bg-white'
                            : 'bg-slate-200'
                        }`}
                      >
                        {c.iconEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                            {c.name}
                          </h3>
                          {!item.isUnlocked && <Lock size={12} className="text-slate-400" />}
                        </div>
                        <span className="text-[0.62rem] font-black text-hero-red uppercase">
                          {c.category}
                        </span>
                      </div>
                    </div>

                    {item.isEquipped && (
                      <span className="text-[0.62rem] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                        Terpasang
                      </span>
                    )}
                  </div>

                  <p className="text-[0.68rem] text-slate-600 font-medium leading-relaxed">
                    {item.isUnlocked
                      ? c.description
                      : `🔒 Syarat: ${c.unlockRequirement.description}`}
                  </p>

                  {/* Action */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[0.62rem] font-bold text-slate-400">
                      Slot: {c.allowedSlots.map((s) => ROOM_SLOTS.find((rs) => rs.slotId === s)?.name.split(' ')[0]).join(', ')}
                    </span>

                    {item.isUnlocked ? (
                      item.isEquipped ? (
                        <Link
                          href="/room"
                          onClick={handleSoundClick}
                          className="text-xs font-black text-hero-red hover:underline flex items-center gap-1"
                        >
                          <span>Lihat di Kamar</span>
                          <ArrowRight size={13} />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleEquipItem(c.id, c.allowedSlots)}
                          className="px-3 py-1 rounded-xl liquid-tint-amber text-slate-950 font-black text-xs shadow-xs hover:scale-105 transition-all"
                        >
                          Pasang di Kamar
                        </button>
                      )
                    ) : (
                      <span className="text-[0.62rem] font-black text-slate-400">
                        Belum Terbuka
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* GLOBAL BOTTOM NAV */}
      <GlobalNavBar />
    </div>
  );
}
