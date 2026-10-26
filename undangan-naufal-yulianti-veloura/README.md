# Undangan Pernikahan Naufal & Yulianti — Veloura Inspired

Template website statis, Bahasa Indonesia, dengan tampilan editorial romantic blush, ornamen floral SVG, animasi halus, galeri lightbox, hitung mundur, Google Maps, Google Calendar, serta formulir RSVP demo.

## Data acara
- Mempelai pria: Naufal Zain Susanto
- Orang tua pria: Bapak Budi Susanto & Ibu Teti Karyati
- Mempelai wanita: Yulianti Effendi
- Orang tua wanita: Bapak Rustam Effendi & Ibu Wiwin Winangsih
- Akad: Minggu, 27 Desember 2026, pukul 08.00 WIB sampai selesai
- Resepsi: Minggu, 27 Desember 2026, pukul 11.00–14.00 WIB
- Tempat: BOEMI AOM, Jl. Ciledug No. 268B, Garut

## Menjalankan lokal
1. Ekstrak ZIP.
2. Buka folder `undangan-naufal-yulianti-veloura`.
3. Klik dua kali `index.html` untuk melihat di browser.

## Memasang ke GitHub Pages
Unggah **isi folder ini** ke root repositori (`index.html`, `README.md`, `.gitignore`, dan folder `assets`). Jangan unggah folder pembungkusnya sebagai folder satu tingkat di dalam repositori. Pada GitHub, buka Settings → Pages, pilih `Deploy from a branch`, branch `main`, folder `/(root)`.

## Catatan fungsi
- RSVP disimpan pada `localStorage` browser lokal saja. Formulir belum terhubung ke Google Sheets atau database online, sehingga jawaban tidak terkirim ke pemilik undangan dari perangkat tamu.
- Musik memakai jalur `assets/audio/wedding-music.mp3`; tambahkan file MP3 yang memiliki izin penggunaan untuk mengaktifkan tombol musik. Folder audio berisi README petunjuk.
- Data rekening dan alamat pengiriman hadiah tidak tersedia di PDF sumber, jadi tampil sebagai catatan untuk dilengkapi, bukan data rekaan.
- Foto yang digunakan berasal dari foto yang tersedia bersama materi undangan; profil memakai crop foto pasangan karena materi yang diberikan tidak menyertakan foto studio individual yang terpisah.
- Font Google akan tampil jika internet tersedia; fallback font lokal disediakan.

## Revisi ornamen tengah
- Posisi garland bunga kini benar-benar terpusat. Animasi hanya menggerakkan ornamen pada sumbu vertikal, sehingga tidak terjadi pergeseran ganda ke kiri.
- Ukuran garland mengikuti lebar layar desktop dan HP.

## Revisi ornamen meriah & megah
- Tirai sutra tembus pandang (dua gaya, bergantian arah) menggantung di dasar tiap bagian.
- Kilau emas berkelip dan bokeh cahaya di Beranda, Hitung Mundur, Hadiah, dan Penutup.
- Sulur bunga di tepi kiri/kanan khusus layar lebar (≥1240px), memanfaatkan ruang margin sehingga tidak menimpa konten.
- Penempatan sudut bunga diatur per ukuran layar (HP, tablet, desktop) dengan ruang napas di atas/bawah judul agar teks tetap terbaca.
- Semua animasi berhenti bila pengunjung memilih "kurangi gerakan".

- Foto galeri kini berbingkai tipis emas dengan kuntum mawar dan daun di dua sudut diagonal (arah berganti antar foto); bingkai bersinar halus saat disentuh atau disorot kursor.

- Kelopak jatuh kini beragam: kelopak mawar, bunga putih kecil, daun sage, dan keping emas dengan tiga lapis kedalaman (jauh buram, dekat jelas), meliuk sambil berputar. Jumlah partikel menyesuaikan layar (14/22/30), berhenti saat tab tidak aktif dan saat memilih kurangi gerakan.

- Monogram N & Y di cover dan penutup kini berupa segel dengan karangan mawar melingkar dan cincin emas; karangan berputar sangat pelan dan cakram tengah berkilau halus.
