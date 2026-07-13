/* ================================================
   app.js - Wedding Invitation JavaScript
   Sabrina & Alak | 27 Juli & 1 Agustus 2026
   ================================================ */

'use strict';

// ================================================
// CONSTANTS & CONFIG
// ================================================
const WEDDING_DATE = new Date('2026-08-01T11:00:00+07:00');
const GALLERY_IMAGES = [
    'img/keluarga-full.jpeg'
];

// ✏️ GANTI LAGU: ubah YouTube Video ID di bawah ini
// Sampai Jadi Debu - GUT ORCHESTRA: 9KVattKxSKg
const YT_VIDEO_ID = '9KVattKxSKg';

// ✏️ GOOGLE SCRIPT URL: masukkan link Web App Google Apps Script Anda di sini
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYRob2MYjA4cK_JiNjIaqwfvlLX-4nkhXbucEBRjT1bbBFHXCvJSB36OonyHGfQasr/exec';

// ================================================
// DOM REFS
// ================================================
const preloader     = document.getElementById('preloader');
const welcomeScreen = document.getElementById('welcome-screen');
const openBtn       = document.getElementById('openInvitationBtn');
const mainContent   = document.getElementById('main-content');
const musicBtn      = document.getElementById('musicBtn');
const musicIcon     = document.getElementById('musicIcon');
const toast         = document.getElementById('toast');
const toastMsg      = document.getElementById('toastMsg');
const navbar        = document.getElementById('navbar');

// ================================================
// YOUTUBE PLAYER (Background Music)
// ================================================
let ytPlayer     = null;
let ytReady      = false;
let ytWantPlay   = false;   // user minta play sebelum API siap
let isPlaying    = false;

// Load YouTube IFrame API script sekali
(function loadYTApi() {
    if (window.YT) return;
    const tag = document.createElement('script');
    tag.src   = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
})();

// Callback dari YouTube API saat sudah siap
window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('yt-player', {
        videoId: YT_VIDEO_ID,
        playerVars: {
            autoplay  : 1, // 1 berarti autoplay (tapi butuh klik user di awal)
            controls  : 0,
            loop      : 1,
            playlist  : YT_VIDEO_ID, // perlu untuk loop
            playsinline: 1,
            rel       : 0,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb : 1,
            fs        : 0
        },
        events: {
            onReady: (e) => {
                ytReady = true;
                e.target.setVolume(40);  // volume 40%
                if (ytWantPlay) doPlay();
            },
            onStateChange: (e) => {
                // Jika video ended (seharusnya tidak karena loop), restart
                if (e.data === YT.PlayerState.ENDED) doPlay();
            },
            onError: () => {
                // Jika blocked, tampilkan ikon muted
                setMusicPlaying(false);
            }
        }
    });
};

function doPlay() {
    if (!ytPlayer || !ytReady) { ytWantPlay = true; return; }
    ytPlayer.playVideo();
    setMusicPlaying(true);
    isPlaying = true;
}

function doPause() {
    if (!ytPlayer || !ytReady) return;
    ytPlayer.pauseVideo();
    setMusicPlaying(false);
    isPlaying = false;
}

// ================================================
// INIT
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    // Parse ?to= query param for guest name
    parseGuestName();

    // Hide preloader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    });

    // Init AOS
    AOS.init({
        duration: 800,
        once: false,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // Init countdown
    startCountdown();

    // Init scroll spy for nav
    initScrollSpy();

    // Init music button
    initMusicBtn();

    // Init smooth nav clicks
    initNavigation();

    // Load ucapan dari server (Google Sheets)
    fetchWishes();
});

// ================================================
// GUEST NAME PARSING
// ================================================
function parseGuestName() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('to') || 'Bapak/Ibu/Saudara/i';
    const tamuName = document.getElementById('tamuName');
    if (tamuName) {
        tamuName.textContent = decodeURIComponent(guestName);
    }
    // Pre-fill form
    const wishNameInput = document.getElementById('wishName');
    const rsvpNameInput = document.getElementById('rsvpName');
    if (wishNameInput && guestName !== 'Bapak/Ibu/Saudara/i') {
        wishNameInput.value = guestName;
    }
    if (rsvpNameInput && guestName !== 'Bapak/Ibu/Saudara/i') {
        rsvpNameInput.value = guestName;
    }
}

// ================================================
// OPEN INVITATION
// ================================================
openBtn.addEventListener('click', () => {
    // Animate out welcome screen
    welcomeScreen.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    welcomeScreen.style.transform = 'translateY(-100%)';
    welcomeScreen.style.opacity = '0';

    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '1';

        // Try autoplay music after user interaction
        tryPlayMusic();

        // Scroll to top of main
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
});

