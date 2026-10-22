'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Volume2, Bell, BellOff, Pause, Play, BarChart2 } from 'lucide-react';
import { Header } from '../../../components/Header';
import { QuestionCard } from '../../../components/QuestionCard';
import { InteractiveArena } from '../../../components/InteractiveArena';
import { ResultModal } from '../../../components/ResultModal';
import { ParentDashboardModal } from '../../../components/ParentDashboardModal';
import { ParentalGateModal } from '../../../components/ParentalGateModal';
import { LiquidMeshBackground } from '../../../components/ui/LiquidGlassPrimitives';
import { ActiveQuestion, DailyResult, SequenceItem } from '../../../types';
import { AchievementDefinition, CollectibleDefinition, ActiveLearningSessionState } from '../../../types/progression';
import { audioService } from '../../../services/audioService';
import { CurriculumService } from '../../../services/curriculumService';
import { StorageService } from '../../../services/storageService';
import { ProgressionService } from '../../../services/progressionService';

const TIMER_DURATION_NORMAL = 15;
const TIMER_DURATION_EXTENDED = 25;

const DAYS_META = [
  { id: 1, name: 'Hari 1', title: 'Matematika Superhero', icon: '🔢' },
  { id: 2, name: 'Hari 2', title: 'Membaca & Fonik', icon: '🔤' },
  { id: 3, name: 'Hari 3', title: 'Menyimak & Suara', icon: '👂' },
  { id: 4, name: 'Hari 4', title: 'Nalar & Logika', icon: '💡' },
  { id: 5, name: 'Hari 5', title: 'Bentuk & Spasial', icon: '🔷' },
  { id: 6, name: 'Hari 6', title: 'Kemandirian Superhero', icon: '🦸‍♂️' },
];

