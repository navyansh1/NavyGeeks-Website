import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Scroll to the #hash target when there is one, otherwise back to the top on navigation.
const useScrollOnNavigate = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        const target = hash ? document.getElementById(hash.slice(1)) : null;
        if (target) {
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80 });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
};

export default function Layout() {
    useScrollOnNavigate();

    return (
        <div className="min-h-screen w-full overflow-x-hidden pb-16 md:pb-0">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
