import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getMasterCurriculum() {
  const filePath = path.join(process.cwd(), 'src/server/data/curriculumMaster.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dayParam = searchParams.get('day');
    const metaOnly = searchParams.get('metaOnly') === 'true';

    const master = getMasterCurriculum();

    // If caller requests only metadata for day selector
    if (metaOnly) {
      const daysMeta = master.map((d: any) => ({
        id: d.id,
        name: d.name,
        title: d.title,
        icon: d.icon,
        badge: d.badge,
        desc: d.desc,
        totalQuestions: d.questions.length
      }));
      return NextResponse.json({ success: true, days: daysMeta });
    }

    const dayId = dayParam ? parseInt(dayParam, 10) : 1;
    const activeDay = master.find((d: any) => d.id === dayId) || master[0];

    // Pick 1 random variant out of 30 for EACH of the 25 topics
    const randomizedQuestions = activeDay.questions.map((slot: any, idx: number) => {
      const variantIdx = Math.floor(Math.random() * slot.variants.length);
      const v = slot.variants[variantIdx];

      return {
        slotIndex: idx,
        type: v.type,
        topic: slot.topic,
        prompt: v.prompt,
        visual: v.visual,
        countItems: v.countItems,
        targetCount: v.targetCount,
        itemName: v.itemName,
        itemEmoji: v.itemEmoji,
        soundFile: v.soundFile,
        soundLabel: v.soundLabel,
        step1Target: v.step1Target,
        step2Target: v.step2Target,
        step1Label: v.step1Label,
        step2Label: v.step2Label,
        voiceIntro: v.voiceIntro,
        voiceStep1Done: v.voiceStep1Done,
        voiceSuccess: v.voiceSuccess,
        sequenceItems: v.sequenceItems,
        wordLabel: v.wordLabel,
        targetWord: v.targetWord,
        letterChoices: v.letterChoices,
        missingNumber: v.missingNumber,
        choices: v.choices,
        realImage: v.realImage
      };
    });

    return NextResponse.json({
      success: true,
      dayId: activeDay.id,
      dayName: activeDay.name,
      dayTitle: activeDay.title,
      icon: activeDay.icon,
      badge: activeDay.badge,
      desc: activeDay.desc,
      totalQuestions: randomizedQuestions.length,
      questions: randomizedQuestions
    });
  } catch (error: any) {
    console.error('Error serving curriculum API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load curriculum from server' },
      { status: 500 }
    );
  }
}
