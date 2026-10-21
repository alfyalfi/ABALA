# Koleksi Materi Final Interaktif Kak Reza (`materi-final/`)

Setiap tahap menggunakan **1 file HTML *standalone self-contained*** bertema **Superhero & Pac-Man** khusus untuk **Kak Reza**, dengan desain **100% pas dalam 1 layar (`100dvh`) tanpa perlu *scroll* atas-bawah**.

---

## Struktur Folder (`materi-final/`)

```text
materi-final/
├── index.html                                                <-- Markas Utama & Navigator Seluruh Materi
├── README.md                                                 <-- Dokumentasi Materi Final
├── petualangan-harian-kak-reza.html                          <-- 🔥 MODUL HARIAN: 6 Hari Repetisi (Mulai Besok: Berhitung)
├── daily_curriculum_data.json                                <-- Bank Soal 6 Hari (360+ Variasi Acak)
├── tahap-1-tk-a-semester-1/
│   └── tahap-1-petualangan-15-soal-interaktif.html           <-- 1 File Standalone Grand Quest Semester 1
├── tahap-2-tk-a-semester-2/
├── tahap-3-tk-b-semester-1/
└── tahap-4-tk-b-semester-2/
```

---

## ⚡ Modul Latihan Harian Kak Reza (`petualangan-harian-kak-reza.html`)

Modul ini dirancang khusus untuk **rutinitas harian selama 6 hari seminggu (Senin–Sabtu)** dengan fitur:
- **15 Soal Interaktif Pilihan Visual Bergambar:** Setiap soal menyajikan pertanyaan interaktif dengan 2–3 kartu visual taktil (gambar, angka, kata) yang ramah anak.
- **Feedback Langsung "Benar!" atau "Salah!":** 
  - Jika jawaban tepat: Suara voice-over & notifikasi langsung berucap *"Benar! Hebat Kak Reza!"* + nada chime manis.
  - Jika belum tepat: Suara voice-over & notifikasi berucap *"Salah! Tetap semangat Kak Reza!"* + pilihan yang benar ditandai secara halus agar anak belajar.
- **Tetap Otomatis Lanjut (Auto-Advance Instan):** Baik jawaban benar maupun salah, kuis **tetap otomatis meluncur ke soal berikutnya** (dalam jeda 0,6 detik) tanpa memerlukan tombol konfirmasi atau tombol lanjut.
- **Timer & Timeout 18 Detik per Soal:** Indikator bar lembut di atas kartu. Jika waktu habis, sistem berucap *"Waktu habis! Lanjut ya Kak Reza!"* lalu otomatis berpindah ke soal berikutnya.
- **2.700 Variasi Unik (30 Variasi Unik per Soal!):** Setiap hari memiliki 15 slot soal dengan masing-masing **30 variasi acak**. Ketika diulang atau masuk minggu baru, materi otomatis ter-reset ke variasi soal yang benar-benar berbeda.
- **Evaluasi Skor Akhir & Syarat Tuntas 50%:** Di akhir sesi terdapat kalkulasi detail: Berapa Benar, Berapa Salah, dan persentase skor.
  - Jika nilai < 50% (di bawah 8 benar): Aplikasi menyemangati dan meminta mengulang kembali hari tersebut dengan variasi baru.
  - Jika >= 50% (8 ke atas): Selebrasi konfeti warna-warni dan pujian tuntas.

### Jadwal 6 Hari Pelajaran:
1. **Hari 1 (Besok Dimulai!):** 🔢 **Berhitung & Angka** (Kuantitas 1–5, perbandingan banyak-sedikit, bentuk dasar).
2. **Hari 2:** 🔤 **Membaca & Huruf** (Vokal A-I-U-E-O, huruf nama REZA, fonik kata).
3. **Hari 3:** 👂 **Menyimak & Suara** (Tebak suara hewan, sirine kendaraan, alam, memori kerja).
4. **Hari 4:** 💡 **Logika & Nalar** (Sebab-akibat, pasangan benda, klasifikasi ganjil/odd-one-out, sains sederhana).
5. **Hari 5:** 🔷 **Bentuk, Pola & Spasial** (Geometri dasar, pola warna/ukuran AB, atas-bawah, dalam-luar).
6. **Hari 6:** 🦸‍♂️ **Kemandirian & Superhero** (Kebiasaan sehat, cuci tangan, sikat gigi, sopan santun, mental juara).

---

## Daftar 15 Misi Interaktif Tahap 1 — Khusus Kak Reza

1. **Misi 1 (🕹️ Jalur Pac-Man & Huruf R):** Menggeser Pac-Man makan semua titik kuning secara berurutan sampai menyentuh huruf **`R`** di ujung kanan (100% harus sampai ujung baru selesai).
2. **Misi 2 (🔤 Menyusun Huruf Nama `R-E-Z-A`):** Mengetuk huruf **`R`**, **`E`**, **`Z`**, **`A`** secara berurutan untuk menyusun nama **REZA**.
3. **Misi 3 (🔤 Mengenal Huruf Vokal `A` & Benda):** Mengenal huruf **`A`** dan memilih benda **`A - Apel`** 🍎.
4. **Misi 4 (🔤 Mengenal Huruf `B` & Kata `BOLA`):** Mencocokkan huruf **`B`** dan kata **`BO-LA`** dengan benda **Bola** ⚽.
5. **Misi 5 (📖 Mengenal Kata `RO-TI`):** Mengenali kata **`RO-TI`** (berawalan `R` seperti Reza) dan memilih gambar **Roti** 🍞.
6. **Misi 6 (🔢 Menghitung Mobil Balap `1–3`):** Menyentuh 3 Mobil Balap 🏎️ satu per satu lalu memilih lambang **Angka `3`**.
7. **Misi 7 (🔢 Mengenal Lambang Angka `4`):** Mencocokkan lambang **Angka `4`** pada perisai biru dengan **4 Bintang Energi** ⭐⭐⭐⭐.
8. **Misi 8 (🔢 Mengenal Lambang Angka `5`):** Menghitung 5 Roket 🚀 dan memilih simbol **Angka `5`**.
9. **Misi 9 (🔢 Melengkapi Urutan Angka `1 - 2 - 3 - [?] - 5`):** Menemukan angka **`4`** yang hilang dalam urutan 1 sampai 5.
10. **Misi 10 (🔢 Membandingkan Jumlah Koin Emas Pac-Man):** Memilih kotak dengan jumlah koin emas **paling banyak** (**5 Koin** 🪙).
11. **Misi 11 (🚒 Mengenal Kendaraan & Suara Sirine):** Mendengar suara sirine *"Ninu-Ninu!"* dan mengenali **Mobil Pemadam Kebakaran** 🚒.
12. **Misi 12 (🦁 Mengenal Hewan & Suaranya):** Mendengar suara kucing dan mengenali hewannya 🐱.
13. **Misi 13 (🦸‍♂️ Misi 2 Benda Berurutan):** Mengingat dan menyentuh 2 perlengkapan Superhero secara berurutan (**1. Topi Helm ⛑️ $\rightarrow$ 2. Sepatu 👟**).
14. **Misi 14 (🛡️ Mengenal Fungsi Benda):** Memilih benda pelindung saat hujan turun (**Payung** ☂️).
15. **Misi 15 (🟡 Mengenal Bentuk & Benda Bulat):** Mencocokkan bentuk **Bulat Lingkaran** seperti Pac-Man dengan **Roda Ban Mobil** 🛞.
