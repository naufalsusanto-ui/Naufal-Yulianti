/**
 * RSVP PERNIKAHAN NAUFAL & YULIANTI — TOKEN UNDANGAN (versi perbaikan)
 *
 * Perubahan dari versi sebelumnya:
 * - Health check menampilkan "version" sehingga mudah memastikan deployment sudah versi terbaru.
 * - Pencarian token memakai teks yang tampil di sel (getDisplayValues) agar token/ID tidak rusak
 *   bila Google Sheets menganggapnya angka (mis. 7.93E+08).
 * - Kolom ID Undangan dan Token diformat sebagai teks biasa.
 * - Fungsi tesTokenDariEditor() untuk mengetes satu token langsung dari editor Apps Script.
 *
 * Setup:
 * 1. Buka spreadsheet yang terhubung dengan Apps Script.
 * 2. Ganti kode lama dengan kode ini, simpan.
 * 3. Jalankan setupUndanganSheet() sekali dan izinkan akses.
 * 4. Isi sheet Undangan: Nama Penerima, Tipe, Maksimal Tamu.
 * 5. Jalankan generateTokenUndangan() untuk membuat token dan link.
 * 6. Deploy > Manage deployments > ikon pensil > Version: New version > Deploy.
 *    (Execute as: Me, Who has access: Anyone.)
 * 7. Buka URL /exec?action=health. Pastikan tampil "version" yang sama dengan CONFIG.VERSION di bawah.
 *
 * Tipe yang didukung: Individu atau Keluarga.
 */
const CONFIG = Object.freeze({
  VERSION: '2026-11-02-token-status',
  SHEET_NAME: 'RSVP',
  INVITATION_SHEET: 'Undangan',
  SITE_URL: 'https://naufalsusanto-ui.github.io/Naufal-Yulianti/',
  MAX_NAME_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 500,
  DEFAULT_MAX_GUESTS: 1,
  ABSOLUTE_MAX_GUESTS: 10,
  MAX_PUBLIC_WISHES: 30,
  MAX_ROWS_TO_SCAN: 500,
  LOCK_TIMEOUT_MS: 15000
});
const RSVP_HEADERS = [
  'Timestamp', 'Nama', 'Kehadiran', 'Jumlah Tamu',
  'Ucapan dan Doa', 'Izinkan Tampilkan Ucapan',
  'ID Pengiriman', 'ID Undangan', 'Token'
];
const INVITATION_HEADERS = [
  'ID Undangan', 'Nama Penerima', 'Tipe', 'Maksimal Tamu',
  'Token', 'Link Undangan', 'Status', 'Status RSVP',
  'Jumlah Hadir', 'Waktu RSVP', 'Catatan', 'Sapaan'
];

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || 'health').trim().toLowerCase();
  try {
    if (action === 'health') {
      return respond_(params.callback, {ok:true, service:'RSVP Pernikahan Naufal & Yulianti', status:'aktif', tokenSystem:true, version:CONFIG.VERSION});
    }
    if (action === 'guest') {
      const token = normalizeToken_(params.token);
      const guest = findGuestByToken_(token);
      if (!guest || guest.status === 'Nonaktif') {
        return respond_(params.callback, {ok:false, error:'Token undangan tidak valid atau sudah dinonaktifkan.'});
      }
      return respond_(params.callback, {ok:true, guest:{
        id:guest.id, name:guest.name,
        salutation:guest.salutation,
        displayName: buildDisplayName_(guest),
        type:guest.type, maxGuests:guest.maxGuests
      }});
    }
    if (action === 'wishes') {
      return respond_(params.callback, {ok:true, wishes:getPublicWishes_(getOrCreateRsvpSheet_())});
    }
    return respond_(params.callback, {ok:false, error:'Action tidak dikenal.'});
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return respond_(params.callback, {ok:false, error:String(err && err.message ? err.message : err)});
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let acquired = false;
  try {
    lock.waitLock(CONFIG.LOCK_TIMEOUT_MS); acquired = true;
    if (!e || !e.postData || !e.postData.contents) throw new Error('Data RSVP kosong.');
    let payload;
    try { payload = JSON.parse(e.postData.contents); } catch (_) { throw new Error('Format JSON tidak valid.'); }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Payload RSVP tidak valid.');

    const token = normalizeToken_(payload.token);
    if (!token) throw new Error('Token undangan wajib ada. Buka link undangan personal.');
    const guest = findGuestByToken_(token);
    if (!guest || guest.status === 'Nonaktif') throw new Error('Token undangan tidak valid atau sudah dinonaktifkan.');

    const attendance = String(payload.attendance || '').trim();
    if (!['Hadir','Tidak dapat hadir'].includes(attendance)) throw new Error('Pilihan kehadiran tidak valid.');
    const name = guest.name; // nama bersumber dari database, bukan nama kiriman browser
    const message = String(payload.message || '').trim().slice(0, CONFIG.MAX_MESSAGE_LENGTH);
    const show = parseBoolean_(payload.show) && message.length > 0;
    let guests = 0;
    if (attendance === 'Hadir') {
      guests = Number(payload.guests === undefined || payload.guests === null || payload.guests === '' ? 1 : payload.guests);
      if (!Number.isInteger(guests) || guests < 1 || guests > guest.maxGuests) {
        throw new Error('Jumlah tamu harus antara 1 dan batas undangan (' + guest.maxGuests + ').');
      }
    }

    const sheet = getOrCreateRsvpSheet_();
    const requestId = Utilities.getUuid();
    sheet.appendRow([
      new Date(), safeCell_(name), attendance, guests, safeCell_(message),
      show ? 'Ya' : 'Tidak', requestId, guest.id, token
    ]);
    updateGuestRsvp_(guest.row, attendance, guests, new Date());
    return jsonResponse_({ok:true, message:'RSVP berhasil disimpan.', id:requestId});
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return jsonResponse_({ok:false, error:String(err && err.message ? err.message : err)});
  } finally {
    if (acquired) lock.releaseLock();
  }
}

