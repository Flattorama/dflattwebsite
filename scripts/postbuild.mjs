// Post-build step for GitHub Pages:
//  1. 404.html shim so deep links (/about, /blog/…) render instead of 404ing
//  2. Static per-route index.html copies with route-specific title/meta/canonical,
//     so crawlers and link-preview scrapers see correct metadata on every URL
//  3. sitemap.xml and rss.xml generated from the route table + markdown posts
//  4. og-image.png + favicon PNGs rasterized from SVG (skipped with a warning if
//     sharp is unavailable, so the build never hard-fails on image tooling)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE_URL = 'https://danflatt.ca';

// ---------- posts ----------
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  }
  return meta;
}

const postsDir = join(root, 'src', 'posts');
const posts = existsSync(postsDir)
  ? readdirSync(postsDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const meta = parseFrontmatter(readFileSync(join(postsDir, f), 'utf8'));
        return { slug: f.replace(/\.md$/, ''), ...meta };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  : [];

// ---------- routes ----------
const DEFAULT_DESC =
  'Senior marketing executive and 2x tech founder building AI-native marketing organizations. Speaker and writer on AI in marketing. Toronto.';

const routes = [
  { path: '/', title: 'Dan Flatt — Marketing & AI Leader | Speaker, 2x Founder', desc: DEFAULT_DESC },
  { path: '/about', title: 'About — Dan Flatt', desc: 'From courtroom to Claude: physics, law, consulting, two startups, Bell, AMD, Sportball — and the five-brand AI-native marketing portfolio Dan Flatt leads today.' },
  { path: '/speaking', title: 'Speaking — Dan Flatt | The Marketing Executive Who Actually Builds with AI', desc: 'Keynotes and talks on AI-native marketing organizations, agents and workflows, and governed AI — from an operator with receipts. Book Dan Flatt to speak.' },
  { path: '/community', title: 'Community Leadership — Dan Flatt', desc: 'Two decades of Jewish community leadership: legal-operations leadership, policy research with national media impact, and an 8,500-member business network.' },
  { path: '/blog', title: 'Writing — Dan Flatt', desc: 'Essays and teardowns on AI-native marketing organizations, agent architectures, governed AI, and multi-brand growth.' },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} — Dan Flatt`,
    desc: p.description || DEFAULT_DESC,
  })),
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const template = readFileSync(join(dist, 'index.html'), 'utf8');

function htmlFor(route) {
  const url = SITE_URL + (route.path === '/' ? '/' : route.path);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.desc)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(route.desc)}$2`);
}

for (const route of routes) {
  if (route.path === '/') {
    writeFileSync(join(dist, 'index.html'), htmlFor(route));
    continue;
  }
  const dir = join(dist, ...route.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlFor(route));
}

// 404 shim: serves the SPA shell for any unknown path
writeFileSync(join(dist, '404.html'), template);
console.log(`postbuild: wrote ${routes.length} route pages + 404.html`);

// ---------- sitemap ----------
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
console.log('postbuild: wrote sitemap.xml');

// ---------- rss ----------
const rssItems = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title || p.slug)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date || today).toUTCString()}</pubDate>
      <description>${esc(p.description || '')}</description>
    </item>`
  )
  .join('\n');
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dan Flatt — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Essays and teardowns on AI-native marketing organizations, governed AI, and multi-brand growth.</description>
    <language>en-ca</language>
${rssItems}
  </channel>
</rss>
`;
writeFileSync(join(dist, 'rss.xml'), rss);
console.log(`postbuild: wrote rss.xml (${posts.length} posts)`);

// ---------- og image + favicons ----------
const OG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fcf8f3"/>
  <ellipse cx="600" cy="330" rx="430" ry="130" fill="none" stroke="#8082f8" stroke-width="3" opacity="0.5" transform="rotate(-8 600 330)"/>
  <g fill="#8082f8" shape-rendering="crispEdges" opacity="0.9">
    <rect x="150" y="200" width="18" height="18"/>
    <rect x="172" y="200" width="18" height="18" opacity="0.6"/>
    <rect x="150" y="222" width="18" height="18" opacity="0.6"/>
    <rect x="1032" y="410" width="18" height="18"/>
    <rect x="1010" y="410" width="18" height="18" opacity="0.6"/>
    <rect x="1032" y="388" width="18" height="18" opacity="0.6"/>
  </g>
  <text x="600" y="300" text-anchor="middle" font-family="'Arial Black', 'DejaVu Sans', Arial, sans-serif" font-weight="900" font-size="130" letter-spacing="6" fill="#1a1a1a">DAN FLATT</text>
  <text x="600" y="392" text-anchor="middle" font-family="'Arial Black', 'DejaVu Sans', Arial, sans-serif" font-weight="900" font-size="46" letter-spacing="10" fill="#8082f8">MARKETING &amp; AI LEADER</text>
  <text x="600" y="470" text-anchor="middle" font-family="Arial, 'DejaVu Sans', sans-serif" font-size="28" letter-spacing="4" fill="#6b6b6b">SPEAKER · 2X FOUNDER · TORONTO</text>
  <text x="600" y="560" text-anchor="middle" font-family="Arial, 'DejaVu Sans', sans-serif" font-size="24" letter-spacing="3" fill="#8082f8">DANFLATT.CA</text>
</svg>`;

try {
  const { default: sharp } = await import('sharp');
  await sharp(Buffer.from(OG_SVG)).png().toFile(join(dist, 'og-image.png'));
  const faviconSvg = readFileSync(join(root, 'public', 'favicon.svg'));
  await sharp(faviconSvg, { density: 300 }).resize(32, 32).png().toFile(join(dist, 'favicon-32.png'));
  await sharp(faviconSvg, { density: 300 }).resize(180, 180).png().toFile(join(dist, 'apple-touch-icon.png'));
  console.log('postbuild: wrote og-image.png + favicon PNGs');
} catch (err) {
  console.warn('postbuild: skipped OG/favicon rasterization —', err.message);
}
