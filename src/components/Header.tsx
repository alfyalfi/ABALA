import React from 'react';
import { Volume2, Bell, BellOff, Pause, Play, BarChart2, Download } from 'lucide-react';

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
    <header className="flex items-center justify-between gap-2 mb-2 w-full">
      {/* Brand & Reza Identity */}
      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-hero-border shadow-hero-sm">
        {/* Shield Icon */}
        <div className="w-7 h-7 rounded-full bg-hero-black border-2 border-hero-red flex items-center justify-center text-hero-gold font-black text-xs shadow-sm">
          ⚡
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black tracking-tight text-hero-black">
          <span>Kak Reza</span>
          <span className="w-1.5 h-1.5 rounded-full bg-hero-red"></span>
          <span className="text-hero-red">{dayName}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1.5">
        {deferredPrompt && (
          <button
            onClick={onInstallPwa}
            title="Install Aplikasi ABALA"
            className="flex items-center gap-1 bg-hero-red text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-hero-red hover:bg-hero-crimson transition-all active:scale-95"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Install</span>
          </button>
        )}

        <button
          onClick={onSpeakPrompt}
          title="Dengarkan Suara Soal"
          className="w-9 h-9 rounded-full bg-white border border-hero-border flex items-center justify-center text-hero-black hover:bg-slate-50 transition-all active:scale-95 shadow-hero-sm"
        >
          <Volume2 size={16} className="text-hero-black" />
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? "Bunyikan Suara" : "Matikan Suara"}
          className="w-9 h-9 rounded-full bg-white border border-hero-border flex items-center justify-center text-hero-black hover:bg-slate-50 transition-all active:scale-95 shadow-hero-sm"
        >
          {isMuted ? <BellOff size={16} className="text-slate-400" /> : <Bell size={16} className="text-hero-black" />}
        </button>

        <button
          onClick={onTogglePause}
          title={isPaused ? "Lanjutkan Timer" : "Jeda Timer"}
          className="w-9 h-9 rounded-full bg-white border border-hero-border flex items-center justify-center text-hero-black hover:bg-slate-50 transition-all active:scale-95 shadow-hero-sm"
        >
          {isPaused ? <Play size={16} className="text-hero-success" /> : <Pause size={16} className="text-hero-dark" />}
        </button>

        <button
          onClick={onOpenParentDashboard}
          title="Dashboard Orang Tua / Rapor"
          className="w-9 h-9 rounded-full bg-white border border-hero-border flex items-center justify-center text-hero-black hover:bg-slate-50 transition-all active:scale-95 shadow-hero-sm"
        >
          <BarChart2 size={16} className="text-hero-red" />
        </button>
      </div>
    </header>
  );
};
