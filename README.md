# Undangan Pernikahan Naufal & Yulianti

Website undangan statis berbahasa Indonesia dengan tema romantic blush / Dusty Pink, ornamen floral, hitung mundur, peta, Google Calendar, kolase cerita cinta, galeri lightbox, dan formulir RSVP pratinjau.

## Detail acara yang tercantum
- Mempelai pria: Naufal Zain Susanto — Putra kedua dari Bapak Budi Susanto dan Ibu Teti Karyati.
- Mempelai wanita: Yulianti Effendi — Putri pertama dari Bapak Rustam Effendi dan Ibu Wiwin Winangsih.
- Akad: Minggu, 27 Desember 2026, pukul 08.00 WIB sampai selesai.
- Resepsi: Minggu, 27 Desember 2026, pukul 11.00–14.00 WIB.
- Tempat: BOEMI AOM, Jl. Ciledug No. 268B, Garut.

## Menjalankan secara lokal
1. Ekstrak ZIP.
2. Buka `index.html` di browser.
3. Koneksi internet diperlukan untuk Google Fonts, Google Maps, dan Google Calendar.

## Publikasi ke GitHub Pages
1. Buat/buka repositori GitHub.
2. Unggah **isi folder hasil ekstraksi** ke root repositori: `index.html`, `README.md`, `.gitignore`, dan folder `assets`.
3. Di Settings → Pages, pilih `Deploy from a branch`, branch `main`, folder `/(root)`.
4. Setelah terbit, buka website melalui URL HTTPS GitHub Pages.
5. Untuk pratinjau gambar saat link dibagikan ke WhatsApp, ubah nilai `og:image` pada `index.html` menjadi URL HTTPS absolut ke `assets/images/cover.jpg` pada domain website yang sudah terbit.

## Pengaturan yang perlu diketahui
- **RSVP belum tersambung ke penyimpanan online.** Formulir saat ini memberi tahu bahwa data hanya tersimpan pada browser/perangkat pengunjung. Untuk mengumpulkan jawaban tamu secara terpusat, isi `RSVP_ENDPOINT` dengan URL Web App Google Apps Script yang sudah dibuat dan diuji. Jangan mengisi dengan URL sembarang.
- **WhatsApp RSVP belum aktif sampai nomor tujuan diisi.** Pada bagian `=== PENGATURAN ===` di `index.html`, ganti `WA_NUMBER` dari `62XXXXXXXXXXX` menjadi nomor WhatsApp tujuan dalam format internasional tanpa `+` dan tanpa angka `0` awal.
- **Musik belum disertakan.** Untuk mengaktifkannya, tambahkan file MP3 yang Anda miliki hak/izinnya ke `assets/audio/wedding-music.mp3`. Tombol akan memberi pemberitahuan jika file belum ada.
- Data rekening dan alamat pengiriman hadiah belum tersedia, sehingga bagian tersebut tidak mengarang detail.
- Font web dimuat dari Google Fonts; fallback font disediakan jika layanan font tidak tersedia.
- Foto JPEG dioptimalkan untuk web dan metadata EXIF/GPS dihapus. Simpan file foto asli di komputer sebagai arsip.

## Catatan revisi ini
- Kolase Cerita Cinta Kami ditata ulang menjadi grid editorial responsif untuk enam foto.
- Paragraf cerita, doa, profil, dan bagian informasi diperbesar agar lebih mudah dibaca.
- Teks Arab QS. Ar-Rum: 21 dan QS. Al-Furqan: 74 ditampilkan dengan tipografi RTL. Periksa kembali ayat terhadap mushaf tepercaya sebelum publikasi.
- Ditambahkan tautan lewati ke konten, indikator fokus keyboard, dan penanganan pengaturan `prefers-reduced-motion`.
- Foto galeri tetap mendukung filter dan lightbox.

## Revisi tahap 6 — Cerita Cinta Kami
- Foto cerita kini berupa 6 foto portrait utuh (tanpa crop) yang digantung di tali emas dengan penjepit kayu: tali melengkung di desktop, dua baris tali (2 kolom × 3 baris) di HP.
- Animasi: foto "jatuh" tergantung saat bagian terlihat, lalu bergoyang pelan; charm hati berdenyut di tengah tali. Animasi mati otomatis untuk pengunjung dengan reduced motion.
- Foto bisa diketuk/diklik untuk membuka pratinjau besar (lightbox yang sama dengan galeri), juga lewat keyboard (Enter/Spasi).
- Aturan CSS kolase lama yang saling bertabrakan (47 baris) dihapus; kini hanya ada satu blok aturan kolase.
