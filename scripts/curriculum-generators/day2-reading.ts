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
    { word: 'Raja', emoji: '🤴' }, { word: 'Rambut', emoji: '🧒' }, { word: 'Rel', emoji: '🛤️' },
    { word: 'Rambung', emoji: '🌿' }, { word: 'Ring', emoji: '💍' }, { word: 'Rakit', emoji: '🛶' },
    { word: 'Ruang', emoji: '🚪' }, { word: 'Rona', emoji: '🌅' }, { word: 'Rona', emoji: '🎨' },
    { word: 'Rempah', emoji: '🧂' }, { word: 'Roda', emoji: '🚲' }, { word: 'Rebung', emoji: '🎋' },
    { word: 'Rimpang', emoji: '🥔' }, { word: 'Riam', emoji: '🌊' }, { word: 'Rawa', emoji: '🌿' },
  ];

  const eWords = [
    { word: 'Elang', emoji: '🦅' }, { word: 'Ember', emoji: '🪣' }, { word: 'Ekor', emoji: '🐒' },
    { word: 'Es Krim', emoji: '🍦' }, { word: 'Emas', emoji: '🪙' }, { word: 'Enam', emoji: '6️⃣' },
    { word: 'Empat', emoji: '4️⃣' }, { word: 'Engklek', emoji: '👧' }, { word: 'Egrang', emoji: '🪵' },
    { word: 'Entok', emoji: '🦆' }, { word: 'Ebi', emoji: '🦐' }, { word: 'Eselon', emoji: '⭐' },
    { word: 'Estafet', emoji: '🏃' }, { word: 'Embun', emoji: '💧' }, { word: 'Eskalator', emoji: '🪜' },
    { word: 'Elpiji', emoji: '🔥' }, { word: 'Emping', emoji: '🍘' }, { word: 'Emu', emoji: '🦤' },
    { word: 'Enzim', emoji: '🧬' }, { word: 'Era', emoji: '⏳' }, { word: 'Eropa', emoji: '🗺️' },
    { word: 'Evolusi', emoji: '🌱' }, { word: 'Ekspres', emoji: '🚄' }, { word: 'Elastis', emoji: '🎈' },
    { word: 'Elemen', emoji: '🧩' }, { word: 'Elevator', emoji: '🛗' }, { word: 'Emosi', emoji: '😊' },
    { word: 'Empati', emoji: '💖' }, { word: 'Energi', emoji: '⚡' }, { word: 'Episode', emoji: '🎬' },
  ];

  const zWords = [
    { word: 'Zebra', emoji: '🦓' }, { word: 'Zirafah', emoji: '🦒' }, { word: 'Zamrud', emoji: '💎' },
    { word: 'Zaitun', emoji: '🫒' }, { word: 'Zig-zag', emoji: '⚡' }, { word: 'Zoo', emoji: '🦁' },
    { word: 'Zero', emoji: '0️⃣' }, { word: 'Zona', emoji: '🛑' }, { word: 'Zodiac', emoji: '✨' },
    { word: 'Ziarah', emoji: '🕌' }, { word: 'Zink', emoji: '⚙️' }, { word: 'Zat', emoji: '🧪' },
    { word: 'Zaman', emoji: '🕰️' }, { word: 'Zabur', emoji: '📖' }, { word: 'Zakat', emoji: '🪙' },
    { word: 'Zarafah', emoji: '🦒' }, { word: 'Zirah', emoji: '🛡️' }, { word: 'Ziter', emoji: '🎵' },
    { word: 'Zonasi', emoji: '📍' }, { word: 'Zuhur', emoji: '☀️' }, { word: 'Zirkonium', emoji: '🔮' },
    { word: 'Zoster', emoji: '🩹' }, { word: 'Zygote', emoji: '🌱' }, { word: 'Zeolit', emoji: '🪨' },
    { word: 'Zodiak', emoji: '🌌' }, { word: 'Zeni', emoji: '👷' }, { word: 'Zeppelin', emoji: '🎈' },
    { word: 'Zaman Batu', emoji: '🪨' }, { word: 'Zona Hijau', emoji: '🌲' }, { word: 'Zebra Cross', emoji: '🚶' },
  ];

  const aWords = [
    { word: 'Apel', emoji: '🍎' }, { word: 'Ayam', emoji: '🐔' }, { word: 'Air', emoji: '💧' },
    { word: 'Anggur', emoji: '🍇' }, { word: 'Api', emoji: '🔥' }, { word: 'Awan', emoji: '☁️' },
    { word: 'Acar', emoji: '🥒' }, { word: 'Anak', emoji: '🧒' }, { word: 'Alpukat', emoji: '🥑' },
    { word: 'Alat', emoji: '🔧' }, { word: 'Ambulans', emoji: '🚑' }, { word: 'Angin', emoji: '💨' },
    { word: 'Antena', emoji: '📡' }, { word: 'Arang', emoji: '🪵' }, { word: 'Ayunan', emoji: '🎠' },
    { word: 'Aki', emoji: '🔋' }, { word: 'Angka', emoji: '🔢' }, { word: 'Antariksa', emoji: '🚀' },
    { word: 'Astronot', emoji: '👨‍🚀' }, { word: 'Akuarium', emoji: '🐠' }, { word: 'Aman', emoji: '🛡️' },
    { word: 'Api Unggun', emoji: '🏕️' }, { word: 'Almari', emoji: '🚪' }, { word: 'Anjing', emoji: '🐶' },
    { word: 'Angsa', emoji: '🦢' }, { word: 'Arloji', emoji: '⌚' }, { word: 'Atlas', emoji: '🗺️' },
    { word: 'Atap', emoji: '🏠' }, { word: 'Asap', emoji: '🌫️' }, { word: 'Akar', emoji: '🌲' },
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
    { w1: 'Hutan', w2: 'Hujan', d: 'Langit' },
    { w1: 'Roti', w2: 'Peti', d: 'Garpu' },
    { w1: 'Kupu', w2: 'Kutu', d: 'Semut' },
    { w1: 'Pohon', w2: 'Mohon', d: 'Rumput' },
    { w1: 'Ikan', w2: 'Makan', d: 'Minum' },
    { w1: 'Ayam', w2: 'Bayam', d: 'Wortel' },
    { w1: 'Roda', w2: 'Goda', d: 'Rem' },
    { w1: 'Kaca', w2: 'Baca', d: 'Tulis' },
    { w1: 'Taman', w2: 'Nyaman', d: 'Kota' },
    { w1: 'Lari', w2: 'Mari', d: 'Diam' },
    { w1: 'Bulan', w2: 'Kolam', d: 'Matahari' },
    { w1: 'Sendok', w2: 'Mangkok', d: 'Piring' },
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
    { text: 'Kak Reza memakai 🧢 di kepala saat terik.', ans: 'Topi', emoji: '🧢', d1: 'Sepatu', d2: 'Baju' },
    { text: 'Kak Reza menendang ⚽ ke gawang lawan.', ans: 'Bola', emoji: '⚽', d1: 'Buku', d2: 'Topi' },
    { text: 'Kak Reza minum 🥛 hangat sebelum tidur.', ans: 'Susu', emoji: '🥛', d1: 'Sup', d2: 'Kopi' },
    { text: 'Kak Reza sarapan 🍞 rasa cokelat enak.', ans: 'Roti', emoji: '🍞', d1: 'Permen', d2: 'Batu' },
    { text: 'Kak Reza mengendarai 🚗 balap merah.', ans: 'Mobil', emoji: '🚗', d1: 'Perahu', d2: 'Sepeda' },
    { text: 'Kak Reza membaca 📖 cerita superhero seru.', ans: 'Buku', emoji: '📖', d1: 'Koran', d2: 'Piring' },
    { text: 'Kak Reza memegang 🛡️ pelindung ajaib.', ans: 'Perisai', emoji: '🛡️', d1: 'Pedang', d2: 'Payung' },
    { text: 'Kak Reza melesat terbang bersama 🚀 antariksa.', ans: 'Roket', emoji: '🚀', d1: 'Mobil', d2: 'Kereta' },
    { text: 'Kak Reza mengikat tali 👟 sebelum berlari.', ans: 'Sepatu', emoji: '👟', d1: 'Topi', d2: 'Kaus' },
    { text: 'Kak Reza memakai 🦹 jubah superhero gagah.', ans: 'Jubah', emoji: '🦹', d1: 'Celana', d2: 'Kaos' },
    { text: 'Kak Reza memakan buah 🍎 merah yang manis.', ans: 'Apel', emoji: '🍎', d1: 'Cabai', d2: 'Bawang' },
    { text: 'Kak Reza memetik bunga 🌻 matahari kuning.', ans: 'Bunga', emoji: '🌻', d1: 'Daun', d2: 'Batu' },
    { text: 'Kak Reza bermain 🪁 layang-layang di lapangan.', ans: 'Layang-layang', emoji: '🪁', d1: 'Balon', d2: 'Bola' },
    { text: 'Kak Reza melihat 🌙 bulan di langit malam.', ans: 'Bulan', emoji: '🌙', d1: 'Matahari', d2: 'Awan' },
    { text: 'Kak Reza mengelus 🐱 kucing yang bersuara meong.', ans: 'Kucing', emoji: '🐱', d1: 'Singa', d2: 'Ayam' },
    { text: 'Kak Reza memberi wortel segar pada 🐰 lucu.', ans: 'Kelinci', emoji: '🐰', d1: 'Bebek', d2: 'Kuda' },
    { text: 'Kak Reza mewarnai gambar dengan 🖍️ krayon.', ans: 'Krayon', emoji: '🖍️', d1: 'Sendok', d2: 'Garpu' },
    { text: 'Kak Reza memakai 👕 baju bersih berkerah.', ans: 'Baju', emoji: '👕', d1: 'Sepatu', d2: 'Topi' },
    { text: 'Kak Reza membawa 🎒 ransel perlengkapan belajar.', ans: 'Tas', emoji: '🎒', d1: 'Kotak', d2: 'Ember' },
    { text: 'Kak Reza mencuci tangan dengan 🧼 wangi.', ans: 'Sabun', emoji: '🧼', d1: 'Pasta', d2: 'Sampo' },
    { text: 'Kak Reza menyikat 🦷 dua kali sehari.', ans: 'Gigi', emoji: '🦷', d1: 'Kuku', d2: 'Rambut' },
    { text: 'Kak Reza membuka ☂️ payung saat rintik hujan.', ans: 'Payung', emoji: '☂️', d1: 'Topi', d2: 'Selimut' },
    { text: 'Kak Reza melihat 🌈 pelangi sehabis hujan.', ans: 'Pelangi', emoji: '🌈', d1: 'Petir', d2: 'Bintang' },
    { text: 'Kak Reza menyiram 🪴 tanaman di teras rumah.', ans: 'Tanaman', emoji: '🪴', d1: 'Lantai', d2: 'Dinding' },
    { text: 'Kak Reza mengayuh 🚲 sepeda mengelilingi taman.', ans: 'Sepeda', emoji: '🚲', d1: 'Mobil', d2: 'Pesawat' },
    { text: 'Kak Reza melihat ⏰ jam dinding berdetak.', ans: 'Jam', emoji: '⏰', d1: 'Kaca', d2: 'Pintu' },
    { text: 'Kak Reza makan 🥣 sup ayam hangat bergizi.', ans: 'Sup', emoji: '🥣', d1: 'Kue', d2: 'Es' },
    { text: 'Kak Reza meniup 🎈 balon pesta warna-warni.', ans: 'Balon', emoji: '🎈', d1: 'Bola', d2: 'Topi' },
    { text: 'Kak Reza melihat 🦆 bebek berenang riang.', ans: 'Bebek', emoji: '🦆', d1: 'Burung', d2: 'Ayam' },
    { text: 'Kak Reza mengibarkan 🚩 bendera superhero.', ans: 'Bendera', emoji: '🚩', d1: 'Kain', d2: 'Pita' },
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const varId = `d2_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

      let variant: any;

      if (slotIdx === 0) {
        // Topic 1: Huruf R (Nama Reza)
        const rw = rWords[vIdx % rWords.length];
        const distractors = ['B', 'M', 'S', 'T', 'K', 'L'];
        const d1 = distractors[vIdx % distractors.length];
        const d2 = distractors[(vIdx + 2) % distractors.length];

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
          prompt: `Fonik Superhero #${vIdx + 1}: Kata '${rw.word}' diawali oleh huruf apa? (${rw.emoji} ${rw.word})`,
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
          prompt: `Vokal Reza #${vIdx + 1}: Huruf apakah ini dalam kata '${ew.word}'? (${ew.emoji} ${ew.word})`,
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
          prompt: `Konsonan Ajaib #${vIdx + 1}: Huruf zig-zag yang ada di tengah nama REZA dan kata '${zw.word}' adalah?`,
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
          prompt: `Huruf Juara #${vIdx + 1}: Kata '${aw.word}' diawali oleh huruf apa? (${aw.emoji} ${aw.word})`,
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
          prompt: `Misi Nama Superhero #${vIdx + 1}: Susun huruf-huruf ini menjadi nama pahlawan cilik kita: REZA!`,
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
          prompt: `Tantangan Huruf Vokal #${vIdx + 1}: Manakah huruf vokal ${vInfo.v} seperti pada kata '${vInfo.example}'?`,
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
          prompt: `Konsonan Aktif #${vIdx + 1}: Huruf depan dari kata '${w}' (${cInfo.ex.split(' ')[1]}) adalah?`,
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
          prompt: `Word Builder Misi #${vIdx + 1}: Susun huruf-huruf ini membentuk kata '${wInfo.word}' (${wInfo.emoji})!`,
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
          { q: 'Lengkapi suku kata: BO - ...', ans: 'LA', d1: 'LI', d2: 'LU', text: 'agar menjadi kata BOLA ⚽' },
          { q: 'Suku kata awal dari kata BOLA adalah?', ans: 'BO', d1: 'BA', d2: 'BU', text: 'dengarkan bunyi depannya' },
          { q: 'Gabungkan suku kata BO dan LA menjadi kata apa?', ans: 'BOLA', d1: 'BOLA-BOLA', d2: 'LABO', text: 'benda bulat untuk ditendang' },
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
          prompt: `Suku Kata Tantangan #${vIdx + 1}: ${f.q} (${f.text})`,
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
          { q: 'Lengkapi suku kata: MO - ...', ans: 'BIL', d1: 'BAL', d2: 'BUL', text: 'agar menjadi kata MOBIL 🚗' },
          { q: 'Suku kata awal dari kata MOBIL adalah?', ans: 'MO', d1: 'MA', d2: 'MI', text: 'dengarkan bunyi pertamanya' },
          { q: 'Gabungkan dua potongan kata: MO + BIL menjadi kata?', ans: 'MOBIL', d1: 'BILMO', d2: 'MOBILA', text: 'kendaraan roda empat' },
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
          prompt: `Suku Kata Aksi #${vIdx + 1}: ${f.q} (${f.text})`,
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
          prompt: `Rima Bersahabat #${vIdx + 1}: Kata manakah yang memiliki bunyi rima sama dengan '${rp.w1}'?`,
          visual: `🎵 ${rp.w1} 🎶 ?`,
          choices: [
            { label: rp.w2, isCorrect: true },
            { label: rp.d, isCorrect: false },
            { label: 'Mobil', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Kata ${rp.w1} berima senada dengan kata ${rp.w2}!`,
          feedbackIncorrect: `Dengarkan bunyi akhirnya yang mirip, seperti berdendang!`,
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
          prompt: `Tepuk Ketukan #${vIdx + 1}: Tepuk tanganmu sambil membaca '${sw.word}'. Ada berapa ketukan suku kata?`,
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
          prompt: `Membaca Bergambar #${vIdx + 1}: ${reb.text} Gambar apakah itu?`,
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
