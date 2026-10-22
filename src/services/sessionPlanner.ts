import { ActiveQuestion, ChoiceOption, DayCurriculum, QuestionSlot, QuestionVariant } from '../types';

const RECENT_VARIANTS_KEY = 'abala_recent_variants_history';
const MAX_HISTORY_SIZE = 150; // Stores up to ~6 sessions worth of variant IDs

// Mulberry32 32-bit deterministic seeded PRNG
export function createPRNG(seed: number | string): () => number {
  let a = typeof seed === 'string' ? hashString(seed) : seed;
  if (a === 0) a = 123456789;

  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// Determinstic Fisher-Yates shuffle
export function seededShuffle<T>(array: T[], prng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export class SessionPlanner {
  /**
   * Retrieves recent variant IDs from localStorage to avoid rapid repetition.
   */
  public static getRecentVariantIds(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(RECENT_VARIANTS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Records newly played variant IDs into localStorage recency memory.
   */
  public static recordSessionVariants(variantIds: string[]): void {
    if (typeof window === 'undefined' || !variantIds.length) return;
    try {
      const current = this.getRecentVariantIds();
      const updated = [...current, ...variantIds].slice(-MAX_HISTORY_SIZE);
      localStorage.setItem(RECENT_VARIANTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to record session variants in localStorage:', e);
    }
  }

  /**
   * Plans an intelligent 25-question session from a DayCurriculum:
   * - 1 variant per topic across 25 topics
   * - Seeded PRNG for auditability/reproducibility
   * - Anti-repetition recency filtering (avoids variants played in last sessions)
   * - Balanced difficulty tiering (~8 mudah, ~12 berkembang, ~5 menantang)
   * - Shuffles choice options deterministically
   */
  public static planSession(
    day: DayCurriculum,
    options: {
      seed?: number | string;
      customRecentIds?: string[];
      shuffleChoices?: boolean;
    } = {}
  ): { questions: ActiveQuestion[]; selectedVariantIds: string[] } {
    const prng = createPRNG(options.seed ?? Date.now());
    const recentIds = new Set(options.customRecentIds ?? this.getRecentVariantIds());
    const shouldShuffleChoices = options.shuffleChoices ?? true;

    const selectedVariantIds: string[] = [];
    const questions: ActiveQuestion[] = [];

    // Target difficulty progression for PAUD:
    // Slots 0–7 (8 slots): Mudah (confidence building)
    // Slots 8–19 (12 slots): Berkembang (core reinforcement)
    // Slots 20–24 (5 slots): Menantang (puncak petualangan superhero)
    const getTargetDifficulty = (slotIdx: number): 'mudah' | 'berkembang' | 'menantang' => {
      if (slotIdx < 8) return 'mudah';
      if (slotIdx < 20) return 'berkembang';
      return 'menantang';
    };

    day.questions.forEach((slot: QuestionSlot, slotIdx: number) => {
      const targetDiff = getTargetDifficulty(slotIdx);
      const allVariants = slot.variants;

      if (!allVariants || allVariants.length === 0) {
        return;
      }

      // Step 1: Filter out variants seen in recent history
      let candidatePool = allVariants.filter((v) => !v.id || !recentIds.has(v.id));

      // Fallback if all 30 variants have been seen: reset to full pool
      if (candidatePool.length === 0) {
        candidatePool = allVariants;
      }

      // Step 2: Try to match target difficulty tier
      let diffMatchedPool = candidatePool.filter((v) => v.difficulty === targetDiff);
      if (diffMatchedPool.length === 0) {
        diffMatchedPool = candidatePool;
      }

      // Step 3: Pick 1 variant using seeded PRNG
      const chosenIndex = Math.floor(prng() * diffMatchedPool.length);
      const chosenVariant = diffMatchedPool[chosenIndex];

      if (chosenVariant.id) {
        selectedVariantIds.push(chosenVariant.id);
      }

      // Step 4: Deterministically shuffle choices so correct answer position rotates
      let processedChoices: ChoiceOption[] = chosenVariant.choices;
      if (shouldShuffleChoices && processedChoices.length > 1) {
        processedChoices = seededShuffle(processedChoices, prng);
      }

      const activeQ: ActiveQuestion = {
        id: chosenVariant.id,
        slotIndex: slotIdx,
        type: chosenVariant.type,
        topic: slot.topic,
        learningGoal: chosenVariant.learningGoal,
        skill: chosenVariant.skill,
        cpElement: chosenVariant.cpElement,
        difficulty: chosenVariant.difficulty,
        prompt: chosenVariant.prompt,
        visual: chosenVariant.visual,
        countItems: chosenVariant.countItems,
        targetCount: chosenVariant.targetCount,
        itemName: chosenVariant.itemName,
        itemEmoji: chosenVariant.itemEmoji,
        plateA: chosenVariant.plateA,
        plateB: chosenVariant.plateB,
        remainingCount: chosenVariant.remainingCount,
        subtractedCount: chosenVariant.subtractedCount,
        soundFile: chosenVariant.soundFile,
        soundLabel: chosenVariant.soundLabel,
        step1Target: chosenVariant.step1Target,
        step2Target: chosenVariant.step2Target,
        step1Label: chosenVariant.step1Label,
        step2Label: chosenVariant.step2Label,
        voiceIntro: chosenVariant.voiceIntro,
        voiceStep1Done: chosenVariant.voiceStep1Done,
        voiceSuccess: chosenVariant.voiceSuccess,
        sequenceItems: chosenVariant.sequenceItems,
        wordLabel: chosenVariant.wordLabel,
        targetWord: chosenVariant.targetWord,
        letterChoices: chosenVariant.letterChoices,
        missingNumber: chosenVariant.missingNumber,
        choices: processedChoices,
        realImage: chosenVariant.realImage,
        explanation: chosenVariant.explanation,
        feedbackCorrect: chosenVariant.feedbackCorrect,
        feedbackIncorrect: chosenVariant.feedbackIncorrect,
      };

      questions.push(activeQ);
    });

    return {
      questions,
      selectedVariantIds,
    };
  }
}
