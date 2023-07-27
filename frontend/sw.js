const ver = 'v1';

this.addEventListener('install', (event) => {
  event.waitUntil(caches.open(ver).then((cache) => cache.addAll(['/', '/game', 'home'])));
});

this.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(ver).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== ver) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
