const CACHE_NAME = "mole-game-v29";

const ASSET_PATHS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./supabase-ranking.js",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

function assetUrl(path) {
  return new URL(path, self.location).href;
}

const PRECACHE_URLS = ASSET_PATHS.map(assetUrl);

async function precacheAssets(cache) {
  await Promise.all(
    PRECACHE_URLS.map(async (url) => {
      try {
        await cache.add(url);
      } catch {
        /* supabase-config.js など任意ファイルはスキップ */
      }
    })
  );
  try {
    await cache.add(assetUrl("./supabase-config.js"));
  } catch {
    /* ローカルに無い場合（GitHub Pages 等）は無視 */
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => precacheAssets(cache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isSameOrigin(request) {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch {
    return false;
  }
}

function isAppAssetRequest(request) {
  if (request.method !== "GET" || !isSameOrigin(request)) return false;
  const path = new URL(request.url).pathname;
  return (
    path.endsWith(".html") ||
    path.endsWith(".css") ||
    path.endsWith(".js") ||
    path.endsWith(".json") ||
    path.endsWith(".svg") ||
    path.endsWith(".png") ||
    path.endsWith("/") ||
    path.endsWith("/mole-game") ||
    path.endsWith("/mole-game/")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (!isSameOrigin(request)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(assetUrl("./index.html")).then(
            (cached) => cached || caches.match(assetUrl("./"))
          )
        )
    );
    return;
  }

  if (!isAppAssetRequest(request)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
