// src/pages/sitemap.xml.ts - WITHOUT NEWSLETTER PAGE
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Sitemap generation failed: Site URL not set', { status: 500 });
  }

  // 1. Fetch all posts from the 'posts' collection
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  // 2. Map posts to correct nested URLs using post.slug
  const postsMap = posts
    .map((post) => {
      const lastModDate = post.data.updatedDate ?? post.data.date;
      if (!lastModDate) {
        console.warn(`Post ${post.slug} has no date field!`);
      }
      const lastMod = lastModDate ? new Date(lastModDate).toISOString() : new Date().toISOString();

      return `
        <url>
          <loc>${new URL(`/blog/${post.slug}`, site).href}</loc>
          <lastmod>${lastMod}</lastmod>
          <priority>0.8</priority>
          <changefreq>weekly</changefreq>
        </url>
      `;
    })
    .join('\n');

  // 3. ALL 11 pillar category pages
  const allCategories = [
    "airdrop-farming",
    "defi-yield", 
    "getting-started",
    "infrastructure-tech",
    "portfolio-management",
    "prediction-markets",
    "regulatory-tax",
    "research-analysis",
    "security-privacy",
    "tools-automation",
    "trading-investing"
  ];

  const categoryMap = allCategories
    .map((category) => `
      <url>
        <loc>${new URL(`/categories/${category}`, site).href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
        <changefreq>weekly</changefreq>
      </url>
    `)
    .join('\n');

  // 4. Static pages - NEWSLETTER REMOVED
  const staticPages = [
    { loc: site.href, priority: 1.0, changefreq: 'daily' }, // Homepage
    { loc: '/blog', priority: 0.9, changefreq: 'daily' }, // Main blog page
    { loc: '/categories', priority: 0.8, changefreq: 'daily' }, // Categories overview
    { loc: '/services', priority: 0.9, changefreq: 'weekly' }, // Services (MONEY PAGE)
    { loc: '/tools', priority: 0.8, changefreq: 'weekly' }, // Tools
    { loc: '/about', priority: 0.7, changefreq: 'monthly' }, // About
    { loc: '/authors/nefu', priority: 0.7, changefreq: 'weekly' }, // Author
    { loc: '/privacy', priority: 0.5, changefreq: 'yearly' }, // Privacy
    { loc: '/contact', priority: 0.6, changefreq: 'yearly' }, // Contact
    { loc: '/disclaimer', priority: 0.5, changefreq: 'yearly' }, // Disclaimer
  ];

  const staticMap = staticPages
    .map((page) => `
      <url>
        <loc>${new URL(page.loc, site).href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${page.priority}</priority>
        <changefreq>${page.changefreq}</changefreq>
      </url>
    `)
    .join('\n');

  // 5. Final XML - Clean without newsletter
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticMap}
  ${categoryMap}
  ${postsMap}
</urlset>`.trim();

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};