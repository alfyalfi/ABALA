import { DailyResult, LearningPillarProgress } from '../types';
import {
  ProgressionState,
  ActiveLearningSessionState,
} from '../types/progression';
import { COLLECTIBLE_CATALOG } from '../data/collectibleCatalog';

export const STORAGE_KEYS = {
  PROGRESSION: 'abala_progression_v2',
  ACTIVE_SESSION: 'abala_active_session_v2',
  HISTORY: 'abala_reza_history_v1',
  PILLARS: 'abala_reza_pillars_v1',
  PROFILE: 'abala_reza_profile_v1',
};

export class StorageService {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Safe item getter
  public static getItem<T>(key: string, fallback: T): T {
    if (!this.isBrowser()) return fallback;
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch (e) {
      console.warn(`StorageService read error for key "${key}":`, e);
      return fallback;
    }
  }

  // Safe item setter
  public static setItem<T>(key: string, value: T): boolean {
    if (!this.isBrowser()) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`StorageService write error for key "${key}":`, e);
      return false;
    }
  }

  // Remove item
  public static removeItem(key: string): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }

  // --- Session History ---
  public static getHistory(): DailyResult[] {
    return this.getItem<DailyResult[]>(STORAGE_KEYS.HISTORY, []);
  }

  public static addHistory(result: DailyResult): void {
    const list = this.getHistory();
    // Prepend new session
    list.unshift(result);
    // Keep last 50 sessions
    this.setItem(STORAGE_KEYS.HISTORY, list.slice(0, 50));
    // Update pillar scores accordingly
    this.updatePillarFromSession(result);
  }

  // --- 6 Pillars Mastery Progress ---
  public static getPillarProgress(): LearningPillarProgress {
    // True default: 0% across all pillars when starting out
    const defaultPillars: LearningPillarProgress = {
      berhitung: 0,
      membaca: 0,
      menyimak: 0,
      nalar: 0,
      bentuk: 0,
      kemandirian: 0,
    };

    const saved = this.getItem<Partial<LearningPillarProgress> | null>(STORAGE_KEYS.PILLARS, null);
    if (!saved) return defaultPillars;

    return {
      berhitung: saved.berhitung ?? 0,
      membaca: saved.membaca ?? 0,
      menyimak: saved.menyimak ?? 0,
      nalar: saved.nalar ?? 0,
      bentuk: saved.bentuk ?? 0,
      kemandirian: saved.kemandirian ?? 0,
    };
  }

  public static updatePillarFromSession(result: DailyResult): void {
    const pillars = this.getPillarProgress();
    const pct = Math.max(0, Math.min(100, result.percentage));

    switch (result.dayId) {
      case 1: pillars.berhitung = Math.max(pillars.berhitung, pct); break;
      case 2: pillars.membaca = Math.max(pillars.membaca, pct); break;
      case 3: pillars.menyimak = Math.max(pillars.menyimak, pct); break;
      case 4: pillars.nalar = Math.max(pillars.nalar, pct); break;
      case 5: pillars.bentuk = Math.max(pillars.bentuk, pct); break;
      case 6: pillars.kemandirian = Math.max(pillars.kemandirian, pct); break;
    }

    this.setItem(STORAGE_KEYS.PILLARS, pillars);
  }

  // --- Active Learning Session Resumption ---
  public static getActiveSession(): ActiveLearningSessionState | null {
    return this.getItem<ActiveLearningSessionState | null>(STORAGE_KEYS.ACTIVE_SESSION, null);
  }

  public static saveActiveSession(session: ActiveLearningSessionState): void {
    this.setItem(STORAGE_KEYS.ACTIVE_SESSION, session);
  }

  public static clearActiveSession(): void {
    this.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }

  // --- Safe Migration for Progression v2 ---
  public static getProgression(): ProgressionState {
    const existing = this.getItem<ProgressionState | null>(STORAGE_KEYS.PROGRESSION, null);
    if (existing && existing.version === 2) {
      return existing;
    }

    // Migration path from legacy history
    const history = this.getHistory();
    let migratedXp = 0;
    let completedCount = history.length;
    let perfectCount = 0;

    history.forEach((sess) => {
      // 3 XP per question answered + 7 XP bonus per correct + 25 XP session bonus
      const qAttemptXp = (sess.total || 25) * 3;
      const qCorrectXp = (sess.score || 0) * 7;
      const sessionCompletionBonus = 25;
      const isPerfect = sess.score === sess.total && sess.total > 0;
      if (isPerfect) perfectCount++;

      migratedXp += qAttemptXp + qCorrectXp + sessionCompletionBonus + (isPerfect ? 25 : 0);
    });

    const levelInfo = this.calculateLevelFromXp(migratedXp);

    // Initial unlocks at Level 1
    const defaultPlaced: Record<string, string> = {
      slot_trophy: 'trophy_cup',
      slot_wall: 'superhero_cape',
    };

    const initialUnlockedCollectibles = ['trophy_cup', 'superhero_cape'];

    // Also unlock collectibles matching migrated level
    COLLECTIBLE_CATALOG.forEach((item) => {
      if (item.unlockRequirement.type === 'level' && typeof item.unlockRequirement.targetValue === 'number') {
        if (levelInfo.level >= item.unlockRequirement.targetValue) {
          if (!initialUnlockedCollectibles.includes(item.id)) {
            initialUnlockedCollectibles.push(item.id);
          }
        }
      }
    });

    const migratedState: ProgressionState = {
      version: 2,
      totalXp: migratedXp,
      level: levelInfo.level,
      levelTitle: levelInfo.levelTitle,
      unlockedAchievementIds: history.length > 0 ? ['first_step'] : [],
      unlockedCollectibleIds: initialUnlockedCollectibles,
      placedDecorations: defaultPlaced,
      completedSessionsCount: completedCount,
      perfectSessionsCount: perfectCount,
      processedTransactions: [],
      updatedAt: new Date().toISOString(),
    };

    this.setItem(STORAGE_KEYS.PROGRESSION, migratedState);
    return migratedState;
  }

  public static saveProgression(state: ProgressionState): void {
    state.updatedAt = new Date().toISOString();
    this.setItem(STORAGE_KEYS.PROGRESSION, state);
  }

  // Pure deterministic level calculator
  public static calculateLevelFromXp(totalXp: number): {
    level: number;
    levelTitle: string;
    currentLevelXp: number;
    nextLevelXp: number;
    progressPercent: number;
  } {
    const LEVELS = [
      { level: 1, minXp: 0, maxXp: 99, title: 'Penjelajah Pemula' },
      { level: 2, minXp: 100, maxXp: 249, title: 'Bintang Belajar' },
      { level: 3, minXp: 250, maxXp: 449, title: 'Ksatria Angka & Huruf' },
      { level: 4, minXp: 450, maxXp: 699, title: 'Detektif Suara & Nalar' },
      { level: 5, minXp: 700, maxXp: 999, title: 'Master Geometri Spasial' },
      { level: 6, minXp: 1000, maxXp: 1399, title: 'Superhero Cilik Teladan' },
      { level: 7, minXp: 1400, maxXp: 1899, title: 'Kapten Cerdas Lili Alpi' },
      { level: 8, minXp: 1900, maxXp: 2499, title: 'Juara Sains & Logika' },
      { level: 9, minXp: 2500, maxXp: 3199, title: 'Legenda Superhero ABALA' },
      { level: 10, minXp: 3200, maxXp: 999999, title: 'Maha Bintang Siap SD' },
    ];

    const current = LEVELS.find(
      (l) => totalXp >= l.minXp && (totalXp <= l.maxXp || l.level === 10)
    ) || LEVELS[0];

    const span = Math.max(1, current.maxXp - current.minXp + 1);
    const progressInLevel = Math.max(0, totalXp - current.minXp);
    const progressPercent = current.level === 10
      ? 100
      : Math.min(100, Math.round((progressInLevel / span) * 100));

    return {
      level: current.level,
      levelTitle: current.title,
      currentLevelXp: current.minXp,
      nextLevelXp: current.maxXp + 1,
      progressPercent,
    };
  }

  // Full reset of all progress to level 1, 0 XP, 0 pillars, empty history
  public static resetAllProgress(): ProgressionState {
    const defaultPlaced: Record<string, string> = {
      slot_trophy: 'trophy_cup',
      slot_wall: 'superhero_cape',
    };

    const initialCollectibles = ['trophy_cup', 'superhero_cape'];

    const resetState: ProgressionState = {
      version: 2,
      totalXp: 0,
      level: 1,
      levelTitle: 'Penjelajah Pemula',
      unlockedAchievementIds: [],
      unlockedCollectibleIds: initialCollectibles,
      placedDecorations: defaultPlaced,
      completedSessionsCount: 0,
      perfectSessionsCount: 0,
      processedTransactions: [],
      updatedAt: new Date().toISOString(),
    };

    const resetPillars: LearningPillarProgress = {
      berhitung: 0,
      membaca: 0,
      menyimak: 0,
      nalar: 0,
      bentuk: 0,
      kemandirian: 0,
    };

    this.setItem(STORAGE_KEYS.PROGRESSION, resetState);
    this.setItem(STORAGE_KEYS.HISTORY, []);
    this.setItem(STORAGE_KEYS.PILLARS, resetPillars);
    this.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    this.removeItem(STORAGE_KEYS.PROFILE);

    return resetState;
  }
}
