const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'expfunction.js',
    '/image/favicon.ico',
    '/image/icon.png'

];

self.addEventListener('install', event => {
    console.log('Service worker Install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    )
});

self.addEventListener('activate', event => {
    console.log('Activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});