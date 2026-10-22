'use client';

import React from 'react';
import { X, CheckCircle, BarChart, Shield, Calendar } from 'lucide-react';
import { ProgressService } from '../services/supabaseService';
import { CATEGORIES_META } from '../data/categoriesMeta';
import { LearningPillarProgress } from '../types';

interface ParentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PILLAR_KEYS: Record<number, keyof LearningPillarProgress> = {
  1: 'berhitung',
  2: 'membaca',
  3: 'menyimak',
  4: 'nalar',
  5: 'bentuk',
  6: 'kemandirian',
};

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const history = ProgressService.getLocalHistory();
  const pillars = ProgressService.getPillarProgress();

  const pillarList = CATEGORIES_META.map((cat) => ({
    name: `${cat.title} (${cat.dayName})`,
    score: pillars[PILLAR_KEYS[cat.id]] ?? 0,
    icon: cat.icon,
    color: `bg-gradient-to-r ${cat.color}`,
  }));

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="liquid-glass-modal rounded-[36px] w-full max-w-md max-h-[92vh] flex flex-col p-5 sm:p-6 animate-pop relative overflow-hidden liquid-lens-sheen shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full liquid-tint-ruby text-white flex items-center justify-center font-black text-sm shadow-md">
              📊
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 drop-shadow-xs">Rapor & Analitik Reza</h3>
              <p className="text-[0.72rem] font-bold text-slate-500">Dashboard Tumbuh Kembang PAUD / TK A</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-slate-600 hover:text-slate-900 liquid-interactive"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-4">
          {/* Identity Card (Liquid Obsidian) */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 rounded-2xl flex items-center justify-between border border-white/20 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="text-[0.7rem] font-bold text-amber-300 uppercase tracking-wider">Siswa Superhero</div>
              <div className="text-base font-black">Kak Reza</div>
              <div className="text-xs text-slate-300">Jenjang: TK A (Semester 1)</div>
            </div>
            <div className="relative z-10 flex items-center gap-1.5 liquid-tint-ruby px-3 py-1.5 rounded-xl border border-white/40 shadow-md">
              <Shield size={16} className="text-white drop-shadow-xs" />
              <span className="text-xs font-black">Siap SD</span>
            </div>
          </div>

          {/* 6 Learning Pillars Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1">
                <BarChart size={13} className="text-hero-red" />
                <span>Penguasaan 6 Pilar Belajar</span>
              </span>
            </div>

            <div className="space-y-2.5 liquid-glass-subtle p-3.5 rounded-2xl shadow-inner">
              {pillarList.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </span>
                    <span className="font-black text-slate-900">{p.score}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner border border-white/50">
                    <div
                      className={`h-full ${p.color} transition-all duration-500 rounded-full shadow-xs`}
                      style={{ width: `${p.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Session History */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={13} className="text-hero-red" />
                <span>Riwayat Latihan Terbaru</span>
              </span>
            </div>

            {history.length === 0 ? (
              <div className="liquid-glass-subtle p-4 rounded-xl text-center text-xs text-slate-500 font-bold">
                Belum ada riwayat sesi. Selesaikan 15 soal untuk melihat catatan di sini!
              </div>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
                {history.slice(0, 5).map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between liquid-glass p-2.5 rounded-xl text-xs font-bold shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className={h.passed ? "text-emerald-500" : "text-rose-500"} />
                      <span className="text-slate-800">{h.dayName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-normal">
                        {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-black ${h.passed ? "liquid-tint-emerald text-white" : "liquid-tint-rose text-white"}`}>
                        {h.score} / {h.total} ({h.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/60">
          <button
            onClick={onClose}
            className="w-full liquid-glass text-slate-800 font-black text-xs py-3 rounded-xl hover:bg-white/80 transition-all liquid-interactive liquid-lens-sheen"
          >
            Tutup Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
