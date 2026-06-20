/**
 * LACSO HUB – Dashboard Visuals Animation Logic v1.1
 * Performance-optimized: animations only run when section is visible,
 * pauses when not visible, respects prefers-reduced-motion.
 */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    document.addEventListener('DOMContentLoaded', () => {
        // Skip all animations if reduced motion OR no GSAP loaded
        if (prefersReducedMotion || typeof gsap === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // ── Only init if dashboard sections exist on page ──
        const hasDashboard = document.querySelector('.dashboard-container');
        if (!hasDashboard) return;

        // ── On desktop only: mouse parallax ──
        if (!isMobile) {
            initMouseParallax();
        }

        // ── Scroll-triggered animations ──
        initDashboardAnimations();
    });

    function initMouseParallax() {
        const containers = document.querySelectorAll('.dashboard-container');
        containers.forEach(container => {
            let rafId = null;
            container.addEventListener('mousemove', (e) => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const { clientX, clientY } = e;
                    const { left, top, width, height } = container.getBoundingClientRect();
                    const x = (clientX - left) / width - 0.5;
                    const y = (clientY - top) / height - 0.5;
                    container.querySelectorAll('.db-panel').forEach((panel, i) => {
                        const depth = (i + 1) * 15; // reduced from 20 for smoother feel
                        gsap.to(panel, { x: x * depth, y: y * depth, duration: 0.8, ease: 'power2.out' });
                    });
                });
            });
            container.addEventListener('mouseleave', () => {
                if (rafId) cancelAnimationFrame(rafId);
                gsap.to(container.querySelectorAll('.db-panel'), {
                    x: 0, y: 0, duration: 0.8, ease: 'power2.out'
                });
            });
        });
    }

    function initDashboardAnimations() {
        const safeAnim = (selector, animFn) => {
            const el = document.querySelector(selector);
            if (el) animFn(el);
        };

        // ── Section 1: AI Website Dev ──
        safeAnim('.db-type-ai-website-development', (container) => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: container, start: 'top 80%', once: true }
            });
            const panels = container.querySelectorAll('.db-panel');
            if (panels.length) tl.from(panels, { y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.4)' });
            const fills = container.querySelectorAll('.db-progress-fill');
            if (fills.length) tl.to(fills, { width: '98%', duration: 1.5, ease: 'power2.inOut' }, '-=0.4');
            const browser = container.querySelector('.db-browser-ui');
            if (browser) tl.from(browser, { scale: 0.92, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1');
        });

        // ── Section 2: App Development ──
        safeAnim('.db-type-app-development', (container) => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: container, start: 'top 80%', once: true }
            });
            const phone = container.querySelector('.db-phone-mockup');
            if (phone) tl.from(phone, { y: 80, opacity: 0, duration: 1, ease: 'power3.out' });
            const fills = container.querySelectorAll('.db-progress-fill');
            if (fills.length) tl.to(fills, { width: (i) => i === 0 ? '85%' : '92%', duration: 1.5, stagger: 0.2 }, '-=0.8');
        });

        // ── Section 3: Brand Identity ──
        ['.db-type-branding-design', '.db-type-branding'].forEach(sel => {
            safeAnim(sel, (container) => {
                gsap.timeline({ scrollTrigger: { trigger: container, start: 'top 80%', once: true } })
                    .from(container.querySelectorAll('.db-panel'), {
                        scale: 0.85, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.4)'
                    });
            });
        });

        // ── Section 4: SEO Growth ──
        safeAnim('.db-type-seo-growth', (container) => {
            const path = container.querySelector('.db-graph-line');
            const bars = container.querySelectorAll('.db-chart-bar');
            const metrics = container.querySelectorAll('.db-metric');
            const tl = gsap.timeline({ scrollTrigger: { trigger: container, start: 'top 80%', once: true } });

            if (bars.length) tl.from(bars, { scaleY: 0, height: 0, duration: 1, stagger: 0.04, ease: 'power3.out' });
            if (path) {
                const length = path.getTotalLength ? path.getTotalLength() : 300;
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.8');
            }
            if (metrics.length) tl.from(metrics, { opacity: 0, y: 8, duration: 0.8, stagger: 0.15 }, '-=1');
        });

        // ── Section 5: AI Automation ──
        safeAnim('.db-type-ai-automation', (container) => {
            const panels = container.querySelectorAll('.db-panel');
            const fill = container.querySelector('.db-progress-fill');
            const tl = gsap.timeline({ scrollTrigger: { trigger: container, start: 'top 80%', once: true } });

            if (panels.length) {
                tl.from(panels, { x: (i) => i % 2 === 0 ? -40 : 40, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' });
            }
            // Only loop on desktop (saves battery on mobile)
            if (fill && !isMobile) {
                tl.to(fill, { width: '100%', duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            } else if (fill) {
                tl.to(fill, { width: '90%', duration: 1.5, ease: 'power2.inOut' });
            }
        });
    }

})();
