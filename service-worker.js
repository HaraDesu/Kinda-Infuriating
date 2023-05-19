// Service Worker implementation
var CACHE_NAME = 'useless-cache';
var urlsToCache = [
  '/useless', // Cache the root URL
  '/useless/index.html', // Cache the main HTML file (if different from root URL)
  '/useless/styles.css', // Cache the CSS file
  '/useless/script.js', // Cache the JavaScript file
  '/useless/favicon-watashi.png', // Cache the favicon file
  // Add any other files you want to cache
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
     .then(function() {
        console.log('Cache updated');
      })
      .catch(function(error) {
        console.error('Cache update failed:', error);
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
