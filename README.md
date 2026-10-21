# ⚡ ABALA (Aplikasi Belajar Anak Lili Alpi)
> **PWA Mobile-First Edukasi Interaktif Berbasis Neurosains & AI — Khusus Kak Reza**

![ABALA Cover](/public/icons/icon-192.png)

**ABALA** adalah aplikasi web progresif (*Progressive Web App / PWA*) modern yang dirancang khusus untuk mendampingi tumbuh kembang anak usia dini (TK A & TK B, usia 4–6 tahun). Menggabungkan riset neurosains perkembangan anak, kurikulum internasional (Montessori, Singapore Math CPA, *Science of Reading*), dan kecerdasan buatan (*Natural Neural AI Voice*) dengan tema **Superhero Hitam & Merah yang nyaman di mata anak (*Clean Light Theme*)**.

---

## 🚀 Fitur Unggulan ABALA

### 1. 📱 Mobile-First PWA (Installable & 100% Offline-Ready)
* **Pas 1 Layar Penuh (`100dvh`):** Didesain ergonomis untuk jemari anak di layar sentuh ponsel dan tablet tanpa perlu *scroll*.
* **Install ke Layar Utama:** Dilengkapi Web App Manifest dan Service Worker (Workbox). Bisa di-install langsung di HP/tablet Android atau iOS tanpa kuota.
* **Tanpa Iklan (*100% Ad-Free*):** Lingkungan belajar yang aman, fokus, dan bebas distraksi.

### 2. 🎙️ Natural Neural AI Voice & Pustaka Media Realistis
* **Suara AI Ramah Bahasa Indonesia:** Terintegrasi dengan Natural AI Text-to-Speech yang memanggil *"Kak Reza"* secara personal dengan intonasi hangat.
* **Foto Asli Jelas (*High-Clarity Real Photos*):** Menampilkan gambar fotografi nyata (hewan asli, buah segar, kendaraan, rambu) untuk melatih persepsi visual konkret anak.
* **Pustaka Suara Hewan & Kendaraan Asli:** Mendengarkan suara meong kucing asli, raungan singa, sirine pemadam kebakaran, kereta api, hingga tetesan air hujan.

### 3. 🔄 Rotasi 6 Hari Belajar (2.700 Variasi Unik)
Masing-masing hari memiliki **15 slot soal**, dan setiap slot dibekali **30 variasi acak berbeda** (Total: **2.700 variasi**). Setiap kali diulang atau masuk minggu baru, materi otomatis ter-reset ke soal baru:

| Hari | Kategori Pembelajaran | Fokus Materi |
| :---: | :--- | :--- |
| **Hari 1** | 🔢 **Berhitung & Angka** | Kuantitas 1–5, perbandingan banyak vs sedikit, konsep kosong (0), ukuran, dan bentuk geometri. |
| **Hari 2** | 🔤 **Membaca & Fonik** | Huruf nama **`R - E - Z - A`**, vokal murni (`a, i, u, e, o`), suku kata terbuka (`BO-LA`, `RO-TI`), dan rima kata. |
| **Hari 3** | 👂 **Menyimak & Suara** | Suara hewan, sirine darurat, kereta api, suara alam, dan memori 2 instruksi bertingkat. |
| **Hari 4** | 💡 **Logika & Nalar** | Hubungan sebab-akibat, pasangan benda makan/pakaian, klasifikasi ganjil (*Odd One Out*), dan sains air. |
| **Hari 5** | 🔷 **Bentuk, Pola & Spasial** | Geometri dasar, pola warna/ukuran `AB`, posisi spasial (atas-bawah, dalam-luar, depan-belakang). |
| **Hari 6** | 🦸‍♂️ **Kemandirian & Superhero** | Kebiasaan sehat (cuci tangan, sikat gigi), merapikan mainan, kata ajaib (*tolong, maaf, terima kasih*). |

### 4. ⚡ Kuis Interaktif Cepat (Auto-Advance & Timer 18s)
* **2–3 Kartu Pilihan Taktil:** Bukan sekadar benar-salah biner, melainkan pilihan visual bergambar.
* **Auto-Advance Instan (Tanpa Tombol Lanjut):** Cukup tekan pilihan jawaban, suara langsung berucap *"Benar!"* atau *"Salah!"*, dan kuis otomatis meluncur ke soal berikutnya dalam 0,6 detik.
* **Timer Lembut 18 Detik:** Melatih ketangkasan berpikir tanpa membuat anak stres.
* **Evaluasi & Syarat 50%:** Jika nilai < 50%, sistem dengan ramah mengajak mengulang dengan variasi soal baru. Jika $\ge$ 50%, selebrasi konfeti dan membuka hari berikutnya.

