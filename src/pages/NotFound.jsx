import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_NAME } from '../data/site';

export default function NotFound() {
    return (
        <div className="pt-32 pb-20 max-w-[700px] mx-auto px-6 text-center">
            <Seo title={`Page not found | ${SITE_NAME}`} description="This page could not be found." path="/404" noindex />
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Page not found</h1>
            <p className="text-gray-300 mb-8">The page you are looking for does not exist or has moved.</p>
            <Link to="/" className="px-5 py-2.5 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition duration-300">
                Back to home
            </Link>
        </div>
    );
}
