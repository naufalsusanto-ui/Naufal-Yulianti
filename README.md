# Undangan Pernikahan Naufal & Yulianti

Template website undangan pernikahan dengan tema dusty pink dan Bahasa Indonesia.

## Data acara dari PDF
- Mempelai pria: Naufal Zain Susanto
- Orang tua mempelai pria: Bapak Budi Susanto dan Ibu Teti Karyati
- Mempelai wanita: Yulianti Effendi
- Orang tua mempelai wanita: Bapak Rustam Effendi dan Ibu Wiwin Winangsih
- Hari/tanggal: Minggu, 27 Desember 2026
- Akad nikah: 08.00 WIB sampai selesai
- Resepsi: 11.00–14.00 WIB
- Tempat: Boemi AOM, Jl. Ciledug No. 268B, Garut

## Cara unggah ke GitHub Pages
Unggah isi folder ini ke root repositori `Naufal-Yulianti`, sehingga `index.html` terlihat langsung di halaman utama repositori. Pastikan GitHub Pages memakai branch `main` dan folder `/(root)`.

## Foto
Foto sampul dan galeri diambil dari PDF undangan yang diberikan:
- `assets/images/cover.jpg`
- `assets/images/gallery-1.jpg` sampai `gallery-4.jpg`

Template profil mempelai mencari file `assets/images/groom.jpg` dan `assets/images/bride.jpg`. Jika ingin foto terpisah untuk tiap mempelai, tambahkan kedua file tersebut.

## Musik
Untuk musik latar, tambahkan file `assets/audio/wedding-music.mp3`. Folder audio belum berisi musik karena file musik tidak disertakan dalam PDF.

## Informasi hadiah
Nomor rekening dan alamat pengiriman hadiah tidak tercantum pada PDF, sehingga bagian ini ditandai sebagai informasi menyusul. Isi setelah data yang benar tersedia.

## RSVP
Formulir RSVP masih berupa pratinjau di browser. Jawaban tidak tersimpan ke Google Sheets atau server. Perlu integrasi terpisah jika ingin mengumpulkan konfirmasi tamu secara daring.

## Konfigurasi
Data utama dapat diedit pada objek `const WEDDING` di bagian bawah `index.html`.
