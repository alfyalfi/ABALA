import { createClient } from '@supabase/supabase-js';
import { DailyResult, LearningPillarProgress } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

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
      berhitung: 0,
      membaca: 0,
      menyimak: 0,
      nalar: 0,
      bentuk: 0,
      kemandirian: 0
    };
  }

  // Reset all progress in database and localStorage
  static async resetDatabaseProgress(): Promise<{ success: boolean; message: string }> {
    // 1. Reset local storage for history and pillars
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(
        PILLARS_KEY,
        JSON.stringify({
          berhitung: 0,
          membaca: 0,
          menyimak: 0,
          nalar: 0,
          bentuk: 0,
          kemandirian: 0,
        })
      );
    } catch (e) {
      console.warn('Local storage clear warning:', e);
    }

    // 2. Direct Supabase call if configured in client
    if (isCloudConfigured && supabase) {
      try {
        await supabase.from('daily_sessions').delete().gte('day_id', 0);
      } catch (err) {
        console.warn('Direct Supabase reset error:', err);
      }
    }

    // 3. Always invoke backend API endpoint for service-role database sync
    try {
      const res = await fetch('/api/progress', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      return {
        success: true,
        message: data.message || 'Semua progres berhasil direset dari database dan lokal.',
      };
    } catch (err: any) {
      console.warn('API reset failed (offline mode):', err);
      return {
        success: true,
        message: 'Progres lokal berhasil direset (mode offline).',
      };
    }
  }
}
