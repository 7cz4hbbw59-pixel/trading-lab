const V='tl-v99';
const FILES=['./','./index.html','./jeu.html','./ia.html','./ia-data-1.bin','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 // données Bitcoin : fichier qui ne change jamais (nom versionné) → servi depuis le cache, instantané
 if(/ia-data-\d+\.bin$/.test(new URL(e.request.url).pathname)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x&&x.ok){const c=x.clone();caches.open(V).then(k=>k.put(e.request,c))}return x})));return}
 e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./jeu.html'))))});
