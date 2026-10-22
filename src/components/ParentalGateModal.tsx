'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Check } from 'lucide-react';
import { audioService } from '../services/audioService';

interface ParentalGateModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const ParentalGateModal: React.FC<ParentalGateModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
}) => {
  const [numA, setNumA] = useState<number>(7);
  const [numB, setNumB] = useState<number>(8);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Generate randomized multiplication challenge when opening
  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 5) + 6; // 6 to 10
      const b = Math.floor(Math.random() * 6) + 4; // 4 to 9
      setNumA(a);
      setNumB(b);
      setUserAnswer('');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const correctAnswer = numA * numB;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = parseInt(userAnswer.trim(), 10);
    if (parsed === correctAnswer) {
      audioService.playFeedback('correct');
      onSuccess();
    } else {
      audioService.playFeedback('wrong');
      setErrorMessage('Jawaban salah. Coba lagi untuk membuka area orang tua.');
      setUserAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="liquid-glass-modal rounded-[32px] w-full max-w-sm p-6 shadow-2xl relative overflow-hidden animate-pop border border-white/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-sm">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">Verifikasi Orang Tua</h3>
              <p className="text-[0.7rem] font-bold text-slate-500">Khusus Ayah / Bunda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-slate-600 hover:text-slate-900"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs font-medium text-slate-600 mb-4 leading-relaxed">
          Untuk melindungi anak, selesaikan perhitungan matematika ini untuk membuka rapor dan pengaturan:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="liquid-glass-subtle p-4 rounded-2xl text-center border border-white/40">
            <span className="text-2xl font-black text-slate-800 tracking-wider">
              {numA} × {numB} = ?
            </span>
          </div>

          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Ketik hasil perhitungan..."
            autoFocus
            className="w-full text-center text-xl font-black p-3 rounded-2xl border-2 border-slate-300 focus:border-hero-red focus:outline-hidden bg-white/80"
          />

          {errorMessage && (
            <p className="text-xs font-bold text-rose-600 text-center animate-shake">
              {errorMessage}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl liquid-glass text-slate-700 font-black text-xs hover:bg-white/60"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-2xl liquid-tint-ruby text-white font-black text-xs shadow-lg flex items-center justify-center gap-1.5"
            >
              <Check size={16} />
              <span>Buka Rapor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
