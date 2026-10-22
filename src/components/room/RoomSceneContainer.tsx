'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Isometric2DRoomFallback } from './Isometric2DRoomFallback';

interface RoomSceneContainerProps {
  placedDecorations: Record<string, string>;
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}

// Client-only dynamic import of Three.js 3D scene to ensure zero SSR errors
const BedroomDiorama3D = dynamic(
  () => import('./BedroomDiorama3D').then((mod) => mod.BedroomDiorama3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
        <span className="text-xs font-black text-slate-700">Menyiapkan Kamar 3D...</span>
      </div>
    ),
  }
);

export const RoomSceneContainer: React.FC<RoomSceneContainerProps> = ({
  placedDecorations,
  onSelectSlot,
  selectedSlotId,
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [has3DError, setHas3DError] = useState<boolean>(false);

  useEffect(() => {
    // Detect WebGL capability safely in browser
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-3 border-hero-red border-t-transparent animate-spin" />
      </div>
    );
  }

  // Fallback to 2D isometric room if WebGL is unavailable or fails
  if (!hasWebGL || has3DError) {
    return (
      <Isometric2DRoomFallback
        placedDecorations={placedDecorations}
        onSelectSlot={onSelectSlot}
        selectedSlotId={selectedSlotId}
      />
    );
  }

  return (
    <div className="w-full h-full relative">
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full border-4 border-hero-red border-t-transparent animate-spin" />
            <span className="text-xs font-black text-slate-700">Membuka Kamar Kak Reza...</span>
          </div>
        }
      >
        <BedroomDiorama3D
          placedDecorations={placedDecorations}
          onSelectSlot={onSelectSlot}
          selectedSlotId={selectedSlotId}
        />
      </Suspense>
    </div>
  );
};
