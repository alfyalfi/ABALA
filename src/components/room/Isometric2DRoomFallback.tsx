'use client';

import React from 'react';
import { ROOM_SLOTS, COLLECTIBLE_CATALOG } from '../../data/collectibleCatalog';

interface Isometric2DRoomFallbackProps {
  placedDecorations: Record<string, string>;
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}

export const Isometric2DRoomFallback: React.FC<Isometric2DRoomFallbackProps> = ({
  placedDecorations,
  onSelectSlot,
  selectedSlotId,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 relative overflow-hidden bg-gradient-to-b from-sky-100 via-amber-50 to-orange-100 rounded-3xl select-none">
      {/* 2D Isometric Room Card Container */}
      <div className="w-full max-w-md aspect-4/3 relative rounded-3xl bg-slate-100/90 shadow-xl border-2 border-white/80 overflow-hidden flex flex-col justify-between p-3.5">
        {/* Wall Section with Window and Shelves */}
        <div className="w-full flex justify-between items-start pt-1">
          {/* Left Wall Shelf (Mainan / Buku) */}
          <div className="flex flex-col items-center">
            <span className="text-[0.62rem] font-black text-slate-500 mb-1">Rak Mainan</span>
            <button
              onClick={() => onSelectSlot('slot_shelf')}
              className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                selectedSlotId === 'slot_shelf'
                  ? 'ring-4 ring-rose-400 bg-rose-100 shadow-lg scale-105'
                  : 'bg-white/80 shadow-xs hover:bg-white'
              }`}
            >
              <span className="text-3xl">
                {placedDecorations['slot_shelf']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_shelf'])?.iconEmoji || '🚀'
                  : '➕'}
              </span>
              <span className="text-[0.62rem] font-bold text-slate-700 mt-0.5">
                {placedDecorations['slot_shelf']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_shelf'])?.name.split(' ')[0]
                  : 'Kosong'}
              </span>
            </button>
          </div>

          {/* Center Wall Art (Jubah / Perisai) */}
          <div className="flex flex-col items-center">
            <span className="text-[0.62rem] font-black text-hero-red mb-1">Dinding Superhero</span>
            <button
              onClick={() => onSelectSlot('slot_wall')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
                selectedSlotId === 'slot_wall'
                  ? 'ring-4 ring-rose-400 bg-rose-100 shadow-lg scale-105'
                  : 'bg-white/80 shadow-xs hover:bg-white'
              }`}
            >
              <span className="text-4xl">
                {placedDecorations['slot_wall']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_wall'])?.iconEmoji || '🦸‍♂️'
                  : '➕'}
              </span>
              <span className="text-[0.62rem] font-bold text-slate-700 mt-0.5">
                {placedDecorations['slot_wall']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_wall'])?.name.split(' ')[0]
                  : 'Pasang Item'}
              </span>
            </button>
          </div>

          {/* Right Wall Shelf (Trofi / Piala) */}
          <div className="flex flex-col items-center">
            <span className="text-[0.62rem] font-black text-amber-600 mb-1">Rak Piala</span>
            <button
              onClick={() => onSelectSlot('slot_trophy')}
              className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                selectedSlotId === 'slot_trophy'
                  ? 'ring-4 ring-rose-400 bg-rose-100 shadow-lg scale-105'
                  : 'bg-white/80 shadow-xs hover:bg-white'
              }`}
            >
              <span className="text-3xl">
                {placedDecorations['slot_trophy']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_trophy'])?.iconEmoji || '🏆'
                  : '➕'}
              </span>
              <span className="text-[0.62rem] font-bold text-slate-700 mt-0.5">
                {placedDecorations['slot_trophy']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_trophy'])?.name.split(' ')[0]
                  : 'Kosong'}
              </span>
            </button>
          </div>
        </div>

        {/* Room Midground: Study Desk (Left) and Cozy Bed (Right) */}
        <div className="w-full flex justify-between items-end my-auto px-2">
          {/* Study Desk Slot */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onSelectSlot('slot_desk')}
              className={`p-3 rounded-2xl flex flex-col items-center transition-all ${
                selectedSlotId === 'slot_desk'
                  ? 'ring-4 ring-rose-400 bg-rose-100 shadow-lg scale-105'
                  : 'bg-amber-100/90 shadow-sm border border-amber-300'
              }`}
            >
              <span className="text-3xl mb-0.5">
                {placedDecorations['slot_desk']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_desk'])?.iconEmoji || '⭐'
                  : '🪑'}
              </span>
              <span className="text-[0.65rem] font-black text-slate-800">
                Meja Belajar
              </span>
            </button>
          </div>

          {/* Sisi Jendela Slot */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onSelectSlot('slot_window')}
              className={`p-3 rounded-2xl flex flex-col items-center transition-all ${
                selectedSlotId === 'slot_window'
                  ? 'ring-4 ring-rose-400 bg-rose-100 shadow-lg scale-105'
                  : 'bg-sky-100/90 shadow-sm border border-sky-300'
              }`}
            >
              <span className="text-3xl mb-0.5">
                {placedDecorations['slot_window']
                  ? COLLECTIBLE_CATALOG.find((c) => c.id === placedDecorations['slot_window'])?.iconEmoji || '🪴'
                  : '🪟'}
              </span>
              <span className="text-[0.65rem] font-black text-slate-800">
                Sisi Jendela
              </span>
            </button>
          </div>

          {/* Bed Illustration */}
          <div className="flex flex-col items-center bg-red-100/80 p-3 rounded-2xl border border-red-300 shadow-xs">
            <span className="text-3xl mb-0.5">🛏️</span>
            <span className="text-[0.65rem] font-black text-slate-800">
              Kasur Reza
            </span>
          </div>
        </div>

        {/* Floor Indicator */}
        <div className="text-center pt-2 border-t border-slate-200/80">
          <span className="text-[0.65rem] font-bold text-slate-500">
            💡 Ketuk slot mana saja untuk memasang atau mengganti dekorasi kamar!
          </span>
        </div>
      </div>
    </div>
  );
};
