import React from 'react';
import { pagePath } from '../data/site';
import { BackLink } from './DetailBlocks';

// items: [{ name, path }], ending with the current page. Shows a Back link to the parent
// page (or one step back in history); the full trail goes into the BreadcrumbList
// structured data on each page.
const Breadcrumbs = ({ items }) => {
    const parent = items[items.length - 2];
    return (
        <nav aria-label="Back" className="mb-6">
            <BackLink to={pagePath(parent.path)} label={parent.name} className="" />
        </nav>
    );
};

export default Breadcrumbs;