### 5. 📊 Dashboard Orang Tua (*Parent Command Center*)
* **Radar 6 Pilar Belajar:** Memetakan tingkat penguasaan kompetensi anak secara visual.
* **Riwayat Latihan:** Mencatat skor, tanggal, dan tingkat ketuntasan setiap sesi.
* **Supabase Cloud Sync Ready:** Terintegrasi dengan database cloud Supabase untuk pemantauan multi-perangkat.

---

## 🛠️ Arsitektur Teknologi

```text
abala/
├── api/
│   ├── tts.js                   <-- Vercel Serverless Function: Natural Neural AI TTS
│   └── progress.js              <-- Vercel Serverless Function: Supabase Cloud Sync
├── public/
│   ├── manifest.webmanifest     <-- PWA Manifest
│   ├── favicon.ico              <-- Superhero App Icon
│   └── icons/                   <-- PWA Icons (192px, 512px, SVG)
├── src/
│   ├── components/
│   │   ├── Header.tsx           <-- Top Bar & Reza Avatar
│   │   ├── DaySelector.tsx      <-- 6 Hari Navigation Bar
│   │   ├── QuestionCard.tsx     <-- Kartu Soal & Gambar Realistis
│   │   ├── ChoicesGrid.tsx      <-- Tombol Pilihan Jawaban Taktil
│   │   ├── ResultModal.tsx      <-- Selebrasi Konfeti & Evaluasi 50%
│   │   └── ParentDashboardModal.tsx <-- Rapor & Analitik Tumbuh Kembang
│   ├── services/
│   │   ├── audioService.ts      <-- Synthesizer + Neural TTS + Real SFX
│   │   ├── mediaLibrary.ts      <-- Pustaka Gambar & Suara Realistis
│   │   └── supabaseService.ts   <-- Offline-First Local + Supabase Sync
│   ├── data/
│   │   └── dailyCurriculum.ts   <-- Bank 2.700 Variasi Soal
│   ├── types/index.ts           <-- TypeScript Contracts
│   ├── App.tsx                  <-- State Kuis & Interaktivitas
│   └── main.tsx                 <-- React Entry & Service Worker Register
├── schema.sql                   <-- Skrip Database Supabase
├── vercel.json                  <-- Konfigurasi Hosting Vercel
├── vite.config.ts               <-- Konfigurasi Vite & Vite-PWA Workbox
└── tailwind.config.js           <-- Tema Superhero Hitam & Merah (Light Theme)
```

---

## 🚀 Panduan Menjalankan & Deploy ke Vercel

### 1. Jalankan di Komputer Lokal (Local Dev)
```bash
# Pastikan dependensi terpasang
npm install

# Jalankan server lokal
npm run dev
```
Akses di browser: `http://localhost:3000`

### 2. Build Produksi PWA
```bash
npm run build
```
File siap saji ada di folder `dist/` lengkap dengan `sw.js` (Service Worker) dan `manifest.webmanifest`.

### 3. Deploy ke Vercel (Auto Deploy melalui GitHub)
1. Repository ini sudah terhubung ke GitHub: `https://github.com/alfyalfi/ABALA`.
2. Buka dashboard [Vercel](https://vercel.com/) $\rightarrow$ **Add New Project**.
3. Pilih repository **`ABALA`** dari akun GitHub Anda.
4. Klik **Deploy**!
5. (Opsional) Tambahkan Environment Variable di Vercel Settings jika ingin mengaktifkan Supabase:
   * `VITE_SUPABASE_URL`: URL project Supabase Anda
   * `VITE_SUPABASE_ANON_KEY`: Anon Public Key Supabase Anda
   * `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key Supabase Anda

---

## 👨‍👩‍👧 Didedikasikan Untuk
Dibuat dengan cinta untuk **Kak Reza**, pahlawan cilik cerdas kebanggaan keluarga! ⚡
*Maju terus, pantang menyerah, dan jadilah superhero kebaikan!*
