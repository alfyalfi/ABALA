import React from 'react';
import { Volume2, Bell, BellOff, Pause, Play, BarChart2, Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  dayName: string;
  dayTitle: string;
  isMuted: boolean;
  isPaused: boolean;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onSpeakPrompt: () => void;
  onOpenParentDashboard: () => void;
  deferredPrompt: any;
  onInstallPwa: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  dayName,
  dayTitle,
  isMuted,
  isPaused,
  onToggleMute,
  onTogglePause,
  onSpeakPrompt,
  onOpenParentDashboard,
  deferredPrompt,
  onInstallPwa
}) => {
  return (
    <header className="flex items-center justify-between gap-2 mb-1.5 w-full relative z-20">
      {/* Brand & Reza Identity Liquid Capsule */}
      <div className="flex items-center gap-2.5 liquid-glass-pill px-3.5 py-1.5 shadow-sm liquid-lens-sheen">
        {/* Shield Icon with Refractive Ring */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 border border-amber-400/60 flex items-center justify-center text-hero-gold font-black text-xs shadow-[0_0_12px_rgba(245,158,11,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          <span className="relative z-10">⚡</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs font-black tracking-tight text-hero-black">
          <span className="drop-shadow-xs">Kak Reza</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)] animate-pulse" />
          <span className="text-hero-red font-black tracking-tight">{dayName}</span>
        </div>
      </div>

      {/* Liquid Glass Control Buttons */}
      <div className="flex items-center gap-1.5">
        {deferredPrompt && (
          <button
            onClick={onInstallPwa}
            title="Install Aplikasi ABALA"
            className="flex items-center gap-1.5 liquid-tint-ruby text-white text-xs font-black px-3 py-1.5 rounded-full liquid-interactive liquid-lens-sheen"
          >
            <Download size={13} className="stroke-[2.5]" />
            <span className="hidden sm:inline">Install</span>
          </button>
        )}

        <button
          onClick={onSpeakPrompt}
          title="Dengarkan Suara Soal"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-slate-800 hover:text-hero-red liquid-interactive liquid-lens-sheen"
        >
          <Volume2 size={17} className="stroke-[2.2]" />
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? "Bunyikan Suara" : "Matikan Suara"}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-slate-800 hover:text-hero-red liquid-interactive liquid-lens-sheen"
        >
          {isMuted ? (
            <BellOff size={17} className="text-slate-400 stroke-[2]" />
          ) : (
            <Bell size={17} className="text-slate-800 stroke-[2.2]" />
          )}
        </button>

        <button
          onClick={onTogglePause}
          title={isPaused ? "Lanjutkan Timer" : "Jeda Timer"}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center liquid-interactive liquid-lens-sheen ${
            isPaused ? 'liquid-tint-emerald text-white' : 'liquid-glass text-slate-800'
          }`}
        >
          {isPaused ? (
            <Play size={17} className="fill-white stroke-none" />
          ) : (
            <Pause size={17} className="stroke-[2.5]" />
          )}
        </button>

        <button
          onClick={onOpenParentDashboard}
          title="Dashboard Orang Tua / Rapor"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-hero-red hover:text-rose-600 liquid-interactive liquid-lens-sheen"
        >
          <BarChart2 size={17} className="stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
};
