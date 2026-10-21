'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { DaySelector } from '../components/DaySelector';
import { QuestionCard } from '../components/QuestionCard';
import { ChoicesGrid } from '../components/ChoicesGrid';
import { ResultModal } from '../components/ResultModal';
import { ParentDashboardModal } from '../components/ParentDashboardModal';
import { ALL_DAYS } from '../data/dailyCurriculum';
import { ActiveQuestion, DailyResult, SequenceItem } from '../types';
import { audioService } from '../services/audioService';
import { ProgressService } from '../services/supabaseService';

const TIMER_DURATION_NORMAL = 15;
const TIMER_DURATION_LISTENING = 25;

export default function HomePage() {
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [sessionQuestions, setSessionQuestions] = useState<ActiveQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION_NORMAL);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioSpeaking, setIsAudioSpeaking] = useState<boolean>(true);

  // Sequence 2 Interactive State
  const [seqStep, setSeqStep] = useState<number>(1);
  const [seqCompletedIds, setSeqCompletedIds] = useState<string[]>([]);
  const [seqWobbleId, setSeqWobbleId] = useState<string | null>(null);

  // Toast Notification State
  const [feedbackToast, setFeedbackToast] = useState<{
    show: boolean;
    text: string;
    type: 'correct' | 'wrong' | 'timeout';
  }>({ show: false, text: '', type: 'correct' });

  // Modal States
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<DailyResult | null>(null);
  const [showParentDashboard, setShowParentDashboard] = useState<boolean>(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getQuestionDuration = (q?: ActiveQuestion) => {
    if (!q) return TIMER_DURATION_NORMAL;
    return q.type === 'sound' || q.type === 'sequence_2'
      ? TIMER_DURATION_LISTENING
      : TIMER_DURATION_NORMAL;
  };

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
        step1Target: v.step1Target,
        step2Target: v.step2Target,
        step1Label: v.step1Label,
        step2Label: v.step2Label,
        voiceIntro: v.voiceIntro,
        voiceStep1Done: v.voiceStep1Done,
        voiceSuccess: v.voiceSuccess,
        sequenceItems: v.sequenceItems,
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
    setSeqStep(1);
    setSeqCompletedIds([]);
    setSeqWobbleId(null);

    const firstQ = randomized[0];
    setTimeLeft(getQuestionDuration(firstQ));
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

  // Timer Effect (Freezes while AI speaks / plays audio)
  useEffect(() => {
    if (showResultModal || isPaused || isAnswered || isAudioSpeaking || sessionQuestions.length === 0) return;

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
  }, [currentQIndex, isPaused, isAnswered, isAudioSpeaking, showResultModal, sessionQuestions]);

  // Voice Question on Change with Orderly Audio Sequencing: Prompt first -> Sound effect second
  useEffect(() => {
    if (sessionQuestions.length === 0 || currentQIndex >= sessionQuestions.length) return;

    const q = sessionQuestions[currentQIndex];
    setIsAudioSpeaking(true);
    let isCancelled = false;

    const runAudioSequence = async () => {
      // Small pause before voice starts
      await new Promise(r => setTimeout(r, 200));
      if (isCancelled) return;

      if (q.type === 'sound') {
        // Step 1: AI reads instruction first!
        await audioService.speakText(`Kak Reza, dengarkan suara ini!`);
        if (isCancelled) return;

        // Step 2: Natural pause before sound effect
        await new Promise(r => setTimeout(r, 350));
        if (isCancelled) return;

        // Step 3: Authentic sound effect plays!
        if (q.soundFile) {
          await audioService.playSoundFile(q.soundFile);
        }
      } else if (q.type === 'sequence_2') {
        // Read full 2-step mission instruction
        await audioService.speakText(
          q.voiceIntro || `Kak Reza, dengarkan urutannya: Pertama sentuh ${q.step1Label}, kedua sentuh ${q.step2Label}!`
        );
      } else {
        // Standard question prompt
        await audioService.speakText(`Kak Reza, ${q.prompt}`);
      }

      if (isCancelled) return;
      // Audio finished! Unfreeze timer and let child answer
      setIsAudioSpeaking(false);
    };

    runAudioSequence();

    return () => {
      isCancelled = true;
      audioService.stopAllAudio();
    };
  }, [currentQIndex, sessionQuestions]);

  // Handle Choice Selection for Standard Questions
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

    // Auto-advance after 700ms
    setTimeout(() => {
      advanceToNextQuestion();
    }, 700);
  };

  // Handle Interactive 2-Step Item Selection
  const handleSelectSequenceItem = (item: SequenceItem) => {
    if (isAnswered) return;
    const currentQ = sessionQuestions[currentQIndex];

    if (seqStep === 1) {
      if (item.id === currentQ.step1Target) {
        audioService.playFeedback('step');
        setSeqStep(2);
        setSeqCompletedIds([item.id]);
        setFeedbackToast({ show: true, text: `✅ Langkah 1: ${item.label} Cocok!`, type: 'correct' });
        if (currentQ.voiceStep1Done) {
          audioService.speakText(currentQ.voiceStep1Done);
        }
      } else {
        audioService.playFeedback('wrong');
        setSeqWobbleId(item.id);
        setTimeout(() => setSeqWobbleId(null), 500);
        audioService.speakText(`Ingat urutan pertama dulu ya Kak Reza!`);
        setFeedbackToast({ show: true, text: `⚠️ Ingat urutan pertama dulu!`, type: 'wrong' });
      }
    } else if (seqStep === 2) {
      if (item.id === currentQ.step2Target) {
        setIsAnswered(true);
        if (timerRef.current) clearInterval(timerRef.current);
        audioService.playFeedback('victory');
        setSeqCompletedIds(prev => [...prev, item.id]);
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        setFeedbackToast({ show: true, text: `🌟 Urutan Sempurna!`, type: 'correct' });
        if (currentQ.voiceSuccess) {
          audioService.speakText(currentQ.voiceSuccess);
        }
        setTimeout(() => {
          advanceToNextQuestion();
        }, 1100);
      } else {
        audioService.playFeedback('wrong');
        setSeqWobbleId(item.id);
        setTimeout(() => setSeqWobbleId(null), 500);
        audioService.speakText(`Coba ingat benda kedua yang tadi ya Kak Reza!`);
        setFeedbackToast({ show: true, text: `⚠️ Coba ingat benda kedua!`, type: 'wrong' });
      }
    }
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
    }, 700);
  };

  // Advance
  const advanceToNextQuestion = () => {
    setFeedbackToast(prev => ({ ...prev, show: false }));
    setSelectedChoiceIndex(null);
    setIsAnswered(false);
    setSeqStep(1);
    setSeqCompletedIds([]);
    setSeqWobbleId(null);

    if (currentQIndex + 1 < sessionQuestions.length) {
      const nextQ = sessionQuestions[currentQIndex + 1];
      setTimeLeft(getQuestionDuration(nextQ));
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
  const activeDuration = getQuestionDuration(activeQuestion);

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
              if (activeQuestion.soundFile) {
                setTimeout(() => audioService.playSoundFile(activeQuestion.soundFile!), 1500);
              }
            } else if (activeQuestion.type === 'sequence_2') {
              audioService.speakText(
                activeQuestion.voiceIntro || `Kak Reza, dengarkan urutannya: Pertama sentuh ${activeQuestion.step1Label}, kedua sentuh ${activeQuestion.step2Label}!`
              );
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
          <span
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border font-sans ${
              isAudioSpeaking
                ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            <span>{isAudioSpeaking ? '🎧 Menyimak...' : '⏳'}</span>
            <span>{timeLeft}s</span>
          </span>
        </div>

        {/* Timer Bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isAudioSpeaking
                ? 'bg-blue-400'
                : timeLeft <= 5
                ? 'bg-hero-danger'
                : 'bg-gradient-to-r from-emerald-500 to-amber-500'
            }`}
            style={{ width: `${(timeLeft / activeDuration) * 100}%` }}
          />
        </div>
      </div>

      {/* 4. Main Question Card */}
      {activeQuestion ? (
        <QuestionCard
          question={activeQuestion}
          dayIcon={activeDay.icon}
          feedbackToast={feedbackToast}
          seqStep={seqStep}
          seqCompletedIds={seqCompletedIds}
          isAudioPlaying={isAudioSpeaking}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center font-bold text-slate-400">
          Memuat petualangan Kak Reza...
        </div>
      )}

      {/* 5. Interactive Choices Grid (Supports 2-Step Sequence and Standard Grid) */}
      {activeQuestion && (
        <ChoicesGrid
          choices={activeQuestion.choices}
          onSelectChoice={handleSelectChoice}
          selectedIndex={selectedChoiceIndex}
          isAnswered={isAnswered}
          questionType={activeQuestion.type}
          sequenceItems={activeQuestion.sequenceItems}
          onSelectSequenceItem={handleSelectSequenceItem}
          seqCompletedIds={seqCompletedIds}
          seqWobbleId={seqWobbleId}
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
