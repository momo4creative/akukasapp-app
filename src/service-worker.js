/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('install', (e) => {
	async function addFileToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	e.waitUntil(addFileToCache());
});

sw.addEventListener('activate', (e) => {
	async function deleteOldCache() {
		for (const key of await caches.keys()) {
			if (key != CACHE) await caches.delete(key);
		}
	}
	e.waitUntil(deleteOldCache());
});

sw.addEventListener('fetch', (e) => {
	if (e.request.method !== 'GET') return;
	async function respond() {
		const url = new URL(e.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);
			if (response) return response;
		}

		try {
			const response = await fetch(e.request);
			if (!(response instanceof Response)) throw new Error('Invalid response form fetch !');

			if (response.status == '200') {
				cache.put(e.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(e.request);
			if (response) return response;
			throw err;
		}
	}

	e.respondWith(respond());
});
