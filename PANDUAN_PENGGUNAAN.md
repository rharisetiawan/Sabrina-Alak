# 📖 Panduan Penggunaan & Manajemen Undangan Digital

Panduan ini dibuat agar Anda (atau tim yang mengelola) dapat dengan mudah **mengatur, merevisi, dan mengirimkan** undangan digital Sabrina & Alak.

---

## 1️⃣ Cara Mengirim Undangan ke Tamu (Generate Link)

Undangan ini memiliki fitur "Sebut Nama Tamu" di halaman awal. Anda tidak perlu membuat banyak file, cukup gunakan generator link yang sudah disediakan.

1. Buka file **`buat-link.html`** di browser komputer/laptop Anda.
2. Di bagian **Konfigurasi Base URL**, masukkan link website undangan utama yang sudah online (misal: `https://undangan-sabrina.vercel.app`).
3. **Untuk satu tamu:**
   - Ketik nama tamu di kolom "Nama Tamu" (contoh: Bpk. Budi Santoso).
   - Klik **Generate**.
   - Link akan muncul di bawahnya. Klik **Salin Link** atau **Kirim WhatsApp** untuk langsung membagikannya.
4. **Untuk banyak tamu sekaligus (Bulk):**
   - Di bagian bawah, ada kotak besar. Paste daftar nama tamu dari Excel/Notes Anda (pastikan satu baris = satu nama).
   - Klik **Generate Semua Link**.
   - Semua link akan jadi dalam sekejap! Anda bisa klik **Format WhatsApp** lalu copas ke WA Web.

---

## 2️⃣ Cara Mengganti Foto

Semua foto disimpan di dalam folder **`img`**. Anda cukup menimpa (replace) file yang ada dengan foto baru menggunakan nama file yang sama persis.

- `img/cover.jpg` → Foto yang muncul paling awal sebagai background.
- `img/bride.jpg` → Foto mempelai wanita (Sabrina).
- `img/groom.jpg` → Foto mempelai pria (Alak).
- `img/gallery.jpg` → Foto berdua yang ada di bagian galeri.

**Tips:** 
- Gunakan foto dengan format **.jpg** atau **.png**.
- Pastikan ukuran file tidak terlalu besar (maksimal 1-2 MB per foto) agar undangan cepat terbuka (tidak lemot).

---

## 3️⃣ Cara Merevisi Teks / Jadwal / Tempat

Jika sewaktu-waktu ada perubahan jam akad, alamat, atau teks cerita:

1. Buka file **`index.html`** menggunakan aplikasi Notepad (Windows), TextEdit (Mac), atau aplikasi code editor (seperti VS Code).
2. Tekan **Ctrl + F** (atau Cmd + F di Mac) untuk mencari teks yang ingin diubah. 
   *(Contoh: ketik "Pukul 08.00" untuk mencari bagian jadwal akad).*
3. Ganti teks tersebut dengan yang baru. Hati-hati jangan sampai menghapus tanda kurung sudut seperti `<` atau `>` di sekitarnya.
4. **Save** file tersebut.
5. Jika website sudah online di GitHub, Anda bisa langsung mengedit file `index.html` di website GitHub (klik file `index.html` → klik ikon pensil ✏️ di pojok kanan atas → edit teksnya → klik **Commit changes** berwarna hijau di bawah/atas). Vercel akan otomatis mengupdate website dalam 1 menit.

---

## 4️⃣ Cara Mengganti Lagu Latar (Background Music)

Musik diundang ini memutar lagu dari YouTube agar loading website tetap ringan.

1. Buka YouTube dan cari lagu yang Anda inginkan (misal cover lagu romantis).
2. Perhatikan link YouTube-nya di bagian atas (address bar). 
   Contoh: `https://www.youtube.com/watch?v=iygXgP2nOF4`
3. Copy kode unik setelah huruf **`v=`** (dalam contoh ini: **`iygXgP2nOF4`**).
4. Buka file **`app.js`**.
5. Cari baris ini (sekitar baris ke-20):
   ```javascript
   const YT_VIDEO_ID = 'iygXgP2nOF4';
   ```
6. Ganti kode di dalam tanda kutip dengan kode lagu YouTube yang baru.
7. Save file `app.js`.

---

## 5️⃣ Cara Melihat Daftar Hadir (RSVP) & Ucapan

Saat ini RSVP dan Ucapan tersimpan di penyimpanan browser lokal tamu masing-masing untuk keperluan demo. 

**Catatan Penting:**
Jika Anda ingin data RSVP (siapa saja yang hadir) dan Ucapan masuk ke HP Anda atau ke Google Excel Anda, fitur ini memerlukan tambahan koneksi backend (seperti *Google Sheets API* atau *Formspree*). 

Jika Anda belum menghubungkan RSVP ke database/Google Sheets, tamu tetap bisa melihat ucapan mereka sendiri di layar mereka, namun data tersebut tidak akan terkumpul ke komputer Anda.

---

## ❓ Kendala yang Sering Terjadi

- **"Lagu tidak otomatis berputar saat website dibuka"** 
  Ini adalah aturan dari browser (Chrome/Safari) bahwa website tidak boleh membunyikan suara sebelum ada interaksi dari pengunjung. Oleh karena itu, lagu baru akan terputar *setelah* tamu menekan tombol **"Buka Undangan"**.
  
- **"Saya sudah ganti foto, tapi saat buka link fotonya masih yang lama"**
  Ini disebut *Cache*. Browser tamu masih menyimpan foto versi lama. Minta tamu untuk me-refresh halaman, atau membersihkan cache. (Atau jika di Vercel, pastikan deploy terbaru sudah selesai).

---
*Dibuat khusus untuk pernikahan Sabrina & Alak.* 🌸
