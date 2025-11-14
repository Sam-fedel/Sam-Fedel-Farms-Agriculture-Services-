// Chisom Life Eke — Smooth fade-in for sections with a gentle staggered reveal of children
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Stagger reveal for children (cards, paragraphs, images)
            const staggerContainer = entry.target.querySelector('.service-cards, .stagger');
            if (staggerContainer) {
                const children = Array.from(staggerContainer.children);
                children.forEach((child, i) => {
                    setTimeout(() => child.classList.add('in'), i * 120);
                });
                // Mark container as in to allow CSS transitions for direct children
                setTimeout(() => staggerContainer.classList.add('in'), 50);
            }
        }
    });
}, { threshold: 0.18 });

sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
});

// Chisom Life Eke — Create floating orbs in the hero area to add soft motion and warmth
function createHeroOrbs(requestedCount) {
    const container = document.querySelector('.hero-animation');
    if (!container) return;

    // Respect user's reduced-motion preference — accessibility first (Chisom)
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
        container.innerHTML = '';
        container.style.opacity = '0.0';
        return;
    }

    // Clear any existing orbs before drawing new ones
    container.innerHTML = '';
    const colors = ['rgba(0,255,0,0.18)', 'rgba(255,255,0,0.12)', 'rgba(0,200,120,0.12)'];

    const width = window.innerWidth || document.documentElement.clientWidth;
    const defaultCount = width < 600 ? 4 : 7;
    const count = typeof requestedCount === 'number' ? requestedCount : defaultCount;

    for (let i = 0; i < count; i++) {
        const orb = document.createElement('span');
        orb.className = 'orb';
        // Smaller sizes on small screens
        const size = (width < 600) ? (40 + Math.round(Math.random() * 100)) : (80 + Math.round(Math.random() * 220));
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.background = colors[i % colors.length];
        const dur = 8 + Math.random() * 12;
        const delay = Math.random() * 5;
        orb.style.animation = `floaty ${dur}s ease-in-out ${delay}s infinite alternate`;
        orb.style.opacity = (0.06 + Math.random() * 0.20).toString();
        orb.style.maxWidth = '180px';
        orb.style.maxHeight = '180px';
        container.appendChild(orb);
    }
}

createHeroOrbs();
createAmbientParticles();