/** Jalankan satu kali untuk membuat sheet Undangan beserta header. */
function setupUndanganSheet() {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(CONFIG.INVITATION_SHEET);
  if (!sh) sh = ss.insertSheet(CONFIG.INVITATION_SHEET);
  if (sh.getLastRow() === 0) {
    sh.getRange(1,1,1,INVITATION_HEADERS.length).setValues([INVITATION_HEADERS]);
  } else {
    // Preserve existing invitation data and append only missing headers.
    const existingHeaders = sh.getRange(1,1,1,Math.max(sh.getLastColumn(),1)).getDisplayValues()[0];
    const greetingIndex = existingHeaders.findIndex(h => String(h).trim().toLowerCase() === 'sapaan');
    if (greetingIndex === -1) {
      const targetCol = Math.max(sh.getLastColumn() + 1, 12);
      sh.getRange(1,targetCol).setValue('Sapaan');
    }
  }
  sh.setFrozenRows(1);
  sh.getRange(1,1,1,INVITATION_HEADERS.length).setFontWeight('bold');
  setTextColumns_(sh);
  sh.autoResizeColumns(1, INVITATION_HEADERS.length);
  getOrCreateRsvpSheet_();
  return 'Sheet Undangan dan RSVP siap.';
}

/**
 * Isi kolom B (Nama Penerima), C (Individu/Keluarga), D (Maksimal Tamu).
 * Jalankan fungsi ini setelah data diisi. Token hanya dibuat untuk baris yang belum memilikinya.
 */
