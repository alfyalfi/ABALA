'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Rocket, Sparkles, Award } from 'lucide-react';
import { audioService } from '../services/audioService';

const NAV_ITEMS = [
  { href: '/', label: 'Beranda', icon: Home, emoji: '🏠' },
  { href: '/learn', label: 'Belajar', icon: Rocket, emoji: '🚀' },
  { href: '/room', label: 'Kamar', icon: Sparkles, emoji: '🛏️' },
  { href: '/collection', label: 'Koleksi', icon: Award, emoji: '🏆' },
];

export const GlobalNavBar: React.FC = () => {
  const pathname = usePathname();

  const handleNavClick = () => {
    try {
      audioService.playFeedback('step');
    } catch (e) {}
  };

  return (
    <nav
      aria-label="Navigasi Utama ABALA"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-[640px] mx-auto px-3 pb-3 pointer-events-auto"
    >
      <div className="liquid-glass-modal rounded-3xl p-1.5 shadow-2xl flex items-center justify-around border border-white/60 backdrop-blur-2xl">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 select-none ${
                isActive
                  ? 'liquid-tint-ruby text-white font-black scale-105 shadow-md ring-2 ring-white/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-bold'
              }`}
            >
              <span className="text-xl sm:text-2xl leading-none mb-0.5 filter drop-shadow-xs">
                {item.emoji}
              </span>
              <span className="text-[0.68rem] sm:text-xs font-black tracking-tight leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
