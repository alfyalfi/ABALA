'use client';

import React from 'react';
import { X, Check, Lock, Sparkles, Trash2 } from 'lucide-react';
import { ROOM_SLOTS, COLLECTIBLE_CATALOG } from '../../data/collectibleCatalog';
import { CollectibleDefinition } from '../../types/progression';
import { audioService } from '../../services/audioService';

interface DecorationDrawerProps {
  slotId: string | null;
  placedDecorations: Record<string, string>;
  unlockedCollectibleIds: string[];
  onEquip: (slotId: string, collectibleId: string) => void;
  onUnequip: (slotId: string) => void;
  onClose: () => void;
}

export const DecorationDrawer: React.FC<DecorationDrawerProps> = ({
  slotId,
  placedDecorations,
  unlockedCollectibleIds,
  onEquip,
  onUnequip,
  onClose,
}) => {
  if (!slotId) return null;

  const currentSlot = ROOM_SLOTS.find((s) => s.slotId === slotId);
  if (!currentSlot) return null;

  const currentItemId = placedDecorations[slotId];
  const eligibleItems = COLLECTIBLE_CATALOG.filter((c) =>
    c.allowedSlots.includes(slotId)
  );

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="liquid-glass-modal rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[80vh] flex flex-col p-4 sm:p-5 shadow-2xl relative overflow-hidden animate-slide-up border border-white/70">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/60 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl liquid-tint-ruby text-white flex items-center justify-center text-sm font-black">
              🎨
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                {currentSlot.name}
              </h3>
              <p className="text-[0.68rem] font-bold text-slate-500">
                Pilih artefak atau dekorasi untuk dipasang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-slate-600 hover:text-slate-900"
          >
            <X size={16} />
          </button>
        </div>

        {/* Currently equipped action */}
        {currentItemId && (
          <div className="mb-3 p-2.5 rounded-2xl liquid-glass-subtle flex items-center justify-between border border-white/50">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {COLLECTIBLE_CATALOG.find((c) => c.id === currentItemId)?.iconEmoji || '✨'}
              </span>
              <div className="text-left">
                <span className="text-[0.62rem] text-hero-red font-black uppercase">
                  Sedang Dipasang
                </span>
                <div className="text-xs font-black text-slate-800">
                  {COLLECTIBLE_CATALOG.find((c) => c.id === currentItemId)?.name}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                audioService.playFeedback('step');
                onUnequip(slotId);
              }}
              className="px-2.5 py-1.5 rounded-xl liquid-tint-rose text-white text-[0.68rem] font-black flex items-center gap-1 shadow-xs"
            >
              <Trash2 size={12} />
              <span>Lepas</span>
            </button>
          </div>
        )}

        {/* Eligible Items Grid */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {eligibleItems.map((item) => {
            const isUnlocked = unlockedCollectibleIds.includes(item.id);
            const isEquippedHere = currentItemId === item.id;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isEquippedHere
                    ? 'liquid-tint-ruby text-white shadow-md border-white/60'
                    : isUnlocked
                    ? 'liquid-glass text-slate-800 hover:bg-white/80 border-white/60'
                    : 'liquid-glass-subtle text-slate-400 border-dashed border-slate-300 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                      isEquippedHere
                        ? 'bg-white/20'
                        : isUnlocked
                        ? 'bg-white/80'
                        : 'bg-slate-200/60'
                    }`}
                  >
                    {item.iconEmoji}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black leading-tight">
                        {item.name}
                      </span>
                      {!isUnlocked && <Lock size={12} className="text-slate-400" />}
                    </div>
                    <p className={`text-[0.68rem] font-medium leading-tight mt-0.5 ${
                      isEquippedHere ? 'text-white/90' : 'text-slate-500'
                    }`}>
                      {isUnlocked
                        ? item.description
                        : `🔒 Syarat: ${item.unlockRequirement.description}`}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="shrink-0">
                  {isEquippedHere ? (
                    <span className="text-[0.65rem] font-black bg-white text-hero-red px-2.5 py-1 rounded-full shadow-xs">
                      Terpasang
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        audioService.playFeedback('victory');
                        onEquip(slotId, item.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl liquid-tint-amber text-slate-950 font-black text-xs shadow-xs hover:scale-105 transition-all"
                    >
                      Pasang
                    </button>
                  ) : (
                    <span className="text-[0.62rem] font-black text-slate-400 bg-slate-200/70 px-2 py-1 rounded-full">
                      Terkunci
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
