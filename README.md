# Undangan Pernikahan Naufal & Yulianti

Website undangan statis berbahasa Indonesia dengan tema romantic blush / Dusty Pink, ornamen floral, hitung mundur, peta, Google Calendar, kolase cerita cinta, galeri lightbox, dan formulir RSVP yang dapat dihubungkan ke Google Sheets.

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

## Mengaktifkan RSVP online ke Google Sheets
File Apps Script siap pakai ada di `google-apps-script/Code.gs`. RSVP online belum aktif sampai Anda melakukan langkah berikut:

1. Buat/buka Google Spreadsheet khusus daftar RSVP.
2. Dari spreadsheet, pilih **Ekstensi → Apps Script**.
3. Ganti kode contoh di editor dengan seluruh isi file `google-apps-script/Code.gs`, lalu **Simpan**. Script akan membuat tab bernama `RSVP` dan baris judul secara otomatis saat kiriman pertama diterima.
4. Pilih **Deploy/Deploy Baru → Web app**. Atur **Execute as/Jalankan sebagai: Me/Saya** dan **Who has access/Siapa yang memiliki akses: Anyone/Siapa saja** agar tamu tidak perlu login. Tinjau izin Google dan kebijakan privasi sebelum menerbitkan.
5. Tekan **Deploy**, salin URL Web App yang berakhiran `/exec` (bukan URL editor atau `/dev`). Jika kode diubah nanti, buat deployment versi baru atau perbarui deployment yang sudah ada.
6. Buka `index.html`, cari `const RSVP_ENDPOINT=''`, lalu tempel URL `/exec` di antara tanda petik tunggal. Contoh: `const RSVP_ENDPOINT='https://script.google.com/macros/s/ID_DEPLOYMENT/exec';` Simpan lalu unggah ulang file ke GitHub Pages.
7. Uji melalui situs yang sudah terbit dengan satu kiriman percobaan, kemudian pastikan baris baru benar-benar muncul di tab `RSVP`. Hapus data uji setelah selesai.

**Catatan penting:** Web App publik dapat menerima kiriman dari siapa saja yang mengetahui URL. Jangan menyimpan data sensitif di sheet ini, batasi akses spreadsheet hanya untuk pengelola, dan jangan bagikan tautan spreadsheet kepada tamu. Browser menggunakan mode pengiriman yang tidak dapat membaca respons server; setelah menekan kirim, pesan di situs meminta Anda memeriksa sheet untuk memastikan kiriman masuk. Data ucapan yang tampil pada buku tamu situs tetap lokal pada browser/perangkat tersebut, bukan daftar ucapan online bersama.
- **WhatsApp RSVP belum aktif sampai nomor tujuan diisi.** Pada bagian `=== PENGATURAN ===` di `index.html`, ganti `WA_NUMBER` dari `62XXXXXXXXXXX` menjadi nomor WhatsApp tujuan dalam format internasional tanpa `+` dan tanpa angka `0` awal.
- **Musik:** file `assets/audio/wedding-music.mp3` belum tersedia dalam arsip ini. Untuk mengaktifkannya, tambahkan file MP3 yang Anda miliki hak/izinnya dengan nama tersebut.
- Rekening dan alamat pengiriman hadiah mengikuti data yang telah dimasukkan pada halaman; periksa kembali sebelum publikasi.
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

## Revisi tahap 7
- Header navigasi: monogram N&Y berbingkai emas, nama + tanggal, tautan huruf kapital dengan garis emas pada menu aktif, tombol "Konfirmasi Hadir" ber-ring emas berkilau, garis emas dengan hati di bawah header, bayangan halus saat halaman digulir. Di bawah 1180px menu berubah menjadi tombol hamburger yang berubah jadi X dan panel menu serif italic.
- Hadiah: rekening BCA (logo `assets/images/bca-logo.svg`) dengan tombol Salin, dan alamat pengiriman beserta tombol Salin alamat dan Buka di Maps.
- Logo BCA di `assets/images/bca-logo.svg` adalah versi sederhana; ganti dengan logo resmi bernama sama (boleh .svg) bila ada.
- Musik: letakkan file MP3 di assets/audio/wedding-music.mp3 (file ini tidak ada di arsip V2.rar).


## Revisi tahap 8 — RSVP
- Form RSVP mempertahankan tampilan yang ada, validasi nama/jumlah tamu, dan buku tamu lokal.
- Ditambahkan Apps Script `google-apps-script/Code.gs` untuk menyimpan timestamp, nama, kehadiran, jumlah tamu, ucapan, izin tampil, dan ID kiriman ke tab `RSVP`.
- Endpoint online tetap kosong secara default agar situs tidak mengklaim data sudah terkirim sebelum pemilik mengatur dan menguji deployment sendiri.
