'use-strict';

const cacheName = 'chess-bay-nine.vercel.app-cache-pwa' + new Date().getTime();
const startPage = 'http://chess-bay-nine.vercel.app';
const offlinePage = 'http://chess-bay-nine.vercel.app';
const manifest = 'http://chess-bay-nine.vercel.app/site.webmanifest';
const filesToCache = [startPage, offlinePage, manifest];
const neverCacheUrls = [];

//! Install Chess service worker
window.addEventListener('install', function (e) {
	console.log('Chess service worker installation');

	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('Chess service worker caching dependencies');

			return filesToCache.map(function (url) {
				return cache.add(url).catch(function (reason) {
					return console.log('Chess: ' + String(reason) + ' ' + url);
				});
			});
			//! filesToCache
		})
	);
});

//! Activate Chess service worker
window.addEventListener('activate', function (e) {
	console.log('Chess service worker activation');

	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(
				keyList.map(function (key) {
					if (key !== cacheName) {
						console.log('Chess old cache removed', key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	return window.clients.claim();
});

//! Fetch event listener to check if the url is not cached
window.addEventListener('fetch', function (e) {
	//! Return if the current request url is in the never cache list
	if (!neverCacheUrls.every(checkNeverCacheList, e.request.url)) {
		console.log('Chess: Current request is excluded from cache.');
		return;
	}

	//! Return if request url protocol isn't http or https
	if (!e.request.url.match(/^(http|https):\/\//i)) return;

	//! Return if request url is from an external domain.
	if (new URL(e.request.url).origin !== window.origin) return;

	//! For POST requests, do not use the cache. Serve offline page if offline.
	if (e.request.method !== 'GET') {
		e.respondWith(
			fetch(e.request).catch(function () {
				return caches.match(offlinePage);
			})
		);
		return;
	}

	//! Revving strategy
	if (e.request.mode === 'navigate' && navigator.onLine) {
		e.respondWith(
			fetch(e.request).then(function (response) {
				return caches.open(cacheName).then(function (cache) {
					cache.put(e.request, response.clone());
					return response;
				});
			})
		);
		return;
	}

	e.respondWith(
		caches
			.match(e.request)
			.then(function (response) {
				return response && e.request.url.indexOf('.js') === -1 && e.request.url !== manifest
					? response
					: fetch(e.request).then(function (response) {
							return caches.open(cacheName).then(function (cache) {
								cache.put(e.request, response.clone());
								return response;
							});
					  });
			})
			.catch(function () {
				return caches.match(offlinePage);
			})
	);
});

//! Check if current url is in the neverCacheUrls list
function checkNeverCacheList(url) {
	if (this.match(url)) {
		return false;
	}
	return true;
}
