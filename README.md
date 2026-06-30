# 🌸 Undangan Pernikahan Digital — Sabrina & Alak

> **Akad Nikah:** Senin, 27 Juli 2026 | Pukul 08.00 WIB — Kediaman Mempelai Wanita, Malang
> **Resepsi:** Sabtu, 1 Agustus 2026 | Pukul 11.00–14.00 WIB — Universitas Gajayana, Malang

---

## 📁 Struktur File

```
/
├── index.html        ← Halaman undangan utama
├── buat-link.html    ← Generator link per tamu
├── style.css         ← Styling utama
├── animations.css    ← Animasi kunang-kunang
├── app.js            ← Logika (countdown, musik, galeri, ucapan)
├── vercel.json       ← Konfigurasi Vercel
├── .gitignore
├── README.md
└── img/
    ├── cover.jpg     ← ⚠️ Ganti dengan foto asli
    ├── bride.jpg     ← ⚠️ Ganti dengan foto Sabrina
    ├── groom.jpg     ← ⚠️ Ganti dengan foto Alak
    └── gallery.jpg   ← ⚠️ Ganti dengan foto berdua
```

---

## 🚀 Cara Deploy ke Vercel

### Via GitHub (Direkomendasikan)

1. Upload semua file ini ke **GitHub repository** (drag & drop ke github.com)
2. Buka [vercel.com](https://vercel.com) → **Sign in with GitHub**
3. Klik **"Add New Project"** → pilih repository ini
4. Klik **"Deploy"** — selesai! ✅

Vercel otomatis memberi URL seperti:
```
https://undangan-sabrina-alak.vercel.app
```

---

## 🔗 Generator Link Undangan

Buka file **`buat-link.html`** di browser untuk membuat link personal per tamu.

**Cara pakai:**
1. Isi kolom **Base URL** dengan URL Vercel kamu
2. Ketik nama tamu → klik **Generate**
3. Salin link atau langsung kirim via **WhatsApp**

**Format URL yang dihasilkan:**
```
https://undangan-sabrina-alak.vercel.app/?to=Bpk.+Ahmad+Santoso
https://undangan-sabrina-alak.vercel.app/?to=Keluarga+Besar+Mulyono
```

Nama tamu otomatis muncul di welcome screen undangan. 🎉

---

## 📸 Mengganti Foto

Ganti file di folder `img/` dengan foto asli (JPG/PNG, portrait/landscape bebas):

| File | Keterangan |
|---|---|
| `img/cover.jpg` | Foto cover & background utama |
| `img/bride.jpg` | Foto Sabrina (mempelai wanita) |
| `img/groom.jpg` | Foto Alak (mempelai pria) |
| `img/gallery.jpg` | Foto berdua untuk galeri |

> Tips: Untuk hasil terbaik, gunakan foto dengan rasio **3:4** (portrait) dan ukuran minimal **1080px**.

---

## 🎵 Mengganti Musik Background

Edit baris ini di **`app.js`**:

```js
// Baris 17 di app.js — ganti dengan link MP3 lagu pilihan
const MUSIC_URL = 'audio/nama-lagu.mp3';
```

Lalu upload file MP3 ke folder `audio/` di project ini.

> ⚠️ Pastikan lagu yang digunakan bebas royalti atau miliki lisensi yang sesuai.

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| 🎭 Welcome Screen | Animasi kunang-kunang (fireflies) |
| ⏳ Countdown | Hitung mundur real-time ke hari H |
| 👫 Profil Mempelai | Foto + info keluarga |
| 📅 Detail Acara | Akad & Resepsi + tombol Google Calendar & Maps |
| 💌 Kisah Cinta | Timeline cerita |
| 🖼️ Galeri | Lightbox foto |
| ✅ RSVP | Konfirmasi kehadiran |
| 💬 Ucapan & Doa | Form ucapan tersimpan di browser |
| 🎵 Musik | Background music dengan tombol play/pause |
| 📱 Responsive | Mobile & desktop |
| 🔗 Link Personal | URL `?to=NamaTamu` untuk setiap tamu |

---

Made with ❤️ · Sabrina & Alak · 2026
