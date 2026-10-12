import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Github } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/site';

const USER = 'navyansh1';
const DEFAULT_YEAR = '2026';
const API = `https://github-contributions-api.jogruber.de/v4/${USER}?y=all`;
const LEVELS = ['bg-slate-800', 'bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-400'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Groups the daily list into Sunday-first week columns.
const toWeeks = (days) => {
    const weeks = [];
    let week = [];
    days.forEach((d, i) => {
        const dow = new Date(`${d.date}T00:00:00Z`).getUTCDay();
        if (i === 0) week = Array(dow).fill(null);
        week.push(d);
        if (dow === 6) { weeks.push(week); week = []; }
    });
    if (week.length) weeks.push(week);
    return weeks;
};

// Contribution graph, fetched in the browser (the site is pre-rendered, so SSR shows a skeleton).
// `compact` drops the footer legend. The graph always opens on DEFAULT_YEAR.
const GithubActivity = ({ compact = false }) => {
    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);
    const [year, setYear] = useState(DEFAULT_YEAR);
    const scroller = useRef(null);

    useEffect(() => {
        const ctrl = new AbortController();
        fetch(API, { signal: ctrl.signal })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
            .then(setData)
            .catch((e) => { if (e.name !== 'AbortError') setFailed(true); });
        return () => ctrl.abort();
    }, []);

    const years = useMemo(
        () => (data ? Object.keys(data.total).map(Number).sort((a, b) => b - a) : []),
        [data]
    );

    const weeks = useMemo(() => {
        if (!data) return null;
        const all = data.contributions;
        return toWeeks(all.filter((d) => d.date.startsWith(year)));
    }, [data, year]);

    // On narrow screens, scroll so the most recent week (up to today) is in view.
    useEffect(() => {
        const el = scroller.current;
        if (!weeks || !el) return;
        const today = new Date().toISOString().slice(0, 10);
        let last = weeks.length - 1;
        while (last > 0 && !weeks[last].some((d) => d && d.date <= today)) last -= 1;
        el.scrollLeft = Math.max(0, (last + 1) * 15 - el.clientWidth);
    }, [weeks]);

    const total = useMemo(
        () => (weeks ? weeks.flat().reduce((s, d) => s + (d ? d.count : 0), 0) : 0),
        [weeks]
    );

    return (
        <div className={`${compact ? 'mb-8' : 'my-12'} rounded-2xl border border-slate-700 bg-slate-900/60 p-4 md:p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="flex items-center gap-2 text-lg md:text-2xl font-bold text-gray-100">
                    <Github size={22} /> Open source activity
                </h3>
                <div className="flex items-center gap-3">
                    {years.length > 0 && (
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            aria-label="Select year"
                            className="bg-slate-800 text-gray-100 text-sm rounded-md border border-slate-600 px-2 py-1 focus:outline-none focus:border-yellow-500"
                        >
                            {years.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                    )}
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-400 hover:underline">
                    @{USER} on GitHub
                </a>
                </div>
            </div>

            {failed ? (
                <p className="text-sm text-gray-400">
                    Contribution graph is unavailable right now. See my work on{' '}
                    <a href={SOCIAL_LINKS.github} className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
                </p>
            ) : (
                <>
                    <p className="text-sm text-gray-400 mb-3 h-5">
                        {weeks && <><span className="text-gray-100 font-semibold">{total.toLocaleString()}</span> contributions in {year}</>}
                    </p>
                    <div ref={scroller} className="overflow-x-auto pb-2" role="img" aria-label="GitHub contribution graph">
                        <div className="inline-flex flex-col gap-1 min-w-max">
                            <div className="flex gap-[3px] h-4 text-gray-500" style={{ fontSize: 10, lineHeight: '16px' }}>
                                {(weeks || Array.from({ length: 53 })).map((w, i, arr) => {
                                    const first = w?.find(Boolean);
                                    const m = first ? new Date(`${first.date}T00:00:00Z`).getUTCMonth() : null;
                                    const prev = i > 0 && arr[i - 1]?.find?.(Boolean);
                                    const pm = prev ? new Date(`${prev.date}T00:00:00Z`).getUTCMonth() : null;
                                    return <div key={i} className="w-3 relative">{m !== null && m !== pm && <span className="absolute left-0" style={{ fontSize: 10, lineHeight: "16px" }}>{MONTHS[m]}</span>}</div>;
                                })}
                            </div>
                            <div className="flex gap-[3px]">
                                {(weeks || Array.from({ length: 53 }, () => Array(7).fill(null))).map((w, i) => (
                                    <div key={i} className="flex flex-col gap-[3px]">
                                        {Array.from({ length: 7 }, (_, r) => {
                                            const d = w[r];
                                            return (
                                                <div
                                                    key={r}
                                                    title={d ? `${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}` : undefined}
                                                    className={`w-3 h-3 rounded-[3px] ${d ? LEVELS[d.level] : weeks ? 'bg-transparent' : 'bg-slate-800 animate-pulse'}`}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {!compact && (
                        <div className="flex items-center justify-end gap-1 mt-2 text-gray-500" style={{ fontSize: 11 }}>
                            Less {LEVELS.map((c) => <span key={c} className={`w-3 h-3 rounded-[3px] ${c}`} />)} More
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GithubActivity;
