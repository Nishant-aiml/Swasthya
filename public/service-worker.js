const CACHE_NAME = 'swasthyacare-v1';
const DYNAMIC_CACHE = 'swasthyacare-dynamic-v1';

// Resources that should be pre-cached
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/static/css/main.chunk.css',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/offline.html'  // Fallback page for offline mode
];

// API endpoints to cache
const API_CACHE_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://nominatim.openstreetmap.org'
];

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Handle API requests
  if (API_CACHE_URLS.some(apiUrl => event.request.url.includes(apiUrl))) {
    event.respondWith(handleApiRequest(event.request));
    return;
  }

  // Handle static assets
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Handle API requests with a stale-while-revalidate strategy
async function handleApiRequest(request) {
  const cachedResponse = await caches.match(request);
  const networkResponsePromise = fetch(request).then(response => {
    if (response && response.status === 200) {
      const responseToCache = response.clone();
      caches.open(DYNAMIC_CACHE)
        .then(cache => cache.put(request, responseToCache));
    }
    return response;
  });

  return cachedResponse || networkResponsePromise;
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-emergency-contact') {
    event.waitUntil(syncEmergencyContacts());
  }
});

// Periodic cache cleanup
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cacheNames = await caches.keys();
  const now = Date.now();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const responseDate = new Date(response.headers.get('date'));

      if (now - responseDate.getTime() > CACHE_DURATION) {
        await cache.delete(request);
      }
    }
  }
}

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/logo192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Swasthya Healthcare', options)
  );
});
