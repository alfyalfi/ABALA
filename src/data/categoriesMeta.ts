export interface CategoryMeta {
  id: number;
  dayName: string;
  dayLabel: string;
  title: string;
  fullTitle: string;
  icon: string;
  badge: string;
  color: string;
  badgeColor: string;
  description: string;
  focusElements: string[];
  cpElement: 'nilai_agama_dan_budi_pekerti' | 'jati_diri' | 'dasar_literasi_dan_steam';
}

export const CATEGORIES_META: CategoryMeta[] = [
  {
    id: 1,
    dayName: 'Senin',
    dayLabel: 'Senin — Matematika Superhero',
    title: 'Matematika Superhero',
    fullTitle: 'Senin — Matematika Superhero',
    icon: '🔢',
    badge: 'Bilangan & Numerasi',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'liquid-tint-azure',
    description: 'Bilangan, korespondensi satu-ke-satu, pola urutan, penjumlahan, pengurangan konkret, dan penalaran numerik sederhana.',
    focusElements: ['Membilang Benda 1–10', 'Subitizing Cepat', 'Penjumlahan Visual', 'Pengurangan Konkret', 'Pola Bilangan'],
    cpElement: 'dasar_literasi_dan_steam',
  },
  {
    id: 2,
    dayName: 'Selasa',
    dayLabel: 'Selasa — Membaca & Fonik',
    title: 'Membaca & Fonik',
    fullTitle: 'Selasa — Membaca & Fonik',
    icon: '🔤',
    badge: 'Literasi & Fonik',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'liquid-tint-emerald',
    description: 'Bunyi bahasa, pengenalan huruf, hubungan huruf-bunyi, suku kata, kosakata, dan penyusunan kata sesuai kesiapan anak.',
    focusElements: ['Huruf Vokal & Konsonan', 'Fonik Bunyi Kata', 'Suku Kata Awal', 'Menyusun Huruf (Word Builder)', 'Rima & Kosakata'],
    cpElement: 'dasar_literasi_dan_steam',
  },
  {
    id: 3,
    dayName: 'Rabu',
    dayLabel: 'Rabu — Menyimak & Suara',
    title: 'Menyimak & Suara',
    fullTitle: 'Rabu — Menyimak & Suara',
    icon: '👂',
    badge: 'Auditori & Menyimak',
    color: 'from-purple-500 to-fuchsia-600',
    badgeColor: 'liquid-tint-ruby',
    description: 'Diskriminasi auditori, pengenalan suara autentik hewan/alat transportasi, ingatan urutan 2-langkah, dan fokus pendengaran.',
    focusElements: ['Suara Hewan Autentik', 'Suara Kendaraan & Sirine', 'Bunyi Alam Sekitar', 'Instruksi 2-Langkah (Sequence)', 'Diskriminasi Suara Keras/Lembut'],
    cpElement: 'dasar_literasi_dan_steam',
  },
  {
    id: 4,
    dayName: 'Kamis',
    dayLabel: 'Kamis — Nalar & Logika',
    title: 'Nalar & Logika',
    fullTitle: 'Kamis — Nalar & Logika',
    icon: '💡',
    badge: 'Sains & Pemecahan Masalah',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'liquid-tint-amber',
    description: 'Klasifikasi, pengelompokan benda, perbandingan ukuran/bobot, hubungan sebab-akibat, dan pemecahan masalah konkret.',
    focusElements: ['Klasifikasi Fungsi & Ciri', 'Sebab-Akibat Sederhana', 'Benda yang Berbeda (Odd-One-Out)', 'Perbandingan Ukuran/Kuantitas', 'Analogi Konkret'],
    cpElement: 'dasar_literasi_dan_steam',
  },
  {
    id: 5,
    dayName: 'Jumat',
    dayLabel: 'Jumat — Bentuk & Spasial',
    title: 'Bentuk & Spasial',
    fullTitle: 'Jumat — Bentuk & Spasial',
    icon: '🔷',
    badge: 'Geometri & Spasial',
    color: 'from-cyan-500 to-sky-600',
    badgeColor: 'liquid-tint-azure',
    description: 'Bentuk geometris 2D, bentuk objek di sekitar kita, orientasi arah kiri/kanan/atas/bawah, dan relasi ruang.',
    focusElements: ['Bentuk Geometris Dasar', 'Bentuk Benda Nyata', 'Posisi Ruang (Atas/Bawah/Dalam)', 'Arah Kiri dan Kanan', 'Pola Visual Bentuk'],
    cpElement: 'dasar_literasi_dan_steam',
  },
  {
    id: 6,
    dayName: 'Sabtu',
    dayLabel: 'Sabtu — Kemandirian Superhero',
    title: 'Kemandirian Superhero',
    fullTitle: 'Sabtu — Kemandirian Superhero',
    icon: '🦸‍♂️',
    badge: 'Karakter & Jati Diri',
    color: 'from-rose-500 to-red-600',
    badgeColor: 'liquid-tint-rose',
    description: 'Rutinitas sehari-hari, kebersihan diri, keselamatan, pengenalan emosi, tanggung jawab, dan kebiasaan baik.',
    focusElements: ['Kebiasaan Cuci Tangan & Gigi', 'Mengenali Emosi Diri', 'Adab Makan, Belajar, & Tidur', 'Tanggung Jawab Mainan', 'Keselamatan & Tolong Menolong'],
    cpElement: 'jati_diri',
  },
];

export const SUNDAY_EXPLORATION_META = {
  id: 7,
  dayName: 'Minggu',
  dayLabel: 'Minggu — Eksplorasi Bebas Kak Reza',
  title: 'Eksplorasi Bebas',
  icon: '🌈',
  description: 'Hari Minggu santai! Mainkan kembali pilar favoritmu, hias kamar 3D, atau buka artefak dan trofi yang belum dikoleksi.',
};
