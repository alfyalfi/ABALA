import { DailyResult } from '../types';
import {
  ProgressionState,
  AchievementDefinition,
  CollectibleDefinition,
} from '../types/progression';
import { StorageService } from './storageService';
import { ACHIEVEMENT_CATALOG } from '../data/achievementCatalog';
import { COLLECTIBLE_CATALOG, ROOM_SLOTS } from '../data/collectibleCatalog';

export const XP_CONFIG = {
  QUESTION_COMPLETED: 3,
  QUESTION_CORRECT_BONUS: 7,
  SESSION_COMPLETED: 25,
  SESSION_PERFECT_BONUS: 25,
};

export class ProgressionService {
  public static getState(): ProgressionState {
    return StorageService.getProgression();
  }

  // Idempotent Question XP Awarding
  public static awardQuestionAttempt(
    sessionId: string,
    slotIndex: number,
    isCorrect: boolean
  ): {
    xpAwarded: number;
    newTotalXp: number;
    levelUp: boolean;
    currentLevel: number;
    levelTitle: string;
  } {
    const state = StorageService.getProgression();
    const txId = `q_${sessionId}_${slotIndex}`;

    // Prevent double XP from double taps or re-renders
    if (state.processedTransactions.includes(txId)) {
      const levelInfo = StorageService.calculateLevelFromXp(state.totalXp);
      return {
        xpAwarded: 0,
        newTotalXp: state.totalXp,
        levelUp: false,
        currentLevel: levelInfo.level,
        levelTitle: levelInfo.levelTitle,
      };
    }

    const baseAttempt = XP_CONFIG.QUESTION_COMPLETED;
    const bonusCorrect = isCorrect ? XP_CONFIG.QUESTION_CORRECT_BONUS : 0;
    const awarded = baseAttempt + bonusCorrect;

    const oldLevel = state.level;
    const newTotalXp = state.totalXp + awarded;
    const levelInfo = StorageService.calculateLevelFromXp(newTotalXp);

    state.totalXp = newTotalXp;
    state.level = levelInfo.level;
    state.levelTitle = levelInfo.levelTitle;
    state.processedTransactions.push(txId);

    // Keep transaction ledger reasonable
    if (state.processedTransactions.length > 500) {
      state.processedTransactions = state.processedTransactions.slice(-250);
    }

    // Auto-unlock any level-gated collectibles if level rose
    if (levelInfo.level > oldLevel) {
      this.evaluateCollectibles(state);
    }

    StorageService.saveProgression(state);

    return {
      xpAwarded: awarded,
      newTotalXp,
      levelUp: levelInfo.level > oldLevel,
      currentLevel: levelInfo.level,
      levelTitle: levelInfo.levelTitle,
    };
  }

  // Idempotent Session Finalization and Reward Distribution
  public static finalizeSession(
    result: DailyResult,
    sessionId: string
  ): {
    completionXp: number;
    newTotalXp: number;
    newAchievements: AchievementDefinition[];
    newCollectibles: CollectibleDefinition[];
    levelUp: boolean;
  } {
    const state = StorageService.getProgression();
    const txId = `sess_finish_${sessionId}`;

    const newAchievements: AchievementDefinition[] = [];
    const newCollectibles: CollectibleDefinition[] = [];
    const oldLevel = state.level;

    // Check if session completion was already awarded
    if (!state.processedTransactions.includes(txId)) {
      state.processedTransactions.push(txId);
      state.completedSessionsCount += 1;

      let sessionXp = XP_CONFIG.SESSION_COMPLETED;
      const isPerfect = result.score === result.total && result.total > 0;
      if (isPerfect) {
        sessionXp += XP_CONFIG.SESSION_PERFECT_BONUS;
        state.perfectSessionsCount += 1;
      }

      state.totalXp += sessionXp;

      // Save session history & update pillars
      StorageService.addHistory(result);
      StorageService.clearActiveSession();

      // Check achievements
      const history = StorageService.getHistory();
      const unlockedAch = this.evaluateAchievements(state, result, history);
      unlockedAch.forEach((ach) => {
        newAchievements.push(ach);
        state.totalXp += ach.xpReward;
      });

      // Recalculate level with all session + achievement XP
      const levelInfo = StorageService.calculateLevelFromXp(state.totalXp);
      state.level = levelInfo.level;
      state.levelTitle = levelInfo.levelTitle;

      // Check collectibles
      const unlockedCol = this.evaluateCollectibles(state);
      unlockedCol.forEach((c) => newCollectibles.push(c));

      StorageService.saveProgression(state);

      return {
        completionXp: sessionXp,
        newTotalXp: state.totalXp,
        newAchievements,
        newCollectibles,
        levelUp: state.level > oldLevel,
      };
    }

    // Already processed this session
    return {
      completionXp: 0,
      newTotalXp: state.totalXp,
      newAchievements: [],
      newCollectibles: [],
      levelUp: false,
    };
  }

