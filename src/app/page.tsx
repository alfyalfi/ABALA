'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { DaySelector } from '../components/DaySelector';
import { QuestionCard } from '../components/QuestionCard';
import { InteractiveArena } from '../components/InteractiveArena';
import { ResultModal } from '../components/ResultModal';
import { ParentDashboardModal } from '../components/ParentDashboardModal';
import { LiquidMeshBackground } from '../components/ui/LiquidGlassPrimitives';
import { ActiveQuestion, DailyResult, SequenceItem } from '../types';
import { audioService } from '../services/audioService';
import { ProgressService } from '../services/supabaseService';

const TIMER_DURATION_NORMAL = 15;
const TIMER_DURATION_EXTENDED = 25;

const DAYS_META = [
  { id: 1, name: 'Hari 1', title: 'Matematika Superhero', icon: '🔢' },
  { id: 2, name: 'Hari 2', title: 'Membaca & Fonik', icon: '🔤' },
  { id: 3, name: 'Hari 3', title: 'Menyimak & Suara', icon: '👂' },
  { id: 4, name: 'Hari 4', title: 'Nalar & Logika', icon: '💡' },
  { id: 5, name: 'Hari 5', title: 'Bentuk & Spasial', icon: '🔷' },
  { id: 6, name: 'Hari 6', title: 'Kemandirian Superhero', icon: '🦸‍♂️' }
];

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
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Mode States: Sequence 2
  const [seqStep, setSeqStep] = useState<number>(1);
  const [seqCompletedIds, setSeqCompletedIds] = useState<string[]>([]);
  const [seqWobbleId, setSeqWobbleId] = useState<string | null>(null);

  // Mode States: Word Builder
  const [builtLetters, setBuiltLetters] = useState<string[]>([]);
  const [usedLetterIndices, setUsedLetterIndices] = useState<number[]>([]);

  // Mode States: Touch Count
  const [countedItems, setCountedItems] = useState<number[]>([]);

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
    const isExtended = q.type === 'sound' || q.type === 'sequence_2' || q.type === 'word_builder';
    return isExtended ? TIMER_DURATION_EXTENDED : TIMER_DURATION_NORMAL;
  };

  // Fetch 25 Questions Session from Backend API (Single Source of Truth)
  const loadDaySession = async (dayIdx: number) => {
    setIsLoadingSession(true);
    setCurrentDayIndex(dayIdx);
    const dayId = DAYS_META[dayIdx].id;

    try {
      const res = await fetch(`/api/curriculum?day=${dayId}&seed=${Date.now()}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setSessionQuestions(data.questions);
        setCurrentQIndex(0);
        setScore({ correct: 0, wrong: 0 });
        setSelectedChoiceIndex(null);
        setIsAnswered(false);
        setShowResultModal(false);
        resetQuestionModes();

        const firstQ = data.questions[0];
        setTimeLeft(getQuestionDuration(firstQ));
      }
    } catch (err) {
      console.error('Failed to load session from backend:', err);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const resetQuestionModes = () => {
    setSeqStep(1);
    setSeqCompletedIds([]);
    setSeqWobbleId(null);
    setBuiltLetters([]);
    setUsedLetterIndices([]);
    setCountedItems([]);
  };

  // On Mount
  useEffect(() => {
    loadDaySession(0); // Start Hari 1

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

  // Timer Effect (Freezes while AI reads/sound plays or when transitioning)
  useEffect(() => {
    if (showResultModal || isPaused || isAnswered || isAudioSpeaking || isLoadingSession || sessionQuestions.length === 0) return;

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
  }, [currentQIndex, isPaused, isAnswered, isAudioSpeaking, isLoadingSession, showResultModal, sessionQuestions]);

  // Voice Question on Change with Synchronized Sequencing
  useEffect(() => {
    if (sessionQuestions.length === 0 || currentQIndex >= sessionQuestions.length || isLoadingSession) return;

    const q = sessionQuestions[currentQIndex];
    setIsAudioSpeaking(true);
    let isCancelled = false;

    const runAudioSequence = async () => {
      try {
        await new Promise(r => setTimeout(r, 200));
        if (isCancelled) return;

        if (q.type === 'sound') {
          // Step 1: AI reads instruction first
          await audioService.speakText(`Kak Reza, dengarkan suara ini!`);
          if (isCancelled) return;

          // Step 2: Natural pause before sound effect
          await new Promise(r => setTimeout(r, 350));
          if (isCancelled) return;

          // Step 3: Authentic MP3 plays
          if (q.soundFile) {
            await audioService.playSoundFile(q.soundFile);
          }
        } else if (q.type === 'sequence_2') {
          await audioService.speakText(
            q.voiceIntro || `Kak Reza, dengarkan urutannya: Pertama sentuh ${q.step1Label}, kedua sentuh ${q.step2Label}!`
          );
        } else if (q.type === 'word_builder') {
          await audioService.speakText(`Kak Reza, ayo susun huruf untuk kata ${q.wordLabel || 'ini'}!`);
        } else {
          await audioService.speakText(`Kak Reza, ${q.prompt}`);
        }
      } catch (err) {
        console.warn('Audio sequence error:', err);
      } finally {
        if (!isCancelled) {
          setIsAudioSpeaking(false);
        }
      }
    };

    runAudioSequence();

    return () => {
      isCancelled = true;
      audioService.stopAllAudio();
      setIsAudioSpeaking(false);
    };
  }, [currentQIndex, sessionQuestions, isLoadingSession]);

  // Handle Standard Choice Selection
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

    setTimeout(() => {
      advanceToNextQuestion();
    }, 700);
  };

  // Handle Interactive Touch Count on Stage
  const handleTapCountItem = (itemIdx: number) => {
    if (countedItems.includes(itemIdx)) return;
    const nextCount = countedItems.length + 1;
    setCountedItems(prev => [...prev, itemIdx]);
    audioService.playCountNote(nextCount);
  };

  // Handle Word Builder Letter Selection
  const handleSelectLetter = (letter: string, chipIdx: number) => {
    if (isAnswered) return;
    const currentQ = sessionQuestions[currentQIndex];
    if (!currentQ.targetWord) return;

    const expectedLetter = currentQ.targetWord[builtLetters.length];

    if (letter === expectedLetter) {
      audioService.playLetterPop();
      const updatedLetters = [...builtLetters, letter];
      setBuiltLetters(updatedLetters);
      setUsedLetterIndices(prev => [...prev, chipIdx]);

      // Check if word completed!
      if (updatedLetters.length === currentQ.targetWord.length) {
        setIsAnswered(true);
        if (timerRef.current) clearInterval(timerRef.current);
        audioService.playFeedback('victory');
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        setFeedbackToast({ show: true, text: '🌟 Kata Sempurna!', type: 'correct' });
        audioService.speakText(`Luar biasa Kak Reza! Kata ${currentQ.wordLabel || ''} berhasil disusun!`);

        setTimeout(() => {
          advanceToNextQuestion();
        }, 1100);
      }
    } else {
      audioService.playFeedback('wrong');
      setFeedbackToast({ show: true, text: `⚠️ Cari huruf ${expectedLetter}!`, type: 'wrong' });
      audioService.speakText(`Cari huruf ${expectedLetter} ya Kak Reza!`);
    }
  };

  // Handle Sequence 2-Step Item Selection
  const handleSelectSequenceItem = (item: SequenceItem) => {
    if (isAnswered) return;
    const currentQ = sessionQuestions[currentQIndex];

    if (seqStep === 1) {
      if (item.id === currentQ.step1Target) {
        audioService.playFeedback('step');
        setSeqStep(2);
        setSeqCompletedIds([item.id]);
        setFeedbackToast({ show: true, text: `✅ Langkah 1 Cocok: ${item.label}!`, type: 'correct' });
        if (currentQ.voiceStep1Done) {
          audioService.speakText(currentQ.voiceStep1Done);
        }
      } else {
        audioService.playFeedback('wrong');
        setSeqWobbleId(item.id);
        setTimeout(() => setSeqWobbleId(null), 500);
        audioService.speakText(`Ingat urutan pertama dulu ya Kak Reza!`);
        setFeedbackToast({ show: true, text: `⚠️ Ingat urutan PERTAMA dulu!`, type: 'wrong' });
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
        setFeedbackToast({ show: true, text: `⚠️ Coba ingat benda KEDUA!`, type: 'wrong' });
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

  // Advance with Superhero Transition Animation
  const advanceToNextQuestion = () => {
    setFeedbackToast(prev => ({ ...prev, show: false }));
    setSelectedChoiceIndex(null);
    resetQuestionModes();

    if (currentQIndex + 1 < sessionQuestions.length) {
      setIsTransitioning(true);
      audioService.playWhoosh();
      setTimeout(() => {
        const nextQ = sessionQuestions[currentQIndex + 1];
        setTimeLeft(getQuestionDuration(nextQ));
        setCurrentQIndex(prev => prev + 1);
        setIsAnswered(false);
        setIsTransitioning(false);
      }, 200);
    } else {
      handleFinishSession();
    }
  };

  // Finish Session & Evaluate 50% Threshold
  const handleFinishSession = () => {
    const total = sessionQuestions.length;
    const finalScore = score.correct + (selectedChoiceIndex !== null && sessionQuestions[currentQIndex]?.choices[selectedChoiceIndex]?.isCorrect ? 1 : 0);
    const finalWrong = total - finalScore;
    const percentage = Math.round((finalScore / total) * 100);
    const passed = percentage >= 50;

    const result: DailyResult = {
      dayId: DAYS_META[currentDayIndex].id,
      dayName: DAYS_META[currentDayIndex].name,
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
      audioService.speakText(`Luar biasa Kak Reza! Benar ${finalScore}, salah ${finalWrong} dari 25 misi! Misi tuntas!`);
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

  const activeDay = DAYS_META[currentDayIndex];
  const activeQuestion = sessionQuestions[currentQIndex];
  const activeDuration = getQuestionDuration(activeQuestion);

  return (
    <div className="w-full h-[100dvh] max-w-[640px] mx-auto flex flex-col justify-between p-2.5 sm:p-3.5 text-slate-800 relative overflow-hidden select-none">
      {/* Ambient Fluid Background Refraction Mesh */}
      <LiquidMeshBackground />

      {/* ======================================================== */}
      {/* TOP COMPACT NAVIGATION BAR (~12% HEIGHT) */}
      {/* ======================================================== */}
      <div className="shrink-0 flex flex-col gap-1.5 w-full relative z-20">
        {/* Header with Reza Identity & Controls */}
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
                  setTimeout(() => audioService.playSoundFile(activeQuestion.soundFile!), 1400);
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

        {/* 6-Day Navigation Selector */}
        <DaySelector
          days={DAYS_META}
          activeDayIndex={currentDayIndex}
          onSelectDay={(idx) => loadDaySession(idx)}
        />

        {/* Status Progress & Timer */}
        <div className="flex items-center justify-between text-[0.72rem] font-black px-0.5">
          <span className="liquid-glass-pill px-3 py-0.5 text-hero-red font-sans shadow-xs">
            Misi {currentQIndex + 1} / {sessionQuestions.length || 25}
          </span>
          <span
            className={`flex items-center gap-1 px-3 py-0.5 rounded-full font-sans shadow-xs transition-all duration-300 ${
              isAudioSpeaking
                ? 'liquid-tint-azure text-white animate-pulse'
                : timeLeft <= 5
                ? 'liquid-tint-rose text-white animate-pulse'
                : 'liquid-tint-amber text-white'
            }`}
          >
            <span>{isAudioSpeaking ? '🎧 Menyimak...' : '⏳'}</span>
            <span>{timeLeft}s</span>
          </span>
        </div>

        {/* Animated Timer Progress Bar with Liquid Glow */}
        <div className="w-full h-2 bg-white/60 backdrop-blur-md rounded-full overflow-hidden shadow-inner border border-white/60 p-0.5">
          <div
            className={`h-full transition-all duration-300 rounded-full shadow-xs ${
              isAudioSpeaking
                ? 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : timeLeft <= 5
                ? 'liquid-tint-rose animate-pulse'
                : 'bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500'
            }`}
            style={{ width: `${(timeLeft / activeDuration) * 100}%` }}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 50 / 50 BALANCED ARENA: TOP QUESTION STAGE & BOTTOM ANSWER ARENA */}
      {/* ======================================================== */}
      <div className="flex-1 w-full flex flex-col gap-2 min-h-0 overflow-hidden my-1 relative z-10">
        {isLoadingSession ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 liquid-glass-card rounded-3xl sm:rounded-[32px] shadow-2xl">
            <div className="w-12 h-12 rounded-full border-4 border-hero-red border-t-transparent animate-spin shadow-md" />
            <span className="text-sm font-black text-slate-800 drop-shadow-xs">
              ⚡ Menyiapkan 25 Misi Superhero Kak Reza...
            </span>
          </div>
        ) : (
          <>
            {/* TOP 50%: QUESTION STAGE */}
            <div
              className={`h-[49%] w-full transition-all duration-200 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {activeQuestion && (
                <QuestionCard
                  question={activeQuestion}
                  dayIcon={activeDay.icon}
                  feedbackToast={feedbackToast}
                  seqStep={seqStep}
                  seqCompletedIds={seqCompletedIds}
                  isAudioPlaying={isAudioSpeaking}
                  builtLetters={builtLetters}
                  countedItems={countedItems}
                  onTapCountItem={handleTapCountItem}
                />
              )}
            </div>

            {/* BOTTOM 50%: INTERACTIVE ANSWER ARENA */}
            <div
              className={`h-[49%] w-full transition-all duration-200 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {activeQuestion && (
                <InteractiveArena
                  questionType={activeQuestion.type}
                  choices={activeQuestion.choices}
                  onSelectChoice={handleSelectChoice}
                  selectedIndex={selectedChoiceIndex}
                  isAnswered={isAnswered}
                  sequenceItems={activeQuestion.sequenceItems}
                  onSelectSequenceItem={handleSelectSequenceItem}
                  seqCompletedIds={seqCompletedIds}
                  seqWobbleId={seqWobbleId}
                  targetWord={activeQuestion.targetWord}
                  letterChoices={activeQuestion.letterChoices}
                  builtLetters={builtLetters}
                  onSelectLetter={handleSelectLetter}
                  usedLetterIndices={usedLetterIndices}
                  isComparison={activeQuestion.type === 'comparison'}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}
      {showResultModal && currentResult && (
        <ResultModal
          result={currentResult}
          dayName={activeDay.name}
          nextDayName={DAYS_META[(currentDayIndex + 1) % DAYS_META.length].name}
          onRetry={() => loadDaySession(currentDayIndex)}
          onNextDay={() => loadDaySession((currentDayIndex + 1) % DAYS_META.length)}
          onGoHome={() => loadDaySession(0)}
        />
      )}

      <ParentDashboardModal
        isOpen={showParentDashboard}
        onClose={() => setShowParentDashboard(false)}
      />

    </div>
  );
}
