export interface ChoiceOption {
  label: string;
  visual?: string;
  isCorrect: boolean;
  realImage?: string;
}

export interface QuestionVariant {
  type?: string;
  prompt: string;
  visual?: string;
  countItems?: string[];
  soundFile?: string;
  soundLabel?: string;
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

export interface ActiveQuestion {
  slotIndex: number;
  type?: string;
  topic: string;
  prompt: string;
  visual?: string;
  countItems?: string[];
  soundFile?: string;
  soundLabel?: string;
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
