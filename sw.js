/* Service Worker — Dona Pizza Cardápio (PWA) */
var CACHE = 'dona-pizza-v1';

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e){
  /* Rede primeiro; se falhar (offline), tenta o cache */
  e.respondWith(
    fetch(e.request).then(function(res){
      try {
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      } catch(err){}
      return res;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
