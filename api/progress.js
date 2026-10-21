// Serverless function for Vercel: Progress & Analytics Sync with Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // If Supabase credentials are not set yet, return local sync mock status
  if (!supabaseUrl || !supabaseKey) {
    return res.status(200).json({
      status: 'offline_mode',
      message: 'Supabase credentials not configured. Progress is safely saved locally on device (IndexedDB / LocalStorage).',
      data: req.body || null
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method === 'POST') {
    try {
      const { studentName, dayId, score, totalQuestions, passed, answers } = req.body;

      const { data, error } = await supabase
        .from('daily_sessions')
        .insert([
          {
            student_name: studentName || 'Reza',
            day_id: dayId,
            score,
            total_questions: totalQuestions,
            passed,
            answers_summary: answers,
            completed_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      return res.status(200).json({ success: true, record: data });
    } catch (err) {
      console.error('Supabase error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // GET: Fetch recent stats
  try {
    const { data, error } = await supabase
      .from('daily_sessions')
      .select('*')
      .order('completed_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    return res.status(200).json({ sessions: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
