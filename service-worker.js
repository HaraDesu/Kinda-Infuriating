// Service Worker implementation
var CACHE_NAME = 'useless-cache';
var urlsToCache = [
  '/', // Cache the root URL
  '/index.html', // Cache the main HTML file (if different from root URL)
  '/useless', // Cache the actual...
  '/styles.css', // Cache the CSS file
  '/script.js', // Cache the JavaScript file
  '/favicon-watashi.png', // Cache the favicon file
  // Add any other files you want to cache
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Remove outdated caches
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