function generateTokenUndangan() {
  const sh = getInvitationSheet_();
  const last = sh.getLastRow();
  if (last < 2) throw new Error('Isi daftar tamu di sheet Undangan terlebih dahulu.');
  setTextColumns_(sh);
  const range = sh.getRange(2,1,last-1,INVITATION_HEADERS.length);
  const rows = range.getValues();
  const shown = range.getDisplayValues(); // teks apa adanya di sel (aman untuk ID dan token)
  const existing = new Set(shown.map(r => String(r[4] || '').trim()).filter(Boolean));
  let created = 0;
  rows.forEach((r, i) => {
    const name = String(r[1] || '').trim();
    if (!name) return;
    let type = String(r[2] || 'Individu').trim();
    if (!['Individu','Keluarga'].includes(type)) type = 'Individu';
    let maxGuests = Number(r[3] || (type === 'Keluarga' ? 4 : 1));
    if (!Number.isInteger(maxGuests) || maxGuests < 1) maxGuests = type === 'Keluarga' ? 4 : 1;
    maxGuests = Math.min(maxGuests, CONFIG.ABSOLUTE_MAX_GUESTS);
    let id = String(shown[i][0] || '').trim();
    if (!id) id = Utilities.getUuid().slice(0,8).toUpperCase();
    let token = String(shown[i][4] || '').trim();
    if (!token) {
      do { token = Utilities.getUuid().replace(/-/g,'') + Utilities.getUuid().replace(/-/g,'').slice(0,8); } while (existing.has(token));
      existing.add(token); created++;
    }
    const link = CONFIG.SITE_URL + '?token=' + encodeURIComponent(token);
    if (!r[6]) r[6] = 'Aktif';
    r[0]=id; r[1]=name; r[2]=type; r[3]=maxGuests; r[4]=token; r[5]=link;
    rows[i]=r;
  });
  range.setValues(rows);
  sh.autoResizeColumns(1, INVITATION_HEADERS.length);
  return 'Selesai. Token baru dibuat: ' + created + '. Link tersimpan di kolom F.';
}

/**
 * TES DARI EDITOR: ganti TOKEN_TES dengan token dari kolom E, lalu jalankan fungsi ini.
 * Hasilnya muncul di Execution log. Fungsi ini sama dengan yang dipanggil website.
 */
function tesTokenDariEditor() {
  const TOKEN_TES = '00397a9e3b9b4c2ba14da37017385afe413b48ab';
  const token = normalizeToken_(TOKEN_TES);
  if (!token) { Logger.log('Format token tidak valid (harus 20-100 karakter huruf/angka).'); return 'Format token tidak valid'; }
  const guest = findGuestByToken_(token);
  if (!guest) { Logger.log('TOKEN TIDAK DITEMUKAN di sheet "' + CONFIG.INVITATION_SHEET + '" kolom E.'); return 'Token tidak ditemukan'; }
  const hasil = {nama: guest.name, tampil: buildDisplayName_(guest), tipe: guest.type, maksimalTamu: guest.maxGuests, status: guest.status, baris: guest.row};
  Logger.log(JSON.stringify(hasil));
  return hasil;
}

