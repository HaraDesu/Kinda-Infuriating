// Service Worker implementation
var CACHE_NAME = 'useless-cache';
var urlsToCache = [
  '/', // Cache the root URL
  '/index.html', // Cache the main HTML file (if different from root URL)
  '/styles.css', // Cache the CSS file
  '/script.js', // Cache the JavaScript file
  '/favicon-watashi.png', // Cache the favicon file
  // Add any other files you want to cache
];

self.addEventListener('install', function(event) {
  // Perform the install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
