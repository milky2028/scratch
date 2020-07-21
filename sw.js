function shouldCache(url) {
  // if it's a request for marge img, don't cache it
  return !url.includes("marge");
}

// sw is a network proxy, listen for fetch events and intercept
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (shouldCache(event.request.url)) {
        const cachedResponse = await self.caches.match(event.request);
        if (cachedResponse) {
          // If the response exists in the cache, serve it.
          return cachedResponse;
        } else {
          // Else, fetch all other requests and put them in the cache after they've been fetched.
          const response = await fetch(event.request);
          const cache = await caches.open("basic");
          cache.put(event.request, response.clone());
          return response;
        }
      }

      return fetch(event.request);
    })()
  );
});

// Some Service Worker Gotchas
// 1. The service worker does not have access to CORs requests and marks these responses as "opaque." Without access to opaque responses, all these responses are marked with the maximum request size of 7MB.
// 2. A refresh keeps the servie worker alive and does not refresh it. This also is true if you have multiple tabs open. Close the tab completely or check "update on reload" in Chrome devtools.
// 3. Promises in install and activate events need to be awaited so that install and activate events can be completed properly.
// 4. "fetch" listeners include xhr requests as well.
// 5.
