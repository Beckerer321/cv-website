const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

// Logo/Wordmark klappt beim Runterscrollen ein (nur "MB" bleibt sichtbar)
const NAVBAR_SCROLL_THRESHOLD = 80;

function updateNavbarScrollState() {
    navbar.classList.toggle('is-scrolled', window.scrollY > NAVBAR_SCROLL_THRESHOLD);
}

updateNavbarScrollState();
window.addEventListener('scroll', updateNavbarScrollState, { passive: true });

// Hero-Netzwerk: Hubs/Subtopics erscheinen, danach zeichnen sich die Linien
// ein, anschließend bekommt jeder Knoten eine eigene kleine Schwebe-Logik –
// die Linien-Endpunkte folgen dieser Bewegung, damit sie am Knoten "hängen
// bleiben".
const HERO_NODE_FADE_MS = 600;  // muss zur CSS-Animationsdauer passen (0.6s)
const HERO_LINE_DRAW_MS = 850;  // muss zur CSS-Transition passen (0.85s)

const HERO_MOTION_PROFILES = {
    H1:  { axis: 'y',       amp: 6,          freq: 0.11 },
    H2:  { axis: 'x',       amp: 6,          freq: 0.09 },
    H3:  { axis: 'xy',      ampX: 5, ampY: 5, freq: 0.10 },
    H4:  { axis: 'vibrate', amp: 3,          freq: 0.35 },
    S1:  { axis: 'y',       amp: 5,          freq: 0.18 },
    S2:  { axis: 'xy',      ampX: 4, ampY: 6, freq: 0.12 },
    S3:  { axis: 'x',       amp: 5,          freq: 0.16 },
    S4:  { axis: 'y',       amp: 6,          freq: 0.13 },
    S5:  { axis: 'vibrate', amp: 2.5,        freq: 0.40 },
    S6:  { axis: 'x',       amp: 5.5,        freq: 0.19 },
    S7:  { axis: 'y',       amp: 6,          freq: 0.15 },
    S8:  { axis: 'x',       amp: 5,          freq: 0.17 },
    S9:  { axis: 'xy',      ampX: 5, ampY: 4, freq: 0.13 },
    S10: { axis: 'vibrate', amp: 2.8,        freq: 0.38 },
    S11: { axis: 'vibrate', amp: 3,          freq: 0.45 },
    S12: { axis: 'x',       amp: 6,          freq: 0.20 },
    S13: { axis: 'y',       amp: 5,          freq: 0.22 },
    S14: { axis: 'xy',      ampX: 5, ampY: 5, freq: 0.14 },
    S15: { axis: 'y',       amp: 6,          freq: 0.16 },
};

function heroMotionOffset(profile, t) {
    const twoPi = Math.PI * 2;
    switch (profile.axis) {
        case 'x':
            return { dx: Math.sin(t * profile.freq * twoPi) * profile.amp, dy: 0 };
        case 'y':
            return { dx: 0, dy: Math.sin(t * profile.freq * twoPi) * profile.amp };
        case 'xy':
            return {
                dx: Math.sin(t * profile.freq * twoPi) * profile.ampX,
                dy: Math.cos(t * profile.freq * twoPi * 0.85) * profile.ampY,
            };
        case 'vibrate':
            return {
                dx: Math.sin(t * profile.freq * twoPi) * profile.amp,
                dy: Math.cos(t * profile.freq * twoPi * 1.3) * profile.amp * 0.6,
            };
        default:
            return { dx: 0, dy: 0 };
    }
}

