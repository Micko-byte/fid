export interface LivePreview {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘",
  rdquo: "”", ldquo: "“", middot: "·",
};

/**
 * Meta tags carry HTML-encoded text, so a scraped title arrives as
 * "Kenya&#39;s first celebration". React then escapes it again on render and the
 * raw entity shows on the page — decode once here, at the point of extraction.
 */
function decodeEntities(s: string) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

function readMetaByName(html: string, name: string) {
  const direct = html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i"))?.[1];
  if (direct) return decodeEntities(direct.trim());
  const reversed = html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${name}["'][^>]*>`, "i"))?.[1];
  if (reversed) return decodeEntities(reversed.trim());
  return undefined;
}

function readImage(html: string) {
  return (
    readMetaByName(html, "twitter:image") ||
    readMetaByName(html, "twitter:image:src") ||
    readMetaByName(html, "og:image") ||
    readMetaByName(html, "thumbnail")
  );
}

function normalizeUrl(url: string, base: string) {
  if (!url) return undefined;
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

export async function fetchLivePreview(url: string, fallback: LivePreview = {}): Promise<LivePreview> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; FIDPreviewBot/1.0)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!res.ok) return fallback;

    const html = await res.text();
    const rawTitle = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();
    const title = readMetaByName(html, "og:title") || readMetaByName(html, "twitter:title") || (rawTitle ? decodeEntities(rawTitle) : undefined);
    const description = readMetaByName(html, "description") || readMetaByName(html, "og:description") || readMetaByName(html, "twitter:description");
    const image = normalizeUrl(readImage(html) ?? "", res.url);
    const siteName = readMetaByName(html, "og:site_name") || readMetaByName(html, "application-name");

    return {
      title: title?.trim() || fallback.title,
      description: description?.trim() || fallback.description,
      image: image || fallback.image,
      siteName: siteName?.trim() || fallback.siteName,
    };
  } catch {
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}
