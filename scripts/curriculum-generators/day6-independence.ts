export function generateDay6Independence() {
  const topics = [
    'Kebersihan Tangan',
    'Kesehatan Gigi',
    'Tanggung Jawab Mainan',
    'Kemandirian Sepatu',
    'Cinta Kebersihan',
    'Kata Ajaib: Tolong',
    'Kata Ajaib: Terima Kasih',
    'Kata Ajaib: Maaf',
    'Makanan Sehat',
    'Minuman Sehat',
    'Tidur Tepat Waktu',
    'Berbagi Mainan',
    'Keselamatan Jalan',
    'Berdoa Bersyukur',
    'Mental Juara Pantang Menyerah',
    'Merawat Tanaman',
    'Menyayangi Hewan',
    'Menjaga Kerapian Kamar',
    'Sabar Mengantre',
    'Bicara Sopan',
    'Mematikan Lampu',
    'Menutup Kran Air',
    'Mencium Tangan Orang Tua',
    'Senyum Menyapa Teman',
    'Menolong Teman Terjatuh',
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const varId = `d6_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

      let variant: any;

      if (slotIdx === 0) {
        // Topic 1: Kebersihan Tangan
        const reasons = [
          'sebelum menyentuh makanan', 'setelah asyik bermain di halaman', 'setelah memegang binatang peliharaan',
          'seusai buang air di toilet', 'sebelum tidur malam', 'setelah naik kendaraan umum',
        ];
        const r = reasons[vIdx % reasons.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan cuci tangan memakai sabun untuk membasmi kuman penyakit.`,
          skill: 'kebersihan_diri',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Apa yang harus Kak Reza lakukan ${r}?`,
          visual: '🧼 💧 🤲',
          choices: [
            { label: 'Cuci tangan pakai sabun dan air mengalir 🧼', isCorrect: true },
            { label: 'Mengusapkan tangan ke baju kotor 👕', isCorrect: false },
            { label: 'Membiarkannya saja tanpa cuci tangan ❌', isCorrect: false },
          ],
          feedbackCorrect: `Hebat pahlawan bersih! Sabun dan air mengalir membasmi kuman!`,
          feedbackIncorrect: `Selalu cuci tangan dengan sabun agar kuman tidak masuk ke tubuh!`,
        };
      } else if (slotIdx === 1) {
        // Topic 2: Kesehatan Gigi
        const times = ['pagi hari sesudah sarapan', 'malam hari sebelum tidur', 'setelah makan permen manis', 'setiap hari secara teratur'];
        const t = times[vIdx % times.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menjaga kesehatan gigi dan mulut dengan menggosok gigi teratur.`,
          skill: 'kebersihan_diri',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Agar gigi tetap kuat, putih bersih, dan tidak berlubang, apa yang dilakukan ${t}?`,
          visual: '🪥 🦷 ✨',
          choices: [
            { label: 'Menggosok gigi dengan pasta gigi anak 🪥', isCorrect: true },
            { label: 'Tidur tanpa gosok gigi 😴', isCorrect: false },
            { label: 'Makan es batu keras 🧊', isCorrect: false },
          ],
          feedbackCorrect: `Gigi putih cemerlang! Rajin menggosok gigi menjauhkan kuman berlubang!`,
          feedbackIncorrect: `Gosok gigi dua kali sehari agar gigi selalu bersih dan sehat!`,
        };
      } else if (slotIdx === 2) {
        // Topic 3: Tanggung Jawab Mainan
        const toys = ['balok susun', 'mobil-mobilan balap', 'puzzle bergambar', 'robot superhero', 'krayon mewarnai', 'boneka hewan'];
        const toy = toys[vIdx % toys.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menumbuhkan tanggung jawab merapikan kembali mainan setelah digunakan.`,
          skill: 'tanggung_jawab_diri',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Setelah selesai bermain ${toy}, sikap mandiri yang benar adalah?`,
          visual: '🧸 📦 ✨',
          choices: [
            { label: 'Merapikan dan menyimpan ke kotak mainan 📦', isCorrect: true },
            { label: 'Meninggalkannya berantakan di lantai ❌', isCorrect: false },
            { label: 'Melemparkannya ke bawah kasur 🛏️', isCorrect: false },
          ],
          feedbackCorrect: `Keren sekali pahlawan tertib! Kamar rapi membuat hati senang!`,
          feedbackIncorrect: `Anak mandiri selalu merapikan kembali mainannya sendiri!`,
        };
      } else if (slotIdx === 3) {
        // Topic 4: Kemandirian Sepatu
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Melatih kemandirian memakai dan melepas sepatu sendiri.`,
          skill: 'kemandirian_motorik',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Saat hendak berangkat sekolah atau tiba di rumah, sikap anak superhero terhadap sepatunya adalah?`,
          visual: '👟 🚪 👞',
          choices: [
            { label: 'Mencoba memakai dan melepas sendiri lalu menaruh di rak 👟', isCorrect: true },
            { label: 'Menangis meminta dipakaikan terus 😢', isCorrect: false },
            { label: 'Menendang sepatu ke sembarang tempat ❌', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa mandiri! Kak Reza bisa memakai dan menata sepatu sendiri di rak!`,
          feedbackIncorrect: `Anak hebat belajar mandiri memakai dan menaruh sepatu di rak!`,
        };
      } else if (slotIdx === 4) {
        // Topic 5: Cinta Kebersihan
        const trash = ['bungkus biskuit', 'kulit pisang', 'kertas bekas', 'botol plastik kosong', 'tisu kotor'];
        const tr = trash[vIdx % trash.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan membuang sampah pada tempat sampah untuk kebersihan lingkungan.`,
          skill: 'kebiasaan_peduli_lingkungan',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Ketika Kak Reza selesai makan dan memegang ${tr}, ke mana harus dibuang?`,
          visual: '🗑️ ♻️ 🌿',
          choices: [
            { label: 'Membuang ke dalam tong sampah 🗑️', isCorrect: true },
            { label: 'Membuang ke lantai atau selokan 🚯', isCorrect: false },
            { label: 'Menyelipkannya di sela kursi 🛋️', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Membuang sampah pada tempatnya menjaga bumi tetap asri!`,
          feedbackIncorrect: `Selalu masukkan sampah ke tempat sampah ya, pahlawan cilik!`,
        };
      } else if (slotIdx === 5) {
        // Topic 6: Kata Ajaib: Tolong
        const helpNeeds = ['mengambil buku di rak tinggi', 'membuka toples biskuit yang erat', 'mencari mainan yang terselip', 'merapikan balok yang berat'];
        const hn = helpNeeds[vIdx % helpNeeds.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan mengucapkan kata 'Tolong' saat membutuhkan bantuan orang lain.`,
          skill: 'tiga_kata_ajaib',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Saat Kak Reza membutuhkan bantuan ayah atau ibu untuk ${hn}, kata santun apakah yang diucapkan?`,
          visual: '🤝 🗣️ ✨',
          choices: [
            { label: '"Tolong bantu saya ya..." 🤝', isCorrect: true },
            { label: 'Berteriak menyuruh dengan keras 📢', isCorrect: false },
            { label: 'Menangis merajuk di lantai 😭', isCorrect: false },
          ],
          feedbackCorrect: `Santun sekali! Kata 'Tolong' adalah kunci keajaiban minta bantuan!`,
          feedbackIncorrect: `Ucapkan kata 'Tolong' dengan nada yang lembut dan sopan ya!`,
        };
      } else if (slotIdx === 6) {
        // Topic 7: Kata Ajaib: Terima Kasih
        const situations = ['diberi hadiah kado ulang tahun', 'dibantu ayah memasang roda sepeda', 'diberi segelas susu oleh ibu', 'dipinjamkan krayon oleh teman'];
        const sit = situations[vIdx % situations.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan mengucapkan kata 'Terima Kasih' sebagai wujud apresiasi dan budi pekerti.`,
          skill: 'tiga_kata_ajaib',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Setelah ${sit}, ucapan apa yang Kak Reza katakan sambil tersenyum?`,
          visual: '🎁 😃 🙏',
          choices: [
            { label: '"Terima Kasih banyak!" 🙏', isCorrect: true },
            { label: 'Langsung pergi tanpa bicara 🏃', isCorrect: false },
            { label: 'Cemberut tidak peduli 😐', isCorrect: false },
          ],
          feedbackCorrect: `Hebat berkarakter! Kata 'Terima Kasih' membuat hati semua orang gembira!`,
          feedbackIncorrect: `Jangan lupa selalu mengucapkan 'Terima Kasih' saat menerima kebaikan!`,
        };
      } else if (slotIdx === 7) {
        // Topic 8: Kata Ajaib: Maaf
        const mistakes = ['tidak sengaja menyenggol balok teman', 'tidak sengaja menginjak kaki teman', 'tidak sengaja menumpahkan sedikit air', 'terlambat datang'];
        const mis = mistakes[vIdx % mistakes.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan mengakui kesalahan dan meminta 'Maaf' secara tulus.`,
          skill: 'tiga_kata_ajaib',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Jika Kak Reza ${mis}, apa yang harus segera dikatakan?`,
          visual: '🙏 💖 😊',
          choices: [
            { label: '"Maafkan saya, saya tidak sengaja." 🙏', isCorrect: true },
            { label: 'Menyalahkan orang lain ❌', isCorrect: false },
            { label: 'Pura-pura tidak tahu dan kabur 🏃', isCorrect: false },
          ],
          feedbackCorrect: `Pahlawan sejati berjiwa besar! Meminta 'Maaf' adalah tanda anak pemberani!`,
          feedbackIncorrect: `Meminta maaf dengan tulus menyelesaikan masalah dan menjaga pertemanan!`,
        };
      } else if (slotIdx === 8) {
        // Topic 9: Makanan Sehat
        const healthyFoods = ['Sayur bayam dan wortel bergizi 🥗', 'Buah apel dan pisang segar 🍎', 'Telur rebus dan tempe 🥚', 'Ikan bakar segar bernutrisi 🐟'];
        const hf = healthyFoods[vIdx % healthyFoods.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Memilih makanan bergizi seimbang untuk pertumbuhan tubuh yang optimal.`,
          skill: 'nutrisi_dan_kesehatan',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Agar Kak Reza tumbuh tinggi, pintar, dan berenergi, makanan manakah yang baik dimakan?`,
          visual: '🥗 🍎 🥦',
          choices: [
            { label: hf, isCorrect: true },
            { label: 'Permen manis yang banyak berlebihan 🍬', isCorrect: false },
            { label: 'Camilan asin ber-MSG terus menerus 🍟', isCorrect: false },
          ],
          feedbackCorrect: `Pilihan cerdas! Sayur, buah, dan lauk bergizi membuat tubuh sehat kuat!`,
          feedbackIncorrect: `Pilihlah makanan alami kaya serat, vitamin, dan protein ya!`,
        };
      } else if (slotIdx === 9) {
        // Topic 10: Minuman Sehat
        const drinks = ['Air putih matang yang jernih 🥛', 'Susu segar kaya kalsium 🥛', 'Jus buah murni tanpa gula berlebih 🥤'];
        const drk = drinks[vIdx % drinks.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Memilih minuman sehat alami untuk menjaga hidrasi dan kebugaran organ tubuh.`,
          skill: 'nutrisi_dan_kesehatan',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Minuman terbaik untuk menghilangkan haus dan menjaga tubuh tetap bugar adalah?`,
          visual: '🥛 💧 ✨',
          choices: [
            { label: drk, isCorrect: true },
            { label: 'Minuman soda bersoda manis 🥤', isCorrect: false },
            { label: 'Kopi hitam pahit ☕', isCorrect: false },
          ],
          feedbackCorrect: `Segar dan menyehatkan! Air putih dan susu adalah teman terbaik tubuh kita!`,
          feedbackIncorrect: `Air putih matang adalah minuman paling sehat untuk anak-anak!`,
        };
      } else if (slotIdx === 10) {
        // Topic 11: Tidur Tepat Waktu
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Memahami pentingnya tidur malam teratur dan tepat waktu untuk regenerasi tubuh.`,
          skill: 'ritme_harian_dan_istirahat',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Ketika jarum jam menunjukkan pukul 8 malam, apa yang sebaiknya kita lakukan?`,
          visual: '⏰ 🛌 💤',
          choices: [
            { label: 'Gosok gigi, cuci kaki, dan tidur tepat waktu 🛏️', isCorrect: true },
            { label: 'Bermain gadget handphone sampai larut malam 📱', isCorrect: false },
            { label: 'Melompat-lompat di atas sofa 🛋️', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Tidur cukup membuat otak cerdas dan bangun pagi segar ceria!`,
          feedbackIncorrect: `Tidurlah tepat waktu agar tidak terlambat bangun dan badan tetap bugar!`,
        };
      } else if (slotIdx === 11) {
        // Topic 12: Berbagi Mainan
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menumbuhkan sikap sosial mau berbagi dan bermain bergantian bersama teman.`,
          skill: 'sosial_emosional_berbagi',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Ketika ada teman atau adik yang ingin ikut bermain bersama, sikap yang baik adalah?`,
          visual: '🤝 🧸 😃',
          choices: [
            { label: 'Mengajak bermain bersama dan bergantian 🤝', isCorrect: true },
            { label: 'Menyembunyikan mainan agar orang lain tidak bisa main ❌', isCorrect: false },
            { label: 'Mendorong teman menjauh 😢', isCorrect: false },
          ],
          feedbackCorrect: `Hati pahlawan mulia! Bermain bersama teman jauh lebih seru dan menyenangkan!`,
          feedbackIncorrect: `Berbagi mainan membuat kita memiliki banyak teman yang sayang pada kita!`,
        };
      } else if (slotIdx === 12) {
        // Topic 13: Keselamatan Jalan
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali aturan keselamatan saat menyeberang jalan raya (zebra cross & pegang tangan).`,
          skill: 'keselamatan_diri',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Saat hendak menyeberang jalan raya bersama orang tua, langkah yang aman adalah?`,
          visual: '🚦 🚶 🛑',
          choices: [
            { label: 'Memegang tangan orang tua dan menyeberang di zebra cross 🚦', isCorrect: true },
            { label: 'Berlari kencang menyeberang sendirian tanpa melihat ❌', isCorrect: false },
            { label: 'Bercanda dan bermain bola di tengah jalan ⚽', isCorrect: false },
          ],
          feedbackCorrect: `Pahlawan waspada! Selalu pegang tangan orang tua dan gunakan zebra cross!`,
          feedbackIncorrect: `Keselamatan nomor satu, jangan pernah berlari sembarangan di jalan raya!`,
        };
      } else if (slotIdx === 13) {
        // Topic 14: Berdoa Bersyukur
        const prayerMoments = ['sebelum makan', 'sebelum tidur malam', 'sebelum mulai belajar', 'saat bangun di pagi hari', 'sebelum bepergian'];
        const pm = prayerMoments[vIdx % prayerMoments.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan berdoa dan bersyukur kepada Tuhan atas nikmat hidup.`,
          skill: 'nilai_religius_bersyukur',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Kebiasaan baik yang dilakukan Kak Reza ${pm} adalah?`,
          visual: '🤲 ✨ 💖',
          choices: [
            { label: 'Berdoa dengan khusyuk dan bersyukur kepada Tuhan 🤲', isCorrect: true },
            { label: 'Mengeluh dan merajuk 😠', isCorrect: false },
            { label: 'Langsung berebut tanpa berdoa ❌', isCorrect: false },
          ],
          feedbackCorrect: `Anak saleh dan beriman! Berdoa membawa keberkahan dan ketenangan hati!`,
          feedbackIncorrect: `Awali setiap kegiatan baik dengan berdoa dan mengucap syukur!`,
        };
      } else if (slotIdx === 14) {
        // Topic 15: Mental Juara Pantang Menyerah
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membangun resiliensi (daya juang) dan growth mindset: pantang menyerah saat gagal.`,
          skill: 'resiliensi_mental_juara',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Menara balok yang Kak Reza susun tiba-tiba roboh. Apa respon superhero sejati?`,
          visual: '🧱 🏆 💪',
          choices: [
            { label: 'Tersenyum, belajar dari kegagalan, dan mencoba susun lagi! 🏆', isCorrect: true },
            { label: 'Menangis keras dan melempar balok-balok itu 😭', isCorrect: false },
            { label: 'Menyerah dan tidak mau mencoba lagi selamanya ❌', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa tangguh! Kegagalan adalah awal keberhasilan jika kita pantang menyerah!`,
          feedbackIncorrect: `Pahlawan sejati tidak mudah putus asa, coba lagi sampai berhasil!`,
        };
      } else if (slotIdx === 15) {
        // Topic 16: Merawat Tanaman
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menumbuhkan kepedulian terhadap lingkungan hidup melalui merawat tanaman.`,
          skill: 'peduli_alam_sekitar',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Agar bunga di teras rumah tumbuh subur, mekar indah, dan tidak layu, apa yang dilakukan?`,
          visual: '🌻 🪴 💧',
          choices: [
            { label: 'Menyiram air secukupnya secara rutin setiap sore 💧', isCorrect: true },
            { label: 'Mencabuti daun dan bunganya sampai habis 🥀', isCorrect: false },
            { label: 'Menaruhnya di tempat gelap tanpa sinar matahari ❌', isCorrect: false },
          ],
          feedbackCorrect: `Tangan hijau penyayang alam! Tanaman tumbuh mekar jika disiram rutin!`,
          feedbackIncorrect: `Tanaman adalah makhluk hidup yang butuh air dan sinar matahari!`,
        };
      } else if (slotIdx === 16) {
        // Topic 17: Menyayangi Hewan
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menumbuhkan kasih sayang terhadap makhluk hidup hewan peliharaan.`,
          skill: 'kasih_sayang_makhluk_hidup',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Bagaimana sikap kita saat melihat kucing atau kelinci peliharaan yang lapar?`,
          visual: '🐱 🐰 💖',
          choices: [
            { label: 'Memberinya makan dan mengelusnya dengan lembut 🐱', isCorrect: true },
            { label: 'Mengganggunya dengan melempar batu ❌', isCorrect: false },
            { label: 'Menarik ekornya hingga kesakitan 😢', isCorrect: false },
          ],
          feedbackCorrect: `Hati penuh welas asih! Menyayangi hewan ciptaan Tuhan adalah perbuatan mulia!`,
          feedbackIncorrect: `Sayangilah hewan, berikan makanan dan jangan pernah menyakitinya!`,
        };
      } else if (slotIdx === 17) {
        // Topic 18: Menjaga Kerapian Kamar
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan merapikan tempat tidur sendiri setelah bangun pagi.`,
          skill: 'kemandirian_rutinitas',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Begitu Kak Reza bangun tidur di pagi hari yang cerah, tindakan mandiri apa yang dilakukan?`,
          visual: '🛏️ ☀️ ✨',
          choices: [
            { label: 'Merapikan selimut dan menata bantal di kasur 🛏️', isCorrect: true },
            { label: 'Langsung pergi meninggalkan kasur berantakan ❌', isCorrect: false },
            { label: 'Melempar bantal ke lantai kamar 🛌', isCorrect: false },
          ],
          feedbackCorrect: `Pahlawan disiplin! Tempat tidur yang rapi tanda anak yang bertanggung jawab!`,
          feedbackIncorrect: `Lipat selimut dan tata bantalmu sendiri setelah bangun pagi ya!`,
        };
      } else if (slotIdx === 18) {
        // Topic 19: Sabar Mengantre
        const queueScenes = ['menaiki ayunan di taman', 'mencuci tangan di wastafel sekolah', 'membeli tiket kebun binatang', 'mengambil makanan bergizi'];
        const qs = queueScenes[vIdx % queueScenes.length];
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Melatih kesabaran dan budaya tertib mengantre menunggu giliran.`,
          skill: 'disiplin_sosial_mengantre',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Saat giliran banyak anak sedang ${qs}, sikap anak yang hebat adalah?`,
          visual: '🚶 🚶 🚶 🎡',
          choices: [
            { label: 'Berdiri sabar mengantre menunggu giliran tiba 🚶', isCorrect: true },
            { label: 'Menyerobot antrean di depan teman 😠', isCorrect: false },
            { label: 'Mendorong teman agar bisa maju duluan ❌', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa beradab! Mengantre dengan sabar adalah tanda anak berpendidikan tinggi!`,
          feedbackIncorrect: `Budayakan antre, semua anak akan mendapat giliran secara adil!`,
        };
      } else if (slotIdx === 19) {
        // Topic 20: Bicara Sopan
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan berbicara dengan tutur kata santun, lembut, dan tidak berteriak.`,
          skill: 'tutur_kata_santun',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Ketika berbicara kepada guru, orang tua, maupun teman, nada bicara yang baik adalah?`,
          visual: '🗣️ 💬 ✨',
          choices: [
            { label: 'Berbicara sopan, ramah, dan tidak berteriak-teriak 😊', isCorrect: true },
            { label: 'Berteriak keras di depan wajah orang 📢', isCorrect: false },
            { label: 'Menggunakan kata-kata kasar atau mengejek ❌', isCorrect: false },
          ],
          feedbackCorrect: `Bahasa santun cerminan jiwa! Tutur kata lembut disukai oleh semua orang!`,
          feedbackIncorrect: `Gunakan kata-kata yang baik dan nada suara yang santun ya!`,
        };
      } else if (slotIdx === 20) {
        // Topic 21: Mematikan Lampu
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan hemat energi dengan mematikan lampu saat ruangan tidak digunakan / siang hari.`,
          skill: 'hemat_energi',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Saat matahari siang bersinar terang dan kita keluar kamar, apa yang dilakukan pada saklar lampu?`,
          visual: '💡 🔲 ☀️',
          choices: [
            { label: 'Mematikan lampu untuk menghemat listrik 💡', isCorrect: true },
            { label: 'Membiarkan semua lampu menyala seharian ❌', isCorrect: false },
            { label: 'Menyalakan semua alat elektronik yang tidak dipakai 📺', isCorrect: false },
          ],
          feedbackCorrect: `Superhero hemat energi! Mematikan lampu yang tidak dipakai menjaga bumi kita!`,
          feedbackIncorrect: `Hemat listrik dengan selalu mematikan lampu saat tidak digunakan!`,
        };
      } else if (slotIdx === 21) {
        // Topic 22: Menutup Kran Air
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Membiasakan menutup rapat kran air agar tidak terjadi pemborosan air bersih.`,
          skill: 'hemat_air_bersih',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Setelah selesai mencuci tangan atau ember sudah penuh, apa yang harus dilakukan pada kran air?`,
          visual: '🚰 💧 🛑',
          choices: [
            { label: 'Menutup kran air dengan rapat agar tidak menetes 🚰', isCorrect: true },
            { label: 'Membiarkan air meluap membasahi lantai 🌊', isCorrect: false },
            { label: 'Membuka kran lebih besar lagi ❌', isCorrect: false },
          ],
          feedbackCorrect: `Hebat pahlawan air! Setiap tetes air bersih sangat berharga bagi kehidupan!`,
          feedbackIncorrect: `Tutup kran air rapat-rapat setelah selesai digunakan ya!`,
        };
      } else if (slotIdx === 22) {
        // Topic 23: Mencium Tangan Orang Tua
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menunjukkan adab hormat kepada orang tua dengan salim/mencium tangan saat berpamitan.`,
          skill: 'hormat_orang_tua',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Saat hendak berangkat sekolah atau kembali ke rumah, adab terpuji kepada ayah dan ibu adalah?`,
          visual: '🧒 🤝 👵',
          choices: [
            { label: 'Mengucap salam dan mencium tangan orang tua dengan takzim 🙏', isCorrect: true },
            { label: 'Pergi begitu saja tanpa pamit 🏃', isCorrect: false },
            { label: 'Bermuka masam dan cemberut 😠', isCorrect: false },
          ],
          feedbackCorrect: `Anak berbakti kebanggaan keluarga! Doa orang tua mengiringi setiap langkah pahlawan!`,
          feedbackIncorrect: `Selalu berpamitan dan cium tangan ayah ibu saat hendak bepergian!`,
        };
      } else if (slotIdx === 23) {
        // Topic 24: Senyum Menyapa Teman
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Menebarkan keramahan sosial dengan tersenyum dan menyapa teman.`,
          skill: 'keramahan_sosial',
          cpElement: 'jati_diri',
          difficulty,
          prompt: `Saat berpapasan dengan teman di sekolah atau di taman, sambutan ramah apa yang kita berikan?`,
          visual: '😃 👋 🌸',
          choices: [
            { label: 'Tersenyum manis dan mengucapkan salam ramah "Halo teman!" 😃', isCorrect: true },
            { label: 'Melengos buang muka dengan sombong 😒', isCorrect: false },
            { label: 'Menatap dengan mata melotot marah 😠', isCorrect: false },
          ],
          feedbackCorrect: `Senyum pahlawan membahagiakan semua orang! Senyum adalah sedekah termudah!`,
          feedbackIncorrect: `Sambutlah kawan-kawanmu dengan senyuman ramah dan salam ceria!`,
        };
      } else {
        // Topic 25: Menolong Teman Terjatuh
        variant = {
          id: varId,
          categoryId: 6,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mempraktikkan empati nyata dengan menolong teman yang terjatuh atau tertimpa musibah.`,
          skill: 'empati_dan_tolong_menolong',
          cpElement: 'nilai_agama_dan_budi_pekerti',
          difficulty,
          prompt: `Di halaman bermain, Kak Reza melihat seorang teman terpeleset dan terjatuh. Tindakan pahlawan sejati adalah?`,
          visual: '🩹 🤝 💖',
          choices: [
            { label: 'Segera menghampiri, membantu berdiri, dan menanyakan keadaannya 🤝', isCorrect: true },
            { label: 'Menertawakan teman yang sedang kesakitan 😂', isCorrect: false },
            { label: 'Pura-pura tidak melihat dan asyik sendiri 🙈', isCorrect: false },
          ],
          feedbackCorrect: `Inilah pahlawan sejati yang sesungguhnya! Senang menolong dan berhati emas!`,
          feedbackIncorrect: `Segera tolong teman yang terjatuh, jangan pernah menertawakannya!`,
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
    id: 6,
    name: 'Sabtu',
    title: 'Kemandirian Superhero',
    icon: '🦸‍♂️',
    badge: 'Karakter & Jati Diri',
    desc: 'Rutinitas sehari-hari, kebersihan diri, keselamatan, pengenalan emosi, tanggung jawab, dan kebiasaan baik.',
    questions,
  };
}
