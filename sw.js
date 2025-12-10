const CACHE_NAME = 'my-quiz-v1';
const urlsToCache = [
  '/quiz1/',
  '/quiz1/index.html',
  '/quiz1/manifest.json',
  '/quiz1/icon-192.png',
  '/quiz1/icon-512.png'
  '/quiz1/food_br.json'
  '/quiz1/slang_br.json'
  '/quiz1/phrasal-verbs_x.json'
  '/quiz1/slang_nl.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});
