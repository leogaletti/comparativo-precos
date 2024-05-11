const CACHE_NAME = "comparativo-precos-cache-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/manifest.json",
	"/static/css/main.chunk.css",
	"/static/js/bundle.js",
	"/static/js/main.chunk.js",
	"/static/js/0.chunk.js",
];

self.addEventListener("install", (event) => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});
