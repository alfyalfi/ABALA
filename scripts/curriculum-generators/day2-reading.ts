export function generateDay2Reading() {
  const topics = [
    'Huruf R (Nama Reza)',
    'Huruf E (Nama Reza)',
    'Huruf Z (Nama Reza)',
    'Huruf A (Nama Reza)',
    'Menyusun Huruf Nama REZA',
    'Vokal A',
    'Vokal I',
    'Vokal U',
    'Vokal E',
    'Vokal O',
    'Konsonan B',
    'Menyusun Kata BOLA',
    'Konsonan M',
    'Menyusun Kata MOBIL',
    'Konsonan T',
    'Menyusun Kata TOPI',
    'Konsonan S',
    'Menyusun Kata SUSU',
    'Konsonan R',
    'Menyusun Kata ROTI',
    'Suku Kata BO-LA',
    'Suku Kata MO-BIL',
    'Rima Kata Berima',
    'Ketukan Suku Kata',
    'Membaca Gambar Superhero',
  ];

  const rWords = [
    { word: 'Rusa', emoji: '🦌' }, { word: 'Roda', emoji: '🛞' }, { word: 'Roti', emoji: '🍞' },
    { word: 'Roket', emoji: '🚀' }, { word: 'Rumah', emoji: '🏠' }, { word: 'Rambutan', emoji: '🍇' },
    { word: 'Rumput', emoji: '🌱' }, { word: 'Rantai', emoji: '⛓️' }, { word: 'Ratu', emoji: '👑' },
    { word: 'Raket', emoji: '🏸' }, { word: 'Rawa', emoji: '🏞️' }, { word: 'Rambut', emoji: '💇' },
    { word: 'Ranting', emoji: '🪵' }, { word: 'Robot', emoji: '🤖' }, { word: 'Ransel', emoji: '🎒' },
    { word: 'Raja', emoji: '🤴' }, { word: 'Rel', emoji: '🛤️' }, { word: 'Rakit', emoji: '🛶' },
    { word: 'Ruang', emoji: '🚪' }, { word: 'Rona', emoji: '🌅' }, { word: 'Rempah', emoji: '🧂' },
    { word: 'Roda Sepeda', emoji: '🚲' }, { word: 'Rebung', emoji: '🎋' }, { word: 'Riak Air', emoji: '🌊' },
    { word: 'Rusa Cilik', emoji: '🦌' }, { word: 'Roti Bakar', emoji: '🍞' }, { word: 'Ranting Daun', emoji: '🌿' },
    { word: 'Roket Cepat', emoji: '🚀' }, { word: 'Rumah Idaman', emoji: '🏡' }, { word: 'Ransel Sekolah', emoji: '🎒' },
  ];

  // Child-friendly words only (No Enzim, no Evolusi)
  const eWords = [
    { word: 'Elang', emoji: '🦅' }, { word: 'Ember', emoji: '🪣' }, { word: 'Ekor', emoji: '🐒' },
    { word: 'Es Krim', emoji: '🍦' }, { word: 'Emas', emoji: '🪙' }, { word: 'Enam', emoji: '6️⃣' },
    { word: 'Empat', emoji: '4️⃣' }, { word: 'Engklek', emoji: '👧' }, { word: 'Egrang', emoji: '🪵' },
    { word: 'Entok', emoji: '🦆' }, { word: 'Embun', emoji: '💧' }, { word: 'Eskalator', emoji: '🪜' },
    { word: 'Elang Gagah', emoji: '🦅' }, { word: 'Ember Air', emoji: '🪣' }, { word: 'Emas Murni', emoji: '🪙' },
    { word: 'Es Lilin', emoji: '🍧' }, { word: 'Ekor Tupai', emoji: '🐿️' }, { word: 'Angka Enam', emoji: '6️⃣' },
    { word: 'Angka Empat', emoji: '4️⃣' }, { word: 'Main Engklek', emoji: '🏃' }, { word: 'Ekor Kucing', emoji: '🐱' },
    { word: 'Embun Pagi', emoji: '🌿' }, { word: 'Elang Terbang', emoji: '🦅' }, { word: 'Ember Cuci', emoji: '🪣' },
    { word: 'Es Buah', emoji: '🍨' }, { word: 'Ekor Merak', emoji: '🦚' }, { word: 'Emas Berkilau', emoji: '✨' },
    { word: 'Entok Lucu', emoji: '🦆' }, { word: 'Egrang Bambu', emoji: '🪵' }, { word: 'Ekor Kelinci', emoji: '🐰' },
  ];

  // Child-friendly words only (No Zygote, no Zirkonium)
  const zWords = [
    { word: 'Zebra', emoji: '🦓' }, { word: 'Zoo (Kebun Binatang)', emoji: '🦁' }, { word: 'Zamrud', emoji: '💎' },
    { word: 'Zaitun', emoji: '🫒' }, { word: 'Zig-zag', emoji: '⚡' }, { word: 'Zero (Nol)', emoji: '0️⃣' },
    { word: 'Zebra Cross', emoji: '🚶' }, { word: 'Zebra Belang', emoji: '🦓' }, { word: 'Batu Zamrud', emoji: '💎' },
    { word: 'Minyak Zaitun', emoji: '🫒' }, { word: 'Garis Zig-zag', emoji: '〰️' }, { word: 'Kandang Zoo', emoji: '🐘' },
    { word: 'Angka Zero', emoji: '0️⃣' }, { word: 'Zebra Cilik', emoji: '🦓' }, { word: 'Pohon Zaitun', emoji: '🌳' },
    { word: 'Kilau Zamrud', emoji: '✨' }, { word: 'Lompat Zig-zag', emoji: '🏃' }, { word: 'Jalan Zebra', emoji: '🦓' },
    { word: 'Jalur Zebra Cross', emoji: '🚸' }, { word: 'Zebra Berlari', emoji: '🦓' }, { word: 'Taman Zoo', emoji: '🦒' },
    { word: 'Buah Zaitun', emoji: '🫒' }, { word: 'Pola Zig-zag', emoji: '⚡' }, { word: 'Zebra Makan', emoji: '🌿' },
    { word: 'Koleksi Zamrud', emoji: '💎' }, { word: 'Zoo Safari', emoji: '🦁' }, { word: 'Skor Zero', emoji: '0️⃣' },
    { word: 'Zebra Minum', emoji: '🦓' }, { word: 'Daun Zaitun', emoji: '🍃' }, { word: 'Jejak Zebra', emoji: '🐾' },
  ];

  const aWords = [
    { word: 'Apel', emoji: '🍎' }, { word: 'Ayam', emoji: '🐔' }, { word: 'Air', emoji: '💧' },
    { word: 'Anggur', emoji: '🍇' }, { word: 'Api', emoji: '🔥' }, { word: 'Awan', emoji: '☁️' },
    { word: 'Anak', emoji: '🧒' }, { word: 'Alpukat', emoji: '🥑' }, { word: 'Ambulans', emoji: '🚑' },
    { word: 'Angin', emoji: '💨' }, { word: 'Ayunan', emoji: '🎠' }, { word: 'Angka', emoji: '🔢' },
    { word: 'Antariksa', emoji: '🚀' }, { word: 'Astronot', emoji: '👨‍🚀' }, { word: 'Akuarium', emoji: '🐠' },
    { word: 'Anjing', emoji: '🐶' }, { word: 'Angsa', emoji: '🦢' }, { word: 'Arloji', emoji: '⌚' },
    { word: 'Atap', emoji: '🏠' }, { word: 'Akar', emoji: '🌲' }, { word: 'Apel Merah', emoji: '🍎' },
    { word: 'Ayam Berkokok', emoji: '🐓' }, { word: 'Air Segar', emoji: '💧' }, { word: 'Awan Putih', emoji: '☁️' },
    { word: 'Anggur Manis', emoji: '🍇' }, { word: 'Api Unggun', emoji: '🏕️' }, { word: 'Angsa Putih', emoji: '🦢' },
    { word: 'Ayunan Taman', emoji: '🎡' }, { word: 'Alpukat Hijau', emoji: '🥑' }, { word: 'Astronot Cilik', emoji: '👨‍🚀' },
  ];

  const rhymingPairs = [
    { w1: 'Topi', w2: 'Kopi', d: 'Batu' },
    { w1: 'Kuda', w2: 'Muda', d: 'Ikan' },
    { w1: 'Bola', w2: 'Pola', d: 'Susu' },
    { w1: 'Baju', w2: 'Maju', d: 'Ayam' },
    { w1: 'Tari', w2: 'Jari', d: 'Roti' },
    { w1: 'Mata', w2: 'Bata', d: 'Meja' },
    { w1: 'Pipi', w2: 'Sapi', d: 'Mobil' },
    { w1: 'Gigi', w2: 'Pagi', d: 'Topi' },
    { w1: 'Buku', w2: 'Kuku', d: 'Daun' },
    { w1: 'Tali', w2: 'Gali', d: 'Piring' },
    { w1: 'Awan', w2: 'Kawan', d: 'Bintang' },
    { w1: 'Batu', w2: 'Satu', d: 'Gelas' },
    { w1: 'Pintu', w2: 'Tentu', d: 'Sendok' },
    { w1: 'Kucing', w2: 'Pusing', d: 'Bebek' },
    { w1: 'Bebek', w2: 'Robek', d: 'Kelinci' },
    { w1: 'Malam', w2: 'Dalam', d: 'Pagi' },
    { w1: 'Siang', w2: 'Riang', d: 'Sore' },
    { w1: 'Bunga', w2: 'Singa', d: 'Bulan' },
    { w1: 'Kaki', w2: 'Daki', d: 'Mata' },
    { w1: 'Lari', w2: 'Mari', d: 'Diam' },
    { w1: 'Bulan', w2: 'Kolam', d: 'Matahari' },
    { w1: 'Sendok', w2: 'Mangkok', d: 'Piring' },
    { w1: 'Sapu', w2: 'Lampu', d: 'Kipas' },
    { w1: 'Rusa', w2: 'Busa', d: 'Gajah' },
    { w1: 'Pita', w2: 'Kita', d: 'Baju' },
    { w1: 'Bolu', w2: 'Malu', d: 'Permen' },
    { w1: 'Teko', w2: 'Beko', d: 'Kulkas' },
    { w1: 'Duri', w2: 'Curi', d: 'Bunga' },
    { w1: 'Tenda', w2: 'Benda', d: 'Hutan' },
    { w1: 'Paku', w2: 'Saku', d: 'Palu' },
  ];

  const syllableWords = [
    { word: 'BO-LA', syllables: 2, label: '2 Ketukan' },
    { word: 'MO-BIL', syllables: 2, label: '2 Ketukan' },
    { word: 'TO-PI', syllables: 2, label: '2 Ketukan' },
    { word: 'SU-SU', syllables: 2, label: '2 Ketukan' },
    { word: 'RO-TI', syllables: 2, label: '2 Ketukan' },
    { word: 'MA-TA', syllables: 2, label: '2 Ketukan' },
    { word: 'KU-DA', syllables: 2, label: '2 Ketukan' },
    { word: 'BU-KU', syllables: 2, label: '2 Ketukan' },
    { word: 'PE-SA-WAT', syllables: 3, label: '3 Ketukan' },
    { word: 'KE-LIN-CI', syllables: 3, label: '3 Ketukan' },
    { word: 'SE-PE-DA', syllables: 3, label: '3 Ketukan' },
    { word: 'SE-PA-TU', syllables: 3, label: '3 Ketukan' },
    { word: 'MA-TA-HA-RI', syllables: 4, label: '4 Ketukan' },
    { word: 'HE-LI-KOP-TER', syllables: 4, label: '4 Ketukan' },
    { word: 'KU-PU-KU-PU', syllables: 4, label: '4 Ketukan' },
    { word: 'KU-RA-KU-RA', syllables: 4, label: '4 Ketukan' },
    { word: 'BA-LON', syllables: 2, label: '2 Ketukan' },
    { word: 'SE-MANG-KA', syllables: 3, label: '3 Ketukan' },
    { word: 'STRO-BE-RI', syllables: 3, label: '3 Ketukan' },
    { word: 'JA-GUNG', syllables: 2, label: '2 Ketukan' },
    { word: 'RA-DI-O', syllables: 3, label: '3 Ketukan' },
    { word: 'TE-LE-VI-SI', syllables: 4, label: '4 Ketukan' },
    { word: 'A-YAM', syllables: 2, label: '2 Ketukan' },
    { word: 'BE-BEK', syllables: 2, label: '2 Ketukan' },
    { word: 'AM-BU-LANS', syllables: 3, label: '3 Ketukan' },
    { word: 'KER-E-TA', syllables: 3, label: '3 Ketukan' },
    { word: 'PA-YUNG', syllables: 2, label: '2 Ketukan' },
    { word: 'GU-RI-TA', syllables: 3, label: '3 Ketukan' },
    { word: 'CANG-KIR', syllables: 2, label: '2 Ketukan' },
    { word: 'SEN-DOK', syllables: 2, label: '2 Ketukan' },
  ];

  const rebusSentences = [
    { text: 'Kak Reza memakai 🧢 di kepala saat cuaca terik.', ans: 'Topi', emoji: '🧢', d1: 'Sepatu', d2: 'Baju' },
    { text: 'Kak Reza menendang ⚽ masuk ke gawang.', ans: 'Bola', emoji: '⚽', d1: 'Buku', d2: 'Topi' },
    { text: 'Kak Reza minum 🥛 hangat sebelum tidur.', ans: 'Susu', emoji: '🥛', d1: 'Sup', d2: 'Kopi' },
    { text: 'Kak Reza sarapan 🍞 manis yang lezat.', ans: 'Roti', emoji: '🍞', d1: 'Permen', d2: 'Batu' },
    { text: 'Kak Reza mengendarai 🚗 balap merah.', ans: 'Mobil', emoji: '🚗', d1: 'Perahu', d2: 'Sepeda' },
    { text: 'Kak Reza membaca 📖 cerita superhero seru.', ans: 'Buku', emoji: '📖', d1: 'Koran', d2: 'Piring' },
    { text: 'Kak Reza membawa 🛡️ pelindung superhero.', ans: 'Perisai', emoji: '🛡️', d1: 'Pedang', d2: 'Payung' },
    { text: 'Kak Reza melesat bersama 🚀 antariksa.', ans: 'Roket', emoji: '🚀', d1: 'Mobil', d2: 'Kereta' },
    { text: 'Kak Reza mengikat tali 👟 sebelum berolahraga.', ans: 'Sepatu', emoji: '👟', d1: 'Topi', d2: 'Kaus' },
    { text: 'Kak Reza memakai 🦹 jubah superhero gagah.', ans: 'Jubah', emoji: '🦹', d1: 'Celana', d2: 'Kaos' },
    { text: 'Kak Reza memakan buah 🍎 merah yang segar.', ans: 'Apel', emoji: '🍎', d1: 'Cabai', d2: 'Bawang' },
    { text: 'Kak Reza menyiram bunga 🌻 matahari kuning.', ans: 'Bunga', emoji: '🌻', d1: 'Daun', d2: 'Batu' },
    { text: 'Kak Reza bermain dengan kelinci 🐰 putih lucu.', ans: 'Kelinci', emoji: '🐰', d1: 'Kucing', d2: 'Ayam' },
    { text: 'Kak Reza mewarnai memakai 🖍️ krayon warna-warni.', ans: 'Krayon', emoji: '🖍️', d1: 'Penghapus', d2: 'Penggaris' },
    { text: 'Kak Reza melihat bebek 🦆 berenang di kolam.', ans: 'Bebek', emoji: '🦆', d1: 'Kambing', d2: 'Sapi' },
    { text: 'Kak Reza mendengar suara ayam 🐓 berkokok pagi.', ans: 'Ayam', emoji: '🐓', d1: 'Bebek', d2: 'Burung' },
    { text: 'Kak Reza memegang payung ☂️ saat hujan turun.', ans: 'Payung', emoji: '☂️', d1: 'Topi', d2: 'Jaket' },
    { text: 'Kak Reza menaruh pensil di kotak 🗃️ tempat pensil.', ans: 'Kotak', emoji: '🗃️', d1: 'Ember', d2: 'Gelas' },
    { text: 'Kak Reza melihat bintang ⭐ bersinar di langit.', ans: 'Bintang', emoji: '⭐', d1: 'Matahari', d2: 'Lampu' },
    { text: 'Kak Reza menyantap pisang 🍌 manis bernutrisi.', ans: 'Pisang', emoji: '🍌', d1: 'Jeruk', d2: 'Melon' },
    { text: 'Kak Reza meniup balon 🎈 merah pesta ulang tahun.', ans: 'Balon', emoji: '🎈', d1: 'Bola', d2: 'Gelembung' },
    { text: 'Kak Reza mengayuh sepeda 🚲 keliling taman.', ans: 'Sepeda', emoji: '🚲', d1: 'Mobil', d2: 'Kereta' },
    { text: 'Kak Reza membersihkan meja dengan kain 🧽 bersih.', ans: 'Spons', emoji: '🧽', d1: 'Sapu', d2: 'Sikat' },
    { text: 'Kak Reza mencuci tangan pakai sabun 🧼 wangi.', ans: 'Sabun', emoji: '🧼', d1: 'Sampo', d2: 'Pasta' },
    { text: 'Kak Reza menyikat gigi dengan sikat 🪥 gigi cilik.', ans: 'Sikat Gigi', emoji: '🪥', d1: 'Sisir', d2: 'Sendok' },
    { text: 'Kak Reza tidur nyenyak di atas kasur 🛏️ empuk.', ans: 'Kasur', emoji: '🛏️', d1: 'Meja', d2: 'Lantai' },
    { text: 'Kak Reza melihat kupu-kupu 🦋 terbang indah.', ans: 'Kupu-kupu', emoji: '🦋', d1: 'Burung', d2: 'Lebah' },
    { text: 'Kak Reza memasukkan bekal ke dalam tas 🎒 sekolah.', ans: 'Tas', emoji: '🎒', d1: 'Dompet', d2: 'Kantong' },
    { text: 'Kak Reza mengamati ikan 🐟 berenang lincah.', ans: 'Ikan', emoji: '🐟', d1: 'Katak', d2: 'Kura-kura' },
    { text: 'Kak Reza melihat pohon 🌲 rindang di depan rumah.', ans: 'Pohon', emoji: '🌲', d1: 'Bunga', d2: 'Rumput' },
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const varId = `d2_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty: 'mudah' | 'berkembang' | 'menantang' = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

      let variant: any;

      if (slotIdx === 0) {
        // Topic 1: Huruf R (Nama Reza)
        const rw = rWords[vIdx % rWords.length];
        const distractors = ['B', 'M', 'S', 'T', 'L'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 1) % distractors.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'phonics',
          learningGoal: `Mengenali huruf awal R dan bunyinya pada kata ${rw.word}.`,
          skill: 'pengenalan_huruf_fonik',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kata '${rw.word}' diawali oleh huruf apa ya?`,
          visual: `${rw.emoji} ${rw.word}`,
          choices: [
            { label: 'Huruf R (r)', isCorrect: true },
            { label: `Huruf ${d1}`, isCorrect: false },
            { label: `Huruf ${d2}`, isCorrect: false },
          ],
          feedbackCorrect: `Hebat Kak Reza! Huruf R mengawali nama Reza dan kata ${rw.word}!`,
          feedbackIncorrect: `Dengarkan bunyi 'Rrr'... huruf depannya adalah R!`,
        };
      } else if (slotIdx === 1) {
        // Topic 2: Huruf E (Nama Reza)
        const ew = eWords[vIdx % eWords.length];
        const distractors = ['A', 'I', 'U', 'O'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 1) % distractors.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'phonics',
          learningGoal: `Mengenali huruf vokal E pada kata ${ew.word}.`,
          skill: 'pengenalan_vokal',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Huruf vokal apakah ini dalam kata '${ew.word}'?`,
          visual: `${ew.emoji} ${ew.word}`,
          choices: [
            { label: `Huruf ${d1}`, isCorrect: false },
            { label: 'Huruf E (e)', isCorrect: true },
            { label: `Huruf ${d2}`, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Huruf E adalah vokal kedua pada nama R-E-Z-A!`,
          feedbackIncorrect: `Bunyinya 'Eh' atau 'E', lambangnya huruf E!`,
        };
      } else if (slotIdx === 2) {
        // Topic 3: Huruf Z (Nama Reza)
        const zw = zWords[vIdx % zWords.length];
        const distractors = ['S', 'N', 'X', 'C'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 1) % distractors.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'phonics',
          learningGoal: `Mengenali huruf Z yang unik zig-zag pada kata ${zw.word}.`,
          skill: 'pengenalan_konsonan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Huruf zig-zag di nama REZA dan kata '${zw.word}' adalah huruf apa?`,
          visual: `${zw.emoji} ${zw.word}`,
          choices: [
            { label: `Huruf ${d1}`, isCorrect: false },
            { label: `Huruf ${d2}`, isCorrect: false },
            { label: 'Huruf Z (z)', isCorrect: true },
          ],
          feedbackCorrect: `Keren! Huruf Z yang keren ada di nama Kak Reza dan kata ${zw.word}!`,
          feedbackIncorrect: `Bentuknya zig-zag bersudut, itu huruf Z!`,
        };
      } else if (slotIdx === 3) {
        // Topic 4: Huruf A (Nama Reza)
        const aw = aWords[vIdx % aWords.length];
        const distractors = ['O', 'U', 'I', 'E'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 1) % distractors.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'phonics',
          learningGoal: `Mengenali huruf penutup nama REZA yaitu huruf A pada kata ${aw.word}.`,
          skill: 'pengenalan_vokal',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kata '${aw.word}' diawali oleh huruf apa?`,
          visual: `${aw.emoji} ${aw.word}`,
          choices: [
            { label: 'Huruf A (a)', isCorrect: true },
            { label: `Huruf ${d1}`, isCorrect: false },
            { label: `Huruf ${d2}`, isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Huruf A mengawali kata ${aw.word} dan mengakhiri nama REZA!`,
          feedbackIncorrect: `Buka mulut dan ucapkan 'Aaah'... itu huruf A!`,
        };
      } else if (slotIdx === 4) {
        // Topic 5: Menyusun Huruf Nama REZA
        const distractorSets = [
          ['R', 'E', 'Z', 'A', 'K'],
          ['R', 'E', 'Z', 'A', 'M'],
          ['R', 'E', 'Z', 'A', 'B'],
          ['R', 'E', 'Z', 'A', 'T'],
          ['R', 'E', 'Z', 'A', 'S'],
        ];
        const letters = distractorSets[vIdx % distractorSets.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'word_builder',
          learningGoal: `Menyusun huruf-huruf menjadi nama lengkap superhero: R - E - Z - A.`,
          skill: 'menyusun_kata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ayo susun huruf-huruf ini menjadi nama pahlawan cilik: REZA!`,
          visual: '🦸 R - E - Z - A',
          wordLabel: 'REZA',
          targetWord: ['R', 'E', 'Z', 'A'],
          letterChoices: letters,
          choices: [
            { label: 'R - E - Z - A', isCorrect: true },
            { label: 'Z - E - R - A', isCorrect: false },
            { label: 'A - R - Z - E', isCorrect: false },
          ],
          feedbackCorrect: `Sempurna! Kamu berhasil menyusun nama pahlawan kita: R - E - Z - A!`,
          feedbackIncorrect: `Ingat urutannya: R dulu, lalu E, lalu Z, dan terakhir A!`,
        };
      } else if (slotIdx >= 5 && slotIdx <= 9) {
        // Topics 6-10: Vokal A, I, U, E, O
        const vowelIdx = slotIdx - 5;
        const vInfo = [
          { v: 'A', example: 'Apel 🍎', d1: 'I', d2: 'U' },
          { v: 'I', example: 'Ikan 🐟', d1: 'A', d2: 'O' },
          { v: 'U', example: 'Udang 🦐', d1: 'E', d2: 'A' },
          { v: 'E', example: 'Ember 🪣', d1: 'U', d2: 'I' },
          { v: 'O', example: 'Obor 🔥', d1: 'A', d2: 'E' },
        ][vowelIdx];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali huruf vokal ${vInfo.v} dalam kata ${vInfo.example}.`,
          skill: 'huruf_vokal',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Manakah huruf vokal ${vInfo.v} seperti pada kata '${vInfo.example}'?`,
          visual: vInfo.example,
          choices: [
            { label: `Huruf ${vInfo.d1}`, isCorrect: false },
            { label: `Huruf ${vInfo.v}`, isCorrect: true },
            { label: `Huruf ${vInfo.d2}`, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Huruf ${vInfo.v} adalah huruf vokal yang benar!`,
          feedbackIncorrect: `Dengarkan bunyi hurufnya ya, pilih huruf ${vInfo.v}!`,
        };
      } else if (slotIdx === 10 || slotIdx === 12 || slotIdx === 14 || slotIdx === 16 || slotIdx === 18) {
        // Topics 11, 13, 15, 17, 19: Konsonan B, M, T, S, R
        const cInfo = {
          10: { letter: 'B', ex: 'BOLA ⚽', words: ['Buku', 'Baju', 'Balon', 'Bintang', 'Bebek', 'Bunga'] },
          12: { letter: 'M', ex: 'MOBIL 🚗', words: ['Mata', 'Meja', 'Madu', 'Melon', 'Mangga', 'Melati'] },
          14: { letter: 'T', ex: 'TOPI 🧢', words: ['Tali', 'Tas', 'Tangan', 'Telur', 'Tenda', 'Tomat'] },
          16: { letter: 'S', ex: 'SUSU 🥛', words: ['Sapu', 'Sendok', 'Sepeda', 'Sepatu', 'Singa', 'Sikat'] },
          18: { letter: 'R', ex: 'ROTI 🍞', words: ['Roda', 'Rusa', 'Roket', 'Rumah', 'Robot', 'Raket'] },
        }[slotIdx]!;

        const w = cInfo.words[vIdx % cInfo.words.length];
        const distractors = ['K', 'P', 'D', 'N'].filter(x => x !== cInfo.letter);

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali huruf konsonan ${cInfo.letter} pada kata ${w}.`,
          skill: 'konsonan_dasar',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Huruf paling depan dari kata '${w}' adalah huruf apa?`,
          visual: `${cInfo.letter} ➔ ${w}`,
          choices: [
            { label: `Huruf ${cInfo.letter}`, isCorrect: true },
            { label: `Huruf ${distractors[0]}`, isCorrect: false },
            { label: `Huruf ${distractors[1]}`, isCorrect: false },
          ],
          feedbackCorrect: `Benar! Kata ${w} dimulai dengan huruf ${cInfo.letter}!`,
          feedbackIncorrect: `Perhatikan huruf paling depan dari kata ${w}!`,
        };
      } else if (slotIdx === 11 || slotIdx === 13 || slotIdx === 15 || slotIdx === 17 || slotIdx === 19) {
        // Topics 12, 14, 16, 18, 20: Menyusun Kata BOLA, MOBIL, TOPI, SUSU, ROTI
        const wInfo = {
          11: { word: 'BOLA', letters: ['B', 'O', 'L', 'A'], emoji: '⚽', wrong: ['B - A - L - O', 'L - O - B - A'] },
          13: { word: 'MOBIL', letters: ['M', 'O', 'B', 'I', 'L'], emoji: '🚗', wrong: ['M - I - B - O - L', 'B - O - M - I - L'] },
          15: { word: 'TOPI', letters: ['T', 'O', 'P', 'I'], emoji: '🧢', wrong: ['T - I - P - O', 'P - O - T - I'] },
          17: { word: 'SUSU', letters: ['S', 'U', 'S', 'U'], emoji: '🥛', wrong: ['S - S - U - U', 'U - S - U - S'] },
          19: { word: 'ROTI', letters: ['R', 'O', 'T', 'I'], emoji: '🍞', wrong: ['R - I - T - O', 'T - O - R - I'] },
        }[slotIdx]!;

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'word_builder',
          learningGoal: `Menyusun huruf-huruf menjadi kata benda bermakna: ${wInfo.word}.`,
          skill: 'menyusun_kata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ayo susun huruf-huruf ini membentuk kata '${wInfo.word}' (${wInfo.emoji})!`,
          visual: `${wInfo.emoji} ${wInfo.word}`,
          wordLabel: wInfo.word,
          targetWord: wInfo.letters,
          letterChoices: [...wInfo.letters, 'A', 'K'].slice(0, wInfo.letters.length + 1),
          choices: [
            { label: wInfo.letters.join(' - '), isCorrect: true },
            { label: wInfo.wrong[0], isCorrect: false },
            { label: wInfo.wrong[1], isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Kata ${wInfo.word} tersusun dengan tepat!`,
          feedbackIncorrect: `Perhatikan bunyi kata ${wInfo.word} dari suku kata awal hingga akhir!`,
        };
      } else if (slotIdx === 20) {
        // Topic 21: Suku Kata BO-LA
        const forms = [
          { q: 'Lengkapi suku kata: BO - ... agar jadi BOLA ⚽', ans: 'LA', d1: 'LI', d2: 'LU' },
          { q: 'Suku kata paling awal dari kata BOLA adalah?', ans: 'BO', d1: 'BA', d2: 'BU' },
          { q: 'Gabungkan potongan kata BO dan LA menjadi?', ans: 'BOLA', d1: 'BOLA-BOLA', d2: 'LABO' },
        ];
        const f = forms[vIdx % forms.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menggabungkan dan menganalisis suku kata BO-LA.`,
          skill: 'suku_kata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: f.q,
          visual: '⚽ BO - LA',
          choices: [
            { label: f.ans, isCorrect: true },
            { label: f.d1, isCorrect: false },
            { label: f.d2, isCorrect: false },
          ],
          feedbackCorrect: `Benar sekali! BO ditambah LA membentuk kata BOLA!`,
          feedbackIncorrect: `Ucapkan perlahan: BO... LA!`,
        };
      } else if (slotIdx === 21) {
        // Topic 22: Suku Kata MO-BIL
        const forms = [
          { q: 'Lengkapi suku kata: MO - ... agar jadi MOBIL 🚗', ans: 'BIL', d1: 'BAL', d2: 'BUL' },
          { q: 'Suku kata paling awal dari kata MOBIL adalah?', ans: 'MO', d1: 'MA', d2: 'MI' },
          { q: 'Gabungkan dua potongan: MO + BIL menjadi kata apa?', ans: 'MOBIL', d1: 'BILMO', d2: 'MOBILA' },
        ];
        const f = forms[vIdx % forms.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menggabungkan dan mengenali suku kata kata MO-BIL.`,
          skill: 'suku_kata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: f.q,
          visual: '🚗 MO - BIL',
          choices: [
            { label: f.d1, isCorrect: false },
            { label: f.ans, isCorrect: true },
            { label: f.d2, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! MO disambung BIL menghasilkan kata MOBIL!`,
          feedbackIncorrect: `Coba bunyikan bersama: MO... BIL!`,
        };
      } else if (slotIdx === 22) {
        // Topic 23: Rima Kata Berima
        const rp = rhymingPairs[vIdx % rhymingPairs.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali rima bunyi akhir yang selaras antara kata ${rp.w1} dan ${rp.w2}.`,
          skill: 'kesadaran_fonologis_rima',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kata manakah yang bunyinya berima sama dengan '${rp.w1}'?`,
          visual: `🎵 ${rp.w1} 🎶 ?`,
          choices: [
            { label: rp.w2, isCorrect: true },
            { label: rp.d, isCorrect: false },
            { label: 'Mobil', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Kata ${rp.w1} berima senada dengan kata ${rp.w2}!`,
          feedbackIncorrect: `Dengarkan bunyi akhirnya yang mirip, seperti bernyanyi!`,
        };
      } else if (slotIdx === 23) {
        // Topic 24: Ketukan Suku Kata
        const sw = syllableWords[vIdx % syllableWords.length];
        const d1 = sw.syllables === 2 ? '3 Ketukan' : '2 Ketukan';
        const d2 = sw.syllables === 4 ? '1 Ketukan' : '4 Ketukan';

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menghitung jumlah suku kata (ketukan tepuk tangan) pada kata ${sw.word}.`,
          skill: 'segmentasi_suku_kata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Tepuk tanganmu sambil membaca '${sw.word}'. Ada berapa ketukan?`,
          visual: `👏 ${sw.word}`,
          choices: [
            { label: sw.label, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: d2, isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Kata ${sw.word} diucapkan dengan ${sw.label}!`,
          feedbackIncorrect: `Coba tepuk tangan sekali untuk setiap potongan kata ya!`,
        };
      } else {
        // Topic 25: Membaca Gambar Superhero
        const reb = rebusSentences[vIdx % rebusSentences.length];

        variant = {
          id: varId,
          categoryId: 2,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membaca gambar simbolis dan memahami kalimat superhero secara kontekstual.`,
          skill: 'membaca_gambar_simbolis',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `${reb.text} Gambar apakah itu?`,
          visual: `${reb.emoji} ❓`,
          choices: [
            { label: reb.ans, isCorrect: true },
            { label: reb.d1, isCorrect: false },
            { label: reb.d2, isCorrect: false },
          ],
          feedbackCorrect: `Keren sekali Kak Reza! Lambang ${reb.emoji} adalah kata ${reb.ans}!`,
          feedbackIncorrect: `Perhatikan baik-baik gambar ${reb.emoji} dalam cerita tersebut!`,
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
    id: 2,
    name: 'Selasa',
    title: 'Membaca & Fonik',
    icon: '🔤',
    badge: 'Literasi & Fonik',
    desc: 'Bunyi bahasa, pengenalan huruf, hubungan huruf-bunyi, suku kata, kosakata, dan penyusunan kata sesuai kesiapan anak.',
    questions,
  };
}
