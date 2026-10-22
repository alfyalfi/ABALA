const CACHE_NAME = 'abala-cache-v3';

const STATIC_ASSETS = [
  '/',
  '/learn',
  '/room',
  '/collection',
  '/parent',
  '/manifest.json',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon.svg',
  '/sounds/ambulance_siren.mp3',
  '/sounds/bee_buzz.mp3',
  '/sounds/bicycle_bell.mp3',
  '/sounds/bird_chirp.mp3',
  '/sounds/car_horn.mp3',
  '/sounds/cat_meow.mp3',
  '/sounds/clock_tick.mp3',
  '/sounds/cow_moo.mp3',
  '/sounds/cricket_chirp.mp3',
  '/sounds/dog.mp3',
  '/sounds/duck_quack.mp3',
  '/sounds/lion_growl.mp3',
  '/sounds/owl_hoot.mp3',
  '/sounds/rain_sound.mp3',
  '/sounds/rooster_crow.mp3',
  '/sounds/thunder_sound.mp3',
  '/sounds/train_horn.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('PWA precache partial warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests. Do not intercept POST / PUT / DELETE
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // 1. Audio and Static Sounds (/sounds/*.mp3) -> Cache-first
  if (url.pathname.startsWith('/sounds/') || url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // 2. Images and Fonts -> Cache-first
  if (
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('wikimedia.org') ||
    event.request.destination === 'image' ||
    event.request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // 3. Curriculum API GET requests -> Network-first with cache fallback
  if (url.pathname.startsWith('/api/curriculum')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // 4. HTML Navigation / Page Routes -> Network-first with cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return caches.match('/');
          });
        })
    );
    return;
  }

  // 5. Default: Network with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
