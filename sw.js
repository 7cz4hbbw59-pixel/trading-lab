
/* Bullabo Studio IA — cache optimisé, compatible GitHub Pages */
const V='bullabo-ia-opt-v3';
const SHELL=['./ia.html','./icon-192.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(V).then(cache=>Promise.allSettled(SHELL.map(f=>cache.add(f)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>
  (k.startsWith('bullabo-ia-opt-')&&k!==V)
 ).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 // Versioned historical data are immutable. No download until first use.
 if(/\/ia-data-(?:\d+|eth-\d+|sol-\d+)\.(?:bin|json)$/.test(url.pathname)){
  event.respondWith(caches.match(req).then(saved=>saved||fetch(req).then(resp=>{
   if(resp.ok){const copy=resp.clone();event.waitUntil(caches.open(V).then(c=>c.put(req,copy)))}
   return resp
  })));
  return;
 }
 // HTML can change; fetch fresh first, fall back to the exact URL offline.
 event.respondWith(fetch(req).then(resp=>{
  if(resp.ok){const copy=resp.clone();event.waitUntil(caches.open(V).then(c=>c.put(req,copy)))}
  return resp
 }).catch(async()=>await caches.match(req)||Response.error()));
});
