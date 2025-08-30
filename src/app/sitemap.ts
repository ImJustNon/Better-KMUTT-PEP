import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://better-pep.vercel.app/',
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://better-pep.vercel.app/search',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
