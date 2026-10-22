export function generateDay5Spatial() {
  const topics = [
    'Bentuk Lingkaran',
    'Bentuk Persegi',
    'Bentuk Segitiga',
    'Bentuk Bintang Emas',
    'Bentuk Hati Kasih Sayang',
    'Benda Mirip Lingkaran',
    'Benda Mirip Kotak',
    'Benda Mirip Segitiga',
    'Pola Warna Merah-Biru',
    'Pola Warna Kuning-Hijau',
    'Pola Benda Mobil-Bola',
    'Pola Benda Bintang-Bulan',
    'Pola Ukuran Besar-Kecil',
    'Paling Besar',
    'Paling Kecil',
    'Paling Tinggi',
    'Paling Panjang',
    'Posisi Di Atas',
    'Posisi Di Bawah',
    'Posisi Di Dalam',
    'Posisi Di Luar',
    'Posisi Di Belakang',
    'Jarak Sangat Jauh',
    'Jarak Dekat',
    'Arah Melangkah Maju',
  ];

  const circleObjects = [
    'Roda Sepeda 🛞', 'Piring Makan 🍽️', 'Koin Logam 🪙', 'Donat Cokelat 🍩', 'Jam Dinding Bulat ⏰',
    'Kancing Baju 🔘', 'Tutup Panci 🥘', 'Bola Sepak ⚽', 'Jeruk Manis 🍊', 'Biskuit Bulat 🍪',
    'Cermin Bulat 🪞', 'Wajan Bulat 🍳', 'Gasing Kayu 🪀', 'Ban Mobil 🛞', 'Pizza Bulat Utuh 🍕',
    'Semangka Bulat 🍉', 'Kue Tart Bulat 🎂', 'Lensa Kaca Pembesar 🔍', 'Roda Gerobak 🛒', 'Cincin Emas 💍',
    'Bulan Purnama 🌕', 'Matahari Bulat ☀️', 'Tatakan Gelas ☕', 'Permen Lolipop Bulat 🍭', 'Pancake Bulat 🥞',
    'Kendang Rebana 🪘', 'Pelampung Bulat 🛟', 'Tamborin Musik 🥁', 'Kompas Arah 🧭', 'Lampu Bohlam Bulat 💡',
  ];

  const squareObjects = [
    'Bingkai Foto 🖼️', 'Kotak Kado 🎁', 'Ubin Lantai ⬛', 'Dadu Mainan 🎲', 'Buku Cerita Kotak 📖',
    'Bantal Sofa Kotak 🛋️', 'Roti Tawar Kotak 🍞', 'Jendela Kamar Kotak 🪟', 'Meja Tamu Kotak 🪑', 'Kotak Tisu 📦',
    'Saputangan Kotak 🧣', 'Papan Catur ♟️', 'Kotak Pensil 🗃️', 'Stopkontak Listrik 🔌', 'Jam Meja Kotak ⏱️',
    'Kotak Musik 🎵', 'Amplop Kartu Kotak ✉️', 'Cermin Rias Kotak 🪞', 'Kotak Makan Siang 🍱', 'Kotak P3K 🩹',
    'Blok Balok Mainan 🧱', 'Biskuit Kotak 🧇', 'Pot Bunga Kotak 🪴', 'Baki Nampan Kotak 🍽️', 'Kotak Harta Karun 🪙',
    'Keramik Dinding 🟧', 'Kartu Huruf Kotak 🃏', 'Kotak Sepatu 👟', 'Kotak Kue 🧁', 'Modul Panel Surya 🔲',
  ];

  const triangleObjects = [
    'Potongan Pizza Segitiga 🍕', 'Tenda Berkemah ⛺', 'Rambu Lalu Lintas Segitiga ⚠️', 'Gantungan Baju Segitiga 🪝', 'Atap Rumah Segitiga 🏠',
    'Penggaris Segitiga 📐', 'Potongan Semangka Segitiga 🍉', 'Keripik Tortilla 🌮', 'Piramida Mesir 🔺', 'Layar Perahu ⛵',
    'Kue Lupis Segitiga 🍙', 'Topi Kerucut Pesta 🥳', 'Segitiga Pengaman Jalan 🛑', 'Batu Gunung Segitiga ⛰️', 'Layang-layang Segitiga 🪁',
    'Alat Musik Triangle 🎵', 'Pohon Cemara Runcing 🌲', 'Gigi Monster Segitiga 🦷', 'Mata Panah Segitiga 🏹', 'Ujung Pensil Runcing ✏️',
    'Potongan Keju Segitiga 🧀', 'Tumpeng Nasi Kuning 🍛', 'Corong Minyak Segitiga 🌪️', 'Sirip Ikan Hiu 🦈', 'Kue Pastel Segitiga 🥟',
    'Puncak Menara Runcing 🗼', 'Bilah Sandi Segitiga 🚩', 'Sapu Kerucut 🧹', 'Baju Kimono Lipat 🥋', 'Bendera Segitiga Pawai 🚩',
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const varId = `d5_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

      let variant: any;

      if (slotIdx === 0) {
        // Topic 1: Bentuk Lingkaran
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk dasar lingkaran yang bulat tanpa memiliki sudut.`,
          skill: 'bentuk_geometri_2d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Bentuk Geometri #${vIdx + 1}: Manakah bentuk LINGKARAN yang bulat sempurna tanpa sudut?`,
          visual: '⚪ Lingkaran',
          choices: [
            { label: 'Lingkaran Bulat ⚪', isCorrect: true },
            { label: 'Persegi Kotak ⬛', isCorrect: false },
            { label: 'Segitiga Runcing 🔺', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Lingkaran memiliki garis lengkung melingkar tanpa sudut!`,
          feedbackIncorrect: `Lingkaran berbentuk bulat seperti roda atau donat!`,
        };
      } else if (slotIdx === 1) {
        // Topic 2: Bentuk Persegi
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk persegi dengan 4 sisi sama panjang dan 4 sudut.`,
          skill: 'bentuk_geometri_2d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Bentuk Geometri #${vIdx + 1}: Manakah bentuk PERSEGI yang memiliki 4 sisi sama panjang?`,
          visual: '⬛ Persegi',
          choices: [
            { label: 'Persegi Kotak ⬛', isCorrect: true },
            { label: 'Lingkaran Bulat ⚪', isCorrect: false },
            { label: 'Bintang Emas ⭐', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Persegi memiliki empat sisi dan empat sudut siku!`,
          feedbackIncorrect: `Persegi berbentuk kotak sama sisi seperti dadu mainan!`,
        };
      } else if (slotIdx === 2) {
        // Topic 3: Bentuk Segitiga
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk segitiga dengan 3 sisi dan 3 sudut runcing.`,
          skill: 'bentuk_geometri_2d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Bentuk Geometri #${vIdx + 1}: Manakah bentuk SEGITIGA yang memiliki tepat 3 sudut runcing?`,
          visual: '🔺 Segitiga',
          choices: [
            { label: 'Segitiga Runcing 🔺', isCorrect: true },
            { label: 'Persegi Kotak ⬛', isCorrect: false },
            { label: 'Lingkaran Bulat ⚪', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Segitiga memiliki tiga sisi dan tiga sudut runcing!`,
          feedbackIncorrect: `Segitiga berbentuk seperti atap rumah atau potongan pizza!`,
        };
      } else if (slotIdx === 3) {
        // Topic 4: Bentuk Bintang Emas
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk bintang lima sudut berkilau.`,
          skill: 'bentuk_geometri_2d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Bintang Superhero #${vIdx + 1}: Manakah simbol BINTANG EMAS gemerlap kebanggaan Kak Reza?`,
          visual: '⭐ Bintang',
          choices: [
            { label: 'Bintang Emas ⭐', isCorrect: true },
            { label: 'Bentuk Hati ❤️', isCorrect: false },
            { label: 'Persegi Kotak ⬛', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa bersinar! Bintang emas adalah lambang prestasi pahlawan cilik!`,
          feedbackIncorrect: `Bintang memiliki lima ujung sudut yang memancar gemerlap!`,
        };
      } else if (slotIdx === 4) {
        // Topic 5: Bentuk Hati Kasih Sayang
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Mengenali bentuk hati lambang kasih sayang dan kebaikan.`,
          skill: 'bentuk_geometri_2d',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kasih Sayang #${vIdx + 1}: Manakah simbol bentuk HATI yang melambangkan kasih sayang keluarga?`,
          visual: '❤️ Kasih Sayang',
          choices: [
            { label: 'Bentuk Hati ❤️', isCorrect: true },
            { label: 'Segitiga 🔺', isCorrect: false },
            { label: 'Lingkaran ⚪', isCorrect: false },
          ],
          feedbackCorrect: `Manis sekali! Bentuk hati adalah lambang cinta dan kasih sayang tulus!`,
          feedbackIncorrect: `Bentuk hati melengkung di atas dan runcing di bawah seperti ❤️!`,
        };
      } else if (slotIdx === 5) {
        // Topic 6: Benda Mirip Lingkaran
        const item = circleObjects[vIdx % circleObjects.length];
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Menghubungkan konsep bentuk lingkaran dengan benda nyata di sekitar (${item}).`,
          skill: 'geometri_benda_nyata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Benda Lingkaran #${vIdx + 1}: Di antara benda berikut, manakah yang memiliki bentuk dasar LINGKARAN bulat?`,
          visual: '⚪ ➔ ❓',
          choices: [
            { label: item, isCorrect: true },
            { label: 'Buku Tulis Persegi 📖', isCorrect: false },
            { label: 'Penggaris Segitiga 📐', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! ${item} berbentuk lingkaran bulat sempurna!`,
          feedbackIncorrect: `Cari benda yang tidak memiliki sudut dan permukaannya membulat!`,
        };
      } else if (slotIdx === 6) {
        // Topic 7: Benda Mirip Kotak
        const item = squareObjects[vIdx % squareObjects.length];
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Menghubungkan bentuk persegi empat dengan benda nyata (${item}).`,
          skill: 'geometri_benda_nyata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Benda Kotak #${vIdx + 1}: Di antara benda di rumah, manakah yang memiliki permukaan KOTAK PERSEGI?`,
          visual: '⬛ ➔ ❓',
          choices: [
            { label: item, isCorrect: true },
            { label: 'Roda Sepeda Bulat 🛞', isCorrect: false },
            { label: 'Potongan Pizza Segitiga 🍕', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${item} memiliki bentuk persegi kotak!`,
          feedbackIncorrect: `Cari benda yang memiliki empat sisi rata ya!`,
        };
      } else if (slotIdx === 7) {
        // Topic 8: Benda Mirip Segitiga
        const item = triangleObjects[vIdx % triangleObjects.length];
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'shape',
          learningGoal: `Menghubungkan bentuk segitiga dengan benda nyata (${item}).`,
          skill: 'geometri_benda_nyata',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Benda Segitiga #${vIdx + 1}: Benda manakah yang memiliki bentuk SEGITIGA berujung runcing?`,
          visual: '🔺 ➔ ❓',
          choices: [
            { label: item, isCorrect: true },
            { label: 'Donat Cokelat Bulat 🍩', isCorrect: false },
            { label: 'Kotak Kado Persegi 🎁', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! ${item} memiliki bentuk segitiga runcing!`,
          feedbackIncorrect: `Cari benda yang memiliki tiga sudut seperti atap tenda!`,
        };
      } else if (slotIdx === 8) {
        // Topic 9: Pola Warna Merah-Biru
        const seq = vIdx % 2 === 0 ? '🔴 🔵 🔴 🔵 ❓' : '🔵 🔴 🔵 🔴 ❓';
        const ans = vIdx % 2 === 0 ? '🔴 Merah' : '🔵 Biru';
        const d1 = vIdx % 2 === 0 ? '🔵 Biru' : '🔴 Merah';

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Meneruskan pola berulang warna Merah dan Biru (ABAB).`,
          skill: 'pola_visual',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pola Warna Berulang #${vIdx + 1}: Perhatikan polanya: ${seq}. Warna apakah berikutnya?`,
          visual: seq,
          choices: [
            { label: ans, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: '🟢 Hijau', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Pola warna berikutnya adalah ${ans}!`,
          feedbackIncorrect: `Lihat urutan selang-seling warnanya dari kiri ke kanan ya!`,
        };
      } else if (slotIdx === 9) {
        // Topic 10: Pola Warna Kuning-Hijau
        const seq = vIdx % 2 === 0 ? '🟡 🟢 🟡 🟢 ❓' : '🟢 🟡 🟢 🟡 ❓';
        const ans = vIdx % 2 === 0 ? '🟡 Kuning' : '🟢 Hijau';
        const d1 = vIdx % 2 === 0 ? '🟢 Hijau' : '🟡 Kuning';

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Meneruskan pola berulang warna Kuning dan Hijau.`,
          skill: 'pola_visual',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pola Segar #${vIdx + 1}: Perhatikan barisan warna: ${seq}. Warna manakah untuk melengkapi pola?`,
          visual: seq,
          choices: [
            { label: ans, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: '🟣 Ungu', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Warna ${ans} melengkapi pola barisan!`,
          feedbackIncorrect: `Ingat urutan selang-selingnya: kuning lalu hijau!`,
        };
      } else if (slotIdx === 10) {
        // Topic 11: Pola Benda Mobil-Bola
        const seq = vIdx % 2 === 0 ? '🚗 ⚽ 🚗 ⚽ ❓' : '⚽ 🚗 ⚽ 🚗 ❓';
        const ans = vIdx % 2 === 0 ? '🚗 Mobil Balap' : '⚽ Bola Sepak';
        const d1 = vIdx % 2 === 0 ? '⚽ Bola Sepak' : '🚗 Mobil Balap';

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Mengenali dan melanjutkan pola berulang dua objek (Mobil & Bola).`,
          skill: 'pola_visual',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pola Mainan #${vIdx + 1}: Lihat deretan mainan Kak Reza: ${seq}. Benda apa selanjutnya?`,
          visual: seq,
          choices: [
            { label: ans, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: '🚀 Roket', isCorrect: false },
          ],
          feedbackCorrect: `Keren! Pola mainan berikutnya adalah ${ans}!`,
          feedbackIncorrect: `Perhatikan pergantian benda antara mobil dan bola!`,
        };
      } else if (slotIdx === 11) {
        // Topic 12: Pola Benda Bintang-Bulan
        const seq = vIdx % 2 === 0 ? '⭐ 🌙 ⭐ 🌙 ❓' : '🌙 ⭐ 🌙 ⭐ ❓';
        const ans = vIdx % 2 === 0 ? '⭐ Bintang Emas' : '🌙 Bulan Sabit';
        const d1 = vIdx % 2 === 0 ? '🌙 Bulan Sabit' : '⭐ Bintang Emas';

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Mengenali pola berulang simbol langit malam (Bintang & Bulan).`,
          skill: 'pola_visual',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pola Langit Malam #${vIdx + 1}: Di langit berbaris: ${seq}. Simbol apakah selanjutnya?`,
          visual: seq,
          choices: [
            { label: ans, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: '☀️ Matahari', isCorrect: false },
          ],
          feedbackCorrect: `Bersinar terang! Jawabannya tepat ${ans}!`,
          feedbackIncorrect: `Ikuti irama urutannya: bintang, bulan, bintang, bulan...`,
        };
      } else if (slotIdx === 12) {
        // Topic 13: Pola Ukuran Besar-Kecil
        const seq = vIdx % 2 === 0 ? '🐘 🐭 🐘 🐭 ❓' : '🐻 🐥 🐻 🐥 ❓';
        const ans = vIdx % 2 === 0 ? '🐘 Gajah Besar' : '🐻 Beruang Besar';
        const d1 = vIdx % 2 === 0 ? '🐭 Tikus Kecil' : '🐥 Anak Ayam Kecil';

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'pattern',
          learningGoal: `Mengenali pola berulang ukuran relatif: BESAR lalu KECIL.`,
          skill: 'pola_ukuran',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pola Ukuran #${vIdx + 1}: Urutan ukuran hewan: ${seq}. Hewan manakah yang tepat berikutnya?`,
          visual: seq,
          choices: [
            { label: ans, isCorrect: true },
            { label: d1, isCorrect: false },
            { label: '🐟 Ikan Kecil', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Setelah hewan kecil, kembali lagi ke ${ans}!`,
          feedbackIncorrect: `Pola ini bergantian antara ukuran besar dan kecil!`,
        };
      } else if (slotIdx === 13) {
        // Topic 14: Paling Besar
        const bigSets = [
          { big: 'Gajah Raksasa 🐘', mid: 'Kucing Lucu 🐱', small: 'Semut Hitam 🐜' },
          { big: 'Paus Biru Samudra 🐋', mid: 'Lumba-lumba 🐬', small: 'Ikan Mas 🐟' },
          { big: 'Bus Tingkat Kota 🚌', mid: 'Mobil Sedan 🚗', small: 'Sepeda Roda Dua 🚲' },
          { big: 'Pesawat Terbang ✈️', mid: 'Helikopter 🚁', small: 'Drone Mainan 🛸' },
          { big: 'Kapal Pesiar 🚢', mid: 'Perahu Layar ⛵', small: 'Perahu Kertas 🛶' },
        ];
        const s = bigSets[vIdx % bigSets.length];

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'comparison',
          learningGoal: `Membandingkan ukuran 3 objek dan menentukan yang PALING BESAR.`,
          skill: 'perbandingan_ukuran',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Perbandingan Ukuran #${vIdx + 1}: Di antara ketiga objek ini, manakah yang berukuran PALING BESAR?`,
          visual: '📏 Cari yang Paling Besar',
          choices: [
            { label: s.big, isCorrect: true },
            { label: s.mid, isCorrect: false },
            { label: s.small, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${s.big} memiliki tubuh / ukuran paling besar!`,
          feedbackIncorrect: `Bandingkan ukurannya, cari yang paling raksasa!`,
        };
      } else if (slotIdx === 14) {
        // Topic 15: Paling Kecil
        const smallSets = [
          { big: 'Gajah Raksasa 🐘', mid: 'Kelinci Putih 🐰', small: 'Semut Mungil 🐜' },
          { big: 'Rumah Tingkat Tiga 🏢', mid: 'Mobil Garasi 🚗', small: 'Kunci Pintu 🗝️' },
          { big: 'Pohon Mangga Lebat 🌳', mid: 'Bunga Mawar 🌹', small: 'Biji Semangka 🍉' },
          { big: 'Kereta Api Panjang 🚂', mid: 'Sepeda Motor 🏍️', small: 'Kelereng Kaca 🔮' },
          { big: 'Kuda Gagah 🐴', mid: 'Ayam Jago 🐓', small: 'Kepik Bintik 🐞' },
        ];
        const s = smallSets[vIdx % smallSets.length];

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'comparison',
          learningGoal: `Membandingkan ukuran 3 objek dan menentukan yang PALING KECIL.`,
          skill: 'perbandingan_ukuran',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Mungil & Raksasa #${vIdx + 1}: Di antara pilihan berikut, manakah benda/makhluk yang berukuran PALING KECIL?`,
          visual: '🔍 Cari yang Paling Mungil',
          choices: [
            { label: s.small, isCorrect: true },
            { label: s.mid, isCorrect: false },
            { label: s.big, isCorrect: false },
          ],
          feedbackCorrect: `Hebat! ${s.small} berukuran paling mungil di antara semuanya!`,
          feedbackIncorrect: `Cari yang ukurannya paling kecil dan imut ya!`,
        };
      } else if (slotIdx === 15) {
        // Topic 16: Paling Tinggi
        const tallSets = [
          { tall: 'Jerapah Leher Panjang 🦒', mid: 'Kambing 🐐', short: 'Bebek Kuning 🦆' },
          { tall: 'Pohon Kelapa Tinggi 🌴', mid: 'Tanaman Cabai 🌶️', short: 'Rumput Taman 🌱' },
          { tall: 'Gedung Pencakar Langit 🏙️', mid: 'Rumah Tingkat 🏠', short: 'Pos Ronda 🛖' },
          { tall: 'Menara Mercusuar 🗼', mid: 'Tiang Bendera 🚩', short: 'Pagar Kayu 🪵' },
          { tall: 'Gunung Berbatu 🏔️', mid: 'Bukit Hijau ⛰️', short: 'Gundukan Pasir 🏖️' },
        ];
        const s = tallSets[vIdx % tallSets.length];

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'comparison',
          learningGoal: `Mengenali konsep tinggi-rendah dan menentukan objek yang PALING TINGGI.`,
          skill: 'dimensi_vertikal',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Tinggi Menjulang #${vIdx + 1}: Manakah yang berdiri menjulang PALING TINGGI ke atas?`,
          visual: '⬆️ Cari yang Paling Tinggi',
          choices: [
            { label: s.tall, isCorrect: true },
            { label: s.mid, isCorrect: false },
            { label: s.short, isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! ${s.tall} menjulang paling tinggi ke angkasa!`,
          feedbackIncorrect: `Perhatikan tinggi objek dari tanah hingga ujung atasnya!`,
        };
      } else if (slotIdx === 16) {
        // Topic 17: Paling Panjang
        const longSets = [
          { long: 'Kereta Api Panjang 🚂', mid: 'Bus Kota 🚌', short: 'Sepeda Gowes 🚲' },
          { long: 'Ular Piton Melata 🐍', mid: 'Kadal Taman 🦎', short: 'Ulat Bulu 🐛' },
          { long: 'Sungai Mengalir Luas 🌊', mid: 'Kolam Renang 🏊', short: 'Bak Mandi 🛁' },
          { long: 'Jalan Tol Antarkota 🛣️', mid: 'Jalan Komplek 🏘️', short: 'Jembatan Kayu Kecil 🪵' },
          { long: 'Tali Tambang Kapal 🪢', mid: 'Tali Sepatu 👟', short: 'Benang Jahit 🧵' },
        ];
        const s = longSets[vIdx % longSets.length];

        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'comparison',
          learningGoal: `Mengenali konsep panjang-pendek dan menentukan objek yang PALING PANJANG.`,
          skill: 'dimensi_horizontal',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Rentang Ukuran #${vIdx + 1}: Manakah yang memiliki ukuran rentang PALING PANJANG?`,
          visual: '↔️ Cari yang Paling Panjang',
          choices: [
            { label: s.long, isCorrect: true },
            { label: s.mid, isCorrect: false },
            { label: s.short, isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${s.long} membentang paling panjang!`,
          feedbackIncorrect: `Bandingkan jarak dari ujung awal sampai ujung akhir benda!`,
        };
      } else if (slotIdx === 17) {
        // Topic 18: Posisi Di Atas
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali relasi posisi spasial DI ATAS suatu permukaan.`,
          skill: 'posisi_spasial',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Posisi Ruang #${vIdx + 1}: Lampu gantung berada DI ATAS meja makan. Posisi DI ATAS berarti?`,
          visual: '💡\n🪑 Meja Makan',
          choices: [
            { label: 'Berada di bagian lebih tinggi ⬆️', isCorrect: true },
            { label: 'Berada di bawah lantai ⬇️', isCorrect: false },
            { label: 'Berada di dalam laci 📦', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Di atas berarti posisinya berada di tempat yang lebih tinggi!`,
          feedbackIncorrect: `Arah atas mengarah ke langit-langit ruangan ya!`,
        };
      } else if (slotIdx === 18) {
        // Topic 19: Posisi Di Bawah
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali relasi posisi spasial DI BAWAH / di kolong.`,
          skill: 'posisi_spasial',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Posisi Ruang #${vIdx + 1}: Kucing bersembunyi di kolong DI BAWAH tempat tidur. Posisi DI BAWAH berarti?`,
          visual: '🛏️ Tempat Tidur\n🐱 (di bawah)',
          choices: [
            { label: 'Berada di bagian bawah / lantai ⬇️', isCorrect: true },
            { label: 'Berada di atas atap genteng ⬆️', isCorrect: false },
            { label: 'Melayang di langit 🌤️', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Di bawah artinya posisinya lebih rendah atau di kolong!`,
          feedbackIncorrect: `Bawah mengarah ke permukaan lantai atau tanah!`,
        };
      } else if (slotIdx === 19) {
        // Topic 20: Posisi Di Dalam
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali relasi spasial DI DALAM wadah / wadah tertutup.`,
          skill: 'posisi_spasial',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Ruang Wadah #${vIdx + 1}: Pensil warna tersimpan rapi DI DALAM kotak pensil. Posisi DI DALAM artinya?`,
          visual: '📦 [ ✏️ 🖍️ 🖊️ ]',
          choices: [
            { label: 'Masuk ke dalam bagian kotak 📥', isCorrect: true },
            { label: 'Tercecer di luar halaman 📤', isCorrect: false },
            { label: 'Tertiup angin di atas atap 💨', isCorrect: false },
          ],
          feedbackCorrect: `Benar! Di dalam berarti terlindung di bagian dalam suatu wadah!`,
          feedbackIncorrect: `Benda berada di dalam jika dilingkupi dinding wadahnya!`,
        };
      } else if (slotIdx === 20) {
        // Topic 21: Posisi Di Luar
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali relasi spasial DI LUAR batas area wadah/ruangan.`,
          skill: 'posisi_spasial',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Batas Ruang #${vIdx + 1}: Sepatu ditaruh DI LUAR pintu rumah. Posisi DI LUAR artinya?`,
          visual: '🚪 [ Rumah ] ➔ 👟 (di luar)',
          choices: [
            { label: 'Berada di sisi luar batas pintu 📤', isCorrect: true },
            { label: 'Masuk ke dalam lemari kamar 📥', isCorrect: false },
            { label: 'Tenggelam di akuarium 🐟', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Di luar berarti berada di seberang atau di luar batas ruangan!`,
          feedbackIncorrect: `Di luar berarti tidak berada di dalam ruangan rumah!`,
        };
      } else if (slotIdx === 21) {
        // Topic 22: Posisi Di Belakang
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali orientasi spasial DI BELAKANG objek lain.`,
          skill: 'posisi_spasial',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Orientasi Arah #${vIdx + 1}: Saat bermain petak umpet, Kak Reza bersembunyi DI BELAKANG pohon besar. Posisinya berada di?`,
          visual: '🌳 👤 (di balik pohon)',
          choices: [
            { label: 'Di balik pohon / tidak tampak dari depan 🔙', isCorrect: true },
            { label: 'Tepat di depan wajah orang 👁️', isCorrect: false },
            { label: 'Di atas awan tinggi ☁️', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Di belakang artinya berada di bagian punggung atau balik suatu benda!`,
          feedbackIncorrect: `Belakang adalah lawan arah dari bagian depan!`,
        };
      } else if (slotIdx === 22) {
        // Topic 23: Jarak Sangat Jauh
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali konsep jarak JAUH yang terlihat kecil di mata.`,
          skill: 'persepsi_jarak',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Perspektif Jarak #${vIdx + 1}: Di antara benda-benda berikut, manakah yang posisinya berada SANGAT JAUH dari mata kita?`,
          visual: '🔭 Jarak Jauh',
          choices: [
            { label: 'Matahari di Angkasa ☀️', isCorrect: true },
            { label: 'Sendok di Tangan 🥄', isCorrect: false },
            { label: 'Kaus Kaki di Kaki 🧦', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Matahari jutaan kilometer jauhnya di langit angkasa!`,
          feedbackIncorrect: `Benda yang sangat jauh tampak kecil dan tidak bisa kita sentuh langsung!`,
        };
      } else if (slotIdx === 23) {
        // Topic 24: Jarak Dekat
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali konsep jarak DEKAT yang mudah dijangkau tangan.`,
          skill: 'persepsi_jarak',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Jangkauan Tangan #${vIdx + 1}: Benda manakah yang posisinya paling DEKAT dan bisa langsung disentuh oleh Kak Reza?`,
          visual: '👋 Jarak Dekat',
          choices: [
            { label: 'Buku di Meja Belajar 📖', isCorrect: true },
            { label: 'Bulan di Langit Malam 🌙', isCorrect: false },
            { label: 'Pesawat Terbang di Awan ✈️', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Buku di meja berada dalam jangkauan jarak dekat!`,
          feedbackIncorrect: `Jarak dekat artinya berada tepat di sisi atau depan tangan kita!`,
        };
      } else {
        // Topic 25: Arah Melangkah Maju
        variant = {
          id: varId,
          categoryId: 5,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali arah melangkah MAJU lurus ke depan.`,
          skill: 'arah_navigasi',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Langkah Pahlawan #${vIdx + 1}: Kak Reza siap berjalan lurus ke arah garis depan. Arah melangkah MAJU ditunjukkan oleh tanda?`,
          visual: '⬆️ Maju Melangkah',
          choices: [
            { label: 'Panah Lurus ke Depan ⬆️', isCorrect: true },
            { label: 'Panah Berbalik Mundur ⬇️', isCorrect: false },
            { label: 'Tidur Terlentang 🛌', isCorrect: false },
          ],
          feedbackCorrect: `Sempurna pahlawan cilik! Langkah maju membawa kita selalu melangkah ke depan!`,
          feedbackIncorrect: `Maju artinya melangkah ke arah depan pandangan kita!`,
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
    id: 5,
    name: 'Jumat',
    title: 'Bentuk & Spasial',
    icon: '🔷',
    badge: 'Geometri & Spasial',
    desc: 'Bentuk geometris 2D, bentuk objek di sekitar kita, orientasi arah kiri/kanan/atas/bawah, dan relasi ruang.',
    questions,
  };
}
