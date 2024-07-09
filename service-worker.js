const CACHE_NAME = 'portfolio-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/app.js',
  '/img/hero1.png',
  '/icons/icons8-son-goku-48.png',
  '/icons/icons8-son-goku-72.png',
  '/icons/icons8-son-goku-96.png',
  '/icons/icons8-son-goku-128.png',
  '/icons/icons8-son-goku-192.png',
  '/manifest.json',
  '/cv.pdf',
  '/img/port1.png',
  '/img/port2.svg',
  '/img/port3.png',
  '/img/port4.jpg',
  '/img/port5.png',
  '/img/port6.png',
  '/styles/_media.scss',
  '/styles/styles.css',
  '/styles/styles.css.map',
  '/styles/styles.scss',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache files during install:', error);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Mengembalikan respons dari cache jika tersedia
        }
        // Jika tidak ada di cache, ambil dari jaringan
        return fetch(event.request)
          .then(fetchResponse => {
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache); // Menyimpan respons ke cache
              });

            return fetchResponse;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            throw error;
          });
      })
  );
});