  // Internal evaluation of achievements
  private static evaluateAchievements(
    state: ProgressionState,
    currentResult: DailyResult,
    history: DailyResult[]
  ): AchievementDefinition[] {
    const newlyUnlocked: AchievementDefinition[] = [];

    const tryUnlock = (achId: string) => {
      if (!state.unlockedAchievementIds.includes(achId)) {
        const def = ACHIEVEMENT_CATALOG.find((a) => a.id === achId);
        if (def) {
          state.unlockedAchievementIds.push(achId);
          newlyUnlocked.push(def);
        }
      }
    };

    // 1. First step
    if (state.completedSessionsCount >= 1) {
      tryUnlock('first_step');
    }

    // 2. Day mastery achievements
    if (currentResult.passed) {
      switch (currentResult.dayId) {
        case 1: tryUnlock('math_star'); break;
        case 2: tryUnlock('reading_hero'); break;
        case 3: tryUnlock('sharp_listener'); break;
        case 4: tryUnlock('logic_master'); break;
        case 5: tryUnlock('shape_architect'); break;
        case 6: tryUnlock('super_independent'); break;
      }
    }

    // 3. Six pillars exploration
    const completedDayIds = new Set(history.map((h) => h.dayId));
    if ([1, 2, 3, 4, 5, 6].every((d) => completedDayIds.has(d))) {
      tryUnlock('six_pillars');
    }

    // 4. Perfect champion (100% in a session)
    if (currentResult.score === currentResult.total && currentResult.total >= 20) {
      tryUnlock('perfect_champion');
    }

    // 5. Speedy scholar (3+ sessions)
    if (state.completedSessionsCount >= 3) {
      tryUnlock('speedy_scholar');
    }

    // 6. XP collector (300+ XP)
    if (state.totalXp >= 300) {
      tryUnlock('xp_collector');
    }

    return newlyUnlocked;
  }

  // Internal evaluation of collectibles based on current progression state
  private static evaluateCollectibles(state: ProgressionState): CollectibleDefinition[] {
    const newlyUnlocked: CollectibleDefinition[] = [];

    COLLECTIBLE_CATALOG.forEach((item) => {
      if (state.unlockedCollectibleIds.includes(item.id)) return;

      const req = item.unlockRequirement;
      let eligible = false;

      if (req.type === 'level' && typeof req.targetValue === 'number') {
        if (state.level >= req.targetValue) {
          eligible = true;
        }
      } else if (req.type === 'achievement' && typeof req.targetValue === 'string') {
        if (state.unlockedAchievementIds.includes(req.targetValue)) {
          eligible = true;
        }
      } else if (req.type === 'xp' && typeof req.targetValue === 'number') {
        if (state.totalXp >= req.targetValue) {
          eligible = true;
        }
      }

      if (eligible) {
        state.unlockedCollectibleIds.push(item.id);
        newlyUnlocked.push(item);
      }
    });

    return newlyUnlocked;
  }

  // Equip decoration to a room slot
  public static equipDecoration(slotId: string, collectibleId: string): boolean {
    const state = StorageService.getProgression();

    // Check slot existence
    const slot = ROOM_SLOTS.find((s) => s.slotId === slotId);
    if (!slot) return false;

    // Check item existence and unlocked state
    const collectible = COLLECTIBLE_CATALOG.find((c) => c.id === collectibleId);
    if (!collectible || !state.unlockedCollectibleIds.includes(collectibleId)) {
      return false;
    }

    // Check if item is allowed in this slot
    if (!collectible.allowedSlots.includes(slotId)) {
      return false;
    }

    // If item was already placed in another slot, remove from old slot
    Object.entries(state.placedDecorations).forEach(([sId, cId]) => {
      if (cId === collectibleId) {
        delete state.placedDecorations[sId];
      }
    });

    state.placedDecorations[slotId] = collectibleId;

    // Unlock Room Stylist achievement on first custom decoration
    if (!state.unlockedAchievementIds.includes('room_stylist')) {
      const ach = ACHIEVEMENT_CATALOG.find((a) => a.id === 'room_stylist');
      if (ach) {
        state.unlockedAchievementIds.push('room_stylist');
        state.totalXp += ach.xpReward;
        const levelInfo = StorageService.calculateLevelFromXp(state.totalXp);
        state.level = levelInfo.level;
        state.levelTitle = levelInfo.levelTitle;
      }
    }

    StorageService.saveProgression(state);
    return true;
  }

  // Unequip slot
  public static unequipDecoration(slotId: string): boolean {
    const state = StorageService.getProgression();
    if (state.placedDecorations[slotId]) {
      delete state.placedDecorations[slotId];
      StorageService.saveProgression(state);
      return true;
    }
    return false;
  }

  // Helper for inventory view
  public static getInventoryItems(): {
    collectible: CollectibleDefinition;
    isUnlocked: boolean;
    isEquipped: boolean;
    equippedSlotId?: string;
  }[] {
    const state = StorageService.getProgression();

    return COLLECTIBLE_CATALOG.map((item) => {
      const isUnlocked = state.unlockedCollectibleIds.includes(item.id);
      let isEquipped = false;
      let equippedSlotId: string | undefined = undefined;

      Object.entries(state.placedDecorations).forEach(([sId, cId]) => {
        if (cId === item.id) {
          isEquipped = true;
          equippedSlotId = sId;
        }
      });

      return {
        collectible: item,
        isUnlocked,
        isEquipped,
        equippedSlotId,
      };
    });
  }
}
