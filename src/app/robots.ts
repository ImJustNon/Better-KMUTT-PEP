
const DOMAIN = 'https://better-pep.vercel.app';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: `${DOMAIN}/sitemap.xml`,
    };
}
