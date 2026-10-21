import React from 'react';
import { X, Award, CheckCircle, BarChart, Shield, Calendar } from 'lucide-react';
import { ProgressService } from '../services/supabaseService';

interface ParentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const history = ProgressService.getLocalHistory();
  const pillars = ProgressService.getPillarProgress();

  const pillarList = [
    { name: 'Berhitung & Angka', score: pillars.berhitung, icon: '🔢', color: 'bg-blue-500' },
    { name: 'Membaca & Fonik', score: pillars.membaca, icon: '🔤', color: 'bg-emerald-500' },
    { name: 'Menyimak Suara', score: pillars.menyimak, icon: '👂', color: 'bg-purple-500' },
    { name: 'Logika & Nalar', score: pillars.nalar, icon: '💡', color: 'bg-amber-500' },
    { name: 'Bentuk & Spasial', score: pillars.bentuk, icon: '🔷', color: 'bg-cyan-500' },
    { name: 'Kemandirian & Sikap', score: pillars.kemandirian, icon: '🦸‍♂️', color: 'bg-rose-500' }
  ];

  return (
    <div className="fixed inset-0 bg-hero-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-hero-lg border-2 border-hero-border shadow-2xl w-full max-w-md max-h-[92vh] flex flex-col p-5 animate-pop relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-hero-red text-white flex items-center justify-center font-black">
              📊
            </div>
            <div>
              <h3 className="text-base font-black text-hero-black">Rapor & Analitik Reza</h3>
              <p className="text-[0.72rem] font-bold text-slate-400">Dashboard Tumbuh Kembang PAUD / TK A</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-4">
          {/* Identity Card */}
          <div className="bg-gradient-to-r from-hero-black to-slate-800 text-white p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-[0.7rem] font-bold text-hero-gold uppercase tracking-wider">Siswa Superhero</div>
              <div className="text-base font-black">Kak Reza</div>
              <div className="text-xs text-slate-300">Jenjang: TK A (Semester 1)</div>
            </div>
            <div className="flex items-center gap-1.5 bg-hero-red/90 px-3 py-1.5 rounded-xl border border-red-400">
              <Shield size={16} className="text-white" />
              <span className="text-xs font-black">Siap SD</span>
            </div>
          </div>

          {/* 6 Learning Pillars Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-hero-black uppercase tracking-wider flex items-center gap-1">
                <BarChart size={13} className="text-hero-red" />
                <span>Penguasaan 6 Pilar Belajar</span>
              </span>
            </div>

            <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {pillarList.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </span>
                    <span className="font-black text-hero-black">{p.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${p.color} transition-all duration-500 rounded-full`}
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
              <span className="text-xs font-black text-hero-black uppercase tracking-wider flex items-center gap-1">
                <Calendar size={13} className="text-hero-red" />
                <span>Riwayat Latihan Terbaru</span>
              </span>
            </div>

            {history.length === 0 ? (
              <div className="bg-slate-50 p-4 rounded-xl text-center text-xs text-slate-400 font-bold">
                Belum ada riwayat sesi. Selesaikan 15 soal untuk melihat catatan di sini!
              </div>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
                {history.slice(0, 5).map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs font-bold"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className={h.passed ? "text-emerald-500" : "text-rose-500"} />
                      <span>{h.dayName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-normal">
                        {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-black ${h.passed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
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
        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full bg-hero-black text-white font-black text-xs py-2.5 rounded-xl hover:bg-slate-800 transition-all"
          >
            Tutup Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
