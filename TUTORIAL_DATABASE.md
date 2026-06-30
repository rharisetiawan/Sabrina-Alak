# ⚙️ Tutorial Setup Database Google Sheets

Ikuti langkah-langkah mudah di bawah ini untuk menghubungkan form RSVP dan Ucapan di undangan digital ke Google Sheets Anda secara gratis.

---

## Langkah 1: Buat File Google Sheets Baru
1. Buka [Google Sheets](https://docs.google.com/spreadsheets) di komputer Anda dan login menggunakan akun Google Anda.
2. Klik **Blank / Kosong** untuk membuat spreadsheet baru.
3. Beri nama file tersebut (misal: "Database Undangan Sabrina & Alak").
4. Di baris pertama (A1 sampai F1), ketikkan judul kolom persis seperti berikut agar rapi:
   - A1: `Waktu`
   - B1: `Tipe Form`
   - C1: `Nama Tamu`
   - D1: `Kehadiran`
   - E1: `Jumlah Tamu`
   - F1: `Pesan / Doa`

## Langkah 2: Masukkan Kode Script
1. Di menu Google Sheets bagian atas, klik **Extensions (Ekstensi)** > **Apps Script**.
2. Sebuah tab baru akan terbuka. Hapus semua teks yang ada di kotak putih (`function myFunction()...`).
3. **Copy (Salin)** semua kode di bawah ini, lalu **Paste (Tempel)** ke kotak putih tersebut:

```javascript
function doPost(e) {
  // Ambil sheet yang aktif
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var action = e.parameter.action;
  
  // CORS Headers agar bisa diakses dari website Vercel Anda
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  // Waktu saat ini
  var time = new Date();
  var formattedTime = Utilities.formatDate(time, "GMT+7", "dd/MM/yyyy HH:mm:ss");
  
  try {
    if (action === 'rsvp') {
      var name = e.parameter.name || '-';
      var attend = e.parameter.attend || '-';
      var guests = e.parameter.guests || '-';
      sheet.appendRow([formattedTime, 'RSVP', name, attend, guests, '-']);
    } 
    else if (action === 'wish') {
      var name = e.parameter.name || '-';
      var message = e.parameter.message || '-';
      sheet.appendRow([formattedTime, 'UCAPAN', name, '-', '-', message]);
    }
    
    // Kembalikan response sukses
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Data berhasil disimpan"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Jika ada error
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi tambahan untuk menangani preflight CORS jika diperlukan oleh browser
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. Klik ikon **Save** (gambar disket) di bagian atas, atau tekan `Ctrl + S`.
5. Beri nama project (bebas, misal: "Backend Undangan").

## Langkah 3: Publish (Deploy) Web App
1. Di pojok kanan atas layar Apps Script, klik tombol biru bertuliskan **Deploy** > **New deployment**.
2. Klik ikon roda gigi (Select type) di sebelah kata *Select type*, centang **Web app**.
3. Isi deskripsi (bebas, misal: "Versi 1").
4. Di bagian **Execute as**, pastikan terpilih: **Me (Akun Anda)**.
5. Di bagian **Who has access** (Siapa yang memiliki akses), **UBAH** menjadi **"Anyone" (Siapa saja)**. *(Ini wajib agar tamu bisa mengirim data tanpa harus login Google).*
6. Klik tombol **Deploy** di pojok kanan bawah.

## Langkah 4: Beri Izin (Authorization)
1. Karena ini script buatan Anda sendiri, Google akan meminta konfirmasi keamanan. Klik **Authorize access**.
2. Pilih akun Google Anda.
3. Jika muncul peringatan keamanan *"Google hasn't verified this app"*, klik tulisan kecil **Advanced (Lanjutan)** di bagian bawah, lalu klik link yang muncul: **Go to Backend Undangan (unsafe)**.
4. Scroll ke bawah dan klik **Allow (Izinkan)**.

## Langkah 5: Selesai! Dapatkan Web App URL
1. Setelah berhasil, akan muncul layar yang menampilkan tulisan **Web app URL**.
2. URL-nya sangat panjang dan berakhiran dengan `/exec` (misal: `https://script.google.com/macros/s/AKfycby.../exec`).
3. **Klik tombol Copy**.
4. Berikan URL tersebut kepada saya (AI), atau langsung paste URL tersebut di file `app.js` pada baris ke-25 menggantikan teks `PASTE_URL_WEB_APP_DISINI`.

Selamat! Database RSVP dan Ucapan Anda sekarang sudah sepenuhnya terhubung dengan Google Sheets! 🎉
