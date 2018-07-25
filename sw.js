var assetServerUrl = 'https://assets.ubuntu.com';
var thirdPartyAssetPaths = [
  '/v1/61d83c7e-icon-github.svg',
  '/v1/4a810e12-guidelines-illustration.svg',
  '/v1/a81f84ba-github-icon.svg',
  '/v1/e2ac88af-juju_black-orange_hex.svg'
];

// when requesting asset, if it doesn't exist but the path is in thirdPartyAssetPaths,
// use the corresponding asset

self.addEventListener('install', function(event) {
  // event.waitUntil(
  //   caches.open('v1').then(function(cache) {
  //     thirdPartyAssetPaths.forEach(function(assetPath) {
  //       var request = new Request(assetServerUrl + assetPath, {
  //         mode: 'no-cors'
  //       });

  //       fetch(request).then(function(response) {
  //         cache.put(request, response);
  //       });
  //     });

  //     return cache.addAll([
  //       '/',
  //       '/index.html',
  //       '/css/main.css'
  //     ]);
  //   })
  // );
});

self.addEventListener('fetch', function(event) {
  console.log(event);
  // event.respondWith(
  //   caches.open('v1').then(function(cache) {
  //     return cache.match(event.request).then(function (response) {
  //       if (event.request.includes(assetServerUrl)) {
  //       }

  //       return response || fetch(event.request).then(function(response) {
  //         cache.put(event.request, response.clone());
  //         return response;
  //       });
  //     });
  //   })
  // );
});