// ================================================
// COUNTDOWN TIMER
// ================================================
function startCountdown() {
    function update() {
        const now = new Date();
        const diff = WEDDING_DATE - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';

            // Show celebration message
            const cdWrapper = document.querySelector('.countdown-wrapper');
            if (cdWrapper) {
                cdWrapper.innerHTML = '<div class="countdown-done">🎉 Hari Pernikahan! Selamat & Bahagia! 🎉</div>';
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = (n) => String(n).padStart(2, '0');

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) animateCountChange(daysEl, pad(days));
        if (hoursEl) animateCountChange(hoursEl, pad(hours));
        if (minutesEl) animateCountChange(minutesEl, pad(minutes));
        if (secondsEl) animateCountChange(secondsEl, pad(seconds));
    }

    update();
    setInterval(update, 1000);
}

function animateCountChange(el, newVal) {
    if (el.textContent !== newVal) {
        el.style.transform = 'scale(1.2)';
        el.style.color = 'var(--gold-light)';
        el.textContent = newVal;
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    }
}

// ================================================
// MUSIC BUTTON
// ================================================
function initMusicBtn() {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            doPause();
        } else {
            doPlay();
        }
    });
}

function tryPlayMusic() {
    // Dipanggil setelah user tap 'Buka Undangan' (interaksi = autoplay diizinkan)
    doPlay();
}

function setMusicPlaying(playing) {
    isPlaying = playing;
    const infoEl = document.getElementById('musicInfo');
    if (playing) {
        musicIcon.className = 'bi bi-music-note-beamed';
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('title', 'Pause Musik');
        // Tampilkan info lagu
        if (infoEl) {
            infoEl.textContent = '🎵 NIKI — Take A Chance With Me';
            infoEl.classList.add('show');
            // Auto hide setelah 5 detik
            clearTimeout(infoEl._timer);
            infoEl._timer = setTimeout(() => infoEl.classList.remove('show'), 5000);
        }
    } else {
        musicIcon.className = 'bi bi-volume-mute-fill';
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('title', 'Play Musik');
        if (infoEl) infoEl.classList.remove('show');
    }
}

// ================================================
// NAVIGATION - SMOOTH SCROLL & SCROLL SPY
// ================================================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initScrollSpy() {
    const sections = ['cover-section', 'bride-section', 'schedule-section', 'gallery-section', 'wish-section'];
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navItems.forEach(nav => {
                        nav.classList.toggle(
                            'active',
                            nav.dataset.section === entry.target.id
                        );
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

// ================================================
// GALLERY LIGHTBOX
// ================================================
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = GALLERY_IMAGES[index % GALLERY_IMAGES.length];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = GALLERY_IMAGES[currentLightboxIndex];
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Close lightbox on keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
});

// ================================================
// RSVP FORM
// ================================================
function submitRSVP(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    const name = document.getElementById('rsvpName').value.trim();
    const attend = document.getElementById('rsvpAttend').value;
    const guests = document.getElementById('rsvpGuest').value;

    if (!name || !attend) {
        showToast('❌ Mohon lengkapi semua field');
        return;
    }

    // Ubah tombol jadi loading
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Mengirim...';
    btn.disabled = true;

    // Kirim via GET + URL params (paling stabil untuk Google Apps Script)
    const params = new URLSearchParams({
        action : 'rsvp',
        name   : name,
        attend : attend,
        guests : guests
    });

    fetch(SCRIPT_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' })
        .then(() => {
            const attendMessages = {
                'hadir': `🎉 Terima kasih ${name}! Kami tunggu kehadiranmu!`,
                'tidak': `😢 Sayang sekali ${name} tidak bisa hadir. Terima kasih atas doanya!`,
                'ragu' : `🙏 Baik ${name}, kami tunggu konfirmasi selanjutnya!`
            };
            showToast(attendMessages[attend] || '✅ Konfirmasi terkirim!');
            document.getElementById('rsvpForm').reset();

            // Simpan juga ke localStorage sebagai backup tampilan
            const rsvps = JSON.parse(localStorage.getItem('wedding-rsvp') || '[]');
            rsvps.push({ name, attend, guests, time: new Date().toISOString() });
            localStorage.setItem('wedding-rsvp', JSON.stringify(rsvps));
        })
        .catch(() => showToast('❌ Gagal mengirim, coba lagi'))
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled  = false;
        });
}

// ================================================
// WISHES / UCAPAN
// ================================================
function submitWish(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();

    if (!name || !message) {
        showToast('❌ Mohon isi nama dan ucapan');
        return;
    }

    // Ubah tombol jadi loading
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Mengirim...';
    btn.disabled = true;

    const timeString = new Date().toLocaleString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    // Kirim via GET + URL params
    const params = new URLSearchParams({
        action  : 'wish',
        name    : name,
        message : message
    });

    fetch(SCRIPT_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' })
        .then(() => {
            const wishes  = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
            const newWish = { name, message, time: timeString };
            wishes.unshift(newWish);
            localStorage.setItem('wedding-wishes', JSON.stringify(wishes));

            addWishToDOM(newWish, true);
            showToast('💌 Ucapan terkirim! Terima kasih!');
            document.getElementById('wishForm').reset();
        })
        .catch(() => showToast('❌ Gagal mengirim ucapan, coba lagi'))
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled  = false;
        });
}

