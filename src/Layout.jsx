import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Layout effect in the browser (runs before paint, so the old page's position is saved
// before the new page can change it); plain effect during pre-rendering.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Where each visited page was scrolled to, keyed by history entry.
const scrollPositions = new Map();

// New page: scroll to the #hash target, or to the top.
// Back/forward: return to where the visitor was on that page (e.g. the home page's
// Research section), so one Back tap undoes one click.
const useScrollOnNavigate = () => {
    const { key, pathname, hash } = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    }, []);

    useIsoLayoutEffect(() => {
        const saved = scrollPositions.get(key);
        let restoring = false;
        let frame;
        if (navType === 'POP' && saved !== undefined) {
            // The page may still be loading, so keep trying for up to ~1 s until it is tall enough.
            restoring = true;
            let tries = 0;
            const attempt = () => {
                window.scrollTo(0, saved);
                if (Math.abs(window.scrollY - saved) > 2 && tries++ < 60) frame = requestAnimationFrame(attempt);
                else restoring = false;
            };
            attempt();
        } else {
            const target = hash ? document.getElementById(hash.slice(1)) : null;
            window.scrollTo(0, target ? target.getBoundingClientRect().top + window.scrollY - 80 : 0);
        }
        const save = () => {
            if (!restoring) scrollPositions.set(key, window.scrollY);
        };
        window.addEventListener('scroll', save, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', save);
        };
    }, [key, pathname, hash, navType]);
};

export default function Layout() {
    useScrollOnNavigate();

    return (
        // reducedMotion="user" turns animations off for visitors who set "reduce motion" in their OS
        <MotionConfig reducedMotion="user">
            <div className="page-glow" aria-hidden="true" />
            <div className="min-h-screen w-full overflow-x-hidden pb-16 md:pb-0">
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
            {/* Vercel Web Analytics (free tier): page views and visitors, no cookies */}
            <Analytics />
        </MotionConfig>
    );
}
