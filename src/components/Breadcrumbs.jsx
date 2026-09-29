import React from 'react';
import { Link } from 'react-router-dom';
import { pagePath } from '../data/site';

// items: [{ name, path }] - the last item is the current page (rendered as text, no link).
const Breadcrumbs = ({ items }) => (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {items.map((item, i) => {
                const last = i === items.length - 1;
                return (
                    <li key={item.path} className="flex items-center gap-2">
                        {last ? (
                            <span aria-current="page" className="text-sm text-gray-300 font-normal">{item.name}</span>
                        ) : (
                            <Link to={pagePath(item.path)} className="text-sm hover:text-yellow-400 transition-colors">{item.name}</Link>
                        )}
                        {!last && <span aria-hidden="true" className="text-sm text-gray-500 font-normal">/</span>}
                    </li>
                );
            })}
        </ol>
    </nav>
);

export default Breadcrumbs;
