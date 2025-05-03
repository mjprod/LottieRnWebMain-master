const CACHE_NAME = "app-cache-v0.0.1";
const urlsToCache = [
  "/",
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          urlsToCache.map((url) =>
            fetch(url).then((response) => {
              if (!response.ok) {
                console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
                return;
              }
              return cache.put(url, response);
            }).catch((err) => {
              console.error(`Error caching ${url}:`, err);
            })
          )
        );
      })
      .catch((err) => {
        console.error('Service worker installation failed:', err);
      })
  );
});

// Intercept Network Requests & Serve Cached Files
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});

// Update Cache When New Version is Available
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});