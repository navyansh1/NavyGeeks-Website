import React from 'react';
import { Link } from 'react-router-dom';
import { pagePath } from '../data/site';

// items: [{ name, path }], ending with the current page. Only the parent pages are shown,
// because the current page's name is already the <h1> right below; the full trail still
// goes into the BreadcrumbList structured data.
const Breadcrumbs = ({ items }) => (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {items.slice(0, -1).map((item, i) => (
                <li key={item.path} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-sm text-gray-500 font-normal">/</span>}
                    <Link to={pagePath(item.path)} className="text-sm hover:text-yellow-400 transition-colors">{item.name}</Link>
                </li>
            ))}
        </ol>
    </nav>
);

export default Breadcrumbs;
