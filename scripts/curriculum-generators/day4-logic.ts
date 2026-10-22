export function generateDay4Logic() {
  const topics = [
    'Pasangan Makan Sendok',
    'Pasangan Sepatu',
    'Pasangan Pensil',
    'Pasangan Mandi Sabun',
    'Pasangan Cangkir Minum',
    'Makanan Kelinci',
    'Makanan Monyet',
    'Makanan Kucing',
    'Tempat Hidup Ikan',
    'Tempat Burung Terbang',
    'Tempat Hidup Singa',
    'Bukan Buah-buahan',
    'Bukan Kendaraan',
    'Bukan Hewan',
    'Pelindung Hujan',
    'Fungsi Mata',
    'Fungsi Telinga',
    'Fungsi Hidung',
    'Fungsi Lidah',
    'Makanan Dingin',
    'Makanan Hangat',
    'Benda Ringan Melayang',
    'Tenggelam di Air',
    'Terang Siang Hari',
    'Cahaya Malam Hari',
  ];

  const diningScenarios = [
    'saat sarapan nasi goreng', 'ketika makan mi kuah lezat', 'saat menyantap sup sayur', 'di meja makan siang',
    'saat makan bubur ayam hangat', 'ketika makan puding manis', 'saat makan bersama keluarga', 'di pesta ulang tahun',
    'saat menikmati spageti lezat', 'di kantin sekolah', 'saat makan salad buah segar', 'ketika bekal dibuka di taman',
    'saat sarapan telur dadar', 'di meja piknik ceria', 'saat makan sore bersama paman', 'ketika makan malam bergizi',
    'di dapur markas superhero', 'saat makan hidangan spesial', 'di restoran keluarga', 'saat jam makan tiba',
    'ketika menyiapkan peralatan makan', 'saat menemani adik makan', 'di pesta kebun sore', 'saat belajar adab makan',
    'ketika membantu menata piring', 'saat makan bersama kakek dan nenek', 'di acara syukuran keluarga', 'saat santap pagi bertenaga',
    'ketika makan hidangan lezat ibu', 'saat jam makan sehat superhero',
  ];

  const oddOutFruit = [
    { fruits: ['Apel 🍎', 'Jeruk 🍊'], not: 'Mobil Balap 🏎️' },
    { fruits: ['Pisang 🍌', 'Semangka 🍉'], not: 'Sepatu Lari 👟' },
    { fruits: ['Stroberi 🍓', 'Anggur 🍇'], not: 'Robot Mainan 🤖' },
    { fruits: ['Mangga 🥭', 'Nanas 🍍'], not: 'Topi Cap 🧢' },
    { fruits: ['Alpukat 🥑', 'Pepaya 🍈'], not: 'Buku Tulis 📚' },
    { fruits: ['Melon 🍈', 'Ceri 🍒'], not: 'Krayon Warna 🖍️' },
    { fruits: ['Kiwi 🥝', 'Pir 🍐'], not: 'Jam Dinding ⏰' },
    { fruits: ['Persik 🍑', 'Kelapa 🥥'], not: 'Sapu Lantai 🧹' },
    { fruits: ['Belimbing ⭐', 'Jambu 🍏'], not: 'Kunci Pintu 🗝️' },
    { fruits: ['Durian 🍈', 'Manggis 🫐'], not: 'Sepeda Gowes 🚲' },
    { fruits: ['Rambutan 🔴', 'Salak 🟤'], not: 'Ember Air 🪣' },
    { fruits: ['Kurma 🟫', 'Zaitun 🫒'], not: 'Balon Udara 🎈' },
    { fruits: ['Apel Merah 🍎', 'Pisang Manis 🍌'], not: 'Payung Hujan ☂️' },
    { fruits: ['Jeruk Manis 🍊', 'Stroberi Merah 🍓'], not: 'Gelas Kaca 🥛' },
    { fruits: ['Anggur Ungu 🍇', 'Semangka Segar 🍉'], not: 'Piring Keramik 🍽️' },
    { fruits: ['Nanas Madu 🍍', 'Mangga Harum 🥭'], not: 'Sendok Makan 🥄' },
    { fruits: ['Melon Hijau 🍈', 'Kiwi Segar 🥝'], not: 'Garpu Makan 🍴' },
    { fruits: ['Alpukat Gurih 🥑', 'Pir Manis 🍐'], not: 'Bantal Tidur 🛌' },
    { fruits: ['Ceri Merah 🍒', 'Persik Wangi 🍑'], not: 'Selimut Lembut 💤' },
    { fruits: ['Belimbing Manis ⭐', 'Kelapa Muda 🥥'], not: 'Kacamata Hitam 🕶️' },
    { fruits: ['Manggis Manis 🫐', 'Rambutan Segar 🔴'], not: 'Palu Besi 🔨' },
    { fruits: ['Jambu Kristal 🍏', 'Salak Manis 🟤'], not: 'Obeng Sekrup 🪛' },
    { fruits: ['Apel Fuji 🍎', 'Jeruk Bali 🍊'], not: 'Senter Terang 🔦' },
    { fruits: ['Pisang Raja 🍌', 'Anggur Merah 🍇'], not: 'Gunting Kertas ✂️' },
    { fruits: ['Stroberi Segar 🍓', 'Semangka Merah 🍉'], not: 'Penggaris 📏' },
    { fruits: ['Mangga Manalagi 🥭', 'Nanas Subang 🍍'], not: 'Kamera Foto 📷' },
    { fruits: ['Pepaya California 🍈', 'Melon Kuning 🍈'], not: 'Televisi Layar 📺' },
    { fruits: ['Alpukat Mentega 🥑', 'Kiwi Hijau 🥝'], not: 'Kipas Angin 🪭' },
    { fruits: ['Ceri Segar 🍒', 'Pir Hijau 🍐'], not: 'Termos Air 🫖' },
    { fruits: ['Persik Manis 🍑', 'Kelapa Gading 🥥'], not: 'Celengan Kaleng 🪙' },
  ];

  const oddOutVehicle = [
    { veh: ['Mobil 🚗', 'Bus 🚌'], not: 'Semangka Segar 🍉' },
    { veh: ['Kereta Api 🚂', 'Pesawat ✈️'], not: 'Kucing Lucu 🐱' },
    { veh: ['Sepeda 🚲', 'Sepeda Motor 🏍️'], not: 'Bunga Mawar 🌹' },
    { veh: ['Helikopter 🚁', 'Kapal Laut 🚢'], not: 'Buku Gambar 📚' },
    { veh: ['Truk Kargo 🚛', 'Mobil Polisi 🚓'], not: 'Donat Cokelat 🍩' },
    { veh: ['Ambulans 🚑', 'Pemadam 🚒'], not: 'Kelinci Putih 🐰' },
    { veh: ['Perahu Layar ⛵', 'Kapal Selam 🤿'], not: 'Topi Jerami 👒' },
    { veh: ['Mobil Balap 🏎️', 'Skuter 🛴'], not: 'Roti Panggang 🍞' },
    { veh: ['Taksi 🚕', 'Bajaj 🛺'], not: 'Es Krim Vanila 🍦' },
    { veh: ['Kereta Listrik 🚆', 'Monorel 🚝'], not: 'Krayon Merah 🖍️' },
    { veh: ['Mobil Van 🚐', 'Truk Molen 🚚'], not: 'Pisang Manis 🍌' },
    { veh: ['Kapal Feri ⛴️', 'Kano Kayu 🛶'], not: 'Bebek Kuning 🦆' },
    { veh: ['Traktor Sawah 🚜', 'Ekskavator 🏗️'], not: 'Madu Manis 🍯' },
    { veh: ['Pesawat Tempur 🛩️', 'Roket 🚀'], not: 'Apel Merah 🍎' },
    { veh: ['Mobil Pikap 🛻', 'Sepeda Gunung 🚵'], not: 'Bantal Tidur 💤' },
    { veh: ['Bus Sekolah 🚌', 'Mobil Derek 🛞'], not: 'Gelas Kaca 🥛' },
    { veh: ['Kereta Cepat 🚄', 'Lokomotif 🚂'], not: 'Piring Porselen 🍽️' },
    { veh: ['Speedboat 🚤', 'Jetski 🌊'], not: 'Susu UHT 🥛' },
    { veh: ['Balon Udara 🎈', 'Paralayang 🪂'], not: 'Sendok Makan 🥄' },
    { veh: ['Mobil Listrik 🚙', 'Sepeda Lipat 🚲'], not: 'Garpu Makan 🍴' },
    { veh: ['Truk Tangki 🚛', 'Mobil Pemadam 🚒'], not: 'Selimut Hangat 🛌' },
    { veh: ['Kereta Gantung 🚡', 'Tram Kota 🚊'], not: 'Cangkir Kopi ☕' },
    { veh: ['Pesawat Jet ✈️', 'Helikopter Basarnas 🚁'], not: 'Mangkuk Sayur 🥣' },
    { veh: ['Kapal Pesiar 🚢', 'Perahu Nelayan ⛵'], not: 'Wortel Segar 🥕' },
    { veh: ['Mobil Ambulans 🚑', 'Mobil Patroli 🚓'], not: 'Keju Lembut 🧀' },
    { veh: ['Skuter Listrik 🛴', 'Motor Gede 🏍️'], not: 'Telur Ayam 🥚' },
    { veh: ['Truk Pasir 🚚', 'Mobil Box 🚐'], not: 'Kue Tart 🎂' },
    { veh: ['Kereta Komuter 🚆', 'Kereta Wisata 🚂'], not: 'Permen Manis 🍬' },
    { veh: ['Perahu Dayung 🛶', 'Kapal Tunda 🛥️'], not: 'Jus Jeruk 🧃' },
    { veh: ['Kendaraan Superhero 🦸🏎️', 'Pesawat Antariksa 🚀'], not: 'Biskuit Renyah 🍪' },
  ];

  const oddOutAnimal = [
    { ani: ['Kucing 🐱', 'Anjing 🐶'], not: 'Topi Superhero 🧢' },
    { ani: ['Kelinci 🐰', 'Kuda 🐴'], not: 'Sepatu Olahraga 👟' },
    { ani: ['Burung 🐦', 'Bebek 🦆'], not: 'Pensil Warna ✏️' },
    { ani: ['Gajah 🐘', 'Jerapah 🦒'], not: 'Buku Pelajaran 📖' },
    { ani: ['Singa 🦁', 'Harimau 🐯'], not: 'Mobil Balap 🚗' },
    { ani: ['Ikan 🐟', 'Paus 🐋'], not: 'Kacamata Renang 🥽' },
    { ani: ['Ayam 🐔', 'Sapi 🐮'], not: 'Piring Keramik 🍽️' },
    { ani: ['Kambing 🐐', 'Domba 🐑'], not: 'Jam Dinding ⏰' },
    { ani: ['Monyet 🐒', 'Gorila 🦍'], not: 'Sendok Makan 🥄' },
    { ani: ['Kupu-kupu 🦋', 'Lebah 🐝'], not: 'Payung Pelindung ☂️' },
    { ani: ['Lumba-lumba 🐬', 'Penyu 🐢'], not: 'Bola Basket 🏀' },
    { ani: ['Zebra 🦓', 'Rusa 🦌'], not: 'Kado Ulang Tahun 🎁' },
    { ani: ['Beruang 🐻', 'Panda 🐼'], not: 'Kipas Angin 🪭' },
    { ani: ['Katak 🐸', 'Buaya 🐊'], not: 'Kotak Pensil 🗃️' },
    { ani: ['Unta 🐪', 'Kanguru 🦘'], not: 'Gelas Kaca 🥛' },
    { ani: ['Tupai 🐿️', 'Landak 🦔'], not: 'Krayon Warna 🖍️' },
    { ani: ['Burung Hantu 🦉', 'Elang 🦅'], not: 'Senter Malam 🔦' },
    { ani: ['Bebek 🦆', 'Angsa 🦢'], not: 'Perahu Kertas ⛵' },
    { ani: ['Semut 🐜', 'Kepik 🐞'], not: 'Uang Logam 🪙' },
    { ani: ['Pinguin 🐧', 'Anjing Laut 🦭'], not: 'Jaket Tebal 🧥' },
    { ani: ['Koala 🐨', 'Kuskus 🦥'], not: 'Ransel Sekolah 🎒' },
    { ani: ['Badak 🦏', 'Kuda Nil 🦛'], not: 'Kamera Digital 📷' },
    { ani: ['Rubah 🦊', 'Serigala 🐺'], not: 'Bantal Sofa 🛋️' },
    { ani: ['Hamster 🐹', 'Marmut 🐭'], not: 'Sangkar Besi ⛓️' },
    { ani: ['Gurita 🐙', 'Cumi-cumi 🦑'], not: 'Pancing Ikan 🎣' },
    { ani: ['Kepiting 🦀', 'Udang 🦐'], not: 'Wajan Dapur 🍳' },
    { ani: ['Kelelawar 🦇', 'Burung Pipit 🐦'], not: 'Lampu Bohlam 💡' },
    { ani: ['Flamingo 🦩', 'Merak 🦚'], not: 'Cermin Rias 🪞' },
    { ani: ['Kucing Persia 🐱', 'Kelinci Anggora 🐰'], not: 'Gunting Kuku ✂️' },
    { ani: ['Kuda Poni 🐴', 'Anak Sapi 🐮'], not: 'Sepeda Roda Tiga 🚲' },
  ];

  const questions = topics.map((topicName, slotIdx) => {
    const variants = [];

    for (let vIdx = 0; vIdx < 30; vIdx++) {
      const varId = `d4_t${String(slotIdx + 1).padStart(2, '0')}_v${String(vIdx + 1).padStart(2, '0')}`;
      const difficulty = vIdx < 10 ? 'mudah' : vIdx < 22 ? 'berkembang' : 'menantang';

      let variant: any;

      if (slotIdx === 0) {
        // Topic 1: Pasangan Sendok Makan
        const ctx = diningScenarios[vIdx % diningScenarios.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Memahami relasi pasangan fungsional antara sendok dan garpu.`,
          skill: 'pasangan_fungsional',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pasangan Benda #${vIdx + 1}: Di meja makan ${ctx}, pasangan yang paling tepat untuk Sendok 🥄 adalah?`,
          visual: '🥄 ➕ ❓',
          choices: [
            { label: 'Garpu Makan 🍴', isCorrect: true },
            { label: 'Sapu Lantai 🧹', isCorrect: false },
            { label: 'Sepatu Lari 👟', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Sendok dan garpu adalah pasangan setia di meja makan!`,
          feedbackIncorrect: `Pikirkan alat yang biasa kamu gunakan bersama sendok saat makan!`,
        };
      } else if (slotIdx === 1) {
        // Topic 2: Pasangan Sepatu
        const sports = ['berlari di lapangan', 'bersepeda ke taman', 'berangkat ke sekolah', 'berolahraga pagi', 'bermain di arena superhero'];
        const sp = sports[vIdx % sports.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengenali pasangan fungsional antara sepatu dan kaus kaki.`,
          skill: 'pasangan_fungsional',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pasangan Superhero #${vIdx + 1}: Sebelum Kak Reza memakai Sepatu 👟 untuk ${sp}, apa pasangan yang dipakai di kaki terlebih dahulu?`,
          visual: '👟 ➕ ❓',
          choices: [
            { label: 'Kaus Kaki 🧦', isCorrect: true },
            { label: 'Sarung Tangan 🧤', isCorrect: false },
            { label: 'Topi Kepala 🧢', isCorrect: false },
          ],
          feedbackCorrect: `Benar! Kaus kaki melindungi kaki sebelum memakai sepatu!`,
          feedbackIncorrect: `Benda apa yang melindungi kakimu di dalam sepatu?`,
        };
      } else if (slotIdx === 2) {
        // Topic 3: Pasangan Pensil
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Menghubungkan alat tulis pensil dengan media tulis buku tulis/kertas.`,
          skill: 'pasangan_fungsional',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Belajar Menulis #${vIdx + 1}: Saat Kak Reza memegang Pensil ✏️ untuk belajar menulis misi hari ini, di manakah pensil digunakan menulis?`,
          visual: '✏️ ➕ ❓',
          choices: [
            { label: 'Buku Tulis 📓', isCorrect: true },
            { label: 'Piring Makan 🍽️', isCorrect: false },
            { label: 'Bantal Tidur 🛌', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Pensil digunakan untuk menulis di atas buku tulis!`,
          feedbackIncorrect: `Kita menulis di atas lembaran kertas atau buku tulis ya!`,
        };
      } else if (slotIdx === 3) {
        // Topic 4: Pasangan Mandi Sabun
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengenali perlengkapan mandi setelah bersabun yaitu handuk bersih.`,
          skill: 'pasangan_fungsional',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Kebersihan Mandi #${vIdx + 1}: Setelah mandi segar menggunakan Sabun 🧼 dan membilas tubuh dengan air bersih, benda apa yang dipakai mengeringkan badan?`,
          visual: '🧼 ➕ ❓',
          choices: [
            { label: 'Handuk Bersih 🧖', isCorrect: true },
            { label: 'Kaus Kaki 🧦', isCorrect: false },
            { label: 'Buku Cerita 📖', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Handuk bersih berguna mengeringkan badan setelah mandi!`,
          feedbackIncorrect: `Keringkan air di tubuh dengan handuk yang lembut dan bersih!`,
        };
      } else if (slotIdx === 4) {
        // Topic 5: Pasangan Cangkir Minum
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengenali tatakan cangkir / sendok teh sebagai pasangan cangkir.`,
          skill: 'pasangan_fungsional',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Minum Sehat #${vIdx + 1}: Di atas meja ruang tamu, Cangkir ☕ diletakkan di atas pasangannya yaitu?`,
          visual: '☕ ➕ ❓',
          choices: [
            { label: 'Tatakan Cangkir 🍽️', isCorrect: true },
            { label: 'Sepatu 👟', isCorrect: false },
            { label: 'Gunting Kertas ✂️', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Cangkir serasi ditaruh di atas tatakannya!`,
          feedbackIncorrect: `Alas cangkir bulat kecil disebut tatakan cangkir!`,
        };
      } else if (slotIdx === 5) {
        // Topic 6: Makanan Kelinci
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengetahui makanan kesukaan hewan kelinci (wortel / rumput).`,
          skill: 'relasi_hewan_makanan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pakan Satwa #${vIdx + 1}: Makanan kesukaan kelinci lucu yang berwarna oranye dan renyah adalah?`,
          visual: '🐰 ➕ ❓',
          choices: [
            { label: 'Wortel Segar 🥕', isCorrect: true },
            { label: 'Ikan Bakar 🐟', isCorrect: false },
            { label: 'Tulang Daging 🍖', isCorrect: false },
          ],
          feedbackCorrect: `Benar! Kelinci sangat suka mengunyah wortel renyah!`,
          feedbackIncorrect: `Kelinci adalah herbivora pemakan sayur wortel yang bergizi!`,
        };
      } else if (slotIdx === 6) {
        // Topic 7: Makanan Monyet
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengetahui makanan kesukaan monyet (pisang buah).`,
          skill: 'relasi_hewan_makanan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pakan Satwa #${vIdx + 1}: Monyet lincah di kebun binatang sangat suka mengupas dan memakan buah apa?`,
          visual: '🐒 ➕ ❓',
          choices: [
            { label: 'Pisang Manis 🍌', isCorrect: true },
            { label: 'Rumput Kering 🌾', isCorrect: false },
            { label: 'Permen Karet 🍬', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Pisang adalah makanan buah favorit monyet!`,
          feedbackIncorrect: `Buah kuning manis yang mudah dikupas adalah pisang!`,
        };
      } else if (slotIdx === 7) {
        // Topic 8: Makanan Kucing
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengetahui makanan alami kesukaan kucing (ikan).`,
          skill: 'relasi_hewan_makanan',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pakan Satwa #${vIdx + 1}: Kucing mengeong di dapur karena mencium aroma lezat makanan kesukaannya, yaitu?`,
          visual: '🐱 ➕ ❓',
          choices: [
            { label: 'Ikan Segar 🐟', isCorrect: true },
            { label: 'Wortel Keras 🥕', isCorrect: false },
            { label: 'Daun Pohon 🍃', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Kucing sangat menyukai ikan lezat!`,
          feedbackIncorrect: `Hewan karnivora kecil seperti kucing suka aroma ikan!`,
        };
      } else if (slotIdx === 8) {
        // Topic 9: Tempat Hidup Ikan
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengenali habitat tempat hidup ikan yang bernapas dengan insang di air.`,
          skill: 'habitat_alam',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Habitat Hewan #${vIdx + 1}: Ikan berenang menggunakan sirip dan bernapas di dalam?`,
          visual: '🐟 ➔ ❓',
          choices: [
            { label: 'Air Kolam / Laut 🌊', isCorrect: true },
            { label: 'Puncak Pohon 🌳', isCorrect: false },
            { label: 'Gurun Pasir Kering 🏜️', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! Ikan hidup dan berenang di dalam air!`,
          feedbackIncorrect: `Ikan membutuhkan air untuk bernapas dan bergerak!`,
        };
      } else if (slotIdx === 9) {
        // Topic 10: Tempat Burung Terbang
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengenali media gerak burung yang mengepakkan sayap di udara / langit.`,
          skill: 'habitat_alam',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Jelajah Alam #${vIdx + 1}: Burung mengepakkan sayapnya dan terbang bebas tinggi di mana?`,
          visual: '🦅 ➔ ❓',
          choices: [
            { label: 'Udara Langit yang Luas 🌤️', isCorrect: true },
            { label: 'Dasar Laut Dalam 🌊', isCorrect: false },
            { label: 'Bawah Tanah Gelap 🕳️', isCorrect: false },
          ],
          feedbackCorrect: `Keren! Burung terbang mengarungi langit dan udara bersih!`,
          feedbackIncorrect: `Sayap burung dirancang untuk terbang bebas di udara!`,
        };
      } else if (slotIdx === 10) {
        // Topic 11: Tempat Hidup Singa
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'classification',
          learningGoal: `Mengenali habitat alami singa yaitu padang rumput savana terbuka.`,
          skill: 'habitat_alam',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Raja Rimba #${vIdx + 1}: Di alam liar yang sesungguhnya, singa si raja rimba tinggal dan berburu di?`,
          visual: '🦁 ➔ ❓',
          choices: [
            { label: 'Padang Rumput Savana 🌾', isCorrect: true },
            { label: 'Kutub Es yang Dingin 🧊', isCorrect: false },
            { label: 'Dasar Samudra 🐠', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Singa tinggal di savana padang rumput yang luas!`,
          feedbackIncorrect: `Singa menyukai padang rumput terbuka yang hangat!`,
        };
      } else if (slotIdx === 11) {
        // Topic 12: Bukan Buah-buahan (Odd-One-Out)
        const pair = oddOutFruit[vIdx % oddOutFruit.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'odd_one_out',
          learningGoal: `Mengklasifikasikan benda dan menemukan yang BUKAN kelompok buah-buahan.`,
          skill: 'klasifikasi_benda',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Odd-One-Out #${vIdx + 1}: Di antara pilihan berikut, manakah benda yang BUKAN buah-buahan?`,
          visual: `🔍 ${pair.fruits[0]} | ${pair.fruits[1]} | ${pair.not}`,
          choices: [
            { label: pair.not, isCorrect: true },
            { label: pair.fruits[0], isCorrect: false },
            { label: pair.fruits[1], isCorrect: false },
          ],
          feedbackCorrect: `Hebat! ${pair.not} adalah benda, bukan buah yang bisa dimakan!`,
          feedbackIncorrect: `Cari yang tidak tumbuh di pohon buah ya!`,
        };
      } else if (slotIdx === 12) {
        // Topic 13: Bukan Kendaraan (Odd-One-Out)
        const pair = oddOutVehicle[vIdx % oddOutVehicle.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'odd_one_out',
          learningGoal: `Mengklasifikasikan objek dan menemukan yang BUKAN kelompok alat transportasi.`,
          skill: 'klasifikasi_benda',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Odd-One-Out #${vIdx + 1}: Di antara pilihan berikut, manakah yang BUKAN alat transportasi / kendaraan?`,
          visual: `🔍 ${pair.veh[0]} | ${pair.veh[1]} | ${pair.not}`,
          choices: [
            { label: pair.not, isCorrect: true },
            { label: pair.veh[0], isCorrect: false },
            { label: pair.veh[1], isCorrect: false },
          ],
          feedbackCorrect: `Pintar! ${pair.not} bukan kendaraan pengangkut penumpang!`,
          feedbackIncorrect: `Kendaraan adalah alat yang digunakan manusia untuk bepergian!`,
        };
      } else if (slotIdx === 13) {
        // Topic 14: Bukan Hewan (Odd-One-Out)
        const pair = oddOutAnimal[vIdx % oddOutAnimal.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'odd_one_out',
          learningGoal: `Membedakan makhluk hidup (hewan) dengan benda mati.`,
          skill: 'klasifikasi_benda',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Detektif Alam #${vIdx + 1}: Manakah di antara pilihan ini yang BUKAN termasuk makhluk hidup hewan?`,
          visual: `🔍 ${pair.ani[0]} | ${pair.ani[1]} | ${pair.not}`,
          choices: [
            { label: pair.not, isCorrect: true },
            { label: pair.ani[0], isCorrect: false },
            { label: pair.ani[1], isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa teliti! ${pair.not} adalah benda buatan manusia, bukan binatang!`,
          feedbackIncorrect: `Hewan bernapas, makan, dan bergerak mandiri!`,
        };
      } else if (slotIdx === 14) {
        // Topic 15: Pelindung Hujan
        const rainGear = ['Payung Lebar ☂️', 'Jas Hujan Anti Air 🧥', 'Sepatu Bot Karet 👢'];
        const rGear = rainGear[vIdx % rainGear.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengetahui fungsi perlindungan diri dari hujan dan cuaca basah.`,
          skill: 'sebab_akibat',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Cuaca Hujan #${vIdx + 1}: Saat hujan turun lebat dan Kak Reza harus berjalan ke luar, perlengkapan pelindung apa yang dipakai agar tidak basah?`,
          visual: '🌧️ ➔ ❓',
          choices: [
            { label: rGear, isCorrect: true },
            { label: 'Kipas Angin Kertas 🪭', isCorrect: false },
            { label: 'Buku Tulis Tipis 📖', isCorrect: false },
          ],
          feedbackCorrect: `Benar sekali! ${rGear} melindungi tubuh dari basahnya tetesan air hujan!`,
          feedbackIncorrect: `Gunakan benda berbahan anti air saat hujan turun!`,
        };
      } else if (slotIdx === 15) {
        // Topic 16: Fungsi Mata
        const sights = ['membaca buku cerita', 'melihat indahnya pelangi', 'mengamati warna krayon', 'menonton film edukasi', 'melihat jalan saat berjalan'];
        const s = sights[vIdx % sights.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali fungsi indra penglihatan (mata) untuk melihat.`,
          skill: 'pancaindra',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pancaindra Superhero #${vIdx + 1}: Indra tubuh apakah yang berguna untuk ${s}?`,
          visual: '👁️ 👁️',
          choices: [
            { label: 'Mata untuk Melihat 👁️', isCorrect: true },
            { label: 'Hidung untuk Mencium 👃', isCorrect: false },
            { label: 'Telinga untuk Mendengar 👂', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! Sepasang mata kita dianugerahi untuk melihat dunia!`,
          feedbackIncorrect: `Kita melihat pemandangan indah dengan kedua mata kita!`,
        };
      } else if (slotIdx === 16) {
        // Topic 17: Fungsi Telinga
        const sounds = ['mendengarkan kicau burung', 'menyimak nasihat ibu', 'mendengar bel sepeda', 'menikmati lagu ceria', 'mendengar sirine ambulans'];
        const snd = sounds[vIdx % sounds.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali fungsi indra pendengaran (telinga) untuk menyimak bunyi.`,
          skill: 'pancaindra',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pancaindra Superhero #${vIdx + 1}: Bagian tubuh manakah yang kita gunakan untuk ${snd}?`,
          visual: '👂 👂',
          choices: [
            { label: 'Telinga untuk Mendengar 👂', isCorrect: true },
            { label: 'Mata untuk Melihat 👁️', isCorrect: false },
            { label: 'Lidah untuk Mengecap 👅', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! Telinga kita sangat peka mendengarkan aneka bunyi!`,
          feedbackIncorrect: `Gunakan telinga kanan dan kiri untuk mendengar suara!`,
        };
      } else if (slotIdx === 17) {
        // Topic 18: Fungsi Hidung
        const smells = ['mencium wangi bunga melati', 'mencium harum kue bolu panggang', 'mencium aroma masakan sup ibu', 'mencium segarnya wangi sabun mandi'];
        const sm = smells[vIdx % smells.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali fungsi indra penciuman (hidung) untuk membau aroma.`,
          skill: 'pancaindra',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pancaindra Bersih #${vIdx + 1}: Bagian tubuh yang digunakan Kak Reza untuk ${sm} adalah?`,
          visual: '👃',
          choices: [
            { label: 'Hidung untuk Mencium Aroma 👃', isCorrect: true },
            { label: 'Kaki untuk Melompat 🦶', isCorrect: false },
            { label: 'Siku Tangan 💪', isCorrect: false },
          ],
          feedbackCorrect: `Benar! Hidung adalah indra penciuman aroma yang hebat!`,
          feedbackIncorrect: `Kita menghirup dan mencium aroma melalui lubang hidung!`,
        };
      } else if (slotIdx === 18) {
        // Topic 19: Fungsi Lidah
        const tastes = ['mengecap rasa manis buah madu', 'merasakan asinnya keju gurih', 'merasakan asam manis buah jeruk', 'menikmati lezatnya puding cokelat'];
        const t = tastes[vIdx % tastes.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali fungsi indra pengecap (lidah) untuk merasakan makanan.`,
          skill: 'pancaindra',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Pancaindra Lezat #${vIdx + 1}: Di dalam rongga mulut kita, bagian apakah yang bertugas untuk ${t}?`,
          visual: '👅',
          choices: [
            { label: 'Lidah untuk Mengecap Rasa 👅', isCorrect: true },
            { label: 'Rambut Kepala 💇', isCorrect: false },
            { label: 'Kuku Jari 💅', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa! Lidah memiliki bintil perasa untuk mengecap aneka rasa lezat!`,
          feedbackIncorrect: `Rasa manis, asin, dan asam dikenali oleh lidah kita!`,
        };
      } else if (slotIdx === 19) {
        // Topic 20: Makanan Dingin
        const coldFoods = ['Es Krim Cone 🍦', 'Es Puter Kelapa 🍧', 'Jus Buah Dingin Ber-es 🥤', 'Es Lilin Cokelat 🧊', 'Puding Dingin Segar 🍮'];
        const cf = coldFoods[vIdx % coldFoods.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali suhu dingin pada makanan dan minuman pencuci mulut.`,
          skill: 'sifat_benda_suhu',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Sensasi Rasa Suhu #${vIdx + 1}: Di antara pilihan berikut, manakah makanan yang terasa DINGIN dan menyegarkan saat dimakan?`,
          visual: '❄️ ❓',
          choices: [
            { label: cf, isCorrect: true },
            { label: 'Sup Kaldu Panas Mengepul 🥣', isCorrect: false },
            { label: 'Nasi Goreng Hangat 🍛', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${cf} bersuhu dingin dan menyegarkan!`,
          feedbackIncorrect: `Makanan bersuhu dingin biasanya disimpan di lemari es!`,
        };
      } else if (slotIdx === 20) {
        // Topic 21: Makanan Hangat
        const warmFoods = ['Sup Ayam Sayur Hangat 🥣', 'Bubur Ayam Hangat 🍲', 'Susu Cokelat Hangat 🥛', 'Teh Hangat Manis 🍵', 'Soto Hangat Lezat 🍲'];
        const wf = warmFoods[vIdx % warmFoods.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali suhu hangat pada hidangan berkuah yang nyaman di perut.`,
          skill: 'sifat_benda_suhu',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Hidangan Bertenaga #${vIdx + 1}: Saat cuaca sedang berangin sejuk, hidangan berkuah manakah yang terasa HANGAT dan nyaman di badan?`,
          visual: '♨️ ❓',
          choices: [
            { label: wf, isCorrect: true },
            { label: 'Es Batu Balok 🧊', isCorrect: false },
            { label: 'Es Krim Dingin 🍦', isCorrect: false },
          ],
          feedbackCorrect: `Pintar! ${wf} terasa hangat dan menyehatkan tubuh!`,
          feedbackIncorrect: `Cari hidangan yang berkuah hangat mengepul ya!`,
        };
      } else if (slotIdx === 21) {
        // Topic 22: Benda Ringan Melayang / Mengapung
        const lightObjects = ['Balon Gas 🎈', 'Bulu Burung Halus 🪶', 'Daun Kering Ringan 🍃', 'Gelembung Sabun 🫧', 'Perahu Kertas Lipat ⛵'];
        const lo = lightObjects[vIdx % lightObjects.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali sifat benda ringan yang dapat melayang atau mengapung di atas air.`,
          skill: 'sifat_fisik_benda',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Eksperimen Sains Cilik #${vIdx + 1}: Benda manakah yang sangat RINGAN sehingga mudah melayang ditiup angin sepoi-sepoi?`,
          visual: '🍃 💨 ❓',
          choices: [
            { label: lo, isCorrect: true },
            { label: 'Batu Kali Berat 🪨', isCorrect: false },
            { label: 'Palu Besi Padat 🔨', isCorrect: false },
          ],
          feedbackCorrect: `Hebat! ${lo} berbobot sangat ringan sehingga mudah melayang!`,
          feedbackIncorrect: `Benda ringan tidak berat dan mudah terangkat oleh udara!`,
        };
      } else if (slotIdx === 22) {
        // Topic 23: Tenggelam di Air
        const heavyObjects = ['Batu Kali Padat 🪨', 'Kelereng Kaca 🔮', 'Sendok Logam Besi 🥄', 'Koin Uang Logam 🪙', 'Gembok Besi Berat 🔒'];
        const ho = heavyObjects[vIdx % heavyObjects.length];
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali sifat benda berat yang tenggelam hingga ke dasar wadah air.`,
          skill: 'sifat_fisik_benda',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Sains di Kolam Air #${vIdx + 1}: Jika dimasukkan ke dalam ember berisi air penuh, benda manakah yang TENGGELAM ke dasar karena berat?`,
          visual: '🌊 ⬇️ ❓',
          choices: [
            { label: ho, isCorrect: true },
            { label: 'Bulu Unggas Ringan 🪶', isCorrect: false },
            { label: 'Daun Kering Mengapung 🍃', isCorrect: false },
          ],
          feedbackCorrect: `Tepat sekali! ${ho} padat dan berat sehingga tenggelam ke dasar air!`,
          feedbackIncorrect: `Benda yang berat dan padat akan langsung jatuh ke dasar air!`,
        };
      } else if (slotIdx === 23) {
        // Topic 24: Terang Siang Hari
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali ciri-ciri waktu siang hari yang disinari oleh matahari.`,
          skill: 'siklus_siang_malam',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Siklus Langit #${vIdx + 1}: Benda langit megah apakah yang menyinari bumi sehingga SIANG HARI menjadi terang benderang?`,
          visual: '☀️ 🌤️',
          choices: [
            { label: 'Matahari Terik Bersinar ☀️', isCorrect: true },
            { label: 'Bintang Berkelip Malam ⭐', isCorrect: false },
            { label: 'Bulan Sabit Gelap 🌙', isCorrect: false },
          ],
          feedbackCorrect: `Benar Kak Reza! Matahari adalah sumber cahaya utama di siang hari!`,
          feedbackIncorrect: `Matahari terbit di timur dan menyinari siang dengan terang!`,
        };
      } else {
        // Topic 25: Cahaya Malam Hari
        variant = {
          id: varId,
          categoryId: 4,
          slotIndex: slotIdx,
          topic: topicName,
          type: 'choice',
          learningGoal: `Mengenali benda langit pemancar cahaya lembut di waktu malam hari (bulan dan bintang).`,
          skill: 'siklus_siang_malam',
          cpElement: 'dasar_literasi_dan_steam',
          difficulty,
          prompt: `Bintang Kejora #${vIdx + 1}: Saat MALAM HARI langit menjadi gelap dan sejuk, benda langit apakah yang menghiasinya dengan cahaya indah?`,
          visual: '🌙 ⭐',
          choices: [
            { label: 'Bulan & Bintang Gemerlap 🌙✨', isCorrect: true },
            { label: 'Matahari Terik Panas ☀️', isCorrect: false },
            { label: 'Awan Putih Siang ☁️', isCorrect: false },
          ],
          feedbackCorrect: `Luar biasa pahlawan cilik! Bulan dan bintang menerangi malam yang damai!`,
          feedbackIncorrect: `Di malam hari kita melihat bulan sabit dan taburan bintang!`,
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
    id: 4,
    name: 'Kamis',
    title: 'Nalar & Logika',
    icon: '💡',
    badge: 'Sains & Pemecahan Masalah',
    desc: 'Klasifikasi, pengelompokan benda, perbandingan ukuran/bobot, hubungan sebab-akibat, dan pemecahan masalah konkret.',
    questions,
  };
}
