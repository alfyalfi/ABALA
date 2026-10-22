import fs from 'fs';
import path from 'path';

interface ChoiceOption {
  label: string;
  visual?: string;
  isCorrect: boolean;
}

interface QuestionVariant {
  id?: string;
  categoryId?: number;
  slotIndex?: number;
  topic?: string;
  type?: string;
  learningGoal?: string;
  skill?: string;
  cpElement?: string;
  difficulty?: 'mudah' | 'berkembang' | 'menantang';
  prompt: string;
  visual?: string;
  soundFile?: string;
  choices: ChoiceOption[];
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
}

interface QuestionSlot {
  topic: string;
  variants: QuestionVariant[];
}

interface DayCurriculum {
  id: number;
  name: string;
  title: string;
  icon: string;
  badge: string;
  desc: string;
  questions: QuestionSlot[];
}

function runCurriculumValidation() {
  console.log('====================================================');
  console.log('🔍 ABALA CURRICULUM INTELLIGENCE & QA VALIDATOR');
  console.log('====================================================\n');

  const masterPath = path.join(process.cwd(), 'src/server/data/curriculumMaster.json');
  if (!fs.existsSync(masterPath)) {
    console.error(`❌ Master curriculum not found at: ${masterPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(masterPath, 'utf8');
  const master: DayCurriculum[] = JSON.parse(raw);

  let errors = 0;
  let warnings = 0;

  // 1. Structure Verification
  console.log('1️⃣ Memeriksa Kelengkapan Struktur...');
  if (master.length !== 6) {
    console.error(`❌ Jumlah hari tidak sesuai: ditemukan ${master.length}, diharapkan 6.`);
    errors++;
  } else {
    console.log(`✅ Tepat 6 Hari Pembelajaran.`);
  }

  let totalTopics = 0;
  let totalVariants = 0;
  master.forEach((day, dIdx) => {
    if (day.questions.length !== 25) {
      console.error(`❌ Hari ${day.id} (${day.name}) memiliki ${day.questions.length} topik, diharapkan 25.`);
      errors++;
    }
    totalTopics += day.questions.length;
    day.questions.forEach((q) => {
      totalVariants += q.variants.length;
      if (q.variants.length !== 30) {
        console.error(`❌ Topik "${q.topic}" pada Hari ${day.id} memiliki ${q.variants.length} variasi, diharapkan 30.`);
        errors++;
      }
    });
  });

  console.log(`✅ Total Topik: ${totalTopics} (Target 150)`);
  console.log(`✅ Total Variasi: ${totalVariants} (Target 4.500)\n`);

  // 2. ID Uniqueness
  console.log('2️⃣ Memeriksa Keunikan ID Variasi (0 Missing, 0 Duplicate)...');
  const idMap = new Map<string, number>();
  let missingIds = 0;

  master.forEach((day) => {
    day.questions.forEach((q) => {
      q.variants.forEach((v) => {
        if (!v.id || v.id.trim() === '') {
          missingIds++;
        } else {
          idMap.set(v.id, (idMap.get(v.id) || 0) + 1);
        }
      });
    });
  });

  if (missingIds > 0) {
    console.error(`❌ Ditemukan ${missingIds} variasi tanpa ID!`);
    errors++;
  } else {
    console.log(`✅ 0 Missing ID.`);
  }

  let duplicates = 0;
  idMap.forEach((count, id) => {
    if (count > 1) {
      console.error(`❌ ID Duplikat ditemukan: ${id} (${count}x)`);
      duplicates++;
      errors++;
    }
  });

  if (duplicates === 0) {
    console.log(`✅ 0 Duplicate ID. Seluruh 4.500 variasi memiliki primary key unik.\n`);
  }

  // 3. Choice Options Validation
  console.log('3️⃣ Memeriksa Pilihan Jawaban & Kunci Jawaban...');
  let invalidChoicesCount = 0;
  let multipleCorrectCount = 0;
  let noCorrectCount = 0;

  master.forEach((day) => {
    day.questions.forEach((q) => {
      q.variants.forEach((v) => {
        if (!Array.isArray(v.choices) || v.choices.length < 2 || v.choices.length > 4) {
          invalidChoicesCount++;
        }
        const correctCount = v.choices.filter((c) => c.isCorrect).length;
        if (correctCount === 0) {
          noCorrectCount++;
        } else if (correctCount > 1) {
          multipleCorrectCount++;
        }
        for (const c of v.choices) {
          if (!c.label || c.label.trim() === '') {
            invalidChoicesCount++;
          }
        }
      });
    });
  });

  if (noCorrectCount > 0) {
    console.error(`❌ Ditemukan ${noCorrectCount} variasi tanpa kunci jawaban benar!`);
    errors++;
  }
  if (multipleCorrectCount > 0) {
    console.error(`❌ Ditemukan ${multipleCorrectCount} variasi dengan >1 jawaban benar!`);
    errors++;
  }
  if (invalidChoicesCount > 0) {
    console.error(`❌ Ditemukan ${invalidChoicesCount} variasi dengan format pilihan tidak valid!`);
    errors++;
  }

  if (noCorrectCount === 0 && multipleCorrectCount === 0 && invalidChoicesCount === 0) {
    console.log(`✅ Validasi Jawaban Lolos: 100% variasi memiliki tepat 1 kunci jawaban valid (2–4 pilihan).\n`);
  }

  // 4. Audio Integrity Validation
  console.log('4️⃣ Memeriksa Integritas File Audio (Rabu — Menyimak & Suara)...');
  let missingAudioFiles = 0;
  const day3 = master.find((d) => d.id === 3);
  if (day3) {
    day3.questions.forEach((q) => {
      q.variants.forEach((v) => {
        if (v.soundFile) {
          const publicAudioPath = path.join(process.cwd(), 'public', v.soundFile.replace(/^\//, ''));
          if (!fs.existsSync(publicAudioPath)) {
            console.error(`❌ File audio tidak ditemukan: ${v.soundFile} (${publicAudioPath})`);
            missingAudioFiles++;
            errors++;
          }
        }
      });
    });
  }

  if (missingAudioFiles === 0) {
    console.log(`✅ Integritas Audio 100% Valid: Semua referensi audio ada di public/sounds/.\n`);
  }

  // 5. Pedagogical Metadata Completeness
  console.log('5️⃣ Memeriksa Kelengkapan Metadata Pedagogis...');
  let missingMetadataCount = 0;
  master.forEach((day) => {
    day.questions.forEach((q) => {
      q.variants.forEach((v) => {
        if (
          !v.learningGoal ||
          !v.skill ||
          !v.cpElement ||
          !v.difficulty ||
          !v.feedbackCorrect ||
          !v.feedbackIncorrect
        ) {
          missingMetadataCount++;
        }
      });
    });
  });

  if (missingMetadataCount > 0) {
    console.error(`❌ Ditemukan ${missingMetadataCount} variasi dengan metadata pedagogis tidak lengkap!`);
    errors++;
  } else {
    console.log(`✅ Metadata Pedagogis 100% Lengkap: learningGoal, skill, cpElement, difficulty, feedbackCorrect, feedbackIncorrect hadir di setiap variasi.\n`);
  }

  // 6. Prompt Diversity & Content Uniqueness Metric
  console.log('6️⃣ Menganalisis Keunikan Teks Prompt per Topik...');
  let totalUniquePrompts = 0;
  master.forEach((day) => {
    let dayUnique = 0;
    day.questions.forEach((q) => {
      const set = new Set(q.variants.map((v) => v.prompt.trim()));
      dayUnique += set.size;
    });
    const avgUnique = (dayUnique / 25).toFixed(1);
    console.log(`   - Hari ${day.id} (${day.name}): Rata-rata ${avgUnique} / 30 prompt unik per topik (${dayUnique} total)`);
    totalUniquePrompts += dayUnique;
  });

  const overallUniqueness = ((totalUniquePrompts / 4500) * 100).toFixed(1);
  console.log(`✅ Metrik Keunikan Prompt Keseluruhan: ${totalUniquePrompts} / 4.500 (${overallUniqueness}% Keunikan).\n`);

  // 7. Simulation of 100 Random Sessions
  console.log('7️⃣ Menjalankan Simulasi 100 Sesi Belajar Acak...');
  let sessionErrors = 0;
  for (let s = 1; s <= 100; s++) {
    const dayId = ((s - 1) % 6) + 1;
    const day = master.find((d) => d.id === dayId)!;
    const sessionQuestions = day.questions.map((q, idx) => {
      const v = q.variants[Math.floor(Math.random() * q.variants.length)];
      return {
        slotIndex: idx,
        id: v.id,
        difficulty: v.difficulty,
        prompt: v.prompt,
        choices: v.choices,
      };
    });

    if (sessionQuestions.length !== 25) {
      sessionErrors++;
    }
    const hasNullPrompt = sessionQuestions.some((q) => !q.prompt || q.prompt === '');
    const hasNullChoices = sessionQuestions.some((q) => !q.choices || q.choices.length === 0);
    if (hasNullPrompt || hasNullChoices) {
      sessionErrors++;
    }
  }

  if (sessionErrors > 0) {
    console.error(`❌ Simulasi gagal pada ${sessionErrors} sesi!`);
    errors++;
  } else {
    console.log(`✅ 100/100 Simulasi Sesi Berjalan Mulus Tanpa Glitch!\n`);
  }

  // Summary
  console.log('====================================================');
  if (errors === 0) {
    console.log('🎉 SELURUH VALIDASI KURIKULUM ABALA: 100% PASS!');
    console.log('====================================================');
    process.exit(0);
  } else {
    console.error(`🚨 VALIDASI GAGAL DENGAN ${errors} ERROR & ${warnings} PERINGATAN.`);
    console.log('====================================================');
    process.exit(1);
  }
}

runCurriculumValidation();
