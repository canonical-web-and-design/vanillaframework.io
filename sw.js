var assetServerUrl = 'https://assets.ubuntu.com';
var thirdPartyAssetPaths = [
  '/v1/1958451f-pictogram_lightweight01b-dark.svg',
  '/v1/730b14b9-pictogram_extension01-dark.svg',
  '/v1/ff78e55c-pictogram_opensource01-dark.svg',
  '/v1/e2ac88af-juju_black-orange_hex.svg',
  '/v1/739d1f1f-guidelines-illustration.svg',
  '/v1/0276b842-github-icon.svg',
  '/v1/9a5b9c51-sketch-icon.svg',
  '/v1/ff7dd096-logo-canonical-aubergine.svg',
  '/v1/3b52f57c-ubuntu.svg',
  '/v1/01c0e480-landscape_black-orange_hex.svg',
  '/v1/9d12b4c4-maas_black-orange_hex.svg',
  '/v1/ffa38040-juju_black-orange_hex.svg',
  '/v1/41e2722c-core_logo.svg',
  '/v1/3f0091ee-conjure-up-logo-black.svg',
  '/v1/ea4e7803-snapcraft_green-red_su_hex_cropped.svg',
  '/v1/e0d78513-cloud-init-logo-updated.svg',
  '/v1/f53c4e01-icon-slack.svg',
  '/v1/7eae50ca-icon-twitter.svg',
  '/v1/f307a122-icon-github.svg'
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

      return cache.addAll([
        '/',
        '/index',
        '/index?homescreen=1',
        '/?homescreen=1',
        '/accessibility',
        '/browser-support',
        '/coding-standards',
        '/contribute',
        '/css/minified/main.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
