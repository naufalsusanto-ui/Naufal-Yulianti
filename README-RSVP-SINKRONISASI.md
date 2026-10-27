# Pembaruan RSVP dan Buku Tamu Online

## Isi
- `index.html`: website dengan URL Web App dipasang dan buku tamu memuat ucapan publik dari Google Sheets.
- `google-apps-script/Code.gs`: Apps Script untuk menerima RSVP dan mengirimkan kembali ucapan yang mendapat izin publikasi.

## Pasang Apps Script
1. Buka Google Spreadsheet tujuan, lalu **Ekstensi > Apps Script**. Pastikan project terikat pada spreadsheet itu.
2. Ganti isi `Code.gs` dengan file `google-apps-script/Code.gs`, lalu simpan. Jangan menambahkan fungsi `doPost` kedua.
3. Klik **Deploy > Manage deployments**. Pada deployment Web app, klik ikon pensil **Edit**, pilih **New version**, **Execute as: Me**, dan akses **Anyone** jika pilihan tersebut tersedia. Klik **Deploy**.
4. Salin URL Web app yang berakhir `/exec`. Pastikan URL diawali `https://script.google.com/macros/s/` (bukan `/macros/library/` dan tidak perlu `/u/1/`). Jika URL hasil deployment berbeda dari URL di `index.html`, ganti nilai `RSVP_ENDPOINT` di `index.html` dengan URL `/exec` yang baru.
5. Tes URL `/exec` dengan membukanya langsung. Seharusnya terlihat teks `RSVP Web App aktif...`. Untuk tes buku tamu, buka URL dengan `?action=wishes` (hasil JSON) atau website (yang memanggil endpoint JSONP).
6. Commit/push `index.html` ke repositori GitHub Pages. Pertahankan folder `assets` seperti semula.

## Cara kerja
- RSVP disimpan ke tab `RSVP`, dengan kolom A-G sesuai header.
- Buku tamu website hanya menampilkan ucapan dengan kolom **Izinkan Tampilkan Ucapan** bernilai `Ya` dan pesan tidak kosong.
- Kiriman RSVP menggunakan `fetch` mode `no-cors`, jadi browser tidak bisa membaca balasan POST; verifikasi keberhasilan dengan mengecek baris baru pada Google Sheets.
- Uji pertama dengan data contoh. Hapus baris tes secara manual sebelum undangan disebarkan luas.

## Catatan URL
URL `/exec` yang dipasang berdasarkan screenshot deployment. Jika URL resmi pada dialog **Manage deployments** berbeda satu karakter pun, salin URL dari dialog tersebut dan ganti di `index.html`.
