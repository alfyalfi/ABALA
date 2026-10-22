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
  RotateCcw,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { LiquidMeshBackground } from '../../components/ui/LiquidGlassPrimitives';
import { ParentalGateModal } from '../../components/ParentalGateModal';
import { StorageService } from '../../services/storageService';
import { ProgressionService } from '../../services/progressionService';
import { ProgressService } from '../../services/supabaseService';
import { audioService } from '../../services/audioService';
import { CATEGORIES_META } from '../../data/categoriesMeta';
import { DailyResult, LearningPillarProgress } from '../../types';
import { ProgressionState } from '../../types/progression';

const PILLAR_KEYS: Record<number, keyof LearningPillarProgress> = {
  1: 'berhitung',
  2: 'membaca',
  3: 'menyimak',
  4: 'nalar',
  5: 'bentuk',
  6: 'kemandirian',
};

export default function ParentPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showGate, setShowGate] = useState<boolean>(true);
  const [history, setHistory] = useState<DailyResult[]>([]);
  const [pillars, setPillars] = useState<LearningPillarProgress | null>(null);
  const [progression, setProgression] = useState<ProgressionState | null>(null);

  // Reset Progress States
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

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

  // Total Progress Reset (Database + Local Sync)
  const handleExecuteTotalReset = async () => {
    setIsResetting(true);
    try {
      // 1. Sync & delete from Supabase Database
      const dbResult = await ProgressService.resetDatabaseProgress();

      // 2. Wipe and reset local storage progression & pillars
      const resetState = StorageService.resetAllProgress();

      // 3. Immediately update UI state
      setHistory([]);
      setPillars(StorageService.getPillarProgress());
      setProgression(resetState);

      audioService.playFeedback('wrong');
      setResetFeedback(dbResult.message || 'Semua progres belajar berhasil direset ke nol dan disinkronkan ke database!');
      setShowResetConfirmModal(false);

      setTimeout(() => {
        setResetFeedback(null);
      }, 5000);
    } catch (err: any) {
      console.error('Failed to reset progress:', err);
      // Fallback: make sure local is still cleanly reset
      const resetState = StorageService.resetAllProgress();
      setHistory([]);
      setPillars(StorageService.getPillarProgress());
      setProgression(resetState);
      setResetFeedback('Progres lokal telah direset ke nol (koneksi database offline).');
      setShowResetConfirmModal(false);
    } finally {
      setIsResetting(false);
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
              className="flex-1 py-3 rounded-2xl liquid-glass text-slate-700 font-black text-xs text-center"
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

  // Dynamic Pillar List based on unified CATEGORIES_META
  const pillarList = CATEGORIES_META.map((cat) => {
    const key = PILLAR_KEYS[cat.id];
    return {
      name: `${cat.title} (${cat.dayName})`,
      score: pillars ? (pillars[key] ?? 0) : 0,
      icon: cat.icon,
      color: cat.color,
    };
  });

  return (
    <div className="min-h-screen w-full max-w-[640px] mx-auto flex flex-col bg-slate-50 text-slate-800 pb-16 relative select-none">
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

      {/* Notification Toast if Reset Performed */}
      {resetFeedback && (
        <div className="mx-3 mt-3 p-3 rounded-2xl liquid-tint-emerald text-white flex items-center gap-2 shadow-lg animate-pop z-20">
          <CheckCircle2 size={18} className="shrink-0" />
          <span className="text-xs font-black">{resetFeedback}</span>
        </div>
      )}

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
          </div>

          {history.length === 0 ? (
            <div className="text-center py-6 liquid-glass-subtle rounded-2xl">
              <span className="text-2xl mb-1 block">📝</span>
              <p className="text-xs text-slate-500 font-medium">
                Belum ada riwayat sesi belajar. Mulai petualangan belajar pertama!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
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

        {/* DANGER ZONE: TOTAL PROGRESS RESET (SYNCS WITH SUPABASE DATABASE) */}
        <div className="liquid-glass-card rounded-[28px] p-4.5 shadow-md border border-rose-200/80 bg-rose-50/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
            <h3 className="text-xs font-black text-rose-700 uppercase tracking-wider">
              Zona Pengaturan & Reset Total Progres
            </h3>
          </div>

          <p className="text-[0.72rem] text-slate-600 mb-4 leading-relaxed">
            Mereset total seluruh level, XP (0), riwayat sesi, dan nilai 6 pilar belajar kembali ke nol. Data akan disinkronkan dan dihapus dari database server Supabase serta memori perangkat ini.
          </p>

          <button
            onClick={() => setShowResetConfirmModal(true)}
            className="w-full py-3 px-4 rounded-2xl liquid-tint-rose text-white font-black text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <RotateCcw size={16} />
            <span>Reset Total Semua Progres (Kembali ke Nol)</span>
          </button>
        </div>
      </main>

      {/* CONFIRMATION MODAL FOR TOTAL RESET */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="liquid-glass-modal rounded-[32px] p-6 max-w-sm w-full shadow-2xl border border-rose-300 text-center animate-pop relative">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <RotateCcw size={28} className="animate-spin-slow" />
            </div>

            <h3 className="text-base font-black text-slate-900 mb-2">
              Reset Total Seluruh Progres?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Aksi ini akan mereset <strong>seluruh XP, Level, Koleksi, dan Riwayat Sesi</strong> Kak Reza kembali ke <strong>0</strong>. 
              <br />
              <span className="text-rose-600 font-bold block mt-1">
                Data pada database Supabase dan penyimpanan lokal akan dihapus permanen.
              </span>
            </p>

            <div className="flex gap-2">
              <button
                disabled={isResetting}
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-3 rounded-2xl liquid-glass text-slate-700 font-black text-xs hover:bg-white/80"
              >
                Batal
              </button>

              <button
                disabled={isResetting}
                onClick={handleExecuteTotalReset}
                className="flex-1 py-3 rounded-2xl liquid-tint-rose text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 hover:brightness-105"
              >
                {isResetting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Mereset DB...</span>
                  </>
                ) : (
                  <span>Ya, Reset Total</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
