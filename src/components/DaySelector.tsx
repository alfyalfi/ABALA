'use client';

import React from 'react';

interface DaySelectorItem {
  id: number;
  name: string;
  icon: string;
  title?: string;
}

interface DaySelectorProps {
  days: DaySelectorItem[];
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  activeDayIndex,
  onSelectDay
}) => {
  return (
    <nav className="flex items-center gap-1.5 liquid-glass-subtle p-1.5 rounded-2xl overflow-x-auto no-scrollbar mb-1 w-full shadow-inner relative z-10">
      {days.map((day, idx) => {
        const isActive = idx === activeDayIndex;
        return (
          <button
            key={day.id}
            onClick={() => onSelectDay(idx)}
            className={`flex-1 min-w-[72px] py-1.5 px-2.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-1.5 liquid-interactive liquid-lens-sheen ${
              isActive
                ? 'liquid-tint-ruby text-white shadow-[0_4px_16px_rgba(220,38,38,0.4)] scale-[1.03] ring-1 ring-white/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 active:bg-white/40'
            }`}
          >
            <span className="text-sm drop-shadow-xs">{day.icon}</span>
            <span className="tracking-tight">{day.name}</span>
          </button>
        );
      })}
    </nav>
  );
};
