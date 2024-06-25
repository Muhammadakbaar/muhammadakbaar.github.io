const CACHE_NAME = 'my-portfolio-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/styles.css',
    '/js/app.js',
    '/icons/icons8-son-goku-48.png',
    '/icons/icons8-son-goku-72.png',
    '/icons/icons8-son-goku-96.png',
    '/icons/icons8-son-goku-128.png',
    '/icons/icons8-son-goku-192.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
    'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfedw.ttf', // example font URL
    'https://raw.githubusercontent.com/Muhammadakbaar/Some-Picture/main/654244.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
