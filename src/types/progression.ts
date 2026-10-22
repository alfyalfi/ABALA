import { DailyResult, LearningPillarProgress } from './index';

export type CollectibleCategory = 'trophy' | 'furniture' | 'toy' | 'wall' | 'desk' | 'window';

export interface CollectibleDefinition {
  id: string;
  name: string;
  description: string;
  category: CollectibleCategory;
  modelType: 'trophy_cup' | 'star_lamp' | 'mini_globe' | 'toy_rocket' | 'superhero_cape' | 'plant_pot' | 'smart_robot' | 'bookshelf' | 'telescope' | 'crystal_trophy' | 'honor_shield' | 'space_badge';
  iconEmoji: string;
  previewColor: string;
  unlockRequirement: {
    type: 'xp' | 'level' | 'achievement' | 'pillar_mastery';
    targetValue: number | string;
    description: string;
  };
  allowedSlots: string[];
}

export interface RoomDecorationSlot {
  slotId: string;
  name: string;
  category: CollectibleCategory;
  defaultItemId?: string;
  position: [number, number, number]; // [x, y, z]
  rotation?: [number, number, number];
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'mastery' | 'streak' | 'exploration';
  xpReward: number;
  badgeColor: string;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  createdAt: string;
}

export interface XPTransaction {
  id: string;
  sessionId: string;
  questionSlot?: number;
  amount: number;
  reason: 'question_completed' | 'question_correct' | 'session_completed' | 'session_perfect' | 'achievement_unlocked';
  timestamp: string;
}

export interface ProgressionState {
  version: number;
  totalXp: number;
  level: number;
  levelTitle: string;
  unlockedAchievementIds: string[];
  unlockedCollectibleIds: string[];
  placedDecorations: Record<string, string>; // slotId -> collectibleId
  completedSessionsCount: number;
  perfectSessionsCount: number;
  processedTransactions: string[]; // transaction IDs to guarantee idempotency
  updatedAt: string;
}

export interface ActiveLearningSessionState {
  sessionId: string;
  dayId: number;
  dayName: string;
  dayTitle: string;
  currentQIndex: number;
  score: {
    correct: number;
    wrong: number;
  };
  answers: {
    slotIndex: number;
    choiceIndex?: number;
    isCorrect: boolean;
  }[];
  questions: any[];
  startTime: string;
  lastUpdatedAt: string;
}
