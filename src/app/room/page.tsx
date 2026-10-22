'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Sparkles,
  Trophy,
  Layers,
  HelpCircle,
  Award,
} from 'lucide-react';
import { LiquidMeshBackground } from '../../components/ui/LiquidGlassPrimitives';
import { GlobalNavBar } from '../../components/GlobalNavBar';
import { RoomSceneContainer } from '../../components/room/RoomSceneContainer';
import { DecorationDrawer } from '../../components/room/DecorationDrawer';
import { Isometric2DRoomFallback } from '../../components/room/Isometric2DRoomFallback';
import { StorageService } from '../../services/storageService';
import { ProgressionService } from '../../services/progressionService';
import { audioService } from '../../services/audioService';
import { ProgressionState } from '../../types/progression';
import { ROOM_SLOTS, COLLECTIBLE_CATALOG } from '../../data/collectibleCatalog';

export default function AchievementRoomPage() {
  const [progression, setProgression] = useState<ProgressionState | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [force2D, setForce2D] = useState<boolean>(false);

  useEffect(() => {
    setProgression(ProgressionService.getState());
  }, []);

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsDrawerOpen(true);
    try {
      audioService.playFeedback('step');
    } catch (e) {}
  };

  const handleEquip = (slotId: string, collectibleId: string) => {
    ProgressionService.equipDecoration(slotId, collectibleId);
    setProgression(ProgressionService.getState());
    setIsDrawerOpen(false);
  };

  const handleUnequip = (slotId: string) => {
    ProgressionService.unequipDecoration(slotId);
    setProgression(ProgressionService.getState());
    setIsDrawerOpen(false);
  };

  if (!progression) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 rounded-full border-4 border-hero-red border-t-transparent animate-spin" />
      </div>
    );
  }

  const placedCount = Object.keys(progression.placedDecorations).length;
  const levelInfo = StorageService.calculateLevelFromXp(progression.totalXp);

  return (
    <div className="h-screen w-full max-w-[640px] mx-auto flex flex-col justify-between bg-slate-100 text-slate-800 pb-20 relative select-none overflow-hidden">
      <LiquidMeshBackground />

      {/* TOP COMPACT HEADER */}
      <header className="shrink-0 p-3 sm:p-4 liquid-glass-pill mx-2.5 mt-2.5 shadow-sm border border-white/60 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="text-[0.62rem] font-black text-slate-400 uppercase tracking-wider">
              Achievement Room
            </div>
            <h1 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              Kamar Kak Reza
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Level Pill */}
          <span className="liquid-tint-ruby text-white text-[0.65rem] font-black px-2.5 py-1 rounded-full shadow-xs">
            Level {levelInfo.level}
          </span>

          {/* 2D / 3D Toggle */}
          <button
            onClick={() => setForce2D(!force2D)}
            title={force2D ? 'Beralih ke 3D' : 'Beralih ke 2D'}
            className="px-2.5 py-1 rounded-xl liquid-glass text-slate-700 font-black text-xs flex items-center gap-1 hover:bg-white/80"
          >
            <Layers size={13} />
            <span>{force2D ? 'Mode 3D' : 'Mode 2D'}</span>
          </button>
        </div>
      </header>

      {/* 3D / 2D DIORAMA SCENE CONTAINER */}
      <div className="flex-1 w-full relative min-h-0 z-10 px-2.5 py-1">
        {force2D ? (
          <Isometric2DRoomFallback
            placedDecorations={progression.placedDecorations}
            onSelectSlot={handleSelectSlot}
            selectedSlotId={selectedSlotId}
          />
        ) : (
          <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/80 bg-gradient-to-b from-sky-100 via-amber-50 to-orange-100 relative">
            <RoomSceneContainer
              placedDecorations={progression.placedDecorations}
              onSelectSlot={handleSelectSlot}
              selectedSlotId={selectedSlotId}
            />

            {/* Gesture Guide Overlay */}
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[0.65rem] font-bold text-slate-600 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-white/60">
              <span className="flex items-center gap-1">
                <span>👆 Geser layar untuk memutar kamar</span>
              </span>
              <span className="text-hero-red font-black">
                {placedCount} / {ROOM_SLOTS.length} Terpasang
              </span>
            </div>
          </div>
        )}
      </div>

      {/* SLOTS QUICK SELECTOR STRIP */}
      <div className="shrink-0 px-3 py-1.5 relative z-20">
        <div className="liquid-glass-card rounded-2xl p-2 flex items-center justify-between gap-1 shadow-md border border-white/60 overflow-x-auto no-scrollbar">
          {ROOM_SLOTS.map((slot) => {
            const currentItem = progression.placedDecorations[slot.slotId];
            const def = currentItem
              ? COLLECTIBLE_CATALOG.find((c) => c.id === currentItem)
              : null;

            return (
              <button
                key={slot.slotId}
                onClick={() => handleSelectSlot(slot.slotId)}
                className={`flex-1 py-1 px-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                  selectedSlotId === slot.slotId
                    ? 'liquid-tint-ruby text-white font-black scale-105 shadow-xs'
                    : 'liquid-glass text-slate-700 hover:bg-white/70'
                }`}
              >
                <span className="text-base leading-none mb-0.5">
                  {def ? def.iconEmoji : '➕'}
                </span>
                <span className="text-[0.62rem] font-black truncate max-w-[65px] leading-tight">
                  {slot.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DECORATION DRAWER */}
      {isDrawerOpen && (
        <DecorationDrawer
          slotId={selectedSlotId}
          placedDecorations={progression.placedDecorations}
          unlockedCollectibleIds={progression.unlockedCollectibleIds}
          onEquip={handleEquip}
          onUnequip={handleUnequip}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      {/* GLOBAL BOTTOM NAV */}
      <GlobalNavBar />
    </div>
  );
}