// Chisom Life Eke — Button ripple micro-interaction and keyboard activation support
function addButtonRipples() {
    document.addEventListener('pointerdown', e => {
        const btn = e.target.closest('.btn');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height) * 1.2;
        ripple.style.width = ripple.style.height = `${size}px`;
        // Coordinates relative to button
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        btn.appendChild(ripple);
        // Remove after animation
        ripple.addEventListener('animationend', () => ripple.remove());
    }, { passive: true });

    // Keyboard activation (Enter / Space) for anchors with .btn
    document.addEventListener('keydown', e => {
        const active = document.activeElement;
        if (!active) return;
        if (!active.classList || !active.classList.contains('btn')) return;
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            // Create a centered ripple
            const rect = active.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height) * 1.2;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${(rect.width - size) / 2}px`;
            ripple.style.top = `${(rect.height - size) / 2}px`;
            active.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
            // Trigger the click behavior if any
            active.click();
        }
    });
}

addButtonRipples();

// Chisom Life Eke — Recreate orbs and ambient items on resize to keep layout balanced
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createHeroOrbs();
        updateGrass();
        createAmbientParticles();
    }, 350);
});

// Chisom Life Eke — Adjust grass background intensity for performance and user preference
function updateGrass() {
    const wrap = document.querySelector('.grass-wrap');
    if (!wrap) return;

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
        wrap.style.display = 'none';
        return;
    }

    const width = window.innerWidth || document.documentElement.clientWidth;
    if (width < 520) {
        // Minimal foreground only on very small screens
        wrap.style.display = 'block';
        wrap.style.height = '120px';
        wrap.classList.add('minimal');
    } else {
        wrap.style.display = 'block';
        wrap.style.height = '';
        wrap.classList.remove('minimal');
    }
}

// Kick things off: initialize grass and visual helpers
updateGrass();
// listen for reduced-motion changes (some browsers support addEventListener on MediaQueryList)
if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.addEventListener) mq.addEventListener('change', updateGrass);
    else if (mq.addListener) mq.addListener(updateGrass);
}

/* Chisom Life Eke — Inventory/stock features removed as requested */

// Initialize page behaviors on load (gallery meta, lazy-loading, small inits)
document.addEventListener('DOMContentLoaded', () => {
    // Apply gallery featured metadata when page loads
    applyGalleryMeta();

    // Initialize lozad lazy loader if available
    if (typeof lozad !== 'undefined') {
        try {
            window.lozadObserver = lozad('.lozad', {
                loaded: function(el) { el.classList.add('loaded'); }
            });
            window.lozadObserver.observe();
            // pre-load first slide and its neighbor for smoother carousel experience
            setTimeout(() => {
                const first = document.querySelector('#carousel .carousel-slide img.lozad');
                if (first && window.lozadObserver && window.lozadObserver.trigger) {
                    window.lozadObserver.trigger(first);
                    const next = first.closest('.carousel-track').children[1];
                    if (next) {
                        const nimg = next.querySelector('img.lozad');
                        if (nimg) window.lozadObserver.trigger(nimg);
                    }
                }
            }, 80);
        } catch (e) { console.warn('lozad init failed', e); }
    }
});

// Chisom Life Eke — BroadcastChannel for admin updates (keeps gallery metadata live)
const adminChannel = (typeof BroadcastChannel !== 'undefined') ? new BroadcastChannel('sf_admin_channel') : null;
if (adminChannel) {
    adminChannel.addEventListener('message', (ev) => {
        try {
            const data = ev.data || {};
            if (data.type === 'galleryUpdate') {
                // gallery metadata changed
                applyGalleryMeta();
            }
        } catch (err) {
            console.warn('adminChannel message handling error', err);
        }
    });
}

// Chisom Life Eke — Gallery metadata helpers (mirrors admin state for featured images)
const GALLERY_META_KEY = 'sf_gallery_meta';
function loadGalleryMeta(){ try { const raw = localStorage.getItem(GALLERY_META_KEY); return raw?JSON.parse(raw):{}; } catch(e) { return {}; } }
function applyGalleryMeta(){
    const meta = loadGalleryMeta();
    const imgs = document.querySelectorAll('#gallery img');
    if (!imgs) return;
    imgs.forEach(img => {
        // normalize stored keys and image srcs (admin stores unencoded path)
        const imgSrc = decodeURI(img.getAttribute('src'));
        if (meta[imgSrc] || meta[decodeURI(imgSrc)]) img.classList.add('featured');
        else img.classList.remove('featured');
    });
}

/* Chisom Life Eke — Carousel implementation: accessible, touch-friendly gallery */
function initCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    // create dots
    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', 'Go to slide ' + (i+1));
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(btn);
    });

    let currentIndex = 0;
    let slideWidth = carousel.querySelector('.carousel-slide').getBoundingClientRect().width;
    let autoId = null;

    function setSlidePositions() {
        slideWidth = carousel.querySelector('.carousel-slide').getBoundingClientRect().width;
    }

    function updateTrack() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        const dots = Array.from(dotsContainer.children);
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function moveToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateTrack();
        // trigger lozad to load the current and adjacent slides for snappy navigation
        try {
            if (window.lozadObserver && window.lozadObserver.trigger) {
                const idxs = [currentIndex, (currentIndex + 1) % slides.length, (currentIndex - 1 + slides.length) % slides.length];
                idxs.forEach(i => {
                    const img = slides[i] && slides[i].querySelector('img.lozad');
                    if (img) window.lozadObserver.trigger(img);
                });
            }
        } catch (err) { /* ignore */ }
    }

    function next() { moveToSlide(currentIndex + 1); }
    function prev() { moveToSlide(currentIndex - 1); }

    nextBtn && nextBtn.addEventListener('click', () => { next(); resetAuto(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

    // autoplay
    function startAuto() { if (autoId) clearInterval(autoId); autoId = setInterval(next, 4500); }
    function stopAuto() { if (autoId) { clearInterval(autoId); autoId = null; } }
    function resetAuto() { stopAuto(); startAuto(); }

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin', stopAuto);
    carousel.addEventListener('focusout', startAuto);

    // keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // touch support (simple swipe)
    let startX = 0;
    let isTouch = false;
    carousel.addEventListener('touchstart', (e) => { isTouch = true; startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
    carousel.addEventListener('touchmove', (e) => { if (!isTouch) return; const dx = e.touches[0].clientX - startX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => { if (!isTouch) return; const dx = (e.changedTouches[0].clientX - startX); if (dx > 40) prev(); else if (dx < -40) next(); isTouch = false; startAuto(); });

    // resize handling
    window.addEventListener('resize', () => { setTimeout(() => { setSlidePositions(); updateTrack(); }, 120); });

    // set initial positions
    setSlidePositions();
    updateTrack();
    startAuto();
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

/* Chisom Life Eke — Remote inventory polling removed (disabled) */

// Chisom Life Eke — Small toast helper for unobtrusive notifications
function showToast(msg, timeout = 3000) {
    try {
        let t = document.getElementById('sf-toast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'sf-toast';
            t.style.position = 'fixed';
            t.style.right = '16px';
            t.style.bottom = '20px';
            t.style.background = 'rgba(0,0,0,0.7)';
            t.style.color = '#fff';
            t.style.padding = '10px 14px';
            t.style.borderRadius = '8px';
            t.style.zIndex = '9999';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.style.opacity = '1';
        if (t._timeout) clearTimeout(t._timeout);
        t._timeout = setTimeout(() => { t.style.opacity = '0'; }, timeout);
    } catch (e) { /* ignore */ }
}

/* Chisom Life Eke — Welcome banner: time-of-day greeting and dismiss behavior */
function getTimeOfDayGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good morning — welcome to Sam Fedel Farms ask we have it !';
    if (h >= 12 && h < 17) return 'Good afternoon — welcome to Sam Fedel Farms we know what ur looking for just contact us!';
    if (h >= 17 && h < 22) return 'Good evening — welcome to Sam Fedel Farms we know you want to make an order !';
    return 'Welcome to Sam Fedel Farms!';
}

function showWelcomeBanner() {
    const banner = document.getElementById('welcome-banner');
    if (!banner) return;
    const textEl = banner.querySelector('.welcome-text');
    const dismissBtn = banner.querySelector('.welcome-dismiss');
    if (!textEl || !dismissBtn) return;

    textEl.textContent = getTimeOfDayGreeting();
    banner.hidden = false;
    // slight delay so CSS transition can run
    setTimeout(() => banner.classList.add('show'), 20);

    const dismiss = () => {
        banner.classList.remove('show');
        setTimeout(() => { banner.hidden = true; }, 240);
    };

    dismissBtn.addEventListener('click', dismiss);
    banner.addEventListener('keydown', (e) => { if (e.key === 'Escape') dismiss(); });

    // auto-hide after a short time if user doesn't interact
    let autoHide = setTimeout(dismiss, 7000);
    banner.addEventListener('mouseenter', () => clearTimeout(autoHide));
    banner.addEventListener('mouseleave', () => { autoHide = setTimeout(dismiss, 4000); });
}

/* Chisom Life Eke — Typewriter animation for the hero paragraph (adaptive speed) */
function runHeroTypewriter() {
    const el = document.getElementById('hero-type');
    if (!el) return;
    const text = el.getAttribute('data-text') || el.textContent || '';
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
        el.textContent = text;
        return;
    }
    // Adaptive speed: faster on small screens so users don't wait too long
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const baseSpeed = (vw <= 720) ? 28 : 45; // ms per char

    el.textContent = '';
    el.classList.toggle('small', vw <= 420);

    let i = 0;
    function typeNext() {
        if (i >= text.length) return;
        el.textContent += text.charAt(i);
        i++;
        // small human-like variance
        const variance = Math.random() * (baseSpeed * 0.25);
        setTimeout(typeNext, Math.max(8, baseSpeed - variance));
    }
    typeNext();
}

/* Chisom Life Eke — Ambient particles generator: subtle, low-cost background specks */
function createAmbientParticles(maxCount) {
    const container = document.querySelector('.ambient-particles');
    if (!container) return;
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
        container.innerHTML = '';
        container.style.opacity = '0';
        return;
    }

    const vw = window.innerWidth || document.documentElement.clientWidth;
    const base = (vw < 480) ? 6 : (vw < 900 ? 10 : 16);
    const count = Math.min(maxCount || base, 24);
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        const size = Math.round((Math.random() * 18) + (vw < 480 ? 6 : 8));
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${30 + Math.random() * 60}%`;
        p.style.opacity = (0.03 + Math.random() * 0.08).toString();
        const dur = 18 + Math.random() * 26;
        const delay = Math.random() * 6;
        const dx = `${Math.round((Math.random() - 0.5) * 120)}px`;
        p.style.setProperty('--dx', dx);
        p.style.animation = `particleFloat ${dur}s ease-in-out ${delay}s infinite`;
        container.appendChild(p);
    }
}

