import { ActiveQuestion, DayCurriculum } from '../types';
import offlinePackRaw from '../data/offlineCurriculumPack.json';

const OFFLINE_PACK = offlinePackRaw as unknown as DayCurriculum[];

export interface SessionLoadResult {
  success: boolean;
  dayId: number;
  dayName: string;
  dayTitle: string;
  icon: string;
  badge: string;
  desc: string;
  totalQuestions: number;
  questions: ActiveQuestion[];
  source: 'network' | 'cache' | 'offline_pack';
}

export class CurriculumService {
  // Offline-First Curriculum Loader
  public static async loadDaySession(dayId: number): Promise<SessionLoadResult> {
    // 1. Attempt Network Fetch with Timeout Guard (3.5 seconds)
    if (typeof window !== 'undefined' && navigator.onLine) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(`/api/curriculum?day=${dayId}&seed=${Date.now()}`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
            // Cache network response for future offline replay
            this.cacheDaySession(dayId, data);
            return {
              ...data,
              source: 'network',
            };
          }
        }
      } catch (e) {
        console.warn('Network curriculum fetch failed, falling back to offline pack:', e);
      }
    }

    // 2. Fallback to Local Cached Session if available
    const cached = this.getCachedDaySession(dayId);
    if (cached && cached.questions && cached.questions.length > 0) {
      return {
        ...cached,
        source: 'cache',
      };
    }

    // 3. Fallback to Bundled Offline Curriculum Pack
    const targetDay = OFFLINE_PACK.find((d) => d.id === dayId) || OFFLINE_PACK[0];

    const randomizedQuestions: ActiveQuestion[] = targetDay.questions.map((slot, idx) => {
      const variantIdx = Math.floor(Math.random() * slot.variants.length);
      const v = slot.variants[variantIdx];

      return {
        slotIndex: idx,
        type: v.type,
        topic: slot.topic,
        prompt: v.prompt,
        visual: v.visual,
        countItems: v.countItems,
        targetCount: v.targetCount,
        itemName: v.itemName,
        itemEmoji: v.itemEmoji,
        plateA: v.plateA,
        plateB: v.plateB,
        remainingCount: v.remainingCount,
        subtractedCount: v.subtractedCount,
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
        wordLabel: v.wordLabel,
        targetWord: v.targetWord,
        letterChoices: v.letterChoices,
        missingNumber: v.missingNumber,
        choices: v.choices,
        realImage: v.realImage,
      };
    });

    return {
      success: true,
      dayId: targetDay.id,
      dayName: targetDay.name,
      dayTitle: targetDay.title,
      icon: targetDay.icon,
      badge: targetDay.badge,
      desc: targetDay.desc,
      totalQuestions: randomizedQuestions.length,
      questions: randomizedQuestions,
      source: 'offline_pack',
    };
  }

  private static cacheDaySession(dayId: number, data: any) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`abala_offline_session_day_${dayId}`, JSON.stringify(data));
    } catch (e) {}
  }

  private static getCachedDaySession(dayId: number): any | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(`abala_offline_session_day_${dayId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