function setTextColumns_(sh) {
  const rows = Math.max(sh.getMaxRows() - 1, 1);
  sh.getRange(2,1,rows,1).setNumberFormat('@'); // ID Undangan
  sh.getRange(2,5,rows,1).setNumberFormat('@'); // Token
}
function getInvitationSheet_() {
  const sh = getSpreadsheet_().getSheetByName(CONFIG.INVITATION_SHEET);
  if (!sh) throw new Error('Sheet Undangan belum ada. Jalankan setupUndanganSheet() dahulu.');
  return sh;
}
function findGuestByToken_(token) {
  if (!token) return null;
  const sh = getInvitationSheet_();
  const last = sh.getLastRow();
  if (last < 2) return null;
  const rows = sh.getRange(2,1,last-1,INVITATION_HEADERS.length).getDisplayValues();
  for (let i=0;i<rows.length;i++) {
    if (String(rows[i][4] || '').trim() === token) {
      const type = String(rows[i][2] || 'Individu').trim() || 'Individu';
      const max = Number(rows[i][3] || 1);
      return {
        row:i+2, id:String(rows[i][0] || '').trim(), name:String(rows[i][1] || '').trim(),
        type:type, maxGuests:Math.max(1,Math.min(Number.isInteger(max)?max:1,CONFIG.ABSOLUTE_MAX_GUESTS)),
        status:String(rows[i][6] || 'Aktif').trim() || 'Aktif',
        salutation:String(rows[i][11] || '').trim()
      };
    }
  }
  return null;
}
function buildDisplayName_(guest) {
  const name = String(guest.name || '').trim();
  const salutation = String(guest.salutation || '').trim();
  if (!salutation) return guest.type === 'Keluarga' ? name + ' & Keluarga' : name;

  // Avoid duplicated titles, e.g. "Ibu Ibu Siti" or "Bapak Bapak Ahmad".
  const normalizedName = name.toLocaleLowerCase('id-ID');
  const normalizedSalutation = salutation.toLocaleLowerCase('id-ID');
  const alreadyPrefixed = normalizedName === normalizedSalutation ||
    normalizedName.startsWith(normalizedSalutation + ' ');
  const base = alreadyPrefixed ? name : salutation + ' ' + name;
  return guest.type === 'Keluarga' ? base + ' & Keluarga' : base;
}

function updateGuestRsvp_(row, attendance, guests, timestamp) {
  const sh = getInvitationSheet_();
  sh.getRange(row,8,1,3).setValues([[attendance, guests, timestamp]]);
}

function getPublicWishes_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const startRow = Math.max(2, lastRow - CONFIG.MAX_ROWS_TO_SCAN + 1);
  const rows = sheet.getRange(startRow,1,lastRow-startRow+1,6).getDisplayValues();
  return rows.map(r=>({time:String(r[0]||'').trim(),name:String(r[1]||'').trim(),message:String(r[4]||'').trim(),show:String(r[5]||'').trim().toLowerCase()}))
    .filter(x=>x.show==='ya' && x.name && x.message).reverse().slice(0,CONFIG.MAX_PUBLIC_WISHES)
    .map(x=>({time:x.time,name:x.name,message:x.message,show:'Ya'}));
}
function getSpreadsheet_() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  if(!ss) throw new Error('Spreadsheet tidak terhubung. Buka spreadsheet tujuan lalu pilih Extensions > Apps Script.');
  return ss;
}
function getOrCreateRsvpSheet_() {
  const ss=getSpreadsheet_();
  let sh=ss.getSheetByName(CONFIG.SHEET_NAME);
  if(!sh) sh=ss.insertSheet(CONFIG.SHEET_NAME);
  if(sh.getLastRow()===0) sh.getRange(1,1,1,RSVP_HEADERS.length).setValues([RSVP_HEADERS]);
  else {
    const existing=sh.getRange(1,1,1,Math.max(sh.getLastColumn(),RSVP_HEADERS.length)).getDisplayValues()[0];
    // Do not overwrite existing columns/data. Append any missing new headers at the end.
    RSVP_HEADERS.forEach(h=>{if(!existing.includes(h)){const col=sh.getLastColumn()+1;sh.getRange(1,col).setValue(h);}});
  }
  sh.setFrozenRows(1);
  return sh;
}
function parseBoolean_(value) {
  if(value===true || value===1) return true;
  return ['true','1','yes','ya','on'].includes(String(value||'').trim().toLowerCase());
}
function normalizeToken_(value) {
  const token=String(value||'').trim();
  return /^[A-Za-z0-9_-]{20,100}$/.test(token) ? token : '';
}
function respond_(callback,data) {
  const json=JSON.stringify(data);
  const cb=String(callback||'').trim();
  if(cb && /^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(cb)) {
    return ContentService.createTextOutput(cb+'('+json+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
function safeCell_(value) {
  const s=String(value||'');
  return /^[=+\-@]/.test(s) ? "'"+s : s;
}
