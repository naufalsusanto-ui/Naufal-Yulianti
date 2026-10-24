# Template Undangan Pernikahan — Dusty Pink & Sentuhan Jawa

Versi pratinjau premium dengan dusty pink, blush, rosewood, tipografi editorial, bahasa Indonesia dengan sentuhan Jawa, foto prewedding sebagai media utama, serta kontrol musik.

## Status
**Frontend preview only.** Form RSVP dan ucapan bekerja lokal di browser untuk demonstrasi; belum tersambung ke Google Sheets atau Apps Script. Belum di-deploy ke GitHub Pages. Tanggal 1 Januari 2027 hanyalah contoh.

## Cara melihat
1. Ekstrak ZIP.
2. Jalankan server lokal dari folder:
   - `python -m http.server 8000`
   - Buka `http://localhost:8000`
3. Atau buka `index.html` langsung. Server lokal lebih baik untuk uji clipboard dan perilaku browser.

## Personalisasi
Buka `index.html`, cari `const WEDDING = {` di bagian akhir, lalu ubah nama mempelai/orang tua, tanggal dan jam, lokasi, tautan Maps, informasi hadiah, serta Apps Script URL nanti.

- Tanggal: `YYYY-MM-DD`
- Jam: `HH:MM` (contoh menggunakan WIB / `Asia/Jakarta`)
- `mapsUrl`: isi tautan Google Maps venue yang sebenarnya.
- `assets/audio/wedding-music.mp3`: tambahkan musik yang boleh digunakan.

## Foto prewedding
Letakkan foto milik sendiri dengan nama:
- `assets/images/cover.jpg`
- `assets/images/hero.jpg`
- `assets/images/groom.jpg`
- `assets/images/bride.jpg`
- `assets/images/gallery-1.jpg`
- `assets/images/gallery-2.jpg`
- `assets/images/gallery-3.jpg`
- `assets/images/gallery-4.jpg`

Cover dan hero memakai gambar sebagai background CSS. Foto pasangan dan galeri memakai placeholder otomatis bila file belum tersedia. Optimalkan foto menjadi WebP/JPEG dengan ukuran yang sesuai untuk web sebelum dipublikasikan.

## Integrasi dan deployment tahap berikutnya
1. Buat Google Sheet privat dengan tab RSVP dan tab PublicWishes terpisah.
2. Implementasikan Apps Script dengan validasi sisi server, mitigasi spam, idempotency, dan endpoint ucapan publik yang hanya mengirim pesan disetujui.
3. Uji komunikasi browser dengan Apps Script; jangan gunakan `no-cors` sebagai bukti bahwa RSVP tersimpan.
4. Konfigurasikan Apps Script URL di aplikasi.
5. Upload repository ke GitHub, aktifkan GitHub Pages, lalu uji URL produksi.
6. Jangan simpan kredensial rahasia atau data RSVP privat dalam repository publik.

## Catatan bahasa
Naskah menggunakan bahasa Indonesia dengan sentuhan bahasa Jawa krama sebagai contoh. Sebaiknya minta penutur Jawa yang dipercaya memeriksa pilihan tingkat tutur sebelum undangan resmi dibagikan.
