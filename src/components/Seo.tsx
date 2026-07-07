import { useEffect } from 'react';
import { SITE } from '../constants';

interface SeoProps {
  title: string;
  description?: string;
  /** Route path, e.g. '/speaking'. Used for canonical + og:url. */
  path: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/** Per-route document metadata (SPA navigation); build-time prerender handles crawlers. */
const Seo: React.FC<SeoProps> = ({ title, description = SITE.description, path }) => {
  useEffect(() => {
    const url = SITE.url + (path === '/' ? '/' : path);
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [title, description, path]);

  return null;
};

export default Seo;
