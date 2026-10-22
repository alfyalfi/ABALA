export interface ChoiceOption {
  label: string;
  visual?: string;
  isCorrect: boolean;
  realImage?: string;
}

export interface SequenceItem {
  id: string;
  emoji: string;
  label: string;
}

export interface QuestionVariant {
  type?: string;
  prompt: string;
  visual?: string;
  countItems?: string[];
  targetCount?: number;
  itemName?: string;
  itemEmoji?: string;
  soundFile?: string;
  soundLabel?: string;
  step1Target?: string;
  step2Target?: string;
  step1Label?: string;
  step2Label?: string;
  voiceIntro?: string;
  voiceStep1Done?: string;
  voiceSuccess?: string;
  sequenceItems?: SequenceItem[];
  plateA?: string[];
  plateB?: string[];
  remainingCount?: number;
  subtractedCount?: number;
  wordLabel?: string;
  targetWord?: string[];
  letterChoices?: string[];
  missingNumber?: number;
  choices: ChoiceOption[];
  realImage?: string;
}

export interface QuestionSlot {
  topic: string;
  variants: QuestionVariant[];
}

export interface DayCurriculum {
  id: number;
  name: string;
  title: string;
  icon: string;
  badge: string;
  desc: string;
  questions: QuestionSlot[];
}

export interface DayMeta {
  id: number;
  name: string;
  title: string;
  icon: string;
  badge: string;
  desc: string;
  totalQuestions: number;
}

export interface ActiveQuestion {
  slotIndex: number;
  type?: string;
  topic: string;
  prompt: string;
  visual?: string;
  countItems?: string[];
  targetCount?: number;
  itemName?: string;
  itemEmoji?: string;
  soundFile?: string;
  soundLabel?: string;
  step1Target?: string;
  step2Target?: string;
  step1Label?: string;
  step2Label?: string;
  voiceIntro?: string;
  voiceStep1Done?: string;
  voiceSuccess?: string;
  sequenceItems?: SequenceItem[];
  plateA?: string[];
  plateB?: string[];
  remainingCount?: number;
  subtractedCount?: number;
  wordLabel?: string;
  targetWord?: string[];
  letterChoices?: string[];
  missingNumber?: number;
  choices: ChoiceOption[];
  realImage?: string;
}

export interface DailyResult {
  dayId: number;
  dayName: string;
  score: number;
  wrong: number;
  total: number;
  percentage: number;
  passed: boolean;
  timestamp: string;
}

export interface LearningPillarProgress {
  berhitung: number;
  membaca: number;
  menyimak: number;
  nalar: number;
  bentuk: number;
  kemandirian: number;
}