/* Chisom Life Eke — Mobile nav toggle: accessible toggle and auto-close on link click */
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        const opened = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
    // Close when a nav link is chosen (good for single-page anchors)
    links.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a') {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    runHeroTypewriter();
    initMobileNav();
    showWelcomeBanner();
    initThemeToggle();
});

/* Theme toggle: apply saved preference or system preference, allow toggling and persist in localStorage */
function applyTheme(theme) {
    try {
        if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
        else document.documentElement.removeAttribute('data-theme');
    } catch (e) { /* ignore */ }
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        const pressed = theme === 'light' ? 'true' : 'false';
        btn.setAttribute('aria-pressed', pressed);
        btn.textContent = theme === 'light' ? '☀️' : '🌙';
    }
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const STORAGE_KEY = 'sf_theme_pref';
    // Determine initial theme: saved preference -> system preference -> default dark
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { saved = null; }

    if (saved === 'light' || saved === 'dark') applyTheme(saved === 'light' ? 'light' : 'dark');
    else {
        const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
        applyTheme(mq && mq.matches ? 'light' : 'dark');
    }

    btn.addEventListener('click', () => {
        // Toggle between light and dark
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next === 'light' ? 'light' : 'dark');
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    });

    // Keep button keyboard-accessible
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });

    // Respect system changes if no saved preference
    try {
        const mqLight = window.matchMedia('(prefers-color-scheme: light)');
        mqLight.addEventListener && mqLight.addEventListener('change', (ev) => {
            try {
                const savedNow = localStorage.getItem(STORAGE_KEY);
                if (!savedNow) applyTheme(ev.matches ? 'light' : 'dark');
            } catch (e) { /* ignore */ }
        });
    } catch (e) { /* ignore */ }
}