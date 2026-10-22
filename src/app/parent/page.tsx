'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Shield,
  BarChart,
  Calendar,
  CheckCircle,
  XCircle,
  Award,
  Sparkles,
  Download,
  Trash2,
  Lock,
} from 'lucide-react';
import { LiquidMeshBackground } from '../../components/ui/LiquidGlassPrimitives';
import { ParentalGateModal } from '../../components/ParentalGateModal';
import { StorageService } from '../../services/storageService';
import { ProgressionService } from '../../services/progressionService';
import { audioService } from '../../services/audioService';
import { DailyResult, LearningPillarProgress } from '../../types';
import { ProgressionState } from '../../types/progression';

export default function ParentPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showGate, setShowGate] = useState<boolean>(true);
  const [history, setHistory] = useState<DailyResult[]>([]);
  const [pillars, setPillars] = useState<LearningPillarProgress | null>(null);
  const [progression, setProgression] = useState<ProgressionState | null>(null);

  useEffect(() => {
    // Check if verified in this browser session
    const verified = sessionStorage.getItem('abala_parent_verified');
    if (verified === 'true') {
      setIsVerified(true);
      setShowGate(false);
    }

    setHistory(StorageService.getHistory());
    setPillars(StorageService.getPillarProgress());
    setProgression(ProgressionService.getState());
  }, []);

  const handleGateSuccess = () => {
    sessionStorage.setItem('abala_parent_verified', 'true');
    setIsVerified(true);
    setShowGate(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Apakah Ayah/Bunda yakin ingin mereset riwayat sesi Kak Reza?')) {
      StorageService.removeItem('abala_reza_history_v1');
      StorageService.removeItem('abala_progression_v2');
      StorageService.clearActiveSession();
      setHistory([]);
      setPillars(StorageService.getPillarProgress());
      setProgression(ProgressionService.getState());
      audioService.playFeedback('wrong');
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen w-full max-w-[640px] mx-auto flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-800 relative">
        <LiquidMeshBackground />
        <div className="liquid-glass-card rounded-[32px] p-6 text-center max-w-sm w-full shadow-2xl border border-white/60 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 mx-auto flex items-center justify-center mb-3">
            <Lock size={28} />
          </div>
          <h1 className="text-lg font-black text-slate-900 mb-1">
            Area Khusus Orang Tua
          </h1>
          <p className="text-xs text-slate-600 mb-5">
            Laporan tumbuh kembang dan pengaturan aplikasi dilindungi verifikasi untuk keselamatan anak.
          </p>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 py-3 rounded-2xl liquid-glass text-slate-700 font-black text-xs"
            >
              Kembali
            </Link>
            <button
              onClick={() => setShowGate(true)}
              className="flex-1 py-3 rounded-2xl liquid-tint-ruby text-white font-black text-xs shadow-md"
            >
              Verifikasi
            </button>
          </div>
        </div>

        <ParentalGateModal
          isOpen={showGate}
          onSuccess={handleGateSuccess}
          onClose={() => router.push('/')}
        />
      </div>
    );
  }

  const pillarList = [
    { name: 'Berhitung & Angka (Hari 1)', score: pillars?.berhitung ?? 0, icon: '🔢', color: 'from-blue-500 to-indigo-500' },
    { name: 'Membaca & Fonik (Hari 2)', score: pillars?.membaca ?? 0, icon: '🔤', color: 'from-emerald-500 to-teal-500' },
    { name: 'Menyimak Suara (Hari 3)', score: pillars?.menyimak ?? 0, icon: '👂', color: 'from-purple-500 to-fuchsia-500' },
    { name: 'Logika & Nalar (Hari 4)', score: pillars?.nalar ?? 0, icon: '💡', color: 'from-amber-500 to-orange-500' },
    { name: 'Bentuk & Spasial (Hari 5)', score: pillars?.bentuk ?? 0, icon: '🔷', color: 'from-cyan-500 to-sky-500' },
    { name: 'Kemandirian & Sikap (Hari 6)', score: pillars?.kemandirian ?? 0, icon: '🦸‍♂️', color: 'from-rose-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen w-full max-w-[640px] mx-auto flex flex-col bg-slate-50 text-slate-800 pb-12 relative select-none">
      <LiquidMeshBackground />

      {/* Header */}
      <header className="sticky top-0 z-30 p-3 sm:p-4 liquid-glass-pill mx-2.5 mt-2.5 shadow-sm border border-white/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">
              Dashboard Pendamping
            </div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
              Rapor Belajar Kak Reza
            </h1>
          </div>
        </div>

        <Link
          href="/"
          className="px-3 py-1.5 rounded-xl liquid-glass text-slate-700 font-black text-xs hover:bg-white/80"
        >
          Tutup
        </Link>
      </header>

      {/* Content */}
      <main className="p-3 sm:p-4 space-y-4 relative z-10">
        {/* Child Profile Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4.5 rounded-[28px] shadow-xl border border-white/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[0.68rem] font-extrabold text-amber-300 uppercase tracking-wider">
                Profil Siswa TK A
              </div>
              <h2 className="text-xl font-black">Kak Reza</h2>
              <p className="text-xs text-slate-300 font-medium">
                {progression?.levelTitle} • Level {progression?.level} (Total XP: {progression?.totalXp})
              </p>
            </div>
            <div className="flex items-center gap-1.5 liquid-tint-ruby px-3 py-1.5 rounded-xl border border-white/40 shadow-md">
              <Shield size={16} className="text-white drop-shadow-xs" />
              <span className="text-xs font-black">Siap SD</span>
            </div>
          </div>
        </div>

        {/* 6 Pillars Mastery */}
        <div className="liquid-glass-card rounded-[28px] p-4 shadow-md border border-white/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart size={14} className="text-hero-red" />
              <span>Penguasaan 6 Pilar Belajar</span>
            </h3>
          </div>

          <div className="space-y-3 liquid-glass-subtle p-3.5 rounded-2xl">
            {pillarList.map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span>{p.icon}</span>
                    <span>{p.name}</span>
                  </span>
                  <span className="font-black text-slate-900">{p.score}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/70 rounded-full overflow-hidden shadow-inner border border-white/50">
                  <div
                    className={`h-full bg-gradient-to-r ${p.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${p.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning History */}
        <div className="liquid-glass-card rounded-[28px] p-4 shadow-md border border-white/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={14} className="text-hero-red" />
              <span>Riwayat Sesi Belajar ({history.length})</span>
            </h3>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-[0.68rem] text-rose-600 font-bold hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} />
                <span>Reset Data</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-6 liquid-glass-subtle rounded-2xl">
              <span className="text-2xl mb-1 block">📝</span>
              <p className="text-xs text-slate-500 font-medium">
                Belum ada riwayat sesi belajar. Mulai petualangan belajar pertama!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {history.map((sess, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl liquid-glass-subtle border border-white/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="text-xl">
                      {sess.passed ? (
                        <CheckCircle size={18} className="text-emerald-500" />
                      ) : (
                        <XCircle size={18} className="text-rose-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-800">
                        {sess.dayName}
                      </div>
                      <div className="text-[0.65rem] text-slate-500">
                        {new Date(sess.timestamp).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        sess.passed
                          ? 'liquid-tint-emerald text-white'
                          : 'liquid-tint-rose text-white'
                      }`}
                    >
                      {sess.score} / {sess.total} ({sess.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
