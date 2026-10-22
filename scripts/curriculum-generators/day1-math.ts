export function generateDay1Math() {
  const topics = [
    'Menghitung 1–5 Benda',
    'Menghitung 6–10 Benda',
    'Menghitung 11–15 Benda',
    'Mengenal Lambang Angka 1–10',
    'Angka Ganjil & Genap',
    'Penjumlahan Dasar: 1 + 1 s.d. 2 + 1',
    'Penjumlahan Visual: 2 + 2 = 4',
    'Penjumlahan Visual: 3 + 2 = 5',
    'Penjumlahan Visual: 4 + 2 = 6',
    'Penjumlahan Superhero: 5 + 5 = 10',
    'Pengurangan Dasar: 3 - 1 = 2',
    'Pengurangan Dasar: 4 - 2 = 2',
    'Pengurangan Visual: 5 - 2 = 3',
    'Pengurangan Visual: 6 - 3 = 3',
    'Pengurangan Superhero: 10 - 5 = 5',
    'Soal Cerita Penjumlahan',
    'Soal Cerita Pengurangan',
    'Lompat Angka Genap (2, 4, 6, 8)',
    'Lompat Angka Ganjil (1, 3, 5, 7)',
    'Hitung Mundur Roket (5 s.d. 1)',
    'Bandingkan: Lebih Banyak',
    'Bandingkan: Lebih Sedikit',
    'Konsep Angka 0 (Kosong)',
    'Urutan Bilangan 1–10',
    'Teka-Teki Logika Angka',
  ];

  const itemsPool = [
    { name: 'mobil balap', emoji: '🏎️' },
    { name: 'bintang emas', emoji: '⭐' },
    { name: 'bebek kuning', emoji: '🦆' },
    { name: 'stroberi manis', emoji: '🍓' },
    { name: 'ikan biru', emoji: '🐟' },
    { name: 'roket antariksa', emoji: '🚀' },
    { name: 'es krim lezat', emoji: '🍦' },
    { name: 'balon merah', emoji: '🎈' },
    { name: 'topi superhero', emoji: '🧢' },
    { name: 'pisang segar', emoji: '🍌' },
    { name: 'apel merah', emoji: '🍎' },
    { name: 'kupu-kupu', emoji: '🦋' },
    { name: 'kelinci putih', emoji: '🐰' },
    { name: 'krayon warna', emoji: '🖍️' },
    { name: 'perahu layar', emoji: '⛵' },
    { name: 'kucing lucu', emoji: '🐱' },
    { name: 'kelereng', emoji: '🔮' },
    { name: 'bunga matahari', emoji: '🌻' },
    { name: 'jeruk manis', emoji: '🍊' },
    { name: 'mobil polisi', emoji: '🚓' },
    { name: 'bola basket', emoji: '🏀' },
    { name: 'burung pipit', emoji: '🐦' },
    { name: 'donat cokelat', emoji: '🍩' },
    { name: 'permen manis', emoji: '🍬' },
    { name: 'buku gambar', emoji: '📚' },
    { name: 'daun hijau', emoji: '🍃' },
    { name: 'kado kejutan', emoji: '🎁' },
    { name: 'kereta api', emoji: '🚂' },
    { name: 'pesawat terbang', emoji: '✈️' },
    { name: 'gasing putar', emoji: '🪀' },
  ];

  const riddles = [
    { q: 'Aku berada di antara angka 2 dan 4. Angka berapakah aku?', ans: 3, d1: 2, d2: 5 },
    { q: 'Berapakah jumlah jari di satu tanganmu?', ans: 5, d1: 4, d2: 6 },
    { q: 'Berapakah jumlah roda pada sepeda gowes roda dua?', ans: 2, d1: 3, d2: 4 },
    { q: 'Berapa banyak sudut pada bangun segitiga?', ans: 3, d1: 4, d2: 2 },
    { q: 'Kak Reza punya 2 mata dan 2 telinga. Berapa jumlah keduanya?', ans: 4, d1: 3, d2: 5 },
    { q: 'Berapakah jumlah kaki pada seekor kelinci lucu?', ans: 4, d1: 2, d2: 6 },
    { q: 'Angka berapakah sebelum angka 10 dalam urutan hitungan?', ans: 9, d1: 8, d2: 7 },
    { q: 'Angka berapakah setelah angka 6 dan sebelum angka 8?', ans: 7, d1: 6, d2: 8 },
    { q: 'Kak Reza punya 3 permen lalu memakannya 1. Berapa sisa permen Kak Reza?', ans: 2, d1: 1, d2: 3 },
    { q: 'Berapakah jumlah tangan pada robot superhero Kak Reza?', ans: 2, d1: 1, d2: 3 },
    { q: 'Berapakah jumlah roda pada sebuah mobil balap?', ans: 4, d1: 3, d2: 5 },
    { q: 'Jika 1 ditambah dengan 0, berapakah hasilnya?', ans: 1, d1: 0, d2: 2 },
    { q: 'Berapa banyak kaki yang dimiliki ayam jago?', ans: 2, d1: 4, d2: 1 },
    { q: 'Bentuknya bulat seperti telur tanpa sudut. Angka berapakah ini?', ans: 0, d1: 1, d2: 8 },
    { q: 'Kak Reza punya 3 balon lalu dapat 3 balon lagi. Berapa semua balonnya?', ans: 6, d1: 5, d2: 7 },
    { q: 'Berapakah jumlah hari sekolah dari Senin sampai Jumat?', ans: 5, d1: 6, d2: 4 },
    { q: 'Ada 4 burung di dahan, 2 terbang. Berapa burung yang masih ada?', ans: 2, d1: 1, d2: 3 },
    { q: 'Angka genap yang lebih besar dari 2 dan lebih kecil dari 6 adalah?', ans: 4, d1: 3, d2: 5 },
    { q: 'Kak Reza punya 5 bintang lalu dapat 2 bintang lagi. Berapa totalnya?', ans: 7, d1: 6, d2: 8 },
    { q: 'Berapa banyak warna lampu lalu lintas (merah, kuning, hijau)?', ans: 3, d1: 2, d2: 4 },
    { q: 'Angka ganjil di antara 7 dan 11 adalah?', ans: 9, d1: 8, d2: 10 },
    { q: 'Kak Reza melompat 3 kali lalu melompat lagi 1 kali. Berapa kali totalnya?', ans: 4, d1: 3, d2: 5 },
    { q: 'Berapa banyak cula pada kepala badak bercula satu?', ans: 1, d1: 2, d2: 0 },
    { q: 'Jika 4 biskuit dibagi sama rata untuk 2 anak, masing-masing dapat berapa?', ans: 2, d1: 1, d2: 3 },
    { q: 'Berapakah jumlah sayap pada seekor burung elang?', ans: 2, d1: 4, d2: 1 },
    { q: 'Angka berapakah yang jika ditambah 1 menjadi 6?', ans: 5, d1: 4, d2: 7 },
    { q: 'Berapakah jumlah roda pada gerobak dorong roda satu?', ans: 1, d1: 2, d2: 3 },
    { q: 'Kak Reza punya 8 krayon, 3 krayon dipinjam teman. Sisa krayonnya ada?', ans: 5, d1: 4, d2: 6 },
    { q: 'Angka berapakah yang paling kecil dan bernilai lebih besar dari 0?', ans: 1, d1: 2, d2: 0 },
    { q: 'Pakai 2 sepatu di kaki dan 2 sarung di tangan. Berapa pasang benda itu?', ans: 4, d1: 3, d2: 5 },
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const item = itemsPool[vIdx % itemsPool.length];
      const varId = `d1_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty: 'mudah' | 'berkembang' | 'menantang' = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

      let variant: any;

      if (slotIdx === 0) {
        // Topic 1: Menghitung 1-5 Benda
        const count = (vIdx % 5) + 1;
        const countItems = Array(count).fill(item.emoji);
        const distractors = [count === 5 ? 3 : count + 1, count === 1 ? 3 : count - 1].filter((n, i, a) => n !== count && a.indexOf(n) === i);
        if (distractors.length < 2) distractors.push(4);

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'touch_count',
          learningGoal: `Membilang kuantitas ${count} benda secara konkret melalui sentuhan.`,
          skill: 'korespondensi_satu_satu',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Sentuh dan hitung, ada berapa banyak ${item.name} di bawah ini?`,
          visual: countItems.join(' '),
          countItems,
          targetCount: count,
          itemName: item.name,
          itemEmoji: item.emoji,
          choices: [
            { label: String(distractors[0]), visual: '', isCorrect: false },
            { label: String(count), visual: '', isCorrect: true },
            { label: String(distractors[1]), visual: '', isCorrect: false },
          ],
          feedbackCorrect: `Hebat sekali! Benar ada ${count} ${item.name}!`,
          feedbackIncorrect: `Coba sentuh satu per satu gambarnya sambil bersuara ya!`,
        };
      } else if (slotIdx === 1) {
        // Topic 2: Menghitung 6-10 Benda
        const count = 6 + (vIdx % 5);
        const countItems = Array(count).fill(item.emoji);
        const d1 = count === 10 ? 8 : count + 1;
        const d2 = count === 6 ? 9 : count - 1;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'touch_count',
          learningGoal: `Membilang kuantitas ${count} benda secara teratur hingga 10.`,
          skill: 'korespondensi_satu_satu',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ayo teliti! Sentuh satu per satu, ada berapa ${item.name}?`,
          visual: countItems.join(' '),
          countItems,
          targetCount: count,
          itemName: item.name,
          itemEmoji: item.emoji,
          choices: [
            { label: String(d1), visual: '', isCorrect: false },
            { label: String(count), visual: '', isCorrect: true },
            { label: String(d2), visual: '', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Benar ada ${count} ${item.name}!`,
          feedbackIncorrect: `Jangan terburu-buru, sentuh setiap ${item.name} perlahan!`,
        };
      } else if (slotIdx === 2) {
        // Topic 3: Menghitung 11-15 Benda
        const count = 11 + (vIdx % 5);
        const countItems = Array(count).fill(item.emoji);
        const d1 = count - 2;
        const d2 = count + 2;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'touch_count',
          learningGoal: `Membilang kelompok benda hingga belasan (11–15).`,
          skill: 'membilang_belasan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Wah banyak sekali! Sentuh dan hitung ada berapa ${item.name}?`,
          visual: countItems.join(' '),
          countItems,
          targetCount: count,
          itemName: item.name,
          itemEmoji: item.emoji,
          choices: [
            { label: String(count), visual: '', isCorrect: true },
            { label: String(d1), visual: '', isCorrect: false },
            { label: String(d2), visual: '', isCorrect: false },
          ],
          feedbackCorrect: `Hebat sekali Kak Reza! Benar ada ${count} ${item.name}!`,
          feedbackIncorrect: `Fokus ya Kak Reza, sentuh tiap gambar satu kali!`,
        };
      } else if (slotIdx === 3) {
        // Topic 4: Mengenal Lambang Angka 1-10
        const targetNum = (vIdx % 10) + 1;
        const d1 = targetNum === 10 ? 8 : targetNum + 1;
        const d2 = targetNum === 1 ? 4 : targetNum - 1;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'number_match',
          learningGoal: `Mencocokkan simbol angka ${targetNum} dengan jumlah benda yang sesuai.`,
          skill: 'simbol_angka',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Bantu Kak Reza mencari kelompok yang berisi ${targetNum} ${item.name}!`,
          targetCount: targetNum,
          visual: `${item.emoji} `.repeat(targetNum).trim(),
          choices: [
            { label: `${d1} Benda`, visual: `${item.emoji} `.repeat(d1).trim(), isCorrect: false },
            { label: `${targetNum} Benda`, visual: `${item.emoji} `.repeat(targetNum).trim(), isCorrect: true },
            { label: `${d2} Benda`, visual: `${item.emoji} `.repeat(d2).trim(), isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Ini adalah lambang angka ${targetNum}!`,
          feedbackIncorrect: `Hitung jumlah benda di dalam setiap pilihan ya!`,
        };
      } else if (slotIdx === 4) {
        // Topic 5: Angka Ganjil & Genap
        const isEven = vIdx % 2 === 0;
        const number = isEven ? 2 + ((vIdx % 4) * 2) : 1 + ((vIdx % 4) * 2);

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali konsep pasangan (genap) atau bersisa (ganjil) pada bilangan ${number}.`,
          skill: 'ganjil_genap',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Jika ada ${number} ${item.name} ${item.emoji.repeat(number)}, apakah jumlah ini GENAP atau GANJIL?`,
          visual: item.emoji.repeat(number),
          choices: [
            { label: 'Genap (Punya Pasangan)', isCorrect: isEven },
            { label: 'Ganjil (Ada Sendirian)', isCorrect: !isEven },
          ],
          feedbackCorrect: `Benar Kak Reza! Angka ${number} adalah ${isEven ? 'GENAP' : 'GANJIL'}!`,
          feedbackIncorrect: `Coba pasangkan dua-dua, apakah ada yang tidak dapat pasangan?`,
        };
      } else if (slotIdx >= 5 && slotIdx <= 9) {
        // Topics 6-10: Penjumlahan Visual (1+1 s.d. 5+5) - SAME ITEM FOR BOTH GROUPS
        const config = [
          { a: 1, b: 1, sum: 2, label: '1 + 1' },
          { a: 2, b: 2, sum: 4, label: '2 + 2' },
          { a: 3, b: 2, sum: 5, label: '3 + 2' },
          { a: 4, b: 2, sum: 6, label: '4 + 2' },
          { a: 5, b: 5, sum: 10, label: '5 + 5' },
        ][slotIdx - 5];

        const aItems = Array(config.a).fill(item.emoji);
        const bItems = Array(config.b).fill(item.emoji); // RELEVANT: Same item!
        const d1 = config.sum - 1;
        const d2 = config.sum + 1;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'addition',
          learningGoal: `Menjumlahkan dua kelompok konkret: ${config.a} + ${config.b} = ${config.sum}.`,
          skill: 'penjumlahan_konkret',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kak Reza punya ${config.a} ${item.name}, lalu dapat lagi ${config.b} ${item.name}. Berapa semuanya?`,
          plateA: aItems,
          plateB: bItems,
          itemName: item.name,
          itemEmoji: item.emoji,
          visual: `${aItems.join(' ')}  ➕  ${bItems.join(' ')}`,
          choices: [
            { label: String(d1), isCorrect: false },
            { label: String(config.sum), isCorrect: true },
            { label: String(d2), isCorrect: false },
          ],
          feedbackCorrect: `Tepat! ${config.a} ditambah ${config.b} sama dengan ${config.sum}!`,
          feedbackIncorrect: `Gabungkan kedua kelompok ${item.name} lalu hitung seluruhnya!`,
        };
      } else if (slotIdx >= 10 && slotIdx <= 14) {
        // Topics 11-15: Pengurangan Visual (3-1 s.d. 10-5)
        const config = [
          { total: 3, take: 1, rem: 2 },
          { total: 4, take: 2, rem: 2 },
          { total: 5, take: 2, rem: 3 },
          { total: 6, take: 3, rem: 3 },
          { total: 10, take: 5, rem: 5 },
        ][slotIdx - 10];

        const d1 = config.rem === 1 ? 4 : config.rem - 1;
        const d2 = config.rem + 1;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'subtraction',
          learningGoal: `Mengurangkan kelompok benda konkret: ${config.total} dikurang ${config.take} = ${config.rem}.`,
          skill: 'pengurangan_konkret',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ada ${config.total} ${item.name}. Diambil ${config.take}. Berapa sisa ${item.name} sekarang?`,
          visual: `${Array(config.rem).fill(item.emoji).join(' ')} ❌ ${Array(config.take).fill(item.emoji).join(' ')}`,
          remainingCount: config.rem,
          subtractedCount: config.take,
          itemName: item.name,
          itemEmoji: item.emoji,
          choices: [
            { label: String(d1), isCorrect: false },
            { label: String(d2), isCorrect: false },
            { label: String(config.rem), isCorrect: true },
          ],
          feedbackCorrect: `Hebat! ${config.total} dikurang ${config.take} tersisa ${config.rem}!`,
          feedbackIncorrect: `Coret ${config.take} buah, lalu hitung yang belum dicoret ya!`,
        };
      } else if (slotIdx === 15) {
        // Topic 16: Soal Cerita Penjumlahan - SAME ITEM RELEVANCE
        const a = (vIdx % 3) + 2; // 2, 3, 4
        const b = (vIdx % 2) + 1; // 1, 2
        const total = a + b;
        const d1 = total - 1;
        const d2 = total + 2;
        const aItems = Array(a).fill(item.emoji);
        const bItems = Array(b).fill(item.emoji); // Same item!

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'addition',
          learningGoal: `Memahami cerita matematika penjumlahan kontekstual.`,
          skill: 'pemecahan_masalah_numerik',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Di wadah ada ${a} ${item.name}. Kak Reza menambah lagi ${b} ${item.name}. Berapa jumlah seluruhnya?`,
          plateA: aItems,
          plateB: bItems,
          itemName: item.name,
          itemEmoji: item.emoji,
          visual: `${item.emoji.repeat(a)} ➕ ${item.emoji.repeat(b)}`,
          choices: [
            { label: `${total} buah`, isCorrect: true },
            { label: `${d1} buah`, isCorrect: false },
            { label: `${d2} buah`, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Totalnya adalah ${total} ${item.name}!`,
          feedbackIncorrect: `Ingat, ditambahkan artinya jumlahnya bertambah banyak!`,
        };
      } else if (slotIdx === 16) {
        // Topic 17: Soal Cerita Pengurangan
        const total = (vIdx % 3) + 4; // 4, 5, 6
        const taken = (vIdx % 2) + 1; // 1, 2
        const sisa = total - taken;
        const d1 = sisa + 1;
        const d2 = sisa > 1 ? sisa - 1 : sisa + 2;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'subtraction',
          learningGoal: `Memahami cerita pengurangan kontekstual dan menghitung sisa.`,
          skill: 'pemecahan_masalah_numerik',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kak Reza punya ${total} ${item.name}. Diberikan ke Lili ${taken} buah. Berapa sisa ${item.name} Kak Reza?`,
          remainingCount: sisa,
          subtractedCount: taken,
          itemName: item.name,
          itemEmoji: item.emoji,
          visual: `${item.emoji.repeat(sisa)} (sisa)`,
          choices: [
            { label: `${d1} buah`, isCorrect: false },
            { label: `${sisa} buah`, isCorrect: true },
            { label: `${d2} buah`, isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Sisa ${item.name} milik Kak Reza sekarang ada ${sisa}!`,
          feedbackIncorrect: `Diberikan artinya jumlahnya berkurang, hitung sisanya ya!`,
        };
      } else if (slotIdx === 17) {
        // Topic 18: Lompat Angka Genap (2, 4, 6, 8, 10)
        const genapSteps = [
          { seq: '2 ➔ 4 ➔ ? ➔ 8', missing: 6, d1: 5, d2: 7, text: '2, 4, ?, 8' },
          { seq: '4 ➔ 6 ➔ ? ➔ 10', missing: 8, d1: 7, d2: 9, text: '4, 6, ?, 10' },
          { seq: '2 ➔ ? ➔ 6 ➔ 8', missing: 4, d1: 3, d2: 5, text: '2, ?, 6, 8' },
          { seq: '? ➔ 4 ➔ 6 ➔ 8', missing: 2, d1: 1, d2: 3, text: '?, 4, 6, 8' },
          { seq: '6 ➔ 8 ➔ ?', missing: 10, d1: 9, d2: 12, text: '6, 8, ?' },
        ];
        const opt = genapSteps[vIdx % genapSteps.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Melengkapi pola lompat bilangan genap (tambah 2).`,
          skill: 'pola_bilangan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ayo lengkapi pola angka loncat dua: ${opt.text}! Angka berapa di tanda tanya?`,
          visual: opt.seq,
          choices: [
            { label: String(opt.d1), isCorrect: false },
            { label: String(opt.missing), isCorrect: true },
            { label: String(opt.d2), isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Angka yang hilang adalah ${opt.missing}!`,
          feedbackIncorrect: `Ingat pola loncat 2 angka ya Kak Reza!`,
        };
      } else if (slotIdx === 18) {
        // Topic 19: Lompat Angka Ganjil (1, 3, 5, 7, 9)
        const ganjilSteps = [
          { seq: '1 ➔ 3 ➔ ? ➔ 7', missing: 5, d1: 4, d2: 6, text: '1, 3, ?, 7' },
          { seq: '3 ➔ 5 ➔ ? ➔ 9', missing: 7, d1: 6, d2: 8, text: '3, 5, ?, 9' },
          { seq: '1 ➔ ? ➔ 5 ➔ 7', missing: 3, d1: 2, d2: 4, text: '1, ?, 5, 7' },
          { seq: '? ➔ 3 ➔ 5 ➔ 7', missing: 1, d1: 2, d2: 0, text: '?, 3, 5, 7' },
          { seq: '5 ➔ 7 ➔ ?', missing: 9, d1: 8, d2: 10, text: '5, 7, ?' },
        ];
        const opt = ganjilSteps[vIdx % ganjilSteps.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Melengkapi urutan bilangan lompat ganjil.`,
          skill: 'pola_bilangan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ayo lengkapi pola bilangan ganjil: ${opt.text}! Angka berapa di tanda tanya?`,
          visual: opt.seq,
          choices: [
            { label: String(opt.missing), isCorrect: true },
            { label: String(opt.d1), isCorrect: false },
            { label: String(opt.d2), isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Angka ${opt.missing} melengkapi pola ganjil!`,
          feedbackIncorrect: `Perhatikan urutan bilangan ganjil: 1, 3, 5, 7, 9!`,
        };
      } else if (slotIdx === 19) {
        // Topic 20: Hitung Mundur Roket (5 s.d. 1)
        const countdowns = [
          { seq: '5 ➔ 4 ➔ ? ➔ 2 ➔ 1', missing: 3, d1: 2, d2: 4, text: '5, 4, ?, 2, 1' },
          { seq: '5 ➔ ? ➔ 3 ➔ 2 ➔ 1', missing: 4, d1: 3, d2: 5, text: '5, ?, 3, 2, 1' },
          { seq: '5 ➔ 4 ➔ 3 ➔ ? ➔ 1', missing: 2, d1: 1, d2: 3, text: '5, 4, 3, ?, 1' },
          { seq: '? ➔ 4 ➔ 3 ➔ 2 ➔ 1', missing: 5, d1: 6, d2: 4, text: '?, 4, 3, 2, 1' },
          { seq: '4 ➔ 3 ➔ 2 ➔ ?', missing: 1, d1: 0, d2: 2, text: '4, 3, 2, ?' },
        ];
        const opt = countdowns[vIdx % countdowns.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Membilang mundur dari 5 ke 1 untuk peluncuran roket.`,
          skill: 'hitung_mundur',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Hitung mundur roket: ${opt.text}! Angka berapa yang hilang di tanda tanya?`,
          visual: `🚀 ${opt.seq}`,
          choices: [
            { label: String(opt.d1), isCorrect: false },
            { label: String(opt.missing), isCorrect: true },
            { label: String(opt.d2), isCorrect: false },
          ],
          feedbackCorrect: `3... 2... 1... Meluncur! Roket siap terbang!`,
          feedbackIncorrect: `Hitung mundur dari yang paling besar ke paling kecil ya!`,
        };
      } else if (slotIdx === 20) {
        // Topic 21: Bandingkan Lebih Banyak - SAME ITEM FOR BOTH PLATES
        const countA = (vIdx % 3) + 4; // 4, 5, 6
        const countB = (vIdx % 2) + 2; // 2, 3
        const plateA = Array(countA).fill(item.emoji);
        const plateB = Array(countB).fill(item.emoji); // Same item!

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'comparison',
          learningGoal: `Membandingkan dua kelompok benda dan memilih yang LEBIH BANYAK.`,
          skill: 'perbandingan_kuantitas',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Piring manakah yang ada ${item.name} LEBIH BANYAK?`,
          choices: [
            { label: `Piring A (${countA} ${item.name})`, visual: plateA.join(' '), isCorrect: true },
            { label: `Piring B (${countB} ${item.name})`, visual: plateB.join(' '), isCorrect: false },
          ],
          feedbackCorrect: `Benar! ${countA} lebih banyak daripada ${countB}!`,
          feedbackIncorrect: `Hitung jumlah benda di masing-masing piring ya!`,
        };
      } else if (slotIdx === 21) {
        // Topic 22: Bandingkan Lebih Sedikit - SAME ITEM FOR BOTH PLATES
        const countA = (vIdx % 3) + 2; // 2, 3, 4
        const countB = countA + 3; // 5, 6, 7
        const plateA = Array(countA).fill(item.emoji);
        const plateB = Array(countB).fill(item.emoji); // Same item!

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'comparison',
          learningGoal: `Membandingkan dua kelompok benda dan memilih yang LEBIH SEDIKIT.`,
          skill: 'perbandingan_kuantitas',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kelompok manakah yang ada ${item.name} LEBIH SEDIKIT?`,
          choices: [
            { label: `Kelompok A (${countA} ${item.name})`, visual: plateA.join(' '), isCorrect: true },
            { label: `Kelompok B (${countB} ${item.name})`, visual: plateB.join(' '), isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${countA} lebih sedikit daripada ${countB}!`,
          feedbackIncorrect: `Cari kelompok yang jumlah bendanya paling sedikit ya!`,
        };
      } else if (slotIdx === 22) {
        // Topic 23: Konsep Angka 0 (Kosong) - REPLACED MISPLACED GEOMETRY
        const zeroContexts = [
          { p: 'Piring kue ini sudah habis dimakan dan kosong.', q: 'Berapakah lambang angka untuk piring yang kosong?', ans: 0 },
          { p: 'Kotak pensil terbuka dan tidak ada pensil sama sekali.', q: 'Berapakah jumlah pensil di dalam kotak kosong itu?', ans: 0 },
          { p: 'Semua burung di dahan sudah terbang pergi.', q: 'Berapa banyak burung yang tersisa di dahan?', ans: 0 },
          { p: 'Keranjang buah ini kosong melompong.', q: 'Angka berapakah yang melambangkan benda kosong atau habis?', ans: 0 },
          { p: 'Kak Reza punya 1 balon lalu balonnya meletus.', q: 'Berapakah sisa balon Kak Reza sekarang?', ans: 0 },
        ];
        const zc = zeroContexts[vIdx % zeroContexts.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Memahami konsep bilangan nol sebagai ketiadaan benda atau keadaan kosong.`,
          skill: 'konsep_angka_nol',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `${zc.p} ${zc.q}`,
          visual: '⭕ Angka 0 (Kosong)',
          choices: [
            { label: '0 (Kosong)', visual: '0️⃣', isCorrect: true },
            { label: '1 (Satu)', visual: '1️⃣', isCorrect: false },
            { label: '2 (Dua)', visual: '2️⃣', isCorrect: false },
          ],
          feedbackCorrect: `Pintar sekali! Angka 0 artinya kosong atau tidak ada benda!`,
          feedbackIncorrect: `Bila tidak ada benda sama sekali, lambang angkanya adalah nol (0)!`,
        };
      } else if (slotIdx === 23) {
        // Topic 24: Urutan Bilangan 1-10 - REPLACED MISPLACED 3D CYLINDER
        const orderPuzzles = [
          { seq: '1 ➔ 2 ➔ ? ➔ 4', missing: 3, d1: 5, d2: 2, text: '1, 2, ?, 4' },
          { seq: '3 ➔ 4 ➔ ? ➔ 6', missing: 5, d1: 7, d2: 4, text: '3, 4, ?, 6' },
          { seq: '6 ➔ 7 ➔ ? ➔ 9', missing: 8, d1: 10, d2: 7, text: '6, 7, ?, 9' },
          { seq: '7 ➔ 8 ➔ ? ➔ 10', missing: 9, d1: 6, d2: 10, text: '7, 8, ?, 10' },
          { seq: '2 ➔ 3 ➔ 4 ➔ ?', missing: 5, d1: 6, d2: 3, text: '2, 3, 4, ?' },
        ];
        const op = orderPuzzles[vIdx % orderPuzzles.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Mengurutkan bilangan berurutan dari 1 sampai 10.`,
          skill: 'urutan_bilangan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ayo lengkapi urutan angka: ${op.text}! Angka berapa yang hilang di tanda tanya?`,
          visual: op.seq,
          choices: [
            { label: String(op.missing), isCorrect: true },
            { label: String(op.d1), isCorrect: false },
            { label: String(op.d2), isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Angka ${op.missing} melengkapi urutan hitungan!`,
          feedbackIncorrect: `Hitung urut dari depan: 1, 2, 3, 4, 5...`,
        };
      } else if (slotIdx === 24) {
        // Topic 25: Teka-Teki Logika Angka
        const r = riddles[vIdx % riddles.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menerapkan pemahaman logika numerik sederhana pada situasi kehidupan.`,
          skill: 'penalaran_numerik',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: r.q,
          visual: '🧩 Teka-Teki Angka',
          choices: [
            { label: String(r.ans), isCorrect: true },
            { label: String(r.d1), isCorrect: false },
            { label: String(r.d2), isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali Kak Reza! Jawaban cerdas superhero!`,
          feedbackIncorrect: `Pikirkan baik-baik petunjuk di dalam pertanyaannya ya!`,
        };
      }

      variants.push(variant);
    }

    return {
      topic: topicName,
      variants,
    };
  });

  return {
    id: 1,
    name: 'Senin',
    title: 'Matematika Superhero',
    icon: '🔢',
    badge: 'Bilangan & Numerasi',
    desc: 'Bilangan, korespondensi satu-ke-satu, pola, penjumlahan, pengurangan konkret, dan penalaran numerik.',
    questions,
  };
}
