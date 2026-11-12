// Which path sits at each step of this tab's history (filled in by Layout on every page
// change). BackLink uses it to tell whether the previous step is the parent page.
const TRAIL_KEY = 'navTrail';
const samePath = (a, b) => (a || '').replace(/\/+$/, '') === (b || '').replace(/\/+$/, '');

export const recordHistoryStep = (pathname) => {
    try {
        const idx = window.history.state?.idx ?? 0;
        const trail = JSON.parse(sessionStorage.getItem(TRAIL_KEY) || '{}');
        trail[idx] = pathname;
        sessionStorage.setItem(TRAIL_KEY, JSON.stringify(trail));
    } catch { /* storage unavailable: BackLink just links to the parent */ }
};

export const previousStepIs = (path) => {
    try {
        const idx = window.history.state?.idx ?? 0;
        if (idx < 1) return false;
        const trail = JSON.parse(sessionStorage.getItem(TRAIL_KEY) || '{}');
        return samePath(trail[idx - 1], path);
    } catch {
        return false;
    }
};
