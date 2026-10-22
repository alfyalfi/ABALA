import fs from 'fs';
import path from 'path';
import { generateDay1Math } from './curriculum-generators/day1-math';
import { generateDay2Reading } from './curriculum-generators/day2-reading';
import { generateDay3Listening } from './curriculum-generators/day3-listening';
import { generateDay4Logic } from './curriculum-generators/day4-logic';
import { generateDay5Spatial } from './curriculum-generators/day5-spatial';
import { generateDay6Independence } from './curriculum-generators/day6-independence';

console.log('🚀 Generating Full ABALA Curriculum Master (6 Days x 25 Topics x 30 Variants = 4,500 Variants)...');

const day1 = generateDay1Math();
const day2 = generateDay2Reading();
const day3 = generateDay3Listening();
const day4 = generateDay4Logic();
const day5 = generateDay5Spatial();
const day6 = generateDay6Independence();

const fullCurriculum = [day1, day2, day3, day4, day5, day6];

// Verification before writing
let totalTopics = 0;
let totalVariants = 0;
const idSet = new Set<string>();

for (const day of fullCurriculum) {
  totalTopics += day.questions.length;
  for (const q of day.questions) {
    totalVariants += q.variants.length;
    for (const v of q.variants) {
      if (!v.id) {
        throw new Error(`Variant missing ID in Day ${day.id}, topic: ${q.topic}`);
      }
      if (idSet.has(v.id)) {
        throw new Error(`Duplicate variant ID found: ${v.id}`);
      }
      idSet.add(v.id);
    }
  }
}

console.log(`✅ Validation Passed:`);
console.log(`   - Total Days: ${fullCurriculum.length}`);
console.log(`   - Total Topics: ${totalTopics} (Expected 150)`);
console.log(`   - Total Variants: ${totalVariants} (Expected 4500)`);
console.log(`   - Unique Variant IDs: ${idSet.size}`);

// Write src/server/data/curriculumMaster.json
const masterPath = path.join(process.cwd(), 'src/server/data/curriculumMaster.json');
fs.writeFileSync(masterPath, JSON.stringify(fullCurriculum, null, 2), 'utf-8');
console.log(`💾 Saved master to: ${masterPath}`);

// Generate curated offlineCurriculumPack.json (e.g. 3 distinct variants per topic for ultra-fast, lightweight bundle ~300KB)
const offlinePack = fullCurriculum.map((day) => ({
  id: day.id,
  name: day.name,
  title: day.title,
  icon: day.icon,
  badge: day.badge,
  desc: day.desc,
  questions: day.questions.map((q) => ({
    topic: q.topic,
    // Include 5 curated variants per topic (1 mudah, 3 berkembang, 1 menantang)
    variants: [
      q.variants[0],
      q.variants[5],
      q.variants[12],
      q.variants[18],
      q.variants[25],
    ].filter(Boolean),
  })),
}));

const offlinePackPath = path.join(process.cwd(), 'src/data/offlineCurriculumPack.json');
fs.writeFileSync(offlinePackPath, JSON.stringify(offlinePack, null, 2), 'utf-8');
console.log(`💾 Saved offline pack to: ${offlinePackPath}`);
console.log('🎉 Generation complete!');
