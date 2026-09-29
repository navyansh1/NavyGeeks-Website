import React from 'react';
import { Head } from 'vite-react-ssg';
import { DEFAULT_IMAGE, SITE_NAME, absoluteUrl } from '../data/site';

const jsonLd = (data) => JSON.stringify({ '@context': 'https://schema.org', ...data });

/**
 * Per-page <head>: title, description, canonical, Open Graph / Twitter cards, JSON-LD.
 *
 * - `title` is used as-is (include the site name yourself where wanted).
 * - `path` is the route path, e.g. "/research/some-paper".
 * - `schema` is one JSON-LD object or an array of them (without "@context").
 * - `keywords` is an optional array of keywords for the page.
 * - `meta` is an array of extra { name, content } tags (e.g. Google Scholar citation_* tags).
 */
const Seo = ({
    title,
    description,
    path = '/',
    image = DEFAULT_IMAGE,
    type = 'website',
    noindex = false,
    keywords,
    schema,
    meta = [],
}) => {
    const url = absoluteUrl(path);
    const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
            <link rel="canonical" href={url} />
            {noindex && <meta name="robots" content="noindex, follow" />}

            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {meta.map(({ name, content }, i) => (
                <meta key={`${name}-${i}`} name={name} content={content} />
            ))}

            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">{jsonLd(s)}</script>
            ))}
        </Head>
    );
};

export default Seo;
