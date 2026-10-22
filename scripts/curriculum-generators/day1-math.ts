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
    'Bandingkan: Selisih Kuantitas',
    'Bandingkan: Paling Sedikit',
    'Geometri: Persegi Panjang',
    'Geometri 3D: Tabung Silinder',
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

  const rectObjects = [
    'Pintu Rumah 🚪', 'Penggaris Panjang 📏', 'Buku Cerita 📖', 'Layar Televisi 📺', 'Papan Tulis 📋',
    'Handphone Pintar 📱', 'Kotak Pensil 🗃️', 'Jendela Kamar 🪟', 'Uang Kertas 💵', 'Meja Belajar 🪑',
    'Kartu Nama 💳', 'Kasur Tidur 🛏️', 'Lemari Pakaian 🚪', 'Bus Sekolah 🚌', 'Laptop Komputer 💻',
    'Kalender Dinding 🗓️', 'Batu Bata 🧱', 'Papan Catur ♟️', 'Kotak Bekal 🍱', 'Amplop Surat ✉️',
    'Karpet Lantai 🧶', 'Pigura Foto 🖼️', 'Kotak Tisu 📦', 'Cermin Dinding 🪞', 'Kulkas Dua Pintu 🧊',
    'Bendera Berkibar 🚩', 'Cokelat Batang 🍫', 'Keset Kaki 🟫', 'Kartu Superhero 🃏', 'Buku Gambar 🎨',
  ];

  const cylinderObjects = [
    'Kaleng Biskuit 🥫', 'Kaleng Susu 🥛', 'Botol Minum 🍶', 'Gelas Kaca 🥛', 'Drum Musik 🥁',
    'Pipa Air 🚰', 'Baterai Senter 🔋', 'Lilin Ulang Tahun 🕯️', 'Celengan Kaleng 🪙', 'Batang Bambu 🎍',
    'Termos Air Panas 🫖', 'Teropong Bintang 🔭', 'Gulungan Tisu 🧻', 'Ember Cat 🪣', 'Toples Kue 🍪',
    'Kaleng Cat Semprot 🎨', 'Tiang Bendera 🚩', 'Tongkat Kasti 🏏', 'Botol Sampo 🧴', 'Kaleng Soda 🥤',
    'Vas Bunga Tabung 🏺', 'Terompet Bulat 🎺', 'Gilingan Kue 🥖', 'Silinder Gas 🎈', 'Botol Kecap 🍾',
    'Tabung Krayon 🖍️', 'Pensil Bulat ✏️', 'Tong Sampah Kaleng 🗑️', 'Cangkir Silinder ☕', 'Tabung Selam 🤿',
  ];

  const riddles = [
    { q: 'Aku berada tepat di antara angka 2 dan 4. Angka berapakah aku?', ans: 3, d1: 2, d2: 5 },
    { q: 'Aku adalah jumlah jari di satu tanganmu. Angka berapakah aku?', ans: 5, d1: 4, d2: 6 },
    { q: 'Aku adalah jumlah roda pada sepeda gowes roda dua. Berapakah aku?', ans: 2, d1: 3, d2: 4 },
    { q: 'Aku adalah jumlah sisi dan sudut pada bangun segitiga. Berapakah aku?', ans: 3, d1: 4, d2: 2 },
    { q: 'Jika Kak Reza punya 2 mata dan 2 telinga, berapa jumlah semuanya?', ans: 4, d1: 3, d2: 5 },
    { q: 'Aku adalah jumlah kaki pada kucing atau kelinci yang lucu. Berapakah aku?', ans: 4, d1: 2, d2: 6 },
    { q: 'Aku adalah angka sebelum angka 10 dalam urutan hitungan. Berapakah aku?', ans: 9, d1: 8, d2: 7 },
    { q: 'Aku adalah angka setelah angka 6 dan sebelum angka 8. Angka berapakah aku?', ans: 7, d1: 6, d2: 8 },
    { q: 'Kak Reza punya 3 permen lalu memakannya 1. Sisa permen Kak Reza sekarang adalah?', ans: 2, d1: 1, d2: 3 },
    { q: 'Aku adalah jumlah tangan pada robot superhero Kak Reza. Berapakah aku?', ans: 2, d1: 1, d2: 3 },
    { q: 'Aku adalah jumlah roda pada sebuah mobil balap. Berapakah aku?', ans: 4, d1: 3, d2: 5 },
    { q: 'Jika 1 ditambah dengan 0, berapakah hasilnya?', ans: 1, d1: 0, d2: 2 },
    { q: 'Berapa banyak kaki yang dimiliki ayam jago?', ans: 2, d1: 4, d2: 1 },
    { q: 'Aku adalah angka yang bentuknya seperti lingkaran telur tanpa sudut. Berapakah aku?', ans: 0, d1: 1, d2: 8 },
    { q: 'Jika kamu memiliki 3 balon lalu mendapat 3 balon lagi, ada berapa balonmu?', ans: 6, d1: 5, d2: 7 },
    { q: 'Aku adalah jumlah hari belajar aktif sekolah dari Senin sampai Jumat. Berapakah aku?', ans: 5, d1: 6, d2: 4 },
    { q: 'Ada 4 burung di dahan, 2 burung terbang. Berapa burung yang masih bertengger?', ans: 2, d1: 1, d2: 3 },
    { q: 'Aku adalah angka genap yang bernilai lebih besar dari 2 tapi lebih kecil dari 6. Siapakah aku?', ans: 4, d1: 3, d2: 5 },
    { q: 'Jika Kak Reza punya 5 bintang lalu diberi 2 bintang lagi, berapa total bintangnya?', ans: 7, d1: 6, d2: 8 },
    { q: 'Berapa banyak warna pada lampu lalu lintas (merah, kuning, hijau)?', ans: 3, d1: 2, d2: 4 },
    { q: 'Aku adalah angka ganjil antara 7 dan 11. Siapakah aku?', ans: 9, d1: 8, d2: 10 },
    { q: 'Kak Reza melompat 3 kali, lalu melompat lagi 1 kali. Berapa kali total lompatannya?', ans: 4, d1: 3, d2: 5 },
    { q: 'Berapa banyak tanduk cula pada kepala badak cula satu?', ans: 1, d1: 2, d2: 0 },
    { q: 'Jika kamu membagi 4 biskuit sama rata kepada 2 teman, masing-masing dapat berapa?', ans: 2, d1: 1, d2: 3 },
    { q: 'Aku adalah jumlah sayap pada seekor burung elang gagah. Berapakah aku?', ans: 2, d1: 4, d2: 1 },
    { q: 'Aku adalah angka yang jika ditambah 1 menghasilkan angka 6. Siapakah aku?', ans: 5, d1: 4, d2: 7 },
    { q: 'Berapakah jumlah roda pada gerobak dorong roda satu?', ans: 1, d1: 2, d2: 3 },
    { q: 'Kak Reza punya 8 krayon, 3 krayon dipinjam teman. Berapa krayon yang masih ada?', ans: 5, d1: 4, d2: 6 },
    { q: 'Aku adalah angka terkecil yang bernilai lebih besar dari nol. Siapakah aku?', ans: 1, d1: 2, d2: 0 },
    { q: 'Jika kamu memakai 2 sepatu di kaki dan 2 sarung tangan di tangan, berapa perlengkapan yang dipakai?', ans: 4, d1: 3, d2: 5 },
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const item = itemsPool[vIdx % itemsPool.length];
      const nextItem = itemsPool[(vIdx + 5) % itemsPool.length];
      const varId = `d1_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

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
          prompt: `Sentuh dan hitung: ada berapa banyak ${item.name} di bawah ini?`,
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
          prompt: `Ayo teliti! Sentuh satu per satu: ada berapa ${item.name}?`,
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
          prompt: `Misi #${vIdx + 1}: Bantu Kak Reza menemukan kelompok yang berisi persis ${targetNum} ${item.name}!`,
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
        // Topics 6-10: Penjumlahan Visual (1+1 s.d. 5+5)
        const config = [
          { a: 1, b: 1, sum: 2, label: '1 + 1' },
          { a: 2, b: 2, sum: 4, label: '2 + 2' },
          { a: 3, b: 2, sum: 5, label: '3 + 2' },
          { a: 4, b: 2, sum: 6, label: '4 + 2' },
          { a: 5, b: 5, sum: 10, label: '5 + 5' },
        ][slotIdx - 5];

        const aItems = Array(config.a).fill(item.emoji);
        const bItems = Array(config.b).fill(nextItem.emoji);
        const d1 = config.sum - 1;
        const d2 = config.sum + 1;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'visual_addition',
          learningGoal: `Menjumlahkan dua kelompok konkret: ${config.a} + ${config.b} = ${config.sum}.`,
          skill: 'penjumlahan_konkret',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kak Reza punya ${config.a} ${item.name}, lalu mendapat ${config.b} ${nextItem.name}. Berapa semuanya?`,
          visual: `${aItems.join(' ')}  ➕  ${bItems.join(' ')}`,
          choices: [
            { label: String(d1), isCorrect: false },
            { label: String(config.sum), isCorrect: true },
            { label: String(d2), isCorrect: false },
          ],
          feedbackCorrect: `Tepat! ${config.a} ditambah ${config.b} sama dengan ${config.sum}!`,
          feedbackIncorrect: `Gabungkan kedua kelompok benda lalu hitung seluruhnya!`,
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
          choices: [
            { label: String(d1), isCorrect: false },
            { label: String(d2), isCorrect: false },
            { label: String(config.rem), isCorrect: true },
          ],
          feedbackCorrect: `Hebat! ${config.total} dikurang ${config.take} tersisa ${config.rem}!`,
          feedbackIncorrect: `Coret ${config.take} buah, lalu hitung yang belum dicoret ya!`,
        };
      } else if (slotIdx === 15) {
        // Topic 16: Soal Cerita Penjumlahan
        const a = (vIdx % 3) + 2; // 2, 3, 4
        const b = (vIdx % 2) + 1; // 1, 2
        const total = a + b;
        const d1 = total - 1;
        const d2 = total + 2;

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'story_problem',
          learningGoal: `Memahami cerita matematika penjumlahan kontekstual.`,
          skill: 'pemecahan_masalah_numerik',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Di keranjang ada ${a} ${item.name} ${item.emoji.repeat(a)}. Ibu menambahkan lagi ${b} ${nextItem.name} ${nextItem.emoji.repeat(b)}. Berapa jumlah seluruhnya sekarang?`,
          visual: `${item.emoji.repeat(a)} ➕ ${nextItem.emoji.repeat(b)}`,
          choices: [
            { label: `${total} buah`, isCorrect: true },
            { label: `${d1} buah`, isCorrect: false },
            { label: `${d2} buah`, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Totalnya adalah ${total} buah!`,
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
          type: 'story_problem',
          learningGoal: `Memahami cerita pengurangan kontekstual dan menghitung sisa.`,
          skill: 'pemecahan_masalah_numerik',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kak Reza mengumpulkan ${total} ${item.name} ${item.emoji.repeat(total)}. Diberikan kepada Lili ${taken} buah. Berapakah sisa ${item.name} Kak Reza sekarang?`,
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
          { seq: '2 ➔ 4 ➔ ? ➔ 8', missing: 6, d1: 5, d2: 7, text: 'Kelinci melompati batu' },
          { seq: '4 ➔ 6 ➔ ? ➔ 10', missing: 8, d1: 7, d2: 9, text: 'Mobil balap melaju di pos' },
          { seq: '2 ➔ ? ➔ 6 ➔ 8', missing: 4, d1: 3, d2: 5, text: 'Roket melewati stasiun' },
          { seq: '? ➔ 4 ➔ 6 ➔ 8', missing: 2, d1: 1, d2: 3, text: 'Langkah pertama di jalur genap' },
          { seq: '6 ➔ 8 ➔ ?', missing: 10, d1: 9, d2: 12, text: 'Lompatan dua langkah dari angka 8' },
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
          prompt: `Lompat angka genap tantangan #${vIdx + 1}: ${opt.text}! Berapakah angka pengganti tanda tanya (${opt.seq})?`,
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
          { seq: '1 ➔ 3 ➔ ? ➔ 7', missing: 5, d1: 4, d2: 6, text: 'Kupu-kupu terbang ke bunga' },
          { seq: '3 ➔ 5 ➔ ? ➔ 9', missing: 7, d1: 6, d2: 8, text: 'Kak Reza melompati angka ganjil' },
          { seq: '1 ➔ ? ➔ 5 ➔ 7', missing: 3, d1: 2, d2: 4, text: 'Batu ganjil di antara 1 dan 5' },
          { seq: '? ➔ 3 ➔ 5 ➔ 7', missing: 1, d1: 2, d2: 0, text: 'Angka ganjil pertama sebelum 3' },
          { seq: '5 ➔ 7 ➔ ?', missing: 9, d1: 8, d2: 10, text: 'Lompat 2 langkah dari angka 7' },
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
          prompt: `Jalur angka ganjil misi #${vIdx + 1}: ${opt.text}! Angka berapakah yang tepat untuk melengkapi ${opt.seq}?`,
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
          { seq: '5 ➔ 4 ➔ ? ➔ 2 ➔ 1', missing: 3, d1: 2, d2: 4, label: 'Hitung mundur roket' },
          { seq: '5 ➔ ? ➔ 3 ➔ 2 ➔ 1', missing: 4, d1: 3, d2: 5, label: 'Persiapan meluncur' },
          { seq: '5 ➔ 4 ➔ 3 ➔ ? ➔ 1', missing: 2, d1: 1, d2: 3, label: 'Mesin roket menyala' },
          { seq: '? ➔ 4 ➔ 3 ➔ 2 ➔ 1', missing: 5, d1: 6, d2: 4, label: 'Awal peluncuran antariksa' },
          { seq: '4 ➔ 3 ➔ 2 ➔ ?', missing: 1, d1: 0, d2: 2, label: 'Detik terakhir peluncuran' },
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
          prompt: `Misi Antariksa #${vIdx + 1}: ${opt.label}! Angka berapa yang hilang dalam urutan hitung mundur ${opt.seq}?`,
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
        // Topic 21: Bandingkan Selisih Kuantitas
        const countA = (vIdx % 3) + 4; // 4, 5, 6
        const countB = (vIdx % 2) + 2; // 2, 3
        const plateA = Array(countA).fill(item.emoji);
        const plateB = Array(countB).fill(nextItem.emoji);

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
          prompt: `Piring manakah yang berisi ${item.name} LEBIH BANYAK?`,
          choices: [
            { label: `Piring A (${countA} ${item.name})`, visual: plateA.join(' '), isCorrect: true },
            { label: `Piring B (${countB} ${nextItem.name})`, visual: plateB.join(' '), isCorrect: false },
          ],
          feedbackCorrect: `Benar! ${countA} lebih banyak daripada ${countB}!`,
          feedbackIncorrect: `Hitung jumlah benda di masing-masing piring ya!`,
        };
      } else if (slotIdx === 21) {
        // Topic 22: Bandingkan Paling Sedikit
        const countA = (vIdx % 3) + 2; // 2, 3, 4
        const countB = countA + 3; // 5, 6, 7
        const plateA = Array(countA).fill(item.emoji);
        const plateB = Array(countB).fill(nextItem.emoji);

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
          prompt: `Tantangan #${vIdx + 1}: Di antara kelompok ${countA} ${item.name} dan ${countB} ${nextItem.name}, manakah yang LEBIH SEDIKIT?`,
          choices: [
            { label: `Kelompok A (${countA} ${item.name})`, visual: plateA.join(' '), isCorrect: true },
            { label: `Kelompok B (${countB} ${nextItem.name})`, visual: plateB.join(' '), isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${countA} lebih sedikit daripada ${countB}!`,
          feedbackIncorrect: `Cari kelompok yang jumlah bendanya paling kecil ya!`,
        };
      } else if (slotIdx === 22) {
        // Topic 23: Geometri Persegi Panjang
        const rect = rectObjects[vIdx % rectObjects.length];
        const distractors = ['Roda Sepeda Bulat 🛞', 'Tenda Segitiga ⛺', 'Bola Sepak Bulat ⚽'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 1) % distractors.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk geometri persegi panjang pada benda nyata.`,
          skill: 'geometri_2d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Misi Bentuk #${vIdx + 1}: Manakah di antara benda berikut yang berbentuk PERSEGI PANJANG seperti ${rect.split(' ')[0]}?`,
          visual: '▭ Persegi Panjang',
          choices: [
            { label: rect, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: d2, isCorrect: false },
          ],
          feedbackCorrect: `Hebat! ${rect} berbentuk persegi panjang!`,
          feedbackIncorrect: `Persegi panjang memiliki dua sisi panjang dan dua sisi pendek.`,
        };
      } else if (slotIdx === 23) {
        // Topic 24: Geometri 3D Tabung Silinder
        const cyl = cylinderObjects[vIdx % cylinderObjects.length];
        const distractors = ['Kotak Kado Kubus 🎁', 'Bola Sepak Bulat ⚽', 'Piramida Segitiga 🔺'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 1) % distractors.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk ruang tabung silinder (lingkaran atas-bawah).`,
          skill: 'geometri_3d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Misi Ruang 3D #${vIdx + 1}: Benda manakah yang berbentuk TABUNG SILINDER seperti ${cyl.split(' ')[0]}?`,
          visual: '🛢️ Tabung Silinder',
          choices: [
            { label: cyl, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: d2, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${cyl} memiliki bentuk tabung!`,
          feedbackIncorrect: `Tabung memiliki alas dan tutup berbentuk lingkaran.`,
        };
      } else {
        // Topic 25: Teka-Teki Logika Angka
        const r = riddles[vIdx % riddles.length];

        variant = {
          id: varId,
          categoryId: 1,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Memecahkan teka-teki logika penalaran bilangan konkret.`,
          skill: 'penalaran_logika_angka',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Teka-teki Superhero #${vIdx + 1}: ${r.q}`,
          visual: '❓ 💡',
          choices: [
            { label: String(r.d1), isCorrect: false },
            { label: String(r.ans), isCorrect: true },
            { label: String(r.d2), isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa cerdas Kak Reza! Jawabannya benar ${r.ans}!`,
          feedbackIncorrect: `Pikirkan baik-baik ya, coba bayangkan bendanya!`,
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
    desc: 'Bilangan, korespondensi satu-ke-satu, pola urutan, penjumlahan, pengurangan konkret, dan penalaran numerik sederhana.',
    questions,
  };
}
