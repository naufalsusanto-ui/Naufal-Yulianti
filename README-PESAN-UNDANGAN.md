# Pengelola pesan WhatsApp tamu

Buka [halaman pengelola](./send-invitations.html) saat sudah dipublikasikan melalui GitHub Pages.

## Format daftar

Ekspor tab tamu bertoken dari Google Sheets sebagai CSV dengan header:

- Wajib: `token`, `nama`
- Opsional: `sapaan`, `whatsapp`, `status_pengiriman`

Kolom spreadsheet yang umum dapat dipetakan saat ekspor/duplikasi menjadi format tersebut. Contoh nomor harus memakai format internasional tanpa `+`, seperti `62812…`. CSV hanya dibaca di browser pengelola; data tidak dimasukkan ke repositori atau dikirim ke server oleh halaman ini. Hanya impor daftar yang berisi tamu yang sudah punya token.

## Alur pengiriman

1. Buka halaman pengelola dan pilih CSV.
2. Periksa alamat dasar undangan. Tautan personal dibuat dengan parameter `?token=...`.
3. Klik **Buka WhatsApp Web** pada satu tamu. Pesan akan terbuka sebagai draf untuk nomor tamu. Halaman hanya mengaktifkan tombol status setelah tautan WhatsApp dibuka.
4. Kirim pesan secara manual di WhatsApp. Kembali ke halaman ini dan klik **Sudah saya kirim**.
5. Setelah selesai, unduh CSV status dan impor/perbarui kolom `status_pengiriman` di Google Sheets. Status tidak disimpan permanen di halaman.

Halaman ini tidak mengirim pesan, tidak mengakses Google Sheets secara langsung, dan tidak menyimpan daftar di browser. Membuka WhatsApp hanya menyiapkan draf; pengguna tetap menekan tombol Kirim di WhatsApp. Jangan publikasikan CSV, tangkapan layar daftar, atau URL token di repositori. Tautan bertoken bersifat privat bagi penerimanya.

Nomor RSVP yang dipakai pada undangan tetap:
- Pihak pria: `628980956582`
- Pihak wanita: `6288808244271`
