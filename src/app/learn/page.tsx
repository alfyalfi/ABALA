'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  ArrowRight,
  ChevronLeft,
  Play,
  RotateCcw,
  Sparkles,
  BarChart2,
  Bell,
  BellOff,
} from 'lucide-react';
import { LiquidMeshBackground } from '../../components/ui/LiquidGlassPrimitives';
import { GlobalNavBar } from '../../components/GlobalNavBar';
import { ParentalGateModal } from '../../components/ParentalGateModal';
import { ParentDashboardModal } from '../../components/ParentDashboardModal';
import { StorageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { LearningPillarProgress } from '../../types';
import { ActiveLearningSessionState } from '../../types/progression';

const PILLARS_LIST = [
  {
    id: 1,
    name: 'Hari 1',
    title: 'Matematika Superhero',
    icon: '🔢',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'liquid-tint-azure',
    desc: 'Latihan konsep angka, penjumlahan visual, pengurangan visual, perbandingan piring, dan touch counting seru.',
    curriculumTopics: '25 Misi: Hitung Benda, Tambah Apel, Kurang Donat, Pola Bilangan, Bandingkan Jumlah',
  },
  {
    id: 2,
    name: 'Hari 2',
    title: 'Membaca & Fonik',
    icon: '🔤',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'liquid-tint-emerald',
    desc: 'Pengenalan huruf kapital/kecil, suku kata awal, fonik bunyi huruf, dan permainan susun kata interaktif.',
    curriculumTopics: '25 Misi: Huruf Vokal, Suku Kata Ba-Bi-Bu, Word Builder Nama Reza & Benda, Rima Kata',
  },
  {
    id: 3,
    name: 'Hari 3',
    title: 'Menyimak & Suara',
    icon: '👂',
    color: 'from-purple-500 to-fuchsia-600',
    badgeColor: 'liquid-tint-ruby',
    desc: 'Diskriminasi suara autentik hewan, sirine ambulans, deru kereta api, serta tes memori urutan 2-tahap.',
    curriculumTopics: '25 Misi: Tebak Suara Hewan MP3, Kendaraan Kota, Bunyi Alam, Sequence 2-Langkah',
  },
  {
    id: 4,
    name: 'Hari 4',
    title: 'Nalar & Logika',
    icon: '💡',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'liquid-tint-amber',
    desc: 'Melatih pola pikir kritis, analogi benda, perbandingan ukuran/berat/panjang, dan sebab-akibat sederhana.',
    curriculumTopics: '25 Misi: Besar vs Kecil, Sebab Hujan Pakai Payung, Klasifikasi Benda Hidup & Mati',
  },
  {
    id: 5,
    name: 'Hari 5',
    title: 'Bentuk & Spasial',
    icon: '🔷',
    color: 'from-cyan-500 to-sky-600',
    badgeColor: 'liquid-tint-azure',
    desc: 'Eksplorasi geometri 2D dasar, bentuk geometris di kehidupan sehari-hari, dan arah spasial kiri/kanan.',
    curriculumTopics: '25 Misi: Lingkaran, Persegi, Segitiga, Arah Kiri/Kanan, Posisi Atas/Bawah',
  },
  {
    id: 6,
    name: 'Hari 6',
    title: 'Kemandirian Superhero',
    icon: '🦸‍♂️',
    color: 'from-rose-500 to-red-600',
    badgeColor: 'liquid-tint-rose',
    desc: 'Pembiasaan karakter adab, kebersihan diri, mencuci tangan, mengenali emosi, dan keberanian anak.',
    curriculumTopics: '25 Misi: Adab Makan & Tidur, Merapikan Mainan, Berbagi dengan Teman, Tanggap Bahaya',
  },
];

export default function LearnPillarsPage() {
  const router = useRouter();
  const [pillars, setPillars] = useState<LearningPillarProgress | null>(null);
  const [activeSession, setActiveSession] = useState<ActiveLearningSessionState | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showGate, setShowGate] = useState<boolean>(false);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);

  useEffect(() => {
    setPillars(StorageService.getPillarProgress());
    setActiveSession(StorageService.getActiveSession());
    setIsMuted(audioService.getMuted());
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioService.setMuted(nextMuted);
  };

  const handleSoundClick = () => {
    try {
      audioService.playFeedback('step');
    } catch (e) {}
  };

  const getPillarScore = (id: number): number => {
    if (!pillars) return 0;
    switch (id) {
      case 1: return pillars.berhitung;
      case 2: return pillars.membaca;
      case 3: return pillars.menyimak;
      case 4: return pillars.nalar;
      case 5: return pillars.bentuk;
      case 6: return pillars.kemandirian;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[640px] mx-auto flex flex-col bg-slate-50 text-slate-800 pb-24 relative select-none">
      <LiquidMeshBackground />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 p-3 sm:p-4 liquid-glass-pill mx-2.5 mt-2.5 shadow-sm border border-white/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            onClick={handleSoundClick}
            className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">
              Ruang Belajar
            </div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
              Pilih Misi Superhero
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleMute}
            className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red transition-colors"
          >
            {isMuted ? <BellOff size={16} /> : <Bell size={16} />}
          </button>

          <button
            onClick={() => setShowGate(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl liquid-glass text-hero-red font-black text-xs hover:bg-white/80"
          >
            <BarChart2 size={15} />
            <span className="hidden sm:inline">Rapor</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-3 sm:p-4 space-y-3.5 relative z-10">
        {/* ACTIVE SESSION PROMPT */}
        {activeSession && (
          <div className="liquid-glass-card rounded-[24px] p-3.5 shadow-md border-2 border-hero-red/60 bg-rose-50/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl liquid-tint-ruby text-white flex items-center justify-center font-black text-lg animate-pulse">
                ▶️
              </div>
              <div>
                <span className="text-[0.62rem] font-black text-hero-red uppercase">
                  Sesi Belum Selesai
                </span>
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  Lanjutkan {activeSession.dayTitle}
                </h3>
                <span className="text-[0.68rem] text-slate-500 font-bold">
                  Soal {activeSession.currentQIndex + 1} / {activeSession.questions.length}
                </span>
              </div>
            </div>

            <Link
              href={`/learn/${activeSession.dayId}`}
              onClick={handleSoundClick}
              className="px-3.5 py-2 rounded-xl liquid-tint-ruby text-white font-black text-xs shadow-md shrink-0 flex items-center gap-1 hover:scale-105 transition-all"
            >
              <span>Lanjut</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* 6 PILLARS CARDS */}
        <div className="space-y-3">
          {PILLARS_LIST.map((pillar) => {
            const score = getPillarScore(pillar.id);
            const isPillarActive = activeSession?.dayId === pillar.id;

            return (
              <div
                key={pillar.id}
                className="liquid-glass-card rounded-[28px] p-4 shadow-lg border border-white/70 hover:bg-white/90 transition-all flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-2xl bg-white/80 shadow-md flex items-center justify-center text-3xl border border-white/60">
                      {pillar.icon}
                    </div>
                    <div>
                      <span className="text-[0.65rem] font-black text-hero-red uppercase tracking-wider">
                        {pillar.name}
                      </span>
                      <h2 className="text-base font-black text-slate-900 leading-tight">
                        {pillar.title}
                      </h2>
                      <span className="text-[0.68rem] font-extrabold text-slate-400">
                        Target Usia 4–6 Tahun
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-slate-800 bg-white/90 px-2.5 py-0.5 rounded-full shadow-xs border border-white/60">
                      {score}% Kuasai
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${pillar.color} transition-all duration-500 rounded-full`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                {/* Topics summary & action */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <div className="text-[0.65rem] font-bold text-slate-500 line-clamp-1 flex-1">
                    {pillar.curriculumTopics}
                  </div>

                  <Link
                    href={`/learn/${pillar.id}`}
                    onClick={handleSoundClick}
                    className={`px-4 py-2 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 ${
                      isPillarActive
                        ? 'liquid-tint-amber text-slate-950 font-black'
                        : 'liquid-tint-ruby text-white'
                    }`}
                  >
                    <span>{isPillarActive ? 'Lanjutkan Misi' : 'Mulai Petualangan'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <ParentalGateModal
        isOpen={showGate}
        onSuccess={() => {
          setShowGate(false);
          setShowParentModal(true);
        }}
        onClose={() => setShowGate(false)}
      />

      <ParentDashboardModal
        isOpen={showParentModal}
        onClose={() => setShowParentModal(false)}
      />

      <GlobalNavBar />
    </div>
  );
}