// Fetch ucapan dari Google Sheets saat halaman dibuka
function fetchWishes() {
    const wishesList = document.getElementById('wishesList');
    if (!wishesList) return;

    // Tampilkan loading sementara
    wishesList.innerHTML = `<div style="text-align:center; padding: 1.5rem; color: var(--text-muted); font-size:0.78rem;">
        <i class="bi bi-hourglass-split"></i> Memuat ucapan...
    </div>`;

    const params = new URLSearchParams({ action: 'get_wishes' });

    fetch(SCRIPT_URL + '?' + params.toString())
        .then(res => res.json())
        .then(data => {
            wishesList.innerHTML = '';
            if (data.wishes && data.wishes.length > 0) {
                data.wishes.forEach(wish => addWishToDOM(wish, false));
            } else {
                wishesList.innerHTML = `<div style="text-align:center; padding: 1.5rem; color: var(--text-muted); font-size:0.78rem;">
                    💌 Belum ada ucapan. Jadilah yang pertama!
                </div>`;
            }
        })
        .catch(() => {
            // Jika gagal (misal offline), fallback ke localStorage
            wishesList.innerHTML = '';
            const local = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
            if (local.length > 0) {
                local.forEach(wish => addWishToDOM(wish, false));
            } else {
                wishesList.innerHTML = `<div style="text-align:center; padding: 1.5rem; color: var(--text-muted); font-size:0.78rem;">
                    💌 Belum ada ucapan. Jadilah yang pertama!
                </div>`;
            }
        });
}


function addWishToDOM(wish, prepend = false) {
    const wishesList = document.getElementById('wishesList');
    const item = document.createElement('div');
    item.className = 'wish-item';
    item.innerHTML = `
        <div class="wish-avatar">💌</div>
        <div class="wish-body">
            <div class="wish-author">${escapeHtml(wish.name)}</div>
            <div class="wish-time"><i class="bi bi-clock-history"></i> ${wish.time}</div>
            <div class="wish-text">${escapeHtml(wish.message)}</div>
        </div>
    `;

    if (prepend && wishesList.firstChild) {
        wishesList.insertBefore(item, wishesList.firstChild);
    } else {
        wishesList.appendChild(item);
    }
}

// ================================================
// UTILITY
// ================================================
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================================
// PARALLAX EFFECT (subtle)
// ================================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Subtle parallax on cover
    const coverBg = document.querySelector('.cover-bg');
    if (coverBg) {
        coverBg.style.transform = `scale(1.08) translateY(${scrollY * 0.08}px)`;
    }
}, { passive: true });

// ================================================
// SHARE FUNCTIONALITY
// ================================================
function shareInvitation() {
    const url = window.location.href;
    const text = 'Kami mengundang Bapak/Ibu/Saudara/i ke Resepsi Pernikahan Sabrina & Alak - 27 Juli & 1 Agustus 2026 di Kota Malang';

    if (navigator.share) {
        navigator.share({
            title: 'Undangan Pernikahan Sabrina & Alak',
            text: text,
            url: url
        }).catch(console.warn);
    } else {
        navigator.clipboard?.writeText(url)
            .then(() => showToast('🔗 Link undangan disalin!'))
            .catch(() => showToast('📋 Copy link dari address bar'));
    }
}

// ================================================
// COPY REKENING (Amplop Digital)
// ================================================
function copyRekening(elementId, btn) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Ambil teks nomor rekening (tanpa spasi agar mudah di-paste)
    const nomorBersih = el.textContent.replace(/\s/g, '');

    navigator.clipboard.writeText(nomorBersih)
        .then(() => {
            // Visual feedback pada tombol
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-clipboard-check"></i> Tersalin!';
            btn.classList.add('copied');
            showToast('✅ Nomor rekening disalin!');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
            }, 2500);
        })
        .catch(() => {
            // Fallback jika clipboard API tidak tersedia
            showToast('📋 Salin nomor: ' + el.textContent);
        });
}


// ================================================
// ADD COUNTDOWN STYLE DYNAMIC
// ================================================
const style = document.createElement('style');
style.textContent = `
    #days, #hours, #minutes, #seconds {
        transition: transform 0.2s ease, color 0.3s ease;
    }
    .countdown-done {
        font-size: 0.85rem;
        color: var(--gold-light);
        text-align: center;
        padding: 1rem;
        font-weight: 600;
        animation: heartbeat 1.5s ease-in-out infinite;
    }
    @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        50% { box-shadow: 0 0 0 12px rgba(212, 175, 55, 0.2); }
    }
`;
document.head.appendChild(style);
