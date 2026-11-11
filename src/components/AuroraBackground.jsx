import React, { useEffect, useRef, useState } from 'react';
import portraitWebm from '../assets/bg/aurora-portrait.webm';
import portraitMp4 from '../assets/bg/aurora-portrait.mp4';
import landscapeWebm from '../assets/bg/aurora-landscape.webm';
import landscapeMp4 from '../assets/bg/aurora-landscape.mp4';
import grain from '../assets/bg/grain.png';
import { portraitPoster, landscapePoster } from './auroraPosters';

const videos = {
    portrait: { webm: portraitWebm, mp4: portraitMp4, poster: portraitPoster },
    landscape: { webm: landscapeWebm, mp4: landscapeMp4, poster: landscapePoster },
};

// Site-wide background: a looping aurora video (plays forward then reverse, so it never jumps)
// with a still grain layer on top. It lives in the shared Layout, so it keeps playing while
// visitors move between pages.
//
// - The still poster is plain CSS, so it shows instantly, even before JavaScript runs, and
//   stays as the background when video can't autoplay (e.g. iPhone Low Power Mode).
// - The video is added only after the page has loaded, so it never delays the page itself.
// - Visitors who turn on "reduce motion" only get the still image.
const AuroraBackground = () => {
    const [shape, setShape] = useState(null); // 'portrait' | 'landscape' once mounted
    const [playing, setPlaying] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const portrait = window.matchMedia('(orientation: portrait)');
        const update = () => setShape(reduceMotion.matches ? null : (portrait.matches ? 'portrait' : 'landscape'));

        let started = false;
        const start = () => {
            if (started) return;
            started = true;
            update();
        };
        // Wait until the page has finished loading before fetching the video.
        if (document.readyState === 'complete') start();
        else window.addEventListener('load', start, { once: true });

        const onChange = () => { if (started) update(); };
        portrait.addEventListener('change', onChange);
        reduceMotion.addEventListener('change', onChange);
        return () => {
            window.removeEventListener('load', start);
            portrait.removeEventListener('change', onChange);
            reduceMotion.removeEventListener('change', onChange);
        };
    }, []);

    // iPhone Safari only plays a video on its own if it has the HTML `muted` attribute, and
    // React sets `muted` only as a property, so set both here. There is deliberately no
    // `autoplay` attribute: in Low Power Mode iOS always draws its own play button on
    // videos that have it, and CSS can't hide that button. Instead we start the video from
    // code; if iOS refuses (Low Power Mode, data saver), the video is removed and the still
    // poster with grain stays.
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        setPlaying(false);
        el.muted = true;
        el.defaultMuted = true;
        el.setAttribute('muted', '');
        el.setAttribute('playsinline', '');
        el.setAttribute('webkit-playsinline', '');
        const p = el.play?.();
        if (p && p.catch) p.catch(() => setBlocked(true));
    }, [shape]);

    const v = !blocked && shape && videos[shape];

    return (
        <div className="aurora-bg" aria-hidden="true">
            {v && (
                <video
                    key={shape}
                    ref={videoRef}
                    className={`aurora-bg__video${playing ? ' is-playing' : ''}`}
                    onPlaying={() => setPlaying(true)}
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    preload="auto"
                    poster={v.poster}
                >
                    {/* Codec strings let each browser skip a format it can't decode */}
                    <source src={v.webm} type='video/webm; codecs="vp9"' />
                    <source src={v.mp4} type='video/mp4; codecs="avc1.640028"' />
                </video>
            )}
            <div className="aurora-bg__grain" style={{ backgroundImage: `url(${grain})` }} />
        </div>
    );
};

export default AuroraBackground;
