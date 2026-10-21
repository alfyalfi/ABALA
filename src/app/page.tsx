'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ALL_DAYS } from '@/data/dailyCurriculum';
import { ActiveQuestion, DailyResult } from '@/types';
import { audioService } from '@/services/audioService';
import { ProgressService } from '@/services/supabaseService';
import { Header } from '@/components/Header';
import { DaySelector } from '@/components/DaySelector';
import { QuestionCard } from '@/components/QuestionCard';
import { ChoicesGrid } from '@/components/ChoicesGrid';
import { ResultModal } from '@/components/ResultModal';
import { ParentDashboardModal } from '@/components/ParentDashboardModal';

export default function Home() {
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0); // Default Day 1 (Berhitung)
  const [sessionQuestions, setSessionQuestions] = useState<ActiveQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });

  // Timer
  const TIMER_DURATION = 18;
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals & Feedback
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<DailyResult | null>(null);
  const [showParentDashboard, setShowParentDashboard] = useState<boolean>(false);

  const [feedbackToast, setFeedbackToast] = useState<{
    show: boolean;
    text: string;
    type: 'correct' | 'wrong' | 'timeout';
  }>({ show: false, text: '', type: 'correct' });

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Day Questions with Random Variations
  const initializeDaySession = (dayIdx: number) => {
    setCurrentDayIndex(dayIdx);
    const day = ALL_DAYS[dayIdx];

    // Pick 1 random variation from the 30 variations in each slot
    const randomized: ActiveQuestion[] = day.questions.map((slot, sIdx) => {
      const v = slot.variants[Math.floor(Math.random() * slot.variants.length)];
      return {
        slotIndex: sIdx,
        type: v.type,
        topic: slot.topic,
        prompt: v.prompt,
        visual: v.visual,
        countItems: v.countItems,
        soundFile: v.soundFile,
        soundLabel: v.soundLabel,
        choices: v.choices,
        realImage: v.realImage
      };
    });

    setSessionQuestions(randomized);
    setCurrentQIndex(0);
    setScore({ correct: 0, wrong: 0 });
    setSelectedChoiceIndex(null);
    setIsAnswered(false);
    setShowResultModal(false);
    setTimeLeft(TIMER_DURATION);
  };

  // On Mount
  useEffect(() => {
    initializeDaySession(0); // Start Hari 1

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer Effect
  useEffect(() => {
    if (showResultModal || isPaused || isAnswered || sessionQuestions.length === 0) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQIndex, isPaused, isAnswered, showResultModal, sessionQuestions]);

  // Voice Question on Change
  useEffect(() => {
    if (sessionQuestions.length > 0 && currentQIndex < sessionQuestions.length) {
      const q = sessionQuestions[currentQIndex];
      const timer = setTimeout(() => {
        if (q.type === 'sound') {
          audioService.speakText(`Kak Reza, dengarkan suara ini!`);
        } else {
          audioService.speakText(`Kak Reza, ${q.prompt}`);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentQIndex, sessionQuestions]);

  // Handle Choice Selection
  const handleSelectChoice = (choiceIdx: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedChoiceIndex(choiceIdx);
    if (timerRef.current) clearInterval(timerRef.current);

    const currentQ = sessionQuestions[currentQIndex];
    const chosen = currentQ.choices[choiceIdx];
    const isCorrect = chosen.isCorrect;

    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      audioService.playFeedback('correct');
      audioService.speakText('Benar! Hebat Kak Reza!');
      setFeedbackToast({ show: true, text: '✅ Benar!', type: 'correct' });
    } else {
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      audioService.playFeedback('wrong');
      audioService.speakText('Salah! Tetap semangat Kak Reza!');
      setFeedbackToast({ show: true, text: '❌ Salah!', type: 'wrong' });
    }

    // Auto-advance after 650ms
    setTimeout(() => {
      advanceToNextQuestion();
    }, 650);
  };

  // Handle Timeout
  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);

    setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    audioService.playFeedback('timeout');
    audioService.speakText('Waktu habis! Lanjut ya Kak Reza!');
    setFeedbackToast({ show: true, text: '⏳ Waktu Habis!', type: 'timeout' });

    setTimeout(() => {
      advanceToNextQuestion();
    }, 650);
  };

  // Advance
  const advanceToNextQuestion = () => {
    setFeedbackToast(prev => ({ ...prev, show: false }));
    setSelectedChoiceIndex(null);
    setIsAnswered(false);
    setTimeLeft(TIMER_DURATION);

    if (currentQIndex + 1 < sessionQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      handleFinishSession();
    }
  };

  // Finish Session & Evaluate 50%
  const handleFinishSession = () => {
    const total = sessionQuestions.length;
    const finalScore = score.correct + (selectedChoiceIndex !== null && sessionQuestions[currentQIndex]?.choices[selectedChoiceIndex]?.isCorrect ? 1 : 0);
    const finalWrong = total - finalScore;
    const percentage = Math.round((finalScore / total) * 100);
    const passed = percentage >= 50;

    const result: DailyResult = {
      dayId: ALL_DAYS[currentDayIndex].id,
      dayName: ALL_DAYS[currentDayIndex].name,
      score: finalScore,
      wrong: finalWrong,
      total,
      percentage,
      passed,
      timestamp: new Date().toISOString()
    };

    setCurrentResult(result);
    setShowResultModal(true);

    ProgressService.saveSession(result);

    if (passed) {
      audioService.playFeedback('victory');
      audioService.speakText(`Luar biasa Kak Reza! Benar ${finalScore}, salah ${finalWrong}. Misi tuntas!`);
    } else {
      audioService.playFeedback('wrong');
      audioService.speakText(`Skor Kak Reza belum mencapai 50 persen. Ayo kita coba ulangi lagi bersama!`);
    }
  };

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const activeDay = ALL_DAYS[currentDayIndex];
  const activeQuestion = sessionQuestions[currentQIndex];

  return (
    <div className="w-full h-[100dvh] max-w-[620px] mx-auto flex flex-col justify-between p-3.5 sm:p-4 bg-hero-bg text-hero-black relative overflow-hidden">
      
      {/* 1. Header with Reza Identity & Controls */}
      <Header
        dayName={activeDay.name}
        dayTitle={activeDay.title}
        isMuted={isMuted}
        isPaused={isPaused}
        onToggleMute={() => {
          setIsMuted(!isMuted);
          audioService.setMuted(!isMuted);
        }}
        onTogglePause={() => setIsPaused(!isPaused)}
        onSpeakPrompt={() => {
          if (activeQuestion) {
            if (activeQuestion.type === 'sound') {
              audioService.speakText(`Kak Reza, dengarkan suara ini!`);
            } else {
              audioService.speakText(`Kak Reza, ${activeQuestion.prompt}`);
            }
          }
        }}
        onOpenParentDashboard={() => setShowParentDashboard(true)}
        deferredPrompt={deferredPrompt}
        onInstallPwa={handleInstallPwa}
      />

      {/* 2. 6-Day Selector Navigation */}
      <DaySelector
        days={ALL_DAYS}
        activeDayIndex={currentDayIndex}
        onSelectDay={(idx) => initializeDaySession(idx)}
      />

      {/* 3. Status Progress & Timer */}
      <div className="w-full mb-1">
        <div className="flex items-center justify-between text-xs font-black text-slate-500 mb-1">
          <span className="bg-red-50 text-hero-red px-2.5 py-0.5 rounded-full border border-red-100 font-sans">
            Soal {currentQIndex + 1} / {sessionQuestions.length}
          </span>
          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200 font-sans">
            <span>⏳</span>
            <span>{timeLeft}s</span>
          </span>
        </div>

        {/* Timer Bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              timeLeft <= 5 ? 'bg-hero-danger' : 'bg-gradient-to-r from-emerald-500 to-amber-500'
            }`}
            style={{ width: `${(timeLeft / TIMER_DURATION) * 100}%` }}
          />
        </div>
      </div>

      {/* 4. Main Question Card */}
      {activeQuestion ? (
        <QuestionCard
          question={activeQuestion}
          dayIcon={activeDay.icon}
          feedbackToast={feedbackToast}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center font-bold text-slate-400">
          Memuat petualangan Kak Reza...
        </div>
      )}

      {/* 5. Interactive Choices Grid (Auto-Advance, No Next Button) */}
      {activeQuestion && (
        <ChoicesGrid
          choices={activeQuestion.choices}
          onSelectChoice={handleSelectChoice}
          selectedIndex={selectedChoiceIndex}
          isAnswered={isAnswered}
        />
      )}

      {/* 6. Result Modal at Session End */}
      {showResultModal && currentResult && (
        <ResultModal
          result={currentResult}
          dayName={activeDay.name}
          nextDayName={ALL_DAYS[(currentDayIndex + 1) % ALL_DAYS.length].name}
          onRetry={() => initializeDaySession(currentDayIndex)}
          onNextDay={() => initializeDaySession((currentDayIndex + 1) % ALL_DAYS.length)}
          onGoHome={() => initializeDaySession(0)}
        />
      )}

      {/* 7. Parent Dashboard & Growth Analytics */}
      <ParentDashboardModal
        isOpen={showParentDashboard}
        onClose={() => setShowParentDashboard(false)}
      />

    </div>
  );
}
