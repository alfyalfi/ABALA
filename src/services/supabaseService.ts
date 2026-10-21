import { createClient } from '@supabase/supabase-js';
import { DailyResult, LearningPillarProgress } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isCloudConfigured = Boolean(supabaseUrl && supabaseKey);
const supabase = isCloudConfigured ? createClient(supabaseUrl, supabaseKey) : null;

const STORAGE_KEY = 'abala_reza_history_v1';
const PILLARS_KEY = 'abala_reza_pillars_v1';

export class ProgressService {
  // Save daily completed session
  static async saveSession(result: DailyResult): Promise<void> {
    // 1. Always save locally first (Offline-First Guarantee)
    const existing = this.getLocalHistory();
    existing.unshift(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));

    // Update pillar progress
    this.updatePillarScores(result);

    // 2. Sync to Supabase if configured or via backend API
    if (isCloudConfigured && supabase) {
      try {
        await supabase.from('daily_sessions').insert([
          {
            student_name: 'Reza',
            day_id: result.dayId,
            score: result.score,
            total_questions: result.total,
            passed: result.passed,
            completed_at: result.timestamp
          }
        ]);
      } catch (err) {
        console.warn('Could not sync to Supabase directly:', err);
      }
    } else {
      // Try backend serverless endpoint
      try {
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName: 'Reza',
            dayId: result.dayId,
            score: result.score,
            totalQuestions: result.total,
            passed: result.passed
          })
        }).catch(() => {});
      } catch (e) {}
    }
  }

  static getLocalHistory(): DailyResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static updatePillarScores(result: DailyResult) {
    const pillars = this.getPillarProgress();
    const pct = result.percentage;

    switch (result.dayId) {
      case 1: pillars.berhitung = Math.max(pillars.berhitung, pct); break;
      case 2: pillars.membaca = Math.max(pillars.membaca, pct); break;
      case 3: pillars.menyimak = Math.max(pillars.menyimak, pct); break;
      case 4: pillars.nalar = Math.max(pillars.nalar, pct); break;
      case 5: pillars.bentuk = Math.max(pillars.bentuk, pct); break;
      case 6: pillars.kemandirian = Math.max(pillars.kemandirian, pct); break;
    }

    localStorage.setItem(PILLARS_KEY, JSON.stringify(pillars));
  }

  static getPillarProgress(): LearningPillarProgress {
    try {
      const data = localStorage.getItem(PILLARS_KEY);
      if (data) return JSON.parse(data);
    } catch {}

    return {
      berhitung: 80,
      membaca: 75,
      menyimak: 85,
      nalar: 70,
      bentuk: 90,
      kemandirian: 95
    };
  }
}
