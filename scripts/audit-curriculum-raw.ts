import fs from 'node:fs';
import path from 'node:path';

interface AuditReport {
  totalDays: number;
  totalTopics: number;
  totalVariants: number;
  missingIds: number;
  duplicateIds: number;
  uniquePromptsRaw: number;
  uniquePromptsNormalized: number;
  zeroCorrectCount: number;
  multiCorrectCount: number;
  duplicateChoicesInsideVariant: number;
  missingSoundFiles: string[];
  typeDistribution: Record<string, number>;
  dayReports: {
    dayId: number;
    dayName: string;
    dayTitle: string;
    topicsCount: number;
    variantsCount: number;
    uniquePromptsCount: number;
    shuffledChoiceDuplicates: number; // variants with identical prompt and identical choices just shuffled
  }[];
}

function runAudit(): AuditReport {
  const filePath = path.resolve('src/server/data/curriculumMaster.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const master = JSON.parse(raw);

  const soundsDir = path.resolve('public/sounds');
  const availableSounds = fs.existsSync(soundsDir) ? fs.readdirSync(soundsDir) : [];

  let totalTopics = 0;
  let totalVariants = 0;
  let missingIds = 0;
  const allIds = new Set<string>();
  let duplicateIds = 0;
  const rawPrompts = new Set<string>();
  const normPrompts = new Set<string>();
  let zeroCorrect = 0;
  let multiCorrect = 0;
  let duplicateChoices = 0;
  const missingSounds = new Set<string>();
  const typeDist: Record<string, number> = {};

  const dayReports: AuditReport['dayReports'] = [];

  master.forEach((day: any) => {
    let dayVariants = 0;
    const dayRawPrompts = new Set<string>();
    let shuffledChoiceDups = 0;

    day.questions.forEach((slot: any) => {
      totalTopics++;

      // Track prompt + sorted choices signature inside the same topic to detect pure permutations
      const topicSignatures = new Set<string>();

      slot.variants.forEach((v: any) => {
        totalVariants++;
        dayVariants++;

        if (!v.id) {
          missingIds++;
        } else {
          if (allIds.has(v.id)) duplicateIds++;
          allIds.add(v.id);
        }

        const prompt = (v.prompt || '').trim();
        rawPrompts.add(prompt);
        dayRawPrompts.add(prompt);

        const normP = prompt.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
        normPrompts.add(normP);

        const type = v.type || 'standard_choice';
        typeDist[type] = (typeDist[type] || 0) + 1;

        if (v.soundFile) {
          const soundName = v.soundFile.replace(/^\/sounds\//, '');
          if (!availableSounds.includes(soundName)) {
            missingSounds.add(v.soundFile);
          }
        }

        if (v.choices && Array.isArray(v.choices)) {
          const correct = v.choices.filter((c: any) => c.isCorrect);
          if (correct.length === 0) zeroCorrect++;
          if (correct.length > 1 && v.type !== 'multi_choice') multiCorrect++;

          const choiceLabels = v.choices.map((c: any) => (c.label || '').trim().toLowerCase());
          if (new Set(choiceLabels).size < choiceLabels.length) {
            duplicateChoices++;
          }

          // Check if same prompt + same sorted set of choices was already used in this topic
          const sortedLabels = [...choiceLabels].sort().join('|');
          const sig = `${normP}:::${sortedLabels}`;
          if (topicSignatures.has(sig)) {
            shuffledChoiceDups++;
          } else {
            topicSignatures.add(sig);
          }
        }
      });
    });

    dayReports.push({
      dayId: day.id,
      dayName: day.name,
      dayTitle: day.title,
      topicsCount: day.questions.length,
      variantsCount: dayVariants,
      uniquePromptsCount: dayRawPrompts.size,
      shuffledChoiceDuplicates: shuffledChoiceDups,
    });
  });

  return {
    totalDays: master.length,
    totalTopics,
    totalVariants,
    missingIds,
    duplicateIds,
    uniquePromptsRaw: rawPrompts.size,
    uniquePromptsNormalized: normPrompts.size,
    zeroCorrectCount: zeroCorrect,
    multiCorrectCount: multiCorrect,
    duplicateChoicesInsideVariant: duplicateChoices,
    missingSoundFiles: Array.from(missingSounds),
    typeDistribution: typeDist,
    dayReports,
  };
}

const report = runAudit();

console.log('=====================================================');
console.log('🔍 ABALA CURRICULUM RAW DATASET AUDIT REPORT');
console.log('=====================================================');
console.log(`Total Days / Categories: ${report.totalDays}`);
console.log(`Total Topics Across All Days: ${report.totalTopics}`);
console.log(`Total Question Variants: ${report.totalVariants}`);
console.log(`Variants Missing "id" field: ${report.missingIds} / ${report.totalVariants} (100% missing!)`);
console.log(`Unique Raw Prompts: ${report.uniquePromptsRaw}`);
console.log(`Unique Normalized Prompts: ${report.uniquePromptsNormalized}`);
console.log(`Zero Correct Answers Found: ${report.zeroCorrectCount}`);
console.log(`Multiple Correct in Single Choice: ${report.multiCorrectCount}`);
console.log(`Duplicate Choices Within Single Question: ${report.duplicateChoicesInsideVariant}`);
console.log(`Missing Sound Files: ${report.missingSoundFiles.length === 0 ? 'None (All valid)' : report.missingSoundFiles.join(', ')}`);
console.log('\n--- Distribution of Question Types ---');
Object.entries(report.typeDistribution).forEach(([type, count]) => {
  console.log(`  - ${type}: ${count} (${Math.round((count / report.totalVariants) * 100)}%)`);
});

console.log('\n--- Breakdown Per Day / Category ---');
report.dayReports.forEach((d) => {
  console.log(`Day ${d.dayId} (${d.dayName} - ${d.dayTitle}):`);
  console.log(`  • Topics: ${d.topicsCount}, Variants: ${d.variantsCount}`);
  console.log(`  • Unique Prompts: ${d.uniquePromptsCount} out of ${d.variantsCount} (${Math.round((d.uniquePromptsCount / d.variantsCount) * 100)}% prompt diversity)`);
  console.log(`  • Shuffled-Choice Duplicates: ${d.shuffledChoiceDuplicates} (${Math.round((d.shuffledChoiceDuplicates / d.variantsCount) * 100)}% of variants are pure option shuffles!)`);
});
console.log('=====================================================\n');
