/* =============================================
   LACSO HUB - Main JavaScript v3.1
   Performance-optimized:
   - Canvas disabled on mobile & reduced-motion
   - requestIdleCallback for non-critical init
   - Debounced resize handler
   - All scroll/touch events use passive:true
   ============================================= */
(function () {
    'use strict';

    // ── Reduced Motion Detection ──
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // ── AOS Init ──
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof AOS !== 'undefined' && !prefersReducedMotion) {
            AOS.init({
                duration: 600,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                disable: isMobile ? 'mobile' : false
            });
        }
        initNav();
        initCounters();
        initTestimonialSlider();
        initFAQ();
        initBarAnimations();
        initPortfolioFilter();
        initFormValidation();
        initLazyImages();
        initIntroVideoLoader();

        // If DOM is already ready, run it immediately
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initIntroVideoLoader();
        }

        // Non-critical: init neural canvas via idle callback
        if (!prefersReducedMotion && !isMobile) {
            if (typeof requestIdleCallback === 'function') {
                requestIdleCallback(initNeuralCanvas, { timeout: 2000 });
            } else {
                setTimeout(initNeuralCanvas, 500);
            }
        }
    });

    // ── Neural Canvas (desktop only, idle) ──
    function initNeuralCanvas() {
        const canvas = document.getElementById('neuralNetCanvas');
        if (!canvas || typeof NeuralNet === 'undefined') return;
        // Only init if canvas is visible and in viewport
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && typeof canvas._nnStarted === 'undefined') {
                    canvas._nnStarted = true;
                    if (typeof NeuralNet !== 'undefined') { try { NeuralNet.init(canvas); } catch(_) {} }
                    io.unobserve(canvas);
                }
            });
        });
        io.observe(canvas);
    }

    // ── Lazy Image Fade-In ──
    function initLazyImages() {
        const imgs = document.querySelectorAll('img[loading="lazy"]');
        if (!imgs.length) return;
        imgs.forEach(function (img) {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function () { img.classList.add('loaded'); }, { once: true, passive: true });
            }
        });
    }

    // ── Intro Video Loader ──
    function initIntroVideoLoader() {
        var loader = document.getElementById('intro-video-loader');
        var video = document.getElementById('intro-video');
        
        if (!loader || !video) return;

        // Check if intro has already been played
        if (sessionStorage.getItem('lacsohub_intro_played')) {
            loader.style.display = 'none';
            document.body.classList.remove('video-playing');
            return;
        }

        // If not played, set it
        sessionStorage.setItem('lacsohub_intro_played', 'true');
        document.body.classList.add('video-playing');
        
        // Attempt to autoplay
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log('Intro video started playing successfully.');
            }).catch(function(error) {
                console.warn('Video autoplay prevented:', error);
                hideLoader();
            });
        }

        // Progress bar logic
        var progressBar = document.getElementById('intro-progress-bar');
        if (progressBar) {
            video.addEventListener('timeupdate', function() {
                var percentage = (video.currentTime / video.duration) * 100;
                progressBar.style.width = percentage + '%';
            });
        }

        // When video ends, hide the loader with a small "completion" delay
        video.addEventListener('ended', function() {
            if (progressBar) progressBar.style.width = '100%';
            setTimeout(hideLoader, 300);
        });
        
        // Fallback: hide it after a certain time if it hangs
        setTimeout(hideLoader, 10000); 

        function hideLoader() {
            if (loader.classList.contains('hidden')) return;
            
            loader.classList.add('hidden');
            document.body.classList.remove('video-playing');
            
            // Remove from DOM after fade out finishes
            setTimeout(function() {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 1200); // slightly longer to match the cubic-bezier duration
        }
    }

    // ── Navbar Scroll & Mobile Menu ──
    function initNav() {
        const navbar = document.getElementById('navbar');
        const toggle = document.getElementById('navToggle');
        const closeBtn = document.getElementById('navClose');
        const menu = document.getElementById('navMenu');
        const overlay = document.getElementById('navOverlay');
        
        if (!navbar) return;

        // Sticky Navbar
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });

        if (toggle && menu && overlay) {
            const openMenu = () => {
                menu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const closeMenu = () => {
                menu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                // Close all dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('active'));
            };

            toggle.addEventListener('click', openMenu);
            if(closeBtn) closeBtn.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);

            // Handle Links and Dropdowns
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    const parent = this.parentElement;
                    if (parent.classList.contains('nav-dropdown')) {
                        if (window.innerWidth < 1024) {
                            e.preventDefault();
                            
                            // Check if current is already active
                            const isActive = parent.classList.contains('active');
                            
                            // Close all dropdowns to ensure only one is open at a time
                            document.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('active'));
                            
                            // If it wasn't active, open it now (toggle behavior)
                            if (!isActive) {
                                parent.classList.add('active');
                            }
                        }
                    } else {
                        // Normal link, close menu
                        closeMenu();
                    }
                });
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    closeMenu();
                }
            });
        }
    }

    // ── Counters ──
    function initCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        function runCount(el, target, suffix, prefix, duration, decimals, onDone) {
            var startTimestamp = null;
            var step = function (timestamp) {
                if (!startTimestamp) startTimestamp = timestamp;
                var progress = Math.min((timestamp - startTimestamp) / duration, 1);
                el.textContent = prefix + (progress * target).toFixed(decimals) + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = prefix + target.toFixed(decimals) + suffix;
                    if (onDone) onDone();
                }
            };
            window.requestAnimationFrame(step);
        }

        function startLoop(el) {
            if (el._lhLooping) return;
            el._lhLooping = true;
            var target = parseFloat(el.getAttribute('data-count'));
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = el.getAttribute('data-prefix') || '';
            var decimals = parseInt(el.getAttribute('data-decimals') || '0');
            var duration = prefersReducedMotion ? 100 : 2000;
            var pause = 3000;

            function cycle() {
                if (!el._lhLooping) return;
                runCount(el, target, suffix, prefix, duration, decimals, function () {
                    if (!el._lhLooping) return;
                    setTimeout(function () {
                        if (!el._lhLooping) return;
                        el.textContent = prefix + (0).toFixed(decimals) + suffix;
                        setTimeout(function () { cycle(); }, 120);
                    }, pause);
                });
            }
            cycle();
        }

        function stopLoop(el) { el._lhLooping = false; }

        counters.forEach(function (el) {
            var isLoop = el.getAttribute('data-loop') === 'true';
            var target = parseFloat(el.getAttribute('data-count'));
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = el.getAttribute('data-prefix') || '';
            var decimals = parseInt(el.getAttribute('data-decimals') || '0');

            if (isLoop) {
                var obs = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        entry.isIntersecting ? startLoop(el) : stopLoop(el);
                    });
                }, { threshold: 0.4 });
                obs.observe(el);
            } else {
                var obs2 = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        runCount(el, target, suffix, prefix, prefersReducedMotion ? 100 : 2000, decimals, null);
                        obs2.unobserve(el);
                    });
                }, { threshold: 0.5 });
                obs2.observe(el);
            }
        });
    }

    // ── Bar Animations ──
    function initBarAnimations() {
        var bars = document.querySelectorAll('.bar-fill[data-width]');
        if (!bars.length) return;
        if (prefersReducedMotion) {
            bars.forEach(function (b) { b.style.width = b.getAttribute('data-width') + '%'; });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.style.width = entry.target.getAttribute('data-width') + '%';
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });
        bars.forEach(function (b) { b.style.width = '0%'; observer.observe(b); });
    }

    // ── Testimonial Carousel ──
    function initTestimonialSlider() {
        var track = document.getElementById('testiTrack');
        var dotsEl = document.getElementById('testiDots');
        var prevBtn = document.getElementById('testiPrev');
        var nextBtn = document.getElementById('testiNext');
        if (!track) return;

        var slides = track.querySelectorAll('.testi-slide');
        var total = slides.length;
        if (!total) return;

        var current = 0;
        var timer = null;
        var resizeTimer = null;

        function perView() {
            return window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
        }
        function maxIndex() { return Math.max(0, total - perView()); }

        function buildDots() {
            if (!dotsEl) return;
            dotsEl.innerHTML = '';
            var pages = maxIndex() + 1;
            for (var p = 0; p < pages; p++) {
                var d = document.createElement('div');
                d.className = 'testi-dot' + (p === current ? ' active' : '');
                (function (idx) { d.addEventListener('click', function () { go(idx); }); })(p);
                dotsEl.appendChild(d);
            }
        }

        function updateDots() {
            if (!dotsEl) return;
            dotsEl.querySelectorAll('.testi-dot').forEach(function (d, i) {
                d.classList.toggle('active', i === current);
            });
        }

        function go(idx) {
            current = Math.max(0, Math.min(idx, maxIndex()));
            var slideW = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (current * slideW) + 'px)';
            updateDots();
            resetTimer();
        }

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(function () {
                go(current >= maxIndex() ? 0 : current + 1);
            }, 4500);
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { go(current <= 0 ? maxIndex() : current - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { go(current >= maxIndex() ? 0 : current + 1); });

        // Touch swipe (passive)
        var startX = 0;
        track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var dx = startX - e.changedTouches[0].clientX;
            if (Math.abs(dx) > 40) { dx > 0 ? go(current + 1) : go(current - 1); }
        }, { passive: true });

        buildDots();
        resetTimer();

        // Debounced resize handler (prevents layout thrash)
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                buildDots();
                go(Math.min(current, maxIndex()));
            }, 150);
        }, { passive: true });
    }

    // ── FAQ Accordion ──
    function initFAQ() {
        document.querySelectorAll('.faq-item').forEach(function (item) {
            var q = item.querySelector('.faq-q');
            if (!q) return;
            q.addEventListener('click', function () {
                var isOpen = item.classList.contains('open');
                document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
                if (!isOpen) item.classList.add('open');
            });
        });
    }

    // ── Portfolio Filter ──
    function initPortfolioFilter() {
        var btns = document.querySelectorAll('.filter-btn');
        var cards = document.querySelectorAll('.portfolio-card[data-category]');
        if (!btns.length) return;
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var filter = btn.getAttribute('data-filter');
                cards.forEach(function (card) {
                    var show = filter === 'all' || card.getAttribute('data-category') === filter;
                    card.style.display = show ? '' : 'none';
                    if (show && !prefersReducedMotion) card.style.animation = 'fadeIn 0.4s ease';
                });
            });
        });
    }

    // ── Form Validation ──
    function initFormValidation() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', function () {
            var btn = form.querySelector('[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
        });
    }

    // ── Smooth Scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            }
        });
    });



})();
