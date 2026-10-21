import React from 'react';
import { DayCurriculum } from '../types';

interface DaySelectorProps {
  days: DayCurriculum[];
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  activeDayIndex,
  onSelectDay
}) => {
  return (
    <nav className="flex items-center gap-1.5 bg-white p-1.5 rounded-hero border border-hero-border shadow-hero-sm overflow-x-auto no-scrollbar mb-2 w-full">
      {days.map((day, idx) => {
        const isActive = idx === activeDayIndex;
        return (
          <button
            key={day.id}
            onClick={() => onSelectDay(idx)}
            className={`flex-1 min-w-[72px] py-1.5 px-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center justify-center gap-1 ${
              isActive
                ? 'bg-hero-red text-white shadow-hero-red scale-[1.02]'
                : 'text-slate-500 hover:text-hero-black hover:bg-slate-50'
            }`}
          >
            <span>{day.icon}</span>
            <span>{day.name}</span>
          </button>
        );
      })}
    </nav>
  );
};