export default function LearnSessionPage() {
  const params = useParams();
  const router = useRouter();

  const rawDayId = params?.dayId ? parseInt(params.dayId as string, 10) : 1;
  const targetDayId = isNaN(rawDayId) || rawDayId < 1 || rawDayId > 6 ? 1 : rawDayId;
  const currentDayIndex = targetDayId - 1;
  const activeDay = DAYS_META[currentDayIndex];

  // Session State
  const [sessionId, setSessionId] = useState<string>('');
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
  const [resultXpAwarded, setResultXpAwarded] = useState<number>(0);
  const [resultNewLevel, setResultNewLevel] = useState<number>(1);
  const [resultLevelTitle, setResultLevelTitle] = useState<string>('');
  const [resultNewAchievements, setResultNewAchievements] = useState<AchievementDefinition[]>([]);
  const [resultNewCollectibles, setResultNewCollectibles] = useState<CollectibleDefinition[]>([]);
  const [showGate, setShowGate] = useState<boolean>(false);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getQuestionDuration = (q?: ActiveQuestion) => {
    if (!q) return TIMER_DURATION_NORMAL;
    const isExtended = q.type === 'sound' || q.type === 'sequence_2' || q.type === 'word_builder';
    return isExtended ? TIMER_DURATION_EXTENDED : TIMER_DURATION_NORMAL;
  };

  const resetQuestionModes = () => {
    setSeqStep(1);
    setSeqCompletedIds([]);
    setSeqWobbleId(null);
    setBuiltLetters([]);
    setUsedLetterIndices([]);
    setCountedItems([]);
  };

  // Load Session: Check for active resumable session or fetch new
  const initSession = async (dayId: number) => {
    setIsLoadingSession(true);
    setIsMuted(audioService.getMuted());

    // 1. Check for resumable session
    const existing = StorageService.getActiveSession();
    if (existing && existing.dayId === dayId && existing.questions && existing.questions.length > 0) {
      setSessionId(existing.sessionId);
      setSessionQuestions(existing.questions);
      setCurrentQIndex(existing.currentQIndex);
      setScore(existing.score);
      setSelectedChoiceIndex(null);
      setIsAnswered(false);
      setShowResultModal(false);
      resetQuestionModes();

      const q = existing.questions[existing.currentQIndex];
      setTimeLeft(getQuestionDuration(q));
      setIsLoadingSession(false);
      return;
    }

    // 2. Fetch fresh session (Offline-First)
    try {
      const result = await CurriculumService.loadDaySession(dayId);
      if (result.success && result.questions.length > 0) {
        const newSessionId = `sess_${dayId}_${Date.now()}`;
        setSessionId(newSessionId);
        setSessionQuestions(result.questions);
        setCurrentQIndex(0);
        setScore({ correct: 0, wrong: 0 });
        setSelectedChoiceIndex(null);
        setIsAnswered(false);
        setShowResultModal(false);
        resetQuestionModes();

        // Save new active session
        const newActiveState: ActiveLearningSessionState = {
          sessionId: newSessionId,
          dayId,
          dayName: activeDay.name,
          dayTitle: activeDay.title,
          currentQIndex: 0,
          score: { correct: 0, wrong: 0 },
          answers: [],
          questions: result.questions,
          startTime: new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString(),
        };
        StorageService.saveActiveSession(newActiveState);

        const firstQ = result.questions[0];
        setTimeLeft(getQuestionDuration(firstQ));
      }
    } catch (err) {
      console.error('Failed to initialize session:', err);
    } finally {
      setIsLoadingSession(false);
    }
  };

  useEffect(() => {
    initSession(targetDayId);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      audioService.stopAllAudio();
    };
  }, [targetDayId]);

  // Timer Effect
  useEffect(() => {
    if (showResultModal || isPaused || isAnswered || isAudioSpeaking || isLoadingSession || sessionQuestions.length === 0) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
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
        await new Promise((r) => setTimeout(r, 200));
        if (isCancelled) return;

        if (q.type === 'sound') {
          await audioService.speakText(`Kak Reza, dengarkan suara ini!`);
          if (isCancelled) return;

          await new Promise((r) => setTimeout(r, 350));
          if (isCancelled) return;

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

  // Handle Standard / Comparison Choice Selection (Called after 2nd tap confirmation)
  const handleSelectChoice = (choiceIdx: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedChoiceIndex(choiceIdx);
    if (timerRef.current) clearInterval(timerRef.current);

    const currentQ = sessionQuestions[currentQIndex];
    if (!currentQ || !currentQ.choices || !currentQ.choices[choiceIdx]) {
      setTimeout(() => advanceToNextQuestion(), 300);
      return;
    }

    const chosen = currentQ.choices[choiceIdx];
    const isCorrect = Boolean(chosen.isCorrect);

    // Award XP (Idempotent)
    ProgressionService.awardQuestionAttempt(sessionId, currentQIndex, isCorrect);

    if (isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      audioService.playFeedback('correct');
      audioService.speakText('Benar! Hebat Kak Reza!');
      setFeedbackToast({ show: true, text: '✅ Benar!', type: 'correct' });
    } else {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      audioService.playFeedback('wrong');
      audioService.speakText('Salah! Tetap semangat Kak Reza!');
      setFeedbackToast({ show: true, text: '❌ Salah!', type: 'wrong' });
    }

    setTimeout(() => {
      advanceToNextQuestion();
    }, 700);
  };

  // Handle Interactive Touch Count
  const handleTapCountItem = (itemIdx: number) => {
    if (countedItems.includes(itemIdx)) return;
    const nextCount = countedItems.length + 1;
    setCountedItems((prev) => [...prev, itemIdx]);
    audioService.playCountNote(nextCount);
  };

  // Handle Word Builder
  const handleSelectLetter = (letter: string, chipIdx: number) => {
    if (isAnswered) return;
    const currentQ = sessionQuestions[currentQIndex];
    if (!currentQ.targetWord) return;

    const expectedLetter = currentQ.targetWord[builtLetters.length];

    if (letter === expectedLetter) {
      audioService.playLetterPop();
      const updatedLetters = [...builtLetters, letter];
      setBuiltLetters(updatedLetters);
      setUsedLetterIndices((prev) => [...prev, chipIdx]);

      if (updatedLetters.length === currentQ.targetWord.length) {
        setIsAnswered(true);
        if (timerRef.current) clearInterval(timerRef.current);
        audioService.playFeedback('victory');
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));

        ProgressionService.awardQuestionAttempt(sessionId, currentQIndex, true);

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

  // Handle Sequence 2-Step
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
        setSeqCompletedIds((prev) => [...prev, item.id]);
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));

        ProgressionService.awardQuestionAttempt(sessionId, currentQIndex, true);

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

    ProgressionService.awardQuestionAttempt(sessionId, currentQIndex, false);

    setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    audioService.playFeedback('timeout');
    audioService.speakText('Waktu habis! Lanjut ya Kak Reza!');
    setFeedbackToast({ show: true, text: '⏳ Waktu Habis!', type: 'timeout' });

    setTimeout(() => {
      advanceToNextQuestion();
    }, 700);
  };

  // Advance to Next Question
  const advanceToNextQuestion = () => {
    setFeedbackToast((prev) => ({ ...prev, show: false }));
    setSelectedChoiceIndex(null);
    resetQuestionModes();

    if (currentQIndex + 1 < sessionQuestions.length) {
      setIsTransitioning(true);
      audioService.playWhoosh();
      setTimeout(() => {
        const nextIdx = currentQIndex + 1;
        const nextQ = sessionQuestions[nextIdx];
        setTimeLeft(getQuestionDuration(nextQ));
        setCurrentQIndex(nextIdx);
        setIsAnswered(false);
        setIsTransitioning(false);

        // Update active session in storage
        const active = StorageService.getActiveSession();
        if (active) {
          active.currentQIndex = nextIdx;
          active.score = score;
          active.lastUpdatedAt = new Date().toISOString();
          StorageService.saveActiveSession(active);
        }
      }, 200);
    } else {
      handleFinishSession();
    }
  };

  // Finish Session & Evaluate Rewards
  const handleFinishSession = () => {
    const total = sessionQuestions.length;
    const finalScore = score.correct;
    const finalWrong = Math.max(0, total - finalScore);
    const percentage = Math.round((finalScore / total) * 100);
    const passed = percentage >= 50;

    const result: DailyResult = {
      dayId: targetDayId,
      dayName: activeDay.name,
      score: finalScore,
      wrong: finalWrong,
      total,
      percentage,
      passed,
      timestamp: new Date().toISOString(),
    };

    // Finalize session with Progression Engine
    const finalization = ProgressionService.finalizeSession(result, sessionId);

    setCurrentResult(result);
    setResultXpAwarded(finalization.completionXp);
    const progState = ProgressionService.getState();
    setResultNewLevel(progState.level);
    setResultLevelTitle(progState.levelTitle);
    setResultNewAchievements(finalization.newAchievements);
    setResultNewCollectibles(finalization.newCollectibles);
    setShowResultModal(true);

    if (passed) {
      audioService.playFeedback('victory');
      audioService.speakText(`Luar biasa Kak Reza! Benar ${finalScore} dari ${total} misi! Misi ${activeDay.name} tuntas!`);
    } else {
      audioService.playFeedback('wrong');
      audioService.speakText(`Skor Kak Reza belum mencapai 50 persen. Ayo kita coba ulangi lagi bersama!`);
    }
  };

  const activeQuestion = sessionQuestions[currentQIndex];
  const activeDuration = getQuestionDuration(activeQuestion);

  return (
    <div className="w-full h-[100dvh] max-w-[640px] mx-auto flex flex-col justify-between p-2.5 sm:p-3.5 text-slate-800 relative overflow-hidden select-none bg-slate-100">
      <LiquidMeshBackground />

      {/* TOP COMPACT NAVIGATION BAR (~12% HEIGHT) */}
      <div className="shrink-0 flex flex-col gap-1.5 w-full relative z-20">
        <header className="flex items-center justify-between gap-2 mb-1 w-full">
          <div className="flex items-center gap-2">
            <Link
              href="/learn"
              onClick={() => {
                audioService.stopAllAudio();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-slate-800 hover:text-hero-red"
            >
              <ChevronLeft size={20} />
            </Link>

            <div className="flex items-center gap-2 liquid-glass-pill px-3 py-1 shadow-xs">
              <span className="text-base">{activeDay.icon}</span>
              <span className="text-xs font-black text-slate-800">{activeDay.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (activeQuestion) {
                  if (activeQuestion.type === 'sound') {
                    audioService.speakText(`Kak Reza, dengarkan suara ini!`);
                    if (activeQuestion.soundFile) {
                      setTimeout(() => audioService.playSoundFile(activeQuestion.soundFile!), 1400);
                    }
                  } else if (activeQuestion.type === 'sequence_2') {
                    audioService.speakText(
                      activeQuestion.voiceIntro ||
                        `Kak Reza, dengarkan urutannya: Pertama sentuh ${activeQuestion.step1Label}, kedua sentuh ${activeQuestion.step2Label}!`
                    );
                  } else {
                    audioService.speakText(`Kak Reza, ${activeQuestion.prompt}`);
                  }
                }
              }}
              title="Dengarkan Suara Soal"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-slate-800 hover:text-hero-red"
            >
              <Volume2 size={17} />
            </button>

            <button
              onClick={() => {
                const nextM = !isMuted;
                setIsMuted(nextM);
                audioService.setMuted(nextM);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-slate-800"
            >
              {isMuted ? <BellOff size={17} className="text-slate-400" /> : <Bell size={17} />}
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                isPaused ? 'liquid-tint-emerald text-white' : 'liquid-glass text-slate-800'
              }`}
            >
              {isPaused ? <Play size={17} className="fill-white stroke-none" /> : <Pause size={17} />}
            </button>

            <button
              onClick={() => setShowGate(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass flex items-center justify-center text-hero-red"
            >
              <BarChart2 size={17} />
            </button>
          </div>
        </header>

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

        {/* Animated Timer Progress Bar */}
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

      {/* 50 / 50 BALANCED ARENA: QUESTION STAGE & ANSWER ARENA */}
      <div className="flex-1 w-full flex flex-col gap-2 min-h-0 overflow-hidden my-1 relative z-10">
        {isLoadingSession ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 liquid-glass-card rounded-3xl shadow-2xl">
            <div className="w-12 h-12 rounded-full border-4 border-hero-red border-t-transparent animate-spin shadow-md" />
            <span className="text-sm font-black text-slate-800 drop-shadow-xs">
              ⚡ Menyiapkan 25 Misi {activeDay.title}...
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
                  activeQuestionKey={`${targetDayId}-${currentQIndex}`}
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

      {/* MODALS */}
      {showResultModal && currentResult && (
        <ResultModal
          result={currentResult}
          xpAwarded={resultXpAwarded}
          currentLevel={resultNewLevel}
          levelTitle={resultLevelTitle}
          newAchievements={resultNewAchievements}
          newCollectibles={resultNewCollectibles}
          dayName={activeDay.name}
          nextDayName={DAYS_META[(currentDayIndex + 1) % DAYS_META.length].name}
          onRetry={() => {
            StorageService.clearActiveSession();
            initSession(targetDayId);
          }}
          onNextDay={() => {
            StorageService.clearActiveSession();
            const nextDay = ((targetDayId % 6) + 1);
            router.push(`/learn/${nextDay}`);
          }}
          onGoHome={() => router.push('/')}
          onGoToRoom={() => router.push('/room')}
        />
      )}

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
    </div>
  );
}
