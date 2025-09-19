
import pepData from '../data/pep-data.json';

const DOMAIN = 'https://better-pep.vercel.app';

export default function sitemap() {
    const staticPages = [
        {
            url: `${DOMAIN}/`,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${DOMAIN}/search`,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Add all exam paper URLs (if you have individual pages, e.g. /pep/[id])
    const pepPages = Array.isArray(pepData) ? pepData.map((pep) => ({
            url: `${DOMAIN}/search?subjectId=${encodeURIComponent(pep.index)}`,
            changeFrequency: 'monthly',
            priority: 0.5,
        })) : [];

    return [...staticPages, ...pepPages];
}
