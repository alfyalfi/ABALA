import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SessionPlanner } from '@/services/sessionPlanner';
import { DayCurriculum } from '@/types';

export const dynamic = 'force-dynamic';

function getMasterCurriculum(): DayCurriculum[] {
  const filePath = path.join(process.cwd(), 'src/server/data/curriculumMaster.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dayParam = searchParams.get('day');
    const seedParam = searchParams.get('seed');
    const metaOnly = searchParams.get('metaOnly') === 'true';

    const master = getMasterCurriculum();

    // If caller requests only metadata for day selector
    if (metaOnly) {
      const daysMeta = master.map((d: DayCurriculum) => ({
        id: d.id,
        name: d.name,
        title: d.title,
        icon: d.icon,
        badge: d.badge,
        desc: d.desc,
        totalQuestions: d.questions.length,
      }));
      return NextResponse.json({ success: true, days: daysMeta });
    }

    const dayId = dayParam ? parseInt(dayParam, 10) : 1;
    const activeDay = master.find((d: DayCurriculum) => d.id === dayId) || master[0];

    // Intelligently plan 25 questions with balanced difficulty and seeded PRNG
    const planned = SessionPlanner.planSession(activeDay, {
      seed: seedParam ?? Date.now(),
      shuffleChoices: true,
    });

    return NextResponse.json({
      success: true,
      dayId: activeDay.id,
      dayName: activeDay.name,
      dayTitle: activeDay.title,
      icon: activeDay.icon,
      badge: activeDay.badge,
      desc: activeDay.desc,
      totalQuestions: planned.questions.length,
      questions: planned.questions,
      selectedVariantIds: planned.selectedVariantIds,
    });
  } catch (error: any) {
    console.error('Error serving curriculum API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load curriculum from server' },
      { status: 500 }
    );
  }
}
