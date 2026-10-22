import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        status: 'offline_mode',
        message: 'Supabase credentials not configured. Progress saved locally on device.',
        data: body
      }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { studentName, dayId, score, totalQuestions, passed, answers } = body;

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
    return NextResponse.json({ success: true, record: data });
  } catch (err: any) {
    console.error('Progress sync error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ sessions: [] });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('daily_sessions')
      .select('*')
      .order('completed_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    return NextResponse.json({ sessions: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      status: 'offline_mode',
      message: 'Supabase credentials not configured. Local progress reset completed.',
      success: true,
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    // Delete all records from daily_sessions table
    const { error } = await supabase
      .from('daily_sessions')
      .delete()
      .gte('day_id', 0);

    if (error) {
      console.warn('Initial delete gte day_id failed, attempting fallback filter:', error);
      const fallback = await supabase
        .from('daily_sessions')
        .delete()
        .neq('student_name', '__impossible_student_placeholder__');
      if (fallback.error) throw fallback.error;
    }

    return NextResponse.json({
      success: true,
      message: 'Seluruh riwayat sesi dan progres berhasil direset dari database Supabase.',
    });
  } catch (err: any) {
    console.error('Progress database delete error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

