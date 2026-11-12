/* Entitia Lab — cache : pages fraîches d'abord (toujours revérifiées auprès du serveur), repli hors ligne */
const V='entitia-v296-bouche';
const SHELL=['./','./index.html','./ia.html','./jeu.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon.svg','./favicon.ico','./favicon-32.png','./icon-96.png','./icon-monochrome-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(SHELL.map(f=>c.add(f)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V && x!=='bullabo-user-save-v1').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;
 const fresh=r.mode==='navigate'||/\.html?$|\/$|sw\.js$/.test(u.pathname);
 e.respondWith((fresh?fetch(u.href,{cache:'no-cache',credentials:'same-origin'}):fetch(r)).then(x=>{if(x.ok){const c=x.clone();e.waitUntil(caches.open(V).then(k=>k.put(r,c)))}return x}).catch(async()=>await caches.match(r)||await caches.match('./index.html')||Response.error()))});