(() => {
    const network = document.querySelector('.hero__network');
    const lines = Array.from(document.querySelectorAll('.hero__lines line'));
    const nodes = Array.from(document.querySelectorAll('.hero__node'));
    if (!network || !lines.length || !nodes.length) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const start = performance.now();

    // Linien: Ausgangszustand fürs Einzeichnen vorbereiten
    const lineData = lines.map((line) => {
        const baseX1 = parseFloat(line.getAttribute('x1'));
        const baseY1 = parseFloat(line.getAttribute('y1'));
        const baseX2 = parseFloat(line.getAttribute('x2'));
        const baseY2 = parseFloat(line.getAttribute('y2'));
        const length = line.getTotalLength();
        const delay = parseFloat(line.dataset.delay || '0');

        line.style.strokeDasharray = String(length);

        if (reducedMotionQuery.matches) {
            line.style.strokeDashoffset = '0';
        } else {
            line.style.strokeDashoffset = String(length);
            line.style.transitionDelay = `${delay}s`;
        }

        return {
            el: line,
            from: line.dataset.from,
            to: line.dataset.to,
            baseX1, baseY1, baseX2, baseY2,
            activationTime: start + delay * 1000 + HERO_LINE_DRAW_MS,
        };
    });

    if (!reducedMotionQuery.matches) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                lineData.forEach(({ el }) => { el.style.strokeDashoffset = '0'; });
            });
        });
    }

    // Knoten: Aktivierungszeitpunkt fürs eigene Schweben (erst NACH dem Einblenden)
    const nodeState = {};
    nodes.forEach((node) => {
        const id = node.dataset.nodeId;
        const delay = parseFloat(node.dataset.delay || '0');
        nodeState[id] = {
            el: node,
            profile: HERO_MOTION_PROFILES[id] || { axis: 'y', amp: 5, freq: 0.12 },
            activationTime: start + delay * 1000 + HERO_NODE_FADE_MS,
            offset: { dx: 0, dy: 0 },
        };
    });

    if (reducedMotionQuery.matches) return; // keine fortlaufende Bewegung

    // Skalierung: SVG-Viewport (100x100) -> tatsächliche Pixelgröße des Containers
    let scaleX = 1;
    let scaleY = 1;
    function updateScale() {
        const rect = network.getBoundingClientRect();
        if (rect.width && rect.height) {
            scaleX = 100 / rect.width;
            scaleY = 100 / rect.height;
        }
    }
    updateScale();
    window.addEventListener('resize', updateScale);

    function tick(now) {
        Object.values(nodeState).forEach((state) => {
            if (now < state.activationTime) return;
            const t = (now - state.activationTime) / 1000;
            const { dx, dy } = heroMotionOffset(state.profile, t);
            state.offset.dx = dx;
            state.offset.dy = dy;
            state.el.style.transform = `translate(-50%, -50%) translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
        });

        lineData.forEach((line) => {
            if (now < line.activationTime) return;
            const from = nodeState[line.from];
            const to = nodeState[line.to];
            if (!from || !to) return;
            const x1 = line.baseX1 + from.offset.dx * scaleX;
            const y1 = line.baseY1 + from.offset.dy * scaleY;
            const x2 = line.baseX2 + to.offset.dx * scaleX;
            const y2 = line.baseY2 + to.offset.dy * scaleY;
            line.el.setAttribute('x1', x1.toFixed(2));
            line.el.setAttribute('y1', y1.toFixed(2));
            line.el.setAttribute('x2', x2.toFixed(2));
            line.el.setAttribute('y2', y2.toFixed(2));

            // Dasharray an die jetzt leicht veränderte Linienlänge anpassen,
            // sonst entsteht durch die Schwebe-Bewegung der Endpunkte mit der
            // Zeit ein Mismatch zwischen fixem Dash-Wert und echter Länge –
            // das erzeugt ein sich wiederholendes Strich-Lücke-Muster
            // (gestrichelter Look), obwohl die Linie eigentlich durchgehend
            // sein soll.
            const currentLength = line.el.getTotalLength();
            line.el.style.strokeDasharray = String(currentLength);
        });

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
})();

// Hell/Dunkel-Toggle (Grundzustand wird schon im <head>-Inline-Script gesetzt,
// hier nur Klick-Handling + Speichern der Wahl)
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'cv-theme';

themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    if (next === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, next);
});

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Projekte-Sektion: Scroll-Reveal für Cards und Walkthrough (einmalig beim ersten Sichtbarwerden)
(() => {
    const revealTargets = document.querySelectorAll('.projects-reveal');
    if (!revealTargets.length) return;

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    revealTargets.forEach((el) => revealObserver.observe(el));
})();

// Projekte-Showcase: scroll-gekoppeltes Wachsen mit Parallax + Schwebe-Kamera
(() => {
    const frame = document.querySelector('.projects-showcase');
    const inner = document.querySelector('.projects-showcase__inner');
    if (!frame) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const SCROLL_RANGE = 750; // px, Bandbreite 600–900 laut Vorgabe

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const lerp = (a, b, t) => a + (b - a) * t;

    let ticking = false;

    function update() {
        ticking = false;
        if (reducedMotionQuery.matches) return;

        const rect = frame.getBoundingClientRect();
        const raw = (window.innerHeight - rect.top) / SCROLL_RANGE;
        const progress = Math.min(1, Math.max(0, raw));
        const eased = easeOutCubic(progress);

        const translateY = lerp(40, 0, eased);
        const scale = lerp(0.96, 1, eased);
        const opacity = lerp(0.8, 1, eased);
        const radius = lerp(24, 3, eased);
        const shadowY = lerp(40, 8, eased);
        const shadowBlur = lerp(120, 24, eased);
        const shadowAlpha = lerp(0.18, 0.12, eased);

        frame.style.transform = `translateY(${translateY}px) scale(${scale})`;
        frame.style.opacity = String(opacity);
        frame.style.borderRadius = `${radius}px`;
        frame.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`;

        if (inner) {
            inner.style.transform = `translateY(${lerp(22, 0, eased)}px)`;
        }
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    if (!reducedMotionQuery.matches) update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
})();

// European Dashboard – Guided Walkthrough
(() => {
    const wt = document.getElementById('wt');
    if (!wt) return;

    // Hotspot-Koordinaten pro Screen (x/y in % der Mockup-Viewport-Fläche).
    // "scroll: true" simuliert vor dem Klick einen langsamen Scroll nach unten
    // (für Screens, die höher als der Viewport sind). Zum Feinjustieren einfach
    // die x/y-Werte anpassen.
    const WT_HOTSPOTS = [
        { screen: '01 Überblick',    x: 90, y: 10, scroll: false },
        { screen: '02 Twitter',      x: 90, y: 10, scroll: false },
        { screen: '03 Facebook',     x: 88, y: 92, scroll: true },
        { screen: '04 Onlinemedien', x: 90, y: 10, scroll: false },
        { screen: '05 Daten',        x: 90, y: 10, scroll: false },
        { screen: '06 Kalender',     x: 90, y: 10, scroll: false },
        { screen: '07 Methodik',     x: 88, y: 90, scroll: true },
        { screen: '08 Wordcloud',    x: 50, y: 50, scroll: false },
    ];

    const viewport = document.getElementById('wtViewport');
    const cursor = document.getElementById('wtCursor');
    const screens = Array.from(viewport.querySelectorAll('.wt__screen'));
    const progressButtons = Array.from(document.querySelectorAll('#wtProgress .wt__step'));
    const playPauseBtn = document.getElementById('wtPlayPause');
    const playPauseIcon = playPauseBtn.querySelector('span');
    const finaleBtn = document.getElementById('wtFinale');

    const lightbox = document.getElementById('wtLightbox');
    const lightboxVideo = document.getElementById('wtLightboxVideo');
    const lightboxClose = document.getElementById('wtLightboxClose');
    const lightboxBackdrop = document.getElementById('wtLightboxBackdrop');

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 720px)');

    const isReducedMotion = () => reducedMotionQuery.matches;
    const isMobile = () => mobileQuery.matches;

    let current = 0;
    let playing = true;
    let timer = null;

    function clearTimer() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function setActiveScreen(index) {
        screens.forEach((el, i) => el.classList.toggle('is-active', i === index));
        progressButtons.forEach((btn, i) => btn.classList.toggle('is-active', i === index));
    }

    function resetScroll(index) {
        const img = screens[index].querySelector('.wt__scroller img');
        if (!img) return;
        img.style.transition = 'none';
        img.style.transform = 'translateY(0)';
        void img.offsetWidth;
        img.style.transition = '';
    }

    function scrollScreenDown(index) {
        const screen = screens[index];
        const scroller = screen.querySelector('.wt__scroller');
        const img = scroller ? scroller.querySelector('img') : null;
        if (!img || !img.naturalWidth) return;
        const containerHeight = scroller.clientHeight;
        const scaledHeight = scroller.clientWidth * (img.naturalHeight / img.naturalWidth);
        const distance = Math.max(0, scaledHeight - containerHeight);
        img.style.transform = `translateY(-${distance}px)`;
    }

    function moveCursorTo(x, y) {
        if (isReducedMotion() || isMobile()) return;
        cursor.style.left = x + '%';
        cursor.style.top = y + '%';
    }

    function pulseCursor() {
        if (isReducedMotion() || isMobile()) return;
        cursor.classList.remove('is-clicking');
        void cursor.offsetWidth;
        cursor.classList.add('is-clicking');
    }

    function goTo(index) {
        clearTimer();
        current = (index + WT_HOTSPOTS.length) % WT_HOTSPOTS.length;
        resetScroll(current);
        setActiveScreen(current);
        if (playing) scheduleStep();
    }

    function advance() {
        goTo(current + 1);
    }

    function scheduleStep() {
        clearTimer();
        if (isReducedMotion()) return;

        const step = WT_HOTSPOTS[current];
        const initialDelay = step.scroll ? 1200 : 900;

        timer = setTimeout(() => {
            if (step.scroll) {
                scrollScreenDown(current);
                timer = setTimeout(() => {
                    moveCursorTo(step.x, step.y);
                    timer = setTimeout(() => {
                        pulseCursor();
                        timer = setTimeout(advance, 900);
                    }, 900);
                }, 1900);
            } else {
                moveCursorTo(step.x, step.y);
                timer = setTimeout(() => {
                    pulseCursor();
                    timer = setTimeout(advance, 900);
                }, 900);
            }
        }, initialDelay);
    }

    function play() {
        playing = true;
        playPauseIcon.textContent = '⏸';
        playPauseBtn.setAttribute('aria-label', 'Walkthrough pausieren');
        scheduleStep();
    }

    function pause() {
        playing = false;
        clearTimer();
        playPauseIcon.textContent = '▶';
        playPauseBtn.setAttribute('aria-label', 'Walkthrough fortsetzen');
    }

    playPauseBtn.addEventListener('click', () => {
        if (playing) pause(); else play();
    });

    progressButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            pause();
            goTo(i);
        });
    });

    function openLightbox() {
        lightbox.hidden = false;
        requestAnimationFrame(() => lightbox.classList.add('is-open'));
        lightboxVideo.currentTime = 0;
        lightboxVideo.play().catch(() => {});
        document.addEventListener('keydown', onLightboxKeydown);
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightboxVideo.pause();
        document.removeEventListener('keydown', onLightboxKeydown);
        setTimeout(() => {
            lightbox.hidden = true;
        }, 350);
    }

    function onLightboxKeydown(e) {
        if (e.key === 'Escape') closeLightbox();
    }

    finaleBtn.addEventListener('click', () => {
        pause();
        openLightbox();
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);

    setActiveScreen(0);

    if (isReducedMotion()) {
        pause();
        playPauseBtn.style.display = 'none';
    }

    const wtObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            wt.classList.add('wt--expanded');
            if (!isReducedMotion()) {
                play();
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.4 });

    wtObserver.observe(wt);

    reducedMotionQuery.addEventListener('change', () => {
        if (isReducedMotion()) {
            pause();
            playPauseBtn.style.display = 'none';
        } else {
            playPauseBtn.style.display = '';
            play();
        }
    });
})();
