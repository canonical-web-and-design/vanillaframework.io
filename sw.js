var CACHE_NAME = 'v1';
var assetServerUrl = 'https://assets.ubuntu.com';
var thirdPartyAssetPaths = [
  '/v1/61d83c7e-icon-github.svg',
  '/v1/4a810e12-guidelines-illustration.svg',
  '/v1/a81f84ba-github-icon.svg',
  '/v1/e2ac88af-juju_black-orange_hex.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      thirdPartyAssetPaths.forEach(function(assetPath) {
        var request = new Request(assetServerUrl + assetPath, {
          mode: 'no-cors'
        });

        fetch(request).then(function(response) {
          cache.put(request, response);
        });
      });

      return cache.addAll([
        '/',
        '/index.html',
        '/accessibility.html',
        '/browser-support.html',
        '/coding-standards.html',
        '/contribute.html',
        '/css/main.css'
      ]);
    })
  );
});
