import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

// Building blocks shared by project and paper pages, so both look the same.

export const h2Class = 'text-xl md:text-2xl font-semibold text-gray-100 mt-10 mb-3';

// Two-column label/value table; on phones each row stacks label above value.
export const FactsTable = ({ rows }) => (
    <table className="w-full text-left text-sm md:text-base border-collapse">
        <tbody>
            {rows.map(([label, value]) => (
                <tr key={label} className="block sm:table-row border-b border-gray-700/70 py-2 sm:py-0">
                    <th scope="row" className="block sm:table-cell align-top font-semibold text-yellow-400 sm:py-3 sm:pr-6 sm:w-44 whitespace-nowrap">
                        {label}
                    </th>
                    <td className="block sm:table-cell align-top text-gray-300 leading-relaxed sm:py-3">{value}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export const ResultTable = ({ table }) => (
    <figure className="mt-6">
        <figcaption className="text-base font-semibold text-gray-200 mb-2">{table.title}</figcaption>
        <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-gray-800/80">
                    <tr>
                        {table.head.map((h) => (
                            <th key={h} scope="col" className="px-3 py-2 font-semibold text-yellow-400 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-gray-700/70">
                            {row.map((cell, i) => (
                                <td key={i} className={`px-3 py-2 text-gray-300 ${i === 0 ? 'font-medium text-gray-100' : 'whitespace-nowrap tabular-nums'}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </figure>
);

export const Bullets = ({ items }) => (
    <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300 text-base leading-relaxed">
        {items.map((point) => <li key={point}>{point}</li>)}
    </ul>
);

// Tapping the diagram opens it full size (it is small on phones).
export const Diagram = ({ src, alt }) => (
    <a href={src} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${alt} (open full size)`}>
        <img
            src={src}
            alt={alt}
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-colors"
        />
    </a>
);

// Collapsed extras, so the page stays short.
export const Details = ({ title = 'Technical details', items }) => (
    <details className="group mt-8 rounded-lg border border-gray-700 bg-gray-800/30">
        <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-gray-200 font-semibold hover:text-yellow-400 transition-colors [&::-webkit-details-marker]:hidden">
            <span className="text-base md:text-lg font-semibold text-inherit">{title}</span>
            <ChevronDown size={20} className="transition-transform group-open:rotate-180" />
        </summary>
        <ul className="list-disc list-outside pl-9 pr-4 pb-4 space-y-2 text-gray-300 text-sm md:text-base leading-relaxed">
            {items.map((point) => <li key={point}>{point}</li>)}
        </ul>
    </details>
);

export const TagList = ({ tags }) => (
    <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tags">
        {tags.map((tag) => (
            <li key={tag} className="text-xs md:text-sm font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1">
                {tag}
            </li>
        ))}
    </ul>
);

// Goes back to wherever the visitor came from inside the site (for example the home page),
// so one tap undoes one tap. Arriving from Google or a shared link, it links to the list page.
export const BackLink = ({ to, label }) => {
    const navigate = useNavigate();
    const [canGoBack, setCanGoBack] = useState(false);
    useEffect(() => {
        setCanGoBack((window.history.state?.idx ?? 0) > 0);
    }, []);

    return (
        <Link
            to={to}
            onClick={(e) => {
                if (!canGoBack) return;
                e.preventDefault();
                navigate(-1);
            }}
            className="mt-10 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
        >
            <ArrowLeft size={18} /> {canGoBack ? 'Back' : label}
        </Link>
    );
};
