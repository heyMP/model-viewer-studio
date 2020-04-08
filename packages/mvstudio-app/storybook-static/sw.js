/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "iframe.html",
    "revision": "d6c4f19f55bfa48b994286bbd06be853"
  },
  {
    "url": "index.html",
    "revision": "7f04d4f1523f0208dcdd19dd583d5bb1"
  },
  {
    "url": "inline-entry.0-3c99fbf0.js",
    "revision": "1eb66b4744be9467cb1845b454d5a2cc"
  },
  {
    "url": "inline-entry.0-e9f55b88.js",
    "revision": "3e2e502b104e42bd4ad9b46d976feb4e"
  },
  {
    "url": "legacy/inline-entry.0-5010400e.js",
    "revision": "70bfc9cc1ae236ecaa9cc636d2206fb3"
  },
  {
    "url": "legacy/inline-entry.0-628a4792.js",
    "revision": "ccdd00743810e4339b66dca543646c7f"
  },
  {
    "url": "legacy/lit-html-faac7cfd.js",
    "revision": "9e424610954dfdb137378b104c0e70ef"
  },
  {
    "url": "legacy/storybook-c3463d25.js",
    "revision": "c41d50868631edf0f5cb09127f30c965"
  },
  {
    "url": "legacy/storybook-d9cb74a0.js",
    "revision": "9689ca95f53c0f9db8f9161698c89e82"
  },
  {
    "url": "lit-html-768dc862.js",
    "revision": "f75cc3a2ae6b278b3ca19be9b94f9b3b"
  },
  {
    "url": "polyfills/core-js.577a5602a7262d6256830802d4aaab43.js",
    "revision": "ccf205728fe514f8276191669b5ea48d"
  },
  {
    "url": "polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js",
    "revision": "cff507bc95ad1d6bf1a415cc9c8852b0"
  },
  {
    "url": "polyfills/dynamic-import.991be47e17117abb5eb15f5254ad3869.js",
    "revision": "08b86a7f56c6f0d65265654299b16d74"
  },
  {
    "url": "polyfills/fetch.191258a74d74243758f52065f3d0962a.js",
    "revision": "fcdc4efda1fe1b52f814e36273ff745d"
  },
  {
    "url": "polyfills/regenerator-runtime.9090ed1c23690e3072c21a7873cad285.js",
    "revision": "9af9d9e480dfccc420d30729e319b821"
  },
  {
    "url": "polyfills/systemjs.6dfbfd8f2c3e558918ed74d133a6757a.js",
    "revision": "683aabfb9b006607885b83e45e9a1768"
  },
  {
    "url": "polyfills/webcomponents.6954abecfe8b165751e6bc9b0af6c639.js",
    "revision": "894a294495257c3d389efa3e1bd9bde7"
  },
  {
    "url": "storybook-6e6fde52.js",
    "revision": "7f91d24dc7aab37c168828f1145aacd7"
  },
  {
    "url": "storybook-e4033096.js",
    "revision": "626cdf72ba2257648ceaf83e9cad1575"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
