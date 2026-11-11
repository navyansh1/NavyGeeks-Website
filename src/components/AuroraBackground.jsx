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

    // Some browsers ignore autoPlay on elements added later; nudge it, and ignore refusals
    // (the poster stays visible in that case).
    useEffect(() => {
        const v = videoRef.current;
        if (v) v.play?.().catch(() => {});
    }, [shape]);

    const v = shape && videos[shape];

    return (
        <div className="aurora-bg" aria-hidden="true">
            {v && (
                <video
                    key={shape}
                    ref={videoRef}
                    className="aurora-bg__video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    preload="auto"
                    poster={v.poster}
                >
                    <source src={v.webm} type="video/webm" />
                    <source src={v.mp4} type="video/mp4" />
                </video>
            )}
            <div className="aurora-bg__grain" style={{ backgroundImage: `url(${grain})` }} />
        </div>
    );
};

export default AuroraBackground;
